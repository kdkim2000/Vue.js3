<template>
  <v-container>
    <h1 class="mb-6">Dashboard</h1>

    <!-- Statistics Cards: Active Status -->
    <h2>Active Status</h2>
    <v-row>
      <v-col cols="12" md="4">
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
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-3" outlined>
          <v-card-item>
            <v-card-title>
              <v-icon left color="green">mdi-account-check</v-icon>
              Active Users
            </v-card-title>
            <v-card-subtitle>Currently active users</v-card-subtitle>
          </v-card-item>
          <v-card-text class="display-1 text-center">
            <v-icon color="green">mdi-account-circle</v-icon>
            {{ stats.active }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-3" outlined>
          <v-card-item>
            <v-card-title>
              <v-icon left color="red">mdi-account-off</v-icon>
              Inactive Users
            </v-card-title>
            <v-card-subtitle>Users not currently active</v-card-subtitle>
          </v-card-item>
          <v-card-text class="display-1 text-center">
            <v-icon color="red">mdi-account-remove</v-icon>
            {{ stats.inactive }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Statistics Cards: Roles -->
    <h2 class="mt-8">Roles</h2>
    <v-row>
      <v-col cols="12" md="3" v-for="role in sortedRoles" :key="role">
        <v-card class="pa-3" outlined>
          <v-card-item>
            <v-card-title>
              <v-icon :color="roleColors[role]?.iconColor">{{ roleColors[role]?.icon }}</v-icon>
              {{ role }}
            </v-card-title>
            <v-card-subtitle>Users with {{ role }} role</v-card-subtitle>
          </v-card-item>
          <v-card-text class="display-1 text-center">
            <v-icon :color="roleColors[role]?.iconColor">{{ roleColors[role]?.icon }}</v-icon>
            {{ stats.roles[role] }}
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="openRoleDialog(role)">More Info</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Role Description Dialog -->
    <v-dialog v-model="isRoleDialogVisible" max-width="400">
      <v-card>
        <v-card-title>{{ currentRole }}</v-card-title>
        <v-card-text>{{ roleDescriptions[currentRole] }}</v-card-text>
        <v-card-actions>
          <v-btn text @click="closeRoleDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Chart Section -->
    <v-row class="mt-8">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>User Status Chart</v-card-title>
          <v-card-text>
            <canvas id="userStatusChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
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
import { computed, ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import Chart from "chart.js/auto";

// Access user data from Pinia store
const userStore = useUserStore();

// Role order
const roleOrder = ["Admin", "Editor", "Contributor", "Viewer"];

// Computed property for statistics
const stats = computed(() => {
  const total = userStore.users.length;
  const active = userStore.users.filter((user) => user.active).length;
  const inactive = total - active;

  const roles = userStore.users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  return { total, active, inactive, roles };
});

// Sorted roles
const sortedRoles = computed(() => {
  return roleOrder.filter((role) => stats.value.roles[role]);
});

// Role colors and icons
const roleColors = {
  Admin: { class: "bg-blue-lighten-4", iconColor: "#42A5F5", icon: "mdi-shield-check" },
  Editor: { class: "bg-purple-lighten-4", iconColor: "#AB47BC", icon: "mdi-pencil" },
  Contributor: { class: "bg-orange-lighten-4", iconColor: "#FFA726", icon: "mdi-account-edit" },
  Viewer: { class: "bg-green-lighten-4", iconColor: "#66BB6A", icon: "mdi-eye" },
};

// Role descriptions
const roleDescriptions = {
  Admin: "Admins have full control over the system.",
  Editor: "Editors can manage and edit content.",
  Contributor: "Contributors can add and edit content.",
  Viewer: "Viewers can only view content.",
};

// Dialog state
const isRoleDialogVisible = ref(false);
const currentRole = ref("");

// Dialog methods
const openRoleDialog = (role) => {
  currentRole.value = role;
  isRoleDialogVisible.value = true;
};
const closeRoleDialog = () => {
  isRoleDialogVisible.value = false;
};

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
          backgroundColor: ["#66BB6A", "#FF7043"], // Vuetify Green 500, Deep Orange 400
          borderColor: ["#43A047", "#E64A19"], // Slightly darker tones
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
            color: "#37474F",
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: "#ECEFF1",
          titleColor: "#37474F",
          bodyColor: "#37474F",
        },
      },
      animation: {
        duration: 1200,
        easing: "easeInOutCubic",
      },
    },
  });
};


// User role chart (bar)
const createUserRoleChart = () => {
  const ctx = document.getElementById("userRoleChart")?.getContext("2d");
  if (!ctx) return;

  // Ensure roles are sorted according to roleOrder
  const orderedRoles = roleOrder.filter((role) => stats.value.roles[role]);
  const orderedCounts = orderedRoles.map((role) => stats.value.roles[role]);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: orderedRoles,
      datasets: [
        {
          label: "User Roles",
          data: orderedCounts,
          backgroundColor: orderedRoles.map((role) => roleColors[role]?.iconColor),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { 
          display: false, 
        },
        tooltip: {
          enabled: true,
          backgroundColor: "#ECEFF1",
          titleColor: "#37474F",
          bodyColor: "#37474F",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#37474F",
          },
        },
        x: {
          ticks: {
            color: "#37474F",
          },
        },
      },
      animation: {
        duration: 1200,
        easing: "easeInOutCubic",
      },
    },
  });
};

</script>