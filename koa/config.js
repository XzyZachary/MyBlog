import path from 'path'

const auth = {
    admin_secret: 'admin-token',
    tokenKey: 'Token-Auth',
    whiteList: ['login','client_api'],
    blackList: ['admin_api']
}

const log = {
    logLevel: 'debug',
    dir: path.resolve(__dirname,'../../logs'),
    projectName: 'blog',
    ip:'0.0.0.0'
}

const port = proces.env.NODE_ENV === 'production' ? '80' : '3000'

export default {
    env: process.env.NODE_ENV,
    port,
    auth,
    log,
    mongodb: {
        address: 'localhost:27017',
        db:'Blog'
    }
}