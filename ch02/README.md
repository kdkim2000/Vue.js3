## 2. 프로젝트 기반 Vue.js와 Vuetify 시작하기

---

### **2.1 Vuetify Grid System을 사용한 레이아웃 설계**

#### **Grid System 개념**
Vuetify는 **Flexbox 기반의 Grid System**을 제공하여, 화면의 크기와 관계없이 반응형 레이아웃을 쉽게 설계할 수 있습니다.

- **`v-container`**: 레이아웃의 최상위 컨테이너.
- **`v-row`**: 행(Row)을 정의.
- **`v-col`**: 열(Column)을 정의하며, 화면 크기에 따라 비율을 조정 가능.

#### **코드 예제: 기본 Grid System**
```vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">Column 1</v-col>
      <v-col cols="12" sm="6">Column 2</v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
```

- **결과**: 화면이 넓을 때는 두 열이 가로로 나란히 표시되고, 좁을 때는 세로로 쌓입니다.

#### **Grid 속성**
- **`cols`**: 열의 크기를 지정 (기본 단위는 12).
- **`sm`, `md`, `lg`**: 화면 크기에 따라 열의 비율을 지정.

---

### **2.2 Vue 컴포넌트 구조 이해**

#### **Vue 컴포넌트란?**
Vue 컴포넌트는 재사용 가능한 UI의 독립적인 조각입니다.  
**기본 구조**:
```vue
<template>
  <div>
    <!-- HTML 코드 -->
  </div>
</template>

<script setup>
/* JavaScript 코드 */
</script>

<style>
/* CSS 코드 */
</style>
```

#### **코드 예제: Header 컴포넌트**
```vue
<template>
  <v-app-bar app>
    <v-app-bar-title>My Vuetify App</v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
</script>

<style>
/* App Bar 스타일이 필요하다면 추가 */
</style>
```

#### **컴포넌트 등록**
1. `src/components/Header.vue`로 저장.
2. `App.vue`에서 등록하여 사용:
   ```vue
   <template>
     <v-app>
       <Header />
       <v-main>
         <v-container>Main Content</v-container>
       </v-main>
     </v-app>
   </template>

   <script setup>
   import Header from './components/Header.vue';
   </script>
   ```

---

### **2.3 Vue와 Vuetify의 데이터 바인딩**

#### **데이터 바인딩이란?**
Vue.js에서 **데이터 바인딩**은 JavaScript 데이터와 HTML을 연결하여 UI를 동적으로 업데이트합니다.

- **단방향 바인딩**: `{{ message }}` 형태로 HTML에 데이터를 표시.
- **양방향 바인딩**: `v-model`을 사용해 데이터와 UI를 동기화.

#### **코드 예제: 데이터 바인딩**
```vue
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ message }}</h1>
        <v-text-field label="Edit Message" v-model="message"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Hello, Vuetify!');
</script>
```

- **결과**: 입력 필드에서 텍스트를 변경하면 `<h1>` 내용도 즉시 업데이트됩니다.

---

### **2.4 기본 UI 설계 통일화**

#### **UI 설계 통일의 중요성**
Vuetify를 사용하면 **테마, 간격, 크기** 등의 규칙을 지정하여 UI를 일관되게 유지할 수 있습니다.

#### **Vuetify Theme 설정**
Vuetify 테마를 사용해 **다크 모드**와 **커스텀 색상**을 설정할 수 있습니다:
```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
      },
    },
  },
});

createApp(App).use(vuetify).mount('#app');
```

#### **코드 예제: 통일된 UI 요소**
```vue
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>My App</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-btn color="primary">Primary Button</v-btn>
        <v-btn color="secondary">Secondary Button</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
</script>
```

- **결과**: 버튼과 App Bar의 색상이 `primary`와 `secondary` 테마에 따라 설정됩니다.

---

## 실습 가이드: Vuetify를 활용한 대시보드 레이아웃 구성 및 컴포넌트 분리

---

### **목표**
1. Vuetify의 `Grid System`과 `App Layout`을 활용해 대시보드 레이아웃을 구성합니다.
2. 레이아웃을 `Header`, `Sidebar`, `Content` 컴포넌트로 분리하여 구조화합니다.

---

### **1. 대시보드 레이아웃 구성**

#### **1-1. 프로젝트 준비**
1. 1장의 실습 프로젝트를 이어서 사용합니다.
2. `npm run dev`로 개발 서버를 실행합니다.

#### **1-2. App.vue 수정**
`App.vue`에서 기본 구조를 설정합니다:
```vue
<template>
  <v-app>
    <!-- Header 컴포넌트 -->
    <Header />

    <!-- Main Layout -->
    <v-main>
      <v-container>
        <v-row>
          <!-- Sidebar 컴포넌트 -->
          <v-col cols="3">
            <Sidebar />
          </v-col>

          <!-- Content 컴포넌트 -->
          <v-col cols="9">
            <Content />
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
</script>

<style>
/* 필요한 스타일이 있으면 여기에 추가 */
</style>
```

- **구조**:
  - `Header`는 상단에 고정된 App Bar로 사용.
  - `Sidebar`는 왼쪽 메뉴로 사용.
  - `Content`는 메인 콘텐츠 영역.

---

### **2. 컴포넌트 분리 및 구현**

#### **2-1. Header 컴포넌트**
1. `src/components/Header.vue` 파일을 생성합니다.
2. 아래 코드를 추가합니다:
   ```vue
   <template>
     <v-app-bar app color="primary" dark>
       <v-app-bar-title>Dashboard Header</v-app-bar-title>
     </v-app-bar>
   </template>

   <script setup>
   </script>

   <style>
   </style>
   ```

#### **2-2. Sidebar 컴포넌트**
1. `src/components/Sidebar.vue` 파일을 생성합니다.
2. 아래 코드를 추가합니다:
   ```vue
   <template>
     <v-navigation-drawer app>
       <v-list>
         <v-list-item link>
           <v-list-item-title>Home</v-list-item-title>
         </v-list-item>
         <v-list-item link>
           <v-list-item-title>Dashboard</v-list-item-title>
         </v-list-item>
         <v-list-item link>
           <v-list-item-title>Settings</v-list-item-title>
         </v-list-item>
       </v-list>
     </v-navigation-drawer>
   </template>

   <script setup>
   </script>

   <style>
   </style>
   ```

#### **2-3. Content 컴포넌트**
1. `src/components/Content.vue` 파일을 생성합니다.
2. 아래 코드를 추가합니다:
   ```vue
   <template>
     <v-container>
       <h1>Main Content Area</h1>
       <p>This is where the main content will be displayed.</p>
     </v-container>
   </template>

   <script setup>
   </script>

   <style>
   </style>
   ```

---

### **3. 결과 확인**

1. `npm run dev` 명령어를 실행하여 브라우저에서 확인합니다.
2. 브라우저에서 다음과 같은 대시보드 레이아웃이 표시됩니다:
   - 상단에 고정된 헤더(Header).
   - 왼쪽에 네비게이션 메뉴(Sidebar).
   - 오른쪽에 메인 콘텐츠(Content).

---

### **4. 2장까지 실습을 마친 상태의 파일 구조**

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
│   │   └── Content.vue          # 메인 콘텐츠 컴포넌트
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

### **5. 다음 단계**
- 이제 기본 레이아웃이 구성되었으니, 각 컴포넌트의 기능을 추가하고 Vue Router를 통해 페이지를 연결할 수 있습니다.
- 필요한 확장 기능이나 추가 실습을 요청하시면 안내해 드리겠습니다! 😊