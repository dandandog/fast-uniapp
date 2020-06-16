import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import storage from "@/store/storage"


const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  // 所有module加入通用storage
  value.default.mutations = {...value.default.mutations, ...storage}
  modules[moduleName] = value.default
  return modules
}, {})

Vue.use(Vuex)


const store = new Vuex.Store({
  modules,
  getters
})

export default store
