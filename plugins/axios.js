export default function ({ $axios, redirect, app }) {
  $axios.onRequest((config) => {
    console.log("This is on ~/plugins/axios folder")
    console.log("Making request to " + config.url)
  })

  $axios.onResponseError((error) => {
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   redirect("/400")
    // }
    let errorMsg = null
    try {
      errorMsg = error.response.data.message[0].messages[0].message
      app.store.commit("setError", errorMsg)
      setTimeout(() => { app.store.commit("setError", null) }, 3000)
    } catch (err) {
      errorMsg = error.response.data.message
      app.store.commit("setError", errorMsg)
      setTimeout(() => { app.store.commit("setError", null) }, 3000)
    }

  })
}
