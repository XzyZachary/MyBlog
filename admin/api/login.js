import fetch from '@/utils/fetch'

export function loginByUsername(username, pwd) {
    const data = {
        username,
        pwd
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