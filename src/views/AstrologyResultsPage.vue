<template>
  <div class="app-container app-container--lg">
    <!-- 浮动语言切换器 -->
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="page-header">
      <h1 class="page-title">{{ $t('astrology.resultsTitle') }}</h1>
      <p class="user-name">{{ userData ? userData.name : $t('astrology.guest') }}{{ $t('astrology.chartSuffix') }}</p>
    </header>

    <div class="content-wrapper" v-if="calculationResults">
      <!-- 出生信息摘要 -->
      <div class="birth-data-summary">
        <p>{{ formattedBirthInfo.full }}</p>
      </div>

      <!-- 交互式星盘图 -->
      <section class="section">
        <h2 class="section-title">{{ $t('astrology.interactiveChart') }}</h2>
        <div class="chart-container">
          <StarChart 
            :calculationResults="calculationResults"
            :size="chartSize"
            @planetClick="handlePlanetClick"
            @planetHover="handlePlanetHover"
          />
        </div>
        
        <!-- 行星详情侧边栏 -->
        <div class="planet-details-sidebar" :class="{ 'open': selectedPlanet }">
          <div class="sidebar-header">
            <h3>{{ getPlanetDisplayName(selectedPlanet) }}</h3>
            <button @click="closePlanetDetails" class="btn btn--ghost close-btn">×</button>
          </div>
          <div class="sidebar-content" v-if="selectedPlanet">
            <div class="planet-position card">
              <div class="position-info">
                <span class="position-sign">{{ getPlanetSign(selectedPlanet) }}</span>
                <span class="position-degree">{{ getPlanetDegree(selectedPlanet) }}</span>
              </div>
            </div>
            <div class="planet-description">
              <p>{{ getPlanetDescription(selectedPlanet) }}</p>
            </div>
            <div class="planet-keywords">
              <h4>{{ $t('astrology.keywords') }}</h4>
              <div class="tag-cloud">
                <span 
                  v-for="keyword in getPlanetKeywords(selectedPlanet)" 
                  :key="keyword"
                  class="tag tag--primary"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 占星分析标签页 -->
      <section class="section">
        <h2 class="section-title">{{ $t('astrology.detailedAnalysis') }}</h2>
        <div class="tabs">
          <div class="tab-list">
            <button 
              v-for="tab in analysisTabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="{ active: activeTab === tab.id }"
              class="tab-button"
            >
              {{ $t('astrology.' + tab.nameKey) }}
            </button>
          </div>
          
          <div class="tab-content">
            <div v-show="activeTab === 'personality'" class="tab-panel">
              <h3>{{ $t('astrology.personalityAnalysis') }}</h3>
              <div class="personality-analysis">
                <div class="trait-section">
                  <h4>{{ $t('astrology.corePersonality') }}</h4>
                  <p>{{ getSunDescription() }}</p>
                </div>
                <div class="trait-section">
                  <h4>{{ $t('astrology.emotionalNeeds') }}</h4>
                  <p>{{ getMoonDescription() }}</p>
                </div>
                <div class="trait-section">
                  <h4>{{ $t('astrology.externalImpression') }}</h4>
                  <p>{{ getAscendantDescription() }}</p>
                </div>
              </div>
            </div>

            <div v-show="activeTab === 'career'" class="tab-panel">
              <h3>{{ $t('astrology.careerAnalysis') }}</h3>
              <div class="career-analysis">
                <div class="career-section">
                  <h4>{{ $t('astrology.careerStrengths') }}</h4>
                  <p>{{ getCareerStrengths() }}</p>
                </div>
                <div class="career-section">
                  <h4>{{ $t('astrology.suitableCareers') }}</h4>
                  <div class="tag-cloud">
                    <span 
                      v-for="career in getSuggestedCareers()" 
                      :key="career"
                      class="tag tag--success"
                    >
                      {{ career }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="activeTab === 'relationships'" class="tab-panel">
              <h3>{{ $t('astrology.relationshipAnalysis') }}</h3>
              <div class="relationships-analysis">
                <div class="relationship-section">
                  <h4>{{ $t('astrology.loveExpression') }}</h4>
                  <p>{{ getLoveDescription() }}</p>
                </div>
                <div class="relationship-section">
                  <h4>{{ $t('astrology.friendshipTraits') }}</h4>
                  <p>{{ getFriendshipDescription() }}</p>
                </div>
                <div class="relationship-section">
                  <h4>{{ $t('astrology.compatibleSigns') }}</h4>
                  <div class="tag-cloud">
                    <span 
                      v-for="sign in getCompatibleSigns()" 
                      :key="sign"
                      class="tag tag--secondary"
                    >
                      {{ sign }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="activeTab === 'fortune'" class="tab-panel">
              <h3>{{ $t('astrology.fortuneAnalysis') }}</h3>
              <div class="fortune-analysis">
                <div class="fortune-overview">
                  <div class="fortune-badge">{{ calculationResults.fortune.overview }}</div>
                </div>
                <p>{{ getOverallFortuneDescription() }}</p>
                <div class="fortune-grid">
                  <div class="fortune-item">
                    <div class="fortune-label">{{ $t('astrology.fortuneLabels.career') }}</div>
                    <div class="fortune-stars">{{ calculationResults.fortune.career }}</div>
                  </div>
                  <div class="fortune-item">
                    <div class="fortune-label">{{ $t('astrology.fortuneLabels.wealth') }}</div>
                    <div class="fortune-stars">{{ calculationResults.fortune.wealth }}</div>
                  </div>
                  <div class="fortune-item">
                    <div class="fortune-label">{{ $t('astrology.fortuneLabels.love') }}</div>
                    <div class="fortune-stars">{{ calculationResults.fortune.love }}</div>
                  </div>
                  <div class="fortune-item">
                    <div class="fortune-label">{{ $t('astrology.fortuneLabels.health') }}</div>
                    <div class="fortune-stars">{{ calculationResults.fortune.health }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级功能区域 -->
      <section class="section">
        <h2 class="section-title">{{ $t('astrology.advancedFeatures.title') }}</h2>
        <div class="advanced-features-grid">
          <button class="advanced-feature-btn advanced-feature-btn--transit" @click="goToTransitAnalysis">
            <div class="btn-icon">🌟</div>
            <div class="btn-content">
              <h3>{{ $t('astrology.actions.transitAnalysis') }}</h3>
              <p>{{ $t('astrology.advancedFeatures.transitDescription') }}</p>
              <div class="feature-details">
                <span>{{ $t('astrology.advancedFeatures.transitFeatures.futureTrends') }}</span>
                <span>{{ $t('astrology.advancedFeatures.transitFeatures.transitPlanets') }}</span>
                <span>{{ $t('astrology.advancedFeatures.transitFeatures.timingDiagnosis') }}</span>
              </div>
            </div>
          </button>
          
          <button class="advanced-feature-btn advanced-feature-btn--compatibility" @click="goToCompatibilityAnalysis">
            <div class="btn-icon">💕</div>
            <div class="btn-content">
              <h3>{{ $t('astrology.actions.compatibility') }}</h3>
              <p>{{ $t('astrology.advancedFeatures.compatibilityDescription') }}</p>
              <div class="feature-details">
                <span>{{ $t('astrology.advancedFeatures.compatibilityFeatures.loveCompatibility') }}</span>
                <span>{{ $t('astrology.advancedFeatures.compatibilityFeatures.communicationTrends') }}</span>
                <span>{{ $t('astrology.advancedFeatures.compatibilityFeatures.relationshipAdvice') }}</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      <!-- 操作按钮 -->
      <div class="actions">
        <button @click="goBack" class="btn btn--outline">{{ $t('astrology.actions.back') }}</button>
        <button @click="downloadReport" class="btn btn--primary">{{ $t('astrology.actions.download') }}</button>
        <button @click="shareReport" class="btn btn--secondary">{{ $t('astrology.actions.share') }}</button>
      </div>
    </div>

    <div class="loading" v-else>
      <p>{{ $t('astrology.calculating') }}</p>
    </div>

    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import i18nMixin from '../mixins/i18n.js'
import StarChart from '../components/StarChart/StarChart.vue'
import {
  getSignDescription,
  getCareerStrengths,
  getSuggestedCareers,
  getLoveDescription,
  getFriendshipDescription,
  getCompatibleSigns,
  getFortuneDescription,
  getPlanetKeywords,
  formatBirthInfo
} from '../services/astrologyDataService.js'

export default {
  name: 'AstrologyResultsPage',
  mixins: [i18nMixin],
  components: {
    LanguageSwitcher,
    StarChart
  },
  
  data() {
    return {
      activeTab: 'personality',
      chartSize: 450, // 从500px压缩到450px
      selectedPlanet: null,
      analysisTabs: [
        { id: 'personality', nameKey: 'personalityAnalysis' },
        { id: 'career', nameKey: 'careerAnalysis' },
        { id: 'relationships', nameKey: 'relationshipAnalysis' },
        { id: 'fortune', nameKey: 'fortuneAnalysis' }
      ]
    }
  },
  
  computed: {
    ...mapGetters(['getUserData', 'getCalculationResults']),
    
    userData() {
      return this.getUserData
    },
    
    calculationResults() {
      return this.getCalculationResults
    },
    
    formattedBirthInfo() {
      return formatBirthInfo(this.userData)
    },
    
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  
  methods: {
    onLanguageChanged(language) {
      console.log('Language changed to:', language)
    },
    
    // 行星交互处理
    handlePlanetClick(planetType) {
      this.selectedPlanet = planetType
    },
    
    handlePlanetHover() {
      // 可以添加悬停效果
    },
    
    closePlanetDetails() {
      this.selectedPlanet = null
    },
    
    getPlanetDisplayName(planetType) {
      return this.$t(`astrology.planetNames.${planetType}`) || ''
    },
    
    getPlanetSign(planetType) {
      if (!this.calculationResults || !planetType) return ''
      return this.calculationResults.astrologyPositions[planetType]?.sign || ''
    },
    
    getPlanetDegree(planetType) {
      if (!this.calculationResults || !planetType) return ''
      const position = this.calculationResults.astrologyPositions[planetType]
      if (!position) return ''
      return `${position.degree}°${position.minute}'`
    },
    
    getPlanetDescription(planetType) {
      if (!planetType) return ''
      const sign = this.getPlanetSign(planetType)
      return getSignDescription(planetType, sign, this.currentLanguage)
    },
    
    getPlanetKeywords(planetType) {
      return getPlanetKeywords(planetType, this.currentLanguage)
    },
    
    // 使用数据服务的方法
    getSunDescription() {
      if (!this.calculationResults) return ''
      const sunSign = this.calculationResults.astrologyPositions.sun.sign
      return getSignDescription('sun', sunSign, this.currentLanguage)
    },
    
    getMoonDescription() {
      if (!this.calculationResults) return ''
      const moonSign = this.calculationResults.astrologyPositions.moon.sign
      return getSignDescription('moon', moonSign, this.currentLanguage)
    },
    
    getAscendantDescription() {
      if (!this.calculationResults) return ''
      const ascendantSign = this.calculationResults.astrologyPositions.ascendant.sign
      return getSignDescription('ascendant', ascendantSign, this.currentLanguage)
    },
    
    getCareerStrengths() {
      if (!this.calculationResults) return ''
      return getCareerStrengths(this.calculationResults.astrologyPositions, this.currentLanguage)
    },
    
    getSuggestedCareers() {
      if (!this.calculationResults) return []
      return getSuggestedCareers(this.calculationResults.astrologyPositions, this.currentLanguage)
    },
    
    getLoveDescription() {
      if (!this.calculationResults) return ''
      return getLoveDescription(this.calculationResults.astrologyPositions, this.currentLanguage)
    },
    
    getFriendshipDescription() {
      if (!this.calculationResults) return ''
      return getFriendshipDescription(this.calculationResults.astrologyPositions, this.currentLanguage)
    },
    
    getCompatibleSigns() {
      if (!this.calculationResults) return []
      return getCompatibleSigns(this.calculationResults.astrologyPositions.sun.sign, this.currentLanguage)
    },
    
    getOverallFortuneDescription() {
      if (!this.calculationResults) return ''
      return getFortuneDescription(this.calculationResults.fortune, this.currentLanguage)
    },
    
    // 导航方法
    goToTransitAnalysis() {
      this.$router.push({ name: 'transit-analysis' })
    },
    
    goToCompatibilityAnalysis() {
      // 暂时显示提示，实际需要实现合盘分析页面
      alert(this.$t('astrology.alerts.compatibilityInDevelopment'))
    },
    
    downloadReport() {
      const reportData = {
        userData: this.userData,
        calculationResults: this.calculationResults,
        generatedAt: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `astrology-results-${this.userData.name}-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    
    shareReport() {
      if (navigator.share) {
        navigator.share({
          title: this.$t('astrology.alerts.reportTitle'),
          text: `${this.userData.name}${this.$t('astrology.alerts.reportDescription')}`,
          url: window.location.href
        }).catch(console.error)
      } else {
        // 降级方案
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert(this.$t('astrology.alerts.linkCopied')))
          .catch(() => alert(this.$t('astrology.alerts.copyManually')))
      }
    },
    
    goBack() {
      this.$router.push({ name: 'home' })
    },
    
    updateChartSize() {
      const container = this.$el?.querySelector('.chart-container')
      if (container) {
        const containerWidth = container.clientWidth
        this.chartSize = Math.min(containerWidth - 30, 450) // 压缩最大尺寸
      }
    }
  },
  
  created() {
    if (!this.userData || !this.calculationResults) {
      this.$router.push({ name: 'home' })
    }
  },
  
  mounted() {
    this.updateChartSize()
    window.addEventListener('resize', this.updateChartSize)
    
    // 监听窗口大小变化，用于响应式设计
    this.handleResize = () => {
      this.$forceUpdate() // 触发isMobile计算属性更新
    }
    window.addEventListener('resize', this.handleResize)
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.updateChartSize)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
/* 导入通用样式，大部分样式使用common.css中的类 */
@import '@/assets/styles/common.css';

/* =============================================================================
   占星结果页面优化样式
   ============================================================================= */

.app-container {
  padding: 15px; /* 从20px压缩到15px */
}

/* 页头优化 */
.page-header {
  text-align: center;
  margin-bottom: 20px; /* 从30px压缩到20px */
}

.page-title {
  font-size: 2.2rem; /* 从2.5rem压缩 */
  font-weight: 700;
  margin-bottom: 0.3rem; /* 压缩间距 */
  color: #d35400;
  font-family: 'Shippori Mincho', serif;
}

.user-name {
  font-size: 1rem; /* 从1.1rem压缩 */
  color: #7f8c8d;
  margin: 0;
}

/* 内容容器优化 */
.content-wrapper {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px; /* 从25px压缩到20px */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  flex-grow: 1;
}

.section {
  margin-bottom: 25px; /* 从30px压缩到25px */
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.8rem; /* 从2rem压缩 */
  font-weight: 600;
  font-family: 'Shippori Mincho', serif;
  color: #34495e;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px; /* 从10px压缩 */
  margin-bottom: 20px; /* 从25px压缩 */
}

/* 出生信息摘要 */
.birth-data-summary {
  text-align: center;
  margin-bottom: 20px; /* 从25px压缩 */
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* 星盘图容器优化 */
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 420px; /* 从500px压缩到420px */
  background: #f8f9fa;
  border-radius: 12px;
  padding: 15px; /* 从20px压缩 */
  position: relative;
}

/* 行星详情侧边栏 */
.planet-details-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 380px;
  height: 100vh;
  background: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transition: right 0.3s ease;
  z-index: 9998;
  overflow-y: auto;
}

.planet-details-sidebar.open {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background: #d35400;
  color: white;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none !important;
  border: none !important;
  color: white !important;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px !important;
  border-radius: 50% !important;
  width: 30px;
  height: 30px;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

.sidebar-content {
  padding: 20px;
}

.planet-position {
  text-align: center;
  margin-bottom: 20px;
}

.position-info .position-sign {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #d35400;
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
}

.position-info .position-degree {
  font-size: 1.1rem;
  color: #7f8c8d;
  font-weight: 500;
}

.planet-description {
  margin-bottom: 20px;
}

.planet-description p {
  line-height: 1.6;
  color: #495057;
}

.planet-keywords h4 {
  color: #34495e;
  margin-bottom: 15px;
  font-size: 1rem;
}

/* 标签页优化 */
.tabs {
  margin-top: 10px;
}

.tab-list {
  display: flex;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 20px; /* 从25px压缩 */
  gap: 0;
}

.tab-button {
  flex: 1;
  padding: 12px 16px; /* 从15px 20px压缩 */
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.9rem; /* 从1rem压缩 */
  font-weight: 500;
  color: #6c757d;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #d35400;
  background: rgba(211, 84, 0, 0.05);
}

.tab-button.active {
  color: #d35400;
  border-bottom-color: #d35400;
  background: rgba(211, 84, 0, 0.05);
}

.tab-panel {
  padding: 15px 0; /* 从20px压缩 */
}

.tab-panel h3 {
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1.3rem; /* 从1.5rem压缩 */
  font-family: 'Shippori Mincho', serif;
}

/* 分析内容样式 */
.trait-section,
.career-section,
.relationship-section {
  margin-bottom: 20px; /* 从25px压缩 */
}

.trait-section h4,
.career-section h4,
.relationship-section h4 {
  color: #495057;
  margin-bottom: 10px; /* 从15px压缩 */
  margin-top: 20px; /* 从25px压缩 */
  font-size: 1.1rem; /* 从1.2rem压缩 */
}

.trait-section h4:first-child,
.career-section h4:first-child,
.relationship-section h4:first-child {
  margin-top: 0;
}

/* 标签云样式 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.tag--primary {
  background: rgba(211, 84, 0, 0.1);
  color: #d35400;
}

.tag--success {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.tag--secondary {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
}

/* 运势网格 */
.fortune-overview {
  text-align: center;
  margin-bottom: 15px; /* 从20px压缩 */
}

.fortune-badge {
  display: inline-block;
  padding: 8px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
}

.fortune-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px; /* 从20px压缩 */
  margin-top: 15px; /* 从20px压缩 */
}

.fortune-item {
  text-align: center;
  padding: 15px; /* 从20px压缩 */
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.fortune-label {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 8px;
  font-weight: 500;
}

.fortune-stars {
  font-size: 1.2rem;
  color: #ffc107;
}

/* 高级功能按钮优化 */
.advanced-features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* 从25px压缩 */
  margin-bottom: 20px; /* 从25px压缩 */
}

.advanced-feature-btn {
  display: flex;
  align-items: center;
  gap: 15px; /* 从20px压缩 */
  padding: 20px; /* 从25px压缩 */
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  width: 100%;
  font-family: inherit;
  position: relative;
  overflow: hidden;
  background: #fff;
}

.advanced-feature-btn:hover {
  transform: translateY(-3px);
}

/* 行運盤分析按钮 - 紫色主题 */
.advanced-feature-btn--transit {
  background: linear-gradient(135deg, #f3f0ff 0%, #f8f5ff 50%, #fff0f8 100%);
  border: 1px solid rgba(138, 43, 226, 0.2);
}

.advanced-feature-btn--transit:hover {
  background: linear-gradient(135deg, #e8e0ff 0%, #f0e8ff 50%, #ffe8f3 100%);
  box-shadow: 0 8px 25px rgba(138, 43, 226, 0.15);
}

/* 合盤分析按钮 - 粉色主题 */
.advanced-feature-btn--compatibility {
  background: linear-gradient(135deg, #fff0f5 0%, #fef7fc 50%, #fff5f8 100%);
  border: 1px solid rgba(255, 105, 180, 0.2);
}

.advanced-feature-btn--compatibility:hover {
  background: linear-gradient(135deg, #ffe8f1 0%, #fdf0f7 50%, #ffebf0 100%);
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.15);
}

.advanced-feature-btn .btn-icon {
  font-size: 3rem; /* 从3.5rem压缩 */
  min-width: 60px; /* 从70px压缩 */
  text-align: center;
  flex-shrink: 0;
}

.advanced-feature-btn .btn-content {
  flex: 1;
}

.advanced-feature-btn .btn-content h3 {
  margin: 0 0 8px 0; /* 从10px压缩 */
  font-size: 1.3rem; /* 从1.5rem压缩 */
  font-weight: 600;
  color: #34495e;
  font-family: 'Shippori Mincho', serif;
}

.advanced-feature-btn .btn-content p {
  margin: 0 0 10px 0; /* 从12px压缩 */
  font-size: 0.85rem; /* 从0.9rem压缩 */
  color: #6c757d;
  line-height: 1.5;
}

.advanced-feature-btn .feature-details {
  display: flex;
  flex-direction: column;
  gap: 4px; /* 从6px压缩 */
}

.advanced-feature-btn .feature-details span {
  font-size: 0.75rem; /* 从0.8rem压缩 */
  color: #95a5a6;
  opacity: 0.8;
}

/* 操作按钮区域 */
.actions {
  display: flex;
  gap: 15px; /* 从20px压缩 */
  justify-content: center;
  margin: 25px 0; /* 从30px压缩 */
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px; /* 从12px 25px压缩 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem; /* 从1rem压缩 */
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 100px; /* 从120px压缩 */
}

.btn--primary {
  background: #d35400;
  color: white;
}

.btn--primary:hover {
  background: #e67e22;
  transform: translateY(-1px);
}

.btn--secondary {
  background: #6c757d;
  color: white;
}

.btn--secondary:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

.btn--outline {
  background: none;
  color: #6c757d;
  border: 1px solid #6c757d;
}

.btn--outline:hover {
  background: #6c757d;
  color: white;
}

/* 页脚优化 */
.footer {
  text-align: center;
  margin-top: 20px; /* 从25px压缩 */
  padding: 15px; /* 从20px压缩 */
  color: #95a5a6;
  font-size: 0.8rem;
}

.loading {
  text-align: center;
  padding: 60px; /* 从80px压缩 */
  color: #6c757d;
}

/* 响应式设计优化 */
@media (max-width: 768px) {
  .app-container {
    padding: 12px; /* 进一步压缩 */
  }
  
  .page-header {
    margin-bottom: 15px;
  }
  
  .page-title {
    font-size: 1.9rem;
    margin-bottom: 0.2rem;
  }
  
  .user-name {
    font-size: 0.9rem;
  }
  
  .content-wrapper {
    padding: 15px;
  }
  
  .chart-container {
    min-height: 350px; /* 移动端进一步压缩 */
    padding: 10px;
  }
  
  .planet-details-sidebar {
    width: 100%;
    right: -100%;
  }
  
  .advanced-features-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .advanced-feature-btn {
    padding: 15px;
    gap: 12px;
  }
  
  .advanced-feature-btn .btn-icon {
    font-size: 2.5rem;
    min-width: 50px;
  }
  
  .advanced-feature-btn .btn-content h3 {
    font-size: 1.1rem;
  }
  
  .advanced-feature-btn .btn-content p {
    font-size: 0.8rem;
  }
  
  .advanced-feature-btn .feature-details span {
    font-size: 0.7rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .actions .btn {
    width: 100%;
    max-width: 250px;
  }
  
  .fortune-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .tab-button {
    padding: 10px 12px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.7rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .chart-container {
    min-height: 300px;
  }
  
  .advanced-feature-btn {
    flex-direction: column;
    text-align: center;
    padding: 12px;
    gap: 10px;
  }
  
  .advanced-feature-btn .btn-icon {
    font-size: 2rem;
    min-width: auto;
  }
  
  .advanced-feature-btn .btn-content h3 {
    font-size: 1rem;
  }
  
  .advanced-feature-btn .feature-details {
    align-items: center;
  }
  
  .tab-button {
    padding: 8px 6px;
    font-size: 0.75rem;
  }
}
</style>