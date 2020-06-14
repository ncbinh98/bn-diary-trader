import withQuery from "with-query"
export const registerUser = (app, params) => app.$axios.post("/auth/local/register", params)
export const loginUser = (app, params) => app.$axios.post("/auth/local", params)
export const me = (app) => app.$axios.get("/users/me")
