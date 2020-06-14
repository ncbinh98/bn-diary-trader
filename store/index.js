import * as api from "../services/testAPI"

export const state = () => ({
  loading: false,
  error: null,
  success: null,
  nuxtInit: true,
  locale: "en",
  listLocales: ["en", "vi"],
})

export const getters = {
  getLoading: (state) => state.loading,
  getError: (state) => state.error,
  getSuccess: (state) => state.success,
  getLocale: (state) => state.locale,
  getListLocales: (state) => state.listLocales,
}

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload

  },
  setSuccess(state, payload) {
    state.success = payload
  },
  setLocale(state, payload) {
    state.locale = payload
  },
  setNuxtInit(state, payload) {
    state.nuxtInit = payload
  },
}

export const actions = {
  async changeLocale({ state, commit, dispatch }, payload) {
    //  Dosth here please
    commit("setLocale", payload)
  },


  async getTests({ state, commit }, payload) {
    console.log(await api.getTests(this))
  },
}
