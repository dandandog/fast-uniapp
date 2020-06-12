<template>
  <view class="content">
    <u-navbar back-text="返回" title="剑未配妥，出门已是江湖" :is-back="false" />
    {{test}}
  </view>
</template>

<script>
  import _ from 'lodash'

  export default {
    data() {
      return {
        title: 'Hello',
        test: _.now()
      }
    },
    onLoad() {

    },
    methods: {}
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
