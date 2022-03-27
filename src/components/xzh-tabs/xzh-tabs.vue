<template>
    <view class="tabs" :change:init="tab.init" :init="isInit">
        <view
            v-for="(item, index) in list"
            :key="item"
            class="tabs-item"
            @click="emit('update:current', index)"
        >
            {{ item }}
        </view>
        <view class="tabs-link" :change:prop="tab.toggle" :prop="current"></view>
    </view>
</template>

<script module="tab" lang="wxs" src="./xzh-tabs.wxs"></script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isInit = ref(-1)
const props = defineProps({
    current: {
        type: Number,
        default: 0
    },
    list: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['update:current'])

/* #ifdef H5 */
onMounted(() => {
    isInit.value = 0
})
/* #endif */
</script>

<style lang="scss" scoped>
.tabs {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 750rpx;
    height: 80rpx;
}
.tabs-item {
    flex: 1;
    text-align: center;
}
.tabs-link {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5rpx;
    background: #007aff;
    transition: all 500ms ease;
}
</style>
