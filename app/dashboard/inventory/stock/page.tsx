"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Card,
  Tag,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

interface StockItem {
  id: number;
  productName: string;
  sku: string;
  quantity: number;
  minimumStock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  lastUpdated: string;
}

const initialData: StockItem[] = [
  {
    id: 1,
    productName: "Product 1",
    sku: "SKU001",
    quantity: 150,
    minimumStock: 20,
    status: "in-stock",
    lastUpdated: "2025-10-24",
  },
  {
    id: 2,
    productName: "Product 2",
    sku: "SKU002",
    quantity: 15,
    minimumStock: 20,
    status: "low-stock",
    lastUpdated: "2025-10-24",
  },
  {
    id: 3,
    productName: "Product 3",
    sku: "SKU003",
    quantity: 0,
    minimumStock: 10,
    status: "out-of-stock",
    lastUpdated: "2025-10-24",
  },
];

export default function StockPage() {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      sorter: (a: StockItem, b: StockItem) =>
        a.productName.localeCompare(b.productName),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a: StockItem, b: StockItem) => a.quantity - b.quantity,
    },
    {
      title: "Minimum Stock",
      dataIndex: "minimumStock",
      key: "minimumStock",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: StockItem["status"]) => {
        const colors = {
          "in-stock": "green",
          "low-stock": "orange",
          "out-of-stock": "red",
        };
        return (
          <Tag color={colors[status]}>
            {status.replace("-", " ").toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      sorter: (a: StockItem, b: StockItem) =>
        new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: StockItem) => (
        <Space size="middle">
          <Button type="link">Adjust Stock</Button>
          <Button type="link">History</Button>
        </Space>
      ),
    },
  ];

  const stockStats = {
    total: initialData.length,
    inStock: initialData.filter((item) => item.status === "in-stock").length,
    lowStock: initialData.filter((item) => item.status === "low-stock").length,
    outOfStock: initialData.filter((item) => item.status === "out-of-stock")
      .length,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock Management</h1>
        <Space>
          <Button icon={<SyncOutlined />}>Stock Take</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Stock Adjustment
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={stockStats.total}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="In Stock"
              value={stockStats.inStock}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Low Stock"
              value={stockStats.lowStock}
              prefix={<WarningOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Out of Stock"
              value={stockStats.outOfStock}
              prefix={<WarningOutlined style={{ color: "#f5222d" }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div className="mb-4">
          <Input
            placeholder="Search stock items..."
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
}
