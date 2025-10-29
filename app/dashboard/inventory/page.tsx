"use client";

import { Card, Row, Col, Button, Tabs } from "antd";
import {
  ShoppingCartOutlined,
  InboxOutlined,
  DollarOutlined,
  WarningOutlined,
  StopOutlined,
} from "@ant-design/icons";
import OverviewChart from "@/components/charts/OverviewChart";
import StatWidget from "@/components/widgets/StatWidget";

const stats = [
  {
    title: "Total Products",
    value: "2,345",
    change: "+14.5%",
    icon: <InboxOutlined style={{ fontSize: "24px" }} />,
  },
  {
    title: "In Stock",
    value: "1,890",
    change: "+2.5%",
    icon: <ShoppingCartOutlined style={{ fontSize: "24px" }} />,
  },
  {
    title: "Low Stock",
    value: "455",
    change: "-4.2%",
    icon: <WarningOutlined style={{ fontSize: "24px" }} />,
  },
  {
    title: "Out of Stock",
    value: "123",
    change: "-1.2%",
    icon: <StopOutlined style={{ fontSize: "24px" }} />,
  },
];

export default function InventoryPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Overview</h1>
        <Button type="primary" href="/dashboard/inventory/products">
          Manage Products
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatWidget
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat?.icon}
            className="relative overflow-hidden"
          >
            <span
              className={`absolute top-2 right-2 text-sm font-medium ${
                stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change}
            </span>
          </StatWidget>
        ))}
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Stock Level History">
            <OverviewChart className="h-[400px]" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions">
            <div className="space-y-4">
              <Button block href="/dashboard/inventory/products">
                View All Products
              </Button>
              <Button block href="/dashboard/inventory/stock">
                Stock Management
              </Button>
              <Button block href="/dashboard/inventory/categories">
                Manage Categories
              </Button>
              <Button block href="/dashboard/inventory/suppliers">
                Manage Suppliers
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
