<template>
    <view>
        <view class="row">
            <view class="col">
                <view class="col-item col-item-1">1</view>
                <view class="col-item col-item-1">2</view>
                <view class="col-item col-item-1">3</view>
            </view>
            <view class="col">
                <view class="col-item col-item-2">4</view>
                <view class="col-item col-item-2">5</view>
                <view class="col-item col-item-2">6</view>
                <view class="col-item col-item-2">7</view>
            </view>
            <view class="col">
                <view class="col-item col-item-3">8</view>
                <view class="col-item col-item-3">9</view>
                <view class="col-item col-item-3-2">10</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'ResizePage'
};
</script>

<style>
view {
    box-sizing: border-box;
}

.row {
    display: flex;
    color: white;
    flex-direction: column;
    gap: 5rpx;
}

.col {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 5rpx;
}

.col-item {
    display: flex;
    flex-direction: column;
    border: 1rpx solid gray;
    align-items: center;
    justify-content: center;
}

.col-item-3 {
    flex: 1;
}

/* 横屏 */
@media all and (orientation: landscape) {
    .row {
        height: calc(100vh - var(--window-top));
        background: red;
    }

    .col-item-1 {
        flex: 1;
    }

    .col-item-2 {
        flex: 1;
    }

    .col-item-3-2 {
        flex: 2;
    }
}

/* 竖屏 */
@media all and (orientation: portrait) {
    .row {
        background: blue;
    }

    .col-item-1 {
        flex: 1;
        height: 150rpx;
    }

    .col-item-2 {
        width: calc(50% - 2.5rpx);
        height: 200rpx;
    }

    .col-item-3 {
        height: 250rpx;
    }

    .col-item-3-2 {
        width: 750rpx;
        height: 250rpx;
    }
}
</style>
