<template>
  <v-container>
    <h1>Edit User</h1>
    <v-form>
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-select
        v-model="user.role"
        :items="roles"
        label="Role"
      ></v-select>
      <v-btn color="primary" @click="updateUser">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const user = ref({ id: route.params.id, name: "", email: "", role: "" });
const roles = ["Admin", "Editor", "Viewer"];
const isFormValid = ref(false);

const rules = {
  required: (value) => !!value || "Required.",
  email: (value) => {
    const pattern = /^[^@]+@[^@]+\.[a-z]{2,}$/;
    return pattern.test(value) || "Invalid email.";
  },
};

onMounted(async () => {
  // 비동기로 사용자 데이터 로드
  await userStore.fetchUsers();

  // console.log("onMounted:userStore.users", userStore.users);
  // console.log("onMounted:route.params.id", route.params.id);
  const foundUser = userStore.users.find((u) => u.id === route.params.id);
  if (foundUser) {
    user.value = { ...foundUser };
  }
  console.log("onMounted:foundUser", foundUser);
});

const updateUser = async () => {
  await userStore.updateUser(user.value);
  router.push("/users");
};
</script>
