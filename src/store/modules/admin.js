//import screenfull from 'screenfull'

import themeList from '@/assets/style/theme/list.js'


const pageOpenedDefault = {
    name: 'index',
    meta: {
        title: '首页',
        requiresAuth: false
    }
}

const state = {
    isGrayMode: false,
    pageOpenedList: [
        pageOpenedDefault
    ],
    // 侧边栏收缩
    isMenuAsideCollapse: false,
    menuHeader: [],
    menuAside: [],
    pageCurrent: '',
    themeList
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
}
export default {
    state,
    mutations,
    getters
}