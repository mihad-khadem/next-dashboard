"use client";

import { useState, useEffect } from "react";
import { Card, Table, Button, Input, Modal, Form, message, Tag } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import type { Customer } from "@/types/pos";
import { posApi } from "@/lib/api/pos";
// dashboard/pos/customers/page.tsx
export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await posApi.getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      message.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (
    values: Omit<
      Customer,
      "id" | "createdAt" | "totalPurchases" | "loyaltyPoints"
    >
  ) => {
    try {
      await posApi.createCustomer({
        ...values,
        loyaltyPoints: 0,
        totalPurchases: 0,
      });
      message.success("Customer created successfully");
      setModalVisible(false);
      form.resetFields();
      fetchCustomers();
    } catch (error) {
      console.error("Failed to create customer:", error);
      message.error("Failed to create customer");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Loyalty Points",
      dataIndex: "loyaltyPoints",
      render: (points: number) => <Tag color="blue">{points} points</Tag>,
    },
    {
      title: "Total Purchases",
      dataIndex: "totalPurchases",
      render: (amount: number) => `$${amount.toFixed(2)}`,
      sorter: true,
    },
    {
      title: "Last Purchase",
      dataIndex: "lastPurchase",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "Never",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Customer) => (
        <div className="space-x-2">
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            size="small"
            type="link"
            onClick={() => handleViewHistory(record)}
          >
            View History
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (customer: Customer) => {
    // TODO: Implement edit functionality
    console.log("Edit customer:", customer);
  };

  const handleViewHistory = (customer: Customer) => {
    // TODO: Implement view history functionality
    console.log("View history:", customer);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)
  );

  return (
    <div>
      <Card
        title="Customers"
        extra={
          <div className="space-x-2">
            <Input
              placeholder="Search customers..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Add Customer
            </Button>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          loading={loading}
        />
      </Card>

      <Modal
        title="Add Customer"
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Customer Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
