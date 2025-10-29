// pos.types.ts

// ===== PRODUCT =====
export interface Product {
  id: string;
  name: string;
  sku: string; // Stock Keeping Unit
  category: string;
  price: number;
  cost?: number;
  stock: number;
  minStock?: number;
  barcode?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ===== CUSTOMER =====
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalPurchases: number;
  loyaltyPoints?: number;
  lastPurchaseDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ===== ORDER =====
export interface OrderItem {
  productId: string;
  name?: string; // Snapshot of product name at time of sale
  sku?: string; // Snapshot of product SKU at time of sale
  quantity: number;
  price: number; // Unit price
  discount?: number; // Per-item discount
  total?: number; // quantity * price - discount
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "partial" | "completed" | "failed";
export type PaymentMethod = "cash" | "card" | "mobile" | "bank";

export interface Order {
  id: string;
  orderNumber?: string;
  customerId: string | null; // null for walk-in customers
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount?: number;
  dueAmount?: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt?: string;
}

// ===== PAYMENT =====
export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  amount: number;
  transactionId?: string;
  paymentDate: string;
}

// ===== STOCK HISTORY =====
export type StockChangeType = "sale" | "restock" | "return" | "adjustment";

export interface StockHistory {
  id: string;
  productId: string;
  changeType: StockChangeType;
  quantityChanged: number;
  previousStock: number;
  newStock: number;
  createdAt: string;
}
export type ProductVariant = {
  id: string;
  productId: string;
  name: string; // e.g., "Size: M", "Color: Red"
  sku: string;
  price: number;
  stock: number;
  attributes: {
    [key: string]: string; // e.g., { size: 'XL', color: 'Red' }
  };
  createdAt?: string;
  updatedAt?: string;
};
