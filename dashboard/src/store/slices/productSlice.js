import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-toastify";

// --- ASYNC THUNKS ---

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async (page = 1, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/product?page=${page}`);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch products.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/product/admin/create", data);
      toast.success(res.data.message);
      thunkAPI.dispatch(fetchAllProducts()); // Refetch products after creating
      return res.data.product;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to create product.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/product/admin/update/${id}`, data);
      toast.success(res.data.message);
      thunkAPI.dispatch(fetchAllProducts()); // Refetch products after updating
      return res.data.updatedProduct;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update product.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/product/admin/delete/${id}`);
      toast.success(res.data.message);
      return id;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete product.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// --- SLICE ---

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    totalProducts: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.totalProducts -= 1;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
