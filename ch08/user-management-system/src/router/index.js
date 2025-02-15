import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

// Components
import Dashboard from "../pages/Dashboard.vue";
import UserList from "../pages/UserList.vue";
import UserDetail from "../pages/UserDetail.vue";
import AddUser from "../pages/AddUser.vue";
import EditUser from "../pages/EditUser.vue";
import Login from "../pages/Login.vue"; 
import Signup from "../pages/Signup.vue"; 
import Setting from "../pages/Setting.vue"; 
import Profile from "../pages/Profile.vue"; 

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
  {
    path: '/settings',
    name: "Setting",
    component: Setting,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: "profile",
    component: Profile,
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
  authStore.restoreAuth(); // Restore authentication state

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to Login if not authenticated
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
