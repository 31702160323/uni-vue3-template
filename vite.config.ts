import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import WindiCSS from 'vite-plugin-windicss';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';
import { replaceManifest } from './env/utils';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    console.log(command);

    /** 解析后环境变量 */
    const config = loadEnv(mode, './env');

    console.log(config);

    const object: Record<string, string> = {};
    if (config.VITE_APP_ID) object.appid = `"${config.VITE_APP_ID}"`;
    if (config.VITE_WEIXIN_APP_ID)
        object['mp-weixin.appid'] = `"${config.VITE_WEIXIN_APP_ID}"`;

    // 动态修改 manifest.json
    replaceManifest(object);

    const plugins = [
        uni(),
        WindiCSS(),
        MiniProgramTailwind(),
        copy({
            targets: [
                {
                    src: 'src/cloudfunctions/**/*',
                    dest: `dist/${
                        process.env.NODE_ENV === 'production' ? 'build' : 'dev'
                    }/${process.env.UNI_PLATFORM}/cloudfunctions`
                }
            ]
        })
    ];

    return {
        envDir: resolve(__dirname, 'env'),
        plugins: plugins,
        resolve: {
            // 配置别名
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    // 生产环境清除console
                    drop_console: process.env.NODE_ENV === 'production',
                    drop_debugger: process.env.NODE_ENV === 'production'
                }
            }
        }
    };
});
