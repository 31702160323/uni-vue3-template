import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';
import { replaceManifest } from './env/utils';
import weixin from './config/mp-weixin';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    /** 解析后环境变量 */
    const ENV = loadEnv(mode, './env');
    const config = { plugins: [] };

    if (process.env.UNI_PLATFORM === 'mp-weixin') {
        Object.assign(config, weixin);
    }

    console.log(ENV);
    console.log(mode);
    console.log(command);
    console.log(process.env.UNI_PLATFORM);
    console.log(config);

    const object: Record<string, string> = {};
    if (ENV.VITE_APP_ID) object.appid = `"${ENV.VITE_APP_ID}"`;
    if (ENV.VITE_WEIXIN_APP_ID)
        object['mp-weixin.appid'] = `"${ENV.VITE_WEIXIN_APP_ID}"`;

    // 动态修改 manifest.json
    replaceManifest(object);

    return {
        envDir: resolve(__dirname, 'env'),
        plugins: [uni(), WindiCSS(), ...config.plugins],
        resolve: {
            // 配置别名
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        esbuild: {
            // 生产环境清除console
            drop: mode === 'production' ? ['console', 'debugger'] : []
        },
        build: {
            minify: mode === 'production' ? 'esbuild' : false
            // minify: mode === 'production' ? 'terser' : false,
            // terserOptions: {
            //     compress: {
            //         drop_console: mode === 'production',
            //         drop_debugger: mode === 'production'
            //     }
            // }
        }
    };
});
