"use client";
import { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

export default function POSEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // TODO: Replace with API call
    setEmployees([
      {
        id: "1",
        name: "Alice",
        role: "Cashier",
        email: "alice@test.com",
        phone: "123456789",
        status: "active",
      },
      {
        id: "2",
        name: "Bob",
        role: "Manager",
        email: "bob@test.com",
        phone: "987654321",
        status: "inactive",
      },
    ]);
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: Employee["status"]) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_: any, record: Employee) => (
        <Button type="link" onClick={() => alert(`Edit ${record.name}`)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
