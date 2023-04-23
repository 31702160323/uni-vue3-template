type RouteActions =
    | 'navigateTo'
    | 'redirectTo'
    | 'reLaunch'
    | 'switchTab'
    | 'navigateBack';

type beforeCallback = (opts: CallbackRes) => boolean;
type afterCallback = (res: CallbackRes) => void;
type errorCallback = (error: CallbackRes) => void;
interface CallbackRes {
    readonly name: string;
    readonly [key: string]: any;
}
export class UniRoute {
    private beforeHooks = new Array<beforeCallback>();
    private afterHooks = new Array<afterCallback>();
    private errorCbs = new Array<errorCallback>();
    private static UNI_ROUTE_ACTIONS: RouteActions[] = [
        'navigateTo',
        'redirectTo',
        'reLaunch',
        'switchTab',
        'navigateBack'
    ];

    constructor() {
        UniRoute.UNI_ROUTE_ACTIONS.forEach((name) => {
            uni.addInterceptor(name, {
                invoke: (opts) => {
                    for (const callback of this.beforeHooks) {
                        const is = callback({ name, ...opts });
                        return is;
                    }
                },
                success: (res) => {
                    this.afterHooks.forEach((callback: afterCallback) => {
                        callback({ name, ...res });
                    });
                },
                fail: (error) => {
                    this.errorCbs.forEach((callback: errorCallback) => {
                        callback({ name, ...error });
                    });
                }
            });
        });
    }

    /**
     * 注册 全局前置守卫
     * @param {Function} callback 回调函数
     */
    beforeEach(callback: beforeCallback) {
        return registerHook(this.beforeHooks, callback);
    }

    /**
     * 注册 全局后置守卫
     * @param {Function} callback 回调函数
     */
    afterEach(callback: afterCallback) {
        return registerHook(this.afterHooks, callback);
    }

    /**
     * 注册 错误回调
     * @param {Function} errCb 错误回调函数
     */
    onError(errCb: errorCallback) {
        return registerHook(this.errorCbs, errCb);
    }
}

/**
 * 注册 钩子
 * @param {Function[]} list 钩子列表
 * @param {Function} callback 回调函数
 * @returns {Function} 用于注销当前注册钩子的闭包函数
 */
const registerHook = function <T>(list: T[], callback: T) {
    list.push(callback);

    return () => {
        const index = list.indexOf(callback);

        if (index !== -1) list.splice(index, 1);
    };
};
