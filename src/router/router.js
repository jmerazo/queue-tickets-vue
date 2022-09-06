import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Users/Login.vue';
import Register from '@/views/Users/Register.vue';
import Panel from '@/views/Panel/Panel.vue';
import Admin from '@/views/Panel/Admin.vue'
import UsersList from '@/views/Users/List.vue'
import UserAuthCreate from '@/views/Users/RegisterAuth.vue'
import UserUpdate from '@/views/Users/Update.vue'
import PasswordUpdate from '@/views/Users/AuthPassUpdate.vue'
import TicketRequest from '@/views/Tickets/Request.vue'
import PassportRequest from '@/views/Passport/Register.vue'
import Profile from '@/views/Users/Profile.vue'

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
        path: '/ticket/request',
        name: 'TicketRequest',
        component: TicketRequest,
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
        path: '/user/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            auth:true
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
    },
    {
        path: '/user/panel/administrator',
        name: 'admin',
        component: Admin,
        meta: {
            auth:true
        }
    },
    {
        path: '/users/list',
        name: 'usersList',
        component: UsersList,
        meta: {
            auth:true
        }
    },
    {
        path: '/user/delete/:id',
        name: 'userDelete',
        meta: {
            auth:true
        }
    },
    {
        path: '/user/add/:id',
        name: 'userCreate',
        component: UserAuthCreate,
        meta: {
            auth:true
        }
    },
    {
        path: '/user/update/:id',
        name: 'userUpdate',
        component: UserUpdate,
        meta: {
            auth:true
        }
    },
    {
        path: '/user/auth/password/update/:id',
        name: 'passwordUpdate',
        component: PasswordUpdate,
        meta: {
            auth:true
        }
    },
    {
        path: '/user/status/update/:id',
        name: 'statusUpdate',
        meta: {
            auth:true
        }
    },
    {
        path: '/passport/request/ticket',
        name: 'PassportRequest',
        component: PassportRequest,
        meta: {
            auth:false
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
          next('/users/login')
        }
    }
    next()
  })


export default router