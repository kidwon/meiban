<template>
  <div 
    class="language-switcher"
    :class="{
      'compact': compact,
      'dark-theme': theme === 'dark'
    }"
    :style="positionStyle"
  >
    <div class="lang-buttons" v-if="!compact">
      <button 
        v-for="lang in languages" 
        :key="lang.code"
        @click="switchLanguage(lang.code)"
        :class="['lang-btn', { active: currentLanguage === lang.code }]"
        :title="getTooltip(lang)"
      >
        <span class="lang-flag">{{ lang.flag }}</span>
        <span class="lang-name" v-if="showNames">{{ lang.name }}</span>
      </button>
    </div>
    
    <!-- 紧凑模式：下拉菜单 -->
    <div class="compact-switcher" v-else>
      <button 
        @click="toggleDropdown"
        :class="['compact-btn', { active: showDropdown }]"
        :title="t('languageSwitcher.title')"
      >
        <span class="current-flag">{{ currentLanguageData.flag }}</span>
        <span class="dropdown-arrow">▼</span>
      </button>
      
      <div 
        class="language-dropdown" 
        v-show="showDropdown"
        @click.stop
      >
        <button 
          v-for="lang in languages" 
          :key="lang.code"
          @click="switchLanguage(lang.code)"
          :class="['dropdown-item', { active: currentLanguage === lang.code }]"
        >
          <span class="lang-flag">{{ lang.flag }}</span>
          <span class="lang-name">{{ lang.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  SUPPORTED_LANGUAGES, 
  getCurrentLanguage, 
  setLanguage,
  getTranslation
} from '../i18n/index.js'

export default {
  name: 'LanguageSwitcher',
  props: {
    // 位置配置：'top-right', 'top-left', 'bottom-right', 'bottom-left'
    position: {
      type: String,
      default: 'top-right'
    },
    // 主题：'light', 'dark'
    theme: {
      type: String,
      default: 'light'
    },
    // 紧凑模式（移动端使用）
    compact: {
      type: Boolean,
      default: false
    },
    // 是否显示语言名称
    showNames: {
      type: Boolean,
      default: true
    },
    // 自定义偏移量
    offset: {
      type: Object,
      default: () => ({ top: 15, right: 15, bottom: 20, left: 20 })
    }
  },
  
  data() {
    return {
      currentLanguage: 'ja',
      languages: SUPPORTED_LANGUAGES,
      showDropdown: false
    }
  },
  
  computed: {
    currentLanguageData() {
      return this.languages.find(lang => lang.code === this.currentLanguage) || this.languages[0]
    },
    
    positionStyle() {
      const [vPos, hPos] = this.position.split('-')
      const style = { position: 'fixed', zIndex: 10003 }
      
      if (vPos === 'top') {
        style.top = `${this.offset.top}px`
      } else {
        style.bottom = `${this.offset.bottom}px`
      }
      
      if (hPos === 'right') {
        style.right = `${this.offset.right}px`
      } else {
        style.left = `${this.offset.left}px`
      }
      
      return style
    }
  },
  
  methods: {
    t(key) {
      return getTranslation(key, this.currentLanguage)
    },
    
    switchLanguage(langCode) {
      if (langCode === this.currentLanguage) return
      
      const success = setLanguage(langCode)
      if (success) {
        this.currentLanguage = langCode
        this.showDropdown = false
        this.$emit('language-changed', langCode)
      }
    },
    
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    
    hideDropdown() {
      this.showDropdown = false
    },
    
    getTooltip(lang) {
      return `${this.t('languageSwitcher.title')}: ${lang.name}`
    },
    
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.hideDropdown()
      }
    }
  },
  
  mounted() {
    this.currentLanguage = getCurrentLanguage()
    
    // 监听语言变更事件
    window.addEventListener('languageChanged', (event) => {
      this.currentLanguage = event.detail.language
    })
    
    // 监听点击外部关闭下拉菜单
    document.addEventListener('click', this.handleOutsideClick)
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  }
}
</script>

<style scoped>
/* 语言切换器基础样式 */
.language-switcher {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

/* 普通模式 */
.lang-buttons {
  display: flex;
  gap: 3px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6c757d;
  white-space: nowrap;
}

.lang-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.lang-btn.active {
  background: #d35400;
  color: white;
  box-shadow: 0 2px 8px rgba(211, 84, 0, 0.3);
}

.lang-btn.active:hover {
  background: #e67e22;
}

.lang-flag {
  font-size: 0.9rem;
  line-height: 1;
}

.lang-name {
  font-size: 0.75rem;
}

/* 紧凑模式 */
.compact-switcher {
  position: relative;
}

.compact-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  color: #6c757d;
}

.compact-btn:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.compact-btn.active {
  background: #d35400;
  color: white;
}

.current-flag {
  font-size: 1rem;
  line-height: 1;
}

.dropdown-arrow {
  font-size: 0.6rem;
  transition: transform 0.2s ease;
}

.compact-btn.active .dropdown-arrow {
  transform: rotate(180deg);
}

/* 下拉菜单 */
.language-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  min-width: 120px;
  backdrop-filter: blur(10px);
  animation: dropdownSlide 0.2s ease-out;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.8rem;
  color: #495057;
  text-align: left;
}

.dropdown-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.dropdown-item.active {
  background: #d35400;
  color: white;
}

.dropdown-item .lang-flag {
  font-size: 1rem;
}

.dropdown-item .lang-name {
  font-size: 0.8rem;
  font-weight: 500;
}

/* 深色主题 */
.dark-theme .lang-buttons,
.dark-theme .compact-btn,
.dark-theme .language-dropdown {
  background: rgba(33, 37, 41, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark-theme .lang-btn,
.dark-theme .compact-btn,
.dark-theme .dropdown-item {
  color: #adb5bd;
}

.dark-theme .lang-btn:hover,
.dark-theme .dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .lang-buttons {
    padding: 3px;
    gap: 2px;
  }
  
  .lang-btn {
    padding: 5px 7px;
    font-size: 0.7rem;
  }
  
  .lang-name {
    display: none; /* 移动端隐藏文字，只显示国旗 */
  }
  
  .compact-btn {
    padding: 5px 7px;
  }
  
  .dropdown-item {
    padding: 8px 10px;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .lang-buttons {
    padding: 3px;
  }
  
  .lang-btn {
    padding: 5px 6px;
  }
  
  .lang-flag {
    font-size: 0.9rem;
  }
}

/* 安全区域支持 */
@media (max-width: 768px) {
  .language-switcher[style*="top:"] {
    top: calc(env(safe-area-inset-top, 8px) + 8px) !important;
  }
  
  .language-switcher[style*="right:"] {
    right: calc(env(safe-area-inset-right, 10px) + 10px) !important;
  }
}
</style>