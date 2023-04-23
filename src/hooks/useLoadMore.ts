import { ref } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';

export enum StatusType {
    more = 'more',
    loading = 'loading',
    noMore = 'noMore'
}

export default function useLoadMore(
    callback: () => StatusType | Promise<StatusType>
) {
    const status = ref<StatusType>(StatusType.more);

    const loadMore = async () => {
        if (
            status.value === StatusType.loading ||
            status.value === StatusType.noMore
        ) {
            return;
        }
        status.value = StatusType.loading;
        const res = callback();
        if (typeof res === 'string') {
            status.value = res;
        } else if (res instanceof Promise<StatusType>) {
            status.value = await res;
        }
    };

    onReachBottom(() => loadMore());

    return {
        status,
        loadMore
    };
}
