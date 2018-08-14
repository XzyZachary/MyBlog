import Axios from 'axios'

var http = Axios.create({
    baseURL: process.env.VUE_APP_API_BASEURL
})

http.install = (Vue, options) => {
    var { isAuth, accessToken, onError } = {
        accessToken: () => null,
        isAuth: () => false,
        onError: (error) => { throw error },
        ...options
    }

    http.interceptors.request.use(config => {
        if (config.ignoreAuth != true) {
            if (isAuth()) {
                config.headers.Authorization = `Bearer ${accessToken()}`
            } else {
                var error = new Error('No Auth Token')
                error.config = config
                error.response = {
                    config: config,
                    status: 401,
                    statusText: 'Unauthorized',
                    data: '',
                    headers: {}
                }
                return Promise.reject(error)
            }

        }
        return config
    }, error => {
        return Promise.reject(error)
    })
    http.interceptors.response.use(res => {
        return Promise.resolve(res)
    }, error => {
        onError(error)
        return Promise.reject(error)
    })
    Object.defineProperty(Vue.prototype, '$http', {
        value: http
    })
}

export default http