## 5. Vue Router로 SPA 구현

---

### **5.1 Vue Router 설치 및 설정**

#### **Vue Router란?**
Vue Router는 Vue.js의 공식 라우팅 라이브러리로, URL을 기반으로 페이지 전환 없이 동적으로 컴포넌트를 렌더링하여 **SPA(Single Page Application)**를 구현합니다.

#### **Vue Router의 주요 기능**
1. **URL 기반 컴포넌트 렌더링**: URL에 따라 화면에 다른 컴포넌트를 표시.
2. **동적 라우팅**: URL 매개변수를 통해 데이터를 전달.
3. **라우터 가드**: 페이지 접근을 제어.
4. **히스토리 모드**: 브라우저 히스토리를 관리하여 직관적인 탐색 제공.

#### **설치 및 초기 설정**
1. Vue Router 설치:
   ```bash
   npm install vue-router
   ```

2. **라우터 설정 파일 생성**:
   `src/router/index.js`:
   ```javascript
   import { createRouter, createWebHistory } from 'vue-router';
   import Home from '../components/Home.vue';
   import About from '../components/About.vue';

   const routes = [
     { path: '/', name: 'Home', component: Home },
     { path: '/about', name: 'About', component: About },
   ];

   const router = createRouter({
     history: createWebHistory(),
     routes,
   });

   export default router;
   ```

3. **`main.js`에 라우터 추가**:
   ```javascript
   import { createApp } from 'vue';
   import App from './App.vue';
   import router from './router';
   import { createPinia } from 'pinia';
   import { createVuetify } from 'vuetify';
   import 'vuetify/styles';

   const vuetify = createVuetify();

   const app = createApp(App);
   app.use(router).use(createPinia()).use(vuetify).mount('#app');
   ```

---

### **5.2 페이지 전환과 네비게이션 구성**

#### **페이지 전환 구현**
1. **Home.vue**:
   ```vue
   <template>
     <v-container>
       <h1>Home Page</h1>
       <p>Welcome to the home page!</p>
     </v-container>
   </template>
   ```

2. **About.vue**:
   ```vue
   <template>
     <v-container>
       <h1>About Page</h1>
       <p>This is the about page.</p>
     </v-container>
   </template>
   ```

3. **App.vue**에서 네비게이션 추가:
   ```vue
   <template>
     <v-app>
       <v-app-bar app>
         <v-btn text to="/">Home</v-btn>
         <v-btn text to="/about">About</v-btn>
       </v-app-bar>
       <v-main>
         <router-view />
       </v-main>
     </v-app>
   </template>
   ```

#### **결과**:
- 브라우저에서 `/`로 접근하면 Home 페이지가 표시됩니다.
- `/about`으로 접근하면 About 페이지가 표시됩니다.

---

### **5.3 동적 라우팅과 라우터 가드**

#### **동적 라우팅 구현**
1. **User.vue**:
   ```vue
   <template>
     <v-container>
       <h1>User Page</h1>
       <p>User ID: {{ $route.params.id }}</p>
     </v-container>
   </template>
   ```

2. **라우터 설정에 동적 라우트 추가**:
   ```javascript
   { path: '/user/:id', name: 'User', component: User },
   ```

3. **App.vue에 링크 추가**:
   ```vue
   <v-btn text to="/user/1">User Page</v-btn>
   ```

#### **라우터 가드 설정**
1. **Protected.vue**:
   ```vue
   <template>
     <v-container>
       <h1>Protected Page</h1>
       <p>You can only see this page if you are authenticated.</p>
     </v-container>
   </template>
   ```

2. **라우터 설정에 가드 추가**:
   ```javascript
   import Protected from '../components/Protected.vue';

   const isAuthenticated = false;

   { 
     path: '/protected', 
     name: 'Protected', 
     component: Protected,
     beforeEnter: (to, from, next) => {
       if (isAuthenticated) {
         next();
       } else {
         alert('You must log in to access this page!');
         next('/');
       }
     },
   },
   ```

---

### **5.4 Vue Router와 Pinia 연동**

#### **Pinia로 인증 상태 관리**
1. **authStore.js**:
   ```javascript
   import { defineStore } from 'pinia';

   export const useAuthStore = defineStore('auth', {
     state: () => ({
       isAuthenticated: false,
     }),
     actions: {
       login() {
         this.isAuthenticated = true;
       },
       logout() {
         this.isAuthenticated = false;
       },
     },
   });
   ```

2. **라우터 가드에서 Pinia 연동**:
   ```javascript
   import { useAuthStore } from '../stores/authStore';

   const routes = [
     { path: '/protected', component: Protected, beforeEnter: (to, from, next) => {
         const authStore = useAuthStore();
         if (authStore.isAuthenticated) {
           next();
         } else {
           alert('You must log in to access this page!');
           next('/');
         }
       },
     },
   ];
   ```

3. **App.vue에 로그인/로그아웃 버튼 추가**:
   ```vue
   <v-btn text @click="login">Login</v-btn>
   <v-btn text @click="logout">Logout</v-btn>
   ```

#### **결과**:
- 로그인 상태에서만 `/protected` 페이지 접근 가능.
- 로그아웃 상태에서는 접근 시 `/`로 리다이렉트.

---

### **결론**
Vue Router는 SPA를 구성하는 핵심 요소로, **라우팅**과 **상태 관리**를 결합하여 효율적인 네비게이션과 인증을 구현할 수 있습니다. 

