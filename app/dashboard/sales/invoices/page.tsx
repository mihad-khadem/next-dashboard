"use client";

import { useState } from "react";
import { Table, Button, Input, Space, Card, Tag, DatePicker } from "antd";
import {
  SearchOutlined,
  PrinterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

const initialData: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    customerName: "John Doe",
    date: "2025-10-25",
    amount: 1299.99,
    status: "paid",
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    customerName: "Jane Smith",
    date: "2025-10-24",
    amount: 859.5,
    status: "pending",
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    customerName: "Mike Johnson",
    date: "2025-10-23",
    amount: 450.75,
    status: "overdue",
  },
];

const { RangePicker } = DatePicker;

export default function InvoicesPage() {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Invoice #",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      sorter: (a: Invoice, b: Invoice) =>
        a.invoiceNumber.localeCompare(b.invoiceNumber),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a: Invoice, b: Invoice) =>
        a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: Invoice, b: Invoice) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
      sorter: (a: Invoice, b: Invoice) => a.amount - b.amount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Invoice["status"]) => {
        const colors = {
          paid: "green",
          pending: "orange",
          overdue: "red",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Invoice) => (
        <Space size="middle">
          <Button type="link" icon={<PrinterOutlined />}>
            Print
          </Button>
          <Button type="link" icon={<DownloadOutlined />}>
            Download
          </Button>
          <Button type="link">View</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Button type="primary">Create Invoice</Button>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <Input
            placeholder="Search invoices..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <Space>
            <RangePicker />
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Space>
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
  );
}
