import type { Rule } from "antd/es/form";

export type FormFieldType = FormField["type"];

export type FormFieldOption = { label: string; value: string | number };

export type FormFieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "date"
  | "checkbox"
  | "radio"
  | "password";

export type Role = "admin" | "manager" | "staff" | "customer";

export interface FormFieldOption {
  label: string;
  value: string | number | boolean;
}

export interface FormField {
  name: string; // field key
  label: string; // label shown in form
  type: FormFieldType; // type of field
  placeholder?: string; // optional placeholder
  required?: boolean; // required validation
  options?: FormFieldOption[]; // for select, radio, checkbox
  min?: number; // for number fields
  rules?: Rule[]; // additional validation rules
  max?: number; // for number fields
  defaultValue?: any; // initial value
  disabled?: boolean;
}
export interface CrudFormProps<T> {
  fields: FormField[];
  initialValues?: T;
  onSubmit: (values: T) => void;
  onCancel?: () => void;
  loading?: boolean;
  submitText?: string;
}
