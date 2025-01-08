import { defineStore } from 'pinia';
import api from '../utils/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    // Fetch users excluding sensitive information like 'passwd'
    async fetchUsers() {
      const response = await api.get('/users');
      // Remove password before storing users
      this.users = response.data.map(({ passwd, ...user }) => user);
    },
    async addUser(user) {
      const response = await api.post('/users', user);
      this.users.push(response.data);
    },
    async updateUser(user) {
      await api.put(`/users/${user.id}`, user);
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) this.users[index] = user;
    },
    async deleteUser(id) {
      await api.delete(`/users/${id}`);
      this.users = this.users.filter((user) => user.id !== id);
    },
    // Validate user login
    async validateLogin(email, passwd) {
      const response = await api.get(`/users?email=${email}`);
      const user = response.data[0];
      if (user && user.passwd === passwd) {
        return { success: true, user };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    },
  },
});
