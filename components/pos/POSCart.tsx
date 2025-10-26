"use client";
import React from "react";
import { Table, Input, Button } from "antd";
import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, clearCart } from "@/store/slices/posSlice";
import type { Product } from "@/types/pos";

interface POSCartProps {
  products: Product[];
  selectedCustomer: string | undefined;
  onCheckout: () => void;
  onDiscount: () => void;
  onHoldOrder: () => void;
}

export default function POSCart({
  products,
  selectedCustomer,
  onCheckout,
  onDiscount,
  onHoldOrder,
}: POSCartProps) {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state: RootState) => state.pos);

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
      render: (_: any, record: { productId: string; quantity: number }) => {
        const product = products.find((p) => p.id === record.productId);
        return `$${product?.price.toFixed(2)}`;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (_: any, record: { productId: string; quantity: number }) => {
        const product = products.find((p) => p.id === record.productId);
        return `$${(product?.price * record.quantity).toFixed(2)}`;
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={cart.items}
        rowKey="productId"
        pagination={false}
        loading={loading}
      />
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
