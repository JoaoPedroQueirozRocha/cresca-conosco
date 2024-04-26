import { createRouter, createWebHistory } from 'vue-router';
import lucroController from '@/controller/profit.js';
import maoDeObraController from '@/controller/mao-de-obra.js';
import despesaController from '@/controller/cost.js';
import { cost, profit } from './financeType.js';
import Auth0 from '../auth/index.js';

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
        name: 'CriarVaca',
        props: true,
        component: () => import('@/view/gado/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/gado/vaca/:id',
        name: 'EditarVaca',
        props: true,
        component: () => import('@/view/gado/components/CreateEdit.vue'),
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
            value: 'despesa',
            types: cost,
            callback: despesaController.updateCost,
            get: despesaController.getCost,
        }),
        component: () => import('@/view/financas/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/despesa',
        name: 'DespesaCriar',
        props: { value: 'despesa', types: cost, callback: despesaController.createCost },
        component: () => import('@/view/financas/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/receita/:id',
        name: 'ReceitaEditar',
        props: route => ({
            id: route.params.id,
            value: 'receita',
            types: profit,
            callback: lucroController.updateProfit,
            get: lucroController.getProfit,
        }),
        component: () => import('@/view/financas/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/receita',
        name: 'ReceitaCriar',
        props: { value: 'receita', types: profit, callback: lucroController.createProfit },
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
    {
        path: '/funcionarios/criar',
        name: 'FuncionariosCriar',
        props: route => ({
            value: 'funcionário',
            callback: maoDeObraController.createFuncionario
        }),
        component: () => import('@/view/funcionarios/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;