<template>
  <v-container>
    <h1>User List</h1>
    <v-btn
      icon
      color="primary"
      density="compact"
      class="rounded-lg"
      @click="navigateToAdd"
    >
      <v-icon size="small">mdi-plus</v-icon>
    </v-btn>
    <v-data-table :items="users" :headers="headers" class="elevation-1">
      <template #item.actions="{ item }">
        <v-btn icon elevation="0" @click="navigateToEdit(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon elevation="0" @click="deleteUser(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const headers = [
  { title: "ID", value: "id", key: "id" },
  { title: "Name", value: "name", key: "name" },
  { title: "Email", value: "email", key: "email" },
  { title: "Role", value: "role", key: "role" },
  { title: "Active", value: "active", key: "active" },
  { title: "Actions", value: "actions", sortable: false },
];

// Fetch users when the component is mounted
onMounted(() => {
  console.log("UserList:onMounted");
  userStore.fetchUsers();
});

// Use computed to track the users in the store
const users = computed(() => userStore.users);

const navigateToAdd = () => {
  router.push("/users/add");
};

const navigateToEdit = (id) => {
  router.push(`/users/edit/${id}`);
};

const deleteUser = async (id) => {
  await userStore.deleteUser(id);
};
</script>
