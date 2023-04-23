import { onUnmounted } from 'vue';
import { onBackPress } from '@dcloudio/uni-app';
import useUniContext from '@/hooks/useUniContext';

export default function useWebView() {
    const webviewList = new Map<string, PlusWebviewWebviewObject>();

    const { currentWebview } = useUniContext();

    const create = (
        url: string,
        id: string,
        styles?: PlusWebviewWebviewStyles,
        extras?: any
    ) => {
        const wv = plus.webview.create(url, id, styles, extras);
        webviewList.set(id, wv);
        return wv;
    };

    onUnmounted(() => {
        webviewList.forEach((wv) => {
            plus.webview.close(wv);
        });
    });

    onBackPress(({ from }) => {
        if (from === 'navigateBack') return false;
        currentWebview.children().forEach((wv: PlusWebviewWebviewObject) => {
            if (wv.isVisible()) {
                wv.canBack(({ canBack }) => {
                    if (canBack) {
                        wv.back();
                    } else {
                        uni.navigateBack({});
                    }
                });
            }
        });
        return true;
    });

    return {
        create,
        webviewList,
        currentWebview
    };
}
