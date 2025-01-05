# 10. 부록

---

## **10.1 자주 묻는 질문 (FAQ)**
---

### **Q1: 프로젝트를 시작할 때 어떤 모듈을 설치해야 하나요?**

Vue.js 프로젝트에서는 기본적으로 다음 모듈들을 설치하는 것이 좋습니다:

1. **vue**: Vue.js 프레임워크의 핵심입니다.
2. **vuetify**: UI 컴포넌트를 제공하여 빠르고 아름다운 디자인을 구현할 수 있습니다.
3. **pinia**: Vue의 상태 관리 라이브러리로, 간단하고 강력한 전역 상태 관리를 제공합니다.
4. **vue-router**: 페이지 전환과 라우팅을 처리하는 라이브러리입니다.
5. **axios**: API 요청과 서버 통신을 처리하는 HTTP 클라이언트입니다.

설치 명령어:
```bash
npm install vue vuetify pinia vue-router axios
```

**참조:**  
- **1장:** Vite를 사용해 프로젝트를 생성하고 필요한 모듈을 설치하는 과정을 다룹니다.  
- **6장:** Axios 설치 및 기본 사용법에 대한 자세한 내용이 포함되어 있습니다.

---

### **Q2: Vuetify에서 테마를 어떻게 설정하나요?**

Vuetify는 기본 테마를 커스터마이징하거나 다크 모드와 같은 다양한 테마를 설정할 수 있습니다. 아래 코드는 Vuetify에서 테마를 설정하는 예제입니다:

```javascript
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
        },
      },
      dark: {
        colors: {
          primary: '#1E88E5',
          secondary: '#757575',
        },
      },
    },
  },
});
```

위 코드는 `src/main.js` 파일에서 Vuetify를 초기화할 때 사용합니다.

**참조:**  
- **7장:** Vuetify의 다양한 컴포넌트와 테마 설정에 대한 설명이 포함되어 있습니다.  
- **9장:** 테마와 관련된 환경 변수 관리 방법도 확인할 수 있습니다.

---

### **Q3: Axios로 API 요청을 실패할 경우 어떻게 처리하나요?**

API 요청이 실패했을 때의 오류를 관리하는 것은 매우 중요합니다. Axios의 `Interceptor`를 사용하면 모든 요청에서 공통된 오류 처리를 적용할 수 있습니다:

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    alert('An error occurred. Please try again.');
    return Promise.reject(error);
  }
);
```

이 코드에서:
- `response`는 요청이 성공적으로 처리된 경우입니다.
- `error`는 요청이 실패한 경우입니다. 오류 메시지를 출력하거나 사용자에게 알림을 표시할 수 있습니다.

**참조:**  
- **6장:** Axios Interceptor를 사용한 인증 처리에 대한 예제가 포함되어 있습니다.

---

### **Q4: Vue Router에서 동적 라우팅은 어떻게 설정하나요?**

동적 라우팅은 URL 매개변수를 기반으로 데이터를 전달하거나 특정 페이지를 렌더링할 때 사용됩니다. 예를 들어, 사용자 ID를 기반으로 상세 페이지를 보여주는 경우를 생각해볼 수 있습니다:

**1. 라우터 설정**
```javascript
const routes = [
  { path: '/users/:id', component: UserDetail, props: true },
];
```

**2. 동적 라우팅 사용**
```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id; // URL에서 'id'를 가져옵니다.
</script>
```

이 설정은 `/users/123` 같은 URL에서 `123`을 `id`로 가져옵니다.

**참조:**  
- **5장:** Vue Router와 동적 라우팅에 대한 자세한 설명이 포함되어 있습니다.  
- **8장:** 실제 프로젝트에서 동적 라우팅을 사용하는 예제를 확인할 수 있습니다.

---

### **Q5: Pinia를 Vue Router와 함께 사용하려면 어떻게 해야 하나요?**

Pinia 상태를 기반으로 특정 페이지 접근을 제한하려면 Vue Router의 `beforeEach` 훅을 사용할 수 있습니다. 예를 들어, 인증 상태를 확인하여 보호된 페이지에 접근을 제한하는 경우:

```javascript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    alert('Please log in to access this page.');
    next('/login');
  } else {
    next();
  }
});
```

**참조:**  
- **4장:** Pinia를 사용하여 상태를 관리하는 기본적인 방법이 설명되어 있습니다.  
- **5장:** Pinia와 Vue Router의 통합 예제가 포함되어 있습니다.

---

### **Q6: JSON Server를 백엔드로 사용할 때 데이터를 어떻게 설정하나요?**

JSON Server는 간단한 RESTful API를 제공하며, 빠른 개발과 테스트에 적합합니다. 사용 방법은 다음과 같습니다:

1. **`db.json` 파일 생성**
```json
{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
  ]
}
```

2. **JSON Server 실행**
```bash
json-server --watch db.json --port 3000
```

3. **Axios로 데이터 호출**
```javascript
const response = await api.get('/users');
console.log(response.data);
```

**참조:**  
- **6장:** JSON Server 설정과 Axios 연동 방법을 자세히 다룹니다.

---

### **Q7: Vuetify의 Data Table에서 정렬과 필터링을 추가하려면 어떻게 하나요?**

Vuetify의 Data Table 컴포넌트는 정렬과 필터링 기능을 내장하고 있습니다. 아래는 기본 예제입니다:

```vue
<v-data-table
  :items="users"
  :headers="headers"
  :search="search"
  class="elevation-1"
>
</v-data-table>
<v-text-field v-model="search" label="Search" clearable></v-text-field>
```

위 코드에서:
- `:search`는 사용자 입력을 기반으로 필터링합니다.
- `:headers`는 테이블의 열 제목을 정의합니다.

**참조:**  
- **7장:** Data Table과 필터링 기능 구현에 대한 자세한 내용이 포함되어 있습니다.

---

### **Q8: 상태 관리 라이브러리가 필요한 이유는 무엇인가요?**

Vue에서는 컴포넌트 간 데이터를 `props`와 `emits`를 통해 전달할 수 있지만, 컴포넌트가 많아질수록 복잡도가 증가합니다. Pinia와 같은 상태 관리 라이브러리는 이러한 문제를 해결하며, 다음과 같은 이점이 있습니다:
- 전역적으로 상태를 관리할 수 있습니다.
- 컴포넌트 간 데이터 전달이 간단해집니다.
- 상태 변경 로직을 한 곳에 모아 유지보수가 쉬워집니다.

**참조:**  
- **4장:** Pinia의 기본 사용법을 설명하며, 상태 관리의 중요성을 다룹니다.

---

### **추가 질문 작성 중...**

토큰 제약으로 인해 나머지 질문과 답변을 이어서 작성하겠습니다. 😊

---

### **Q9: Axios 요청에서 로딩 상태를 표시하려면 어떻게 하나요?**

API 호출 시 로딩 상태를 사용자에게 표시하면 더 나은 사용자 경험을 제공합니다. 이를 구현하려면 로딩 상태를 추적하는 변수를 사용합니다:

```javascript
import { ref } from 'vue';

const isLoading = ref(false);

const fetchData = async () => {
  isLoading.value = true; // 로딩 시작
  try {
    const response = await api.get('/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false; // 로딩 종료
  }
};
```

**UI 표시**:
```vue
<v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
<v-btn @click="fetchData">Fetch Data</v-btn>
```

**참조:**  
- **6장:** Axios와 RESTful API 연동 섹션에서 로딩 상태를 다루는 방법을 포함합니다.

---

### **Q10: Vue 컴포넌트에서 Props와 Emits는 어떻게 사용하나요?**

**Props**는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다.  
**Emits**는 자식 컴포넌트에서 부모 컴포넌트로 이벤트를 전달하는 방법입니다.

**Parent.vue**:
```vue
<Child :message="parentMessage" @update="handleUpdate" />
<script setup>
const parentMessage = 'Hello from parent!';
const handleUpdate = (newMessage) => {
  console.log('Updated message:', newMessage);
};
</script>
```

**Child.vue**:
```vue
<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['message']);
defineEmits(['update']);

const updateMessage = () => {
  emit('update', 'New message from child');
};
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <v-btn @click="updateMessage">Update Message</v-btn>
  </div>
