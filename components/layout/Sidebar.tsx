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

  const findSelectedKeys = (
    items: MenuItem[],
    path: string,
    parentKey?: string
  ): string[] => {
    const keys: string[] = [];

    for (const item of items) {
      if (path.startsWith(item.href)) {
        if (parentKey) {
          keys.push(parentKey);
        }
        keys.push(item.key);

        if (item.children) {
          const childKeys = findSelectedKeys(item.children, path, item.key);
          keys.push(...childKeys);
        }
      }
    }

    return keys;
  };

  const selectedKeys = findSelectedKeys(items, pathname);

  const sidebarContent = (
    <nav
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={selectedKeys}
        items={menuItems}
      />
    </nav>
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
