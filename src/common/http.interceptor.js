// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
import auth from '@/utils/auth'


const install = (Vue, vm) => {
  // 此为自定义配置参数，具体参数见上方说明
  Vue.prototype.$u.http.setConfig({
    baseUrl: 'http://localhost:8080/api',
    showLoading: true,
    loadingText: '努力加载中...',
    loadingTime: 800,
    originalData: false,
    loadingMask: true,
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
  })

  // 请求拦截，配置Token等参数
  Vue.prototype.$u.http.interceptor.request = (config) => {
    const token = auth.getToken()
    if (config.url === '/user/login') config.header.noToken = true
    if (token) config.header[auth.TOKEN_KEY] = token
    return config
  }

  // 响应拦截，判断状态码是否通过
  Vue.prototype.$u.http.interceptor.response = async (res) => {
    let attempts = auth.getAttempts()
    debugger
    console.log(res)
    if (res.code === 20300) {
      console.log('Token失效', attempts)
      if (attempts >= 3) {
        console.log('多次请求Token 已中止')
        auth.setAttempts(0)
        return
      }
      auth.setAttempts(++attempts)

      const code = await auth.wxLogin()
      const {token} = await vm.$u.api.login({code})
      console.log('token', token)
      auth.setToken(token)
    } else if (res.code === 200) {
      // res为服务端返回值，可能有code，result等字段
      // 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
      // 如果配置了originalData为true，请留意这里的返回值
      return res.date
    } else if (res.code === 201) {
      // 假设201为token失效，这里跳转登录
      vm.$u.toast('验证失败，请重新登录')
      setTimeout(() => {
        // 此为uView的方法，详见路由相关文档
        vm.$u.route('/pages/user/login')
      }, 1500)
      return false
    } else {
      // 如果返回false，则会调用Promise的reject回调，
      // 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
      return false
    }
  }
}


export default {
  install
}
