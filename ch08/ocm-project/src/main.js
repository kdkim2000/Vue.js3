import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from "./router";
// Components
import App from './App.vue'

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
})

createApp(App)
.use(router)
.use(vuetify)
.mount('#app')
