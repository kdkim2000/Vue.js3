<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>My App</v-app-bar-title>
    <span class="pa-10">Count: {{ counterStore.count }}</span>
  </v-app-bar>
</template>

<script setup>
import { useCounterStore } from '../stores/counterStore';
const counterStore = useCounterStore();
</script>