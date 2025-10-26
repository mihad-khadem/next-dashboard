"use client";
import React from "react";
import { Modal, Form, Input, Select } from "antd";
import type { PaymentMethod } from "@/types/pos";

interface POSPaymentModalProps {
  visible: boolean;
  total: number;
  onCancel: () => void;
  onCheckout: (values: {
    paymentMethod: PaymentMethod;
    amount: number;
    reference?: string;
  }) => void;
}

export default function POSPaymentModal({
  visible,
  total,
  onCancel,
  onCheckout,
}: POSPaymentModalProps) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    onCheckout(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Payment"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Complete Payment"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="paymentMethod"
          label="Payment Method"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="card">Card</Select.Option>
            <Select.Option value="mobile">Mobile Payment</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <Input type="number" prefix="$" />
        </Form.Item>

        <Form.Item name="reference" label="Reference">
          <Input placeholder="Transaction reference or notes" />
        </Form.Item>

        <div className="text-right text-lg font-bold">
          Total to Pay : ${total?.toFixed(2)}
        </div>
      </Form>
    </Modal>
  );
}
