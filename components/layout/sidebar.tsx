// components/layout/Sidebar.tsx
"use client";

import { Menu, Drawer } from "antd";
import type { MenuProps } from "antd";
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

  type MenuItemType = Required<MenuProps>["items"][number];

  const convertMenuItem = (item: MenuItem): MenuItemType => {
    const menuItem = {
      key: item.key,
      icon: item.icon,
      label: <Link href={item.href}>{item.label}</Link>,
    };

    if (item.children) {
      return {
        ...menuItem,
        children: item.children.map(convertMenuItem),
      };
    }

    return menuItem;
  };

  const menuItems = items.map(convertMenuItem);

  const findSelectedKey = (
    items: MenuItem[],
    path: string
  ): string | undefined => {
    for (const item of items) {
      if (path.startsWith(item.href)) {
        return item.key;
      }
      if (item.children) {
        const childKey = findSelectedKey(item.children, path);
        if (childKey) return childKey;
      }
    }
    return undefined;
  };

  const selectedKey = findSelectedKey(items, pathname);

  const sidebarContent = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKey ? [selectedKey] : []}
      items={menuItems}
    />
  );

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
        {sidebarContent}
      </Drawer>
    );
  }

  return sidebarContent;
}
