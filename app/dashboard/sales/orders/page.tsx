"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Card,
  Tag,
  DatePicker,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  date: string;
  total: number;
  status: "completed" | "pending" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "partial";
}

const initialData: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-001",
    customer: "John Doe",
    date: "2025-10-24",
    total: 299.99,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    customer: "Jane Smith",
    date: "2025-10-24",
    total: 149.99,
    status: "pending",
    paymentStatus: "partial",
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    customer: "Mike Johnson",
    date: "2025-10-24",
    total: 99.99,
    status: "cancelled",
    paymentStatus: "unpaid",
  },
];

export default function OrdersPage() {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      sorter: (a: Order, b: Order) => a.customer.localeCompare(b.customer),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: Order, b: Order) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `$${total.toFixed(2)}`,
      sorter: (a: Order, b: Order) => a.total - b.total,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Order["status"]) => {
        const colors = {
          completed: "green",
          pending: "orange",
          cancelled: "red",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: Order["paymentStatus"]) => {
        const colors = {
          paid: "green",
          partial: "orange",
          unpaid: "red",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Order) => (
        <Space size="middle">
          <Button type="link">View</Button>
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  const stats = {
    totalOrders: initialData.length,
    completedOrders: initialData.filter((order) => order.status === "completed")
      .length,
    totalRevenue: initialData.reduce((sum, order) => sum + order.total, 0),
    averageOrderValue:
      initialData.reduce((sum, order) => sum + order.total, 0) /
      initialData.length,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button type="primary">Create Order</Button>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Orders"
              value={stats.completedOrders}
              prefix={<ShoppingCartOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Order Value"
              value={stats.averageOrderValue}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <Input
              placeholder="Search orders..."
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
            pagination={{
              total: initialData.length,
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </Space>
      </Card>
    </div>
  );
}
