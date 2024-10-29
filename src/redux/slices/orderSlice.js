import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Example async thunk for placing an order
export const placeOrder = createAsyncThunk('order/placeOrder', async (orderDetails, { getState }) => {
  const state = getState();
  const response = await axios.post('/api/orders', {
    items: state.cart.items,
    totalAmount: state.cart.totalAmount,
    ...orderDetails
  });
  return response.data;
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
