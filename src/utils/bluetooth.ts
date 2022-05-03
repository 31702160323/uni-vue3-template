const enum BluetoothCode {
    // 正常
    OK = 0,
    // 已连接
    ALREADY_CONNECT = -1,
    // 未初始化蓝牙适配器
    NOT_INIT = 10000,
    // 当前蓝牙适配器不可用
    NOT_AVAILABLE = 10001,
    // 没有找到指定设备
    NO_DEVICE = 10002,
    // 连接失败
    CONNECTION_FAIL = 10003,
    // 没有找到指定服务
    NO_SERVICE = 10004,
    // 没有找到指定特征值
    NO_CHARACTERISTIC = 10005,
    // 当前连接已断开
    NO_CONNECTION = 10006,
    // 当前特征值不支持此操作
    PROPERTY_NOT_SUPPORT = 10007,
    // 其余所有系统上报的异常
    SYSTEM_ERROR = 10008,
    // Android 系统特有，系统版本低于 4.3 不支持 BLE
    SYSTEM_NOT_SUPPORT = 10009,
    // 已连接
    ALREADY_CONNECT_2 = 10010,
    // 配对设备需要配对码
    NEED_PIN = 10011,
    // 连接超时
    OPERATE_TIME_OUT = 10012,
    // 连接 deviceId 为空或者是格式不正确
    INVALID_DATA = 10013
}

class Bluetooth {
    constructor() {
        uni.onBluetoothAdapterStateChange((res) => {
            uni.$emit('onBluetoothAdapterStateChange', res);
            uni.showToast({
                title: `蓝牙已${res.available ? '开启' : '关闭'}`,
                icon: res.available ? 'success' : 'error',
                duration: 3000
            });
        });
        uni.onBluetoothDeviceFound((devices) => {
            console.log('5. 搜索成功, 目标设备为：', devices);
            uni.$emit('onBluetoothDeviceFound', devices);
        });
    }

    open(): Promise<any> {
        return new Promise((resolve, reject) => {
            uni.openBluetoothAdapter({
                success: (res) => {
                    this.getBluetoothDevices();
                    resolve(res);
                },
                // errno, errCode, errMsg
                fail: (error) => {
                    Bluetooth.factory(error.errCode as BluetoothCode);
                    reject(error);
                },
                complete: () => {
                    this.start();
                }
            });
        });
    }

    start() {
        uni.startBluetoothDevicesDiscovery({
            success: (res) => {
                console.log('4. 开始查找设备', res);
                // 30s 停止搜索
                const timer = setTimeout(() => {
                    this.stop();
                    clearTimeout(timer);
                }, 30000);
            },
            fail(error) {
                console.log('4.1-err', error);
            }
        });
    }

    stop() {
        uni.stopBluetoothDevicesDiscovery({
            success(res) {
                console.log('6. 蓝牙停止查找', res);
            },
            fail: (err) => {
                console.log('6.1-err', err);
            }
        });
    }

    close() {
        uni.closeBluetoothAdapter({});
    }

    getConnectedBluetoothDevices(services: Array<string> = []) {
        uni.getConnectedBluetoothDevices({
            services,
            success(res) {
                console.log(res);
            }
        });
    }

    getBluetoothDevices() {
        uni.getBluetoothDevices({
            success(res) {
                console.log(res);
            }
        });
    }

    getBluetoothAdapterState() {
        uni.getBluetoothAdapterState({
            success(res) {
                console.log(res);
            },
            fail(error) {
                console.log('搜索蓝牙设备失败', error);
            }
        });
    }

    private static factory(code: BluetoothCode) {
        switch (code) {
            case BluetoothCode.OK:
                console.log(BluetoothCode.OK);
                break;
            case BluetoothCode.ALREADY_CONNECT:
                console.log(BluetoothCode.ALREADY_CONNECT);
                break;
            case BluetoothCode.NOT_AVAILABLE:
                console.log(BluetoothCode.NOT_AVAILABLE);
                uni.showModal({
                    title: '提示',
                    content: '请打开蓝牙',
                    showCancel: false
                });
                break;
            case BluetoothCode.NO_DEVICE:
                console.log(BluetoothCode.NO_DEVICE);
                break;
            case BluetoothCode.NO_SERVICE:
                console.log(BluetoothCode.NO_SERVICE);
                break;
            case BluetoothCode.NO_CHARACTERISTIC:
                console.log(BluetoothCode.NO_CHARACTERISTIC);
                break;
            case BluetoothCode.NO_CONNECTION:
                console.log(BluetoothCode.NO_CONNECTION);
                break;
            case BluetoothCode.PROPERTY_NOT_SUPPORT:
                console.log(BluetoothCode.PROPERTY_NOT_SUPPORT);
                break;
            case BluetoothCode.ALREADY_CONNECT_2:
                console.log(BluetoothCode.ALREADY_CONNECT_2);
                break;
            case BluetoothCode.NEED_PIN:
                console.log(BluetoothCode.NEED_PIN);
                break;
            case BluetoothCode.OPERATE_TIME_OUT:
                console.log(BluetoothCode.OPERATE_TIME_OUT);
                break;
            case BluetoothCode.INVALID_DATA:
                console.log(BluetoothCode.INVALID_DATA);
                break;
            default:
                break;
        }
    }
}

export default new Bluetooth();
