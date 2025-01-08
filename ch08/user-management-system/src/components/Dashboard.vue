<template>
  <v-container>
    <h1 class="mb-6">Dashboard</h1>

    <!-- Statistics Cards -->
    <v-row>
      <!-- Total Users Card -->
      <v-col cols="12" md="3">
        <v-card class="pa-3" outlined>
          <v-card-item>
            <v-card-title>
              <v-icon left color="blue">mdi-account-multiple</v-icon>
              Total Users
            </v-card-title>
            <v-card-subtitle>All registered users</v-card-subtitle>
          </v-card-item>
          <v-card-text class="display-1 text-center">
            <v-icon color="blue">mdi-account-group</v-icon>
            {{ stats.total }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue">Details</v-btn>
            <v-btn text color="blue" icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Active Users Card -->
      <v-col cols="12" md="3">
        <v-card class="pa-3" elevation="2">
          <v-card-item>
            <v-card-title>
              <v-icon left color="green">mdi-account-check</v-icon>
              Active Users
            </v-card-title>
            <v-card-subtitle>Currently active users</v-card-subtitle>
          </v-card-item>
          <v-card-text class="display-1 text-center text-success">
            <v-icon color="green">mdi-account-circle</v-icon>
            {{ stats.active }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="green">Details</v-btn>
            <v-btn text color="green" icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Inactive Users Card -->
      <v-col cols="12" md="3">
        <v-card class="pa-3" elevation="2">
          <v-card-item>
            <v-card-title>
              <v-icon left color="red">mdi-account-off</v-icon>
              Inactive Users
            </v-card-title>
            <v-card-subtitle>Users not currently active</v-card-subtitle>
          </v-card-item>
          <v-card-text class="display-1 text-center text-error">
            <v-icon color="red">mdi-account-remove</v-icon>
            {{ stats.inactive }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="red">Details</v-btn>
            <v-btn text color="red" icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Admin Users Card -->
      <v-col cols="12" md="3">
        <v-card class="pa-3" elevation="2">
          <v-card-item>
            <v-card-title>
              <v-icon left color="purple">mdi-shield-account</v-icon>
              Admin Users
            </v-card-title>
            <v-card-subtitle>Users with admin role</v-card-subtitle>
          </v-card-item>
          <v-card-text class="display-1 text-center text-primary">
            <v-icon color="purple">mdi-shield-star</v-icon>
            {{ stats.admin }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="purple">Details</v-btn>
            <v-btn text color="purple" icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Chart Section -->
    <v-row class="mt-8">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>User Status Chart</v-card-title>
          <v-card-text>
            <canvas id="userStatusChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>User Role Distribution</v-card-title>
          <v-card-text>
            <canvas id="userRoleChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import Chart from "chart.js/auto";

// Use the Pinia store to access user data
const userStore = useUserStore();

// Computed property for statistics
const stats = computed(() => {
  const total = userStore.users.length;
  const active = userStore.users.filter((user) => user.active).length;
  const inactive = total - active;
  const admin = userStore.users.filter((user) => user.role === "Admin").length;

  return { total, active, inactive, admin };
});

// Initialize charts
onMounted(async () => {
  await userStore.fetchUsers();
  if (userStore.users.length > 0) {
    createUserStatusChart();
    createUserRoleChart();
  }
});

const createUserStatusChart = () => {
  const ctx = document.getElementById("userStatusChart")?.getContext("2d");
  if (!ctx) return;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Active Users", "Inactive Users"],
      datasets: [
        {
          label: "User Status",
          data: [stats.value.active, stats.value.inactive],
          backgroundColor: ["#8E44AD", "#3498DB"], // Harmonized colors
          borderColor: ["#7D3C98", "#2874A6"],
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 14,
              family: "'Roboto', sans-serif",
            },
            color: "#2C3E50",
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: "#F5F5F5",
          titleColor: "#2C3E50",
          bodyColor: "#2C3E50",
        },
      },
      animation: {
        duration: 1500,
        easing: "easeInOutBounce",
      },
    },
  });
};

const createUserRoleChart = () => {
  const ctx = document.getElementById("userRoleChart")?.getContext("2d");
  if (!ctx) return;

  const roleCounts = userStore.users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  const roles = Object.keys(roleCounts);
  const counts = Object.values(roleCounts);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: roles,
      datasets: [
        {
          label: "User Roles",
          data: counts,
          backgroundColor: [
            "#1ABC9C", // Light teal
            "#F1C40F", // Yellow
            "#E74C3C", // Red
            "#9B59B6", // Purple
          ],
          borderColor: [
            "#16A085", // Dark teal
            "#F39C12", // Dark yellow
            "#C0392B", // Dark red
            "#8E44AD", // Dark purple
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 14,
              family: "'Roboto', sans-serif",
            },
            color: "#34495E",
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: "#FDFEFE",
          titleColor: "#2C3E50",
          bodyColor: "#2C3E50",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#2C3E50",
          },
        },
        x: {
          ticks: {
            color: "#2C3E50",
          },
        },
      },
      animation: {
        duration: 1200,
        easing: "easeOutElastic",
      },
    },
  });
};


</script>
<style>
/* Customize card actions spacing */
.v-card-actions {
  justify-content: space-between;
}
</style>