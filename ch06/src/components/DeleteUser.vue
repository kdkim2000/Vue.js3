<template>
    <v-container>
      <v-btn color="error" @click="deleteUser">Delete User</v-btn>
    </v-container>
  </template>
  
  <script setup>
  import api from '../utils/api';
  
  const userId = 1; // 삭제할 사용자 ID
  
  const deleteUser = async () => {
    await api.delete(`/users/${userId}`);
    alert('User deleted successfully');
  };
  </script>