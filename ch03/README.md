## 3. Composition API와 Vue의 핵심 기능

---

### **3.1 Composition API 소개 및 활용**

#### **Composition API란?**
Composition API는 Vue 3에서 도입된 새로운 방식으로, UI 로직을 **컴포넌트 내부에서 더 구조화**하고 **재사용 가능**하게 작성할 수 있습니다.

#### **왜 필요한가?**
1. **코드 구조 개선**: 큰 컴포넌트에서 서로 관련된 로직을 한곳에 모아둡니다.
2. **재사용성 증가**: 동일한 로직을 여러 컴포넌트에서 쉽게 재사용할 수 있습니다.
3. **명확한 함수 기반 접근**: 함수 기반 접근으로 기존 Options API보다 가독성이 높아집니다.

#### **Composition API의 기본 요소**
- **`setup()`**: Composition API의 진입점으로, 컴포넌트가 렌더링되기 전에 실행됩니다.
- **반응형 상태 관리**:
  - `ref`: 기본 데이터 형식(숫자, 문자열 등)을 관리.
  - `reactive`: 객체나 배열을 반응형으로 관리.

---

### **3.2 `ref`와 `reactive`로 데이터 관리**

#### **`ref`란?**
- 단일 값(숫자, 문자열 등)을 반응형으로 만들 때 사용합니다.
- `ref`는 Vue가 상태를 추적하고 변경 사항에 따라 UI를 업데이트하도록 합니다.

#### **`reactive`란?**
- 객체나 배열을 반응형으로 만들 때 사용합니다.
- `reactive`는 Vue가 객체 속성의 변경 사항을 추적하고 UI에 반영합니다.

#### **코드 예제: `ref`와 `reactive`**
```vue
<template>
  <v-container>
    <h1>{{ message }}</h1>
    <v-btn @click="changeMessage">Change Message</v-btn>

    <h2>Counter: {{ counter }}</h2>
    <v-btn @click="incrementCounter">Increment Counter</v-btn>

    <h3>Reactive Object:</h3>
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <v-btn @click="updateUser">Update User</v-btn>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Using ref
const message = ref('Hello, Vue 3!');
const counter = ref(0);

// Using reactive
const user = reactive({
  name: 'John Doe',
  age: 25,
});

// Methods
const changeMessage = () => {
  message.value = 'Welcome to Composition API!';
};

const incrementCounter = () => {
  counter.value++;
};

const updateUser = () => {
  user.name = 'Jane Doe';
  user.age++;
};
</script>
```

#### **결과**
1. 버튼을 클릭하면 `message`, `counter`, 또는 `user` 데이터가 업데이트됩니다.
2. UI는 데이터 변경에 따라 자동으로 업데이트됩니다.

---

### **3.3 `computed`와 `watch`를 활용한 반응형 데이터 처리**

#### **`computed`란?**
- 기존 데이터에서 파생된 값을 계산하는 데 사용합니다.
- 값이 변경되지 않으면 **캐싱**되어 성능을 최적화합니다.

#### **코드 예제: `computed`**
```vue
<template>
  <v-container>
    <h1>Original Number: {{ number }}</h1>
    <h2>Squared: {{ squaredNumber }}</h2>
    <v-btn @click="incrementNumber">Increment Number</v-btn>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const number = ref(2);

const squaredNumber = computed(() => number.value * number.value);

const incrementNumber = () => {
  number.value++;
};
</script>
```

#### **`watch`란?**
- 특정 데이터의 변화를 감지하고 로직을 실행합니다.
- 주로 비동기 작업(API 호출 등)에 사용됩니다.

#### **코드 예제: `watch`**
```vue
<template>
  <v-container>
    <v-text-field label="Enter your name" v-model="name"></v-text-field>
    <p>{{ greeting }}</p>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';

const name = ref('');
const greeting = ref('');

watch(name, (newValue) => {
  greeting.value = `Hello, ${newValue || 'Stranger'}!`;
});
</script>
```

---

### **3.4 Lifecycle Hooks 이해**

#### **Lifecycle Hooks란?**
Vue 컴포넌트의 **생명 주기 단계**에서 특정 로직을 실행할 수 있도록 하는 API입니다.

#### **주요 Lifecycle Hooks**
1. **onMounted**: 컴포넌트가 DOM에 렌더링된 후 실행.
2. **onUpdated**: 컴포넌트가 업데이트된 후 실행.
3. **onUnmounted**: 컴포넌트가 제거되기 직전에 실행.

