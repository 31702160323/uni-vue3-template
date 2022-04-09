<template>
    <view class="page-theme" :data-theme="themeColor">
        <slot></slot>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const themeColor = computed(() => store.state.theme.themeColor)
</script>
