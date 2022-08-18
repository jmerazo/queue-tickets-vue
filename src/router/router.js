import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Users/Login.vue';
import Register from '@/views/Users/Register.vue';
import Panel from '@/views/Panel/Panel.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            auth: false
        }
    },
    {
        path: '/users/login',
        name: 'Login',
        component: Login,
        meta: {
            auth:false
        }
    },
    {
        path: '/user/create',
        name: 'Register',
        component: Register,
        meta: {
            auth:true
        }
    },
    {
        path: '/user/panel',
        name: 'Panel',
        component: Panel,
        meta: {
            auth:true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token")
  
    if (to.matched.some(record => record.meta.auth)){
      if(!token){
        console.log("No token", token);
        next('/users/login')
      }
    }    
    next()
  })


export default router