import { createI18n } from 'vue-i18n'
import { Locale } from './type'

const files = import.meta.globEager('./*.json')

const messages: Record<string, any> = {}

for (const key in files) {
    if (
        key.indexOf('uni') === -1 &&
        Object.prototype.hasOwnProperty.call(files, key)
    ) {
        messages[key.slice(2, -5)] = files[key].default
    }
}

const i18n = createI18n({
    locale: uni.getLocale(), // 获取已设置的语言
    messages
})

uni.onLocaleChange((e) => {
    i18n.global.locale = e.locale || Locale.zh_Hans
})

// 延迟初始化国际化，避免小程序端有问题
setTimeout(() => uni.setLocale(uni.getLocale()))

export default i18n
