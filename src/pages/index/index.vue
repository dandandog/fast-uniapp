<template>
  <view class="content">
    <u-navbar back-text="返回" :title="title" :is-back="true" />
    {{user.token}}/{{user.version}}/{{user.info.name}}
    <u-button @click="modifyVuex1">修改变量1</u-button>

    <u-button @click="modifyVuex2">修改变量2</u-button>

    <u-button @click="onLogin">登入</u-button>

  </view>
</template>

<script>
  import auth from '@/utils/auth'

  export default {
    data() {
      return {
        title: 'Hello',
      }
    },
    onLoad() {

    },
    computed: {},
    methods: {
      onLogin() {
        this.$u.api.test()
      },
      modifyVuex1() {
        this.$u.vuex('user/token', '11111', false)
        this.$u.vuex('user/info.name', '李白', true)
      },
      modifyVuex2() {
        this.$u.vuex('user/token', '22222', true)
        this.$u.vuex('user/info.name', '白居易', true)
      }
    }
  }
</script>

<style>

</style>
