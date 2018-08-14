import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }
    return fetch({
        url: 'user/login',
        method: 'post',
        data
    })
}

export function getUserInfo(token) {
    return fetch({
        url: 'user/info',
        method: 'get',
        params: {
            token: token
        }
    })
}