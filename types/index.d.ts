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

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SalesReport {
  data: {
    date: string;
    total: number;
    count: number;
    items: {
      productId: string;
      name: string;
      quantity: number;
      total: number;
    }[];
  }[];
  summary: {
    totalSales: number;
    totalCount: number;
    averageOrderValue: number;
    topProducts: {
      productId: string;
      name: string;
      quantity: number;
      total: number;
    }[];
  };
}

export interface InventoryReport {
  data: {
    productId: string;
    name: string;
    stock: number;
    value: number;
    movements: {
      date: string;
      type: "in" | "out";
      quantity: number;
      reason: string;
    }[];
  }[];
  summary: {
    totalProducts: number;
    totalValue: number;
    lowStock: Product[];
  };
}

export interface FinanceReport {
  data: {
    date: string;
    revenue: number;
    costs: number;
    profit: number;
    transactions: {
      type: "sale" | "purchase" | "refund";
      amount: number;
      reference: string;
    }[];
  }[];
  summary: {
    totalRevenue: number;
    totalCosts: number;
    totalProfit: number;
    profitMargin: number;
  };
}
