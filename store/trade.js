import * as api from "../services/tradeAPI"
import { redirectLocale } from '@/utils/utils'

export const state = () => ({
    loading: false,
    error: null,
    user: null,
    trades: []
})

export const getters = {
    getTrades: (state)=> state.trades,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
}

export const mutations = {
    setLoading(state, payload) {
        state.loading = payload
    },
    setError(state, payload) {
        state.error = payload
    },
    setTrades(state, payload) {
        state.trades = payload
    },

}

export const actions = {
    async getTradesRequest({ state, commit, dispatch }) {
        commit("setLoading", true)
        api.getTradesRequest(this).then(({data})=>{
            console.log(data)
            commit("setTrades", data)
            commit("setLoading", true)
        })

    },


}
