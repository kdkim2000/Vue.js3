<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col
        v-for="n in 12"
        :key="n"
        sm-6
      >
        <v-sheet class="ma-2 pa-2">
          One of three columns
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style></style>