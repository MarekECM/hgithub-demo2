import './assets/base.scss';
import '@/services/axiosConfig';
import { useAuthStore } from '@/stores/useAuthStore';


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

async function initializeApp() {
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)

    const authStore = useAuthStore();

    await authStore.loadUserFromToken();

    app.mount('#app')
}

initializeApp();
