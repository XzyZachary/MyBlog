// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI, { Message } from 'element-ui'
import App from '@/App'
import router from '@/router'
import store, * as storeTypes from '@/store'
import http from '@/http'
import service from '@/service'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(service)
Vue.use(http, {
  isAuth: () => store.getters[storeTypes.GETTER_AUTH_ISAUTH],
  accessToken: () => store.getters[storeTypes.GETTER_AUTH_ACCESSTOKEN],
  onError: error => {
    console.log(error);
    Message.error(error.message);
    let [{ status }, { ignoreAuth }] = [error.response || {}, error.config || {}];
    if (status == 401 && ignoreAuth != true) {
      router.push({ name: 'Login' });
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})