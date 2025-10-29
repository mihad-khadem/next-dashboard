// src/lib/auth.ts
import { get, post } from "../api";
import { LoginCredentials, UserProfile } from "../../types/index";

/**
 * Authentication API wrapper
 * Handles login, logout, and user profile fetch
 */
export const auth = {
  // Login and receive JWT token
  async login(credentials: LoginCredentials) {
    return post<{ token: string }>("/auth/login", credentials);
  },

  // Logout user and invalidate session
  async logout() {
    return post<void>("/auth/logout", {});
  },

  // Get currently authenticated user's profile
  async getProfile() {
    return get<UserProfile>("/auth/profile");
  },
};
