"use client";
import React from "react";
import { Card, Tag } from "antd";
import type { Product } from "@/types/pos";

interface POSProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export default function POSProductCard({
  product,
  onSelect,
}: POSProductCardProps) {
  return (
    <Card
      hoverable
      className="cursor-pointer"
      onClick={() => onSelect(product.id)}
    >
      <div className="text-center">
        <div className="font-medium">{product.name}</div>
        <div className="text-lg">${product.price.toFixed(2)}</div>
        <Tag color={product.stock > 0 ? "green" : "red"}>
          {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
        </Tag>
      </div>
    </Card>
  );
}
