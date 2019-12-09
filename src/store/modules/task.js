

const state = {
    //finished tasks from DB
    tasks: [],
    //local memory active task one only
    active_task: "",
    //time sent
    seconds: 0,
    //global state of active task
    active: false,

}
//mutations
const mutations = {
    set_tasks(state, payload) {
        state.tasks = payload
    },
    new_tasks(state, payload) {
        state.tasks.push(payload)
    },
    active_tasks(state, payload) {
        state.active_task = payload
    },
    delete_active_task(state, id) {
        const task = state.tasks.filter(task => task.id !== id)
        state.active_task = task
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
    active_status() {
        return state.active
    }
}

//actions
const actions = {

    set_active_task({ commit }, payload) {
        commit('set_active_status', payload)
    },
    set_seconds({ commit }, payload) {
        commit('set_seconds', payload)
    },
    active_task({ commit }, payload) {
        commit('active_tasks', payload)
        commit('set_active_status', true)
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