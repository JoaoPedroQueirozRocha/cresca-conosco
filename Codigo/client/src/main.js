import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Auth0 from "./auth/index"

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import event from './util/event';

import '@/style/main.css';

const vuetify = createVuetify({
    components,
    directives
});

async function init() {
    const AuthPlugin = await Auth0.init({
        onRedirectCallback: appState => {
            router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
        },
        domain: import.meta.env.VITE_DOMAIN,
        clientId: import.meta.env.VITE_CLIENT_ID,
        redirectUri: window.location.origin
    });


    const app = createApp(App);
    app.use(AuthPlugin)
        .use(router)
        .use(vuetify)

    const confirm = (options) => {
        return new Promise((resolve) => {
            event.emit('open-confirm', options);

            const onConfirm = () => {
                event.off('confirm', onConfirm);
                event.off('cancel', onCancel);
                resolve(true);
            };

            const onCancel = () => {
                event.off('confirm', onConfirm);
                event.off('cancel', onCancel);
                resolve(false);
            };

            event.on('confirm', onConfirm);
            event.on('cancel', onCancel);
        });
    };
    app.config.globalProperties.$confirm = confirm;
    app.provide('confirm', confirm);

    const alert = (options) => {
        event.emit('show-alert', options);
        if (options.timeout) {
            setTimeout(() => {
                event.emit('close-alert', options);
            },
                options.timeout
            );
        }
    };
    app.config.globalProperties.$alert = alert;
    app.provide('alert', alert);

    app.mount('#app');
}
init()
