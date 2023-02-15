import { createStore } from 'vuex'
import { request } from '@/services/api.services.js'
import { repositories, issues, comments } from '@/querys/querys.js'
export const store = createStore({
  state: {
    repositories: [],
    issues: [],
    comments: [],
    loading: false,
  },
  mutations: {
    setRepositories(state, data) {
      state.repositories = data
    },
    setIssues(state, data) {
      state.issues = data
    },
    setComments(state, data) {
      state.comments = data
    },
    loading(state, data) {
      state.loading = data
    },
  },
  actions: {
    async getRepositories({ commit }) {
      try {
        const response = await request(repositories)
        commit(
          'setRepositories',
          response.data.data.repositoryOwner.repositories.nodes
        )
      } catch (error) {
        console.log(error)
      }
    },
    async getIssues({ commit }, name) {
      try {
        this.state.loading = true
        const response = await request(issues(name))
        commit('setIssues', response.data.data.repository.issues.nodes)
        this.state.loading = false
      } catch (error) {
        console.log(error)
      }
    },

    async getComments({ commit }, name) {
      try {
        this.state.loading = true
        const response = await request(comments(name))
        if (response.data.data.repository.issue !== null) {
          commit(
            'setComments',
            response.data.data.repository.issue.comments.nodes
          )
        }

        this.state.loading = false
      } catch (error) {
        console.log(error)
      }
    },
  },

  getters: {},
})
