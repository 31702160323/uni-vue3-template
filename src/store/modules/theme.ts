/* eslint-disable no-param-reassign */

const themeColor = uni.getStorageSync('themeColor')

interface StateType {
    themeColor: string
}

export default {
    namespaced: true,
    state: { themeColor: themeColor } as StateType,
    mutations: {
        setTheme(state: StateType, color: string) {
            state.themeColor = color
            uni.setStorageSync('themeColor', color)
        }
    }
}
