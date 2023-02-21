import { createStore } from 'vuex'
import { request } from '@/services/api.services.js'
import { repositories, issues, comments } from '@/querys/querys.js'
export const store = createStore({
  state: {
    repositories: [],
    repository: null,
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
    selectRepository(state, data) {
      state.repository = data
    },
    loading(state, data) {
      state.loading = data
    },
  },
  actions: {
    async getRepositories({ commit, dispatch }) {
      try {
        const response = await request(repositories)
        commit(
          'setRepositories',
          response.data.data.repositoryOwner.repositories.nodes
        )
        if (response) {
          dispatch('getIssues')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getIssues({ commit, getters }) {
      try {
        this.state.loading = true
        const issuesAll = []
        for (let item of getters.getRepositories) {
          const response = await request(issues(item.name))
          issuesAll.push(response.data.data.repository)
        }
        Promise.all(issuesAll)
          .then(res => {
            commit('setIssues', res)
            this.state.loading = false
          })
          .catch(error => console.log(error))
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

  getters: {
    getRepositories: state => state.repositories,
    getIssues: state => state.issues.filter(el => el.name === state.repository),
  },
})
