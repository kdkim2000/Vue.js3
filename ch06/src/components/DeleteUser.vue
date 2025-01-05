<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title>Confirm Deletion</v-card-title>
      <v-card-text>
        Are you sure you want to delete this user?
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn text color="red" @click="confirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const showDialog = ref(false);

const cancel = () => {
  showDialog.value = false;
};

const confirm = async () => {
  showDialog.value = false;
  await deleteUser();
};
</script>