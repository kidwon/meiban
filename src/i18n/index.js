// i18n/index.js - 国际化配置中心
import ja from './locales/ja.js'
import zh from './locales/zh.js'
import en from './locales/en.js'
import store from '../store' // 导入 Vuex store

// 支持的语言列表
export const SUPPORTED_LANGUAGES = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

// 语言翻译数据
export const TRANSLATIONS = {
  ja,
  zh,
  en
}

// 默认语言
export const DEFAULT_LANGUAGE = 'ja'

// localStorage key
export const LANGUAGE_STORAGE_KEY = 'preferred-language'

/**
 * 获取翻译文本
 * @param {string} key - 翻译键，支持点分隔的嵌套键
 * @param {string} language - 语言代码
 * @returns {string} 翻译后的文本
 */
export function getTranslation(key, language = DEFAULT_LANGUAGE) {
  const translations = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE]
  
  const keys = key.split('.')
  let value = translations
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      console.warn(`Translation key "${key}" not found for language "${language}"`)
      return key
    }
  }
  
  return value || key
}

/**
 * 获取当前语言设置
 * @returns {string} 语言代码
 */
export function getCurrentLanguage() {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (saved && SUPPORTED_LANGUAGES.find(lang => lang.code === saved)) {
    return saved
  }
  
  // 检测浏览器语言
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) return 'zh'
  if (browserLang.startsWith('ja')) return 'ja'
  if (browserLang.startsWith('en')) return 'en'
  
  return DEFAULT_LANGUAGE
}

/**
 * 设置语言
 * @param {string} language - 语言代码
 */
export function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.find(lang => lang.code === language)) {
    console.warn(`Unsupported language: ${language}`)
    return false
  }
  
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  document.documentElement.lang = language
  
  // 同步更新 Vuex store
  store.dispatch('updateAppSettings', { language })
  
  // 触发语言变更事件
  window.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { language } 
  }))
  
  return true
}

/**
 * 创建翻译函数
 * @param {string} currentLanguage - 当前语言
 * @returns {function} 翻译函数
 */
export function createTranslator(currentLanguage) {
  return function(key) {
    return getTranslation(key, currentLanguage)
  }
}