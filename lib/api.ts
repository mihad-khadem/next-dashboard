// src/lib/api.ts
import { notification } from "antd";
import {
  Product,
  Category,
  Sale,
  StockAdjustment,
  StockTransfer,
  ReportParams,
  ApiErrorDetails,
  SalesReport,
  InventoryReport,
  FinanceReport,
} from "../types";

// Custom API error interface
interface ApiError extends Error {
  status?: number;
  details?: ApiErrorDetails;
}

// Base API URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Handle API responses and throw structured errors
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const error: ApiError = new Error(data.message || "An error occurred");
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

// Generic fetch wrapper
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // keep this if using cookies/JWT
    });

    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof Error) {
      notification.error({
        message: "Error",
        description: error.message || "An error occurred",
      });
    }
    throw error;
  }
}

// HTTP helper methods
export const get = <T>(endpoint: string) => fetchApi<T>(endpoint);
export const post = <T>(endpoint: string, data: unknown) =>
  fetchApi<T>(endpoint, { method: "POST", body: JSON.stringify(data) });
export const put = <T>(endpoint: string, data: unknown) =>
  fetchApi<T>(endpoint, { method: "PUT", body: JSON.stringify(data) });
export const del = <T>(endpoint: string) =>
  fetchApi<T>(endpoint, { method: "DELETE" });

// ======================
// FEATURED API ENDPOINTS
// ======================

export const api = {
  products: {
    list: () => get<Product[]>("/products"),
    create: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) =>
      post<Product>("/products", data),
    update: (
      id: string,
      data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
    ) => put<Product>(`/products/${id}`, data),
    delete: (id: string) => del<void>(`/products/${id}`),
  },

  categories: {
    list: () => get<Category[]>("/categories"),
    create: (data: Omit<Category, "id" | "createdAt" | "updatedAt">) =>
      post<Category>("/categories", data),
    update: (
      id: string,
      data: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>
    ) => put<Category>(`/categories/${id}`, data),
    delete: (id: string) => del<void>(`/categories/${id}`),
  },

  sales: {
    list: () => get<Sale[]>("/sales"),
    create: (data: Omit<Sale, "id" | "createdAt" | "updatedAt">) =>
      post<Sale>("/sales", data),
    getById: (id: string) => get<Sale>(`/sales/${id}`),
  },

  stock: {
    list: () => get<Product[]>("/stock"),
    adjust: (data: StockAdjustment) => post<void>("/stock/adjust", data),
    transfer: (data: StockTransfer) => post<void>("/stock/transfer", data),
  },

  reports: {
    sales: (params: ReportParams) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
      return get<SalesReport>("/reports/sales?" + searchParams.toString());
    },
    inventory: (params: ReportParams) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
      return get<InventoryReport>(
        "/reports/inventory?" + searchParams.toString()
      );
    },
    finance: (params: ReportParams) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
      return get<FinanceReport>("/reports/finance?" + searchParams.toString());
    },
  },
};
