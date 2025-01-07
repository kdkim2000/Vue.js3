<template>
  <v-container>
    <h1>Add User</h1>
    <v-form ref="form">
      <!-- Name Field -->
      <v-text-field
        v-model="user.name"
        label="Name"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <!-- Email Field -->
      <v-text-field
        v-model="user.email"
        label="Email"
        type="email"
        :rules="[rules.required, rules.email]"
        required
      ></v-text-field>

      <!-- Role Field -->
      <v-radio-group
        v-model="user.role"
        label="Role"
        :rules="[rules.required]"
        required
      >
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
        <v-btn color="primary" @click="submitForm">Submit</v-btn>
        <v-btn color="error" class="ml-2" @click="cancel">Cancel</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

// User store and router
const userStore = useUserStore();
const router = useRouter();

// Reactive user object
const user = ref({
  name: null,
  email: null,
  role: "Viewer",
  active: true,
});

// Role options
const roles = ["Admin", "Contributor", "Editor", "Viewer"];

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) => /.+@.+\..+/.test(value) || "Invalid e-mail format",
};

// Form reference
const form = ref(null);

// Submit form function
const submitForm = async () => {
  if (!form.value || !form.value.validate()) {
    console.log("Validation failed");
    return; // Stop execution if validation fails
  }
  console.log("Validation passed");
  await userStore.addUser(user.value);
  router.push("/users");
};

// Cancel function
const cancel = () => {
  router.push("/users");
};
</script>
