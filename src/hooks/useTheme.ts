import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useTheme() {
    const store = useStore()
    const themeColor = computed(() => store.state.theme.themeColor)

    const setTheme = (theme: string) => {
        store.commit('theme/setTheme', theme)
    }

    return {
        themeColor,
        setTheme
    }
}
