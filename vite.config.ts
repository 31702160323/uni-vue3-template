import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import { getEnvConfig, replaceManifest } from './env/utils'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    /** 解析后环境变量 */
    const config = getEnvConfig(mode)

    console.log(config)

    const object: Record<string, string> = {}
    if (config.VITE_APP_ID) object.appid = `"${config.VITE_APP_ID}"`
    if (config.VITE_WEIXIN_APP_ID) object['mp-weixin.appid'] = `"${config.VITE_WEIXIN_APP_ID}"`

    replaceManifest(object)

    return {
        root: './public/index.html',
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
    }
})
