<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="3">
            <Sidebar />
          </v-col>
          <v-col cols="9">
            <Content />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Content from './components/Content.vue';
</script>
