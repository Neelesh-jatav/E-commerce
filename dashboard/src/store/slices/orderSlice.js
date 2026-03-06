import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-toastify";

// --- ASYNC THUNKS ---

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/order/admin/getall");
      return res.data.orders;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch orders.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/order/admin/update/${id}`, { status });
      toast.success(res.data.message);
      return res.data.updatedOrder;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update status.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/order/admin/delete/${id}`);
      toast.success(res.data.message);
      return id; // Return the deleted order's id
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete order.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// --- SLICE ---

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            ...action.payload,
          };
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;