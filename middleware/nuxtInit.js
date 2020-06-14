import { LOCALSTORAGE_TOKEN_NAME } from '@/utils/constants'

export default async ({ app, store, $axios }) => {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)
  if (token && store.state.nuxtInit) {
    $axios.setHeader('Authorization', 'Bearer ' + token)
    await store.dispatch('user/me')
    store.commit('setNuxtInit', false)
  }
  if (app.context.route.fullPath.includes("/vi")) {
    // $axios.setHeader('aha', '123')
    store.dispatch("changeLocale", "vi")

  }
}
