export interface User {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_driver: boolean;
  is_customer: boolean;
  is_erp_user?: boolean;
  portal: string;
  phone: string;
  tenant_schema: string;
  groups?: string[];           // ← e.g. ["Drivers"]
  role?: "Driver" | "Customer" | "Admin";  // ← from backend
}

export type UserRole = "driver" | "customer" | "admin";