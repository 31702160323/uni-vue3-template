<template>
    <page-theme class="content">
        <xzh-tabs v-model:current="current" :list="tabList"></xzh-tabs>
        <view>
            {{ current }}
        </view>
        <image class="logo" src="/static/logo.png" @click="open" />
        <view class="text-area">
            <text class="title">{{ t('index.title') }}</text>
        </view>
        <button @click="setTheme">切换主题色</button>
    </page-theme>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Locale } from '@/locale/type'
/* #ifdef APP-PLUS */
import bluetooth from '@/utils/bluetooth'
/* #endif */

const store = useStore()
const { t } = useI18n()
const current = ref(0)
const tabList = ref(['首页', '发现', '我的'])

const title = ref('Hello')

const open = () => {
    /* #ifdef APP-PLUS */
    bluetooth.open()
    /* #endif */

    uni.setLocale(uni.getLocale() === Locale.en ? Locale.zh_Hans : Locale.en)
}

const setTheme = () => {
    store.commit('theme/setTheme', 'dark')
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
