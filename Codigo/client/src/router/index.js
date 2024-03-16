import { createRouter, createWebHistory } from 'vue-router';
import Auth0 from '../auth/index.js'
const routes = [
    {
        path: '/',
        name: 'App',
        // component: () => import('@/App.vue'),
        beforeEnter: Auth0.routeGuard

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