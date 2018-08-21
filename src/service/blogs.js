import http from '@/http'
import BaseService from './base'


export class BlogService extends BaseService {
    GetAllBlogs(pageIndex, pageSize) {
        return http.get('/admin/blog/list?pageIndex=' + pageIndex + '&pageSize=' + pageSize).then(res => {
            return Promise.resolve(res)
        })
    }
}

var service = new BlogService()
export default service