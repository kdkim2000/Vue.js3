# 9. 배포 및 유지보수

---

## **9.1 Vite로 프로젝트 빌드 및 배포**

Vite는 Vue 프로젝트를 빠르게 빌드하고 배포할 수 있는 도구를 제공합니다.  
이번 섹션에서는 **빌드와 GitHub Pages를 사용한 배포** 과정을 다룹니다.

---

### **1. 프로젝트 빌드**

1. **빌드 명령 실행**
   프로젝트 디렉토리에서 다음 명령어를 실행합니다:
   ```bash
   npm run build
   ```

2. **빌드 출력 확인**
   명령어 실행 후 `dist/` 폴더에 배포 가능한 정적 파일이 생성됩니다.

---

### **2. GitHub Pages에 배포**

1. **gh-pages 설치**
   GitHub Pages로 배포하기 위해 `gh-pages` 패키지를 설치합니다:
   ```bash
   npm install gh-pages --save-dev
   ```

2. **`package.json` 수정**
   다음 스크립트를 추가합니다:
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```

3. **GitHub 리포지토리 생성**
   프로젝트를 업로드할 GitHub 리포지토리를 생성합니다.

4. **GitHub Pages 활성화**
   GitHub 리포지토리 설정에서 `Pages` 섹션으로 이동하여 배포 브랜치를 `gh-pages`로 설정합니다.

5. **배포 실행**
   다음 명령어를 실행하여 배포합니다:
   ```bash
   npm run deploy
   ```

---

## **9.2 환경 변수와 설정 관리**

### **환경 변수 설정**

1. **`.env` 파일 생성**
   프로젝트 루트에 `.env` 파일을 생성합니다:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

2. **환경 변수 사용**
   **`src/utils/api.js`**:
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
     timeout: 5000,
   });

   export default api;
   ```

---

### **환경 변수 분리**
프로덕션 환경과 개발 환경에서 다른 값을 사용하도록 설정합니다.

1. **`.env.production`**
   ```env
   VITE_API_BASE_URL=https://api.example.com
   ```

2. **`.env.development`**
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

3. **환경에 따른 빌드**
   ```bash
   npm run build --mode production
   ```

---

## **9.3 최적화와 성능 점검**

### **1. 코드 스플리팅**
코드 스플리팅을 통해 번들 크기를 줄이고 로드 시간을 최적화합니다.  
Vite는 자동으로 코드 스플리팅을 처리합니다.

---

### **2. Tree Shaking**
사용되지 않는 코드를 제거하여 번들 크기를 줄입니다.  
Vuetify와 같은 라이브러리에서 필요한 컴포넌트만 가져오는 방식을 사용합니다:
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

---

### **3. 성능 점검 도구**
다음 도구를 사용하여 성능을 점검합니다:
- **Lighthouse**: 브라우저에서 성능, 접근성, SEO 점검.
- **Webpack Bundle Analyzer**: 번들 크기 시각화 및 분석.

---

## **9.4 유지보수 전략**

1. **버전 관리**
   - Git 브랜치를 사용하여 변경 사항을 관리합니다.
   - 주요 변경 사항은 태그와 릴리스를 통해 관리합니다.

2. **테스트 자동화**
   - **Vitest**를 활용하여 단위 테스트를 추가합니다.
   - E2E 테스트 도구로 **Cypress**를 사용합니다.

3. **문서화**
   - 프로젝트에 대한 상세한 문서를 작성합니다.
   - README 파일에 설치 및 배포 방법을 포함합니다.

---

## **9.5 학습 자료**
- [Vite 공식 문서](https://vitejs.dev/)
- [GitHub Pages 배포 가이드](https://pages.github.com/)
- [Vue 환경 변수 가이드](https://vitejs.dev/guide/env-and-mode.html)
- [Lighthouse 공식 문서](https://developers.google.com/web/tools/lighthouse)

---
