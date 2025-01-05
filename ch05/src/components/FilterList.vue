<template>
    <v-card class="ma-4 pa-4">
      <v-card-title>Real-Time Filter</v-card-title>
      <v-card-text>
        <v-text-field
          label="Search"
          v-model="searchTerm"
          @input="filterList"
          clearable
        ></v-text-field>
        <v-list>
          <v-list-item
            v-for="(item, index) in filteredItems"
            :key="index"
          >
            {{ item }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const searchTerm = ref('');
  const items = ref(['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape']);
  
  const filteredItems = computed(() => {
    return items.value.filter((item) =>
      item.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
  
  const filterList = () => {
    // No additional logic needed as computed does the filtering
  };
  </script>
  