import {mapState} from 'vuex'
import store from "@/store"

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = []
try {
  $uStoreKey = store.state ? Object.keys(store.state) : []
  console.log('$uStoreKey', $uStoreKey)
  $uStoreKey.forEach(namespace => {
    // 获取本地缓存中的数据
    store.commit(`${namespace}/$uLoadStore`, namespace)
  })
} catch (e) {
  console.error(e)
}

module.exports = {
  created() {
    this.$u.vuex = (name, value, isPersistence = false) => {
      let namespace = '', key = name
      const index = name.indexOf('/')
      if (index > -1) {
        namespace = name.slice(0, index)
        key = name.slice(index + 1, name.length)
      }
      this.$store.commit(`${namespace}/$uStore`, {
        namespace, key, value, isPersistence
      })
    }
  },
  computed: {
    // 将vuex的state中的所有变量，解构到全局混入的mixin中
    ...mapState($uStoreKey)
  },
}
