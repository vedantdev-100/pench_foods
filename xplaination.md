> src/features/auth/types/auth.types.ts
export interface LoginPayload {
  username: string;   // ← was email
  password: string;
}

export interface LoginResponse {
  access: string;     // ← was accessToken
  refresh: string;    // ← was refreshToken
  user: User;
  sid: string;
  city_name: string;
  domain_name: string;
  route_id: string;
}
**********************
> src/types/domain/user.types.ts
export type UserRole = "admin" | "teaching" | "student" | "driver" | "customer";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_erp_user: boolean;
  is_driver: boolean;
  is_customer: boolean;
  portal: string;
  phone: string;
  tenant_schema: string;
  role?: UserRole;    // ← derived field, not from backend
}
***********************

>src/features/auth/api/authApi.ts
login: (payload: LoginPayload) =>
  httpClient.post<LoginResponse>("accounts/login/", payload),
  // ← removed ApiResponse<> wrapper — backend returns directly
************************

>src/features/auth/hooks/useLogin.ts
const { user, access, refresh } = res.data; // ← was res.data.data

// ← derive role from boolean flags since backend has no role field
const role: UserRole = user.is_driver
  ? "driver"
  : user.is_erp_user
    ? "admin"
    : "student";

await tokenUtils.saveTokens(access, refresh); // ← was accessToken/refreshToken
setTokens(access, refresh);
setUser({ ...user, role });

>src/features/auth/hooks/useAuthInit.ts <added>
********************

>app/_layout.tsx
// ← Added useAuthInit for cold start bootstrap
// ← Added isReady flag to prevent premature redirects
// ← Added isMounted flag to prevent navigation before root mounts
// ← Added ROLE_ROUTES with driver support
// ← Split into RootLayout + RootNavigator
*******************

> src/hooks/useToast.ts + src/shared/components/Toast/Toast.tsx
// ← Added ToastProvider that registers the handler on mount
// ← Uses react-native-toast-message under the hood

************************
> THE FLOW
************************
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         COLD START (App Restart)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

App Launches
    │
    ▼
RootLayout mounts
  → GestureHandlerRootView
  → SafeAreaProvider
  → QueryClientProvider
  → BottomSheetModalProvider
  → ToastProvider (registers toast handler)
    │
    ▼
RootNavigator mounts
  → useAuthInit() runs
      │
      ├── getAccessToken() from SecureStore
      ├── getRefreshToken() from SecureStore
      │
      ├── Token found?
      │     YES → setTokens() in Zustand
      │          → GET accounts/login/ with Bearer token
      │          → setUser() in Zustand
      │          → isReady = true
      │
      └── Token NOT found?
            → clearAuth()
            → isReady = true
    │
    ▼
isReady = true → useEffect fires
  → user exists? → ROLE_ROUTES[user.role] → router.replace(dashboard)
  → user null?   → router.replace("/(auth)/login")


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              LOGIN FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User enters username + password
    │
    ▼
useLogin() → mutationFn
  → POST accounts/login/ { username, password }
    │
    ▼
onSuccess
  → destructure { user, access, refresh } from res.data
  → derive role from is_driver / is_erp_user / is_customer
  → tokenUtils.saveTokens(access, refresh) → SecureStore
  → setTokens(access, refresh) → Zustand
  → setUser({ ...user, role }) → Zustand
    │
    ▼
_layout useEffect detects user change
  → user is in (auth) group
  → ROLE_ROUTES["driver"] → "/(student)/(tabs)/dashboard"
  → router.replace(dashboard) ✅

onError
  → getErrorMessage(error)
  → useToast().show({ message, type: "error" })
  → Toast appears on screen


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              LOGOUT FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

useLogout() fires
  → POST /auth/logout
  → clearAuth() → Zustand user = null
  → tokenUtils.clearTokens() → SecureStore cleared
    │
    ▼
_layout useEffect detects user = null
  → not in auth group
  → router.replace("/(auth)/login") ✅


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           401 AUTO LOGOUT FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Any API call returns 401
    │
    ▼
httpClient response interceptor
  → clearAuth() → Zustand user = null
    │
    ▼
_layout useEffect detects user = null
  → router.replace("/(auth)/login") ✅

> Onboarding Flow >
  First Launch
  → useAuthInit checks SecureStore
  → onboarding_complete = null
  → showOnboarding = true
  → redirect to /onboarding
  → User swipes through 2 slides
  → Taps "Get Started"
  → markComplete() → saves "true" to SecureStore
  → redirect to /(auth)/login

Second Launch+
  → onboarding_complete = "true"
  → skip onboarding
  → check tokens → redirect to dashboard or login
  ************************