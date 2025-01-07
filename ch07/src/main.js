import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import router from './router';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi', // 기본 아이콘 세트를 'mdi'로 설정
    },
  });
const pinia = createPinia();

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .mount('#app');


  