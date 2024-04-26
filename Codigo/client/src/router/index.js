import { createRouter, createWebHistory } from 'vue-router';
import lucroController from '@/controller/profit.js';
import maoDeObraController from '@/controller/mao-de-obra.js';
import despesaController from '@/controller/cost.js';
import animalController from '@/controller/animal.js';
import { COST_FIELDS, PROFIT_FIELDS, COW } from './fields.js';
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
        props: {
            value: 'vaca',
            fields: COW,
            callback: animalController.createAnimal,
            returnTo: '/gado',
        },
        component: () => import('@/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/gado/vaca/:id',
        name: 'EditarVaca',
        props: route => ({
            id: route.params.id,
            value: 'vaca',
            fields: COW,
            callback: animalController.updateAnimal,
            get: animalController.getAnimal,
            returnTo: '/gado',
        }),
        component: () => import('@/components/CreateEdit.vue'),
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
            fields: COST_FIELDS,
            callback: despesaController.updateCost,
            get: despesaController.getCost,
            returnTo: '/financas',
        }),
        component: () => import('@/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/despesa',
        name: 'DespesaCriar',
        props: {
            value: 'despesa',
            fields: COST_FIELDS,
            callback: despesaController.createCost,
            returnTo: '/financas',
        },
        component: () => import('@/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/receita/:id',
        name: 'ReceitaEditar',
        props: route => ({
            id: route.params.id,
            value: 'receita',
            fields: PROFIT_FIELDS,
            callback: lucroController.updateProfit,
            get: lucroController.getProfit,
            returnTo: '/financas',
        }),
        component: () => import('@/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/financas/receita',
        name: 'ReceitaCriar',
        props: {
            value: 'receita',
            fields: PROFIT_FIELDS,
            callback: lucroController.createProfit,
            returnTo: '/financas',
        },
        component: () => import('@/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/mao-de-obra',
        name: 'MaoDeObra',
        props: true,
        component: () => import('@/view/mao-de-obra/Index.vue'),
        beforeEnter: Auth0.routeGuard
    },
    {
        path: '/mao-de-obra/criar',
        name: 'MaoDeObrasCriar',
        props: route => ({
            value: 'Mão de obra',
            callback: maoDeObraController.createFuncionario
        }),
        component: () => import('@/view/mao-de-obra/components/CreateEdit.vue'),
        beforeEnter: Auth0.routeGuard
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;