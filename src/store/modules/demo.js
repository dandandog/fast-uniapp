const state = {
	data: 0
}

const mutations = {
	setData: (state, data) => {
		state.data = data
	}
}
const getters = {
	getData: (state, data) => {
		return state.data
	}
}
const actions = {
	fetchList({ commit,state }, params) {
	  return new Promise((resolve, reject) => {
	    page(params).then(response => {
	      resolve(response)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
