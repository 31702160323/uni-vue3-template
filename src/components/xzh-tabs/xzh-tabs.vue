<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
const props = defineProps<{
    current: number;
    list: string[];
}>();
const emit = defineEmits(['update:current']);

const isInit = ref(-1);

const resizeCallback = () => {
    isInit.value = -1;
    nextTick(() => {
        isInit.value = 0;
    });
};

onMounted(() => {
    isInit.value = 0;
    uni.onWindowResize(resizeCallback);
});

onUnmounted(() => {
    uni.onWindowResize(resizeCallback);
});
</script>

<script module="tab" lang="wxs" src="./xzh-tabs.wxs"></script>

<template>
    <view class="tabs">
        <view
            v-for="(item, index) in props.list"
            :key="item"
            class="tabs-item"
            :style="{ color: props.current === index ? '#007aff' : '#000' }"
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

<style scoped>
.tabs {
    position: relative;
    display: flex;
    width: 100%;

    /* width: 100vw; */
    height: 44px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
}

.tabs-item {
    color: var(--text-color);
    text-align: center;
    flex: 1;
    transition: all 500ms ease;
}

.tabs-link {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: #007aff;
    transition: all 500ms ease;
    border-radius: 1px;
}
</style>
