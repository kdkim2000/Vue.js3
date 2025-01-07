<template>
  <v-container>
    <h1>Edit User</h1>
    <v-form ref="form" v-model="isFormValid">
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <!-- Role Field -->
      <v-radio-group v-model="user.role" label="Role" required>
        <v-radio
          v-for="role in roles"
          :key="role"
          :label="role"
          :value="role"
        ></v-radio>
      </v-radio-group>

      <!-- Active Switch -->
      <v-switch
        v-model="user.active"
        :label="`Active: ${user.active}`"
        color="primary"
        hide-details
        required
      ></v-switch>

      <!-- Buttons -->
      <div class="d-flex justify-end">
        <v-btn color="primary" @click="updateUser">Save</v-btn>
        <v-btn color="error" class="ml-2" @click="cancel">Cancel</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";

import { useRoute, useRouter } from "vue-router";

// User store and router
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const user = ref({});
const roles = ["Admin", "Contributor", "Editor", "Viewer"];
const isFormValid = ref(false);

onMounted(async () => {
  const foundUser = userStore.users.find((u) => u.id === route.params.id);
  if (foundUser) {
    user.value = { ...foundUser };
  }
});

const updateUser = async () => {
  await userStore.updateUser(user.value);
  router.push("/users");
};
// Cancel function
const cancel = () => {
  router.push("/users");
};
</script>
