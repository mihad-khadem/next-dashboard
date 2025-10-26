export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  customerId?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  paymentMethod: "cash" | "card";
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface StockAdjustment {
  productId: string;
  quantity: number;
  reason: string;
  notes?: string;
}

export interface StockTransfer {
  productId: string;
  quantity: number;
  fromLocationId: string;
  toLocationId: string;
  notes?: string;
}

export interface ReportParams {
  startDate: string;
  endDate: string;
  groupBy?: "day" | "week" | "month";
}

export interface ApiErrorDetails {
  code?: string;
  field?: string;
  message: string;
}
