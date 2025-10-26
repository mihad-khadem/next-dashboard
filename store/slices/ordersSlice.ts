import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "completed" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "partial";
  createdAt: string;
}

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await api.sales.list();
  return response;
});

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order: Omit<Order, "id" | "orderNumber" | "createdAt">) => {
    const response = await api.sales.create(order);
    return response;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>
    ) => {
      const order = state.items.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    setPaymentStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["paymentStatus"] }>
    ) => {
      const order = state.items.find((o) => o.id === action.payload.id);
      if (order) {
        order.paymentStatus = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch orders";
    });

    // Create Order
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });
  },
});

export const { setOrderStatus, setPaymentStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
