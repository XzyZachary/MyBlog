import Vue from 'vue'
import Router from 'vue-router'
import store, * as storeTypes from '@/store'
import util from '@/libs/util.js'
//import Login from '@/pages/Login/index'
// 路由数据
import routes from './routes'
import { TabPane } from 'element-ui';

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


router.afterEach(to => {
    const app = router.app
    const {name,params,query} = to 
    // 多页控制 打开新的页面
    app.$store.commit('adminPageOpenNew', { name, params, query })
    // 更改标题
    util.title(to.meta.title)
})
export default router