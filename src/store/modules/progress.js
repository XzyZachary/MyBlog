import * as types from '../constants'
import format from '@/utils/numberFormatter'

const state = {
    show: false,
    total: 0,
    current: 0
}

const mutations = {
    [types.MUTATION_PROGRESS_UPDATE](state, {
        show,
        total,
        current
    }) {
        state.show = !!show
        state.total = total
        state.current = current
    }

}

const actions = {
    [types.ACTION_PROGRESS_SHOW]({
        commit,
        state
    }, paylod) {
        commit(types.MUTATION_PROGRESS_UPDATE, {
            ...state,
            ...paylod,
            show: true
        })
    },
    [types.ACTION_PROGRESS_CHANGE]({
        commit,
        state
    }, paylod) {
        commit(types.MUTATION_PROGRESS_UPDATE, {
            ...state,
            ...paylod
        })
    },
    [types.ACTION_PROGRESS_CLOSE]({
        commit
    }) {
        commit(types.MUTATION_PROGRESS_UPDATE, {
            show: false,
            total: 0,
            current: 0
        })
    }
}

const getters = {
    [types.GETTER_PROGRESS_PROGRESS](state){
        var p = (state.current / state.total)
        if(isFinite(p)){
            return p.toFixed(4) * 100
        }
        return 0
    },
    [types.GETTER_PROGRESS_MESSAGE](state){
        return `${state.current}/${state.total} ${format('P2',state.curretnt/state.total)} finished`
    },
    [types.GETTER_PROGRESS_ISSHOW](state){
        return state.show
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}