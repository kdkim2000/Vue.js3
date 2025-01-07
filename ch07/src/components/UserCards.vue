<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="user in users" :key="user.email">
        <v-card>
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <v-card-actions>
            <v-btn text color="primary">Edit</v-btn>
            <v-btn text color="error">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  { name: 'Alice Brown', email: 'alice.brown@example.com' },
]);
</script>