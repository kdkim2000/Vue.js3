<template>
  <v-container class="me-4">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn v-tooltip.bottom="'Click to Submit'">Submit</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn v-tooltip.right="{ text: 'More Info', openDelay: 500 }"
          >Info</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-progress-linear
          buffer-value="0"
          color="teal"
          model-value="progress"
          stream
        ></v-progress-linear>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-chip color="green" dark>Active</v-chip>
      <v-chip color="red" dark close>Inactive</v-chip>
      <v-chip color="blue" outlined>Information</v-chip>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-carousel height="400" show-arrows="hover" cycle>
          <v-carousel-item v-for="i in 3" :key="i">
            <v-container class="fill-height">
              <div class="center">
                <h1>Slider{{ i }}</h1>
              </div>
            </v-container>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col>
        <v-alert type="success" dismissible>
          Successfully saved your changes!
        </v-alert>
        <v-alert type="error" text>
          Something went wrong. Please try again.
        </v-alert>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-badge color="red" content="5">
          <v-icon>mdi-email</v-icon>
        </v-badge>
        <v-badge color="green" dot>
          <v-icon>mdi-check-circle</v-icon>
        </v-badge>
      </v-col>
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
            <v-expansion-panel-text>Details for Panel 1</v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>Panel 2</v-expansion-panel-title>
            <v-expansion-panel-text>Details for Panel 2</v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-divider></v-divider>
      <v-divider inset></v-divider>
      <v-divider vertical></v-divider>
    </v-row>
    <v-row align="center" justify="center">
      <v-menu>
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">Open Menu</v-btn>
        </template>
        <v-list>
          <v-list-item>Option 1</v-list-item>
          <v-list-item>Option 2</v-list-item>
          <v-list-item>Option 3</v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    <v-row align="center" justify="center">
      <v-text-field label="Your Name" outlined></v-text-field>
      <v-text-field label="Password" type="password" outlined></v-text-field>
    </v-row>
    <v-row align="center" justify="center">
      <v-switch label="Enable Notifications" v-model="enabled"></v-switch>
      <v-radio-group v-model="selected" column>
        <v-radio label="Option 1" value="1"></v-radio>
        <v-radio label="Option 2" value="2"></v-radio>
      </v-radio-group>
    </v-row>
    <v-row align="center" justify="center">
      <v-slider v-model="volume" :max="100" :step="5"></v-slider>
    </v-row>
    <v-row align="center" justify="center">
      <v-card>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="one">Item One</v-tab>
          <v-tab value="two">Item Two</v-tab>
          <v-tab value="three">Item Three</v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one"> One </v-tabs-window-item>

            <v-tabs-window-item value="two"> Two </v-tabs-window-item>

            <v-tabs-window-item value="three"> Three </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row align="center" justify="center">
      <v-stepper model-value="2">
        <v-stepper-header>
          <v-stepper-item
            title="Select campaign settings"
            value="1"
            complete
          ></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item title="Create an ad group" value="2"></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item title="Create an ad" value="3"></v-stepper-item>
        </v-stepper-header>
      </v-stepper>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-timeline align="start">
          <v-timeline-item>
            <template v-slot:opposite> Opposite content </template>
            <div>
              <div class="text-h6">Content title</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <template v-slot:opposite> Opposite content </template>
            <div>
              <div class="text-h6">Content title</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <template v-slot:opposite> Opposite content </template>
            <div>
              <div class="text-h6">Content title</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col>
        <v-rating
          v-model="rating"
          item-aria-label="custom icon label text {0} of {1}"
        ></v-rating>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col>
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col>
        <v-img
          :aspect-ratio="1"
          class="bg-white"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          width="300"
        ></v-img>
      </v-col>
    </v-row>
    <v-btn color="red-darken-2" @click="snackbar = true"> Open Snackbar </v-btn>

    <v-snackbar v-model="snackbar" multi-line>
      {{ text }}

      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
const progress = ref(70);
const enabled = ref(false);
const selected = ref(null);
const volume = ref(50);
const tab = ref(0);
const date = ref(new Date().toISOString().substr(0, 10));
const step = ref(1);
const rating = ref(4);
const items = [
  {
    title: "Dashboard",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Link 1",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
  {
    title: "Link 2",
    disabled: true,
    href: "breadcrumbs_link_2",
  },
];
const snackbar = ref(false);
const text = ref(`I am a multi-line snackbar.\nI can have more than one line. This is another line that is quite long.`);
</script>

<style lang="scss" scoped></style>
