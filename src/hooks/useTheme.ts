import { computed } from 'vue'
import { useThemeStore } from '@/store/theme'

export default function useTheme() {
    const store = useThemeStore()
    const themeColor = computed(() => store.themeColor)

    const setTheme = (theme: string) => {
        store.setTheme(theme)
    }

    return {
        themeColor,
        setTheme
    }
}
