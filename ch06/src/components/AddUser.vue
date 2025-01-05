<template>
  <v-container>
    <h1>Add User</h1>
    <v-form>
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-btn color="primary" @click="addUser">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const user = ref({ name: '', email: '' });

const addUser = async () => {
  await userStore.addUser(user.value);
  router.push('/users');
};
</script>