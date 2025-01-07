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
    <v-data-table
      :items="users"
      :headers="headers"
      class="elevation-1"
      density="compact"
    >
      <!-- Role column -->
      <template #item.role="{ item }">
        <v-select
          v-model="item.role"
          :items="roles"
          @change="updateUser(item)"
          color="primary"
          density="compact"
        ></v-select>
      </template>
      <!-- Active column -->
      <template #item.active="{ item }">
        <v-switch
          v-model="item.active"
          @change="updateUser(item)"
          color="primary"
          density="compact"
        ></v-switch>
      </template>
      <!-- Actions column -->
      <template #item.actions="{ item }">
        <v-btn
          icon
          elevation="0"
          density="comfortable"
          @click="navigateToEdit(item.id)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          elevation="0"
          density="comfortable"
          @click="deleteUser(item.id)"
        >
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
const roles = ["Admin", "Contributor", "Editor", "Viewer"];
// Define table headers
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

// Track the users in the store
const users = computed(() => userStore.users);

// Navigation methods
const navigateToAdd = () => {
  router.push("/users/add");
};

const navigateToEdit = (id) => {
  router.push(`/users/edit/${id}`);
};

const deleteUser = async (id) => {
  await userStore.deleteUser(id);
};

// Toggle active state
const updateUser = (item) => {
  console.log(`updateUser: ${item.id}`);
  userStore.updateUser({ ...item, active: item.active });
};
</script>
<style scoped>
.v-data-table tbody tr {
  height: 34px; /* 각 행의 높이 */
}
.v-data-table__actions {
  height: 30px; /* 작업 열의 너비 */
}
.v-switch {
  height: 38px; /* 스위치의 높이 */
}
.v-select {
  height: 38px; /* 스위치의 높이 */
}
</style>
