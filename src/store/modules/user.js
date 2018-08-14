import {getToken} from 'src/utils/auth'
import md5 from 'js-md5'
import { loginByUsername } from '@/api/login';

const user = {
    state: {
        list: [],
        userTotal: 0 ,
        name: '',
        username: '',
        roles: null,
        token: getToken(),
        otherList: []
    },
    mutations: {
        SET_TOKEN(state, token){
            state.token = token
        },
        SET_USERINFO(state, info){
            state.name = info.name
            state.username = info.username
            state.roles = info.roles
        },
        USERLIST(state, data){
            state.list = data.list
            state.total = data.total
        },
        GET_INFOLIST(state, data){
            state.otherList = data
        },
        CLEARINFO(state){
            state.name =''
            state.usename =''
            state.roles = null
        }
    },
    actions: {
        clearInfo ({commit}){
            commit('CLEARINFO')
        },
        userLogin({state, commit}, info){
            let {username, password} = info
            return Promise((resolve,reject) => {
                loginByUsername(username, md5(password)).then(response => {
                    state.token = getToken()
                    resolve(res)
                }).cathc( err => {
                    reject(err)
                })
            })
        },
        getUserInfo({state, commit}){
            return Promise((resolve, reject) => {
                GetUserInfo(state.token).then(res => {
                    commit('SET_USERINFO', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default user