import { createAuth0Client } from "@auth0/auth0-spa-js";
import { reactive, computed } from "vue";

let client;
const state = reactive({
    loading: true,
    isAuthenticated: false,
    user: {},
    error: null
})

async function handleRedirectCallback() {
    state.loading = true;

    try {
        await client.handleRedirectCallback();
        state.user = await client.getUser();
        state.isAuthenticated = true
    } catch (e) {
        state.error = e;
    } finally {
        state.loading = false;
    }

}

function loginWithRedirect() {
    return client.loginWithRedirect()
}

function getTokenSilently() {
    return client.getTokenSilently();
}

function logout() {
    return client.logout({
        returnTo: window.location.origin
    });
}

const authPlugin = {
    isAuthenticated: computed(() => state.isAuthenticated),
    getTokenSilently,
    loginWithRedirect,
    logout,
    handleRedirectCallback,
}

const routeGuard = (to, from, next) => {
    const { isAuthenticated, loginWithRedirect } = authPlugin;

    const verify = () => {
        if (to.meta.unprotected) {
            return next();
        }

        if (isAuthenticated.value) {
            return next(VITE_PROD_URL)
        }

        if(state.isAuthenticated == false){
            loginWithRedirect();
        }
    }

    if (!state.loading) {
        return verify();
    }

    watchEffect(() => {
        if (loading.value === false) {
            return verify();
        }
    });
}

async function init() {
    client = await createAuth0Client({
        domain: import.meta.env.VITE_DOMAIN,
        clientId: import.meta.env.VITE_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });
        if (window.location.search.includes("code=") || window.location.search.includes("state=")) {
            const { appState } = await client.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname)
        }
        state.isAuthenticated = await client.isAuthenticated();
        state.user = await client.getUser();
        state.loading = false;


    return {
        install: app => {
            app.provide("Auth", authPlugin);
        }
    }
}

export default { init, routeGuard }