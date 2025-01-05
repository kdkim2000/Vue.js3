<template>
  <v-container>
    <h1>User List</h1>
    <v-data-table :items="users" :headers="headers" class="elevation-1" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const users = ref([]);
const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
];

onMounted(async () => {
  const response = await api.get('/users');
  users.value = response.data;
});
</script>