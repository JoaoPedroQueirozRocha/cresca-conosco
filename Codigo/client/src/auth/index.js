import { createAuth0 } from "@auth0/auth0-vue";
import { reactive } from "vue";

const AuthPlugin = {
    install: (app, options) => {
        const auth0 = createAuth0({
            domain: import.meta.env.VITE_DOMAIN,
            clientId: import.meta.env.VITE_CLIENT_ID,
            authorizationParams: {
                redirect_uri: `${import.meta.env.VITE_DEFAULT_URL}`
            }
        });

        const authState = reactive({
            isAuthenticated: false,
            user: {},
            isLoading: true,
        });

        auth0.isAuthenticated().then(())
    }
}