<template>
  <v-container>
    <v-text-field label="Enter your name" v-model="name"></v-text-field>
    <p>{{ greeting }}</p>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';

const name = ref('');
const greeting = ref('');

watch(name, (newValue) => {
  greeting.value = `Hello, ${newValue || 'Stranger'}!`;
});
</script>