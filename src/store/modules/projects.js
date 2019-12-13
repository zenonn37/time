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
        state.projects.push(payload)
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
                    console.log(res);

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
            Axios.post('/timer-projects-new', payload)
                .then(res => {
                    console.log(res);

                    resolve()

                    commit('new_projects', res.data.data)





                }).catch(err => {
                    reject()
                    commit('base/set_errors', err.response.data.message, { root: true })
                })
        })

    },
    delete_project({ commit }) {
        commit(' delete_projects')
    }
}




export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}