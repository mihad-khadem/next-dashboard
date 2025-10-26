import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { UserProfile } from "@/types";

interface UsersState {
  currentUser: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    const response = await api.auth.getProfile();
    return response;
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (credentials: { email: string; password: string }) => {
    const response = await api.auth.login(credentials);
    return response;
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  await api.auth.logout();
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Current User
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user profile";
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Login failed";
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.currentUser = null;
    });
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
