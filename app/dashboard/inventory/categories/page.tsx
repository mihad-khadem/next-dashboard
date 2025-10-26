"use client";

import { useState } from "react";
import { Table, Button, Input, Space, Card, Tree } from "antd";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import type { DataNode } from "antd/es/tree";

interface Category {
  id: number;
  name: string;
  products: number;
  description: string;
}

const initialData: Category[] = [
  {
    id: 1,
    name: "Electronics",
    products: 150,
    description: "Electronic devices and accessories",
  },
  {
    id: 2,
    name: "Clothing",
    products: 300,
    description: "Apparel and fashion items",
  },
  {
    id: 3,
    name: "Food & Beverages",
    products: 200,
    description: "Food items and beverages",
  },
];

const treeData: DataNode[] = [
  {
    title: "Electronics",
    key: "0-0",
    children: [
      {
        title: "Phones",
        key: "0-0-0",
        children: [
          { title: "Smartphones", key: "0-0-0-0" },
          { title: "Accessories", key: "0-0-0-1" },
        ],
      },
      {
        title: "Computers",
        key: "0-0-1",
        children: [
          { title: "Laptops", key: "0-0-1-0" },
          { title: "Desktops", key: "0-0-1-1" },
        ],
      },
    ],
  },
  {
    title: "Clothing",
    key: "0-1",
    children: [
      { title: "Men", key: "0-1-0" },
      { title: "Women", key: "0-1-1" },
      { title: "Kids", key: "0-1-2" },
    ],
  },
];

export default function CategoriesPage() {
  const [searchText, setSearchText] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      sorter: (a: Category, b: Category) => a.products - b.products,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Category) => (
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
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget title="Categories" value="24" />
        <StatWidget title="Total Products" value="650" />
        <StatWidget title="Avg. Products/Category" value="27" />
        <StatWidget title="Top Category" value="Electronics" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Category Tree" className="lg:col-span-1">
          <Tree
            showLine
            treeData={treeData}
            expandedKeys={expandedKeys}
            onExpand={(keys) => setExpandedKeys(keys as string[])}
          />
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4">
            <Input
              placeholder="Search categories..."
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

      <div className="mb-6">
        <Card title="Overview Chart">
          <OverviewChart />
        </Card>
      </div>
    </div>
  );
}
