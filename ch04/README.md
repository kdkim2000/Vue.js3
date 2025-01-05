## 4. Pinia를 활용한 상태 관리

---

### **4.1 Pinia 소개와 설치**

#### **Pinia란?**
Pinia는 Vue.js의 공식 상태 관리 라이브러리입니다.  
Vuex의 후속 버전으로 간주되며, 더 간결하고 직관적인 API를 제공합니다.

#### **Pinia의 특징**
1. **간결한 API**: 코드 작성이 단순하며 학습 곡선이 낮습니다.
2. **Composition API 통합**: Vue의 Composition API와 완벽하게 통합됩니다.
3. **모듈화 지원**: 여러 스토어를 생성해 상태를 관리할 수 있습니다.
4. **DevTools 통합**: Vue DevTools에서 Pinia 상태를 확인하고 디버깅할 수 있습니다.

#### **Pinia 설치**
1. 터미널에서 프로젝트 디렉토리로 이동합니다:
   ```bash
   cd my-vue-project
   ```

2. Pinia를 설치합니다:
   ```bash
   npm install pinia
   ```

3. `src/main.js`에서 Pinia를 애플리케이션에 추가합니다:
   ```javascript
   import { createPinia } from 'pinia';
   import { createApp } from 'vue';
   import App from './App.vue';
   import { createVuetify } from 'vuetify';
   import 'vuetify/styles';

   const app = createApp(App);
   const pinia = createPinia();

   app.use(pinia).use(createVuetify()).mount('#app');
   ```

---

### **4.2 State, Getter, Action의 활용**

Pinia는 상태(State), 계산된 속성(Getter), 함수(Action)를 사용해 상태 관리를 수행합니다.

#### **State**
- 애플리케이션의 데이터(상태)를 저장합니다.
- Vue의 `reactive`를 기반으로 동작합니다.

#### **Getter**
- State에서 파생된 데이터를 반환합니다.
- Vue의 `computed`와 유사합니다.

#### **Action**
- State를 변경하는 함수입니다.
- 비동기 작업(API 호출 등)도 포함할 수 있습니다.

#### **코드 예제**
1. `src/stores/counterStore.js` 파일 생성:
   ```javascript
   import { defineStore } from 'pinia';

   export const useCounterStore = defineStore('counter', {
     state: () => ({
       count: 0,
     }),
     getters: {
       doubleCount: (state) => state.count * 2,
     },
     actions: {
       increment() {
         this.count++;
       },
       decrement() {
         this.count--;
       },
     },
   });
   ```

2. **App.vue에서 사용**:
   ```vue
   <template>
     <v-container>
       <h1>Pinia Counter</h1>
       <h2>Count: {{ counterStore.count }}</h2>
       <h3>Double Count: {{ counterStore.doubleCount }}</h3>
       <v-btn color="primary" @click="counterStore.increment">Increment</v-btn>
       <v-btn color="error" @click="counterStore.decrement">Decrement</v-btn>
     </v-container>
   </template>

   <script setup>
   import { useCounterStore } from './stores/counterStore';
   const counterStore = useCounterStore();
   </script>
   ```

---

### **4.3 Pinia와 Composition API의 통합**

Pinia는 Composition API와 통합되어 더 간결하고 직관적인 상태 관리를 제공합니다.

#### **코드 예제: Composition API와 Pinia**
1. `src/stores/todoStore.js` 파일 생성:
   ```javascript
   import { defineStore } from 'pinia';

   export const useTodoStore = defineStore('todo', {
     state: () => ({
       todos: [],
     }),
     actions: {
       addTodo(todo) {
         this.todos.push(todo);
       },
       removeTodo(index) {
         this.todos.splice(index, 1);
       },
     },
   });
   ```

2. `TodoList.vue` 컴포넌트 작성:
   ```vue
   <template>
     <v-container>
       <h1>Todo List</h1>
       <v-text-field v-model="newTodo" label="New Todo" clearable></v-text-field>
       <v-btn color="primary" @click="addTodo">Add</v-btn>
       <v-list>
         <v-list-item v-for="(todo, index) in todoStore.todos" :key="index">
           {{ todo }}
           <v-btn icon @click="removeTodo(index)">
             <v-icon>mdi-delete</v-icon>
           </v-btn>
         </v-list-item>
       </v-list>
     </v-container>
   </template>

   <script setup>
   import { ref } from 'vue';
   import { useTodoStore } from '../stores/todoStore';

   const newTodo = ref('');
   const todoStore = useTodoStore();

   const addTodo = () => {
     if (newTodo.value.trim()) {
       todoStore.addTodo(newTodo.value);
       newTodo.value = '';
     }
   };

   const removeTodo = (index) => {
     todoStore.removeTodo(index);
   };
   </script>
   ```

