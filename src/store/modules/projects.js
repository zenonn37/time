import Axios from "axios";
Axios.defaults.baseURL = `${process.env.VUE_APP_API}`;

const state = {
  projects: [],
  complete: false
};
//mutations
const mutations = {
  set_projects(state, payload) {
    state.projects = payload;
  },
  new_projects(state, payload) {
    state.projects.unshift(payload);
  },
  update(state, payload) {
    const projects = state.projects.map(project =>
      project.id === payload.id
        ? {
            ...project,
            name: payload.name,
            goal: payload.goal,
            complete: payload.complete
          }
        : project
    );

    state.projects = projects;
  },
  delete_projects(state, id) {
    const project = state.projects.filter(project => project.id !== id);
    state.projects = project;
  },
  filter_status(state, id) {
    const project = state.projects.filter(project => project.id !== id);
    state.projects = project;
  },
  toggleComplete(state, boolean) {
    state.complete = boolean;
  }
};
//getters
const getters = {
  get_projects(state) {
    return state.projects;
  },
  show_projects: state => id => {
    return state.projects.find(project => project.id === id);
  },
  dailyTotal(state) {
    return state.projects;
  },
  toggle(state) {
    return state.complete;
  }
};

//actions
const actions = {
  toggleComplete({ commit }, boolean) {
    commit("toggleComplete", boolean);
  },

  search({ commit }, term) {
    return new Promise((resolve, reject) => {
      Axios.post("timer-projects", { term: term })
        .then(res => {
          commit("set_projects", res.data.data);
          resolve(res);
        })
        .catch(err => {
          reject();
          commit("base/set_errors", err.response.data.message, { root: true });
        });
    });
  },

  get_projects({ commit }, payload) {
    return new Promise((resolve, reject) => {
      //convert boolean to 1 and 0 for API
      const bool = payload ? 1 : 0;

      Axios.get(`timer-projects/${bool}`)
        .then(res => {
          resolve();
          commit("set_projects", res.data.data);
        })
        .catch(err => {
          reject();
          commit("base/set_errors", err.response.data.message, { root: true });
        });
    });
  },
  new_projects({ commit, getters, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      Axios.post("/timer-projects-new", { ...payload, completed: false })
        .then(res => {
          //console.log(res);

          const boolean = getters.toggle;

          resolve();
          commit("toggleComplete", false);

          commit("new_projects", res.data.data);
          if (boolean) {
            dispatch("get_projects", false);
          }
        })
        .catch(err => {
          reject();
          commit("base/set_errors", err.response.data.message, { root: true });
        });
    });
  },
  edit_projects({ commit }, payload) {
  
    return new Promise((resolve, reject) => {
      Axios.patch(
        `/timer-projects-update/${payload.id}`,
        payload
            )
        .then(res => {
          commit("update", payload);
         
          if (payload.action) {
            commit("filter_status", payload.id);
          }
         
          resolve(res);
        
        })
        .catch(err => {
          reject();
          commit("base/set_errors", err.response.data.message, { root: true });
        });
    });
  },
  delete_project({ commit }, id) {
    return new Promise((resolve, reject) => {
      Axios.delete(`timer-projects-delete/${id}`)
        .then(() => {
          commit("delete_projects", id);
          resolve();
        })
        .catch(err => {
          reject();
          commit("base/set_errors", err.response.data.message, { root: true });
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
