"use client";

import { Card, Row, Col, Button, DatePicker, Tabs } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons";
import OverviewChart from "@/components/charts/OverviewChart";
import StatWidget from "@/components/widgets/StatWidget";

const { RangePicker } = DatePicker;

const stats = [
  {
    title: "Total Sales",
    value: "$54,375",
    change: "+14.5%",
    isPositive: true,
  },
  {
    title: "Total Orders",
    value: "2,345",
    change: "+5.6%",
    isPositive: true,
  },
  {
    title: "Average Order",
    value: "$145",
    change: "-2.4%",
    isPositive: false,
  },
  {
    title: "Return Rate",
    value: "4.5%",
    change: "-1.2%",
    isPositive: true,
  },
];

export default function SalesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          <p className="text-gray-500">Track your sales performance</p>
        </div>
        <div className="flex gap-4">
          <RangePicker />
          <Button type="primary" href="/dashboard/sales/orders">
            View All Orders
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatWidget
            key={index}
            title={stat.title}
            value={stat.value}
            className="relative overflow-hidden"
          >
            <span
              className={`absolute top-2 right-2 text-sm font-medium flex items-center gap-1
              ${stat.isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {stat.isPositive ? <RiseOutlined /> : <FallOutlined />}
              {stat.change}
            </span>
          </StatWidget>
        ))}
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Sales Overview">
            <OverviewChart className="h-[400px]" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick Actions" className="mb-4">
            <div className="space-y-4">
              <Button block href="/dashboard/sales/orders">
                View Orders
              </Button>
              <Button block href="/dashboard/sales/invoices">
                View Invoices
              </Button>
              <Button block href="/dashboard/sales/returns">
                Manage Returns
              </Button>
              <Button block href="/dashboard/pos">
                Open POS
              </Button>
            </div>
          </Card>
          <Card title="Recent Orders">
            <div className="space-y-4">
              {/* Recent orders list will come from API */}
              <p className="text-gray-500 text-center py-4">
                Loading recent orders...
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
