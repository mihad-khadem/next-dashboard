"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  addToCart,
  updateQuantity,
  applyDiscount,
  clearCart,
} from "../../../store/slices/posSlice";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Select,
} from "antd";
import { SearchOutlined, BarcodeOutlined } from "@ant-design/icons";
import { posApi } from "../../../lib/api/pos";
import type { Product, Customer, PaymentMethod } from "../../../types/pos";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";

export default function POSPage() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state: RootState) => state.pos);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>();
  const [paymentModal, setPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scanning, setScanning] = useState(false);
  const [holdOrderModal, setHoldOrderModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [holdOrderForm] = Form.useForm();
  const [discountForm] = Form.useForm();

  useEffect(() => {
    // Load products and customers
    const fetchData = async () => {
      try {
        const [productsRes, customersRes] = await Promise.all([
          posApi.getProducts(),
          posApi.getCustomers(),
        ]);
        setProducts(productsRes.data);
        setCustomers(customersRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // TODO: Show error notification
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchTerm))
  );

  const columns = [
    {
      title: "Product",
      dataIndex: "productId",
      render: (productId: string) => {
        const product = products.find((p) => p.id === productId);
        return product?.name || "Unknown Product";
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (
        quantity: number,
        record: { productId: string; quantity: number }
      ) => (
        <Input
          type="number"
          value={quantity}
          onChange={(e) =>
            dispatch(
              updateQuantity({
                productId: record.productId,
                quantity: parseInt(e.target.value),
              })
            )
          }
          min={1}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (total: number) => `$${total.toFixed(2)}`,
    },
  ];

  const handleProductSelect = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleScanBarcode = () => {
    setScanning(true);
    // TODO: Implement barcode scanning
    // For now, just focus the search input
    const searchInput = document.querySelector(
      'input[placeholder="Search products..."]'
    );
    if (searchInput) {
      (searchInput as HTMLInputElement).focus();
    }
  };

  const [paymentForm] = Form.useForm();

  const handleHoldOrder = async () => {
    try {
      const values = await holdOrderForm.validateFields();
      // Store the current cart state with the note
      // TODO: Implement order holding functionality
      dispatch(clearCart());
      setHoldOrderModal(false);
      holdOrderForm.resetFields();
    } catch (error) {
      console.error("Failed to hold order:", error);
    }
  };

  const handleApplyDiscount = async () => {
    try {
      const values = await discountForm.validateFields();
      dispatch(
        applyDiscount({
          type: values.type,
          value: parseFloat(values.value),
        })
      );
      setDiscountModal(false);
      discountForm.resetFields();
    } catch (error) {
      console.error("Failed to apply discount:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const values = await paymentForm.validateFields();
      const order = {
        customerId: selectedCustomer,
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        discount: cart.discount,
        total: cart.total,
        paymentMethod: values.paymentMethod as PaymentMethod,
        paymentStatus:
          values.amount >= cart.total
            ? ("completed" as const)
            : ("partial" as const),
        orderStatus: "completed" as const,
      };

      // Create order and process payment
      const orderRes = await posApi.createOrder(order);
      await posApi.processPayment(orderRes.data.id, {
        method: values.paymentMethod,
        amount: values.amount,
        reference: values.reference,
      });

      // Clear cart and close modal
      dispatch(clearCart());
      setPaymentModal(false);
      paymentForm.resetFields();

      // TODO: Print receipt
    } catch (error) {
      console.error("Checkout failed:", error);
      // TODO: Show error notification
    }
  };

  return (
    <div className="p-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget title="Today's Sales" value="$1,240" />
        <StatWidget title="Transactions" value="32" />
        <StatWidget title="Avg. Basket" value="$38.75" />
        <StatWidget title="Open Orders" value="3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <OverviewChart className="h-[220px]" />
        <OverviewChart className="h-[220px]" />
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Products">
            <div className="mb-4 flex gap-2">
              <Input
                placeholder="Search products..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                icon={<BarcodeOutlined />}
                loading={scanning}
                onClick={handleScanBarcode}
              >
                Scan
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  hoverable
                  className="cursor-pointer"
                  onClick={() => handleProductSelect(product.id)}
                >
                  <div className="text-center">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-lg">${product.price.toFixed(2)}</div>
                    <Tag color={product.stock > 0 ? "green" : "red"}>
                      {product.stock > 0
                        ? `Stock: ${product.stock}`
                        : "Out of Stock"}
                    </Tag>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Cart">
            <Select
              className="w-full mb-4"
              placeholder="Select Customer"
              onChange={setSelectedCustomer}
              allowClear
            >
              {customers.map((customer) => (
                <Select.Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Select.Option>
              ))}
            </Select>

            <Table
              columns={columns}
              dataSource={cart.items}
              pagination={false}
              rowKey="productId"
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
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex gap-2">
                <Button
                  type="primary"
                  onClick={() => setPaymentModal(true)}
                  disabled={cart.items.length === 0}
                  className="flex-1"
                >
                  Checkout
                </Button>
                <Button
                  onClick={() => setDiscountModal(true)}
                  disabled={cart.items.length === 0}
                >
                  Discount
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setHoldOrderModal(true)}
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
          </Card>
        </Col>
      </Row>

      <Modal
        title="Payment"
        open={paymentModal}
        onOk={handleCheckout}
        onCancel={() => setPaymentModal(false)}
        okText="Complete Payment"
      >
        <Form form={paymentForm} layout="vertical">
          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[
              { required: true, message: "Please select payment method" },
            ]}
          >
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
              <Select.Option value="mobile">Mobile Payment</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              { required: true, message: "Please enter amount" },
              {
                type: "number",
                min: 0,
                message: "Amount must be greater than 0",
              },
            ]}
          >
            <Input type="number" prefix="$" />
          </Form.Item>

          <Form.Item name="reference" label="Reference">
            <Input placeholder="Transaction reference or notes" />
          </Form.Item>

          <div className="text-right text-lg font-bold">
            Total to Pay: ${cart.total.toFixed(2)}
          </div>
        </Form>
      </Modal>

      <Modal
        title="Hold Order"
        open={holdOrderModal}
        onOk={handleHoldOrder}
        onCancel={() => setHoldOrderModal(false)}
        okText="Hold Order"
      >
        <Form form={holdOrderForm} layout="vertical">
          <Form.Item
            name="note"
            label="Order Note"
            rules={[{ required: true, message: "Please enter a note" }]}
          >
            <Input.TextArea placeholder="Enter a note for this order (e.g., customer name, table number)" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Apply Discount"
        open={discountModal}
        onOk={handleApplyDiscount}
        onCancel={() => setDiscountModal(false)}
        okText="Apply Discount"
      >
        <Form form={discountForm} layout="vertical">
          <Form.Item
            name="type"
            label="Discount Type"
            rules={[{ required: true, message: "Please select discount type" }]}
          >
            <Select>
              <Select.Option value="percentage">Percentage (%)</Select.Option>
              <Select.Option value="fixed">Fixed Amount ($)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="value"
            label="Discount Value"
            rules={[
              { required: true, message: "Please enter discount value" },
              {
                type: "number",
                min: 0,
                message: "Value must be greater than 0",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
