"use client";

import { useState } from "react";
import { Table, Button, Input, Space, Card, Tag } from "antd";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const initialData: Product[] = [
  {
    id: 1,
    name: "Product 1",
    category: "Electronics",
    price: 299.99,
    stock: 50,
    status: "in-stock",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Clothing",
    price: 49.99,
    stock: 5,
    status: "low-stock",
  },
  {
    id: 3,
    name: "Product 3",
    category: "Food",
    price: 9.99,
    stock: 0,
    status: "out-of-stock",
  },
];

export default function ProductsPage() {
  const [searchText, setSearchText] = useState("");

  const columns: TableProps<Product>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Electronics", value: "Electronics" },
        { text: "Clothing", value: "Clothing" },
        { text: "Food", value: "Food" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          "in-stock": "green",
          "low-stock": "orange",
          "out-of-stock": "red",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.replace("-", " ").toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
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
        <h1 className="text-2xl font-bold">Products</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget title="Total SKUs" value="450" />
        <StatWidget title="Low Stock" value="28" />
        <StatWidget title="Out of Stock" value="12" />
        <StatWidget title="Total Value" value="$124,230" />
      </div>

      <Card>
        <div className="mb-4">
          <Input
            placeholder="Search products..."
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card title="Stock Overview">
          <OverviewChart className="h-[220px]" />
        </Card>
        <Card title="Value by Category">
          <OverviewChart className="h-[220px]" />
        </Card>
      </div>
    </div>
  );
}
