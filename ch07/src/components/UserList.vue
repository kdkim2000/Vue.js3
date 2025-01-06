<template>
  <v-container>
    <h1>User List</h1>
    <v-card-title class="d-flex align-center pe-1">
      <v-btn
        class="rounded-sm me-2"
        density="comfortable"
        icon="mdi-plus"
        size="small"
        color="primary"
        @click="navigateToAdd"
      ></v-btn>
      <v-btn density="comfortable" color="primary" @click="showDialog = true">Add User Dialog</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        width="200px"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :items="users"
      :headers="headers"
      :search="search"
      :items-per-page="10"
      class="elevation-1 outlined"
      density="compact"
      hover
      striped
      sortable
      fixed-header
    >
      <template #item.actions="{ item }">
        <v-btn
          density="comfortable"
          icon="mdi-pencil"
          size="small"
          class="me-2"
          @click="navigateToEdit(item.id)"
        >
        </v-btn>
        <v-btn
          density="comfortable"
          icon="mdi-delete"
          size="small"
          @click="deleteUser(item.id)"
        >
        </v-btn>
      </template>
    </v-data-table>

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
            <v-select
              v-model="newUser.role"
              :items="roles"
              label="Role"
              :rules="[rules.required]"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn
            text
            :disabled="!isFormValid"
            color="primary"
            @click="submitUser"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const headers = [
  { title: "ID", value: "id", key: "id", sortable: false },
  { title: "Name", value: "name", key: "name" },
  { title: "Email", value: "email", key: "email" },
  { title: "Role", value: "role", key: "role" },
  { title: "Actions", value: "actions", sortable: false },
];

onMounted(() => {
  userStore.fetchUsers();
});

const search = ref(null);

const users = computed(() => userStore.users);

const navigateToAdd = () => {
  router.push("/users/add");
};

const navigateToEdit = (id) => {
  router.push(`/users/edit/${id}`);
};

const deleteUser = (id) => {
  userStore.deleteUser(id);
};

const showDialog = ref(false);
const newUser = ref({ name: "", email: "", role: "" });
const roles = ["Admin", "Editor", "Viewer"];
const isFormValid = ref(false);

const rules = {
  required: (value) => !!value || "Required.",
  email: (value) => /^[^@]+@[^@]+\.[a-z]{2,}$/.test(value) || "Invalid email.",
};

const closeDialog = () => {
  showDialog.value = false;
};

const submitUser = async () => {
  console.log("User added:", newUser.value);
  await userStore.addUser(newUser.value);
  closeDialog();
};
</script>
