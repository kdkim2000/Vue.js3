<template>
  <template v-if="authStore.isAuthenticated">
    <span class="me-3">{{ userName }}</span>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-avatar
          v-bind="props"
          size="40"
          color="secondary"
          class="me-4 cursor-pointer"
        >
          <template v-if="userAvatar">
            <img :src="userAvatar" alt="User Avatar" />
          </template>
          <template v-else>
            <span class="text-white text-h6">{{ userInitials }}</span>
          </template>
        </v-avatar>
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
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const userAvatar = computed(() => authStore.user?.avatar || null);
const userName = computed(() => authStore.user?.name || null);
const userInitials = computed(() => {
  const name = authStore.user?.name || "User";
  return name.charAt(0).toUpperCase();
});

const handleOption = (option) => {
  console.log(`Selected option: ${option}`);
  if (option === "logout") {
    authStore.logout();
    router.push("/login");
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
