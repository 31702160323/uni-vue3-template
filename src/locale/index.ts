import { createI18n } from 'vue-i18n'

const files = import.meta.globEager('./*.json')

const messages: Record<string, any> = {}

for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        messages[key.slice(2, -5)] = files[key].default
    }
}

const i18n = createI18n({
    locale: uni.getLocale(), // 获取已设置的语言
    messages
})

export default i18n
