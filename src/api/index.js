import http from './httpInstance'

export default {
    test() {
        return http.get('https://restapi.amap.com/v3/assistant/inputtips?key=12&keywords=雷峰塔')
    }
}