</template>
```

**참조:**  
- **3장:** Composition API에서 Props와 Emits를 사용하는 방법을 설명합니다.

---

### **Q11: 환경 변수를 안전하게 관리하려면 어떻게 해야 하나요?**

환경 변수는 `.env` 파일에 정의하고, Vite에서 `import.meta.env`를 사용하여 접근합니다. 예를 들어:

1. **환경 변수 정의**
   `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

2. **사용**
   ```javascript
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
   });
   ```

3. **프로덕션용 변수**
   `.env.production`:
   ```env
   VITE_API_BASE_URL=https://api.example.com
   ```

**참조:**  
- **9장:** 환경 변수와 설정 관리 방법을 다룹니다.

---

### **Q12: Vue에서 동적 컴포넌트를 어떻게 렌더링하나요?**

Vue의 `<component>` 태그를 사용하면 동적 컴포넌트를 렌더링할 수 있습니다:
```vue
<template>
  <component :is="currentComponent" />
</template>

<script setup>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

const currentComponent = ref('ComponentA');

const switchComponent = () => {
  currentComponent.value = currentComponent.value === 'ComponentA' ? 'ComponentB' : 'ComponentA';
};
</script>
```

**참조:**  
- **7장:** 다양한 컴포넌트를 동적으로 사용하는 예제가 포함되어 있습니다.

---

### **Q13: JSON Server에서 ID를 자동 증가하도록 설정하려면 어떻게 하나요?**

JSON Server는 기본적으로 ID를 자동으로 증가시킵니다.  
`POST` 요청을 통해 새로운 데이터를 추가하면 ID가 자동으로 생성됩니다:
```javascript
const newUser = { name: 'New User', email: 'new@example.com' };
await api.post('/users', newUser);
```

**참조:**  
- **6장:** JSON Server와 CRUD 작업 예제가 포함되어 있습니다.

---

### **Q14: Vue Router에서 네비게이션 메뉴를 어떻게 동적으로 생성하나요?**

네비게이션 메뉴를 배열 데이터로 동적으로 생성할 수 있습니다:
```vue
<v-navigation-drawer app>
  <v-list>
    <v-list-item v-for="item in menuItems" :key="item.text" :to="item.route">
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-navigation-drawer>

<script setup>
const menuItems = [
  { text: 'Home', route: '/' },
  { text: 'Users', route: '/users' },
];
</script>
```

**참조:**  
- **5장:** Vue Router와 네비게이션 구성 예제가 포함되어 있습니다.

---

### **Q15: Vuetify의 Dialog를 여러 곳에서 사용하려면 어떻게 관리하나요?**

Dialog의 상태를 Pinia로 관리하여 중앙에서 제어할 수 있습니다:

1. **Store 설정**
   ```javascript
   export const useDialogStore = defineStore('dialog', {
     state: () => ({ isVisible: false }),
     actions: {
       openDialog() { this.isVisible = true; },
       closeDialog() { this.isVisible = false; },
     },
   });
   ```

2. **Dialog 컴포넌트**
   ```vue
   <v-dialog v-model="dialogStore.isVisible">
     <v-card>
       <v-card-title>Dialog</v-card-title>
       <v-card-actions>
         <v-btn text @click="dialogStore.closeDialog">Close</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>

   <script setup>
   import { useDialogStore } from '../stores/dialogStore';
   const dialogStore = useDialogStore();
   </script>
   ```

**참조:**  
- **7장:** Dialog 구현과 관련된 사례를 확인할 수 있습니다.

---

### **Q16: 빌드된 프로젝트를 서버에서 실행하려면 어떻게 하나요?**

1. 프로젝트를 빌드합니다:
   ```bash
   npm run build
   ```
2. `dist/` 폴더를 서버의 루트 디렉토리로 복사합니다.
3. 정적 파일 서버(Nginx, Apache 등)를 사용하여 배포합니다.

**참조:**  
- **9장:** 프로젝트 빌드 및 배포 과정을 다룹니다.

---

나머지 질문과 답변도 이어서 작성하겠습니다! 😊

---

### **Q17: Vue에서 컴포넌트를 재사용 가능하게 설계하려면 어떻게 해야 하나요?**

컴포넌트를 재사용 가능하게 설계하려면 다음 사항을 고려하세요:

1. **Props 사용**  
   데이터를 부모에서 자식으로 전달하여 동적으로 설정할 수 있도록 합니다.
   ```vue
   <MyButton :label="'Submit'" :color="'primary'" />
   ```

   **`MyButton.vue`**:
   ```vue
   <template>
     <v-btn :color="color">{{ label }}</v-btn>
   </template>

   <script setup>
   defineProps(['label', 'color']);
   </script>
   ```

2. **슬롯 사용**  
   부모 컴포넌트에서 동적인 콘텐츠를 전달합니다.
   ```vue
   <MyCard>
     <template #header>Header Content</template>
     <template #footer>Footer Content</template>
   </MyCard>
   ```

   **`MyCard.vue`**:
   ```vue
   <template>
     <v-card>
       <slot name="header"></slot>
       <v-card-text>
         <slot></slot>
       </v-card-text>
       <slot name="footer"></slot>
     </v-card>
   </template>
   ```

**참조:**  
- **3장:** Props와 Emits의 활용을 다룹니다.  
- **7장:** 슬롯을 활용한 컴포넌트 설계 예제가 포함되어 있습니다.

---

### **Q18: Axios Interceptor로 모든 요청에 기본 헤더를 추가하려면 어떻게 하나요?**

모든 요청에 공통 헤더를 추가하려면 Axios Interceptor를 설정합니다:

```javascript
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

예를 들어, `Authorization` 헤더를 추가하여 인증 토큰을 포함시킬 수 있습니다.

**참조:**  
- **6장:** Axios와 API 통신 설정에 대한 자세한 설명이 있습니다.

---

### **Q19: Vuetify의 Grid System에서 요소 간 여백을 설정하려면 어떻게 하나요?**

Vuetify의 Grid System에서는 `pa-*`(padding) 또는 `ma-*`(margin) 유틸리티 클래스를 사용하여 요소 간 여백을 조정할 수 있습니다:

```vue
<v-row>
  <v-col cols="12" md="6" class="pa-4">Content 1</v-col>
  <v-col cols="12" md="6" class="pa-4">Content 2</v-col>
</v-row>
```

**참조:**  
- **7장:** Grid System 활용 예제가 포함되어 있습니다.

---

### **Q20: Vue 프로젝트를 최적화하려면 어떤 점을 고려해야 하나요?**

Vue 프로젝트의 최적화를 위해 다음을 고려하세요:

1. **코드 스플리팅**  
   동적 `import`를 사용하여 필요할 때만 코드를 로드합니다.
   ```javascript
   const MyComponent = () => import('./MyComponent.vue');
   ```

2. **Tree Shaking**  
   사용되지 않는 코드를 제거하여 번들 크기를 줄입니다.
   ```javascript
   import { createVuetify } from 'vuetify';
   import { VBtn, VCard } from 'vuetify/components';

   const vuetify = createVuetify({ components: { VBtn, VCard } });
   ```

3. **이미지 최적화**  
   이미지 크기를 줄이고 WebP 형식으로 변환합니다.

4. **성능 분석 도구 사용**  
   - Lighthouse: 성능, 접근성, SEO 점검.
   - Webpack Bundle Analyzer: 번들 크기 시각화.

**참조:**  
- **9장:** 빌드 최적화와 성능 점검 방법을 다룹니다.

---


### **Q21: Vue Router에서 특정 라우트로 리디렉션하려면 어떻게 하나요?**

Vue Router에서 리디렉션은 `redirect` 속성을 사용하여 설정할 수 있습니다. 예를 들어, `/home`으로 이동하려면 아래와 같이 설정합니다:

```javascript
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
];
```

이 설정은 `/` 경로로 접근할 때 `/home`으로 리디렉션합니다.

**참조:**  
- **5장:** Vue Router 설정과 페이지 전환에 대한 예제를 참고하세요.

---

### **Q22: Vue에서 비동기 데이터 호출 시 렌더링을 지연시키려면 어떻게 하나요?**

비동기 데이터 호출이 완료될 때까지 로딩 스피너를 표시합니다:

```vue
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>Data: {{ data }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const data = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get('/data');
    data.value = response.data;
  } finally {
    isLoading.value = false;
  }
});
</script>
```

**참조:**  
- **6장:** Axios를 사용한 비동기 데이터 호출 및 상태 관리 예제를 확인하세요.

---

### **Q23: Vuetify에서 글로벌 스타일을 적용하려면 어떻게 하나요?**

Vuetify는 SCSS 변수를 사용하여 스타일을 커스터마이징할 수 있습니다.  
`src/styles/variables.scss` 파일을 생성하고 다음 내용을 추가합니다:

```scss
$body-font-family: 'Roboto', sans-serif;
$primary: #1976D2;
$secondary: #424242;
```

**Vuetify 초기화 시 SCSS 파일 포함**:
```javascript
import 'vuetify/styles';
import './styles/variables.scss';
```

**참조:**  
- **7장:** Vuetify 테마 설정과 스타일 커스터마이징 관련 내용을 참고하세요.

---

### **Q24: Pinia 상태를 로컬 스토리지에 영구적으로 저장하려면 어떻게 하나요?**

Pinia의 `persist` 플러그인을 사용하여 상태를 로컬 스토리지에 저장합니다:

1. **`pinia-plugin-persistedstate` 설치**:
   ```bash
   npm install pinia-plugin-persistedstate
   ```

2. **Pinia 초기화**:
   ```javascript
   import { createPinia } from 'pinia';
   import piniaPersist from 'pinia-plugin-persistedstate';

   const pinia = createPinia();
   pinia.use(piniaPersist);

   app.use(pinia);
   ```

3. **Store 설정**:
   ```javascript
   export const useUserStore = defineStore('user', {
     state: () => ({ isAuthenticated: false }),
     persist: true,
   });
   ```

**참조:**  
- **4장:** Pinia 상태 관리의 기본 예제를 참고하세요.

---

### **Q25: Axios로 파일 업로드를 처리하려면 어떻게 하나요?**

Axios를 사용하여 파일 업로드를 처리하려면 `FormData` 객체를 사용합니다:

```javascript
const formData = new FormData();
formData.append('file', selectedFile);

