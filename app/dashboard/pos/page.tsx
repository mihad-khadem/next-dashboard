"use client";

import React, { useState, useEffect } from "react";
import POSCart from "@/components/pos/POSCart";
import POSProductCard from "@/components/pos/POSProductCard";
import POSPaymentModal from "@/components/pos/POSPaymentModal";
import POSHoldOrderModal from "@/components/pos/POSHoldOrderModal";
import POSDiscountModal from "@/components/pos/POSDiscountModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import {
  addToCart,
  clearCart,
  holdOrder,
  applyDiscount,
  updateQuantity,
  loadHeldOrder,
} from "@/store/slices/posSlice";
import type { Product, Customer } from "@/types/pos";
import { productsSample } from "@/data";

export default function POSPage() {
  const dispatch = useAppDispatch();
  const {
    products: storeProducts,
    customers: storeCustomers,
    cart,
  } = useAppSelector((state: RootState) => state.pos);

  // Local state for modals and selected customer
  const [selectedCustomer, setSelectedCustomer] = useState<
    string | undefined
  >();
  const [showPayment, setShowPayment] = useState(false);
  const [showHoldOrder, setShowHoldOrder] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  // 🔹 Mock data for testing
  const [products, setProducts] = useState<Product[]>(productsSample);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Initialize with mock data if store is empty
    setProducts(
      storeProducts.length
        ? storeProducts
        : [
            {
              id: "p1",
              name: "Apple",
              sku: "A001",
              category: "Fruit",
              price: 1,
              stock: 100,
            },
            {
              id: "p2",
              name: "Banana",
              sku: "B001",
              category: "Fruit",
              price: 0.5,
              stock: 50,
            },
            {
              id: "p3",
              name: "Orange",
              sku: "O001",
              category: "Fruit",
              price: 1.2,
              stock: 80,
            },
            {
              id: "p4",
              name: "Milk",
              sku: "M001",
              category: "Dairy",
              price: 2,
              stock: 30,
            },
            {
              id: "p5",
              name: "Bread",
              sku: "B002",
              category: "Bakery",
              price: 1.5,
              stock: 40,
            },
          ]
    );

    setCustomers(
      storeCustomers.length
        ? storeCustomers
        : [
            {
              id: "c1",
              name: "John Doe",
              email: "johndoe@example.com",
              phone: "1234567890",
              totalPurchases: 0,
            },
            {
              id: "c2",
              name: "John Doe",
              email: "johndoe@example.com",
              phone: "1234567890",
              totalPurchases: 0,
            },
          ]
    );
  }, [storeProducts, storeCustomers]);

  // Handlers
  const handleSelectProduct = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleCheckout = () => setShowPayment(true);
  const handleHoldOrder = () => setShowHoldOrder(true);
  const handleDiscount = () => setShowDiscount(true);

  const handleApplyDiscount = (type: "percentage" | "fixed", value: number) => {
    dispatch(applyDiscount({ type, value }));
    setShowDiscount(false);
  };

  const handleCompletePayment = (values: any) => {
    // Replace with real API call if needed
    dispatch(clearCart());
    setShowPayment(false);
  };

  const handleHold = (note: string) => {
    dispatch(holdOrder({ note, customerId: selectedCustomer }));
    setShowHoldOrder(false);
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Products list */}
      <div className="grid grid-cols-3 gap-4 flex-1">
        {products.map((product) => (
          <POSProductCard
            key={product.id}
            product={product}
            onSelect={handleSelectProduct}
          />
        ))}
      </div>

      {/* Cart */}
      <div className="w-1/3">
        <POSCart
          products={products}
          customers={customers}
          selectedCustomer={selectedCustomer}
          onCustomerChange={setSelectedCustomer}
          onCheckout={handleCheckout}
          onDiscount={handleDiscount}
          onHoldOrder={handleHoldOrder}
        />
      </div>

      {/* Modals */}
      <POSPaymentModal
        visible={showPayment}
        total={cart.total}
        onCancel={() => setShowPayment(false)}
        onCheckout={handleCompletePayment}
      />
      <POSHoldOrderModal
        visible={showHoldOrder}
        onCancel={() => setShowHoldOrder(false)}
        onHold={handleHold}
      />
      <POSDiscountModal
        visible={showDiscount}
        onCancel={() => setShowDiscount(false)}
        onApply={handleApplyDiscount}
      />
    </div>
  );
}
