<template>
    <v-container>
      <h1>User Management</h1>
      <v-list>
        <v-list-item
          v-for="user in users"
          :key="user.id"
          @click="goToUserDetail(user.id)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Brown', email: 'alice.brown@example.com' },
  ];
  
  const goToUserDetail = (id) => {
    router.push(`/user/${id}`);
  };
  </script>
  