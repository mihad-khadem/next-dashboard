import { Product, Customer, Order } from "@/types/pos";

// Products Data
export const products: Product[] = [
  {
    id: "p1",
    name: "iPhone 14 Pro",
    sku: "APL-IP14-PRO",
    price: 999.99,
    cost: 800.0,
    stock: 45,
    minStock: 10,
    category: "Electronics",
    barcode: "123456789001",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-10-25T00:00:00Z",
  },
  {
    id: "p2",
    name: "Samsung Galaxy S23",
    sku: "SAM-S23-256",
    price: 899.99,
    cost: 720.0,
    stock: 30,
    minStock: 8,
    category: "Electronics",
    barcode: "123456789002",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-10-25T00:00:00Z",
  },
  {
    id: "p3",
    name: "MacBook Pro M2",
    sku: "APL-MBP-M2",
    price: 1499.99,
    cost: 1200.0,
    stock: 15,
    minStock: 5,
    category: "Electronics",
    barcode: "123456789003",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-10-25T00:00:00Z",
  },
  {
    id: "p4",
    name: "AirPods Pro",
    sku: "APL-APP-2",
    price: 249.99,
    cost: 180.0,
    stock: 100,
    minStock: 20,
    category: "Electronics",
    barcode: "123456789004",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-10-25T00:00:00Z",
  },
  {
    id: "p5",
    name: "Nike Air Max",
    sku: "NK-AM-001",
    price: 129.99,
    cost: 80.0,
    stock: 50,
    minStock: 15,
    category: "Footwear",
    barcode: "123456789005",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-10-25T00:00:00Z",
  },
  // Add more products as needed
];

// Customers Data
export const customers: Customer[] = [
  {
    id: "c1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    totalPurchases: 2450.75,
    loyaltyPoints: 245,
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "c2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    address: "456 Oak Ave",
    totalPurchases: 1850.25,
    loyaltyPoints: 185,
    createdAt: "2023-02-20T00:00:00Z",
  },
  // Add more customers
];

// Sales Data
export const salesData = {
  daily: {
    labels: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
    data: [1200, 1900, 2100, 2500, 2300, 2800, 3000, 2900, 2700],
  },
  weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [12500, 14800, 13200, 15600, 16200, 18500, 17200],
  },
  monthly: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    data: [
      52000, 48000, 61000, 58000, 63000, 65000, 68000, 71000, 75000, 72000,
      78000, 82000,
    ],
  },
};

// Dashboard Stats
export const dashboardStats = {
  todayStats: {
    totalSales: "$12,846",
    totalOrders: 142,
    avgOrderValue: "$90.46",
    activeUsers: 284,
  },
  revenueStats: {
    total: "$847,923",
    growth: "+12.8%",
    target: "$900,000",
    current: 847923,
  },
  productStats: {
    total: 1284,
    active: 1147,
    lowStock: 23,
    outOfStock: 114,
  },
  userStats: {
    total: 4752,
    active: 2841,
    new: 147,
    returning: 2694,
  },
};

// Recent Orders
export const recentOrders: Order[] = [
  {
    id: "ord1",
    customerId: "c1",
    items: [
      {
        productId: "p1",
        quantity: 1,
        price: 999.99,
        discount: 0,
        total: 999.99,
      },
      {
        productId: "p4",
        quantity: 2,
        price: 249.99,
        discount: 0,
        total: 499.98,
      },
    ],
    subtotal: 1499.97,
    tax: 150.0,
    discount: 0,
    total: 1649.97,
    orderStatus: "completed",
    paymentStatus: "completed",
    paymentMethod: "card",
    createdAt: "2023-10-25T14:30:00Z",
  },
  {
    id: "ord2",
    customerId: "c2",
    items: [
      {
        productId: "p5",
        quantity: 1,
        price: 129.99,
        discount: 0,
        total: 129.99,
      },
    ],
    subtotal: 129.99,
    tax: 13.0,
    discount: 0,
    total: 142.99,
    status: "completed",
    paymentStatus: "completed",
    paymentMethod: "cash",
    createdAt: "2023-10-25T15:45:00Z",
  },
  // Add more orders
];

// Popular Categories
export const popularCategories = [
  { name: "Electronics", sales: 450, growth: "+12.5%" },
  { name: "Footwear", sales: 280, growth: "+8.2%" },
  { name: "Apparel", sales: 320, growth: "+15.7%" },
  { name: "Accessories", sales: 190, growth: "+5.3%" },
];

// Top Products
export const topProducts = [
  { id: "p1", name: "iPhone 14 Pro", sales: 145, revenue: 144998.55 },
  { id: "p4", name: "AirPods Pro", sales: 232, revenue: 57997.68 },
  { id: "p3", name: "MacBook Pro M2", sales: 89, revenue: 133499.11 },
];

// Sales by Time
export const salesByTime = {
  morning: { orders: 142, revenue: 12846.5 },
  afternoon: { orders: 235, revenue: 21537.75 },
  evening: { orders: 187, revenue: 16932.25 },
};

// User Activity
export const userActivity = {
  hourly: [45, 62, 78, 95, 88, 72, 65, 85, 92, 78, 64, 58],
  sources: {
    direct: 45,
    organic: 30,
    referral: 15,
    social: 10,
  },
};

// Inventory Status
export const inventoryStatus = {
  total: 1284,
  categories: [
    { name: "Electronics", count: 450, value: 547890.5 },
    { name: "Footwear", count: 280, value: 89560.25 },
    { name: "Apparel", count: 320, value: 112840.75 },
    { name: "Accessories", count: 234, value: 67845.3 },
  ],
  alerts: {
    lowStock: 23,
    outOfStock: 114,
    overStock: 8,
  },
};
