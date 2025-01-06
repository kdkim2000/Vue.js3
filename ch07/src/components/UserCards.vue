<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="user in users" :key="user.email">
        <v-card>
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <v-card-actions>
            <v-btn text color="primary" @click="navigateToEdit(user.id)">Edit</v-btn>
            <v-btn text color="error" @click="confirmDelete(user.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="isDialogVisible" max-width="500px">
    <v-card>
      <v-card-title>Confirm Deletion</v-card-title>
      <v-card-text>Are you sure you want to delete this user?</v-card-text>
      <v-card-actions>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn text color="red" @click="deleteUser">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.fetchUsers();
});
const users = computed(() => userStore.users);
const navigateToEdit = (id) => {
  router.push(`/users/edit/${id}`);
};

// Store the ID of the user to delete
const isDialogVisible = ref(false);
const selectedUserId = ref(null);

const confirmDelete = (id) => {
  selectedUserId.value = id; // Save the ID of the user
  isDialogVisible.value = true; // Show the dialog
};

const deleteUser = () => {
  if (selectedUserId.value !== null) {
    userStore.deleteUser(selectedUserId.value); // Use the saved ID
    console.log(`Deleted User ID: ${selectedUserId.value}`);
    isDialogVisible.value = false; // Close the dialog
  }
};

const cancel = () => {
  isDialogVisible.value = false;
  selectedUserId.value = null; // Reset the selected user ID
};
</script>
