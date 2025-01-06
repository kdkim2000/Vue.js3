import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserList.vue';
import EditUser from '../components/EditUser.vue';
import AddUser from '../components/AddUser.vue';
import UserCards from '../components/UserCards.vue';
import Dashboard from '../components/Dashboard.vue';


const routes = [
  { path: '/users', name: 'UserList', component: UserList },
  { path: '/users/add', name: 'AddUser', component: AddUser },
  { path: '/users/edit/:id', name: 'EditUser', component: EditUser },
  { path: '/userCards', name: 'UserCards', component: UserCards },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
