"use client";

import { ReactNode, useState } from "react";
import { Layout } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/layout/Header";

const { Sider, Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  const menuItems = [
    {
      key: "1",
      label: "Users",
      href: "/dashboard/users",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Products",
      href: "/dashboard/products",
      icon: <ShopOutlined />,
    },
    {
      key: "3",
      label: "Reports",
      href: "/dashboard/reports",
      icon: <FileTextOutlined />,
    },
  ];

  // control collapsed state here and pass to Header and Sider
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth={0} collapsed={collapsed}>
        <div className="logo text-white text-xl p-4">Dashboard</div>
        <Sidebar items={menuItems} />
      </Sider>

      <Layout>
        <DashboardHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed((s) => !s)}
        />
        <Content style={{ margin: "16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
