<template>
  <v-container>
    <h1>{{ message }}</h1>
    <v-btn @click="changeMessage">Change Message</v-btn>

    <h2>Counter: {{ counter }}</h2>
    <v-btn @click="incrementCounter">Increment Counter</v-btn>

    <h3>Reactive Object:</h3>
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <v-btn @click="updateUser">Update User</v-btn>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Using ref
const message = ref('Hello, Vue 3!');
const counter = ref(0);

// Using reactive
const user = reactive({
  name: 'John Doe',
  age: 25,
});

// Methods
const changeMessage = () => {
  message.value = 'Welcome to Composition API!';
};

const incrementCounter = () => {
  counter.value++;
};

const updateUser = () => {
  user.name = 'Jane Doe';
  user.age++;
};
</script>