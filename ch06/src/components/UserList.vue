<template>
  <v-container>
    <h1>User List</h1>
    <v-btn color="primary" @click="navigateToAdd">Add User</v-btn>
    <v-data-table
      :items="users"
      :headers="headers"
    >
      <template #item.actions="{ item }">
        <v-btn icon @click="navigateToEdit(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteUser(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Actions', value: 'actions', sortable: false },
];

onMounted(() => {
  userStore.fetchUsers();
});

const users = computed(() => userStore.users);

const navigateToAdd = () => {
  router.push('/users/add');
};

const navigateToEdit = (id) => {
  router.push(`/users/edit/${id}`);
};

const deleteUser = (id) => {
  userStore.deleteUser(id);
};
</script>
