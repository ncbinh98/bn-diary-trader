// IMPORTANT !!! WE JUST APPLY 2 LEVEL NAVIGATOR <=======================
export const navs = () => {
  return [
    {
      icon: "mdi-apps",
      title: "home.welcome", //I18N key in file locales/en.json && vi.json
      to: "index",
    },
    {
      icon: "mdi-account",
      title: "home.signup",
      to: "signup",

    },
    {
      icon: "mdi-account-arrow-right",
      title: "home.signin",
      to: "signin",

    },
  ]
}
