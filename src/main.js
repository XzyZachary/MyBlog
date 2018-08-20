// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI, {
  Message
} from 'element-ui'
import App from '@/App'
import router from '@/router'
import store, * as storeTypes from '@/store'
import http from '@/http'
import service from '@/service'
import storage from '@/utils/storage'
import 'element-ui/lib/theme-chalk/index.css'
//import '@/assets/svg-icons'
import '@/components'
import {
  menuHeader,menuAside 
} from '@/menu'
import {
  frameInRoutes
} from '@/router/routes'
import 'flex.css'


Vue.config.productionTip = false
Vue.prototype.$baseUrl = process.env.BASE_URL

Vue.use(ElementUI)
Vue.use(service)
Vue.use(http, {
  isAuth: () => store.getters[storeTypes.GETTER_AUTH_ISAUTH],
  accessToken: () => store.getters[storeTypes.GETTER_AUTH_ACCESSTOKEN],
  onError: error => {
    console.log(error);
    Message.error(error.message);
    let [{
      status
    }, {
      ignoreAuth
    }] = [error.response || {}, error.config || {}];
    if (status == 401 && ignoreAuth != true) {
      router.push({
        name: 'login'
      });
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.getAllPageFromRoutes()
    // 设置顶栏菜单
    this.$store.commit('d2adminMenuHeaderSet', menuHeader)
  },
  watch: {
    '$route.matched' () {
      //const _side = menuAside.filter(menu => menu.path === val[0].path)
      //this.$store.commit('d2adminMenuAsideSet', storage.read('menu').list)
      this.$store.commit('d2adminMenuAsideSet', JSON.parse(storage.read('menu')))
    }
  },
  methods: {
    getAllPageFromRoutes() {
      const pool = []
      const push = function (routes) {
        routes.forEach(route => {
          if (route.children) {
            push(route.children)
          } else {
            const {
              meta,
              name,
              path
            } = route
            pool.push({
              meta,
              name,
              path
            })
          }
        })
      }
      push(frameInRoutes)
      this.$store.commit('d2adminPagePoolSet', pool)
    },
    getAllMenu(){
      this.$store.dispatch("GetRoleRoute")
    }
  }
})