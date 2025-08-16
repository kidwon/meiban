<template>
  <div class="adsense-container" :class="containerClass" v-if="showAd">
    <ins class="adsbygoogle"
         :style="adStyle"
         :data-ad-client="adClient"
         :data-ad-slot="adSlot"
         :data-ad-format="adFormat"
         :data-full-width-responsive="fullWidthResponsive"></ins>
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
      showAd: false
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
    // 检查是否应该显示广告
    this.checkAdDisplay()
    
    if (this.showAd) {
      this.loadAd()
    }
  },
  methods: {
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
      // 检查当前路由是否为内容页面
      const currentRoute = this.$route.name
      const contentRoutes = ['bazi-results', 'astrology-results', 'transit-analysis', 'bazi-results-shared', 'astrology-results-shared']
      
      // 明确禁止在这些页面显示广告
      const prohibitedRoutes = ['error', 'not-found', '404']
      if (prohibitedRoutes.includes(currentRoute)) {
        return false
      }
      
      if (!contentRoutes.includes(currentRoute)) {
        return false
      }
      
      // 对于结果页面，检查是否有实际计算结果
      if (['bazi-results', 'astrology-results', 'transit-analysis', 'bazi-results-shared', 'astrology-results-shared'].includes(currentRoute)) {
        const hasResults = this.$store.getters.getCalculationResults || this.$store.getters.getUserData
        if (!hasResults) {
          return false
        }
      }
      
      // 检查页面是否有足够的文本内容
      if (typeof document !== 'undefined') {
        const bodyText = document.body.innerText || document.body.textContent || ''
        const minContentLength = 1200 // 提高到1200字符确保有足够内容
        
        if (bodyText.length < minContentLength) {
          return false
        }
        
        // 检查是否包含错误页面、导航页面等非实质内容
        const hasErrorContent = bodyText.includes('エラーが発生しました') || 
                              bodyText.includes('ページが見つかりません') ||
                              bodyText.includes('404') ||
                              bodyText.includes('問題が発生しました') ||
                              bodyText.includes('星々の中でページが迷子') ||
                              bodyText.includes('解決方法') ||
                              bodyText.includes('デバッグ情報')
        
        if (hasErrorContent) {
          return false
        }
        
        // 检查页面URL路径
        const currentPath = this.$route.path
        if (currentPath.includes('error') || currentPath.includes('404') || currentPath.includes('not-found')) {
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
  }
}
</style>