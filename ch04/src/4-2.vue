<template>
  <v-container>
    <h1>Pinia Counter</h1>
    <h2>Count: {{ counterStore.count }}</h2>
    <h3>Double Count: {{ counterStore.doubleCount }}</h3>
    <v-btn color="primary" @click="counterStore.increment">Increment</v-btn>
    <v-btn color="error" @click="counterStore.decrement">Decrement</v-btn>
  </v-container>
</template>

<script setup>
import { useCounterStore } from './stores/counterStore';
const counterStore = useCounterStore();
</script>