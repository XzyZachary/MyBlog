import http from '@/http'

export default class BaseService {
    constructor() {}

    api(action = '', param = {}, api = 'api') {
        return http.post(`${api}/${action}`, param).then(res => res.data)
    }
}