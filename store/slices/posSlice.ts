import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Product, Order, OrderItem, Customer } from "../../types/pos";
import { posApi } from "../../lib/api/pos";

interface CartState {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

interface PosState {
  cart: CartState;
  activeOrder: Order | null; // held order
  loading: boolean;
  error: string | null;
}

const initialState: PosState = {
  cart: { items: [], subtotal: 0, tax: 0, discount: 0, total: 0 },
  activeOrder: null,
  loading: false,
  error: null,
};

// Add product to cart
export const addToCart = createAsyncThunk(
  "pos/addToCart",
  async (item: { productId: string; quantity: number }) => {
    const res = await posApi.getProduct(item.productId);
    const product = res.data;
    const total = product.price * item.quantity;

    return {
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
      total,
      discount: 0,
    } as OrderItem;
  }
);

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
      orderStatus: "pending",
      paymentStatus: "pending",
    });
    await posApi.processPayment(res.data.id, {
      method: order.paymentMethod,
      amount: order.paymentAmount,
    });
    return res.data;
  }
);

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
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
        state.cart.subtotal = state.cart.items.reduce(
          (sum, i) => sum + i.total,
          0
        );
        state.cart.tax = state.cart.subtotal * 0.05; // 5% tax
        state.cart.total =
          state.cart.subtotal + state.cart.tax - state.cart.discount;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart.items = state.cart.items.filter(
        (i) => i.productId !== action.payload
      );
      state.cart.subtotal = state.cart.items.reduce(
        (sum, i) => sum + i.total,
        0
      );
      state.cart.tax = state.cart.subtotal * 0.05;
      state.cart.total =
        state.cart.subtotal + state.cart.tax - state.cart.discount;
    },
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
    clearCart: (state) => {
      state.cart = { items: [], subtotal: 0, tax: 0, discount: 0, total: 0 };
    },
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
        state.cart.subtotal = state.cart.items.reduce(
          (sum, i) => sum + i.total,
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

export const {
  updateQuantity,
  removeFromCart,
  applyDiscount,
  clearCart,
  holdOrder,
  loadHeldOrder,
} = posSlice.actions;
export default posSlice.reducer;
