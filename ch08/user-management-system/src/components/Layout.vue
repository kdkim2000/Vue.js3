<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="menuVisible" app>
      <v-list>
        <v-list-item link @click="navigateTo('/')">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="navigateTo('/users')">
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- App Bar -->
    <v-app-bar color="primary" density="compact">
      <!-- Nav Icon to toggle the menu -->
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
      </template>
      <template v-if="userName">
        <v-app-bar-title>{{ userName }}</v-app-bar-title>
      </template>
      <template v-else>
        <v-app-bar-title>User Management</v-app-bar-title>
      </template>

      <!-- Right-side button with dropdown menu -->
      <template v-slot:append>
        <template v-if="authStore.isAuthenticated">
          <!-- Avatar or Initials -->
          <v-avatar class="me-2" size="32" color="secondary">
            <template v-if="userAvatar">
              <img :src="userAvatar" alt="User Avatar" />
            </template>
            <template v-else>
              <span class="text-white text-h6">{{ userInitials }}</span>
            </template>
          </v-avatar>
        </template>
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-dots-vertical"></v-btn>
          </template>
          <v-list>
            <v-list-item link @click="handleOption('profile')">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="handleOption('settings')">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="handleOption('logout')">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const userAvatar = computed(() => authStore.user?.avatar || null);
const userName = computed(() => authStore.user?.name || null);
const userInitials = computed(() => {
  const name = authStore.user?.name || "User";
  return name.charAt(0).toUpperCase();
});
const navigateTo = (path) => {
  router.push(path);
};

// Dropdown menu action handler
const handleOption = (option) => {
  console.log(`Selected option: ${option}`);
  if (option === "logout") {
    useAuthStore().logout();
    router.push("/login");
  }
};
</script>
