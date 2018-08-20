import user from './user'
import menu from './menu'

class Service{
    constructor() {
        this.user = user,
        this.menu = menu
    }
}

var service = new Service()

service.install = Vue => {
    Object.defineProperty(Vue.prototype, '$service', {value:service})
}

export default service

export {
    user,
    menu
}