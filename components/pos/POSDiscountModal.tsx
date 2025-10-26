"use client";
import React from "react";
import { Modal, Form, Input, Select } from "antd";

interface POSDiscountModalProps {
  visible: boolean;
  onCancel: () => void;
  onApply: (type: "percentage" | "fixed", value: number) => void;
}

export default function POSDiscountModal({
  visible,
  onCancel,
  onApply,
}: POSDiscountModalProps) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    onApply(values.type, parseFloat(values.value));
    form.resetFields();
  };

  return (
    <Modal
      title="Apply Discount"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Apply Discount"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="type"
          label="Discount Type"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="percentage">Percentage (%)</Select.Option>
            <Select.Option value="fixed">Fixed Amount ($)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="value"
          label="Discount Value"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
