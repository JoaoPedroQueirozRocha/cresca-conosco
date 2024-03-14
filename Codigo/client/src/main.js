import { createApp } from 'vue';
import { createAuth0 } from "@auth0/auth0-vue"
import App from './App.vue';
import router from './router';

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

const app = createApp(App)
    .use(vuetify)
    .use(router)
    .use(createAuth0({
        domain: import.meta.env.VITE_DOMAIN,
        clientId: import.meta.env.VITE_CLIENT_ID,
        authorizationParams: {
            redirect_uri: `${import.meta.env.VITE_DEFAULT_URL}`
        }
    }));

const alert = (options) => {
    event.emit('show-alert', options);
    if (options.timeout) {
        setTimeout(() => 
            {
                event.emit('close-alert', options);
            }, 
            options.timeout
        );
    }
};
app.config.globalProperties.$alert = alert;
app.provide('alert', alert);

app.mount('#app');
