import { defineStore } from 'pinia';
import api from '../utils/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      const response = await api.get('/users');
      this.users = response.data;
    //   console.log(this.users);
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
  },
});