await api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
```

**참조:**  
- **6장:** Axios와 RESTful API 연동의 확장 예제를 참고하세요.

---

### **Q26: Vue에서 컴포넌트를 동적으로 추가하거나 제거하려면 어떻게 하나요?**

`v-if`를 사용하여 컴포넌트를 동적으로 렌더링할 수 있습니다:

```vue
<template>
  <div>
    <v-btn @click="showComponent = !showComponent">Toggle Component</v-btn>
    <MyComponent v-if="showComponent" />
  </div>
</template>

<script setup>
import MyComponent from './MyComponent.vue';
import { ref } from 'vue';

const showComponent = ref(false);
</script>
```

**참조:**  
- **3장:** Composition API에서 상태를 관리하는 방법을 참고하세요.

---

### **Q27: Vue 프로젝트에서 글로벌 믹스인은 어떻게 설정하나요?**

Vue 3에서는 글로벌 믹스인 대신 **Provide/Inject**를 사용하는 것이 권장됩니다.  
예를 들어, 테마 설정을 전역적으로 제공하려면:

**`src/main.js`**:
```javascript
const app = createApp(App);
app.provide('theme', { color: 'blue' });
```

**사용하기**:
```javascript
const theme = inject('theme');
```

**참조:**  
- **4장:** 상태 관리를 통해 글로벌 데이터를 공유하는 예제를 확인하세요.

---

### **Q28: Vue에서 커스텀 디렉티브를 정의하려면 어떻게 하나요?**

Vue 3에서는 `app.directive`를 사용하여 커스텀 디렉티브를 정의합니다:

**`src/directives/focus.js`**:
```javascript
export default {
  mounted(el) {
    el.focus();
  },
};
```

**사용하기**:
```javascript
app.directive('focus', focusDirective);
```

**참조:**  
- **3장:** Composition API와 관련된 고급 개념에서 확장 가능합니다.

---

### **Q29: 프로젝트 빌드 후 이미지와 같은 정적 파일은 어떻게 관리하나요?**

`public/` 디렉토리에 정적 파일을 저장합니다.  
빌드 후 이 파일들은 경로를 유지합니다:
```html
<img src="/logo.png" alt="Logo" />
```

**참조:**  
- **9장:** Vite 빌드 및 정적 파일 관리 예제를 확인하세요.

---

### **Q30: Vuetify의 Snackbar를 사용하여 메시지를 표시하려면 어떻게 하나요?**

Snackbar는 간단한 알림을 표시할 때 유용합니다:

```vue
<template>
  <v-snackbar v-model="showSnackbar" color="success">
    Operation successful!
  </v-snackbar>
  <v-btn @click="showSnackbar = true">Show Snackbar</v-btn>
</template>

<script setup>
import { ref } from 'vue';

const showSnackbar = ref(false);
</script>
```

**참조:**  
- **7장:** 다양한 Vuetify 컴포넌트를 사용하는 예제를 참고하세요.

---

### **Q31: Vue 프로젝트에서 ESLint와 Prettier를 설정하려면 어떻게 하나요?**

코드 일관성을 유지하고, 에러를 줄이기 위해 ESLint와 Prettier를 설정할 수 있습니다.

1. **설치**:
   ```bash
   npm install eslint prettier eslint-plugin-vue eslint-config-prettier eslint-plugin-prettier --save-dev
   ```

2. **`eslint-config-prettier` 설정**:
   - `.eslintrc.js` 파일에서 Prettier를 ESLint와 통합:
     ```javascript
     module.exports = {
       extends: [
         'eslint:recommended',
         'plugin:vue/vue3-recommended',
         'prettier',
       ],
       rules: {
         'prettier/prettier': 'error',
       },
     };
     ```

3. **VS Code와 통합**:
   - `.vscode/settings.json`에 다음 추가:
     ```json
     {
       "editor.formatOnSave": true,
       "eslint.validate": ["javascript", "vue"]
     }
     ```

**참조:**  
- **1장:** 프로젝트 초기 설정에서 Prettier와 ESLint를 추가로 설정하면 도움이 됩니다.

---

### **Q32: Vue에서 다국어(i18n) 지원을 추가하려면 어떻게 하나요?**

Vue I18n 라이브러리를 사용하여 다국어 지원을 구현할 수 있습니다.

1. **설치**:
   ```bash
   npm install vue-i18n
   ```

2. **설정**:
   - `src/i18n.js`:
     ```javascript
     import { createI18n } from 'vue-i18n';

     const messages = {
       en: { welcome: 'Welcome' },
       fr: { welcome: 'Bienvenue' },
     };

     export default createI18n({
       locale: 'en',
       messages,
     });
     ```

   - `src/main.js`:
     ```javascript
     import i18n from './i18n';
     createApp(App).use(i18n).mount('#app');
     ```

3. **사용**:
   ```vue
   <template>
     <p>{{ $t('welcome') }}</p>
   </template>
   ```

**참조:**  
- 추가 학습 자료에 [Vue I18n 공식 문서](https://vue-i18n.intlify.dev/) 링크를 참조하세요.

---

### **Q33: Vuetify에서 동적 테마 변경을 어떻게 구현하나요?**

사용자가 버튼을 클릭하여 테마를 전환할 수 있도록 구현할 수 있습니다.

1. **Pinia Store에서 상태 관리**:
   ```javascript
   export const useThemeStore = defineStore('theme', {
     state: () => ({ isDark: false }),
     actions: {
       toggleTheme() {
         this.isDark = !this.isDark;
       },
     },
   });
   ```

2. **Vuetify 테마 변경**:
   ```javascript
   import { watch } from 'vue';
   const themeStore = useThemeStore();

   watch(() => themeStore.isDark, (isDark) => {
     vuetify.framework.theme.dark = isDark;
   });
   ```

3. **버튼 추가**:
   ```vue
   <v-btn @click="themeStore.toggleTheme">
     Toggle Theme
   </v-btn>
   ```

**참조:**  
- **7장:** Vuetify 테마 설정과 관련된 내용 참고.

---

### **Q34: Vue Router에서 Lazy Loading을 사용하려면 어떻게 하나요?**

Lazy Loading은 초기 번들 크기를 줄이고 성능을 개선합니다.

**라우터 설정**:
```javascript
const routes = [
  {
    path: '/about',
    component: () => import('./components/About.vue'),
  },
];
```

**참조:**  
- **5장:** Vue Router 설정의 고급 예제에서 Lazy Loading을 참고하세요.

---

### **Q35: Axios 요청을 취소하려면 어떻게 하나요?**

Axios에서 요청을 취소하려면 `CancelToken`을 사용합니다:

```javascript
import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

