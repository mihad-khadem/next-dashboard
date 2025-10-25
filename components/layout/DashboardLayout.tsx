// components/layout/DashboardLayout.tsx
"use client";

import { useState, ReactNode, useEffect } from "react";
import { Layout, Breadcrumb, Grid } from "antd";
import Sidebar from "./Sidebar";
import DashboardHeader from "./Header";
import { MenuItem } from "@/types/dashboard.types";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

type Props = {
  children: ReactNode;
  menuItems: MenuItem[];
  breadcrumbs?: string[];
};

export default function DashboardLayout({
  children,
  menuItems,
  breadcrumbs = [],
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Auto close sidebar on mobile
  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider breakpoint="lg" collapsedWidth={0}>
          <div className="logo text-white text-xl p-4">Dashboard</div>
          <Sidebar items={menuItems} collapsed={collapsed} />
        </Sider>
      )}

      <Layout>
        <DashboardHeader collapsed={collapsed} onToggle={toggleSidebar} />
        {/* Mobile sidebar drawer */}
        {isMobile && (
          <Sidebar
            items={menuItems}
            collapsed={collapsed}
            isMobile
            onClose={toggleSidebar}
          />
        )}
        <Content style={{ margin: "16px" }}>
          {breadcrumbs.length > 0 && (
            <Breadcrumb style={{ marginBottom: 16 }}>
              {breadcrumbs.map((crumb, index) => (
                <Breadcrumb.Item key={index}>{crumb}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
