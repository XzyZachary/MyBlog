//import layoutHeaderAside from '@/layout/header-aside'
import login from '@/pages/Login/index'

// const meta = {
//     requiresAuth: true
// }


// const frameIn = [{
//     path: '/',
//     redirect: {
//         name: 'index'
//     },
//     //component: layoutHeaderAside,
//     children: [{
//         path: 'index',
//         name: 'index',
//         meta,
//         component: () =>
//             import ('@/pages/index')
//     }]
// }]

const frameOut = [{
    path: '/login',
    name: 'login',
    components: login
}]

// const errorPage = [{
//     path: '*',
//     name: '404',
//     component: () =>
//         import ('@/pages/error-page-404')
// }]

// export const frameInRoutes = frameIn

export default [
    //...frameIn,
    ...frameOut,
    //...errorPage
]