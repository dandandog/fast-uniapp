import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui";
import httpInterceptor from '@/common/http.api'
import httpApi from '@/common/http.api.js'


let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

Vue.prototype.$store = store
Vue.use(uView);


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
Vue.use(httpInterceptor, app)
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpApi, app)
app.$mount()
