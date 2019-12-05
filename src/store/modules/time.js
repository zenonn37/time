//state
const state = {
    time: [
        {
            date: "Thu Dec 05 2019 15:16:19 GMT-0500 (Eastern Standard Time)",
            id: 9,
            project: "Timer",
            time: 1000
        },
        {
            date: "Thu Dec 07 2019 15:16:19 GMT-0500 (Eastern Standard Time)",
            id: 11,
            project: "Timer",
            time: 7200
        }
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

        const data = {
            id: Math.round(Math.random() + 9),
            time: payload,
            date: new Date(),
            project: "Timer",

        }
        commit('new_time', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}