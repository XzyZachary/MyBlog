import service from '@/service/blogs'

const actions = {
    GetAllBlogs(commit,{pagesize,pageIndex}){
        return service.GetAllBlogs(pagesize, pageIndex).then(data => {
            return Promise.resolve(data)
        })
    }
}

export default {
    actions
}