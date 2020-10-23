// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
import auth from '@/utils/auth'


const install = (Vue, vm) => {
  // 此为自定义配置参数，具体参数见上方说明
  Vue.prototype.$u.http.setConfig({
    baseUrl: 'http://localhost:8080/api',
    showLoading: true,
    loadingText: '努力加载中...',
    loadingTime: 800,
    originalData: true,
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
    // 后台统一返回 200
    if (res.statusCode !== 200) {
      return false
    }
    // 后台自定义返回结果
    if (res.data.code === 20300) {
      if (attempts >= 3) {
        auth.setAttempts(0)
        return false
      }
      auth.setAttempts(++attempts)
      const options = vm.$u.http.options
      const code = await auth.wxLogin()
      await vm.$u.api.login({code})
      await vm.$u.http.request(options)

    } else if (res.data.code === 20000) {
      auth.setAttempts(0)
      console.log('token', res.header[auth.TOKEN_KEY])
      auth.setToken(res.header[auth.TOKEN_KEY])
      console.log('result', res.data)
      return res.data
    } else {
      return false
    }
  }


}


export default {
  install
}
