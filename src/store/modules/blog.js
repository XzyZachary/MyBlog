import service from '@/service/blogs'
import { blogTypes } from './classify'

const state = {
    blogTypes,
    list: [],
    total: 0
}

const mutations = {
    BLOGLIST(state, data) {
        //console.log(data.data.data)
        state.list = data.data.data.list;
        state.total = data.data.data.total;
    }
}

const actions = {
    GetAllBlogs({
        commit
    }, params) {
        return service.GetAllBlogs(params).then(data => {
            commit('BLOGLIST', data)
            return Promise.resolve(data)
        })
    },
    updateBlog ({commit}, info) {
        return service.delBlog(info).then(data => {
            return Promise.resolve(data)
        }).catch(e => {
            console.log(e)
            return Promise.reject(e)
        })
    },
    deletebyisvisiable({commit}, info) {
        return service.deletebyisvisiable(info).then(data => {
            return Promise.resolve(data)
        }).catch(e => {
            console.log(e)
            return Promise.reject(e)
        })
    }
}
const getters = {
    blogList(state){
        return state.list
    },
    blogTotal(state){
        return state.total
    },
    blogTypes(state){
        return state.blogTypes
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}