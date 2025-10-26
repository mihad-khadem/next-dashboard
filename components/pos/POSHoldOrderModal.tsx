"use client";
import React from "react";
import { Modal, Form, Input } from "antd";

interface POSHoldOrderModalProps {
  visible: boolean;
  onCancel: () => void;
  onHold: (note: string) => void;
}

export default function POSHoldOrderModal({
  visible,
  onCancel,
  onHold,
}: POSHoldOrderModalProps) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    onHold(values.note);
    form.resetFields();
  };

  return (
    <Modal
      title="Hold Order"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Hold Order"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="note" label="Order Note" rules={[{ required: true }]}>
          <Input.TextArea placeholder="Enter a note for this order (e.g., customer name, table number)" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
