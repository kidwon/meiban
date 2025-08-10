// plugins/i18n.js - Vue i18n plugin
import { getCurrentLanguage, getTranslation } from '../i18n/index.js'

export default {
  install(app) {
    // Create reactive language state
    const state = {
      currentLanguage: getCurrentLanguage()
    }

    // Translation method
    const $t = (key) => {
      return getTranslation(key, state.currentLanguage)
    }

    // Make $t globally available
    app.config.globalProperties.$t = $t
    app.provide('$t', $t)

    // Listen for language changes
    window.addEventListener('languageChanged', (event) => {
      state.currentLanguage = event.detail.language
      // Force re-render by updating all component instances
      app._instance?.proxy?.$forceUpdate?.()
    })

    // Provide language state
    app.provide('i18n', {
      currentLanguage: state.currentLanguage,
      t: $t
    })
  }
}