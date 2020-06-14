<template>
    <view class="content">
        <u-navbar back-text="返回" title="剑未配妥，出门已是江湖" :is-back="false"/>
        {{version}}
        <u-button @click="modifyVuex">修改变量</u-button>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {
    this.$u.toast('Hello uView!')

  },
  computed: {
    ...mapGetters({ version: 'version' })
  },
  methods: {
    modifyVuex() {
      this.$u.vuex('version', '1.0.0')
    }
  }
}
</script>

<style>
    .content {
        text-align: center;
        height: 400 upx;
    }

    .logo {
        height: 200 upx;
        width: 200 upx;
        margin-top: 200 upx;
    }

    .title {
        font-size: 36 upx;
        color: #8f8f94;
    }
</style>
