//state

const state = {
    time: [

    ]

}
//mutations
const mutations = {
    set_time(state, time) {
        state.time = time
    },
    new_time(state, time) {
        state.time.push(time)
    },
    delete_time(state, id) {
        const time = state.time.filter(time => time.id !== id)
        state.time = time
    },



}
//getters
const getters = {
    get_time(state) {
        return state.time
    },
    show_time: (state) => (id) => {
        return state.time.find(time => time.id === id)
    },
    dailyTotal(state) {
        return state.time
    }
}

//actions
const actions = {
    get_time({ commit }) {
        commit('set_time')
    },
    new_time({ commit }, payload) {

        console.log(payload);


        commit('new_time', payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}