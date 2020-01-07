//state
import Axios from 'axios'
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

        return new Promise((resolve, reject) => {


            Axios.post('clock-new', payload)
                .then(res => {
                    console.log(res.data.data);
                    commit('new_time', res.data.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })

        // console.log(payload);


        // commit('new_time', payload)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}