import { createRouter, createWebHistory } from 'vue-router';
import Auth0 from '../auth/index.js'
const routes = [
    {
        path: '/perfil',
        alias: '/',
        name: 'Perfil',
        props: true,
        component: () => import('@/view/perfil/Index.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/gado',
        name: 'Gado',
        props: true,
        component: () => import('@/view/gado/Index.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/gado',
        name: 'NovaVaca',
        props: true,
        component: () => import('@/view/gado/NovaVaca.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas',
        name: 'Finanças',
        props: true,
        component: () => import('@/view/financas/Index.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/despesa/:id',
        name: 'DespesaEditar',
        props: { isEdicao: true },
        component: () => import('@/view/financas/components/EditarDespesa.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/despesa',
        name: 'DespesaCriar',
        props: true,
        component: () => import('@/view/financas/components/EditarDespesa.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/funcionarios',
        name: 'Funcionários',
        props: true,
        // component: () => import('@/App.vue'),
        beforeEnter: Auth0.routeGuard
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;