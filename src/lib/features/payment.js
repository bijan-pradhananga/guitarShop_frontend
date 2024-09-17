import API from "@/config/config";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to initialize payment
export const initializePayment = createAsyncThunk(
  'payment/initialize-esewa',
  async ({ user_id, product_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await API.post('payment/initialize-esewa', {
        user_id,
        product_id,
        quantity
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to initialize payment for checkout
export const initializeCheckOutPayment = createAsyncThunk(
  'payment/initialize-esewa-2',
  async ({user_id}, { rejectWithValue }) => {
    try {
      const response = await API.post('payment/initialize-esewa2', {
        user_id
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentData: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPayment: (state) => {
      state.paymentData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializePayment.fulfilled, (state, action) => {
        state.paymentData = action.payload;
        state.loading = false;
      })
      .addCase(initializePayment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(initializeCheckOutPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeCheckOutPayment.fulfilled, (state, action) => {
        state.paymentData = action.payload;
        state.loading = false;
      })
      .addCase(initializeCheckOutPayment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
