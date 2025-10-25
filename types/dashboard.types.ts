// types/dashboard.ts
import { ReactNode } from "react";

export type MenuItem = {
  key: string;
  label: string;
  href: string;
  icon?: ReactNode;
};