try {
  const response = await api.get('/data', { cancelToken: source.token });
} catch (error) {
  if (axios.isCancel(error)) {
    console.log('Request canceled:', error.message);
  }
}

// 요청 취소
source.cancel('Operation canceled by the user.');
```

**참조:**  
- **6장:** Axios 요청 관련 추가적인 확장 내용을 확인하세요.

---

### **Q36: Vue에서 컴포넌트 간 이벤트 버스를 사용하려면 어떻게 하나요?**

Vue 3에서는 **mitt**를 사용하여 이벤트 버스를 구현할 수 있습니다.

1. **설치**:
   ```bash
   npm install mitt
   ```

2. **이벤트 버스 설정**:
   ```javascript
   import mitt from 'mitt';
   export const EventBus = mitt();
   ```

3. **사용**:
   - **발행(Publish)**:
     ```javascript
     EventBus.emit('event-name', payload);
     ```

   - **구독(Subscribe)**:
     ```javascript
     EventBus.on('event-name', (payload) => {
       console.log(payload);
     });
     ```

**참조:**  
- **4장:** Pinia와 mitt를 함께 사용하는 방법을 응용할 수 있습니다.

---

### **Q37: 프로젝트에서 권한 관리를 어떻게 구현하나요?**

1. **Pinia Store에서 사용자 역할 저장**:
   ```javascript
   export const useAuthStore = defineStore('auth', {
     state: () => ({ role: 'guest' }),
   });
   ```

2. **Vue Router Guard에서 역할 확인**:
   ```javascript
   router.beforeEach((to, from, next) => {
     const authStore = useAuthStore();
     if (to.meta.role && to.meta.role !== authStore.role) {
       next('/unauthorized');
     } else {
       next();
     }
   });
   ```

3. **라우터 메타 데이터 추가**:
   ```javascript
   const routes = [
     { path: '/admin', component: AdminPage, meta: { role: 'admin' } },
   ];
   ```

**참조:**  
- **5장:** Vue Router와 Pinia의 통합 예제를 참고하세요.

---

### **Q38: Vue 프로젝트에서 PWA를 구현하려면 어떻게 하나요?**

1. **설치**:
   ```bash
   npm install @vite-pwa/plugin
   ```

2. **`vite.config.js` 설정**:
   ```javascript
   import { VitePWA } from 'vite-plugin-pwa';

   export default defineConfig({
     plugins: [
       VitePWA({
         registerType: 'autoUpdate',
         manifest: {
           name: 'My App',
           short_name: 'App',
           start_url: '/',
           display: 'standalone',
           background_color: '#ffffff',
         },
       }),
     ],
   });
   ```

3. **서비스 워커 등록**:
   ```javascript
   navigator.serviceWorker.register('/sw.js');
   ```

**참조:**  
- [Vite PWA 플러그인 공식 문서](https://vite-pwa-org.netlify.app/)를 확인하세요.

---

### **Q39: Vuetify의 Expansion Panels를 사용하려면 어떻게 하나요?**

```vue
<v-expansion-panels>
  <v-expansion-panel>
    <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
    <v-expansion-panel-text>Content for Panel 1</v-expansion-panel-text>
  </v-expansion-panel>
  <v-expansion-panel>
    <v-expansion-panel-title>Panel 2</v-expansion-panel-title>
    <v-expansion-panel-text>Content for Panel 2</v-expansion-panel-text>
  </v-expansion-panel>
</v-expansion-panels>
```

**참조:**  
- **7장:** 다양한 Vuetify 컴포넌트 활용 예제를 확인하세요.

---

### **Q40: Vite 프로젝트에서 환경별 API URL을 동적으로 설정하려면 어떻게 하나요?**

1. **환경 변수 설정**:
   - `.env.development`:
     ```env
     VITE_API_BASE_URL=http://localhost:3000
     ```
   - `.env.production`:
     ```env
     VITE_API_BASE_URL=https://api.example.com
     ```

2. **Axios 인스턴스 설정**:
   ```javascript
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
   });
   ```

**참조:**  
- **9장:** 환경 변수와 설정 관리의 세부 내용을 확인하세요.

---

## **10.2 추가 학습 자료 및 공식 문서 링크**

1. **Vue.js**
   - [Vue.js 공식 문서](https://vuejs.org/)
   - [Composition API 가이드](https://vuejs.org/guide/extras/composition-api-faq.html)

2. **Vuetify**
   - [Vuetify 공식 문서](https://vuetifyjs.com/)
   - [Vuetify Grid System](https://vuetifyjs.com/en/components/grids/)

3. **Pinia**
   - [Pinia 공식 문서](https://pinia.vuejs.org/)

4. **Axios**
   - [Axios 공식 문서](https://axios-http.com/)

5. **Vite**
   - [Vite 공식 문서](https://vitejs.dev/)

6. **배포**
   - [GitHub Pages 배포 가이드](https://pages.github.com/)

---

## **부록: 1장 실습 파일 구조 및 내용**

---

### **1. 실습 과제 요약**

**1장의 실습 과제:**  
- Vite로 Vue.js 프로젝트 생성 및 Vuetify 초기 설정.
- Vuetify를 사용해 기본 레이아웃(App Bar, Navigation Drawer, Footer) 구현.

---

### **2. 최종 폴더 구조**

1장의 실습을 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:

```
project-template/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AppBar.vue
│   │   ├── NavigationDrawer.vue
│   │   ├── Footer.vue
│   ├── App.vue
│   ├── main.js
├── index.html
├── package.json
├── vite.config.js
```

---

### **3. 각 파일의 내용**

#### **`src/main.js`**
Vue 애플리케이션의 진입점으로, Vuetify 설정과 애플리케이션 초기화를 처리합니다.
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

createApp(App)
  .use(vuetify)
  .mount('#app');
```

---

#### **`src/App.vue`**
Vuetify의 App Bar, Navigation Drawer, Footer를 포함한 기본 레이아웃입니다.
```vue
<template>
  <v-app>
    <!-- App Bar -->
    <AppBar />
    
    <!-- Navigation Drawer -->
    <NavigationDrawer />

    <!-- Main Content -->
    <v-main>
      <v-container>
        <h1>Welcome to Vue.js with Vuetify</h1>
      </v-container>
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script setup>
import AppBar from './components/AppBar.vue';
import NavigationDrawer from './components/NavigationDrawer.vue';
import Footer from './components/Footer.vue';
</script>
```

---

#### **`src/components/AppBar.vue`**
Vuetify의 App Bar 컴포넌트를 사용해 상단바를 구성합니다.
```vue
<template>
  <v-app-bar app>
    <v-toolbar-title>My Vuetify App</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
</script>
```

---

#### **`src/components/NavigationDrawer.vue`**
Vuetify의 Navigation Drawer 컴포넌트를 사용해 사이드바를 구성합니다.
```vue
<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
</script>
```

---

#### **`src/components/Footer.vue`**
Vuetify의 Footer 컴포넌트를 사용해 하단바를 구성합니다.
```vue
<template>
  <v-footer app>
    <v-container>
      <p>&copy; 2023 My Vuetify App</p>
    </v-container>
  </v-footer>
</template>

<script setup>
</script>
```

---

#### **`index.html`**
Vue 애플리케이션이 마운트될 HTML 파일입니다.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Vuetify App</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

---

### **4. 설치된 모듈**

1장의 실습에 필요한 모듈:
- **Vuetify:** UI 컴포넌트 라이브러리.
  ```bash
  npm install vuetify
  ```

---

### **5. 결과 화면**
1장의 실습이 완료되면 다음과 같은 기본 레이아웃이 표시됩니다:
- 상단에 App Bar.
- 왼쪽에 Navigation Drawer.
- 하단에 Footer.


---
## **부록: 2장 실습 파일 구조 및 내용**

---

### **1. 실습 과제 요약**

