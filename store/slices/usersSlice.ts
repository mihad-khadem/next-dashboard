import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { UserProfile } from "@/types";
import { customers } from "@/lib/data/mockData";

// ----- Auth/Profile Thunks -----
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    try {
      return await api.auth.getProfile();
    } catch (error) {
      // fallback mock user if backend fails
      return {
        id: "fallback",
        name: "Demo Admin",
        email: "admin@example.com",
        role: "admin",
      } as UserProfile;
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (credentials: { email: string; password: string }) => {
    return api.auth.login(credentials);
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  return api.auth.logout();
});

// ----- Dashboard Users (Mock/Fallback API) -----
export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  lastActive: string;
}

// Fetch users (real API or fallback)
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    return await api.auth.getProfile(); // replace with your /users API later
  } catch {
    // fallback to mock
    return customers.map((c, i) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      role: "user",
      status: "active",
      avatar: `https://i.pravatar.cc/150?u=${c.id}`,
      lastActive: new Date(Date.now() - i * 10000000).toISOString(),
    }));
  }
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: Omit<DashboardUser, "id">) => {
    try {
      const response = await api.auth.getProfile(); // replace with POST /users
      return response;
    } catch {
      return { ...user, id: `u${Math.floor(Math.random() * 1000)}` };
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: DashboardUser) => {
    try {
      const response = await api.auth.getProfile(); // replace with PUT /users/:id
      return response;
    } catch {
      return user;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    try {
      const response = await api.auth.getProfile(); // replace with DELETE /users/:id
      return response;
    } catch {
      return id;
    }
  }
);

// ----- Slice -----
interface UsersState {
  currentUser: UserProfile | null;
  loading: boolean;
  error: string | null;
  users: DashboardUser[];
  usersLoading: boolean;
}

const initialState: UsersState = {
  currentUser: null,
  loading: false,
  error: null,
  users: [],
  usersLoading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Auth/Profile
    builder
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
        state.error = action.error.message || "Failed to fetch user profile";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
      });

    // Dashboard Users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<DashboardUser[]>) => {
          state.usersLoading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoading = false;
      })
      .addCase(
        addUser.fulfilled,
        (state, action: PayloadAction<DashboardUser>) => {
          state.users.push(action.payload);
        }
      )
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<DashboardUser>) => {
          state.users = state.users.map((u) =>
            u.id === action.payload.id ? action.payload : u
          );
        }
      )
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
