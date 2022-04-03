<template>
    <view class="content">
        <xzh-tabs v-model:current="current" :list="tabList"></xzh-tabs>
        <view>
            {{ current }}
        </view>
        <image class="logo" src="/static/logo.png" @click="open" />
        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
/* #ifdef APP-PLUS */
import bluetooth from '@/utils/bluetooth'
/* #endif */

const current = ref(0)
const tabList = ref(['首页', '发现', '我的'])

const title = ref('Hello')

const open = () => {
    /* #ifdef APP-PLUS */
    bluetooth.open()
    /* #endif */
}
</script>

<style>
.content {
    display: flex;
    justify-content: center;
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
    color: #8f8f94;
}
</style>
