import Axios from "axios"


const state = {
    projects: [

    ]

}
//mutations
const mutations = {
    set_projects(state, payload) {
        state.projects = payload
    },
    new_projects(state, payload) {
        state.projects.unshift(payload)
    },
    delete_projects(state, id) {
        const project = state.projects.filter(project => project.id !== id)
        state.projects = project
    },



}
//getters
const getters = {
    get_projects(state) {
        return state.projects
    },
    show_projects: (state) => (id) => {
        return state.projects.find(project => project.id === id)
    },
    dailyTotal(state) {
        return state.projects
    }
}

//actions
const actions = {
    get_projects({ commit }) {

        return new Promise((resolve, reject) => {
            Axios.get('timer-projects')
                .then(res => {
                    //console.log(res);

                    resolve()
                    commit('set_projects', res.data.data)
                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })

    },
    new_projects({ commit }, payload) {
        return new Promise((resolve, reject) => {
            Axios.post('/timer-projects-new', { ...payload, completed: false })
                .then(res => {
                    //console.log(res);

                    resolve()

                    commit('new_projects', res.data.data)





                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })

    },
    edit_projects({ commit, dispatch }, payload) {
        console.log(payload);

        return new Promise((resolve, reject) => {






            Axios.patch(`/timer-projects-update/${payload.id}`, payload.completed === true ? {
                name: payload.name,
                goal: payload.goal,
                completed: true
            } : {
                    name: payload.name,
                    goal: payload.goal,
                    completed: false
                })

                .then(res => {
                    // console.log(res);

                    resolve(res);

                    dispatch('get_projects')







                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })

    },
    delete_project({ commit }, id) {
        return new Promise((resolve, reject) => {
            Axios.delete(`timer-projects-delete/${id}`)
                .then(() => {
                    commit('delete_projects', id)
                    resolve()

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