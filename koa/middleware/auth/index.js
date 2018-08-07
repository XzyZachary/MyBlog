import jwt from 'jsonwebtoken'
import conf from '../../config'

export default () => {
    return async (ctx, next) => {
        if ( conf.auth.blackList.some(v => ctx.path.indexOf(v) >= 0 )){
            let token = ctx.cookies.get(conf.auth.tokenKey);
            try{
                jwt.verify(token, conf.auth.admin_secret);
            }catch (e){
                if('TokenExpiredError' === e.name){
                    ctx.sendError('token过期,重新登陆')
                    ctx.throw(401,'token expired')
                }
                ctx.sendError('token验证失败')
                ctx.throw(401,'invalid token')
            }
            console.log('授权成功')
        }
        await next()
    }
}
