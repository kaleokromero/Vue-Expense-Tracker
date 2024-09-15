import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import VueApexCharts from 'vue3-apexcharts'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHouseMedical,
  faCar,
  faUtensils,
  faUser,
  faChartLine,
  faCreditCardAlt,
  faChevronLeft,
  faChevronRight,
  faGift,
  faArrowTrendUp
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.use(createPinia())
app.use(router)

library.add(
  faHouseMedical,
  faCar,
  faUtensils,
  faUser,
  faChartLine,
  faCreditCardAlt,
  faChevronLeft,
  faChevronRight,
  faGift,
  faArrowTrendUp
)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('apex-chart', VueApexCharts)

app.mount('#app')
