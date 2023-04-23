import { ref } from 'vue';
import type { Ref } from 'vue';

class Timer {
    private callback: () => void;
    private timer: Ref<number>;
    constructor(time: number, callback: (time: number) => void) {
        this.timer = ref(time);
        this.callback = function () {
            setTimeout(() => {
                callback(this.timer.value);
                if (this.timer.value === 0) return;
                this.timer.value--;
                this.callback();
            }, 1000);
        };
    }

    stop() {
        this.timer.value = 0;
    }

    start() {
        this.callback();
    }
}

export default function useTimer() {
    const createTimer = function (callback: (time: number) => void, time = 60) {
        return new Timer(time, callback);
    };
    return {
        createTimer
    };
}
