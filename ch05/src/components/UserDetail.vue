<template>
    <v-container>
      <h1>User Detail</h1>
      <v-card>
        <v-card-title>{{ user.name }}</v-card-title>
        <v-card-subtitle>{{ user.email }}</v-card-subtitle>
        <v-card-text>
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
        </v-card-text>
      </v-card>
      <v-btn @click="goBack" color="primary">Go Back</v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  
  const route = useRoute();
  const router = useRouter();
  
  const userId = route.params.id;
  const user = ref({
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    phone: `123-456-${userId.padStart(4, '0')}`,
  });
  
  const goBack = () => {
    router.push('/users');
  };
  </script>
  