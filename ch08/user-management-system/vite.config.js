import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  server: {
    host: '0.0.0.0',     // 모든 인터페이스에서 접근 가능
    port: 5173,          // Vite 기본 포트
    strictPort: true,    // 포트 고정
    hmr: {
      host: '10.10.0.2',  // 내부 IP로 설정
      port: 5173,
    }
  }
});
