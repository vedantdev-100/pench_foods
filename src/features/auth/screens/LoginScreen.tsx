import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLogin } from "../hooks/useLogin";
import { Colors } from "@/shared/theme/colors";

export function LoginScreen() {
  const router = useRouter();
  const { mutate: login, isPending, isError, error } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"identifier" | "password" | null>(null);

  const handleLogin = () => {
    if (!username || !password) return;
    login({ username, password });
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.bg.screen }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Top Logo ── */}
          <View className="items-center pt-12 pb-6">
            <View
              className="px-6 py-2 rounded-lg"
              style={{ borderWidth: 1.5, borderStyle: "dashed", borderColor: Colors.brand.primary }}
            >
              <Text
                className="font-bold text-brand-primary"
                style={{ fontSize: 16, letterSpacing: 4 }}
              >
                PENCH FOODS
              </Text>
            </View>
          </View>

          {/* ── Card ── */}
          <View
            className="mx-5 rounded-[20px] bg-bg-card p-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 24,
              elevation: 6,
            }}
          >
            {/* Truck Icon */}
            <View className="items-center mb-4">
              <View className="w-16 h-16 rounded-full bg-yellow-400 items-center justify-center">
                <Ionicons name="car" size={32} color={Colors.brand.primary} />
              </View>
            </View>

            {/* Heading */}
            <Text
              className="text-text-primary text-center font-bold mb-1"
              style={{ fontSize: 28, lineHeight: 36 }}
            >
              Welcome back,{"\n"}Partner
            </Text>
            <Text
              className="text-text-secondary text-center mb-6"
              style={{ fontSize: 14 }}
            >
              Access your delivery dashboard
            </Text>

            {/* ── Identifier Input ── */}
            <Text className="text-text-primary font-semibold mb-2" style={{ fontSize: 14 }}>
              Employee ID / Mobile Number
            </Text>
            <View
              className="flex-row items-center px-4 mb-4"
              style={{
                backgroundColor: Colors.bg.input,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor:
                  focusedField === "identifier" ? Colors.border.focus : Colors.border.default,
                height: 52,
              }}
            >
              <Ionicons
                name="id-card-outline"
                size={20}
                color={focusedField === "identifier" ? Colors.brand.primary : Colors.text.muted}
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-text-primary"
                style={{ fontSize: 14 }}
                placeholder="Enter your ID or phone"
                placeholderTextColor={Colors.text.muted}
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocusedField("identifier")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* ── Password Input ── */}
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-text-primary font-semibold" style={{ fontSize: 14 }}>
                Password
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/forgot-password" as any)}
              >
                <Text style={{ color: Colors.warning, fontSize: 13, fontWeight: "600" }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View
              className="flex-row items-center px-4"
              style={{
                backgroundColor: Colors.bg.input,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor:
                  focusedField === "password" ? Colors.border.focus : Colors.border.default,
                height: 52,
              }}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={focusedField === "password" ? Colors.brand.primary : Colors.text.muted}
                style={{ marginRight: 10 }}
              />
              <TextInput
                className="flex-1 text-text-primary"
                style={{ fontSize: 14 }}
                placeholder="••••••••"
                placeholderTextColor={Colors.text.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={Colors.text.muted}
                />
              </TouchableOpacity>
            </View>

            {/* ── Error ── */}
            {isError && (
              <Text
                className="text-center mt-3"
                style={{ color: Colors.error, fontSize: 13 }}
              >
                {(error as any)?.message ?? "Login failed. Please try again."}
              </Text>
            )}

            {/* ── Login Button ── */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isPending || !username || !password}
              className="items-center justify-center mt-5"
              style={{
                backgroundColor:
                  !username || !password ? "#A5C9B5" : Colors.brand.primary,
                borderRadius: 12,
                height: 54,
              }}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                  Log In →
                </Text>
              )}
            </TouchableOpacity>

            {/* ── Help ── */}
            <Text
              className="text-center mt-5"
              style={{ color: Colors.text.muted, fontSize: 13 }}
            >
              Having trouble?{" "}
              <Text style={{ color: Colors.warning, fontWeight: "600" }}>Need help?</Text>
            </Text>
          </View>

          {/* ── Footer ── */}
          <View className="items-center py-6 mt-auto">
            <Text style={{ color: "#6B7280", fontSize: 12, marginBottom: 4 }}>
              © 2024 Pench Foods. All rights reserved.
            </Text>
            <View className="flex-row items-center" style={{ gap: 4 }}>
              <Ionicons name="checkmark-circle" size={14} color={Colors.brand.primary} />
              <Text style={{ color: Colors.brand.primary, fontSize: 12, fontWeight: "600" }}>
                Certified A2/A2 Partner
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// import React from "react";
// import { View, Text } from "react-native";
// import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
// import { LoginForm } from "../components/LoginForm";
// import { useLogin } from "../hooks/useLogin";
// import { Link } from "expo-router";
// import { ROUTES } from "@/constants/routes";
// // import { SafeAreaView } from 'react-native-safe-area-context';

// export function LoginScreen() {
//   const { mutate: login, isPending } = useLogin();

//   return (
//     <ScreenWrapper scrollable className="justify-center p-6">
//       <View className="items-center mb-10">
//         <View className="w-20 h-20 bg-primary rounded-2xl items-center justify-center mb-4">
//         </View>
//         <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
//         <Text className="text-base text-secondary mt-2 text-center">
//           Login to your Campus account to continue
//         </Text>
//       </View>

//       {/* <LoginForm onSubmit={(email, password) => login({ email, password })} isLoading={isPending} /> */}
//       <LoginForm onSubmit={(username, password) => login({ username, password })} isLoading={isPending} />

//       <View className="mt-6 items-center">
//         <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="text-primary font-medium p-2">
//           Forgot Password?
//         </Link>
//       </View>
//     </ScreenWrapper>
//   );
// }