**2장의 실습 과제:**
1. Vuetify의 Grid System을 사용하여 대시보드 레이아웃 구성.
2. 컴포넌트를 분리하여 구조화 (Header, Sidebar, Content 영역).

---

### **2. 최종 폴더 구조**

2장의 실습을 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:

```
project-template/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   ├── Content.vue
│   │   ├── DashboardGrid.vue
│   ├── App.vue
│   ├── main.js
├── index.html
├── package.json
├── vite.config.js
```

---

### **3. 각 파일의 내용**

---

#### **`src/main.js`**
프로젝트 초기화 코드로, Vuetify 설정과 Vue 애플리케이션을 초기화합니다.
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

createApp(App)
  .use(vuetify)
  .mount('#app');
```

---

#### **`src/App.vue`**
Header, Sidebar, Content, DashboardGrid 컴포넌트를 통합하여 레이아웃을 구성합니다.
```vue
<template>
  <v-app>
    <!-- Header -->
    <Header />

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <v-main>
      <Content />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Content from './components/Content.vue';
</script>
```

---

#### **`src/components/Header.vue`**
애플리케이션 상단에 표시되는 Header 컴포넌트입니다.
```vue
<template>
  <v-app-bar app>
    <v-toolbar-title>My Dashboard</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
</script>
```

---

#### **`src/components/Sidebar.vue`**
애플리케이션 왼쪽에 표시되는 Sidebar 컴포넌트입니다.
```vue
<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
</script>
```

---

#### **`src/components/Content.vue`**
메인 콘텐츠 영역을 구성하는 Content 컴포넌트입니다. 이 컴포넌트는 DashboardGrid를 포함합니다.
```vue
<template>
  <v-container>
    <DashboardGrid />
  </v-container>
</template>

<script setup>
import DashboardGrid from './DashboardGrid.vue';
</script>
```

---

#### **`src/components/DashboardGrid.vue`**
Vuetify Grid System을 사용해 대시보드에 여러 섹션을 표시합니다.
```vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Section 1</v-card-title>
          <v-card-text>This is the first section.</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Section 2</v-card-title>
          <v-card-text>This is the second section.</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Full-width Section</v-card-title>
          <v-card-text>This section spans the entire row.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
```

---

#### **`index.html`**
Vue 애플리케이션이 마운트될 HTML 파일입니다.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vuetify Dashboard</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

---

### **4. 설치된 모듈**

2장의 실습에는 1장에서 설치한 **Vuetify** 모듈만 사용되므로, 추가 설치는 필요하지 않습니다.

---

### **5. 결과 화면**
2장의 실습을 완료하면 다음과 같은 레이아웃이 표시됩니다:
- 상단에 **Header**.
- 왼쪽에 **Sidebar**.
- 중앙에 **Content**, 포함된 Grid로 섹션 구성.

---

## **부록: 3장 실습 파일 구조 및 내용**

---

### **1. 실습 과제 요약**

**3장의 실습 과제:**  
1. Composition API를 사용해 Counter 컴포넌트 제작.  
2. 실시간 필터링 기능 구현.  

---

### **2. 최종 폴더 구조**

3장의 실습을 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:

```
project-template/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   ├── Content.vue
│   │   ├── DashboardGrid.vue
│   │   ├── Counter.vue
│   │   ├── FilterableList.vue
│   ├── App.vue
│   ├── main.js
├── index.html
├── package.json
├── vite.config.js
```

---

### **3. 각 파일의 내용**

---

#### **`src/main.js`**
기존 설정과 동일하며, Vuetify와 Vue 애플리케이션 초기화를 처리합니다.
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

createApp(App)
  .use(vuetify)
  .mount('#app');
```

---

#### **`src/App.vue`**
Counter 컴포넌트와 FilterableList 컴포넌트를 통합합니다.
```vue
<template>
  <v-app>
    <Header />
    <Sidebar />
    <v-main>
      <v-container>
        <Counter />
        <FilterableList />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Counter from './components/Counter.vue';
import FilterableList from './components/FilterableList.vue';
</script>
```

---

#### **`src/components/Counter.vue`**
Composition API를 사용해 Counter 기능을 구현합니다.
```vue
<template>
  <v-container>
    <h1>Counter</h1>
    <v-btn @click="decrement" color="red">-</v-btn>
    <span>{{ count }}</span>
    <v-btn @click="increment" color="green">+</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  if (count.value > 0) count.value--;
};
</script>
```

---

#### **`src/components/FilterableList.vue`**
실시간 필터링 기능을 구현합니다.
```vue
<template>
  <v-container>
    <h1>Filterable List</h1>
    <v-text-field v-model="search" label="Search" clearable></v-text-field>
    <v-list>
      <v-list-item v-for="item in filteredItems" :key="item">
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const items = ref(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
const search = ref('');

const filteredItems = computed(() => {
  return items.value.filter((item) =>
    item.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>
```

---

#### **`src/components/Header.vue`**
기존 Header 컴포넌트로 변경 사항은 없습니다.
```vue
<template>
  <v-app-bar app>
    <v-toolbar-title>My Dashboard</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
</script>
```

---

#### **`src/components/Sidebar.vue`**
기존 Sidebar 컴포넌트로 변경 사항은 없습니다.
```vue
<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
</script>
```

---

### **4. 설치된 모듈**

3장의 실습에는 1, 2장에서 설치한 **Vuetify** 모듈만 사용되므로, 추가 설치는 필요하지 않습니다.

---

### **5. 결과 화면**
3장의 실습을 완료하면 다음과 같은 기능이 추가됩니다:
1. **Counter**: 버튼을 클릭하여 숫자를 증가/감소.
2. **Filterable List**: 실시간 검색으로 목록 필터링.

---

## **부록: 4장 실습 파일 구조 및 내용**

---

### **1. 실습 과제 요약**

**4장의 실습 과제:**  
1. **Pinia**를 사용해 To-Do 리스트 상태 관리 구현.  
2. Pinia를 활용한 전역 상태로 데이터 관리.  

---

### **2. 최종 폴더 구조**

4장의 실습을 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:

```
project-template/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   ├── Content.vue
│   │   ├── TodoList.vue
│   ├── stores/
│   │   ├── todoStore.js
│   ├── App.vue
│   ├── main.js
├── index.html
├── package.json
├── vite.config.js
```

---

### **3. 각 파일의 내용**

---

#### **`src/main.js`**
Pinia와 Vuetify를 Vue 애플리케이션에 통합합니다.
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import 'vuetify/styles';

const vuetify = createVuetify();
const pinia = createPinia();

createApp(App)
  .use(vuetify)
  .use(pinia)
  .mount('#app');
```

---

#### **`src/App.vue`**
Header와 Sidebar를 유지하고, **TodoList** 컴포넌트를 추가합니다.
```vue
<template>
  <v-app>
    <Header />
    <Sidebar />
    <v-main>
      <TodoList />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import TodoList from './components/TodoList.vue';
</script>
```

---

#### **`src/components/TodoList.vue`**
Pinia를 사용하여 To-Do 리스트를 관리하고, UI와 상태를 연동합니다.
```vue
<template>
  <v-container>
    <h1>To-Do List</h1>
    <v-text-field v-model="newTask" label="New Task" clearable></v-text-field>
    <v-btn @click="addTask" color="primary" :disabled="!newTask">Add Task</v-btn>
    <v-list>
      <v-list-item
        v-for="(task, index) in todos"
        :key="index"
      >
        <v-list-item-title>{{ task }}</v-list-item-title>
        <v-btn icon @click="removeTask(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();
const newTask = ref('');

const addTask = () => {
  todoStore.addTask(newTask.value);
  newTask.value = '';
};

const removeTask = (index) => {
  todoStore.removeTask(index);
};

const todos = todoStore.todos;
</script>
```

---

#### **`src/stores/todoStore.js

#### **`src/stores/todoStore.js`**
Pinia를 사용하여 To-Do 리스트의 상태를 관리합니다.
```javascript
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [], // To-Do 리스트 배열
  }),
  actions: {
    addTask(task) {
      this.todos.push(task);
    },
    removeTask(index) {
      this.todos.splice(index, 1);
    },
  },
});
```

---

#### **`src/components/Header.vue`**
기존 Header 컴포넌트로 변경 사항은 없습니다.
```vue
<template>
  <v-app-bar app>
    <v-toolbar-title>To-Do App</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
</script>
```

