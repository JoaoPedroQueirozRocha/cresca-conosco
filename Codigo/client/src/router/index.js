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
        path: '/gado/vaca',
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
        props: route => ({
            id: route.params.id,
            isEdicao: true,
            title: 'Editar Despesa',
        }),
        component: () => import('@/view/financas/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/despesa',
        name: 'DespesaCriar',
        props: { title: 'Criar Despesa' },
        component: () => import('@/view/financas/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/funcionarios',
        name: 'Funcionários',
        props: true,
        component: () => import('@/view/funcionarios/Index.vue'),
        beforeEnter: Auth0.routeGuard
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;