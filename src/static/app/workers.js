/* eslint-disable prettier/prettier */
// 监听事件
console.log('加载js文件');
if (window.worker) {
  workerJSBridgeReady()
} else {
  document.addEventListener('WorkerJSBridgeReady', workerJSBridgeReady, false);
}

function workerJSBridgeReady() {
  worker.onMessage((msg) => {
    console.log('h5:', msg);
    worker.postMessage(msg);
  })
}