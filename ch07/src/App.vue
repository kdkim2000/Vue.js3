<template>
  <v-app>
    <v-app-bar app>
      <v-btn text to="/users">User Management</v-btn>
      <v-btn text to="/userCards">UserCards</v-btn>
      <v-btn text to="/dashboard">Dashboard</v-btn>
      <v-btn text to="/components">Components</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
const login = () => authStore.login();
const logout = () => authStore.logout();
</script>
