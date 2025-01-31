<template>
  <v-card class="dynamic-height">
    <v-card-title class="headline">
      <v-icon color="primary" class="me-2">mdi-progress-clock</v-icon>
      프로젝트 공정률
      <v-icon color="green" class="me-2">mdi-circle</v-icon>
    </v-card-title>
    <v-row>
      <v-col class="me-4">
        <v-icon color="#1A237E" class="me-2">mdi-circle</v-icon>
        <span>누계계획</span>
        <v-icon color="#B71C1C" class="me-2">mdi-circle</v-icon>
        <span class="">누계실적</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <canvas id="projectProgressChart" style="width: 100%; height: 100%;"></canvas>
        <div class="chart-cumulativePlan-text">
          {{ cumulativePlan.toFixed(2) }}%
        </div>
        <div class="chart-cumulativeActual-text">
          {{ cumulativeActual.toFixed(2) }}%
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart, ArcElement, DoughnutController, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Data
const cumulativePlan = 11.26; // 누계계획
const cumulativeActual = 11.55; // 누계실적

// Register Chart.js components and plugins
Chart.register(ArcElement, DoughnutController, Tooltip, ChartDataLabels);

// Chart Data
const gaugeData = {
  datasets: [
    {
      data: [cumulativeActual, 100 - cumulativeActual],
      backgroundColor: ["#B71C1C", "#EFEFEF"], // 누계실적, 누계계획, 나머지
      borderWidth: 0,
      circumference: 180, // Semi-circle
      rotation: -90, // Start at the bottom
      cutout: "20%", // Inner radius for the donut
    },
    {
      data: [cumulativePlan, 100 - cumulativePlan],
      backgroundColor: ["#1A237E", "#EFEFEF"], // 누계실적, 누계계획, 나머지
      borderWidth: 0,
      circumference: 180, // Semi-circle
      rotation: -90, // Start at the bottom
      cutout: "55%", // Inner radius for the donut
    },
  ],
};

// Chart Options
const gaugeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: false,
    datalabels: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  },
};

// Chart Initialization
const createGaugeChart = () => {
  const ctx = document.getElementById("projectProgressChart")?.getContext("2d");
  if (!ctx) return;

  new Chart(ctx, {
    type: "doughnut",
    data: gaugeData,
    options: gaugeOptions,
  });
};

onMounted(() => {
  createGaugeChart();
});
</script>

<style scoped>
.v-card-text {
  position: relative;
}

.chart-cumulativeActual-text {
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: #B71C1C;
}

.chart-cumulativePlan-text {
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  color: #1A237E;
}
</style>
