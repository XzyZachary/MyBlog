import jwt from 'jsonwebtoken'
import conf from '../config'
import userModel from '../models/user'

module.exports = {
    async login(ctx, next) {
        let {
            useranme,
            pwd
        } = ctx.request.body;
        try {
            let data = await ctx.findOne(userModel, {
                useranme: useranme
            })
            if (!data) {
                return ctx.sendError('用户不存在')
            }
            if (pwd != data.pwd) {
                return ctx.sendError('密码错误，请重新输入')
            }

            await ctx.update(userModel, {
                _id: data._id
            }, {
                $set: {
                    loginTime: new Date()
                }
            })

            let payload = {
                _id: data._id,
                useranme: data.useranme,
                name: data.name,
                roles: data.roles
            }
            let token = jwt.sign(payload, conf.auth.admin_secret, {
                expiresIn: '24h'
            })
            ctx.cookies.set(conf.auth.tokenKey, token, {
                httpOnly: false //是否至用于http请求中获取
            })
            console.log('login success')
            ctx.send({
                message: '登陆成功'
            })
        } catch (e) {
            if (e === '暂无数据') {
                console.log('用户不存在')
                return ctx.sendError('用户不存在')
            }
            ctx.throw(e)
            ctx.sendError(e)
        }
    },

    async info(ctx, next) {
        let token = ctx.request.body.token;
        try {
            let tokenInfo = jwt.verify(token, conf.auth.admin_secret)
            ctx.send({
                useranme: tokenInfo.useranme,
                name: tokenInfo.name,
                _id: tokenInfo._id,
                roles: tokenInfo.roles
            })
        } catch (e) {
            if ('TokenExpiredError' === e.name) {
                ctx.sendError('授权失败，重新登录')
                ctx.throw(401, 'token expired,请及时登录')
            }
            ctx.throw(401, 'invalid token')
            ctx.sendError('系统异常')
        }
    },

    async list(ctx, next) {
        let {
            keyword,
            pageindex = 1,
            pagesize = 10
        } = ctx.request.query
        try {
            let reg = new RegExp(keyword, 'i')
<<<<<<< HEAD
            //console.log(ctx);
=======
>>>>>>> 3827493b563d9dba60859445b39d3f62ca2a6f7e
            let data = await ctx.findPage(userModel, {
                $or: [{
                        name: {
                            $regex: reg
                        }
                    },
                    {
                        useranme: {
                            $regex: reg
                        }
                    }
                ]
            }, {
                pwd: 0
            }, {
                limit: pagesize * 1,
                skip: (pageindex - 1) * pagesize
            })

            ctx.send(data)
        } catch (e) {
            console.log(e)
            ctx.sendError(e)
        }
    },

    async add(ctx, next) {
        let paramsData = ctx.request.body
        try {
            let data = await ctx.findOne(userModel, {
                name: paramsData.name
            })
            if (data) {
                ctx.sendError('数据已存在，请重新添加')
            } else {
                let data = await ctx.add(userModel, paramsData)
                ctx.send(paramsData)
            }
        } catch (e) {
            ctx.sendError(e)
        }
    },

    async update(ctx, next) {
        let paramsData = ctx.request.body
        try {
            let data = await ctx.findOne(userModel, {
                name: paramsData.name
            })
            if (paramsData.old_pwd !== data.pwd) {
                return ctx.sendError('密码不匹配')
            }
            delete paramsData.old_pwd
            await ctx.update(userModel, {
                _id: paramsData._id
            }, paramsData)
            ctx.send()

        } catch (e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    }
}