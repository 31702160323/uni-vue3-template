<template>
    <view class="tabs">
        <view
            v-for="(item, index) in props.list"
            :key="item"
            class="tabs-item"
            @click="emit('update:current', index)"
        >
            {{ item }}
        </view>
        <view
            v-if="isInit >= 0"
            class="tabs-link"
            :init="isInit"
            :prop="current"
            :change:init="tab.init"
            :change:prop="tab.toggle"
        ></view>
    </view>
</template>

<script module="tab" lang="wxs" src="./xzh-tabs.wxs"></script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
    current: number
    list: string[]
}>()
const emit = defineEmits(['update:current'])

const isInit = ref(-1)
onMounted(() => {
    isInit.value = 0
})
</script>

<style scoped>
.tabs {
    position: relative;
    display: flex;
    width: 100vw;
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
