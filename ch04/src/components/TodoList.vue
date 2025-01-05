<template>
    <v-container>
      <h1>Todo List</h1>
      <v-text-field v-model="newTodo" label="New Todo" clearable></v-text-field>
      <v-btn color="primary" @click="addTodo">Add</v-btn>
      <v-list>
        <v-list-item v-for="(todo, index) in todoStore.todos" :key="index">
          {{ todo }}
          <v-btn icon @click="removeTodo(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTodoStore } from '../stores/todoStore';
  
  const newTodo = ref('');
  const todoStore = useTodoStore();
  
  const addTodo = () => {
    if (newTodo.value.trim()) {
      todoStore.addTodo(newTodo.value);
      newTodo.value = '';
    }
  };
  
  const removeTodo = (index) => {
    todoStore.removeTodo(index);
  };
  </script>