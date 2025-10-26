import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types/pos';
import { posApi } from '../../lib/api/pos';

interface PosState {
  cart: {
    items: {
      productId: string;
      variantId?: string;
      quantity: number;
      price: number;
      discount: number;
      total: number;
    }[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
  };
  activeOrder: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PosState = {
  cart: {
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0
  },
  activeOrder: null,
  loading: false,
  error: null
};

export const addToCart = createAsyncThunk(
  'pos/addToCart',
  async (item: { productId: string; quantity: number; variantId?: string }) => {
    const product = await posApi.getProduct(item.productId);
    return {
      ...item,
      price: product.data.price,
      discount: 0,
      total: product.data.price * item.quantity
    };
  }
);

export const processOrder = createAsyncThunk(
  'pos/processOrder',
  async (payment: { method: string; amount: number }) => {
    // Implementation will go here
  }
);

const posSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.items.find(i => i.productId === productId);
      if (item) {
        item.quantity = quantity;
        item.total = item.price * quantity - item.discount;
        // Recalculate totals
        state.cart.subtotal = state.cart.items.reduce((sum, item) => sum + item.total, 0);
        state.cart.total = state.cart.subtotal + state.cart.tax - state.cart.discount;
      }
    },
    applyDiscount: (state, action) => {
      const { type, value } = action.payload;
      if (type === 'percentage') {
        state.cart.discount = (state.cart.subtotal * value) / 100;
      } else {
        state.cart.discount = value;
      }
      state.cart.total = state.cart.subtotal + state.cart.tax - state.cart.discount;
    },
    clearCart: (state) => {
      state.cart = initialState.cart;
      state.activeOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items.push(action.payload);
        state.cart.subtotal = state.cart.items.reduce((sum, item) => sum + item.total, 0);
        state.cart.total = state.cart.subtotal + state.cart.tax - state.cart.discount;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add item to cart';
      });
  }
});

export const { updateQuantity, applyDiscount, clearCart } = posSlice.actions;
export default posSlice.reducer;