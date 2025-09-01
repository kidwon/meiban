// plugins/i18n.js - Vue i18n plugin
import { ref } from 'vue'
import { getCurrentLanguage, getTranslation } from '../i18n/index.js'

export default {
  install(app) {
    // Create reactive language state
    const currentLanguage = ref(getCurrentLanguage())

    // Create reactive translation method
    const $t = (key) => {
      return getTranslation(key, currentLanguage.value)
    }

    // Make $t globally available
    app.config.globalProperties.$t = $t
    app.provide('$t', $t)

    // Listen for language changes
    window.addEventListener('languageChanged', (event) => {
      currentLanguage.value = event.detail.language
    })

    // Provide language state
    app.provide('i18n', {
      currentLanguage: currentLanguage,
      t: $t
    })
  }
}