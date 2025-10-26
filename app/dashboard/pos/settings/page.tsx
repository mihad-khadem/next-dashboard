"use client";
import { Form, Input, Button, Select, Card } from "antd";
import { useState } from "react";

export default function POSSettingsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      console.log("Settings saved:", values);
      // TODO: send to API
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card title="POS General Settings">
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="currency" label="Currency" initialValue="$">
            <Input />
          </Form.Item>

          <Form.Item name="tax" label="Tax (%)" initialValue={5}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="receiptFooter" label="Receipt Footer">
            <Input.TextArea />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Save Settings
          </Button>
        </Form>
      </Card>

      <Card title="POS Other Settings">
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            name="defaultPayment"
            label="Default Payment Method"
            initialValue="cash"
          >
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
              <Select.Option value="mobile">Mobile</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="enableBarcode" valuePropName="checked">
            <Select>
              <Select.Option value="true">Enable Barcode Scanner</Select.Option>
              <Select.Option value="false">
                Disable Barcode Scanner
              </Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Save Settings
          </Button>
        </Form>
      </Card>
    </div>
  );
}
