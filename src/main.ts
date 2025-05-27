// import './assets/base.scss';
// import '@/services/axiosConfig';
// import { useAuthStore } from '@/stores/useAuthStore';


// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import ConfirmationService from 'primevue/confirmationservice';
// import ToastService from 'primevue/toastservice';
// import PrimeVue from 'primevue/config'

// async function initializeApp() {
//     const app = createApp(App)
//     app.use(PrimeVue)
//     app.use(ConfirmationService);
//     app.use(ToastService);
//     app.use(createPinia())
//     app.use(router)

//     const authStore = useAuthStore();

//     await authStore.loadUserFromToken();

//     app.mount('#app')
// }

// initializeApp();
import './assets/base.scss';
import '@/services/auth/axiosConfig';
import { useAuthStore } from '@/stores/auth/useAuthStore';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import { Theme } from '@primevue/themes'; // Import Theme
import material from '@primevue/themes/material'; // Import Material theme

async function initializeApp() {
    const app = createApp(App);

    // Configure PrimeVue with the Material theme
    app.use(PrimeVue, {
        theme: {
            preset: material, // Use Material theme
            options: {
                darkModeSelector: '.dark', // Optional: for dark mode support
                cssLayer: false // Optional: set to true if you want to use CSS layers
            }
        }
    });

    app.use(ConfirmationService);
    app.use(ToastService);
    app.use(createPinia());
    app.use(router);

    const authStore = useAuthStore();
    await authStore.loadUserFromToken();

    app.mount('#app');
}

initializeApp();