//state
import Axios from 'axios'
import moment from 'moment'
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

    entry({ commit }, payload) {
        console.log('sending entry');
        return new Promise((resolve, reject) => {


            //check if clock parent exist for current day!



            Axios.post('entries-new', payload)
                .then(res => {
                    console.log(res.data.data);

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

                    console.log(res.data.data);
                    const test = res.data.data
                    const today = moment().format().slice(0, 10)
                    console.log(today);

                    console.log(test + 'empty');

                    if (test.length === 0) {

                        resolve({ bool: true })
                        return false
                    }

                    test.every(function (el) {
                        const date = el.date.slice(0, 10)
                        console.log('test');
                        console.log(today + '' + date);

                        if (date === today) {
                            const id = el.id
                            console.log('Dup warning');
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


                    //commit('new_time', res.data.data)

                    //resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })

    },

    new_time({ commit }, payload) {

        return new Promise((resolve, reject) => {


            //check if clock parent exist for current day!



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
    },
    get_time({ commit }, id) {

        return new Promise((resolve, reject) => {


            Axios.get(`clock/${id}`)
                .then(res => {
                    console.log(res.data.data);
                    commit('set_time', res.data.data)
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