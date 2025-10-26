"use client";
import { useEffect, useState } from "react";
import { Table, Tag, Button, Select } from "antd";
import { posApi } from "../../../../lib/api/pos";
import type { Order, Customer } from "../../../../types/pos";

export default function POSOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filterCustomer, setFilterCustomer] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, customersRes] = await Promise.all([
          posApi.getOrders(),
          posApi.getCustomers(),
        ]);
        setOrders(ordersRes.data);
        setCustomers(customersRes.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = filterCustomer
    ? orders.filter((o) => o.customerId === filterCustomer)
    : orders;

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    {
      title: "Customer",
      dataIndex: "customerId",
      key: "customer",
      render: (id: string) =>
        customers.find((c) => c.id === id)?.name || "Unknown",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      render: (v: number) => `$${v.toFixed(2)}`,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      render: (v: number) => `$${v.toFixed(2)}`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (v: number) => `$${v.toFixed(2)}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (v: number) => `$${v.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      render: (status: Order["orderStatus"]) => (
        <Tag
          color={
            status === "completed"
              ? "green"
              : status === "pending"
              ? "orange"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_: any, record: Order) => (
        <Button onClick={() => alert(`View order ${record.id}`)} type="link">
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 w-1/3">
        <Select
          placeholder="Filter by Customer"
          className="w-full"
          allowClear
          onChange={setFilterCustomer}
        >
          {customers.map((c) => (
            <Select.Option key={c.id} value={c.id}>
              {c.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
