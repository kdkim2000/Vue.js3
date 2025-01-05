## 1. 서론: Vue.js와 Vuetify의 소개

---

### **1.1 Vue.js와 Vuetify란?**

#### **Vue.js란?**
Vue.js는 현대적인 자바스크립트 프레임워크로, **사용자 인터페이스(UI)**를 구축하는 데 초점을 맞춥니다.  
다른 프레임워크에 비해 **간결함**과 **유연성**이 강점이며, 작은 프로젝트부터 대규모 애플리케이션까지 활용할 수 있습니다.

- **주요 특징**:
  - **반응성**: 데이터 변경 시 UI가 자동으로 업데이트됩니다.
  - **컴포넌트 기반**: UI를 재사용 가능한 단위로 분리할 수 있습니다.
  - **Composition API**: 더 나은 코드 구조와 재사용성을 제공합니다.

#### **Vuetify란?**
Vuetify는 Vue.js용 **UI 컴포넌트 프레임워크**로, **Google의 Material Design** 가이드라인을 기반으로 설계되었습니다.

- **주요 특징**:
  - **풍부한 컴포넌트**: 버튼, 폼, 테이블 등 80개 이상의 UI 컴포넌트 제공.
  - **반응형 디자인**: 모바일, 태블릿, 데스크톱 환경에 최적화.
  - **다크모드**: 간단한 설정으로 다크모드를 지원.

#### **Vue.js와 Vuetify를 함께 사용하는 이유**
- 빠르게 일관성 있는 UI를 구축할 수 있습니다.
- Vue.js의 반응성과 Vuetify의 강력한 컴포넌트가 조합되어 생산성을 높입니다.

---

### **1.2 교육 목표 및 기대 효과**

#### **교육 목표**
1. **Vue.js와 Vuetify의 기본 사용법 이해**:
   - Vue.js의 Composition API를 활용하여 애플리케이션을 설계.
   - Vuetify의 컴포넌트를 사용해 일관된 UI를 제작.
2. **실무 프로젝트 능력 향상**:
   - 간단한 CRUD(Create, Read, Update, Delete) 애플리케이션 구현.
3. **효율적인 개발 환경 구축**:
   - Vite를 사용한 빠른 개발 환경 설정 및 빌드.

#### **기대 효과**
- Vue.js와 Vuetify를 사용해 효율적이고 반응형인 웹 애플리케이션을 설계할 수 있습니다.
- 실무에서 사용할 수 있는 프로젝트 경험을 쌓을 수 있습니다.
- 일관된 UI 설계로 사용자 경험(UX)을 향상시킬 수 있습니다.

---

### **1.3 실습 환경 설정 (Node.js, Vite, Vuetify 설치)**

