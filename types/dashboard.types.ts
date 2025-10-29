// types/dashboard.ts
import { ReactNode } from "react";

export type MenuItem = {
  key: string;
  label: string;
  href: string;
  icon?: ReactNode;
  children?: MenuItem[];
};
export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  lastActive: string;
}
