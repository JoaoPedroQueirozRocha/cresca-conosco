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
    // const AuthPlugin = await Auth0.init();


    const app = createApp(App)
        .use(vuetify)
        .use(router)
        // .use(AuthPlugin)

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
