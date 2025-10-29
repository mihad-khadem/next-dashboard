// store/slices/posSlice.ts
// 🔹 Redux slice for POS logic (cart, products, customers, and order handling)

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Product, Order, OrderItem, Customer } from "../../types/pos";
import { posApi } from "../../lib/api/pos";
import { RootState } from "..";

// ----------------------
// 🛒 Cart State Interface
// ----------------------
interface CartState {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

// ----------------------
// 🔹 POS Main State
// ----------------------
interface PosState {
  cart: CartState;
  activeOrder: Order | null;
  products: Product[];
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

// ----------------------
// 🔹 Initial Mock Data
// ----------------------
const initialState: PosState = {
  cart: { items: [], subtotal: 0, tax: 0, discount: 0, total: 0 },
  activeOrder: null,
  products: [
    {
      id: "p1",
      name: "Laptop",
      sku: "LAP123",
      category: "Electronics",
      price: 1200,
      stock: 10,
    },
    {
      id: "p2",
      name: "Phone",
      sku: "PHN456",
      category: "Electronics",
      price: 800,
      stock: 15,
    },
    {
      id: "p3",
      name: "Keyboard",
      sku: "KEY789",
      category: "Accessories",
      price: 50,
      stock: 20,
    },
    {
      id: "p4",
      name: "Mouse",
      sku: "MOU321",
      category: "Accessories",
      price: 30,
      stock: 25,
    },
    {
      id: "p5",
      name: "Monitor",
      sku: "MON654",
      category: "Electronics",
      price: 300,
      stock: 5,
    },
  ],

  // ✅ Fixed customer data (includes all required fields)
  customers: [
    {
      id: "c1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+8801700000001",
      totalPurchases: 5,
    },
    {
      id: "c2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+8801700000002",
      totalPurchases: 3,
    },
    {
      id: "c3",
      name: "Rahim Mia",
      email: "rahim@example.com",
      phone: "+8801700000003",
      totalPurchases: 2,
    },
  ],
  loading: false,
  error: null,
};

// ----------------------
// 🧾 Async Thunks
// ----------------------

// Add product to cart
export const addToCart = createAsyncThunk<
  OrderItem,
  { productId: string; quantity: number }
>("pos/addToCart", async ({ productId, quantity }) => {
  const res = await posApi.getProduct(productId);
  const product = res.data;
  const total = product.price * quantity;

  return {
    productId: product.id,
    quantity,
    price: product.price,
    total,
    discount: 0,
  } as OrderItem;
});

// Process order
export const processOrder = createAsyncThunk(
  "pos/processOrder",
  async (order: {
    customerId?: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    paymentMethod: "cash" | "card" | "mobile";
    paymentAmount: number;
  }) => {
    const res = await posApi.createOrder({
      ...order,
      customerId: order.customerId ?? null,
      orderStatus: "pending",
      paymentStatus: "pending",
    });

    // process payment right after order
    await posApi.processPayment(res.data.id, {
      method: order.paymentMethod,
      amount: order.paymentAmount,
    });

    return res.data;
  }
);

// ----------------------
// 🔹 Slice Definition
// ----------------------
const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    // Update item quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.cart.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
        item.total = item.price * item.quantity - (item.discount || 0);
      }

      // Recalculate totals
      state.cart.subtotal = state.cart.items.reduce(
        (sum, i) => sum + (i.total ?? 0),
        0
      );
      state.cart.tax = state.cart.subtotal * 0.05;
      state.cart.total =
        state.cart.subtotal + state.cart.tax - state.cart.discount;
    },

    // Remove product from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart.items = state.cart.items.filter(
        (i) => i.productId !== action.payload
      );
      state.cart.subtotal = state.cart.items.reduce(
        (sum, i) => sum + (i.total ?? 0),
        0
      );
      state.cart.tax = state.cart.subtotal * 0.05;
      state.cart.total =
        state.cart.subtotal + state.cart.tax - state.cart.discount;
    },

    // Apply discount
    applyDiscount: (
      state,
      action: PayloadAction<{ type: "percentage" | "fixed"; value: number }>
    ) => {
      const { type, value } = action.payload;
      state.cart.discount =
        type === "percentage" ? (state.cart.subtotal * value) / 100 : value;
      state.cart.total =
        state.cart.subtotal + state.cart.tax - state.cart.discount;
    },

    // Clear cart
    clearCart: (state) => {
      state.cart = { items: [], subtotal: 0, tax: 0, discount: 0, total: 0 };
    },

    // Hold current cart as order draft
    holdOrder: (
      state,
      action: PayloadAction<{ note: string; customerId?: string }>
    ) => {
      state.activeOrder = {
        id: Date.now().toString(),
        customerId: action.payload.customerId || "",
        items: [...state.cart.items],
        subtotal: state.cart.subtotal,
        tax: state.cart.tax,
        discount: state.cart.discount,
        total: state.cart.total,
        orderStatus: "pending",
        paymentStatus: "pending",
        paymentMethod: "cash",
        createdAt: new Date().toISOString(),
      };
      state.cart = { items: [], subtotal: 0, tax: 0, discount: 0, total: 0 };
    },

    // Load held order back into cart
    loadHeldOrder: (state) => {
      if (state.activeOrder) {
        const { items, subtotal, tax, discount, total } = state.activeOrder;
        state.cart = { items, subtotal, tax, discount, total };
        state.activeOrder = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items.push(action.payload);

        // Update totals
        state.cart.subtotal = state.cart.items.reduce(
          (sum, i) => sum + (i.total ?? 0),
          0
        );
        state.cart.tax = state.cart.subtotal * 0.05;
        state.cart.total =
          state.cart.subtotal + state.cart.tax - state.cart.discount;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add item to cart";
      })
      .addCase(processOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processOrder.fulfilled, (state) => {
        state.loading = false;
        state.cart = { items: [], subtotal: 0, tax: 0, discount: 0, total: 0 };
      })
      .addCase(processOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Order processing failed";
      });
  },
});

// ----------------------
// 🔹 Exports
// ----------------------
export const {
  updateQuantity,
  removeFromCart,
  applyDiscount,
  clearCart,
  holdOrder,
  loadHeldOrder,
} = posSlice.actions;

export default posSlice.reducer;
export const selectPos = (state: RootState) => state.pos;
