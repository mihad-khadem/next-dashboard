"use client";

import { useState } from "react";
import { Card, Table, Button, Input, Modal, Form, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import type { Product } from "@/types/pos";
import { posApi } from "@/lib/api/pos";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await posApi.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values: any) => {
    try {
      await posApi.createProduct(values);
      message.success("Product created successfully");
      setModalVisible(false);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      console.error("Failed to create product:", error);
      message.error("Failed to create product");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      filterable: true,
    },
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: true,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: [
        // TODO: Add dynamic category filters
      ],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <div className="space-x-2">
          <Button size="small" onClick={() => {}}>
            Edit
          </Button>
          <Button size="small" danger onClick={() => {}}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="Products"
        extra={
          <div className="space-x-2">
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Add Product
            </Button>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          loading={loading}
        />
      </Card>

      <Modal
        title="Add Product"
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Initial Stock"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
