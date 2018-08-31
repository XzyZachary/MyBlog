import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './constants'
import createTimer from './plugins/timer'
import auth from './modules/auth'
import progress from './modules/progress'
import blog from './modules/blog'
import d2admin from './modules/admin'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const timer = createTimer(3000, types.MUTATION_TIMESTAMP_UPDATE)

const state = {
    timestamp: new Date().getTime()
}

const mutations = {
    [types.MUTATION_TIMESTAMP_UPDATE](state, value) {
        state.timestamp = value
    }
}

const actions = {}

const getters = {
    [types.GETTER_TIMESTAMP](state) {
        return state.timestamp
    },
    userID(getters) {
        var UserID = getters[types.GETTER_AUTH_PAYLOD] || {}
        return UserID
    }
}

const store = new Vuex.Store({
    strict : process.env.NODE_ENV !== 'production',
    modules: {
        auth,
        progress,
        d2admin,
        blog
    },
    state,
    mutations,
    actions,
    getters
    // getters,
    // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [timer]
})

export default store
export * from './constants'