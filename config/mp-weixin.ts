import copy from 'rollup-plugin-copy';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';

export default {
    plugins: [
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
    ]
};