---

### **4.4 전역 상태로 UI 데이터 관리**

Pinia는 전역 상태 관리가 가능하여 여러 컴포넌트에서 동일한 상태를 공유할 수 있습니다.

#### **예제**
1. **Header.vue**에 Counter 상태 표시:
   ```vue
   <template>
     <v-app-bar app color="primary" dark>
       <v-app-bar-title>My App</v-app-bar-title>
       <span>Count: {{ counterStore.count }}</span>
     </v-app-bar>
   </template>

   <script setup>
   import { useCounterStore } from '../stores/counterStore';
   const counterStore = useCounterStore();
   </script>
   ```

2. **Sidebar.vue**에서 Todo 개수 표시:
   ```vue
   <template>
     <v-navigation-drawer app>
       <v-list>
         <v-list-item>
           <v-list-item-title>Todos: {{ todoStore.todos.length }}</v-list-item-title>
         </v-list-item>
       </v-list>
     </v-navigation-drawer>
   </template>

   <script setup>
   import { useTodoStore } from '../stores/todoStore';
   const todoStore = useTodoStore();
   </script>
   ```

---

### **추가 학습 자료**
- [Pinia 공식 문서](https://pinia.vuejs.org/)
- [Vue Composition API 가이드](https://vuejs.org/guide/extras/composition-api-faq.html)

To-Do 갯수를 **Sidebar**에 표시하도록 수정하려면 Sidebar 컴포넌트를 업데이트하여 `todoStore`를 사용하고 To-Do 갯수를 표시하는 코드를 추가하면 됩니다.

---

### **수정된 Sidebar.vue**

#### **1. Sidebar에 To-Do 갯수 표시**
1. `src/components/Sidebar.vue` 파일을 열고 아래와 같이 수정합니다:
   ```vue
   <template>
     <v-navigation-drawer app>
       <v-list>
         <v-list-item>
           <v-list-item-title>Total To-Dos: {{ todoStore.todos.length }}</v-list-item-title>
         </v-list-item>
         <v-list-item link>
           <v-list-item-title>Home</v-list-item-title>
         </v-list-item>
         <v-list-item link>
           <v-list-item-title>About</v-list-item-title>
         </v-list-item>
       </v-list>
     </v-navigation-drawer>
   </template>

   <script setup>
   import { useTodoStore } from '../stores/todoStore';

   const todoStore = useTodoStore();
   </script>
   ```

---

### **2. App.vue 파일 유지**
1. Sidebar가 이미 App.vue에 포함되어 있으므로 추가적인 수정은 필요하지 않습니다:
   ```vue
   <template>
     <v-app>
       <Header />
       <v-main>
         <v-container>
           <v-row>
             <v-col cols="3">
               <Sidebar />
             </v-col>
             <v-col cols="9">
               <ToDoList />
             </v-col>
           </v-row>
         </v-container>
       </v-main>
     </v-app>
   </template>

   <script setup>
   import Header from './components/Header.vue';
   import Sidebar from './components/Sidebar.vue';
   import ToDoList from './components/ToDoList.vue';
   </script>
   ```

---

### **결과**
1. Sidebar에 `Total To-Dos` 섹션이 추가되며, 현재 To-Do 리스트의 갯수가 표시됩니다.
2. To-Do를 추가하거나 삭제할 때마다 Sidebar의 To-Do 갯수가 즉시 업데이트됩니다.

---

### **3. 최종 Sidebar 결과**
Sidebar는 아래와 같이 표시됩니다:
```
Total To-Dos: 3
Home
About
```

---

### **테스트 방법**
1. 애플리케이션을 실행하고 To-Do 항목을 추가하거나 삭제합니다.
2. Sidebar에서 `Total To-Dos` 값이 변경되는 것을 확인합니다.

추가적으로 수정이나 확장이 필요하면 말씀해주세요! 😊