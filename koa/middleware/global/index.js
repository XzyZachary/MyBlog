import get_info_func from './get_info'
import db_func from './db'
import file_func from './file'

export default () => {
    const func = Object.assign({}, get_info_func, db_func, file_func)
    return async (ctx, next) => {
        for (let v in func){
            if(func.hasOwnProperty(v)) ctx[v] = func[v]
        }
        await next()
    }
}