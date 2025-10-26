"use client";

import { ReactNode, useState } from "react";
import { Layout } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  DollarOutlined,
  BankOutlined,
  TeamOutlined,
  GiftOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Sidebar from "../../components/layout/Sidebar";
import DashboardHeader from "../../components/layout/Header";

const { Sider, Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  const menuItems = [
    {
      key: "1",
      label: "Dashboard",
      href: "/dashboard",
      icon: <DashboardOutlined />,
      children: [
        {
          key: "users",
          label: "Users",
          href: "/dashboard/users",
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      key: "2",
      label: "POS",
      href: "/dashboard/pos",
      icon: <ShoppingCartOutlined />,
    },
    {
      key: "inventory",
      label: "Inventory",
      href: "/dashboard/inventory",
      icon: <InboxOutlined />,
      children: [
        {
          key: "products",
          label: "Products",
          href: "/dashboard/inventory/products",
        },
        {
          key: "categories",
          label: "Categories",
          href: "/dashboard/inventory/categories",
        },
        {
          key: "suppliers",
          label: "Suppliers",
          href: "/dashboard/inventory/suppliers",
        },
        {
          key: "stock",
          label: "Stock Management",
          href: "/dashboard/inventory/stock",
        },
      ],
    },
    {
      key: "sales",
      label: "Sales",
      href: "/dashboard/sales",
      icon: <DollarOutlined />,
      children: [
        {
          key: "orders",
          label: "Orders",
          href: "/dashboard/sales/orders",
        },
        {
          key: "invoices",
          label: "Invoices",
          href: "/dashboard/sales/invoices",
        },
        {
          key: "returns",
          label: "Returns",
          href: "/dashboard/sales/returns",
        },
      ],
    },
    {
      key: "finance",
      label: "Finance",
      href: "/dashboard/finance",
      icon: <BankOutlined />,
      children: [
        {
          key: "expenses",
          label: "Expenses",
          href: "/dashboard/finance/expenses",
        },
        {
          key: "income",
          label: "Income",
          href: "/dashboard/finance/income",
        },
        {
          key: "accounts",
          label: "Bank Accounts",
          href: "/dashboard/finance/accounts",
        },
      ],
    },
    {
      key: "hrm",
      label: "HRM",
      href: "/dashboard/hrm",
      icon: <TeamOutlined />,
      children: [
        {
          key: "employees",
          label: "Employees",
          href: "/dashboard/hrm/employees",
        },
        {
          key: "attendance",
          label: "Attendance",
          href: "/dashboard/hrm/attendance",
        },
        {
          key: "payroll",
          label: "Payroll",
          href: "/dashboard/hrm/payroll",
        },
      ],
    },
    {
      key: "promotions",
      label: "Promotions",
      href: "/dashboard/promotions",
      icon: <GiftOutlined />,
      children: [
        {
          key: "coupons",
          label: "Coupons",
          href: "/dashboard/promotions/coupons",
        },
        {
          key: "discounts",
          label: "Discounts",
          href: "/dashboard/promotions/discounts",
        },
      ],
    },
    {
      key: "cms",
      label: "CMS",
      href: "/dashboard/cms",
      icon: <FileTextOutlined />,
      children: [
        {
          key: "pages",
          label: "Pages",
          href: "/dashboard/cms/pages",
        },
        {
          key: "blogs",
          label: "Blogs",
          href: "/dashboard/cms/blogs",
        },
        {
          key: "faqs",
          label: "FAQs",
          href: "/dashboard/cms/faqs",
        },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      href: "/dashboard/settings",
      icon: <SettingOutlined />,
    },
  ];

  // control collapsed state here and pass to Header and Sider
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo text-white text-xl p-4">Dashboard</div>
        <Sidebar items={menuItems} collapsed={collapsed} />
      </Sider>
      <Layout
        style={{
          minHeight: "100vh",
          marginLeft: collapsed ? 0 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <DashboardHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed((s) => !s)}
        />
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#fff",
            borderRadius: "8px",
            minHeight: "280px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
