import { createRouter, createWebHistory } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
const routes = [
    {
        path: '/',
        name: 'App',
        // component: () => import('@/App.vue'),
        beforeEnter: (to, from, next) => {
            const { isAuthenticated, loginWithRedirect } = useAuth0();
                if(isAuthenticated){
                    next();
                }else{
                    loginWithRedirect();
                }
            
        }
    },
    {
        path: '/perfil',
        name: 'Perfil',
        props: true,
        component: () => import('@/view/perfil/Index.vue'),
        beforeEnter: () => {
            //função do auth0
        }
    },
    {
        path: '/gado',
        name: 'Gado',
        props: true,
        // component: () => import('@/App.vue'),
        beforeEnter: () => {
            //função do auth0
        }
    },
    {
        path: '/financas',
        name: 'Finanças',
        props: true,
        // component: () => import('@/App.vue'),
        beforeEnter: () => {
            //função do auth0
        }
    },
    {
        path: '/funcionarios',
        name: 'Funcionários',
        props: true,
        // component: () => import('@/App.vue'),
        beforeEnter: () => {
            //função do auth0
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;