import type { Rule } from "antd/es/form";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  required?: boolean;
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  rules?: Rule[];
}
