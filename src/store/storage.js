const SAVE_KEY = 'lifeData'

const mutations = {
  $uLoadStore: (state, payload) => {
    const lifeData = uni.getStorageSync(SAVE_KEY)
    Object.keys(state).forEach(value => {
      const key = `${payload}/${value}`
      state[value] = lifeData[key] ? lifeData[key] : state[value]
    })
  },
  $uStore: (state, payload) => {
    let nameArr = payload.key.split('.')
    let saveKey = ''
    let len = nameArr.length
    // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
    if (nameArr.length >= 2) {
      let obj = state[nameArr[0]]
      for (let i = 1; i < len - 1; i++) {
        obj = obj[nameArr[i]]
      }
      obj[nameArr[len - 1]] = payload.value
      saveKey = nameArr[0]
    } else {
      // 单层级变量，在state就是一个普通变量的情况
      state[payload.key] = payload.value
      saveKey = payload.key
    }
    // 保存变量到本地，见顶部函数定义
    if (payload.isPersistence) {
      let tmp = uni.getStorageSync(SAVE_KEY)
      tmp = tmp ? tmp : {}
      tmp[payload.namespace + '/' + saveKey] = state[saveKey]
      uni.setStorageSync(SAVE_KEY, tmp)
    }
  }
}

export default mutations
