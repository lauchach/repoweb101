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
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(VueAxios, axios)

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000/'), //options object is Optional
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
