<template>
  <v-container>
    <h1>Original Number: {{ number }}</h1>
    <h2>Squared: {{ squaredNumber }}</h2>
    <v-btn @click="incrementNumber">Increment Number</v-btn>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const number = ref(2);

const squaredNumber = computed(() => number.value * number.value);

const incrementNumber = () => {
  number.value++;
};
</script>