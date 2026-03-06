import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-toastify";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    toast.success(res.data.message);
    return res.data.user;
  } catch (error) {
    toast.error(error.response.data.message || "Login failed.");
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/logout");
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message || "Logout failed.");
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, frontendUrl }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `/auth/password/forgot?frontendUrl=${frontendUrl}`,
        { email }
      );
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to send reset link.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, confirmPassword, token }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/auth/password/reset/${token}`, {
        password,
        confirmPassword,
      });
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to reset password.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put("/auth/profile/update", data);
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update profile.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put("/auth/password/update", data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update password.");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    resetAuthSlice(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetAuthSlice } = authSlice.actions;

export default authSlice.reducer;