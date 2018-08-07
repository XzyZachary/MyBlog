import koaRouter from 'koa-router'
const router = koaRouter()

export default app => {
    router.post('/admin/user/login', app.user.login)
    router.get('/admin/user/info', app.user.info)
    router.get('/admin/user/list', app.user.list)
    router.post('/admin/user/add', app.user.add)
    router.post('/admin/user/update', app.user.update)



    router.get('/admin/blog/list', app.blog.list)
    router.post('/admin/blog/add', app.blog.add)
    router.post('/admin/blog/update', app.blog.update)

    app.use(router.routes()).use(router.allowedMethod())
}