추가적으로 학습할 수 있는 주제:
- [Vue Router 공식 문서](https://router.vuejs.org/)
- [SPA와 Vue Router의 원리](https://vuejs.org/guide/scaling-up/routing.html)

## 5장 실습: 사용자 관리 페이지 및 상세보기 페이지 구현

---

### **목표**
1. **사용자 관리 페이지(UserList.vue)**:
   - 사용자 목록을 보여주고, 각 사용자의 상세 페이지로 이동할 수 있도록 구현합니다.
2. **사용자 상세보기 페이지(UserDetail.vue)**:
   - 특정 사용자의 상세 정보를 표시합니다.
3. **네비게이션 메뉴와 라우팅 연동**:
   - 네비게이션 메뉴에서 사용자 관리 페이지로 이동할 수 있도록 설정합니다.

---

### **1. 사용자 관리 페이지(UserList.vue) 구현**

#### **1-1. UserList 컴포넌트 작성**
1. `src/components/UserList.vue` 파일 생성.
2. 아래 코드를 작성합니다:
   ```vue
   <template>
     <v-container>
       <h1>User Management</h1>
       <v-list>
         <v-list-item
           v-for="user in users"
           :key="user.id"
           @click="goToUserDetail(user.id)"
         >
           <v-list-item-content>
             <v-list-item-title>{{ user.name }}</v-list-item-title>
             <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
           </v-list-item-content>
           <v-list-item-icon>
             <v-icon>mdi-account</v-icon>
           </v-list-item-icon>
         </v-list-item>
       </v-list>
     </v-container>
   </template>

   <script setup>
   import { useRouter } from 'vue-router';

   const router = useRouter();

   const users = [
     { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
     { id: 3, name: 'Alice Brown', email: 'alice.brown@example.com' },
   ];

   const goToUserDetail = (id) => {
     router.push(`/user/${id}`);
   };
   </script>
   ```

---

### **2. 사용자 상세보기 페이지(UserDetail.vue) 구현**

#### **2-1. UserDetail 컴포넌트 작성**
1. `src/components/UserDetail.vue` 파일 생성.
2. 아래 코드를 작성합니다:
   ```vue
   <template>
     <v-container>
       <h1>User Detail</h1>
       <v-card>
         <v-card-title>{{ user.name }}</v-card-title>
         <v-card-subtitle>{{ user.email }}</v-card-subtitle>
         <v-card-text>
           <p><strong>ID:</strong> {{ user.id }}</p>
           <p><strong>Phone:</strong> {{ user.phone }}</p>
         </v-card-text>
       </v-card>
       <v-btn @click="goBack" color="primary">Go Back</v-btn>
     </v-container>
   </template>

   <script setup>
   import { useRoute, useRouter } from 'vue-router';
   import { ref } from 'vue';

   const route = useRoute();
   const router = useRouter();

   const userId = route.params.id;
   const user = ref({
     id: userId,
     name: `User ${userId}`,
     email: `user${userId}@example.com`,
     phone: `123-456-${userId.padStart(4, '0')}`,
   });

   const goBack = () => {
     router.push('/users');
   };
   </script>
   ```

---

### **3. 네비게이션 메뉴와 라우팅 연동**

#### **3-1. 라우터 설정 추가**
1. `src/router/index.js` 수정:
   ```javascript
   import UserList from '../components/UserList.vue';
   import UserDetail from '../components/UserDetail.vue';

   const routes = [
     { path: '/users', name: 'UserList', component: UserList },
     { path: '/user/:id', name: 'UserDetail', component: UserDetail },
   ];
   ```

#### **3-2. 네비게이션 메뉴 수정**
1. `App.vue`에서 사용자 관리 메뉴 추가:
   ```vue
   <v-btn text to="/users">User Management</v-btn>
   ```

---

### **4. 최종 폴더 구조**
5장 실습 완료 후 프로젝트 폴더 구조:
```
my-vue-project/
├── node_modules/
├── public/
│   ├── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue           # 상단 헤더 컴포넌트
│   │   ├── Sidebar.vue          # 왼쪽 사이드바 컴포넌트
│   │   ├── Content.vue          # 메인 콘텐츠 컴포넌트
│   │   ├── Counter.vue          # Counter 컴포넌트
│   │   ├── FilterList.vue       # 실시간 필터링 컴포넌트
│   │   ├── ToDoList.vue         # To-Do 리스트 컴포넌트
│   │   ├── UserList.vue         # 사용자 관리 페이지
│   │   └── UserDetail.vue       # 사용자 상세보기 페이지
│   ├── router/
│   │   └── index.js             # Vue Router 설정
│   ├── stores/
│   │   ├── counterStore.js      # Counter 상태 관리
│   │   ├── todoStore.js         # To-Do 리스트 상태 관리
│   │   └── authStore.js         # 인증 상태 관리
│   ├── App.vue                  # 전체 레이아웃 구성
│   ├── main.js                  # Vuetify 및 Pinia 초기 설정
│   └── style.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

### **결과 확인**
1. **사용자 관리 페이지**:
   - `/users`로 이동하면 사용자 목록이 표시됩니다.
   - 각 사용자 항목을 클릭하면 상세 페이지로 이동합니다.
2. **사용자 상세보기 페이지**:
   - `/user/:id`로 이동하면 해당 사용자의 상세 정보가 표시됩니다.
3. **네비게이션 메뉴**:
   - AppBar에 사용자 관리 메뉴를 추가하여 `/users`로 빠르게 이동할 수 있습니다.

---

이제 실습이 완료되었습니다! 추가적인 질문이나 확장 요청이 있으면 알려주세요. 😊