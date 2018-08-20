import http from '@/http'
import BaseService from './base'


export class MenuService extends BaseService {
    GetMenu(role){
        return http.get('/admin/roleroute/list?keyword=' + role).then(res => {
           return Promise.resolve(res)
        })
    }
}

var service = new MenuService()
export default service