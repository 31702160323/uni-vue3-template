<template>
	<view :style="grayscale">
        <slot></slot>
	</view>
</template>

<script lang="uts">
	export default {
		name: "xzh-vampix",
		props: {
			sat: {
				type: Number,
				default: 1
			},
		},
		computed: {
			grayscale() {
				return { filter: `grayscale(${this.sat * 100}%)` }
			}
		}
	}
</script>
