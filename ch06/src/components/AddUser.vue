<template>
    <v-container>
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-btn @click="addUser">Add User</v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import api from '../utils/api';
  
  const name = ref('');
  const email = ref('');
  
  const addUser = async () => {
    await api.post('/users', { name: name.value, email: email.value });
    alert('User added successfully');
  };
  </script>