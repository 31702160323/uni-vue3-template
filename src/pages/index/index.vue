<template>
    <view class="content page-theme" :data-theme="themeColor">
        <xzh-tabs v-model:current="current" :list="tabList" />
        <view>
            {{ current }}
        </view>
        <image class="logo" src="/static/logo.png" @click="open" />
        <view class="text-area">
            <text class="title">
                {{ t('index.title') }}
            </text>
        </view>
        <button @click="setTheme(themeColor === '' ? 'dark' : '')">
            切换主题色
        </button>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Locale } from '@/locale/types'
import useTheme from '@/hooks/useTheme'
/* #ifdef APP-PLUS */
import bluetooth from '@/utils/bluetooth'
/* #endif */

const { t } = useI18n()
const { themeColor, setTheme } = useTheme()
const current = ref(0)
const tabList = ref(['首页', '发现', '我的'])

const open = () => {
    /* #ifdef APP-PLUS */
    bluetooth.open()
    /* #endif */

    uni.setLocale(uni.getLocale() === Locale.en ? Locale.zh_Hans : Locale.en)
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
