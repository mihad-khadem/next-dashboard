import { Product, Sale } from "./api";

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
