import rolerouteModel from '../models/roleroute'

module.exports = {
    //获取所有的或者个别详细的
    async GetList(ctx, next) {
        let {
            keyword,
            pageindex = 1,
            pagesize = 10
        } = ctx.request.query;
        try {
            console.log(ctx.request.query)
            //特殊字符转义
            //keyword = keyword.replace(/([\^\$\(\)\*\+\?\.\\\|\[\]\{\}])/g, "\\$1");
            let reg = new RegExp(keyword, 'i')
            console.log(reg)
            let data = await ctx.findPage(rolerouteModel, {
                $or: [{
                        Roles: {
                            $regex: reg
                        }
                    }
                ]
            },{
                CreateDate: 0
            },{
                limit: pagesize * 1,
                skip: (pageindex - 1) * pagesize
            })
            ctx.send(data)
        } catch (e) {
            console.log(e)
            ctx.sendError(e)
        }
    },

    //新增角色-路径
    async add(ctx, next) {
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(rolerouteModel, {
                title: paramsData.title
            })
            if (data) {
                ctx.sendError('数据已存在，请重新添加')
            } else {
                let data = await ctx.add(rolerouteModel, paramsData)
                ctx.send(paramsData)
            }
        } catch (e) {
            ctx.sendError(e)
        }
    },

    //更新或者删除
    async update(ctx, next) {
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.update(rolerouteModel, {
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