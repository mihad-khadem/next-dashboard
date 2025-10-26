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
import { Card, Row, Col, Input, Button, Select } from "antd";
import { SearchOutlined, BarcodeOutlined } from "@ant-design/icons";
import { posApi } from "../../../lib/api/pos";
import type { Product, Customer } from "../../../types/pos";

import POSCart from "@/components/pos/POSCart";
import POSProductCard from "@/components/pos/POSProductCard";
import POSPaymentModal from "@/components/pos/POSPaymentModal";
import POSHoldOrderModal from "@/components/pos/POSHoldOrderModal";
import POSDiscountModal from "@/components/pos/POSDiscountModal";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";

export default function POSPage() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state: RootState) => state.pos);

  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>();
  const [paymentModal, setPaymentModal] = useState(false);
  const [holdOrderModal, setHoldOrderModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
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

  const handleProductSelect = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleScanBarcode = () => {
    setScanning(true);
    const searchInput = document.querySelector(
      'input[placeholder="Search products..."]'
    );
    if (searchInput) (searchInput as HTMLInputElement).focus();
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
        {/* Products */}
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
                <POSProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => handleProductSelect(product.id)}
                />
              ))}
            </div>
          </Card>
        </Col>

        {/* Cart */}
        <Col xs={24} lg={8}>
          <POSCart
            cart={cart}
            customers={customers}
            selectedCustomer={selectedCustomer}
            onCustomerChange={setSelectedCustomer}
            onClearCart={() => dispatch(clearCart())}
            onOpenPayment={() => setPaymentModal(true)}
            onOpenHoldOrder={() => setHoldOrderModal(true)}
            onOpenDiscount={() => setDiscountModal(true)}
            onUpdateQuantity={(productId, quantity) =>
              dispatch(updateQuantity({ productId, quantity }))
            }
          />
        </Col>
      </Row>

      {/* Modals */}
      <POSPaymentModal
        visible={paymentModal}
        onClose={() => setPaymentModal(false)}
        cart={cart}
        selectedCustomer={selectedCustomer}
        onCheckout={() => setPaymentModal(false)}
      />

      <POSHoldOrderModal
        visible={holdOrderModal}
        onClose={() => setHoldOrderModal(false)}
      />

      <POSDiscountModal
        visible={discountModal}
        onClose={() => setDiscountModal(false)}
        onApply={(type, value) =>
          dispatch(applyDiscount({ type, value: parseFloat(value) }))
        }
      />
    </div>
  );
}
