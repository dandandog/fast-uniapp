<template>
	<view class="content">
		<u-navbar back-text="返回" title="剑未配妥，出门已是江湖" :is-back="false"></u-navbar>
		<view @tap="nav">
			
		</view>
	</view>
</template>

<script>
	import auth from '@/utils/auth.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.$u.api.text().then(res => {
				console.log(res);
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
