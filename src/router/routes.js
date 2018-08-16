import layoutHeaderAside from '@/layout/header-aside'
//import login from '@/pages/Login/index'

const meta = {
    requiresAuth: true
}


const frameIn = [{
        path: '/',
        redirect: {
            name: 'index'
        },
        component: layoutHeaderAside,
        children: [{
            path: 'index',
            name: 'index',
            meta,
            component: () =>
                import ('@/pages/index')
        }]
    },
    {
        path: '/',
        redirect: {
            name: 'blog'
        },
        component: layoutHeaderAside,
        children: [{
            path: 'blog',
            name: 'blog',
            meta,
            component: () =>
                import ('@/pages/blog/index')
        }]
    },
    {
        path: '/',
        name: 'user',
        meta,
        redirect: {
            name: 'user'
        },
        component: layoutHeaderAside,
        children: [{
            path: 'user',
            name: 'user',
            meta,
            component: () =>
                import ('@/pages/user/index')
        }]
    }
]

const frameOut = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('@/pages/login')
}]

// const errorPage = [{
//     path: '*',
//     name: '404',
//     component: () =>
//         import ('@/pages/error-page-404')
// }]

export const frameInRoutes = frameIn

export default [
    ...frameIn,
    ...frameOut,
    //...errorPage
]