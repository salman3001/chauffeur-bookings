import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '@/scss/style.scss'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'
import VueTablerIcons from 'vue-tabler-icons'
import Maska from 'maska'
import toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PerfectScrollbar)
app.use(VueTablerIcons)
app.use(Maska)
app.use(VueApexCharts)
app.use(toast)
app.use(vuetify)

app.mount('#app')