---

#### **`src/components/Sidebar.vue`**
기존 Sidebar 컴포넌트로 변경 사항은 없습니다.
```vue
<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>To-Do List</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
</script>
```

---

### **4. 설치된 모듈**

4장의 실습에는 Pinia를 추가로 설치해야 합니다:

```bash
npm install pinia
```

---

### **5. 결과 화면**

4장의 실습을 완료하면 다음과 같은 기능이 추가됩니다:
1. **To-Do 리스트 관리:**
   - 새로운 할 일 추가.
   - 기존 할 일 삭제.
   - 상태가 전역적으로 관리됨(Pinia).


---
## **부록: 5장 실습 파일 구조 및 내용**

---

### **1. 실습 과제 요약**

**5장의 실습 과제:**  
1. Vue Router를 사용해 페이지 전환 및 네비게이션 구성.  
2. 동적 라우팅 및 라우터 가드 구현.  
3. Pinia와 Vue Router를 연동하여 인증 상태를 기반으로 접근 제어.

---

### **2. 최종 폴더 구조**

5장의 실습을 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:

```
project-template/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   ├── Home.vue
│   │   ├── UserList.vue
│   │   ├── UserDetail.vue
│   ├── stores/
│   │   ├── authStore.js
│   ├── router/
│   │   ├── index.js
│   ├── App.vue
│   ├── main.js
├── index.html
├── package.json
├── vite.config.js
```

---

### **3. 각 파일의 내용**

---

#### **`src/main.js`**
Vue Router와 Pinia를 Vue 애플리케이션에 통합합니다.
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

#### **`src/App.vue`**
Header와 Sidebar를 유지하고, `router-view`를 추가하여 동적으로 페이지를 전환합니다.
```vue
<template>
  <v-app>
    <Header />
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>
```

---

#### **`src/router/index.js`**
Vue Router를 설정하여 페이지 경로와 라우터 가드를 정의합니다.
```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import UserList from '../components/UserList.vue';
import UserDetail from '../components/UserDetail.vue';
import { useAuthStore } from '../stores/authStore';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/users', name: 'UserList', component: UserList },
  { path: '/users/:id', name: 'UserDetail', component: UserDetail, props: true },
  { path: '/protected', name: 'Protected', component: UserList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name === 'Protected' && !authStore.isAuthenticated) {
    alert('You must be logged in to access this page.');
    next('/');
  } else {
    next();
  }
});

export default router;
```

---

#### **`src/stores/authStore.js`**
Pinia를 사용해 인증 상태를 관리합니다.
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

---

#### **`src/components/Home.vue`**
홈 페이지 컴포넌트입니다.
```vue
<template>
  <v-container>
    <h1>Welcome to the Home Page</h1>
    <v-btn color="primary" @click="toggleAuth">
      {{ isAuthenticated ? 'Logout' : 'Login' }}
    </v-btn>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;

const toggleAuth = () => {
  isAuthenticated ? authStore.logout() : authStore.login();
};
</script>
```

---

#### **`src/components/UserList.vue`**
사용자 목록 페이지입니다.
```vue
<template>
  <v-container>
    <h1>User List</h1>
    <v-list>
      <v-list-item v-for="user in users" :key="user.id" @click="goToDetail(user.id)">
        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const users = ref([
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
]);

const router = useRouter();
const goToDetail = (id) => {
  router.push(`/users/${id}`);
};
</script>
```

---

#### **`src/components/UserDetail.vue`**
사용자 상세 정보 페이지입니다.
```vue
<template>
  <v-container>
    <h1>User Detail</h1>
    <p><strong>ID:</strong> {{ userId }}</p>
    <p><strong>Name:</strong> {{ userName }}</p>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.id;
const userName = route.params.id === '1' ? 'John Doe' : 'Jane Smith';
</script>
```

---

#### **`src/components/Header.vue`**
기존 Header 컴포넌트로 변경 사항은 없습니다.
```vue
<template>
  <v-app-bar app>
    <v-toolbar-title>My Vue Router App</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
</script>
```

---

#### **`src/components/Sidebar.vue`**
기존 Sidebar 컴포넌트에 라우터 링크를 추가합니다.
```vue
<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item to="/">Home</v-list-item>
      <v-list-item to="/users">Users</v-list-item>
      <v-list-item to="/protected">Protected</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
</script>
```

---

### **4. 설치된 모듈**

5장의 실습에 필요한 모듈:
```bash
npm install vue-router
```

---

### **5. 결과 화면**

5장의 실습을 완료하면 다음과 같은 기능이 추가됩니다:
1. **라우팅 구현:** 홈 페이지와 사용자 목록/상세 페이지 전환.
2. **라우터 가드:** 인증 상태에 따른 접근 제어.

---
## **부록: 6장 실습 파일 구조 및 내용**
---
### **1. 실습 과제 요약**

**6장의 실습 과제:**  
1. Axios와 RESTful API를 연동하여 사용자 데이터를 관리.  
2. 사용자 목록을 가져오고, 추가/수정/삭제 기능 구현.  
3. JSON Server를 백엔드로 사용하여 API를 시뮬레이션.

---

### **2. 최종 폴더 구조**

6장의 실습을 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:

```
project-template/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   ├── UserList.vue
│   │   ├── AddUser.vue
│   │   ├── EditUser.vue
│   │   ├── DeleteUser.vue
│   ├── stores/
│   │   ├── userStore.js
│   ├── utils/
│   │   ├── api.js
│   ├── App.vue
│   ├── main.js
├── db.json
├── index.html
├── package.json
├── vite.config.js
```

---

### **3. 각 파일의 내용**

---

#### **`src/main.js`**
기존 설정과 동일하며, Vuetify와 Pinia를 초기화합니다.
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

#### **`src/utils/api.js`**
Axios 인스턴스를 생성하고, API 호출을 위한 기본 설정을 포함합니다.
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

export default api;
```

---

#### **`src/stores/userStore.js`**
Pinia를 사용하여 사용자 데이터를 관리합니다.
```javascript
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
```

---

#### **`src/components/UserList.vue`**
사용자 목록을 렌더링하고, 편집 및 삭제 기능을 제공합니다.
```vue
<template>
  <v-container>
    <h1>User List</h1>
    <v-btn color="primary" @click="navigateToAdd">Add User</v-btn>
    <v-data-table
      :items="users"
      :headers="headers"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-btn icon @click="navigateToEdit(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteUser(item.id)">
          <v

-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Actions', value: 'actions', sortable: false },
];

onMounted(() => {
  userStore.fetchUsers();
});

const users = userStore.users;

const navigateToAdd = () => {
  router.push('/users/add');
};

const navigateToEdit = (id) => {
  router.push(`/users/edit/${id}`);
};

const deleteUser = (id) => {
  userStore.deleteUser(id);
};
</script>
```

---

#### **`src/components/AddUser.vue`**
새 사용자를 추가하는 폼입니다.
```vue
<template>
  <v-container>
    <h1>Add User</h1>
    <v-form>
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-btn color="primary" @click="addUser">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const user = ref({ name: '', email: '' });

const addUser = async () => {
  await userStore.addUser(user.value);
  router.push('/');
};
</script>
```

---

#### **`src/components/EditUser.vue`**
기존 사용자를 수정하는 폼입니다.
```vue
<template>
  <v-container>
    <h1>Edit User</h1>
    <v-form>
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-btn color="primary" @click="updateUser">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const user = ref({ id: route.params.id, name: '', email: '' });

onMounted(() => {
  const foundUser = userStore.users.find((u) => u.id === +route.params.id);
  if (foundUser) {
    user.value = { ...foundUser };
  }
});

const updateUser = async () => {
  await userStore.updateUser(user.value);
  router.push('/');
};
</script>
```

---

#### **`src/components/DeleteUser.vue`**
사용자 삭제 확인 팝업을 제공합니다.
```vue
<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title>Confirm Deletion</v-card-title>
      <v-card-text>
        Are you sure you want to delete this user?
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn text color="red" @click="confirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const showDialog = ref(false);

const cancel = () => {
  showDialog.value = false;
};

