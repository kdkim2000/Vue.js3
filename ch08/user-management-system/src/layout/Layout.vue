<template>
  <v-app>
    <!-- Header -->
    <Header @toggle-menu="toggleMenu" />

    <!-- Menu -->
    <Menu v-model="menuVisible" />

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Header from "./Header.vue";
import Menu from "./Menu.vue";

const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
</script>
