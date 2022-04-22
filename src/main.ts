import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import i18n from './locale'

export function createApp() {
    const app = createSSRApp(App)
    app.use(i18n)
    app.use(Pinia.createPinia())
    return {
        app,
        Pinia
    }
}
