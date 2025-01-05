<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ message }}</h1>
        <v-text-field label="Edit Message" v-model="message"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Hello, Vuetify!');
</script>