let worker: PlusWebviewWebviewObject | null;
type WorkerCallback = (message?: any) => void;
const killQueue: WorkerCallback[] = [];
let messageQueue: WorkerCallback[] = [];

plus['globalEvent'].addEventListener('plusMessage', (e: any) => {
    if (worker && worker['__uuid__'] === e.originId) {
        const args = e.data.args || {};
        for (let index = 0, len = messageQueue.length; index < len; index++) {
            messageQueue[index](args.data.arg);
        }
    }
});

export const createWorker = (url: string) => {
    if (!worker) {
        worker = plus.webview.create(
            '/static/app/hybrid/html/index.html',
            '__worker__',
            {
                opacity: 0,
                width: '0px',
                height: '0px',
                blockNetworkImage: true,
                webviewBGTransparent: true
            }
        );
        worker.setBlockNetworkImage(true);
        worker.setContentVisible(false);
        worker.setVisible(false);

        if (uni.getSystemInfoSync().platform == 'android') {
            worker.appendJsFile(url);
        } else if (uni.getSystemInfoSync().platform == 'ios') {
            worker.addEventListener('loaded', () => {
                worker?.evalJS(
                    `var plusReady = function(){const currentWebview = plus.webview.currentWebview();currentWebview.appendJsFile('${url}');}`
                );
                worker?.evalJS(
                    `if(window.plus){plusReady();} else {document.addEventListener("plusready", plusReady(), false);}`
                );
            });
        }
        worker.overrideUrlLoading({}, (res) => {
            console.log('拦截请求', res);
        });
        worker.addEventListener('close', (res) => {
            console.log('worker关闭', res);
            for (let index = 0, len = killQueue.length; index < len; index++) {
                killQueue[index]();
            }
            terminate();
        });

        plus.webview.all()[0].append(worker);
    } else {
        worker.reload(false);
    }
};

export const onMessage = (callback: WorkerCallback) => {
    messageQueue.push(callback);
};

export const onProcessKilled = (callback: WorkerCallback) => {
    killQueue.push(callback);
};

export const postMessage = (message: any) => {
    if (worker) {
        worker.evalJS(`worker.plusMessage(${JSON.stringify(message)})`);
    }
};

export const terminate = () => {
    if (worker) {
        messageQueue = [];
        worker.removeFromParent();
        worker.close();
        worker = null;
    }
};
