import { defineStore } from "pinia";
import api from "../utils/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
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
          this.token = "dummy-token"; // Replace with actual token from backend

          // Save to Local Storage
          localStorage.setItem("auth", JSON.stringify({
            isAuthenticated: this.isAuthenticated,
            user: this.user,
            token: this.token,
          }));

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

      // Remove from Local Storage
      localStorage.removeItem("auth");
    },

    // Restore authentication state
    restoreAuth() {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        this.isAuthenticated = auth.isAuthenticated;
        this.user = auth.user;
        this.token = auth.token;
      }
    },

    // Check authentication state
    checkAuth() {
      return this.isAuthenticated;
    },
  },
});
