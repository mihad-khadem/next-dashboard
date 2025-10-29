"use client";

import React from "react";
import { Table, Input, Button, Select } from "antd";
import type { RootState } from "@/store";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/store/slices/posSlice";
import type { Product, Customer } from "@/types/pos";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

interface POSCartProps {
  products: Product[];
  customers: Customer[];
  selectedCustomer?: string;
  onCustomerChange?: (customerId: string | undefined) => void;
  onCheckout: () => void;
  onDiscount: () => void;
  onHoldOrder: () => void;
}

export default function POSCart({
  products,
  customers,
  selectedCustomer,
  onCustomerChange,
  onCheckout,
  onDiscount,
  onHoldOrder,
}: POSCartProps) {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector((state: RootState) => state.pos);

  const columns = [
    {
      title: "Product",
      dataIndex: "productId",
      render: (productId: string) =>
        products.find((p) => p.id === productId)?.name || "Unknown",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (quantity: number, record: { productId: string }) => (
        <Input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) =>
            dispatch(
              updateQuantity({
                productId: record.productId,
                quantity: parseInt(e.target.value),
              })
            )
          }
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (_: any, record: { productId: string }) => {
        const product = products.find((p) => p.id === record.productId);
        return `$${(product?.price ?? 0).toFixed(2)}`;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (_: any, record: { productId: string; quantity: number }) => {
        const product = products.find((p) => p.id === record.productId);
        return `$${((product?.price ?? 0) * record.quantity).toFixed(2)}`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: { productId: string }) => (
        <Button
          danger
          onClick={() => dispatch(removeFromCart(record.productId))}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Customer select */}
      <div className="mb-2">
        <Select
          placeholder="Select Customer"
          value={selectedCustomer}
          onChange={onCustomerChange}
          style={{ width: "100%" }}
          allowClear
        >
          {customers.map((c) => (
            <Select.Option key={c.id} value={c.id}>
              {c.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Cart Table */}
      <Table
        columns={columns}
        dataSource={cart.items}
        rowKey="productId"
        pagination={false}
        loading={loading}
      />

      {/* Cart Summary */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${cart.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${cart.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount:</span>
          <span>${cart.discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <Button
            type="primary"
            onClick={onCheckout}
            disabled={cart.items.length === 0}
            className="flex-1"
          >
            Checkout
          </Button>
          <Button onClick={onDiscount} disabled={cart.items.length === 0}>
            Discount
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            onClick={onHoldOrder}
            disabled={cart.items.length === 0}
            className="flex-1"
          >
            Hold Order
          </Button>
          <Button
            onClick={() => dispatch(clearCart())}
            disabled={cart.items.length === 0}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
