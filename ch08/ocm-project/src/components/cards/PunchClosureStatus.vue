<template>
  <v-card class="dynamic-height">
    <v-card-title class="headline">
      <v-icon color="primary" class="me-2">mdi-checkbox-marked-circle</v-icon>
      Punch 종결현황
      <v-icon color="green" class="me-2">mdi-circle</v-icon>
    </v-card-title>
    <v-row>
      <v-col class="me-4" align="end">
        <canvas id="punchClsureStatus" style="width: 100%; height: 100%;"></canvas>
      </v-col>
    </v-row>
  </v-card>
</template>


<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Example data
const salesData = [
  { month: "1월", sales: 150, target: 200 },
  { month: "2월", sales: 180, target: 220 },
  { month: "3월", sales: 170, target: 210 },
  { month: "4월", sales: 200, target: 250 },
  { month: "5월", sales: 230, target: 240 },
  { month: "6월", sales: 190, target: 220 },
  { month: "7월", sales: 150, target: 200 },
  { month: "8월", sales: 180, target: 220 },
  { month: "9월", sales: 170, target: 210 },
  { month: "10월", sales: 200, target: 250 },
  { month: "11월", sales: 230, target: 240 },
  { month: "12월", sales: 190, target: 220 },
];

const createComboChart = () => {
  const ctx = document.getElementById("punchClsureStatus").getContext("2d");

  new Chart(ctx, {
    type: "bar", // Base chart type
    data: {
      labels: salesData.map((data) => data.month),
      datasets: [
        {
          type: "bar",
          label: "Actual Sales",
          data: salesData.map((data) => data.sales),
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 0.1,
        },
        {
          type: "line",
          label: "Sales Target",
          data: salesData.map((data) => data.target),
          borderColor: "rgba(255, 99, 132, 1)", // Red
          borderWidth: 1,
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {

      },
      scales: {
        x: {
          title: {
            display: false,
          },
        },
        y: {
          title: {
            display: false,
          },
          beginAtZero: false,
        },
      },
    },
  });
};

onMounted(() => {
  createComboChart();
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
