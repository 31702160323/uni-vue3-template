/* eslint-disable no-param-reassign */

export default {
    namespaced: true,
    state: { themeColor: '' },
    mutations: {
        setTheme(state: any, color: string) {
            state.themeColor = color
        }
    }
}
