import { constantRouterMap, asyncRouterMap } from 'src/router'

const hasPermission = (roles, route) => {
    if (route.meta && route.meta.role){
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    }else{
        return true
    }
}

const filterAsyncRouter = (asyncRouterMap, roles) => {
    const accessedRouters = asyncRouterMap.filter(route => {
        if( hasPermission(roles, route)){
            if(route.childern && route.children.length){
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}


const permission = {
    state: {
        routes: constantRouterMap.concat(asyncRouterMap),
        addRouters:[]
    },
    mutations: {
        SETROUTES(stata, router){
            state.addRouters = routers;
            state.routes = constantRouterMap.concat(routers);
        }
    },
    actions: {
        setRoutes({ commit }, info){
            return new Promise((resolve,reject) => {
                let roles = info
                let accressedRouters = []
                if (roles.indexOf('admin') >= 0){
                    accessedRouters = asyncRouterMap
                }else{
                    accessedRouters = filterAsyncRouter(asyncRouterMap,roles)
                }

                commit('SETROUTES', accessedRouters)
                reslove()
            })
        }
    }
}


export default permission