const confirm = async () => {
  showDialog.value = false;
  await deleteUser();
};
</script>
```

---

### **4. JSON Server 설정**

#### **`db.json`**
```json
{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
  ]
}
```

#### **JSON Server 실행**
```bash
json-server --watch db.json --port 3000
```

---

### **5. 설치된 모듈**

6장의 실습에 필요한 모듈:
```bash
npm install axios json-server
```

---

### **6. 결과 화면**

6장의 실습을 완료하면 다음과 같은 기능이 추가됩니다:
1. **사용자 목록 보기**.
2. **사용자 추가/수정/삭제**.
3. **JSON Server와 Axios를 통한 API 연동**.

## **부록: 7장 실습 파일 구조 및 내용**

---

### **1. 실습 과제 요약**

**7장의 실습 과제:**  
1. Vuetify의 Form 컴포넌트와 Validation을 사용한 사용자 등록/수정 폼.  
2. Dialog를 활용한 삭제 확인 팝업 구현.  
3. Cards를 사용해 대시보드 요약 정보 표시.  
4. 추가 Vuetify 컴포넌트 활용 예제.

---

### **2. 최종 폴더 구조**

7장의 실습을 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:

```
project-template/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   ├── Dashboard.vue
│   │   ├── UserForm.vue
│   │   ├── DeleteDialog.vue
│   ├── stores/
│   │   ├── userStore.js
│   ├── utils/
│   │   ├── api.js
│   ├── App.vue
│   ├── main.js
├── index.html
├── package.json
├── vite.config.js
```

---

### **3. 각 파일의 내용**

---

#### **`src/main.js`**
기존 설정과 동일하며, Vuetify와 Pinia를 초기화합니다.
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import 'vuetify/styles';

const vuetify = createVuetify();
const pinia = createPinia();

createApp(App)
  .use(vuetify)
  .use(pinia)
  .mount('#app');
```

---

#### **`src/components/Header.vue`**
기존 Header 컴포넌트로 변경 사항은 없습니다.
```vue
<template>
  <v-app-bar app>
    <v-toolbar-title>Vuetify Example</v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
</script>
```

---

#### **`src/components/Sidebar.vue`**
기존 Sidebar 컴포넌트로 변경 사항은 없습니다.
```vue
<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Users</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
</script>
```

---

#### **`src/components/Dashboard.vue`**
Vuetify의 Cards 컴포넌트를 사용하여 대시보드 요약 정보를 표시합니다.
```vue
<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Total Users</v-card-title>
          <v-card-text>{{ stats.total }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Active Users</v-card-title>
          <v-card-text>{{ stats.active }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Inactive Users</v-card-title>
          <v-card-text>{{ stats.inactive }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const stats = ref({ total: 0, active: 0, inactive: 0 });

onMounted(async () => {
  const response = await api.get('/users');
  const users = response.data;
  stats.value.total = users.length;
  stats.value.active = users.filter(user => user.active).length;
  stats.value.inactive = stats.value.total - stats.value.active;
});
</script>
```

---

#### **`src/components/UserForm.vue`**
사용자 등록/수정을 위한 Form 컴포넌트입니다.
```vue
<template>
  <v-container>
    <h1>User Form</h1>
    <v-form ref="form" v-model="isFormValid">
      <v-text-field v-model="user.name" label="Name" required :rules="[rules.required]" />
      <v-text-field v-model="user.email" label="Email" required :rules="[rules.required, rules.email]" />
      <v-btn color="primary" :disabled="!isFormValid" @click="submitForm">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({ name: '', email: '' });
const isFormValid = ref(false);

const rules = {
  required: value => !!value || 'Required.',
  email: value => /.+@.+\..+/.test(value) || 'Invalid email.',
};

const submitForm = () => {
  console.log('Form submitted:', user.value);
};
</script>
```

---

#### **`src/components/DeleteDialog.vue`**
삭제 확인 팝업 컴포넌트입니다.
```vue
<template>
  <v-dialog v-model="isDialogVisible" max-width="500px">
    <v-card>
      <v-card-title>Confirm Deletion</v-card-title>
      <v-card-text>Are you sure you want to delete this user?</v-card-text>
      <v-card-actions>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn text color="red" @click="confirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const isDialogVisible = ref(false);

const cancel = () => {
  isDialogVisible.value = false;
};

const confirm = () => {
  console.log('User deleted.');
  isDialogVisible.value = false;
};
</script>
```

---

### **4. 설치된 모듈**

7장의 실습에는 이전 장에서 설치한 **Vuetify**와 **Axios**만 사용되므로 추가 설치는 필요하지 않습니다.

---

### **5. 결과 화면**

7장의 실습을 완료하면 다음과 같은 기능이 추가됩니다:
1. **대시보드 요약 정보**: Cards를 사용해 사용자 통계를 표시.
2. **Form Validation**: 사용자 등록/수정을 위한 유효성 검사 적용.
3. **Dialog**: 삭제 확인 팝업 구현.


## **부록: 8장 실습 파일 전체 구조 및 내용**

---

### **1. 실습 과제 요약**

**8장의 실습 과제:**  
1. 통합 프로젝트: 사용자 관리 시스템.  
2. 대시보드 설계 및 데이터 시각화.  
3. 사용자 목록 및 CRUD 기능 구현 (RESTful API 연동).  
4. 전체 UI 통일성과 상태 관리 적용.  

---

### **2. 최종 폴더 구조**

8장의 실습을 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:

```
project-template/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   ├── Dashboard.vue
│   │   ├── UserList.vue
│   │   ├── UserDetail.vue
│   │   ├── AddUser.vue
│   │   ├── EditUser.vue
│   │   ├── DeleteDialog.vue
│   ├── stores/
│   │   ├── userStore.js
│   │   ├── uiStore.js
│   ├── router/
│   │   ├── index.js
│   ├── utils/
│   │   ├── api.js
│   ├── App.vue
│   ├── main.js
├── db.json
├── index.html
├── package.json
├── vite.config.js
```

---

### **3. 각 파일의 내용**

---

#### **`src/main.js`**
프로젝트의 진입점으로, Vuetify, Pinia, Vue Router를 설정합니다.
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

#### **`src/utils/api.js`**
Axios 인스턴스를 생성하여 API 호출의 기본 설정을 포함합니다.
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

export default api;
```

---

#### **`src/stores/userStore.js`**
Pinia를 사용해 사용자 데이터를 관리합니다.
```javascript
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
```

---

#### **`src/stores/uiStore.js`**
Pinia를 사용해 UI 상태를 관리합니다.
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

---

#### **`src/router/index.js`**
Vue Router를 설정하여 라우팅을 구성합니다.
```javascript
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
```

---

#### **`src/components/Header.vue`**
기존 Header 컴포넌트입니다.
```vue
<template>
  <v-app-bar app>
    <v-toolbar-title>User Management System</v-toolbar-title>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ darkMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useUiStore } from '../stores/uiStore';

