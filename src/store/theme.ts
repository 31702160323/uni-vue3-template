import { defineStore } from 'pinia'

const themeColor = uni.getStorageSync('themeColor')

export const useThemeStore = defineStore('theme', {
    state: () => ({ themeColor: themeColor }),
    // 也可以这样定义
    actions: {
        setTheme(color: string) {
            this.$state.themeColor = color
            uni.setStorageSync('themeColor', color)
        }
    }
})
