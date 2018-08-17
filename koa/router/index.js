import koaRouter from 'koa-router'
const router = koaRouter()

export default app => {
    router.post('/admin/user/login', app.admin.user.login)
    router.get('/admin/user/info', app.admin.user.info)
    router.get('/admin/user/list', app.admin.user.list)
    router.post('/admin/user/add', app.admin.user.add)
    router.post('/admin/user/update', app.admin.user.update)



    router.get('/admin/blog/list', app.admin.blog.list)
    router.post('/admin/blog/add', app.admin.blog.add)
    router.post('/admin/blog/update', app.admin.blog.update)

    router.get('/admin/roleroute/list', app.admin.roleroute.GetList)
    router.post('/admin/roleroute/add', app.admin.roleroute.add)
    router.post('/admin/roleroute/update', app.admin.roleroute.update)




    app.use(router.routes()).use(router.allowedMethods())
}