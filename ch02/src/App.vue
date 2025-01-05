<template>
  <v-app>
    <!-- Header 컴포넌트 -->
    <Header />

    <!-- Main Layout -->
    <v-main>
      <v-container>
        <v-row>
          <!-- Sidebar 컴포넌트 -->
          <v-col cols="3">
            <Sidebar />
          </v-col>

          <!-- Content 컴포넌트 -->
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

<style>
/* 필요한 스타일이 있으면 여기에 추가 */
</style>