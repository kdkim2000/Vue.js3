<template>
  <v-navigation-drawer color="primary" v-model="menuVisible" app>
    <v-list>
      <v-list-item link @click="navigateTo('/')">
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="navigateTo('/users')">
        <v-list-item-title>Users</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, watch, toRefs } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

// Emit event to parent
const emit = defineEmits(["update:modelValue"]);

// Internal reactive state
const { modelValue } = toRefs(props);
const menuVisible = ref(modelValue.value);

// Watch for changes from parent and update local state
watch(modelValue, (newVal) => {
  menuVisible.value = newVal;
});

// Watch for changes locally and sync with parent
watch(menuVisible, (newVal) => {
  emit("update:modelValue", newVal);
});

// Router navigation
const router = useRouter();
const navigateTo = (path) => {
  // menuVisible.value = false; // Close menu on navigation
  router.push(path);
};
</script>
