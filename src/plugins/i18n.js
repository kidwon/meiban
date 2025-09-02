// plugins/i18n.js - Vue i18n plugin
import { ref } from 'vue'
import { getCurrentLanguage, getTranslation } from '../i18n/index.js'
import store from '../store' // 直接导入 store

export default {
  install(app) {
    // Create reactive language state
    const currentLanguage = ref(getCurrentLanguage())
    
    // Sync localStorage language preference to Vuex store
    store.dispatch('updateAppSettings', { language: currentLanguage.value })

    // Create reactive translation method that properly tracks currentLanguage
    const $t = (key) => {
      // This will be reactive because it reads currentLanguage.value
      return getTranslation(key, currentLanguage.value)
    }

    // Make $t globally available
    app.config.globalProperties.$t = $t
    app.provide('$t', $t)

    // Listen for language changes from multiple sources
    window.addEventListener('languageChanged', (event) => {
      currentLanguage.value = event.detail.language
    })
    
    // Also watch for Vuex store changes
    store.watch(
      (state) => state.settings.language,
      (newLanguage) => {
        if (currentLanguage.value !== newLanguage) {
          currentLanguage.value = newLanguage
        }
      }
    )

    // Provide language state and reactive $t globally
    app.provide('i18n', {
      currentLanguage: currentLanguage,
      t: $t
    })
    
    // Force Vue to track currentLanguage changes globally
    app.config.globalProperties.$currentLanguage = currentLanguage
  }
}