import * as api from "../services/userAPI"
import { redirectLocale } from '@/utils/utils'
import { LOCALSTORAGE_TOKEN_NAME } from '@/utils/constants'

export const state = () => ({
    loading: false,
    error: null,
    user: null
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
        return new Promise(async (resolver, reject) => {
            try {
                commit("setLoading", true)
                const { data } = await api.me(this)
                commit("setUser", data)
                commit("setLoading", false)
                resolver(data)
            } catch (error) {
                commit("setLoading", false)
            }
        })
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
            commit("setUser", result.data.user)
            this.commit('setSuccess', result.statusText)
            const app = this
            setTimeout(() => {
                app.commit('setSuccess', null)
            }, 3000)
            const { jwt } = result.data
            localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, jwt)
            this.$axios.setHeader('Authorization', 'Bearer ' + jwt)
            redirectLocale(this.app, 'trades')
        } catch (error) {
            commit("setLoading", false)
        }
    },

    async logoutUser({ state, commit, dispatch }, payload) {
        localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
        commit('setUser', null)
        this.$axios.setHeader('Authorization', null)
        redirectLocale(this.app, 'signin')
    }

}
