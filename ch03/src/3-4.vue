<template>
  <v-container>
    <p>Check the console for lifecycle messages.</p>
    <v-btn @click="updateState">Update State</v-btn>
    <v-btn @click="destroyComponent">Destroy Component</v-btn>
    <p>Current State: {{ state }}</p>
    <p v-if="componentVisible">Component is visible</p>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

const state = ref(0);
const componentVisible = ref(true);

// Lifecycle Hooks
onBeforeMount(() => {
  console.log('onBeforeMount: Component is about to be mounted.');
});

onMounted(() => {
  console.log('onMounted: Component has been mounted.');
});

onBeforeUpdate(() => {
  console.log('onBeforeUpdate: Component is about to be updated.');
});

onUpdated(() => {
  console.log('onUpdated: Component has been updated.');
});

onBeforeUnmount(() => {
  console.log('onBeforeUnmount: Component is about to be unmounted.');
});

onUnmounted(() => {
  console.log('onUnmounted: Component has been unmounted.');
});

// Methods
const updateState = () => {
  state.value++; 
};

const destroyComponent = () => {
  componentVisible.value = !componentVisible.value; // Component visibility 변경
};
</script>
