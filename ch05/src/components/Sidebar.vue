<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item>
        <v-list-item-title>Total To-Dos: {{ todoStore.todos.length }}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();
</script>
