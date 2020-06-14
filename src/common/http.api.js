const install = (Vue, vm) => {
	let login = (params = {}) => vm.$u.get('/login', params);

	vm.$u.api = {
		login

	};
}

export default {
	install
}
