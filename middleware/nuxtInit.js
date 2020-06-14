export default ({ app, store, $axios }) => {
  const token = localStorage.getItem('bn-token')
  if (token && store.state.nuxtInit) {
    $axios.setHeader('Authorization', 'Bearer ' + token)
    store.dispatch('user/me')
    store.commit('setNuxtInit', false)
  }
  if (app.context.route.fullPath.includes("/vi")) {
    // $axios.setHeader('aha', '123')
    store.dispatch("changeLocale", "vi")

  }
}
