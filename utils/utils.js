export const redirectLocale = (app, nameRoute) => {
    app.router.push(app.localePath(nameRoute, app.store.state.locale))
}