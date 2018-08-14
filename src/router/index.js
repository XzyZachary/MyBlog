import Vue from 'vue'
import Router from 'vue-router'
import store, * as storeTypes from '@/store'
import Login from '@/pages/Login/index'


Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
        {
            // default page
            path: '/',
            redirect: { path: '/login' }
        },
        {
            // login page
            path: '/login',
            name:'Login',
            component: Login
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters[storeTypes.GETTER_AUTH_ISAUTH]) {
            next()
        } else {
            // 没有token，去login页面
            next({
                name: 'Login'
            })
        }
    } else {
        next() // 确保一定要调用 next()
    }
})
export default router