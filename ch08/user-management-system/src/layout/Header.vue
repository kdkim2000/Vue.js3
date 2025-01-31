<template>
  <v-app-bar color="primary" density="compact">
    <!-- Nav Icon to toggle the menu -->
    <template v-slot:prepend>
      <NavToggle @toggle-menu="$emit('toggle-menu')" />
    </template>

    <!-- Title -->
    <v-app-bar-title class="d-flex align-center">
      <span>User Management</span>
    </v-app-bar-title>

    <!-- Right-side Avatar with dropdown menu -->
    <template v-slot:append>
      <AvatarMenu />
    </template>
  </v-app-bar>
</template>

<script setup>
import NavToggle from "../components/NavToggle.vue";
import AvatarMenu from "../components/AvatarMenu.vue";
</script>