const uiStore = useUiStore();
const darkMode = uiStore.darkMode;
const toggleTheme = uiStore.toggleDarkMode;
</script>
```

---
#### **`src/components/Dashboard.vue`**
대시보드에 사용자 통계를 표시하는 컴포넌트입니다.
```vue
<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Total Users</v-card-title>
          <v-card-text>{{ stats.total }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Active Users</v-card-title>
          <v-card-text>{{ stats.active }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Inactive Users</v-card-title>
          <v-card-text>{{ stats.inactive }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api';

const stats = ref({ total: 0, active: 0, inactive: 0 });

onMounted(async () => {
  const response = await api.get('/users');
  const users = response.data;
  stats.value.total = users.length;
  stats.value.active = users.filter(user => user.active).length;
  stats.value.inactive = stats.value.total - stats.value.active;
});
</script>
```

---

#### **`src/components/UserList.vue`**
사용자 목록을 렌더링하고, CRUD 작업을 위한 액션 버튼을 제공합니다.
```vue
<template>
  <v-container>
    <h1>User List</h1>
    <v-btn color="primary" @click="navigateToAdd">Add User</v-btn>
    <v-data-table
      :items="users"
      :headers="headers"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-btn icon @click="navigateToEdit(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteUser(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'Actions', value: 'actions', sortable: false },
];

onMounted(() => {
  userStore.fetchUsers();
});

const users = userStore.users;

const navigateToAdd = () => {
  router.push('/users/add');
};

const navigateToEdit = (id) => {
  router.push(`/users/edit/${id}`);
};

const deleteUser = async (id) => {
  await userStore.deleteUser(id);
};
</script>
```

---

#### **`src/components/UserDetail.vue`**
사용자 상세 정보를 표시하는 컴포넌트입니다.
```vue
<template>
  <v-container>
    <h1>User Detail</h1>
    <v-card>
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-subtitle>{{ user.email }}</v-card-subtitle>
      <v-card-text>
        <p><strong>Status:</strong> {{ user.active ? 'Active' : 'Inactive' }}</p>
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

#### **`src/components/AddUser.vue`**
새 사용자를 추가하는 폼 컴포넌트입니다.
```vue
<template>
  <v-container>
    <h1>Add User</h1>
    <v-form>
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-btn color="primary" @click="addUser">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const user = ref({ name: '', email: '' });

const addUser = async () => {
  await userStore.addUser(user.value);
  router.push('/users');
};
</script>
```

---

#### **추가 파일들**
`EditUser.vue`와 `DeleteDialog.vue` 파일 작성은 이후 이어서 작성하겠습니다. 😊

#### **`src/components/EditUser.vue`**
기존 사용자를 수정하는 폼 컴포넌트입니다.
```vue
<template>
  <v-container>
    <h1>Edit User</h1>
    <v-form>
      <v-text-field v-model="user.name" label="Name" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-btn color="primary" @click="updateUser">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const user = ref({ id: '', name: '', email: '' });

onMounted(() => {
  const foundUser = userStore.users.find((u) => u.id === +route.params.id);
  if (foundUser) {
    user.value = { ...foundUser };
  }
});

const updateUser = async () => {
  await userStore.updateUser(user.value);
  router.push('/users');
};
</script>
```

---

#### **`src/components/DeleteDialog.vue`**
삭제 확인 팝업 컴포넌트입니다.
```vue
<template>
  <v-dialog v-model="isDialogVisible" max-width="400px">
    <v-card>
      <v-card-title>Confirm Deletion</v-card-title>
      <v-card-text>Are you sure you want to delete this user?</v-card-text>
      <v-card-actions>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn text color="red" @click="confirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const isDialogVisible = ref(false);

const cancel = () => {
  isDialogVisible.value = false;
};

const confirm = async () => {
  // Logic to delete the user
  console.log('User deleted');
  isDialogVisible.value = false;
};
</script>
```

---

#### **`db.json`**
JSON Server로 시뮬레이션하는 백엔드 데이터를 정의합니다.
```json
{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com", "active": true },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "active": false }
  ]
}
```

#### **JSON Server 실행**
```bash
json-server --watch db.json --port 3000
```

---

### **4. 설치된 모듈**

8장의 실습에는 다음 모듈이 필요합니다:
```bash
npm install axios vue-router pinia json-server
```

---

### **5. 결과 화면**

8장의 실습을 완료하면 다음 기능이 구현됩니다:
1. **대시보드:** 사용자 통계를 표시.
2. **사용자 목록 관리:** CRUD 기능을 제공.
3. **RESTful API 연동:** JSON Server를 통한 데이터 관리.
4. **UI 통일성:** Vuetify를 사용해 일관된 디자인 적용.

---
## **부록: 9장 실습 가이드**

---

### **1. 실습 과제 요약**

**9장의 실습 과제:**  
1. Vite를 사용한 프로젝트 빌드 및 GitHub Pages에 배포.  
2. 환경 변수 관리 및 설정 분리.  
3. 빌드 최적화와 성능 점검.  

---

### **2. 실습 가이드**

#### **1) 프로젝트 빌드**

1. **빌드 명령 실행**
   Vite를 사용하여 프로젝트를 빌드합니다:
   ```bash
   npm run build
   ```
   - `dist/` 폴더가 생성되며, 이 폴더에 빌드된 파일이 저장됩니다.

2. **빌드 결과 확인**
   - 빌드된 HTML, CSS, JavaScript 파일이 `dist/` 폴더에 생성됩니다.
   - 이 파일들은 정적 서버에서 배포 가능.

---

#### **2) GitHub Pages에 배포**

1. **`gh-pages` 설치**
   GitHub Pages에 배포하기 위해 `gh-pages`를 설치합니다:
   ```bash
   npm install gh-pages --save-dev
   ```

2. **`package.json` 수정**
   `package.json`에 다음 스크립트를 추가합니다:
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```

3. **GitHub 리포지토리 생성**
   - GitHub에 새로운 리포지토리를 생성합니다.
   - 리포지토리 URL을 로컬 프로젝트에 연결:
     ```bash
     git remote add origin <repository-url>
     ```

4. **GitHub Pages 활성화**
   - GitHub 리포지토리 설정에서 **Pages** 섹션으로 이동.
   - 배포 브랜치를 **gh-pages**로 설정합니다.

5. **배포 실행**
   ```bash
   npm run deploy
   ```
   - 이 명령어는 `dist/` 폴더의 내용을 `gh-pages` 브랜치로 배포합니다.

---

#### **3) 환경 변수 관리**

1. **`.env` 파일 생성**
   프로젝트 루트에 `.env` 파일을 생성하고 기본 환경 변수를 추가합니다:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

2. **프로덕션 환경 변수**
   `.env.production` 파일을 생성하여 프로덕션용 환경 변수를 정의합니다:
   ```env
   VITE_API_BASE_URL=https://api.example.com
   ```

3. **개발 환경 변수**
   `.env.development` 파일을 생성하여 개발용 환경 변수를 정의합니다:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **환경 변수 사용**
   **`src/utils/api.js`**:
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
     timeout: 5000,
   });

   export default api;
   ```

5. **환경별 빌드 실행**
   ```bash
   npm run build --mode production
   ```

---

#### **4) 빌드 최적화**

1. **코드 스플리팅**
   - Vite는 자동으로 코드 스플리팅을 처리합니다.
   - 추가로 필요하면 동적 `import`를 사용:
     ```javascript
     const Component = () => import('./components/MyComponent.vue');
     ```

2. **Tree Shaking**
   - 사용되지 않는 코드를 제거하여 번들 크기를 줄입니다.
   - Vuetify에서 필요한 컴포넌트만 가져오기:
     ```javascript
     import { createVuetify } from 'vuetify';
     import { VApp, VContainer } from 'vuetify/components';

     const vuetify = createVuetify({
       components: {
         VApp,
         VContainer,
       },
     });
     ```

3. **Lazy Loading**
   - 대형 라이브러리를 필요한 시점에 로드:
     ```javascript
     const Chart = () => import('chart.js');
     ```

---

#### **5) 성능 점검**

1. **Lighthouse 사용**
   - Chrome DevTools에서 Lighthouse를 실행하여 성능 점수를 확인합니다.

2. **Webpack Bundle Analyzer**
   - 프로젝트의 번들 크기를 시각적으로 분석:
     ```bash
     npm install --save-dev webpack-bundle-analyzer
     ```

3. **네트워크 최적화**
   - 이미지 크기를 최적화하고, CDN을 사용하여 로드 시간을 단축합니다.

---

### **3. 결과 확인**

#### **1) 빌드 결과**
- 최적화된 정적 파일이 `dist/` 폴더에 저장됩니다.

#### **2) 배포 결과**
- GitHub Pages에 배포된 사이트를 브라우저에서 확인할 수 있습니다:
  ```
  https://<username>.github.io/<repository-name>/
  ```

#### **3) 환경 변수 적용**
- 로컬 환경에서는 `http://localhost:3000` API를 사용.
- 프로덕션 환경에서는 `https://api.example.com` API를 사용.

---

### **4. 설치된 모듈**

9장의 실습에 추가적으로 필요한 모듈:
```bash
npm install gh-pages
npm install --save-dev webpack-bundle-analyzer
```

---

### **5. 학습 자료**

- [Vite 공식 문서](https://vitejs.dev/)
- [GitHub Pages 배포 가이드](https://pages.github.com/)
- [Lighthouse 성능 점검](https://developers.google.com/web/tools/lighthouse)

---
## **마무리**

이제 여러분은 Vue.js와 Vuetify를 활용해 SPA를 개발하고 배포할 수 있습니다.  
추가적으로 학습하거나 궁금한 점이 있다면 공식 문서를 참고하거나 질문해 주세요.

