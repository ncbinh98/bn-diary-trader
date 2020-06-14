import { LOCALSTORAGE_TOKEN_NAME } from '@/utils/constants'
import { redirectLocale } from '@/utils/utils'
export default ({ app, store }) => {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)
    if (!token || !store.state.user.user) {
        redirectLocale(app, 'signin')
    }
}
