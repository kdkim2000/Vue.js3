import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserList.vue';
import UserDetail from '../components/UserDetail.vue';

const routes = [
  { path: '/users', name: 'UserList', component: UserList },
  { path: '/user/:id', name: 'UserDetail', component: UserDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
