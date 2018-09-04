import blogModel from '../models/blog'
import path from 'path'
import marked from 'marked'

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    senitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
})


module.exports = {
    //获取博客list
    async list(ctx, next) {
        let {
            keyword,
            pageindex = 1,
            pagesize = 10
        } = ctx.request.query;
        try {
            let reg = new RegExp(keyword, 'i')
            let data = await ctx.findPage(blogModel, {
                $or: [{
                        type: {
                            $regex: reg
                        }
                    },
                    {
                        title: {
                            $regex: reg
                        }
                    }
                ]
            }, {
                createTime: 0,
                html: 0
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

    //新增博客
    async add(ctx, next) {
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(blogModel, {
                title: paramsData.title
            })
            if (data) {
                ctx.sendError('数据已存在，请重新添加')
            } else {
                paramsData.html = marked(paramsdata.html)
                let data = await ctx.add(blogModel, paramsData)
                ctx.send(paramsData)
            }
        } catch (e) {
            ctx.sendError(e)
        }
    },

    //更新或删除博客（不做物理删除）
    async update(ctx, next) {
        console.log("update")
        console.log(ctx.request)
        let paramsData = ctx.request.body;
        console.log(paramsData)
        try {
            //paramsData.html = marked(paramsData.html);
            console.log(paramsData.html)
            let data = await ctx.update(blogModel, {
                _id: paramsData._id
            }, paramsData)
            ctx.send()
        } catch (e) {
            console.log(e)
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },
    async deletebyisvisiable(ctx, next){
        let paramsData = ctx.request.body
        var isVisible = false
        try{
            let data = await ctx.update(blogModel,{
                _id: paramsData
            },{isVisible})
            ctx.send()
        }catch(e){
            if(e === "暂无数据"){
                ctx.sendError(e)
            }
        }
    }
}