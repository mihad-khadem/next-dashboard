import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Sale } from "@/types";
import { api } from "@/lib/api";
import { Order } from "@/types/pos";

interface OrdersState {
  orders: Sale[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

// ✅ Async thunk for creating an order
export const createOrder = createAsyncThunk<
  Sale, // return type
  Omit<Order, "id" | "orderNumber" | "createdAt">, // input type
  { rejectValue: string } // thunk config
>("orders/createOrder", async (order, thunkAPI) => {
  try {
    // ✅ Map Order → Sale payload
    const salePayload: Omit<Sale, "id" | "createdAt" | "updatedAt"> = {
      customerId: order.customerId as string,
      items: order.items,
      discount: order.discount ?? 0,
      tax: order.tax ?? 0,
      total: order.total,
      paymentMethod: order.paymentMethod ?? "cash",
      status: "pending",
    };

    // ✅ Call backend API
    const response = await api.sales.create(salePayload);
    return response as Sale;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Failed to create order");
  }
});

// ✅ Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create order";
      });
  },
});

export default ordersSlice.reducer;
