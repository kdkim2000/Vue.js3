<template>
    <v-container>
      <h1>Filterable Data Table</h1>
      <v-text-field v-model="search" label="Search" clearable></v-text-field>
      <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const search = ref('');
  const items = ref([
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    { name: 'Alice Brown', email: 'alice.brown@example.com' },
    { name: 'Bob Green', email: 'bob.green@example.com' },
    { name: 'Charlie White', email: 'charlie.white@example.com' },
  ]);
  
  const headers = [
    { title: 'Name', value: 'name' },
    { title: 'Email', value: 'email' },
  ];
  </script>