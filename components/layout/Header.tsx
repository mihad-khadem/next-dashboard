// components/layout/DashboardHeader.tsx
"use client";

import { Layout, Button, Dropdown, Avatar, Badge } from "antd";
import type { MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import SearchBar from "./SearchBar";

const { Header } = Layout;

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function DashboardHeader({ collapsed, onToggle }: Props) {
  const profileMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];
  const notifications = [
    {
      key: "1",
      label: "New order received",
      time: "5 minutes ago",
    },
    {
      key: "2",
      label: "Server CPU usage high",
      time: "10 minutes ago",
    },
    {
      key: "3",
      label: "Database backup completed",
      time: "30 minutes ago",
    },
  ];

  const notificationMenu = {
    items: notifications.map((notif) => ({
      key: notif.key,
      label: (
        <div>
          <div className="font-medium">{notif.label}</div>
          <div className="text-xs text-gray-500">{notif.time}</div>
        </div>
      ),
    })),
  };

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
        />
        <span className="text-lg font-semibold">Enterprise Dashboard</span>
      </div>
      <div className="hidden md:block">
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <Dropdown
          menu={notificationMenu}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Badge count={notifications.length} size="small">
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: "18px" }} />}
            />
          </Badge>
        </Dropdown>
        <Dropdown
          menu={{ items: profileMenu }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar icon={<UserOutlined />} />
            <span className="hidden md:inline">John Doe</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}
