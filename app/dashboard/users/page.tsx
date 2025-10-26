"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import DataTable from "@/components/tables/DataTable";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import { Button, Modal, Form, Input, Select } from "antd";
import { dashboardStats, salesData, customers } from "@/lib/data/mockData";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Convert customers to users for the table
const initialUsers: User[] = customers.map(customer => ({
  id: customer.id,
  name: customer.name,
  email: customer.email,
  role: "Customer", // Default role for customers
})).concat([
  { id: "u1", name: "Admin User", email: "admin@example.com", role: "Admin" },
  { id: "u2", name: "Manager User", email: "manager@example.com", role: "Manager" },
]);

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleSubmit = (values: Omit<User, "id">) => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...editingUser, ...values } : u
        )
      );
    } else {
      setUsers([
        ...users,
        {
          id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
          ...values,
        },
      ]);
    }
    setModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget title="Active Users" value="2,345" />
        <StatWidget title="New Signups" value="42" />
        <StatWidget title="Churn" value="1.2%" />
        <StatWidget title="Avg. Session" value="12m" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card title="User Growth">
          <OverviewChart className="h-[220px]" />
        </Card>
        <Card title="Engagement">
          <OverviewChart className="h-[220px]" />
        </Card>
      </div>
      <Card>
        <div className="mb-4 flex justify-end">
          <Button type="primary" onClick={handleAdd}>
            Add User
          </Button>
        </div>
        <DataTable
          data={users}
          columns={[
            { key: "id", title: "ID" },
            { key: "name", title: "Name" },
            { key: "email", title: "Email" },
            { key: "role", title: "Role" },
            {
              key: "actions",
              title: "Actions",
              render: (user) => (
                <div className="space-x-2">
                  <Button size="small" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    danger
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </Card>
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingUser ? "Save" : "Add"}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            {" "}
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Cashier">Cashier</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
