export type UserRole = "driver" | "customer";

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
  sid?: string;
  city_name?: string;
  domain_name?: string;
  route_id?: string;
  role?: UserRole;
}