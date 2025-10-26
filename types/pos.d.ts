export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  price: number;
  cost: number;
  category: string;
  subcategory?: string;
  brand?: string;
  description?: string;
  variants?: ProductVariant[];
  stock: number;
  minStock: number;
  images?: string[];
  supplier?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: {
    [key: string]: string; // e.g., { size: 'XL', color: 'Red' }
  };
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  loyaltyPoints: number;
  totalPurchases: number;
  lastPurchase?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerId?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export type PaymentMethod = "cash" | "card" | "mobile" | "online";
export type PaymentStatus = "pending" | "partial" | "completed" | "refunded";
export type OrderStatus = "pending" | "completed" | "cancelled" | "refunded";
