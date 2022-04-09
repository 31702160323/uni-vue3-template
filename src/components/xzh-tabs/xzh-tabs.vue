<template>
    <view class="tabs" :change:init="tab.init" :init="isInit">
        <view
            v-for="(item, index) in props.list"
            :key="item"
            class="tabs-item"
            @click="emit('update:current', index)"
        >
            {{ item }}
        </view>
        <view
            class="tabs-link"
            :change:prop="tab.toggle"
            :prop="current"
        ></view>
    </view>
</template>

<script module="tab" lang="wxs" src="./xzh-tabs.wxs"></script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isInit = ref(-1)
const props = defineProps<{
    current: number
    list: string[]
}>()
const emit = defineEmits(['update:current'])

/* #ifdef H5 */
onMounted(() => {
    isInit.value = 0
})
/* #endif */
</script>

<style scoped>
.tabs {
    position: relative;
    display: flex;
    width: 750rpx;
    height: 80rpx;
    justify-content: center;
    align-items: center;
}

.tabs-item {
    color: var(--text-color);
    text-align: center;
    flex: 1;
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
