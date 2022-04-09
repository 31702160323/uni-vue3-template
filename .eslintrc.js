module.exports = {
    root: true,
    env: {
        browser: true,
        es2022: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint', 'prettier', 'import'],
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    globals: {
        /** 避免uni报错 */
        uni: true,
        UniApp: true
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'none',
                printWidth: 80,
                tabWidth: 4,
                semi: false,
                singleQuote: true,
                endOfLine: 'auto'
            }
        ],
        // 解决vite+airbnb导致eslint报错import/extensions
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'no-undef': 'off',
        'func-names': 'off',
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-bitwise': 'off',
        'no-plusplus': 'off',
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off',
        'class-methods-use-this': 'off'
    }
}