#### **코드 예제: Lifecycle Hooks**
```vue
<template>
  <v-container>
    <p>Check the console for lifecycle messages.</p>
    <v-btn @click="updateState">Update State</v-btn>
    <v-btn @click="destroyComponent">Destroy Component</v-btn>
    <p>Current State: {{ state }}</p>
    <p v-if="componentVisible">Component is visible</p>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

const state = ref(0);
const componentVisible = ref(true);

// Lifecycle Hooks
onBeforeMount(() => {
  console.log('onBeforeMount: Component is about to be mounted.');
});

onMounted(() => {
  console.log('onMounted: Component has been mounted.');
});

onBeforeUpdate(() => {
  console.log('onBeforeUpdate: Component is about to be updated.');
});

onUpdated(() => {
  console.log('onUpdated: Component has been updated.');
});

onBeforeUnmount(() => {
  console.log('onBeforeUnmount: Component is about to be unmounted.');
});

onUnmounted(() => {
  console.log('onUnmounted: Component has been unmounted.');
});

// Methods
const updateState = () => {
  state.value++; 
};

const destroyComponent = () => {
  componentVisible.value = !componentVisible.value; // Component visibility 변경
};
</script>
```

#### **활용 사례**
- **onMounted**: API 호출, 이벤트 리스너 등록.
- **onUnmounted**: 이벤트 리스너 해제, 타이머 정리.

---

### **추가 학습 자료**
- [Vue 3 공식 문서: Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 Lifecycle Hooks](https://vuejs.org/api/options-lifecycle.html)

---

## 3장 실습: Composition API 활용

---

### **목표**
1. Composition API를 사용해 독립적인 **Counter 컴포넌트**를 작성하고 이를 메인 레이아웃에 통합합니다.
2. **실시간 필터링** 기능을 구현하여 사용자 입력에 따라 동적으로 데이터를 필터링합니다.

---

### **1. Counter 컴포넌트 제작**
#### **Counter.vue**
1. `src/components/Counter.vue` 파일을 생성합니다.
2. 아래 코드를 작성합니다:
   ```vue
   <template>
     <v-card class="ma-4 pa-4">
       <v-card-title>Counter</v-card-title>
       <v-card-text>
         <h2>{{ count }}</h2>
       </v-card-text>
       <v-card-actions>
         <v-btn color="primary" @click="increment">Increment</v-btn>
         <v-btn color="error" @click="decrement">Decrement</v-btn>
       </v-card-actions>
     </v-card>
   </template>

   <script setup>
   import { ref } from 'vue';

   const count = ref(0);

   const increment = () => {
     count.value++;
   };

   const decrement = () => {
     count.value--;
   };
   </script>

   <style scoped>
   h2 {
     text-align: center;
   }
   </style>
   ```

---

### **2. 실시간 필터링 기능 구현**
#### **FilterList.vue**
1. `src/components/FilterList.vue` 파일을 생성합니다.
2. 아래 코드를 작성합니다:
   ```vue
   <template>
     <v-card class="ma-4 pa-4">
       <v-card-title>Real-Time Filter</v-card-title>
       <v-card-text>
         <v-text-field
           label="Search"
           v-model="searchTerm"
           @input="filterList"
           clearable
         ></v-text-field>
         <v-list>
           <v-list-item
             v-for="(item, index) in filteredItems"
             :key="index"
           >
             {{ item }}
           </v-list-item>
         </v-list>
       </v-card-text>
     </v-card>
   </template>

   <script setup>
   import { ref, computed } from 'vue';

   const searchTerm = ref('');
   const items = ref(['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape']);

   const filteredItems = computed(() => {
     return items.value.filter((item) =>
       item.toLowerCase().includes(searchTerm.value.toLowerCase())
     );
   });

   const filterList = () => {
     // No additional logic needed as computed does the filtering
   };
   </script>
   ```

---

### **3. App.vue에 통합**
1. `App.vue`에 Counter와 FilterList 컴포넌트를 추가합니다.
2. 아래 코드를 작성합니다:
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
               <Content />
               <Counter />
               <FilterList />
             </v-col>
           </v-row>
         </v-container>
       </v-main>
     </v-app>
   </template>

   <script setup>
   import Header from './components/Header.vue';
   import Sidebar from './components/Sidebar.vue';
   import Content from './components/Content.vue';
   import Counter from './components/Counter.vue';
   import FilterList from './components/FilterList.vue';
   </script>
   ```

---

### **4. 최종 폴더 구조**
3장 실습까지 완료한 후 프로젝트 폴더 구조는 다음과 같습니다:
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
│   │   └── FilterList.vue       # 실시간 필터링 컴포넌트
│   ├── App.vue                  # 전체 레이아웃 구성
│   ├── main.js                  # Vuetify 및 Vue 초기 설정
│   └── style.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

### **결과 확인**
1. **Counter 컴포넌트**:
   - 버튼을 클릭하면 숫자가 증가하거나 감소합니다.
2. **FilterList 컴포넌트**:
   - 검색창에 입력한 내용에 따라 리스트가 실시간으로 필터링됩니다.

---

이제 실습이 완료되었습니다! 추가적인 수정이나 학습에 대한 질문이 있다면 언제든지 말씀해주세요. 😊