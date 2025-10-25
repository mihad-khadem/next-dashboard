// components/layout/Sidebar.tsx
"use client";

import { Menu, Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/dashboard.types";

type Props = {
  items: MenuItem[];
  collapsed: boolean;
  isMobile?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  items,
  collapsed,
  isMobile = false,
  onClose,
}: Props) {
  const pathname = usePathname();

  const menuItems = items.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link href={item.href}>{item.label}</Link>,
  }));

  const selectedKey = items.find((item) => pathname.startsWith(item.href))?.key;

  if (isMobile) {
    return (
      <Drawer
        title="Dashboard"
        placement="left"
        closable
        onClose={onClose}
        open={!collapsed}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={menuItems}
        />
      </Drawer>
    );
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      inlineCollapsed={collapsed}
      selectedKeys={selectedKey ? [selectedKey] : []}
      items={menuItems}
    />
  );
}
