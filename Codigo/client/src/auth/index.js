import { createAuth0Client } from "@auth0/auth0-spa-js";
import { reactive, computed } from "vue";

let client;
const state = reactive({
    loading: true,
    isAuthenticated: false,
    user: {}
})

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
            return next()
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

    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        console.log('log');
    } else {
        return client.loginWithRedirect();
    }

    return {
        install: app => {
            app.provide("Auth", authPlugin);
        }
    }
}

export default { init, routeGuard }