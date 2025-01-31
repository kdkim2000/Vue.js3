<template>
    <v-container>
      <h1>User Detail</h1>
      <v-card>
        <v-card-title>{{ user.name }}</v-card-title>
        <v-card-subtitle>{{ user.email }}</v-card-subtitle>
        <v-card-text>
          <p><strong>Status:</strong> {{ user.active ? 'Active' : 'Inactive' }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '../utils/api';
  
  const route = useRoute();
  const user = ref({});
  
  onMounted(async () => {
    const response = await api.get(`/users/${route.params.id}`);
    user.value = response.data;
  });
  </script>