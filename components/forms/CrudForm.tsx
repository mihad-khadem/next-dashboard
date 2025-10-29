"use client";

import { Form, Input, InputNumber, Select, Button, Space } from "antd";
import { useEffect } from "react";
import type { FormField } from "@/types/forms";

interface CrudFormProps {
  fields: FormField[];
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
  onCancel: () => void;
  loading?: boolean;
  submitText?: string;
}

export function CrudForm({
  fields,
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
  submitText = "Submit",
}: CrudFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  const renderField = (field: FormField) => {
    const commonProps = {
      placeholder: field.placeholder || `Enter ${field.label}`,
    };

    switch (field.type) {
      case "number":
        return <InputNumber {...commonProps} style={{ width: "100%" }} />;
      case "select":
        return (
          <Select {...commonProps}>
            {field.options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      case "textarea":
        return <Input.TextArea {...commonProps} rows={4} />;
      default:
        return <Input {...commonProps} />;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={[
            ...(field.required
              ? [{ required: true, message: `${field.label} is required` }]
              : []),
            ...(field?.rules || []),
          ]}
        >
          {renderField(field)}
        </Form.Item>
      ))}

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {submitText}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
