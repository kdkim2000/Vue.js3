import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // 아이콘 스타일 추가

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify();
app.use(router).use(pinia).use(vuetify).mount('#app');
