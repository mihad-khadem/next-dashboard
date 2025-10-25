"use client";

import { useState } from "react";
import { Table, Button, Input, Space, Card, Tag } from "antd";
import { SearchOutlined, PlusOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  totalOrders: number;
}

const initialData: Supplier[] = [
  {
    id: 1,
    name: "Supplier Co Ltd",
    contact: "John Doe",
    email: "john@supplier.com",
    phone: "+1 234 567 890",
    status: "active",
    totalOrders: 156,
  },
  {
    id: 2,
    name: "Global Supply Inc",
    contact: "Jane Smith",
    email: "jane@globalsupply.com",
    phone: "+1 234 567 891",
    status: "active",
    totalOrders: 89,
  },
  {
    id: 3,
    name: "Local Distributors",
    contact: "Mike Johnson",
    email: "mike@localdist.com",
    phone: "+1 234 567 892",
    status: "inactive",
    totalOrders: 45,
  },
];

export default function SuppliersPage() {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Supplier, b: Supplier) => a.name.localeCompare(b.name),
    },
    {
      title: "Contact Person",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Contact Info",
      key: "contact_info",
      render: (_: unknown, record: Supplier) => (
        <Space direction="vertical" size="small">
          <span>
            <MailOutlined className="mr-2" />
            {record.email}
          </span>
          <span>
            <PhoneOutlined className="mr-2" />
            {record.phone}
          </span>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "active" | "inactive") => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Total Orders",
      dataIndex: "totalOrders",
      key: "totalOrders",
      sorter: (a: Supplier, b: Supplier) => a.totalOrders - b.totalOrders,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Supplier) => (
        <Space size="middle">
          <Button type="link">View Orders</Button>
          <Button type="link">Edit</Button>
          <Button type="link" danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Supplier
        </Button>
      </div>

      <Card>
        <div className="mb-4">
          <Input
            placeholder="Search suppliers..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={initialData}
          rowKey="id"
          pagination={{
            total: initialData.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </Card>
    </div>
  );