import { createI18n } from 'vue-i18n';
import { Locale } from './types';

const files = import.meta.globEager('./*.json');

const messages = {};

for (const key in files) {
    if (
        key.indexOf('uni') === -1 &&
        Object.prototype.hasOwnProperty.call(files, key)
    ) {
        messages[key.slice(2, -5)] = files[key].default;
    }
}

const i18n = createI18n({
    legacy: false,
    locale: uni.getLocale() in Locale ? uni.getLocale() : Locale.zh_Hans, // 获取已设置的语言
    messages
});

uni.onLocaleChange((e) => {
    i18n.global.locale.value = e.locale || Locale.zh_Hans;
});

export default i18n;
