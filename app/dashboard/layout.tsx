"use client";

import { ReactNode } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth={0}>
        <div className="logo text-white text-xl p-4">Dashboard</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/dashboard/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />}>
            <Link href="/dashboard/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FileTextOutlined />}>
            <Link href="/dashboard/reports">Reports</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>Header</Header>
        <Content style={{ margin: "16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
