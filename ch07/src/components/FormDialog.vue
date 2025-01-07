<template>
    <v-container>
      <v-btn color="primary" @click="showDialog = true">Add User</v-btn>
  
      <v-dialog v-model="showDialog" max-width="600">
        <v-card>
          <v-card-title>Add New User</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isFormValid">
              <v-text-field
                v-model="newUser.name"
                label="Name"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="newUser.email"
                label="Email"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="closeDialog">Cancel</v-btn>
            <v-btn text :disabled="!isFormValid" color="primary" @click="submitUser">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showDialog = ref(false);
  const isFormValid = ref(false);
  const newUser = ref({ name: '', email: '' });
  
  const rules = {
    required: (value) => !!value || 'Required.',
    email: (value) => /^[^@]+@[^@]+\.[a-z]{2,}$/.test(value) || 'Invalid email.',
  };
  
  const closeDialog = () => {
    showDialog.value = false;
  };
  
  const submitUser = () => {
    console.log('User added:', newUser.value);
    closeDialog();
  };
  </script>