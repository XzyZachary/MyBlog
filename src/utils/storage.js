export default class Storage {
    constructor() {}
    static read(name) {
        if (window.localStorage) {
            return window.localStorage.getItem(name)
        }
        return null
    }

    static write(name, value) {
        if (window.localStorage) {
            if (value == null) {
                localStorage.removeItem(name)
            } else {
                localStorage.setItem(name, value)
            }
        }
    }
}