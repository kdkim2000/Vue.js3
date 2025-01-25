<template>
  <v-container>
    <h1>User List</h1>

    <!-- Data Table -->
    <v-data-table :items="filteredUsers" :headers="headers" class="elevation-1" density="compact" fixed-header>
      <template v-slot:top>
        <v-toolbar flat density="compact" class="me-0">
          <v-toolbar-items variant="tonal">
            <v-text-field v-model="searchQuery" label="Search by Name or Email" prepend-inner-icon="mdi-magnify"
              clearable dense density="compact" class="me-3" width="300"></v-text-field>
            <v-select v-model="selectedRole" :items="roles" label="Filter by Role" prepend-inner-icon="mdi-filter"
              clearable dense density="compact" class="me-3" width="300"></v-select>
            <v-switch v-model="showActiveOnly" label="Show Active Only" inset color="primary" density="compact"
              class="me-3"></v-switch>
          </v-toolbar-items>

          <v-spacer></v-spacer>
          <v-btn icon color="primary" density="compact" class="rounded-lg ms-auto" @click="navigateToAdd">
            <v-icon size="small">mdi-plus</v-icon>
          </v-btn>

          <!-- Role Filter -->

          <!-- Active Toggle -->
        </v-toolbar>
      </template>
      <!-- Role column -->
      <template #item.avatar="{ item }">
        <v-avatar v-if="item.avatar" size="32">
          <v-img :src="item.avatar" alt="Avatar"></v-img>
        </v-avatar>
        <v-avatar v-else size="32" color="red">
          <span class="text-white text-h6">{{ item.name.charAt(0).toUpperCase() }}</span>
        </v-avatar>
      </template>
      <template #item.role="{ item }">
        <v-select v-model="item.role" :items="roles" @change="updateUser(item)" density="compact"></v-select>
      </template>
      <!-- Active column -->
      <template #item.active="{ item }">
        <v-switch v-model="item.active" @change="updateUser(item)" color="primary" density="compact"></v-switch>
      </template>
      <!-- Actions column -->
      <template #item.actions="{ item }">
        <v-btn icon elevation="0" density="comfortable" @click="navigateToEdit(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon elevation="0" density="comfortable" @click="deleteUser(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const roles = ["Admin", "Contributor", "Editor", "Viewer"];
const headers = [
  { title: "ID", value: "id", key: "id" },
  { title: "avatar", value: "avatar", key: "avatar" },
  { title: "Name", value: "name", key: "name" },
  { title: "Email", value: "email", key: "email" },
  { title: "Role", value: "role", key: "role" },
  { title: "Active", value: "active", key: "active" },
  { title: "Actions", value: "actions", sortable: false },
];

// Search and filter states
const searchQuery = ref("");
const selectedRole = ref(null);
const showActiveOnly = ref(false);

onMounted(() => {
  userStore.fetchUsers();
});

// Filtered users based on search and filter conditions
const filteredUsers = computed(() => {
  return userStore.users.filter((user) => {
    const matchesSearch =
      searchQuery.value === "" ||
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = !selectedRole.value || user.role === selectedRole.value;
    const matchesActive = !showActiveOnly.value || user.active === true;

    return matchesSearch && matchesRole && matchesActive;
  });
});

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

const updateUser = (item) => {
  userStore.updateUser({ ...item, active: item.active });
};
</script>

<style scoped>
.v-app-bar {
  display: flex;
  gap: 12px;
}

.v-data-table tbody tr {
  height: 34px;
}

.v-switch {
  height: 38px;
}

.v-select {
  height: 38px;
}
</style>
