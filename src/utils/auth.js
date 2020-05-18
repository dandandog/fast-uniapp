export const TokenKey = 'Authorization'

export function getToken() {
	return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
	return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
	return uni.removeStorageSync(TokenKey)
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
async function getUserInfo() {
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
//登录获取code值
export function getWxCode() {
	return new Promise((resolve, reject) => {
		uni.login({
			success(res) {
				return resolve(res.code)
			},
			fail() {
				uni.showToast({
					title: '获取code失败',
					icon: 'none'
				})
				return resolve('获取code失败')
			}
		})
	})
}
// 判断是否授权
async function checkAndAuthorize(scope) {
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
									uni.openSetting();
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
	TokenKey,
	getToken,
	setToken,
	removeToken,
	checkSession,
	getWxCode,
	getUserInfo,
	checkAndAuthorize
}
