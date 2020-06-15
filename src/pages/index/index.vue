<template>
  <view class="content">
    <u-navbar back-text="返回" :title="title" :is-back="true" />
    {{user.version}}/
    {{user.token}}
    <u-button @click="modifyVuex">修改变量</u-button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello',
      }
    },
    onLoad() {
      this.$u.toast('Hello uView!')
      console.log('user', this.user)
    },
    computed: {},
    methods: {
      modifyVuex() {
        this.$u.vuex('user/version', '0.0.9', true)
        this.$u.vuex('user/token', '123456', true)
      }
    }
  }
</script>

<style>

</style>
