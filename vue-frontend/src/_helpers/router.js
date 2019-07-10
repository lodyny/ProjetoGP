import Vue from 'vue';
import Router from 'vue-router';

import { authenticationService } from '@/_services';
import { Role } from '@/_helpers';
import HomePage from '@/home/HomePage';
import AdminPage from '@/admin/AdminPage';
import LoginPage from '@/login/LoginPage';
import SignUpPage from '@/signup/SignUpPage';
import AnimalProfile from '@/home/AnimalProfile';
import UserProfile from '@/home/UserProfile';
import AnimalCrud from '@/home/AnimalCrud';
import AnimalAdoption from '@/home/AnimalAdoption';
import RoleUpdate from '@/home/RoleUpdate';
import AnimalRequests from '@/home/AnimalRequests';
import RequestChat from '@/home/RequestChat';
import RequestChatUser from '@/home/RequestChatUser';
import Streams from '@/home/Streams';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { 
            path: '/', 
            name: 'Home',
            component: HomePage,
            props: true
        },
        { 
            path: '/admin', 
            component: RoleUpdate, 
            meta: { authorize: [Role.Admin] } 
        },
        { 
            path: '/login', 
            component: LoginPage 
        },
        { 
            path: '/signup', 
            component: SignUpPage 
        },
        { 
            path: '/animal/:url_id', 
            name: 'AnimalProfile',
            component: AnimalProfile,
            props: true
        },
        { 
            path: '/animal/', 
            name: 'AnimalCrud',
            component: AnimalCrud,
            props: true
        },
        { 
            path: '/animalAdoption/', 
            name: 'AnimalAdoption',
            component: AnimalAdoption,
            props: true
        },
        { 
            path: '/profile', 
            component: UserProfile,
        },
        { 
            path: '/requests', 
            component: AnimalRequests,
        },
        { 
            path: '/allconversations', 
            name: 'Allconversations', 
            component: RequestChat,
            meta: { authorize: [Role.Admin] } 
        },
        { 
            path: '/myconversations', 
            name: 'Myconversations', 
            component: RequestChatUser,
        },
        { 
            path: '/stream', 
            name: 'Stream', 
            component: Streams,
        },
        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;
    const currentUser = authenticationService.currentUserValue;

    if (authorize) {
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/login', query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.role)) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
})