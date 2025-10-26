export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost?: number;
  stock: number;
  minStock?: number;
  category: string;
  barcode?: string;
  createdAt?: string;
  updatedAt?: string;
}
// old pos types.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPurchases: number;
  loyaltyPoints?: number;
  createdAt?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  discount?: number;
  total?: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  orderStatus: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus: "pending" | "partial" | "completed" | "failed";
  paymentMethod: "cash" | "card" | "mobile";
  createdAt: string;
  updatedAt?: string;
}

export type PaymentMethod = "cash" | "card" | "mobile";
