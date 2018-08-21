//import screenfull from 'screenfull'

import themeList from '@/assets/style/theme/list.js'
import jwtDecode from 'jwt-decode'
import service from '@/service/menu'
import storage from '@/utils/storage'
import * as types from '../constants'

const pageOpenedDefault = {
    name: 'index',
    meta: {
        title: '首页',
        requiresAuth: false
    }
}

const state = {
    userInfo: {
        name: "",
        role:""
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
        console.log(token);
        state.userInfo.name = jwtDecode(token).name
        state.userInfo.role = jwtDecode(token).role
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
    adminPageOpenNew(state, {name,params,query}){
        let pageOpenedList = state.pageOpenedList
        let pageOpenedIndex = 0
        const pageOpend = pageOpenedList.find((page,index) => {
            const same = page.name === name
            pageOpenedIndex = same ? index : pageOpenedIndex
            return same
        })
        if(pageOpend){
            this.commit('adminPageOpenedListUpdateItem',{index: pageOpenedIndex,params,query})
        }else{
            let tag = state.pagePool.find(t => t.name === name)
            if(tag){
                this.commit('adminTagIncreate',{tag,params,query})
            }
        }
        this.commit('adminPageCurrentSet', name)
    },
    adminPageOpenedListUpdateItem(state, {index,params,query}){
        let page = state.pageOpenedList[index]
        page.params = params || page.params
        page.query = query || page.query
        state.pageOpenedList.splice(index, 1, page)
    },
    adminTagIncreate(state, {tag, params,query}){
        let newPage = tag
        newPage.params = params || newPage.params
        newPage.query = query || newPage.query
        state.pageOpenedList.push(newPage)
    },
    adminPageCurrentSet(state,name){
        state.pageCurrent = name
    },
    adminTagClose(state, {tagName, vm}){
        let newPage = state.pageOpenedList[0]
        const isCurrent = state.pageCurrent === tagName
        if (isCurrent){
            let list  = state.pageOpenedList
            list.map((item,key) => {
                if(item.name === tagName){
                    if(key < list.length -1 ){
                        newPage = state.pageOpenedList[key+1]
                    }else{
                        newPage = state.pageOpenedList[key - 1]
                    }
                }
            });
        }

        const index  = state.pageOpenedList.findIndex(page => page.name === tagName)
        if(index >= 0) state.pageOpenedList.splice(index, 1)
        if(isCurrent){
            const {name = '', params={},query={}} = newPage
            let routerObj = {
                name,
                params,
                query
            }
            vm.$router.push(routerObj)
        }
    },
    adminTagCloseOther(state, {pageSelect, vm} = {}){
        const pageAim = pageSelect || state.pageCurrent
        let currentIndex = 0
        state.pageOpenedList.forEach((page,index) => {
            if(page.name === pageAim) currentIndex = index
        })
        if(currentIndex === 0){
            state.pageOpenedList.splice(1)
        }else{
            state.pageOpenedList.splice(currentIndex + 1)
            state.pageOpenedList.splice(1, currentIndex - 1)
        }
        state.pageCurrent = pageAim
        if(vm && vm.$route.name !== pageAim){
            vm.$router.push({
                name: pageAim
            })
        }
    },
    adminTheme2dom(state,themeName = state.themeActiveName){
        const theme = state.themeList.find(e => e.name === themeName)
        if(theme){
            state.themeActiveName = themeName
        }else{
            state.themeActiveName = state.themeList[0].name
        }
        document.body.className=`theme-${state.themeActiveName}`
    }
}

const actions = {
    //根据用户角色获取菜单
    GetRoleRoute({ commit, rootState }){
        const role = rootState.auth.role;
        return service.GetMenu(role).then(res => {
            //console.log(turntomenu(res.data.data))
            storage.write('menu', JSON.stringify(res.data.data.list));
        })
    },
    adminLogout ({ state, commit, rootState }, { vm, confirm }) {
        function logout(){
            localStorage.clear();
            commit(types.MUTATION_AUTH_UPDATE, null)
            vm.$router.push({
                name: 'login'
            })
        }
        if(confirm){
            vm.$confirm('注销当前账户吗？','确认操作',{
                confirmButtonText: '确定注销',
                cancelButtonText: '放弃',
                type: 'warning'
            }).then(() => {
                logout()
            }).catch(() => {
                vm.$message('放弃注销用户')
            })
        }else{
            logout()
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}