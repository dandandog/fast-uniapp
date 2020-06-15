import storage from "@/store/modules/storage"

const state = {
  token: '',
  version: ''
}
const mutations = {}
const getters = {
  token: state => state.token
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
  modules: {
    storage
  }
}

