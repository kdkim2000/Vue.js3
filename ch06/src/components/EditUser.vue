<template>
    <v-container>
      <v-text-field v-model="user.name" label="Name"></v-text-field>
      <v-text-field v-model="user.email" label="Email"></v-text-field>
      <v-btn @click="updateUser">Update User</v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../utils/api';
  
  const user = ref({ name: '', email: '' });
  const userId = 1; // 수정할 사용자 ID
  
  onMounted(async () => {
    const response = await api.get(`/users/${userId}`);
    user.value = response.data;
  });
  
  const updateUser = async () => {
    await api.put(`/users/${userId}`, user.value);
    alert('User updated successfully');
  };
  </script>