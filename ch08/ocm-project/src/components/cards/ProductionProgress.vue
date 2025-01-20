<template>
  <v-card class="dynamic-height">
    <v-card-title class="headline">
      <v-icon color="primary" class="me-2">mdi-cogs</v-icon>
      생산공정률
      <v-icon color="green" class="me-2">mdi-circle</v-icon>
    </v-card-title>
    <v-row>
      <v-col>
        <canvas id="productionProgressChart" style="width: 100%; height: 100%;"></canvas>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Sample data for progress
const progressData = {
  labels: ["구조", "도장", "배관", "HVAC", "선실", "전계장", "기장", "보온", "MC"],
  datasets: [
    {
      label: "Completion (%)",
      data: [100, 80, 60, 40, 20, 38, 87, 89, 78], // Example completion rates
      backgroundColor: [
        "rgba(33, 150, 243, 0.6)", // Blue
      ],
      borderWidth: 1,
    },
  ],
};

// Create the chart
const createProgressChart = () => {
  const ctx = document.getElementById("productionProgressChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: progressData,
    options: {
      indexAxis: "x",
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `${context.label}: ${context.raw}% complete`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: false,
          title: {
            display: false,
            text: "Completion Percentage (%)",
          },
        },
        y: {
          title: {
            display: false,
            text: "Project Phases",
          },
        },
      },
    },
  });
};

onMounted(() => {
  createProgressChart();
});
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.dynamic-height {
  min-height: 250px;
  height: auto;
}
</style>
