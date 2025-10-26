"use client";

import { useState } from "react";
import { Table, Button, Input, Space, Card, Tag, DatePicker, Badge } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

interface Return {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "completed";
}

const initialData: Return[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerName: "John Doe",
    date: "2025-10-25",
    amount: 299.99,
    reason: "Wrong size",
    status: "pending"
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerName: "Jane Smith",
    date: "2025-10-24",
    amount: 159.50,
    reason: "Defective product",
    status: "approved"
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customerName: "Mike Johnson",
    date: "2025-10-23",
    amount: 450.75,
    reason: "Changed mind",
    status: "rejected"
  }
];

const { RangePicker } = DatePicker;

export default function ReturnsPage() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Return ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order #",
      dataIndex: "orderNumber",
      key: "orderNumber",
      sorter: (a: Return, b: Return) => a.orderNumber.localeCompare(b.orderNumber),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a: Return, b: Return) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: Return, b: Return) => 
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
      sorter: (a: Return, b: Return) => a.amount - b.amount,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Return["status"]) => {
        const colors = {
          pending: "orange",
          approved: "green",
          rejected: "red",
          completed: "blue",
        };
        return (
          <Badge 
            status={status === "pending" ? "processing" : "default"} 
            text={<Tag color={colors[status]}>{status.toUpperCase()}</Tag>}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Return) => (
        <Space size="middle">
          <Button type="link">View Details</Button>
          {record.status === "pending" && (
            <>
              <Button type="link" className="text-green-600">Approve</Button>
              <Button type="link" danger>Reject</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Returns Management</h1>
        <Space>
          <Button icon={<ReloadOutlined />}>Refresh</Button>
          <Button type="primary">Process Return</Button>
        </Space>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <Input
            placeholder="Search returns..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <RangePicker />
        </div>

        <Table
          columns={columns}
          dataSource={initialData}
          rowKey="id"
          loading={loading}
          pagination={{
            total: initialData.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </Card>
    </div>
  )
}