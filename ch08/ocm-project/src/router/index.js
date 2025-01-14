import { createRouter, createWebHistory } from "vue-router";

// Import Views
import DashboardView from "../views/DashboardView.vue";
import AboutView from "../views/AboutView.vue";

// Define Routes
const routes = [
  { path: "/", name: "Dashboard", component: DashboardView },
  { path: "/about", name: "About", component: AboutView },
  { path: "/:pathMatch(.*)*", redirect: "/" }, // Fallback to Dashboard for unmatched paths
];

// Create Router Instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
