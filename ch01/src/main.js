import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Vuetify 스타일 불러오기
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons 불러오기

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
