import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui"
import httpInterceptor from '@/common/http.interceptor'
import httpApi from '@/common/http.api'


let vuexStore = require("@/store/$u.mixin.js")
Vue.mixin(vuexStore)


Vue.prototype.$store = store
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

Vue.use(httpInterceptor, app)
Vue.use(httpApi, app)
app.$mount()
