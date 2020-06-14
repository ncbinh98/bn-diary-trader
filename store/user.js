import * as api from "../services/userAPI"

export const state = () => ({
    loading: false,
    error: null,
    user: {}
})

export const getters = {
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getLocale: (state) => state.locale,
    getListLocales: (state) => state.listLocales,
    getUser: (state) => state.user,
}

export const mutations = {
    setLoading(state, payload) {
        state.loading = payload
    },
    setError(state, payload) {
        state.error = payload
    },
    setUser(state, payload) {
        state.user = payload
    },

}

export const actions = {
    async me({ state, commit, dispatch }) {
        try {
            commit("setLoading", true)
            const { data } = await api.me(this)
            commit("setUser", data)
            commit("setLoading", false)
        } catch (error) {
            commit("setLoading", false)
        }
    },

    async registerUser({ state, commit, dispatch }, payload) {
        try {
            commit("setLoading", true)
            const data = await api.registerUser(this, payload)
            commit("setLoading", false)
            this.commit('setSuccess', data.statusText)
            const app = this
            setTimeout(() => {
                app.commit('setSuccess', null)
            }, 3000)
        } catch (error) {
            commit("setLoading", false)
        }

    },

    async loginUser({ state, commit, dispatch }, payload) {
        try {
            commit("setLoading", true)
            const result = await api.loginUser(this, payload)
            commit("setLoading", false)
            this.commit('setSuccess', result.statusText)
            const app = this
            setTimeout(() => {
                app.commit('setSuccess', null)
            }, 3000)
            localStorage.setItem('bn-token', result.data.jwt)
        } catch (error) {
            console.log(error)
            commit("setLoading", false)
        }
    },

}
