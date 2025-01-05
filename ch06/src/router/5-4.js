// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../components/Home.vue';
// import About from '../components/About.vue';
// import User from '../components/User.vue';
// import Protected from '../components/Protected.vue';
// import { useAuthStore } from '../stores/authStore';

// const routes = [
//   { path: '/', name: 'Home', component: Home },
//   { path: '/about', name: 'About', component: About },
//   { path: '/user/:id', name: 'User', component: User },
//   {
//     path: '/protected',
//     name: 'Protected',
//     component: Protected,
//     beforeEnter: (to, from, next) => {
//       const authStore = useAuthStore();
//       if (authStore.isAuthenticated) {
//         next();
//       } else {
//         alert('You must log in to access this page!');
//         next('/');
//       }
//     },
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
