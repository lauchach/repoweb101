import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'popper.js'
import 'bootstrap'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

Vue.config.productionTip = false
import './css/Login.css'
import './css/util.css'

Vue.component('Login', require('./components/Login.vue').default)

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
