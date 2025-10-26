"use client";

import { usePathname } from "next/navigation";
import { Row, Col, Card, Menu } from "antd";
import {
  ShoppingCartOutlined,
  DashboardOutlined,
  TagOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export default function POSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/dashboard/pos",
      icon: <ShoppingCartOutlined />,
      label: <Link href="/dashboard/pos">Point of Sale</Link>,
    },
    {
      key: "/dashboard/pos/products",
      icon: <TagOutlined />,
      label: <Link href="/dashboard/pos/products">Products</Link>,
    },
    {
      key: "/dashboard/pos/customers",
      icon: <UserOutlined />,
      label: <Link href="/dashboard/pos/customers">Customers</Link>,
    },
    {
      key: "/dashboard/pos/orders",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard/pos/orders">Orders</Link>,
    },
    {
      key: "/dashboard/pos/employees",
      icon: <TeamOutlined />,
      label: <Link href="/dashboard/pos/employees">Employees</Link>,
    },
    {
      key: "/dashboard/pos/settings",
      icon: <SettingOutlined />,
      label: <Link href="/dashboard/pos/settings">Settings</Link>,
    },
  ];

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6} lg={4}>
          <Card>
            <Menu
              mode="vertical"
              selectedKeys={[pathname]}
              items={menuItems}
              className="border-none"
            />
          </Card>
        </Col>
        <Col xs={24} md={18} lg={20}>
          {children}
        </Col>
      </Row>
    </div>
  );
}
