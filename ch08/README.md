# **8. 통합 프로젝트: 사용자 관리 시스템**

---

## **8.0 프로젝트 시작하기**

이 섹션에서는 **사용자 관리 시스템**을 처음부터 구성합니다.  
초보자도 따라할 수 있도록 프로젝트 생성부터 필수 모듈 설치 및 초기 설정까지 자세히 안내합니다.

---

### **1. 프로젝트 생성**

1. **Vite로 Vue 프로젝트 생성**
   ```bash
   npm create vite@latest user-management-system --template vue
   ```
2. **프로젝트 디렉토리로 이동**
   ```bash
   cd user-management-system
   ```
3. **의존성 설치**
   ```bash
   npm install
   ```

---

### **2. 필수 모듈 설치**

1. **Vuetify 설치**
   ```bash
   npm install vuetify
   ```

2. **Pinia 설치**
   ```bash
   npm install pinia
   ```

3. **Axios 설치**
   ```bash
   npm install axios
   ```

4. **Vue Router 설치**
   ```bash
   npm install vue-router
   ```

---

### **3. 프로젝트 초기화**

#### **1) Vuetify 설정**
**`src/main.js`**:
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import router from './router';
import 'vuetify/styles';

const vuetify = createVuetify();
const pinia = createPinia();

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .mount('#app');
```

---

#### **2) 프로젝트 폴더 구조**
```
user-management-system/
├── src/
│   ├── components/
│   │   ├── Dashboard.vue
│   │   ├── UserList.vue
│   │   ├── UserDetail.vue
│   │   ├── AddUser.vue
│   ├── stores/
│   │   ├── uiStore.js
│   │   ├── userStore.js
│   ├── router/
│   │   ├── index.js
│   ├── utils/
│   │   ├── api.js
│   ├── App.vue
│   ├── main.js
├── db.json
├── vite.config.js
├── package.json
└── README.md
```

---

## **8.1 대시보드 설계 및 데이터 시각화**

**`src/components/Dashboard.vue`**:
```vue
<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Total Users</v-card-title>
          <v-card-text>{{ stats.totalUsers }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Active Users</v-card-title>
          <v-card-text>{{ stats.activeUsers }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Inactive Users</v-card-title>
          <v-card-text>{{ stats.inactiveUsers }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const stats = ref({
  totalUsers: 0,
  activeUsers: 0,
  inactiveUsers: 0,
});

onMounted(async () => {
  const response = await api.get('/users');
  stats.value.totalUsers = response.data.length;
  stats.value.activeUsers = response.data.filter((user) => user.active).length;
  stats.value.inactiveUsers = stats.value.totalUsers - stats.value.activeUsers;
});
</script>
```

---

## **8.2 사용자 목록 및 상세 정보 페이지 제작**

**`src/components/UserList.vue`**:
```vue
<template>
  <v-container>
    <h1>User List</h1>
    <v-data-table
      :items="users"
      :headers="headers"
      :search="search"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <v-text-field v-model="search" label="Search" clearable></v-text-field>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const users = ref([]);
const search = ref('');
const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Status', value: 'active' },
];

onMounted(async () => {
  const response = await api.get('/users');
  users.value = response.data;
});
</script>
```

---

**`src/components/UserDetail.vue`**:
```vue
<template>
  <v-container>
    <h1>User Detail</h1>
    <v-card>
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-subtitle>{{ user.email }}</v-card-subtitle>
      <v-card-text>
        <p><strong>Status:</strong> {{ user.active ? 'Active' : 'Inactive' }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../utils/api';

const route = useRoute();
const user = ref({});

onMounted(async () => {
  const response = await api.get(`/users/${route.params.id}`);
  user.value = response.data;
});
</script>
```

---

### **추가 코드**

이후 전체 코드를 포함한 설명을 이어서 작성하겠습니다. 😊

### **8.3 CRUD 기능 구현 (계속)**

---

### **Create (사용자 추가)**

**`src/components/AddUser.vue`**:
```vue
<template>
  <v-container>
    <h1>Add User</h1>
    <v-form ref="form" v-model="isFormValid">
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-select v-model="user.role" :items="roles" label="Role" required></v-select>
      <v-btn :disabled="!isFormValid" color="primary" @click="addUser">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import api from '../utils/api';

const user = ref({ name: '', email: '', role: '' });
const roles = ['Admin', 'Editor', 'Viewer'];
const isFormValid = ref(false);

const addUser = async () => {
  await api.post('/users', user.value);
  alert('User added successfully!');
  user.value = { name: '', email: '', role: '' };
};
</script>
```

---

### **Read (사용자 목록 및 상세 보기)**

이전 **UserList.vue** 및 **UserDetail.vue**에서 설명한 내용을 그대로 활용합니다.

---

### **Update (사용자 수정)**

**`src/components/EditUser.vue`**:
```vue
<template>
  <v-container>
    <h1>Edit User</h1>
    <v-form ref="form" v-model="isFormValid">
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-select v-model="user.role" :items="roles" label="Role" required></v-select>
      <v-btn :disabled="!isFormValid" color="primary" @click="updateUser">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../utils/api';

const route = useRoute();
const user = ref({});
const roles = ['Admin', 'Editor', 'Viewer'];
const isFormValid = ref(false);

onMounted(async () => {
  const response = await api.get(`/users/${route.params.id}`);
  user.value = response.data;
});

const updateUser = async () => {
  await api.put(`/users/${route.params.id}`, user.value);
  alert('User updated successfully!');
};
</script>
```

---

### **Delete (사용자 삭제)**

**`src/components/DeleteUser.vue`**:
```vue
<template>
  <v-container>
    <h1>Delete User</h1>
    <v-btn color="error" @click="deleteUser">Delete User</v-btn>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';
import api from '../utils/api';

const route = useRoute();

const deleteUser = async () => {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    await api.delete(`/users/${route.params.id}`);
    alert('User deleted successfully!');
  }
};
</script>
```

---

### **8.4 전체 UI 통일성과 상태 관리 적용**

#### **Pinia를 활용한 전역 상태**

**`src/stores/uiStore.js`**:
```javascript
import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
});
```

#### **UI 상태와 연동**

**`src/components/Header.vue`**:
```vue
<template>
  <v-app-bar app>
    <v-toolbar-title>User Management</v-toolbar-title>
    <v-btn text @click="toggleDarkMode">
      {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useUiStore } from '../stores/uiStore';

const uiStore = useUiStore();
const darkMode = uiStore.darkMode;
const toggleDarkMode = uiStore.toggleDarkMode;
</script>
```

---

### **최종 폴더 구조**
```
user-management-system/
├── src/
│   ├── components/
│   │   ├── Dashboard.vue
│   │   ├── UserList.vue
│   │   ├── UserDetail.vue
│   │   ├── AddUser.vue
│   │   ├── EditUser.vue
│   │   ├── DeleteUser.vue
│   │   ├── Header.vue
│   ├── stores/
│   │   ├── uiStore.js
│   │   ├── userStore.js
│   ├── router/
│   │   ├── index.js
│   ├── utils/
│   │   ├── api.js
│   ├── App.vue
│   ├── main.js
├── db.json
├── vite.config.js
├── package.json
└── README.md
```

---

### **8.5 학습 자료**
- [Vue.js 공식 문서](https://vuejs.org/)
- [Pinia 공식 문서](https://pinia.vuejs.org/)
- [Vuetify 공식 문서](https://vuetifyjs.com/)
- [Axios 공식 문서](https://axios-http.com/)

---

