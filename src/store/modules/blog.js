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
    }
}
const getters = {
    blogList(state){
        return state.list
    },
    blogTotal(state){
        return state.total
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}