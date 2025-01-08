<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="menuVisible" app>
      <v-list>
        <v-list-item link @click="navigateTo('/')">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="navigateTo('/users')">
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="menuVisible = !menuVisible"></v-app-bar-nav-icon>
      <v-app-bar-title>User Management</v-app-bar-title>

      <!-- Right Section -->
      <v-spacer></v-spacer>
      <template v-if="authStore.isAuthenticated">
        <!-- Avatar -->
        <v-avatar class="me-2" size="32">
          <img src="https://via.placeholder.com/32" alt="User Avatar" />
        </v-avatar>
        <!-- Logout Button -->
        <v-btn text @click="logout" color="error">
          Logout
        </v-btn>
      </template>
      <template v-else>
        <!-- Login Button -->
        <v-btn text @click="navigateToLogin" color="primary">
          Login
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const menuVisible = ref(false);

const navigateTo = (path) => {
  router.push(path);
};

const navigateToLogin = () => {
  router.push("/login");
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.v-avatar img {
  border-radius: 50%;
}
</style>
