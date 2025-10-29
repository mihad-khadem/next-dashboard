"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Modal,
  Form,
  message,
  InputNumber,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import type { Product } from "@/types/pos";
import { posApi } from "@/lib/api/pos";
import { productsSample } from "@/data";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

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
      setProducts(productsSample); // Fallback to sample data
    }
  };

  const handleCreateOrUpdate = async (values: any) => {
    try {
      if (editingProduct) {
        await posApi.updateProduct(editingProduct.id, values);
        message.success("Product updated successfully");
      } else {
        await posApi.createProduct(values);
        message.success("Product created successfully");
      }
      setModalVisible(false);
      form.resetFields();
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
      message.error("Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setModalVisible(true);
  };

  const handleDelete = async (product: Product) => {
    try {
      await posApi.deleteProduct(product.id);
      message.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      message.error("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    { title: "SKU", dataIndex: "sku" },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a: Product, b: Product) => a.stock - b.stock,
    },
    { title: "Category", dataIndex: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <div className="space-x-2">
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button size="small" danger onClick={() => handleDelete(record)}>
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
              onClick={() => {
                form.resetFields();
                setEditingProduct(null);
                setModalVisible(true);
              }}
            >
              Add Product
            </Button>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={loading}
        />
      </Card>

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduct(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: "Please enter SKU" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Initial Stock"
            rules={[{ required: true, message: "Please enter initial stock" }]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter category" }]}
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
