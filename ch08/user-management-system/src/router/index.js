import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import UserList from '../components/UserList.vue';
import UserDetail from '../components/UserDetail.vue';
import AddUser from '../components/AddUser.vue';
import EditUser from '../components/EditUser.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'UserList', component: UserList },
  { path: '/users/:id', name: 'UserDetail', component: UserDetail, props: true },
  { path: '/users/add', name: 'AddUser', component: AddUser },
  { path: '/users/edit/:id', name: 'EditUser', component: EditUser, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;