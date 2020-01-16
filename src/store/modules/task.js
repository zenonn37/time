import Axios from 'axios'

const state = {
    //finished tasks from DB
    tasks: [],
    //local memory active task one only
    active_task: "",
    //time sent
    seconds: 0,
    //global state of active task
    active: false,
    //stop clock if user saves without stopping clock
    stop: false,

}
//mutations
const mutations = {
    set_stop(state, payload) {
        state.stop = payload
    },
    set_tasks(state, payload) {
        state.tasks = payload
    },
    new_tasks(state, payload) {
        state.tasks.unshift(payload)
    },
    active_tasks(state, payload) {
        state.active_task = payload
    },
    delete_active_task(state) {
        state.active_tasks = ""
    },
    delete_tasks(state, id) {
        const task = state.tasks.filter(task => task.id !== id)
        state.tasks = task
    },
    set_seconds(state, payload) {
        state.seconds = payload
    },
    set_active_status(state, payload) {
        state.active = payload
    },
    count_seconds(state) {
        state.seconds--
    }



}
//getters
const getters = {
    get_tasks(state) {
        return state.tasks
    },
    get_active_tasks(state) {
        return state.active_task
    },
    show_tasks: (state) => (id) => {
        return state.tasks.find(task => task.id === id)
    },
    dailyTotal(state) {
        return state.tasks
    },
    get_seconds(state) {
        return state.seconds
    },

    active_status(state) {
        return state.active
    },
    get_stop(state) {
        return state.stop
    }
}

//actions
const actions = {

    filter_task_chart_project({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Axios.post(`filter-task-chart-project/${payload.id}`, {
                start: payload.start,
                end: payload.end
            })
                .then(res => {
                    resolve(res)

                    commit('set_tasks', res.data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    filter_task_chart({ commit }, payload) {

        return new Promise((resolve, reject) => {
            // console.log(payload);


            Axios.post('filter_task_chart',
                payload
            )
                .then(res => {

                    commit('set_tasks', res.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })


    },
    global_task_chart({ commit }) {
        return new Promise((resolve, reject) => {
            Axios.get('global_task_chart')
                .then(res => {
                    resolve(res)

                    commit('set_tasks', res.data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },

    //all task for last 6 days
    past_week({ commit }, id) {
        return new Promise((resolve, reject) => {
            Axios.get(`past-week/${id}`)
                .then(res => {
                    resolve(res)

                    commit('set_tasks', res.data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    //all task for current project
    all_tasks({ commit }, id) {
        return new Promise((resolve, reject) => {
            Axios.get(`timer-tasks-all/${id}`)
                .then(res => {
                    resolve(res)


                    commit('set_tasks', res.data.data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    //filter saved tasks by date

    filter_day_range({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Axios.get(`filter-range/${payload.id}/${payload.days}`)
                .then(res => {
                    resolve(res)


                    commit('set_tasks', res.data.data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    //delete task
    delete_task({ commit }, id) {
        return new Promise((resolve, reject) => {
            Axios.delete(`timer-task-delete/${id}`)

                .then(res => {
                    resolve(res)


                    commit('delete_tasks', id)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    //edit task function
    edit_task({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Axios.patch(`timer-task-update/${payload.id}`, {
                name: payload.name
            })
                .then(res => {
                    resolve(res)


                    //commit('set_tasks', res.data.data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    //clear active task
    delete_active_task({ commit, dispatch }) {
        dispatch('set_active_task', false)
        commit('delete_active_task')
    },
    set_stop({ commit }, payload) {
        commit('set_stop', payload)
    },

    set_tasks({ commit }, id) {
        return new Promise((resolve, reject) => {
            Axios.get(`timer-task/${id}`)
                .then(res => {
                    resolve(res)


                    commit('set_tasks', res.data.data)
                }).catch(err => {
                    reject(err)
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })
    },
    //create new task
    save_active_task({ commit, dispatch, getters }, bool) {
        return new Promise((resolve, reject) => {

            dispatch('set_active_task', false)
            dispatch('set_stop', true)


            let active = getters['get_active_tasks']
            let seconds = getters['get_seconds']



            const data = {
                timer_project_id: active.project_id,
                name: active.name,
                actual: seconds,
                goal: active.seconds,
                completed: !bool ? false : true

            }



            Axios.post('timer-task-new', data)
                .then(res => {

                    commit('new_tasks', res.data.data)
                    resolve(res)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })


        })



    },

    set_active_task({ commit }, payload) {
        commit('set_active_status', payload)
    },
    set_seconds({ commit }, payload) {
        commit('set_seconds', payload)
    },
    count_seconds({ commit }) {
        commit('count_seconds')
    },
    active_task({ commit, dispatch }, payload) {
        commit('active_tasks', payload)
        commit('set_active_status', true)
        dispatch('set_stop', false)
    },
    get_tasks({ commit }) {
        commit('set_projects')
    },
    new_tasks({ commit, dispatch }, payload) {
        commit('new_tasks', payload)
        dispatch('set_seconds', payload.seconds)

        // return new Promise((resolve, reject) => {
        //     const data = {
        //         name: payload.name

        //     }
        //    
        // })



    },
    delete_tasks({ commit }) {
        commit(' delete_tasks')
    }
}




export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}