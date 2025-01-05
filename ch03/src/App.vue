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
            <Counter />
            <FilterList />
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
import Counter from './components/Counter.vue';
import FilterList from './components/FilterList.vue';
</script>
