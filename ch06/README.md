# 6. Axios와 RESTful API 연동

---

## **6.1 Axios 설치 및 기본 사용법**

### **Axios란?**
Axios는 HTTP 클라이언트 라이브러리로, 브라우저와 Node.js 환경에서 RESTful API와 통신할 때 사용됩니다.  
Vue.js에서 데이터를 가져오거나 서버에 전송하는 데 주로 활용됩니다.

---

### **Axios 설치**
1. Axios 설치:
   ```bash
   npm install axios
   ```

2. Axios 설정 파일 생성:
   **`src/utils/api.js`**:
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL, // 환경 변수에서 API URL 설정
     timeout: 5000, // 요청 제한 시간
   });

   export default api;
   ```

---

## **6.2 JSON Server로 REST API 시뮬레이션**

### **JSON Server란?**
JSON Server는 로컬에서 빠르게 RESTful API를 시뮬레이션할 수 있는 도구입니다.  
테스트 환경에서 백엔드 없이도 API 요청을 처리할 수 있습니다.

---

### **1. JSON Server 설치**
1. JSON Server 설치:
   ```bash
   npm install -g json-server
   ```

2. 프로젝트 루트에 `db.json` 파일 생성:
   ```json
   {
     "users": [
       { "id": 1, "name": "John Doe", "email": "john@example.com" },
       { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
     ]
   }
   ```

3. JSON Server 실행:
   ```bash
   json-server --watch db.json --port 3000
   ```

4. API 엔드포인트:
   - GET: `http://localhost:3000/users`
   - POST: `http://localhost:3000/users`
   - PUT: `http://localhost:3000/users/:id`
   - DELETE: `http://localhost:3000/users/:id`

---

### **2. Axios와 JSON Server 연동**

#### **기본 설정**
**`src/utils/api.js`**:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // JSON Server URL
  timeout: 5000,
});

export default api;
```

#### **GET 요청: 사용자 목록 가져오기**
**`src/components/UserList.vue`**:
```vue
<template>
  <v-container>
    <h1>User List</h1>
    <v-data-table :items="users" :headers="headers" class="elevation-1" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const users = ref([]);
const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
];

onMounted(async () => {
  const response = await api.get('/users');
  users.value = response.data;
});
</script>
```

---

#### **POST 요청: 사용자 추가**
**`src/components/AddUser.vue`**:
```vue
<template>
  <v-container>
    <v-text-field v-model="name" label="Name"></v-text-field>
    <v-text-field v-model="email" label="Email"></v-text-field>
    <v-btn @click="addUser">Add User</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import api from '../utils/api';

const name = ref('');
const email = ref('');

const addUser = async () => {
  await api.post('/users', { name: name.value, email: email.value });
  alert('User added successfully');
};
</script>
```

---

#### **PUT 요청: 사용자 수정**
**`src/components/EditUser.vue`**:
```vue
<template>
  <v-container>
    <v-text-field v-model="user.name" label="Name"></v-text-field>
    <v-text-field v-model="user.email" label="Email"></v-text-field>
    <v-btn @click="updateUser">Update User</v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const user = ref({ name: '', email: '' });
const userId = 1; // 수정할 사용자 ID

onMounted(async () => {
  const response = await api.get(`/users/${userId}`);
  user.value = response.data;
});

const updateUser = async () => {
  await api.put(`/users/${userId}`, user.value);
  alert('User updated successfully');
};
</script>
```

---

#### **DELETE 요청: 사용자 삭제**
**`src/components/DeleteUser.vue`**:
```vue
<template>
  <v-container>
    <v-btn color="error" @click="deleteUser">Delete User</v-btn>
  </v-container>
</template>

<script setup>
import api from '../utils/api';

const userId = 1; // 삭제할 사용자 ID

const deleteUser = async () => {
  await api.delete(`/users/${userId}`);
  alert('User deleted successfully');
};
</script>
```

---

### **6.3 API와 Vuetify 컴포넌트 연동**

**`src/components/Dashboard.vue`**:
```vue
<template>
  <v-container>
    <h1>User Dashboard</h1>
    <v-data-table :items="users" :headers="headers" class="elevation-1" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const users = ref([]);
const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
];

onMounted(async () => {
  const response = await api.get('/users');
  users.value = response.data;
});
</script>
```

---

## **6.4 학습 자료**
- [JSON Server 공식 문서](https://github.com/typicode/json-server)
- [Axios 공식 문서](https://axios-http.com/)
- [Vuetify Data Table 공식 문서](https://vuetifyjs.com/en/components/data-tables/)

---
