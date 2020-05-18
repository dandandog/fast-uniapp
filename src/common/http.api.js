const install = (Vue, vm) => {
	let login = (params = {}) => vm.$u.get('/login', params);
	let text = (params = {}) => vm.$u.get('/text',params)
	let text2 = (params = {}) => vm.$u.post('/text2',params)
	vm.$u.api = {
		login,
		text,
		text2
	};
}

export default {
	install
}
