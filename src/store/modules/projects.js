

const state = {
    projects: [
        {
            name: 'Timer App',
            total: 28800,
            tasks: 100,
            completed: false,
            goal: 30000,
            id: 697,
        },
        {
            name: 'Money-Tracker',
            total: 70000,
            tasks: 1500,
            completed: true,
            goal: 162000,
            id: 698,
        },
        {
            name: 'Toka Weather',
            total: 700000,
            tasks: 1500,
            completed: true,
            goal: 162000,
            id: 699,
        }
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
        commit('set_projects')
    },
    new_projects({ commit }, payload) {

        const data = {
            name: payload.name

        }
        commit('new_project', data)
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