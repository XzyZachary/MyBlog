import user from './user'

class Service{
    constructor() {
        this.user = user
    }
}

var service = new Service()

service.install = Vue => {
    Object.defineProperty(Vue.prototype, '$service', {value:service})
}

export default service

export {
    user
}