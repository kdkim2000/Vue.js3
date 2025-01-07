<template>
    <v-container>
      <h1>User Registration</h1>
      <v-form ref="form" v-model="isFormValid">
        <v-text-field
          v-model="user.name"
          label="Name"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          label="Email"
          :rules="[rules.required, rules.email]"
          required
        ></v-text-field>
        <v-select
          v-model="user.role"
          :items="roles"
          label="Role"
          :rules="[rules.required]"
        ></v-select>
        <v-btn :disabled="!isFormValid" color="primary" @click="submitForm">
          Submit
        </v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const user = ref({ name: '', email: '', role: '' });
  const roles = ['Admin', 'Editor', 'Viewer'];
  const isFormValid = ref(false);
  
  const rules = {
    required: (value) => !!value || 'Required.',
    email: (value) => {
      const pattern = /^[^@]+@[^@]+\.[a-z]{2,}$/;
      return pattern.test(value) || 'Invalid email.';
    },
  };
  
  const submitForm = () => {
    console.log('Form submitted:', user.value);
  };
  </script>