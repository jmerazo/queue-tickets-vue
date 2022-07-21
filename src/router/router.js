import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            auth: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})


export default router