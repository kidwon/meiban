// mixins/i18n.js - 国际化混入
import { getCurrentLanguage, getTranslation } from '../i18n/index.js'

export default {
  data() {
    return {
      currentLanguage: getCurrentLanguage()
    }
  },
  
  methods: {
    /**
     * 翻译函数
     * @param {string} key - 翻译键
     * @returns {string} 翻译后的文本
     */
    $t(key) {
      return getTranslation(key, this.currentLanguage)
    },
    
    /**
     * 手动更新当前语言（通常不需要调用）
     */
    $updateLanguage() {
      this.currentLanguage = getCurrentLanguage()
    }
  },
  
  mounted() {
    // 监听语言变更事件
    this._languageChangeHandler = (event) => {
      this.currentLanguage = event.detail.language
      this.$forceUpdate() // 强制更新组件
    }
    
    window.addEventListener('languageChanged', this._languageChangeHandler)
  },
  
  beforeUnmount() {
    // 清理事件监听器
    if (this._languageChangeHandler) {
      window.removeEventListener('languageChanged', this._languageChangeHandler)
    }
  }
}