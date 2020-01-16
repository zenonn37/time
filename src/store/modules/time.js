//state
import Axios from 'axios'
import moment from 'moment'
const state = {
    time: [

    ],
    chart: [

    ],
    clockActive: false

}
//mutations
const mutations = {
    set_time(state, time) {
        state.time = time
    },
    set_chart(state, chart) {
        state.chart = chart
    },
    set_clock_active(state, bool) {
        state.clockActive = bool
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
    get_clock_active(state) {
        return state.clockActive
    },
    get_time(state) {
        return state.time
    },
    get_chart(state) {
        return state.chart
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

    clock_active({ commit }, bool) {
        commit('set_clock_active', bool)
    },

    entry({ commit, dispatch }, payload) {

        return new Promise((resolve, reject) => {

            //check if clock parent exist for current day!


            Axios.post('entries-new', payload)
                .then(res => {
                    // console.log(res.data.data);
                    dispatch("get_time", payload.project_id)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })

    },

    check_clock_parent({ commit }, id) {
        return new Promise((resolve, reject) => {


            //check if clock parent exist for current day!



            Axios.get(`clock/${id}`, id)
                .then(res => {


                    const test = res.data.data
                    const today = moment().format().slice(0, 10)
                    // console.log(today);


                    if (test.length === 0) {

                        resolve({ bool: true })
                        return false
                    }

                    test.every(function (el) {
                        const date = el.date.slice(0, 10)


                        if (date === today) {
                            const id = el.id

                            resolve(
                                {
                                    bool: false,
                                    id: id
                                }


                            )

                        } else {
                            resolve(
                                {
                                    bool: true,

                                }


                            )
                        }

                    });


                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })

    },

    new_time({ commit, dispatch }, payload) {

        return new Promise((resolve, reject) => {


            //check if clock parent exist for current day!



            Axios.post('clock-new', payload)
                .then(res => {
                    //console.log(res.data.data);
                    dispatch("get_time", payload.project_id)
                    commit('new_time', res.data.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })

        // console.log(payload);


        // commit('new_time', payload)
    },
    get_time({ commit }, id) {

        return new Promise((resolve, reject) => {


            Axios.get(`clock/${id}`)
                .then(res => {

                    commit('set_time', res.data.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })


    },
    clock_chart({ commit }) {

        return new Promise((resolve, reject) => {


            Axios.get('clock-chart')
                .then(res => {

                    commit('set_chart', res.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })


    },
    clock_chart_project({ commit }, id) {

        return new Promise((resolve, reject) => {


            Axios.get(`clock-chart/${id}`)
                .then(res => {

                    commit('set_chart', res.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })


    },
    filter_clock_chart({ commit }, payload) {

        return new Promise((resolve, reject) => {
            //  console.log(payload);


            Axios.post('clock-chart-filter',
                payload
            )
                .then(res => {

                    commit('set_chart', res.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })


    },
    filter_clock_chart_project({ commit }, payload) {

        return new Promise((resolve, reject) => {
            console.log(payload);


            Axios.post(`clock-chart-filter-project/${payload.id}`,
                {
                    start: payload.start,
                    end: payload.end
                }
            )
                .then(res => {

                    commit('set_chart', res.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })


    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}