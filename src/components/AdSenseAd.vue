<template>
  <div class="adsense-container" :class="containerClass" v-if="showAd">
    <ins class="adsbygoogle"
         :style="adStyle"
         :data-ad-client="adClient"
         :data-ad-slot="adSlot"
         :data-ad-format="adFormat"
         :data-full-width-responsive="isMobile ? 'false' : fullWidthResponsive"></ins>
  </div>
</template>

<script>
export default {
  name: 'AdSenseAd',
  props: {
    adSlot: {
      type: String,
      required: true
    },
    adFormat: {
      type: String,
      default: 'auto'
    },
    fullWidthResponsive: {
      type: String,
      default: 'true'
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    containerClass: {
      type: String,
      default: ''
    },
    // 控制是否显示广告（用于开发环境）
    enabled: {
      type: Boolean,
      default: () => process.env.VUE_APP_ADSENSE_ENABLED === 'true'
    },
    // 强制隐藏广告（用于错误页面、404页面等）
    forceHide: {
      type: Boolean,
      default: false
    },
    // 要求页面有实质内容才显示广告
    requireContent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      adClient: process.env.VUE_APP_ADSENSE_CLIENT || 'ca-pub-8250499267865326',
      showAd: false,
      isMobile: false
    }
  },
  computed: {
    adStyle() {
      const style = {
        display: 'block'
      }
      if (this.width) {
        style.width = typeof this.width === 'number' ? `${this.width}px` : this.width
      }
      if (this.height) {
        style.height = typeof this.height === 'number' ? `${this.height}px` : this.height
      }
      return style
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)

    // 检查是否应该显示广告
    this.checkAdDisplay()
    
    if (this.showAd) {
      this.loadAd()
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    },

    checkAdDisplay() {
      // 强制隐藏广告
      if (this.forceHide) {
        this.showAd = false
        console.log('AdSense ad blocked: forceHide prop is true')
        return
      }
      
      // 在开发环境中可以选择不显示广告
      if (process.env.NODE_ENV === 'development' && !this.enabled) {
        this.showAd = false
        return
      }
      
      // 检查页面是否包含实质内容（Google AdSense 政策要求）
      if (this.requireContent && !this.hasSubstantialContent()) {
        this.showAd = false
        console.log('AdSense ad blocked: page lacks substantial content')
        return
      }
      
      // 检查是否有AdSense脚本
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        this.showAd = true
      } else {
        // 等待AdSense脚本加载
        this.waitForAdSense()
      }
    },
    
    hasSubstantialContent() {
      // 首先检查路由元信息是否允许广告
      const currentRoute = this.$route
      if (currentRoute.meta && currentRoute.meta.allowAds === false) {
        console.log(`AdSense ad blocked: route '${currentRoute.name}' has allowAds: false in meta`)
        return false
      }
      
      // 检查当前路由是否为内容页面
      const currentRouteName = currentRoute.name
      const contentRoutes = ['bazi-results', 'astrology-results', 'transit-analysis', 'bazi-results-shared', 'astrology-results-shared']
      
      // 明确禁止在这些页面显示广告 - 扩展禁止列表（作为备用检查）
      const prohibitedRoutes = [
        'error', 'not-found', '404', 
        'home', 'HomePage',  // 首页（表单页面）
        'loading', 'maintenance',  // 加载和维护页面
        'terms', 'privacy',  // 法律条款页面
        'contact', 'about'   // 静态信息页面
      ]
      if (prohibitedRoutes.includes(currentRouteName)) {
        console.log(`AdSense ad blocked: route '${currentRouteName}' is in prohibited list`)
        return false
      }
      
      // 只允许在结果页面显示广告
      if (!contentRoutes.includes(currentRouteName)) {
        console.log(`AdSense ad blocked: route '${currentRouteName}' is not a content route`)
        return false
      }
      
      // 对于结果页面，检查是否有实际计算结果
      if (['bazi-results', 'astrology-results', 'transit-analysis', 'bazi-results-shared', 'astrology-results-shared'].includes(currentRouteName)) {
        const hasResults = this.$store.getters.getCalculationResults || this.$store.getters.getUserData
        if (!hasResults) {
          console.log('AdSense ad blocked: no calculation results found')
          return false
        }
        
        // 额外检查：确保计算结果不为空或无效
        const results = this.$store.getters.getCalculationResults
        if (results && typeof results === 'object') {
          // 检查结果是否包含实质内容
          const hasValidResults = results.eightCharacters || results.astrology || results.analysis
          if (!hasValidResults) {
            console.log('AdSense ad blocked: calculation results are empty')
            return false
          }
        }
      }
      
      // 检查页面是否有足够的文本内容
      if (typeof document !== 'undefined') {
        const bodyText = document.body.innerText || document.body.textContent || ''
        const minContentLength = 1500 // 提高到1500字符确保有足够内容
        
        if (bodyText.length < minContentLength) {
          console.log(`AdSense ad blocked: content too short (${bodyText.length} chars, min: ${minContentLength})`)
          return false
        }
        
        // 检查是否包含错误页面、导航页面、表单页面等非实质内容
        const hasProhibitedContent = bodyText.includes('エラーが発生しました') || 
                              bodyText.includes('ページが見つかりません') ||
                              bodyText.includes('404') ||
                              bodyText.includes('問題が発生しました') ||
                              bodyText.includes('星々の中でページが迷子') ||
                              bodyText.includes('解決方法') ||
                              bodyText.includes('デバッグ情報') ||
                              // 添加表单页面相关内容检测
                              bodyText.includes('生年月日') ||
                              bodyText.includes('出生时间') ||
                              bodyText.includes('出生地') ||
                              bodyText.includes('分析类型选择') ||
                              bodyText.includes('選択してください') ||
                              // 添加导航和建设中页面检测
                              bodyText.includes('工事中') ||
                              bodyText.includes('準備中') ||
                              bodyText.includes('メンテナンス') ||
                              bodyText.includes('しばらくお待ち')
        
        if (hasProhibitedContent) {
          console.log('AdSense ad blocked: page contains prohibited content (forms, errors, navigation, etc.)')
          return false
        }
        
        // 检查页面URL路径
        const currentPath = this.$route.path
        const prohibitedPaths = ['error', '404', 'not-found', 'home', 'index', 'contact', 'about', 'terms', 'privacy']
        if (prohibitedPaths.some(path => currentPath.includes(path))) {
          console.log(`AdSense ad blocked: path '${currentPath}' contains prohibited segments`)
          return false
        }
      }
      
      return true
    },
    
    waitForAdSense() {
      let attempts = 0
      const maxAttempts = 10
      
      const checkInterval = setInterval(() => {
        attempts++
        if (window.adsbygoogle) {
          this.showAd = true
          this.loadAd()
          clearInterval(checkInterval)
        } else if (attempts >= maxAttempts) {
          console.warn('AdSense script not loaded after maximum attempts')
          clearInterval(checkInterval)
        }
      }, 500)
    },
    
    loadAd() {
      this.$nextTick(() => {
        try {
          if (window.adsbygoogle && this.$el.querySelector('.adsbygoogle')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
          }
        } catch (error) {
          console.error('Failed to load AdSense ad:', error)
        }
      })
    }
  }
}
</script>

<style scoped>
.adsense-container {
  margin: 20px 0;
  text-align: center;
  overflow: hidden;
}

.adsense-container.banner {
  max-width: 728px;
  margin: 20px auto;
}

.adsense-container.rectangle {
  max-width: 300px;
  margin: 20px auto;
}

.adsense-container.responsive {
  width: 100%;
  max-width: 100%;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .adsense-container {
    margin: 15px 0;
  }
  
  .adsense-container.banner {
    max-width: 320px;
    max-height: 100px; /* 限制横幅广告高度 */
  }

  .adsense-container.rectangle {
    max-width: 300px;
    max-height: 280px; /* 限制矩形广告高度 */
  }
}
</style>