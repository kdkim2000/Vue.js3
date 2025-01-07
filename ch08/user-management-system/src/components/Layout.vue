<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" density="compact">
      <!-- Nav Icon to toggle the menu -->
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>User Management</v-app-bar-title>

      <!-- Right-side button with dropdown menu -->
      <template v-slot:append>
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
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// State to control the side menu visibility
const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

// Router navigation
const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};

// Dropdown menu action handler
const handleOption = (option) => {
  console.log(`Selected option: ${option}`);
  if (option === "logout") {
    console.log("Logging out...");
    // Add your logout logic here
  }
};
</script>
