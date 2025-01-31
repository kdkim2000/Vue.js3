<template>
    <v-container class="d-flex align-center justify-center fill-height">
      <v-card class="pa-4" max-width="400" elevation="2">
        <v-card-title class="justify-center">
          <v-icon size="large" color="secondary">mdi-account-plus</v-icon>
          <span class="ms-2 text-h5 text-secondary">Sign Up</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="handleSignup">
            <!-- Name Field -->
            <v-text-field
              v-model="name"
              label="Name"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-account"
              outlined
              dense
              clearable
              class="mb-3"
            ></v-text-field>
  
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
              :rules="[rules.required, rules.password]"
              prepend-inner-icon="mdi-lock"
              outlined
              dense
              clearable
              class="mb-3"
            ></v-text-field>
  
            <!-- Submit Button -->
            <v-btn color="secondary" block type="submit" elevation="2" class="mt-4">
              <v-icon left>mdi-check-circle</v-icon>
              Create Account
            </v-btn>
  
            <!-- Back to Login Button -->
            <v-btn
              text
              color="primary"
              block
              class="mt-3"
              @click="navigateToLogin"
            >
              Already have an account? Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "../stores/userStore";
  
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const rules = {
    required: (value) => !!value || "This field is required",
    email: (value) => /.+@.+\..+/.test(value) || "Invalid email format",
    password: (value) =>
      value.length >= 6 || "Password must be at least 6 characters long",
  };
  
  const router = useRouter();
  const userStore = useUserStore();
  
  const handleSignup = async () => {
    const newUser = {
      name: name.value,
      email: email.value,
      passwd: password.value,
      role: "Viewer", // Default role
      active: true, // Default active status
    };
    await userStore.addUser(newUser);
    router.push("/login"); // Redirect to Login page after signup
  };
  
  const navigateToLogin = () => {
    router.push("/login");
  };
  </script>
  
  <style scoped>
  .v-card {
    width: 100%;
    max-width: 400px; /* Ensures a consistent width */
  }
  </style>
  