<template>
  <v-container>
    <h1>Edit User</h1>
    <v-form ref="form" v-model="isFormValid">
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>

      <!-- Role Field -->
      <v-radio-group v-model="user.role" label="Role" required>
        <v-radio v-for="role in roles" :key="role" :label="role" :value="role"></v-radio>
      </v-radio-group>

      <!-- Active Switch -->
      <v-switch v-model="user.active" :label="`Active: ${user.active}`" color="primary" hide-details
        required></v-switch>

      <!-- Avatar Upload -->
      <v-file-input label="Upload New Avatar" accept="image/*" show-size clearable
        @update:modelValue="uploadAvatar"></v-file-input>

      <!-- Avatar Preview -->
      <v-img v-if="user.avatar" :src="user.avatar" alt="Avatar Preview" max-height="150" max-width="150"
        class="my-3"></v-img>

      <!-- Buttons -->
      <div class="d-flex justify-end">
        <v-btn color="primary" @click="updateUser" :disabled="uploading">Save</v-btn>
        <v-btn color="error" class="ml-2" @click="cancel">Cancel</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// User store and router
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const user = ref({
  name: "",
  email: "",
  role: "Viewer",
  active: true,
  avatar: "", // 기존 아바타 이미지 URL (기본값)
});

const avatarFile = ref(null);
const uploading = ref(false);
const roles = ["Admin", "Contributor", "Editor", "Viewer"];
const isFormValid = ref(false);

// 사용자 정보 불러오기
onMounted(async () => {
  console.log("User ID:", route.params.id);
  const foundUser = userStore.users.find((u) => u.id === route.params.id);
  if (foundUser) {
    user.value = { ...foundUser };
  }
});

// 아바타 업로드 및 URL 저장
const uploadAvatar = async (file) => {
  if (file instanceof File) {
    avatarFile.value = file;
    uploading.value = true;

    console.log("Uploading Avatar:", avatarFile.value);

    const formData = new FormData();
    formData.append("file", avatarFile.value);
    console.log("formData", formData);

    try {
      const response = await axios.post("http://localhost:3002/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Uploaded Avatar Response:", response.data);

      // 서버에서 반환한 URL을 user.avatar에 저장
      user.value.avatar = response.data.url;
      console.log("Uploaded Avatar URL:", user.value.avatar);
    } catch (error) {
      console.error("Avatar upload failed:", error);
    } finally {
      uploading.value = false;
    }
  } else {
    avatarFile.value = null;
  }
};

// 사용자 정보 업데이트 (이미지 URL만 저장)
const updateUser = async () => {
  const updatedUser = {
    name: user.value.name,
    email: user.value.email,
    role: user.value.role,
    active: user.value.active,
    avatar: user.value.avatar, // 서버 업로드 URL만 저장
  };

  await userStore.updateUser(route.params.id, updatedUser);
  router.push("/users");
};

// 취소 함수
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
