export default {
    preflight: false,
    prefixer: false,
    extract: {
        // 忽略部分文件夹
        exclude: ['node_modules', '.git', 'dist']
    },
    theme: {
        extend: {
            screens: {
                portrait: { raw: '(orientation: portrait)' },
                landscape: { raw: '(orientation: landscape)' }
            }
        }
    },
    corePlugins: {
        // 禁用掉在小程序环境中不可能用到的 plugins
        container: false
    }
};
