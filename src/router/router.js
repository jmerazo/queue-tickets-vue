import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Users/Register.vue';
import Panel from '@/views/Panel/Panel.vue';
import Admin from '@/views/Panel/Admin.vue'
import UsersList from '@/views/Users/List.vue'
import UserAuthCreate from '@/views/Auth/RegisterAuth.vue'
import UserUpdate from '@/views/Users/Update.vue'
import PasswordUpdate from '@/views/Auth/AuthPassUpdate.vue'
import TicketRequest from '@/views/Tickets/Request.vue'
import PassportRequest from '@/views/Passport/Register.vue'
import Profile from '@/views/Users/Profile.vue'

// Areas
import AreasList from '@/views/Areas/ListDependences.vue'
import SubareasList from '@/views/Areas/ListSubdependencies.vue'
import AddDependence from '@/views/Areas/AddDependence.vue'
import UpdateDependence from '@/views/Areas/UpdateDependence.vue'
import AddSubdependence from '@/views/Areas/AddSubdependence.vue'
import UpdateSubdependence from '@/views/Areas/UpdateSubdependence.vue'

// Calendar
import ListTimes from '@/views/Calendar/ConfigCalendar.vue'
import ListDays from '@/views/Calendar/ListDays.vue'

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
    },
    {
        path: '/areas/list',
        name: 'AreasList',
        component: AreasList,
        meta: {
            auth:true
        }
    },
    {
        path: '/subareas/list',
        name: 'SubareasList',
        component: SubareasList,
        meta: {
            auth:true
        }
    },
    {
        path: '/dependence/delete/:id',
        name: 'SubDelete',
        meta: {
            auth:true
        }
    },
    {
        path: '/dependence/create',
        name: 'AddDependence',
        component: AddDependence,
        meta: {
            auth:true
        }
    },
    {
        path: '/dependence/update/:id',
        name: 'UpdateDependence',
        component: UpdateDependence,
        meta: {
            auth:true
        }
    },
    {
        path: '/subdependence/create',
        name: 'AddSubdependence',
        component: AddSubdependence,
        meta: {
            auth:true
        }
    },
    {
        path: '/subdependence/update/:id',
        name: 'UpdateSubdependence',
        component: UpdateSubdependence,
        meta: {
            auth:true
        }
    },
    {
        path: '/user/calendar/times',
        name: 'ListTimes',
        component: ListTimes,
        meta: {
            auth:true
        }
    },
    {
        path: '/user/calendar/status/time/:id',
        name: 'timeUpdate',
        meta: {
            auth:true
        }
    },
    {
        path: '/user/calendar/days',
        name: 'ListDays',
        component: ListDays,
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
          next('/users/login')
        }
    }
    next()
  })


export default router