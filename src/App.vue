<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { addShortcuts } from '@/utils/shortcuts'

if (uni.getSystemInfoSync().platform == 'android') {
    //添加 Shortcuts 方法
    console.log(
        'Shortcuts',
        addShortcuts(plus.android.runtimeMainActivity(), [
            {
                id: 'index',
                icon: plus.io.convertLocalFileSystemURL('/static/logo.png'), //本地图片,要使用平台绝对路径
                path: '/pages/index/index',
                shortLabel: '系统设置',
                title: '系统设置'
            }
        ])
    )
}

onLaunch(() => {
    console.log('App Launch')
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
</script>

<style>
@import url('@/common/theme.css');
</style>
