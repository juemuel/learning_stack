import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: ()=>import('../pages/About.vue')// 路由懒加载
        },
        {
            path: '/contact',
            name: 'contact',
            component: ()=>import('../pages/Contact.vue')// 路由懒加载
        },
        {
            path: '/team',
            name: 'team',
            component: ()=>import('../pages/Team.vue')// 路由懒加载
        },
        {
            path: '/settings',
            name: 'settings',
            component: ()=>import('../pages/Settings.vue')// 路由懒加载
        }
    ]
})

export default router