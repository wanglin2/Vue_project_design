import http from './httpInstance'
import './_mock'

export default {
    test() {
        return http.get('/test')
    }
}