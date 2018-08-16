//import screenfull from 'screenfull'

import themeList from '@/assets/style/theme/list.js'
import jwtDecode from 'jwt-decode'

import storage from '@/utils/storage'

const pageOpenedDefault = {
    name: 'index',
    meta: {
        title: '首页',
        requiresAuth: false
    }
}

const state = {
    userInfo: {
        name: ""
    },
    isGrayMode: false,
    pageOpenedList: [
        pageOpenedDefault
    ],
    // 侧边栏收缩
    isMenuAsideCollapse: false,
    menuHeader: [],
    menuAside: [],
    pageCurrent: '',
    themeList,
    themeActiveName: themeList[0].name,
    pagePool: [],
}

const getters = {
    d2adminThemeActiveSetting(state) {
        return state.themeList.find(theme => theme.name === state.themeActiveName)
    },
    d2adminKeepAliveInclude(state) {
        return state.pageOpenedList.filter(item => {
            if (item.meta) {
                if (item.meta.notCache) {
                    return false
                }
            }
            return true
        }).map(e => e.name)
    },
    AdminUserinfo(state) {
        return state.userInfo.name;
    }

}

const mutations = {
    /**
     * 切换侧边栏展开和收缩
     * @class isMenuAsideCollapse
     * @param {vuex state} state vuex state
     */
    d2adminMenuAsideCollapseToggle(state) {
        state.isMenuAsideCollapse = !state.isMenuAsideCollapse
    },
    d2adminPagePoolSet(state, pagePool) {
        state.pagePool = pagePool
    },
    d2adminMenuHeaderSet(state, menu) {
        state.menuHeader = menu
    },
    d2adminUserInfoSet(state, token) {
        state.userInfo.name = jwtDecode(token).name
    },
    d2adminMenuAsideSet(state, menu) {
        state.menuAside = menu
    },
    d2adminTagCloseAll(state, vm) {
        state.pageOpenedList.splice(1)
        // 更新设置到数据库
        //this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
        // 关闭所有的标签页后需要判断一次现在是不是在首页
        if (vm.$route.name !== 'index') {
            vm.$router.push({
                name: 'index'
            })
        }
    },
}
export default {
    state,
    mutations,
    getters
}