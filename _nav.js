// IMPORTANT !!! WE JUST APPLY 2 LEVEL NAVIGATOR <=======================
export const navs = () => {
  return [
    //########################## Dont need Login to
    {
      icon: "mdi-apps",
      title: "home.welcome", //I18N key in file locales/en.json && vi.json
      to: "index",
      auth: false
    },
    {
      icon: "mdi-account",
      title: "home.signup",
      to: "signup",
      auth: false

    },
    {
      icon: "mdi-account-arrow-right",
      title: "home.signin",
      to: "signin",
      auth: false
    },
    ////##########################

    //########################## Need login
    {
      icon: "mdi-folder-open",
      title: "home.trades", //I18N key in file locales/en.json && vi.json
      to: "trades",
      auth: true
    },
  ]
}
