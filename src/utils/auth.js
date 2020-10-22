export const TOKEN_KEY = 'Authorization'
export const ATTEMPTS = 'Attempts'

export function getToken() {
  return uni.getStorageSync(TOKEN_KEY)
}

export function setToken(token) {
  return uni.setStorageSync(TOKEN_KEY, token)
}

export function removeToken() {
  return uni.removeStorageSync(TOKEN_KEY)
}

export function getAttempts() {
  return uni.getStorageSync(ATTEMPTS) | 0
}

export function setAttempts(attempts) {
  return uni.setStorageSync(ATTEMPTS, attempts)
}

export function refreshAttempts() {
  return uni.removeStorageSync(ATTEMPTS)
}


/**
 * 微信登入
 */
export function wxLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success(res) {
        return resolve(res.code)
      },
      fail() {
        uni.showToast({
          title: '获取code失败',
          icon: 'none'
        })
        return reject('获取code失败')
      }
    })
  })
}


//查看Session是否过期
export function checkSession() {
  return new Promise((resolve, reject) => {
    uni.checkSession({
      success() {
        return resolve(true)
      },
      fail() {
        return resolve(false)
      }
    })
  })
}

//获取用户信息
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      success: res => {
        return resolve(res)
      },
      fail: err => {
        console.error(err)
        return resolve()
      }
    })
  })
}


// 判断是否授权
export function checkAndAuthorize(scope) {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success(res) {
        if (!res.authSetting[scope]) {
          uni.authorize({
            scope: scope,
            success() {
              resolve({
                msg: '授权成功'
              })
            },
            fail(e) {
              uni.showModal({
                title: '无权操作',
                content: '需要获得您的授权',
                showCancel: false,
                confirmText: '立即授权',
                confirmColor: '#e64340',
                success(res) {
                  uni.openSetting()
                },
                fail(e) {
                  reject(e)
                },
              })
            }
          })
        } else {
          resolve({
            msg: '已经授权'
          })
        }
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

export default {
  TOKEN_KEY,
  getToken,
  setToken,
  removeToken,

  getAttempts,
  setAttempts,
  refreshAttempts,

  checkSession,
  wxLogin,
  getUserInfo,
  checkAndAuthorize
}
