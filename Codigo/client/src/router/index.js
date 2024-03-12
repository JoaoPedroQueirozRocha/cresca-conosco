import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        props: true,
        component: () => import('@/components/HelloWorld.vue'),
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