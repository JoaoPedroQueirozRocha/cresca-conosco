import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'App',
        props: true,
        // component: () => import('@/App.vue'),
        beforeEnter: () => {
            //função do auth0
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;