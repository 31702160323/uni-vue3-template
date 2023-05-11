<template>
	<view>
		<slot />
	</view>
</template>
<script lang="uts">
	import View from 'android.view.View'
	import FrameLayout from 'android.widget.FrameLayout'
	import ColorMatrix from 'android.graphics.ColorMatrix'
	import ColorMatrixColorFilter from 'android.graphics.ColorMatrixColorFilter'
	import Paint from 'android.graphics.Paint'

	export default {
		name: "xzh-vampix",
		props: {
			"sat": {
				type: Number,
				default: 1
			},
		},
		watch: {
			sat(value : Number) {
				const cm = new ColorMatrix();
				cm.setSaturation(value.toFloat());
				const paint = new Paint();
				paint.setColorFilter(new ColorMatrixColorFilter(cm));
				this.$el!.setLayerType(View.LAYER_TYPE_HARDWARE, paint);
			},
		},
		data() {
			return {}
		},
		NVLoad() : FrameLayout {
			//必须实现，注意：容器组件需要返回ViewGroup或其子类
			const contentLayout = new FrameLayout(this.$androidContext)
			return contentLayout
		}
	}
</script>