<template>
    <v-container>
      <h1>Dashboard</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Total Users</v-card-title>
            <v-card-text>{{ stats.total }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Active Users</v-card-title>
            <v-card-text>{{ stats.active }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Inactive Users</v-card-title>
            <v-card-text>{{ stats.inactive }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../utils/api';
  
  const stats = ref({ total: 0, active: 0, inactive: 0 });
  
  onMounted(async () => {
    const response = await api.get('/users');
    const users = response.data;
    stats.value.total = users.length;
    stats.value.active = users.filter(user => user.active).length;
    stats.value.inactive = stats.value.total - stats.value.active;
  });
  </script>