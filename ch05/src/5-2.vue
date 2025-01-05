<template>
  <v-app>
    <v-app-bar app>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
</script>