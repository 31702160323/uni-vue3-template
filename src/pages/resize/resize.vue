<template>
    <view class="m-[-2.5rpx]">
        <view
            class="flex flex-col text-white gap-[5rpx] landscape:h-[calc(100vh-var(--window-top))] landscape:bg-red-400 portrait:bg-blue-400"
        >
            <view class="row">
                <view class="grid-item flex-1 portrait:h-[150rpx]"> 1 </view>
                <view class="grid-item flex-1 portrait:h-[150rpx]"> 2 </view>
                <view class="grid-item flex-1 portrait:h-[150rpx]"> 3 </view>
            </view>
            <view class="row">
                <view
                    class="grid-item landscape:flex-1 portrait:w-[calc(50vw-2.5rpx)] portrait:h-[200rpx]"
                >
                    4
                </view>
                <view
                    class="grid-item landscape:flex-1 portrait:w-[calc(50vw-2.5rpx)] portrait:h-[200rpx]"
                >
                    5
                </view>
                <view
                    class="grid-item landscape:flex-1 portrait:w-[calc(50vw-2.5rpx)] portrait:h-[200rpx]"
                >
                    6
                </view>
                <view
                    class="grid-item landscape:flex-1 portrait:w-[calc(50vw-2.5rpx)] portrait:h-[200rpx]"
                >
                    7
                </view>
            </view>
            <view class="row">
                <view class="grid-item flex-1 portrait:h-[250rpx]"> 8 </view>
                <view class="grid-item flex-1 portrait:h-[250rpx]"> 9 </view>
                <view
                    class="grid-item landscape:flex-[2] portrait:w-[750rpx] portrait:h-[250rpx]"
                >
                    10
                </view>
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
    @apply flex-1 flex flex-wrap justify-between;
}

.grid-item {
    margin: 2.5rpx;
    @apply flex flex-col items-center justify-center border border-solid border-gray-400;
}
</style>
