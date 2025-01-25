<template>
  <v-container>
    <h1>Add User</h1>
    <v-form ref="form">
      <!-- Name Field -->
      <v-text-field v-model="user.name" label="Name" :rules="[rules.required]" required></v-text-field>

      <!-- Email Field -->
      <v-text-field v-model="user.email" label="Email" type="email" :rules="[rules.required, rules.email]"
        required></v-text-field>

      <!-- Role Field -->
      <v-radio-group v-model="user.role" label="Role" :rules="[rules.required]" required>
        <v-radio v-for="role in roles" :key="role" :label="role" :value="role"></v-radio>
      </v-radio-group>

      <!-- Active Switch -->
      <v-switch v-model="user.active" :label="`Active: ${user.active}`" color="primary" hide-details
        required></v-switch>

      <!-- Avatar Upload -->
      <v-file-input v-model="user.avatar" label="Upload Avatar" accept="image/*" show-size clearable
        @change="previewAvatar"></v-file-input>

      <!-- Avatar Preview -->
      <v-img v-if="avatarPreview" :src="avatarPreview" alt="Avatar Preview" max-height="150" max-width="150"
        class="my-3"></v-img>

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
  avatar: null,  // 아바타 파일 추가
});

const avatarPreview = ref(null);

// Role options
const roles = ["Admin", "Contributor", "Editor", "Viewer"];

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) => /.+@.+\..+/.test(value) || "Invalid e-mail format",
};

// Form reference
const form = ref(null);

// Avatar 미리보기 설정
const previewAvatar = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    avatarPreview.value = null;
  }
};

// Submit form function
const submitForm = async () => {
  if (!form.value || !form.value.validate()) {
    console.log("Validation failed");
    return; // Stop execution if validation fails
  }
  console.log("Validation passed");

  // FormData 객체 생성 및 값 추가
  const formData = new FormData();
  formData.append("name", user.value.name);
  formData.append("email", user.value.email);
  formData.append("role", user.value.role);
  formData.append("active", user.value.active);
  if (user.value.avatar) {
    formData.append("avatar", user.value.avatar);
  }

  // 사용자 추가 요청 (API 호출)
  await userStore.addUser(formData);

  // 성공 시 사용자 목록 페이지로 이동
  router.push("/users");
};

// Cancel function
const cancel = () => {
  router.push("/users");
};
</script>

<style scoped>
.v-img {
  border-radius: 50%;
  border: 2px solid #ddd;
}
</style>
