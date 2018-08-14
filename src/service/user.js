import http from '@/http'
import BaseService from './base'


export class UserService extends BaseService {
    login(username, password){
        return http.post('/admin/user/login',{
            username,
            password
        },
        {
            ignoreAuth: true
        }
    ).then(res => {
            if (res.headers['zachary-token']){
                return Promise.resolve(res.headers['zachary-token'])
            }else{
                return Promise.reject()
            }
        })
    }
}

var service = new UserService()
export default service