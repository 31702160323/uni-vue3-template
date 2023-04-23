<template>
	<view class="content">
		<button @click="start">start</button>
		<button @click="stop">stop</button>
		<view>下行速度:{{ downloadSpeed }}</view>
		<view>上行速度:{{ uploadSpeed }}</view>
		<video src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"></video>
	</view>
</template>

<script>
	// 引用插件
	import { startMeasuringNetSpeed, stopMeasuringNetSpeed } from '@/uni_modules/xzh-netspeed'
	export default {
		data() {
			return {
				downloadSpeed: '',
				uploadSpeed: ''
			}
		},
		methods: {
			start() {
				startMeasuringNetSpeed(({ downloadSpeed, uploadSpeed }) => {
					console.log(downloadSpeed, uploadSpeed);
					if(downloadSpeed >= 1024) {
						downloadSpeed = `${(downloadSpeed / 1024).toFixed(2)} M/s`
					} else {
						downloadSpeed = `${downloadSpeed} K/s`
					}
					
					if(uploadSpeed >= 1024) {
						uploadSpeed = `${(uploadSpeed / 1024).toFixed(2)} M/s`
					} else {
						uploadSpeed = `${uploadSpeed} K/s`
					}
					
					this.downloadSpeed = downloadSpeed;
					this.uploadSpeed = uploadSpeed;
				})
			},
			stop() {
				stopMeasuringNetSpeed()
				this.downloadSpeed = '';
				this.uploadSpeed = '';
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
