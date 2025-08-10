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
      // 在开发环境中可以选择不显示广告
      if (process.env.NODE_ENV === 'development' && !this.enabled) {
        this.showAd = false
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