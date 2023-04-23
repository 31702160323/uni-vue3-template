<template>
    <view class="content page-theme" :data-theme="themeColor">
        <xzh-tabs v-model:current="current" :list="tabList" />
        <view
            class="my-1 w-4/5 h-[100rpx] leading-[100rpx] text-center border border-black border-solid"
              @click="open" 
        >
            切换语言
        </view>
        <view
            class="my-1 w-4/5 h-[100rpx] leading-[100rpx] text-center border border-black border-solid"
             @click="setTheme(themeColor === '' ? 'dark' : '')"
        >
            切换主题色
        </view>
        <view
            class="my-1 w-4/5 h-[100rpx] leading-[100rpx] text-center border border-black border-solid"
            @click="toPage('/pages/resize/resize')"
        >
            你好，世界！
        </view>
        <view
            class="my-1 w-4/5 h-[100rpx] leading-[100rpx] text-center border border-black border-solid"
            @click="toPage('/pages/echarts/echarts')"
        >
            echarts
        </view>
        <!-- #ifdef APP-PLUS -->
        <view
            class="my-1 w-4/5 h-[100rpx] leading-[100rpx] text-center border border-black border-solid"
             @click="setSat"
        >
            切换黑白
        </view>
        <view
            class="my-1 w-4/5 h-[100rpx] leading-[100rpx] text-center border border-black border-solid"
             @click="toPage('/pages/netspeed/netspeed')"
        >
            netspeed
        </view>
        <view
            class="my-1 w-4/5 h-[100rpx] leading-[100rpx] text-center border border-black border-solid"
             @click="toPage('/pages/floatView/floatView')"
        >
            floatView
        </view>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Locale } from '@/locale/types';
import useTheme from '@/hooks/useTheme';
import { setWindowSaturation } from '@/uni_modules/xzh-WindowSaturation/js_sdk/index'

const sat = ref(1);
const { themeColor, setTheme } = useTheme();
const current = ref(0);
const tabList = ref(['首页', '发现', '我的']);

const open = () => {
    uni.setLocale(uni.getLocale() === Locale.en ? Locale.zh_Hans : Locale.en);
};

const toPage = (url: string) => {
    uni.navigateTo({
        url
    });
};

function setSat() {
	sat.value = !!sat.value ? 0 : 1
	setWindowSaturation(sat.value)
}
</script>

<style>
.content {
    display: flex;
    min-height: 100vh;
    color: var(--text-color);
    background: var(--theme-color);
    align-items: center;
    flex-direction: column;
}

.logo {
    width: 200rpx;
    height: 200rpx;
    margin: 200rpx auto 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
}
</style>
