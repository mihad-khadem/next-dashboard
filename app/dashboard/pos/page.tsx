"use client";

import { useState } from "react";
import { Card, Row, Col, Input, Button, Table, Tag } from "antd";
import { SearchOutlined, BarcodeOutlined } from "@ant-design/icons";

const demoProducts = [
  { id: 1, name: "Product 1", price: 29.99, stock: 100 },
  { id: 2, name: "Product 2", price: 39.99, stock: 75 },
  { id: 3, name: "Product 3", price: 19.99, stock: 50 },
];

const cartColumns = [
  { title: "Product", dataIndex: "name", key: "name" },
  { title: "Price", dataIndex: "price", key: "price" },
  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  {
    title: "Total",
    key: "total",
    render: (_, record) => (record.price * record.quantity).toFixed(2),
  },
];

export default function POSPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Point of Sale</h1>

      <Row gutter={[16, 16]}>
        {/* Products Section */}
        <Col xs={24} lg={16}>
          <Card title="Products">
            <div className="mb-4 flex gap-2">
              <Input
                placeholder="Search products..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button icon={<BarcodeOutlined />}>Scan</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {demoProducts.map((product) => (
                <Card
                  key={product.id}
                  hoverable
                  className="cursor-pointer"
                  onClick={() => handleAddToCart(product)}
                >
                  <div className="text-center">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-lg">${product.price}</div>
                    <Tag color={product.stock > 50 ? "green" : "orange"}>
                      Stock: {product.stock}
                    </Tag>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>

        {/* Cart Section */}
        <Col xs={24} lg={8}>
          <Card title="Cart">
            <Table
              columns={cartColumns}
              dataSource={cart}
              pagination={false}
              rowKey="id"
            />

            <div className="mt-4 text-right">
              <div className="text-xl font-bold">
                Total: ${total.toFixed(2)}
              </div>
              <Button type="primary" className="mt-2" block>
                Complete Sale
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// Fix TypeScript errors
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
