module.exports = {
    root: true,
    plugins: ['stylelint-order'],
    customSyntax: 'postcss-html',
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-prettier'
    ],
    rules: {
        // 使用4格缩进
        indentation: 4,
        // 可以使用rpx单位
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }]
    },
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
}
