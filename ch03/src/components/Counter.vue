<template>
    <v-card class="ma-4 pa-4">
      <v-card-title>Counter</v-card-title>
      <v-card-text>
        <h2>{{ count }}</h2>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="increment">Increment</v-btn>
        <v-btn color="error" @click="decrement">Decrement</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const count = ref(0);
  
  const increment = () => {
    count.value++;
  };
  
  const decrement = () => {
    count.value--;
  };
  </script>
  
  <style scoped>
  h2 {
    text-align: center;
  }
  </style>
  