#### **필수 도구**
1. **Node.js 설치**  
   - [Node.js 공식 사이트](https://nodejs.org)에서 설치합니다.  
   - 설치 후, 터미널에서 아래 명령어로 버전을 확인하세요:
     ```bash
     node -v
     npm -v
     ```

2. **Vite를 사용한 Vue 프로젝트 생성**
   Vite는 빠르고 간단한 Vue.js 프로젝트 초기화를 제공합니다.
   ```bash
   npm create vite@latest my-vue-project --template vue
   cd my-vue-project
   npm install
   ```

3. **Vuetify 설치**
   Vuetify는 `npm` 또는 `yarn`으로 설치할 수 있습니다.
   ```bash
   npm install vuetify
   npm install @mdi/font # 아이콘 폰트 설치
   ```

4. **Vuetify 설정**  
   프로젝트의 `main.js` 또는 `main.ts` 파일에 Vuetify를 추가합니다.
   ```javascript
   import { createApp } from 'vue';
   import App from './App.vue';
   import { createVuetify } from 'vuetify';
   import 'vuetify/styles'; // Vuetify 스타일 불러오기
   import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons

   const vuetify = createVuetify();

   createApp(App).use(vuetify).mount('#app');
   ```

---

### **1.4 교재 사용 가이드**

#### **사용 방법**
1. 각 장의 설명을 읽으며 개념을 이해합니다.
2. 제공된 코드 예제를 작성하거나 복사해 직접 실행합니다.
3. 실습 문제를 통해 학습 내용을 반복합니다.

#### **실습 진행 방법**
- **읽기**: 각 장에서 다루는 개념을 먼저 이해합니다.
- **코드 작성**: 직접 코드를 작성하며 동작을 확인합니다.
- **문제 해결**: 실습 문제를 해결하며 응용력을 키웁니다.

#### **결과물 배포**
- 학습이 끝난 후, 프로젝트를 GitHub Pages 또는 Netlify에 배포해 실제로 동작하는 웹사이트를 확인합니다.

---

## 실습 가이드: Vite로 Vue.js 프로젝트 생성 및 Vuetify 초기 설정

### **1. Vite로 Vue.js 프로젝트 생성**
#### **1-1. 프로젝트 생성**
1. 터미널(또는 명령 프롬프트)을 열고 아래 명령어를 실행합니다:
   ```bash
   npm create vite@latest my-vue-project --template vue
   ```
   - `my-vue-project`는 프로젝트 이름으로 원하는 이름으로 변경 가능합니다.
   - 템플릿으로 `vue`를 선택합니다.

2. 생성된 프로젝트 폴더로 이동하고 의존성을 설치합니다:
   ```bash
   cd my-vue-project
   npm install
   ```

3. 프로젝트를 실행하여 초기 설정을 확인합니다:
   ```bash
   npm run dev
   ```
   - 브라우저에서 `http://localhost:5173`를 열어 기본 화면을 확인합니다.

---

### **2. Vuetify 설치 및 초기 설정**
#### **2-1. Vuetify 설치**
1. 터미널에서 아래 명령어로 Vuetify와 아이콘 폰트를 설치합니다:
   ```bash
   npm install vuetify @mdi/font
   ```

#### **2-2. Vuetify 설정**
1. `src/main.js` 파일을 열고 아래 내용을 추가합니다:
   ```javascript
   import { createApp } from 'vue';
   import App from './App.vue';
   import { createVuetify } from 'vuetify';
   import 'vuetify/styles'; // Vuetify 스타일 로드
   import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons

   const vuetify = createVuetify();

   createApp(App).use(vuetify).mount('#app');
   ```

2. `App.vue` 파일을 열고 Vuetify 컴포넌트가 작동하는지 확인합니다:
   ```vue
   <template>
     <v-app>
       <v-main>
         <v-container>Hello, Vuetify!</v-container>
       </v-main>
     </v-app>
   </template>

   <script setup>
   </script>

   <style>
   </style>
   ```

2. `vite.config.js` 파일에 Vuetify 플러그인을 추가:
    ```vue
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import vuetify from 'vite-plugin-vuetify';

    export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
    ],
    });

    ```
4. 브라우저에서 새로고침하여 "Hello, Vuetify!"라는 텍스트가 표시되면 성공적으로 설정된 것입니다.

---

### **3. Vuetify 기본 레이아웃 구현**
#### **3-1. App Bar, Navigation Drawer, Footer 추가**
1. `App.vue` 파일을 다음 코드로 수정합니다:
   ```vue
   <template>
     <v-app>
       <!-- App Bar -->
       <v-app-bar app>
         <v-app-bar-title>My Vuetify App</v-app-bar-title>
       </v-app-bar>

       <!-- Navigation Drawer -->
       <v-navigation-drawer app>
         <v-list>
           <v-list-item link>
             <v-list-item-title>Home</v-list-item-title>
           </v-list-item>
           <v-list-item link>
             <v-list-item-title>About</v-list-item-title>
           </v-list-item>
         </v-list>
       </v-navigation-drawer>

       <!-- Main Content -->
       <v-main>
         <v-container>
           <h1>Welcome to My Vuetify App!</h1>
         </v-container>
       </v-main>

       <!-- Footer -->
       <v-footer app>
         <v-container>
           <span>&copy; 2025 My Vuetify App</span>
         </v-container>
       </v-footer>
     </v-app>
   </template>

   <script setup>
   </script>

   <style>
   </style>
   ```

2. `v-app-bar`, `v-navigation-drawer`, `v-main`, `v-footer`는 Vuetify에서 제공하는 기본 레이아웃 컴포넌트입니다.

---

### **4. 결과 확인**
1. 터미널에서 개발 서버를 실행합니다:
   ```bash
   npm run dev
   ```
2. 브라우저에서 `http://localhost:5173`를 열어 아래와 같은 레이아웃을 확인합니다:
   - 상단에 App Bar
   - 왼쪽에 Navigation Drawer
   - 중앙에 메인 콘텐츠
   - 하단에 Footer

---

### **5. 실습 완료 후 추가 확인**
- Navigation Drawer에서 메뉴를 클릭해도 아무 동작이 없는데, 이는 이후 Vue Router를 설정하면서 동작하도록 개선할 것입니다.
- 추가로 색상이나 레이아웃을 변경하고 싶은 경우 Vuetify의 [Grid System](https://vuetifyjs.com/en/features/grid-system/)을 참고해보세요.

이제 Vuetify 기반의 일관된 UI 레이아웃이 성공적으로 설정되었습니다! 

### **6. 1장까지 실습을 마친 상태의 파일 구조** (Vuetify 초기 설정 및 기본 레이아웃 구현 후)


실습을 완료한 후 프로젝트의 파일 구조는 아래와 같을 것입니다:

```
my-vue-project/
├── node_modules/               # 설치된 의존성 모듈
├── public/                     # 정적 파일 (favicon 등)
│   ├── favicon.ico
│   └── ...
├── src/                        # 소스 코드 폴더
│   ├── assets/                 # 이미지, CSS 등의 정적 자산
│   │   └── logo.svg
│   ├── components/             # Vue 컴포넌트 폴더
│   │   └── (추가된 컴포넌트가 없으므로 비어 있음)
│   ├── App.vue                 # 메인 애플리케이션 파일 (Vuetify 레이아웃 포함)
│   ├── main.js                 # 진입 파일, Vuetify 설정 포함
│   └── style.css               # (추가 스타일이 없는 경우 없음)
├── .gitignore                  # Git에서 무시할 파일 및 폴더 목록
├── index.html                  # 애플리케이션 진입 HTML 파일
├── package.json                # 프로젝트 의존성 및 스크립트
├── package-lock.json           # 정확한 의존성 버전 관리
├── vite.config.js              # Vite 설정 파일
└── README.md                   # 프로젝트 설명 파일
```

#### **1. src/main.js**
Vuetify 설정과 애플리케이션의 진입점:
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify();

createApp(App).use(vuetify).mount('#app');
```

#### **2. src/App.vue**
Vuetify를 사용한 기본 레이아웃 구현:
```vue
<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app>
      <v-app-bar-title>My Vuetify App</v-app-bar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer app>
      <v-list>
        <v-list-item link>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <h1>Welcome to My Vuetify App!</h1>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-container>
        <span>&copy; 2025 My Vuetify App</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
</script>

<style>
</style>
```

#### **3. index.html**
기본 HTML 파일, `#app` 요소에 Vue 애플리케이션이 마운트됩니다:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Vuetify App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

---

### **다음 단계**
- 추가적으로 컴포넌트(`src/components/`)를 생성하여 코드를 분리하고 재사용성을 높일 수 있습니다.
- 앞으로 진행될 실습에서 Vue Router 및 Pinia를 설정하며 이 구조에 새로운 폴더와 파일이 추가될 예정입니다.

필요한 부분이 있다면 언제든지 질문해주세요! 😊