import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types";
import { customers } from "@/lib/data/mockData";
import { auth } from "@/lib/api/auth";
// =======================
// TYPES
// =======================
export type UserRole = "admin" | "manager" | "staff" | "customer" | "user";
export type UserStatus = "active" | "inactive";

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  lastActive: string;
}

interface UsersState {
  currentUser: UserProfile | null;
  loading: boolean;
  error: string | null;
  users: DashboardUser[];
  usersLoading: boolean;
}

// =======================
// INITIAL STATE
// =======================
const initialState: UsersState = {
  currentUser: null,
  loading: false,
  error: null,
  users: [],
  usersLoading: false,
};

// =======================
// ASYNC THUNKS
// =======================

// Fetch currently logged-in user
export const fetchCurrentUser = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>("users/fetchCurrentUser", async (_, thunkAPI) => {
  try {
    return await auth?.getProfile();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch profile";
    return thunkAPI.rejectWithValue(message);
  }
});

// Mock fetch all users
export const fetchUsers = createAsyncThunk<
  DashboardUser[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const mapped: DashboardUser[] = customers.map((c, i) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      role: "user",
      status: "active",
      avatar: `https://i.pravatar.cc/150?u=${c.id}`,
      lastActive: new Date(Date.now() - i * 10000000).toISOString(),
    }));
    return mapped;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue("Failed to fetch users");
  }
});

// Add user (mock)
export const addUser = createAsyncThunk<
  DashboardUser,
  Omit<DashboardUser, "id">,
  { rejectValue: string }
>("users/addUser", async (user, thunkAPI) => {
  try {
    return { ...user, id: `u${Math.floor(Math.random() * 1000)}` };
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue("Failed to add user");
  }
});

// Update user (mock)
export const updateUser = createAsyncThunk<
  DashboardUser,
  DashboardUser,
  { rejectValue: string }
>("users/updateUser", async (user, thunkAPI) => {
  try {
    return user;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue("Failed to update user");
  }
});

// Delete user (mock)
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/deleteUser", async (id, thunkAPI) => {
  try {
    return id;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue("Failed to delete user");
  }
});

// =======================
// SLICE
// =======================
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })

      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.error = action.payload || "Failed to fetch users";
      })

      // addUser
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })

      // deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
