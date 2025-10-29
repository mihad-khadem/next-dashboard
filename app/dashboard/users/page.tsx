"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/index";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  DashboardUser,
} from "@/store/slices/usersSlice";

import Card from "@/components/ui/Card";
import DataTable from "@/components/tables/DataTable";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import { Button, Modal, Form, Input, Select } from "antd";
import { salesData, dashboardStats } from "@/lib/data/mockData";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, usersLoading } = useSelector(
    (state: RootState) => state.users
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<DashboardUser | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (user: DashboardUser) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleSubmit = (values: Omit<DashboardUser, "id">) => {
    if (editingUser) {
      dispatch(updateUser({ ...editingUser, ...values }));
    } else {
      dispatch(addUser(values));
    }
    setModalOpen(false);
    form.resetFields();
  };

  const { userStats } = dashboardStats;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Stat Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget
          title="Active Users"
          value={userStats.active.toString()}
          loading={usersLoading}
        />
        <StatWidget
          title="New Users"
          value={userStats.new.toString()}
          loading={usersLoading}
        />
        <StatWidget
          title="Total Users"
          value={userStats.total.toString()}
          loading={usersLoading}
        />
        <StatWidget
          title="Returning Users"
          value={userStats.returning.toString()}
          loading={usersLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card title="User Growth">
          <OverviewChart
            className="h-[220px]"
            loading={usersLoading}
            data={salesData.monthly}
          />
        </Card>
        <Card title="Daily Active Users">
          <OverviewChart
            className="h-[220px]"
            loading={usersLoading}
            data={salesData.weekly}
          />
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Users List</h3>
          <Button type="primary" onClick={handleAdd}>
            Add User
          </Button>
        </div>
        <DataTable
          loading={usersLoading}
          data={users}
          columns={[
            {
              title: "Name",
              key: "name",
              render: (user: DashboardUser) => (
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || "/placeholder.png"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              ),
            },
            {
              title: "Role",
              key: "role",
              render: (user: DashboardUser) => (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-800"
                      : user?.role === "manager"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user?.role}
                </span>
              ),
            },
            {
              title: "Status",
              key: "status",
              render: (user: DashboardUser) => (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : user.status === "inactive"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.status}
                </span>
              ),
            },
            {
              title: "Last Active",
              key: "lastActive",
              render: (user: DashboardUser) =>
                new Date(user.lastActive).toLocaleDateString(),
            },
            {
              title: "Actions",
              key: "actions",
              render: (user: DashboardUser) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="avatar" label="Avatar URL">
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="manager">Manager</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
