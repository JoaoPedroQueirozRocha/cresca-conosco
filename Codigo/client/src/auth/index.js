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
        error
        state.loading = false;
    }

    window.history.replaceState({}, document.title, window.location.pathname);
}

function loginWithRedirect() {
    return client.loginWithRedirect()
}

function getTokenSilently() {
    return client.getTokenSilently();
}

function logout() {
    console.log("logout func");
    return client.logout();
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
    console.log("route guard");

    const verify = () => {
        if (to.meta.unprotected) {
            console.log("unpro")
            return next();
        }

        if (isAuthenticated.value) {
            console.log("isAuth");
            return next(VITE_DEFAULT_URL)
        }

        loginWithRedirect();
    }

    if (!loading.value) {
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
            redirect_uri: import.meta.env.VITE_DEFAULT_URL
        }
    });

    try {
        // If the user is returning to the app after authentication
        if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
            const { appState } = await client.handleRedirectCallback();

            console.log("logged in", appState)
        } else {
            await client.loginWithRedirect()
        }
    } catch (e) {
        state.error = e;
    } finally {
        // window.history.replaceState({}, document.title, import.meta.env.VITE_DEFAULT_URL);
        // window.location.replace(import.meta.env.VITE_DEFAULT_URL)
        state.isAuthenticated = await client.isAuthenticated();
        state.user = await client.getUser();
        state.loading = false;
    }


    return {
        install: app => {
            app.provide("Auth", authPlugin);
        }
    }
}

export default { init, routeGuard }