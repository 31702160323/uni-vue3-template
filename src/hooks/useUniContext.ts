import { getCurrentInstance } from 'vue';

export default function useUniContext() {
    const context: any = getCurrentInstance()?.proxy;
    // const context: any = getCurrentPages().pop();
    const eventChannel: any = context?.getOpenerEventChannel();
    const currentWebview: PlusWebviewWebviewObject = context?.$getAppWebview();

    return {
        context,
        eventChannel,
        currentWebview
    };
}
