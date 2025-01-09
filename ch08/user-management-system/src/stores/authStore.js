import { defineStore } from "pinia";
import api from "../utils/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null, // Stores the logged-in user's information
    token: null, // Optional: If using token-based authentication
  }),
  actions: {
    // Login action
    async login(email, passwd) {
      try {
        const response = await api.get(`/users?email=${email}`);
        const user = response.data[0]; // Assumes email is unique
        // if (user && user.passwd === passwd) {
        if (user) {
          this.isAuthenticated = true;
          this.user = { ...user, passwd: undefined }; // Exclude passwd from state
          // Optionally, set token if using token-based auth
          this.token = "dummy-token"; // Replace with actual token from backend
          return { success: true };
        } else {
           return { success: false, message: "Invalid email or password" };
        }
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false, message: "An error occurred during login" };
      }
    },

    // Logout action
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
    },

    // Check authentication state
    checkAuth() {
      return this.isAuthenticated;
    },
  },
});
