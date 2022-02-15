import axios from 'axios'
import i18n from '../i18n'

// 请求并设置多语言数据
const languageCache = {}
export const setLanguage = async (language = 'zh_CN') => {
    let languageData = null
    if (languageCache[language]) {
        languageData = languageCache[language]
    } else {
        const {
            data
        } = await axios.get(`/i18n/${language}/index.json`)
        languageCache[language] = languageData = data
    }
    i18n.setLocaleMessage(language, languageData)
    i18n.locale = language
}
