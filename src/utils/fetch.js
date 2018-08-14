import axios from 'axios'
import queryString from 'qs'
import router from '../router'
import store from '../store'

axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.headers.common['Accept'] = 'application/json; charset=utf-8'

const service = axios.create({
    transformRequest: [data => {
        return JSON.stringify(data);
    }],
    paramsSerializer: (params) => {
        var newKeys = {};
        Object.keys(params || {}).forEach(item => {
            if (Object.prototype.toString.call(params[item]) === '[object Array]' ||
                Object.prototype.toString.call(params[item]) === '[object Object]')
                newKeys[item] = JSON.stringify(params[item])
            else newKeys[item] = params[item]
        })
        return queryString.stringify(newKeys, {
            arrayFormat: 'indices'
        });
    },
    transformResponse: [(data) => {
        try {
            return JSON.parse(data)
        } catch (e) {
            return data
        }
    }]
})


service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['AuthSecurity'] = store.getters.token
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})



service.interceptors.response.use(
    response => {
        const code = response.data.Status
        if (code === 401) {
            Message({
                message: res.ErrorMessage,
                type: 'Error',
                duration: 5　 * 1000
            })
            store.dispatch('LogOut').then(() => {
                router.push({
                    path: '/login'
                })
            })
        } else {
            return response
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'Error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)



export default (options) => {
    return new Promise((reolve, reject) => {
        service(options).then((response) => {
            if (response.data && !response.data.ErrorMessage)
                resolve(response.data.Data)
            else resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}