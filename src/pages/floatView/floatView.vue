<template>
	<view class="content">
		<button @click="addView">addView</button>
		<button @click="removeView">removeView</button>
	</view>
</template>

<script> // 引用插件
 import { addView, removeView } from "@/uni_modules/xzh-float-view";
	export default {
		methods: {
			addView() {
				addView()
			},
			removeView() {
				removeView()
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
