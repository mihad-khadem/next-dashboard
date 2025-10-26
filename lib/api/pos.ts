import axios from "axios";
import type { Product, Order, Customer, ProductVariant } from "../../types/pos";
// lib/api/pos.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const posApi = {
  // Products
  getProducts: () => axios.get<Product[]>(`${API_URL}/products`),

  getProduct: (id: string) => axios.get<Product>(`${API_URL}/products/${id}`),

  createProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) =>
    axios.post<Product>(`${API_URL}/products`, product),

  updateProduct: (id: string, product: Partial<Product>) =>
    axios.put<Product>(`${API_URL}/products/${id}`, product),

  deleteProduct: (id: string) => axios.delete(`${API_URL}/products/${id}`),

  // Product variants
  createProductVariant: (
    productId: string,
    variant: Omit<ProductVariant, "id" | "productId">
  ) => axios.post(`${API_URL}/products/${productId}/variants`, variant),

  updateProductVariant: (
    productId: string,
    variantId: string,
    variant: Partial<Omit<ProductVariant, "id" | "productId">>
  ) =>
    axios.put(
      `${API_URL}/products/${productId}/variants/${variantId}`,
      variant
    ),

  deleteProductVariant: (productId: string, variantId: string) =>
    axios.delete(`${API_URL}/products/${productId}/variants/${variantId}`),

  // Orders
  createOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) =>
    axios.post<Order>(`${API_URL}/orders`, order),

  getOrder: (id: string) => axios.get<Order>(`${API_URL}/orders/${id}`),

  updateOrder: (id: string, order: Partial<Order>) =>
    axios.put<Order>(`${API_URL}/orders/${id}`, order),

  getOrders: (params?: {
    startDate?: string;
    endDate?: string;
    status?: string;
    customerId?: string;
  }) => axios.get<Order[]>(`${API_URL}/orders`, { params }),

  // Customers
  getCustomers: () => axios.get<Customer[]>(`${API_URL}/customers`),

  getCustomer: (id: string) =>
    axios.get<Customer>(`${API_URL}/customers/${id}`),

  createCustomer: (
    customer: Omit<
      Customer,
      "id" | "createdAt" | "totalPurchases" | "loyaltyPoints"
    >
  ) =>
    axios.post<Customer>(`${API_URL}/customers`, {
      ...customer,
      loyaltyPoints: 0,
      totalPurchases: 0,
    }),

  updateCustomer: (id: string, customer: Partial<Customer>) =>
    axios.put<Customer>(`${API_URL}/customers/${id}`, customer),

  // Inventory
  adjustStock: (productId: string, adjustment: number, reason: string) =>
    axios.post(`${API_URL}/inventory/adjust`, {
      productId,
      adjustment,
      reason,
    }),

  getInventoryAlerts: () => axios.get(`${API_URL}/inventory/alerts`),

  // Payments
  processPayment: (
    orderId: string,
    payment: {
      method: string;
      amount: number;
      reference?: string;
    }
  ) => axios.post(`${API_URL}/payments/${orderId}`, payment),

  refundPayment: (orderId: string, amount: number, reason: string) =>
    axios.post(`${API_URL}/payments/${orderId}/refund`, {
      amount,
      reason,
    }),

  // Hold Orders
  holdOrder: (order: {
    items: Order["items"];
    customerId?: string;
    note: string;
  }) => axios.post(`${API_URL}/orders/hold`, order),

  getHeldOrders: () => axios.get<Order[]>(`${API_URL}/orders/held`),

  releaseHeldOrder: (orderId: string) =>
    axios.post(`${API_URL}/orders/${orderId}/release`),

  // Reports
  getDailySales: (date: string) =>
    axios.get(`${API_URL}/reports/daily-sales`, { params: { date } }),

  getInventoryReport: () => axios.get(`${API_URL}/reports/inventory`),

  getCustomerReport: (customerId: string) =>
    axios.get(`${API_URL}/reports/customer/${customerId}`),

  // Analytics
  getSalesAnalytics: (params: {
    startDate: string;
    endDate: string;
    groupBy: "day" | "week" | "month";
  }) => axios.get(`${API_URL}/analytics/sales`, { params }),

  getProductAnalytics: (params: { startDate: string; endDate: string }) =>
    axios.get(`${API_URL}/analytics/products`, { params }),

  getCustomerAnalytics: (params: { startDate: string; endDate: string }) =>
    axios.get(`${API_URL}/analytics/customers`, { params }),
};
