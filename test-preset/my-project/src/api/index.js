import http from './httpInstance'
import './mock'

export default {
    test() {
        return http.get('/test')
    }
}
