<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="primary">
      <v-app-bar-title>My Vuetify App</v-app-bar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer app color="primary">
      <v-list>
        <v-list-item link>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <h1>Welcome to My Vuetify App!</h1>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-container>
        <span>&copy; 2025 My Vuetify App</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
</script>

<style></style>