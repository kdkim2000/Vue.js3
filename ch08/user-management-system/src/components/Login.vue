<template>
    <v-container class="d-flex align-center justify-center fill-height">
      <v-card class="pa-4" max-width="400" elevation="2">
        <v-card-title class="justify-center">
          <v-icon size="large" color="primary">mdi-account-circle</v-icon>
          <span class="ms-2 text-h5 text-primary">Login</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="handleLogin">
            <!-- Email Field -->
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              outlined
              dense
              clearable
              class="mb-3"
            ></v-text-field>
  
            <!-- Password Field -->
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-lock"
              outlined
              dense
              clearable
              class="mb-3"
            ></v-text-field>
  
            <!-- Error Message -->
            <v-alert
              v-if="error"
              type="error"
              border="start"
              class="mt-3"
              prominent
            >
              {{ error }}
            </v-alert>
  
            <!-- Submit Button -->
            <v-btn color="primary" block type="submit" elevation="2" class="mt-4">
              <v-icon left>mdi-login</v-icon>
              Login
            </v-btn>
  
            <!-- Sign Up Button -->
            <v-btn
              color="secondary"
              block
              elevation="0"
              class="mt-3"
              @click="navigateToSignUp"
            >
              <v-icon left>mdi-account-plus</v-icon>
              Sign Up
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/authStore";
  
  const email = ref("");
  const password = ref("");
  const error = ref(null);
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  // Validation rules
  const rules = {
    required: (value) => !!value || "This field is required",
    email: (value) => /.+@.+\..+/.test(value) || "Invalid email format",
  };
  
  // Handle login
  const handleLogin = async () => {
    error.value = null; // Clear any previous error
    const result = await authStore.login(email.value, password.value);
    if (result.success) {
      router.push("/"); // Redirect to Dashboard after successful login
    } else {
      error.value = result.message; // Display error message
    }
  };
  
  // Navigate to Sign Up
  const navigateToSignUp = () => {
    router.push("/signup"); // Redirect to Sign Up page
  };
  </script>
  
  <style scoped>
  .text-red {
    color: #f44336;
  }
  .v-card {
    width: 100%;
    max-width: 400px; /* Ensures a consistent width */
  }
  .v-btn {
    min-width: 150px;
  }
  </style>
  