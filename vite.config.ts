import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    envDir: resolve(__dirname, 'env'),
    plugins: [uni()],
    resolve: {
        // 配置别名
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        terserOptions: {
            compress: {
                // 生产环境清除console
                drop_console: true,
                drop_debugger: true
            }
        }
    }
})
