import withQuery from "with-query"
export const getTradesRequest = (app) => app.$axios.get("/trades?_sort=tradeDate:DESC")
