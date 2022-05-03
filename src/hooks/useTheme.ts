import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/theme';

export default function useTheme() {
    const store = useThemeStore();
    const { themeColor } = storeToRefs(store);

    const setTheme = (theme: string) => {
        store.setTheme(theme);
    };

    return {
        themeColor,
        setTheme
    };
}
