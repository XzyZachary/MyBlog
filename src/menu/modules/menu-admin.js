export default {
    path: '/blog',
    title:'数据',
    icon:'flask',
    children: (pre => [
        { path: `${pre}index`, title: '数据首页', icon: 'home'},
        {
            title: '博客',
            icon:'table',
            path: `${pre}blog`
        },
        {
            title:'用户',
            icon:'user',
            path: `${pre}user`
        }
    ])('/')
}