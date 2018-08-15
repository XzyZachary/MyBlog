import Vue from 'vue'
import Router from 'vue-router'
import store, * as storeTypes from '@/store'
//import Login from '@/pages/Login/index'
// 路由数据
import routes from './routes'

Vue.use(Router)

var router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters[storeTypes.GETTER_AUTH_ISAUTH]) {
            next()
        } else {
            // 没有token，去login页面
            next({
                name: 'login'
            })
        }
    } else {
        next() // 确保一定要调用 next()
    }
})
export default router