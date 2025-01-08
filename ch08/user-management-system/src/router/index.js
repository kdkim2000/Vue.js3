import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

// Components
import Dashboard from "../components/Dashboard.vue";
import UserList from "../components/UserList.vue";
import UserDetail from "../components/UserDetail.vue";
import AddUser from "../components/AddUser.vue";
import EditUser from "../components/EditUser.vue";
import Login from "../components/Login.vue"; // Login page component
import Signup from "../components/Signup.vue"; // Signup page component

// Route definitions
const routes = [
  { path: "/login", name: "Login", component: Login }, // Login route
  { path: "/signup", name: "Signup", component: Signup }, // Signup route
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "UserList",
    component: UserList,
    meta: { requiresAuth: true },
  },
  {
    path: "/users/:id",
    name: "UserDetail",
    component: UserDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/users/add",
    name: "AddUser",
    component: AddUser,
    meta: { requiresAuth: true },
  },
  {
    path: "/users/edit/:id",
    name: "EditUser",
    component: EditUser,
    props: true,
    meta: { requiresAuth: true },
  },
];

// Router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to Login if not authenticated
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
