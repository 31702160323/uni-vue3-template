<template>
	<view>
		<!-- <ad-rewarded-video adpid="1415326047" :loadnext="true" v-slot:default="{loading, error}" @load="onadload"
			@close="onadclose" @error="onaderror">
			<button :disabled="loading" :loading="loading">显示广告</button>
			<view v-if="error">{{error}}</view>
		</ad-rewarded-video> -->
		<button @click="callFunction">点击</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			onadload(e) {
				console.log('广告数据加载成功');
			},
			onadclose(e) {
				const detail = e.detail
				// 用户点击了【关闭广告】按钮
				if (detail && detail.isEnded) {
					// 正常播放结束
					console.log("onadclose " + detail.isEnded);
				} else {
					// 播放中途退出
					console.log("onadclose " + detail.isEnded);
				}
			},
			onaderror(e) {
				// 广告加载失败
				console.log("onaderror: ", e.detail);
			},
			callFunction() {
				uniCloud.callFunction({
					name: 'base',
				}).then((res) => {
					console.log('---', res);
				})
			}
		}
	};
</script>