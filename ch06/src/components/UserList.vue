<template>
  <v-container>
    <h1>User List</h1>
    <v-card-title class="d-flex align-center pe-1">
      <v-btn class="rounded-sm" density="comfortable" icon="mdi-plus" size="small" color="primary"
        @click="navigateToAdd"></v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>
    <v-data-table :items="users" :headers="headers" :search="search" item-key="id" items-per-page="5"
      class="elevation-1 outlined" density="compact" hover striped sortable fixed-header>
      <template #item.actions="{ item }">
        <v-btn density="comfortable" icon="mdi-pencil" size="small" class="me-2" @click="navigateToEdit(item.id)">
        </v-btn>
        <v-btn density="comfortable" icon="mdi-delete" size="small" @click="deleteUser(item.id)">
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const headers = [
  { title: 'ID', value: 'id', key: 'id', sortable: false },
  { title: 'Name', value: 'name', key: 'name' },
  { title: 'Email', value: 'email', key: 'email' },
  { title: 'Actions', value: 'actions', sortable: false },
];

onMounted(() => {
  userStore.fetchUsers();
});

const search = ref(null);

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
