const install = (Vue, vm) => {
  let login = (params = {}) => vm.$u.get('/v1/wx/login', params)
  let test = (params = {}) => vm.$u.get('/v1/wx/index', params)
  vm.$u.api = {
    login,
    test
  }
}

export default {
  install
}
