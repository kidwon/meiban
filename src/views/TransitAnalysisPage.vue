<template>
  <div class="transit-analysis-container">
    <!-- 语言切换器 -->
    <LanguageSwitcher 
      @language-changed="onLanguageChanged"
      :compact="isMobile"
      :theme="'light'"
    />

    <header class="header">
      <h1 class="title">{{ $t('transitAnalysis.title') }}</h1>
      <p class="subtitle">{{ $t('transitAnalysis.subtitle') }}</p>
    </header>

    <div class="analysis-content">
      <!-- 日期选择区域 -->
      <section class="date-selection-section" v-if="!transitReport">
        <div class="selection-card">
          <h2 class="section-title">{{ $t('transitAnalysis.selectDate') }}</h2>
          
          <div class="date-options">
            <div class="quick-options">
              <h3>{{ $t('transitAnalysis.quickSelect') }}</h3>
              <div class="quick-buttons">
                <button @click="selectToday" :class="['quick-btn', { current: isToday }]">
                  {{ $t('transitAnalysis.today') }}
                </button>
                <button @click="selectBirthday" :class="['quick-btn', { current: isBirthday }]">
                  {{ $t('transitAnalysis.birthday') }}
                </button>
                <button @click="selectNewYear" :class="['quick-btn', { current: isNewYear }]">
                  {{ $t('transitAnalysis.newYear') }}
                </button>
              </div>
            </div>
            
            <div class="custom-date">
              <h3>{{ $t('transitAnalysis.customDate') }}</h3>
              <div class="date-inputs">
                <div class="input-group">
                  <label>{{ $t('transitAnalysis.analysisDate') }}</label>
                  <input 
                    type="date" 
                    v-model="selectedDate" 
                    :min="minDate"
                    :max="maxDate"
                  />
                </div>
                <div class="input-group">
                  <label>{{ $t('transitAnalysis.analysisTime') }}</label>
                  <input 
                    type="time" 
                    v-model="selectedTime"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="analysis-preview" v-if="selectedDate">
            <h3>{{ $t('transitAnalysis.preview') }}</h3>
            <div class="preview-info">
              <p><strong>{{ $t('transitAnalysis.previewDate') }}:</strong> {{ formatSelectedDate }}</p>
              <p><strong>{{ $t('transitAnalysis.ageAtTime') }}:</strong> {{ calculatedAge }}{{ $t('transitAnalysis.yearsOld') }}</p>
              <p><strong>{{ $t('transitAnalysis.daysToBirthday') }}:</strong> {{ daysToBirthday }}{{ $t('transitAnalysis.days') }}</p>
            </div>
          </div>

          <div class="action-buttons">
            <button @click="startAnalysis" :disabled="!selectedDate || isAnalyzing" class="analyze-btn">
              {{ isAnalyzing ? $t('transitAnalysis.analyzing') : $t('transitAnalysis.startAnalysis') }}
            </button>
            <button @click="goBack" class="back-btn">{{ $t('common.back') }}</button>
          </div>
        </div>
      </section>

      <!-- 分析结果区域 -->
      <section class="analysis-results" v-if="transitReport && !isAnalyzing">
        <div class="report-header">
          <div class="user-info">
            <h2>{{ userData.name }}{{ $t('transitAnalysis.reportTitle') }}</h2>
            <div class="basic-info">
              <span>{{ $t('transitAnalysis.previewDate') }}: {{ formatAnalysisDate }}</span>
              <span>{{ $t('transitAnalysis.age') }}: {{ transitReport.header.age }}{{ $t('transitAnalysis.yearsOld') }}</span>
              <span>{{ $t('transitAnalysis.birthPlace') }}: {{ transitReport.header.birthPlace }}</span>
            </div>
          </div>
          <div class="analysis-meta">
            <span class="intensity-badge" :class="intensityClass">
              {{ getIntensityText(transitReport.overview.intensity) }}
            </span>
          </div>
        </div>

        <!-- 概览 -->
        <div class="overview-section">
          <h3 class="section-title">{{ $t('transitAnalysis.overview') }}</h3>
          <div class="overview-card">
            <div class="summary">
              <p class="main-summary">{{ transitReport.overview.summary }}</p>
              <p class="phase-description">{{ transitReport.overview.phaseDescription }}</p>
            </div>
            <div class="key-themes">
              <h4>{{ $t('transitAnalysis.keyThemes') }}</h4>
              <div class="theme-tags">
                <span 
                  v-for="theme in transitReport.overview.keyThemes" 
                  :key="theme"
                  class="theme-tag"
                >
                  {{ theme }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 生命周期 -->
        <div class="life-cycles-section" v-if="transitReport.majorCycles && transitReport.majorCycles.length > 0">
          <h3 class="section-title">{{ $t('transitAnalysis.lifeCycles') }}</h3>
          <div class="cycles-grid">
            <div 
              v-for="cycle in transitReport.majorCycles" 
              :key="cycle.name"
              class="cycle-card"
            >
              <div class="cycle-header">
                <h4>{{ cycle.name }}</h4>
                <div class="progress-indicator">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: cycle.progress + '%' }"></div>
                  </div>
                  <span class="progress-text">{{ cycle.progress }}% - {{ cycle.phase }}</span>
                </div>
              </div>
              <p class="cycle-description">{{ cycle.description }}</p>
              <div class="cycle-themes" v-if="cycle.themes">
                <span 
                  v-for="theme in cycle.themes" 
                  :key="theme"
                  class="cycle-theme"
                >
                  {{ theme }}
                </span>
              </div>
              <div class="cycle-advice" v-if="cycle.advice">
                <strong>{{ $t('transitAnalysis.advice') }}:</strong> {{ cycle.advice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 外行星影响 -->
        <div class="outer-planets-section" v-if="transitReport.outerPlanets && transitReport.outerPlanets.planets.length > 0">
          <h3 class="section-title">{{ $t('transitAnalysis.outerPlanetsInfluence') }}</h3>
          <div class="overall-theme">
            <h4>{{ $t('transitAnalysis.overallTheme') }}: {{ transitReport.outerPlanets.overallTheme }}</h4>
            <p>{{ transitReport.outerPlanets.summary.description }}</p>
          </div>
          
          <div class="planets-grid">
            <div 
              v-for="planet in transitReport.outerPlanets.planets" 
              :key="planet.planet"
              class="planet-card"
            >
              <div class="planet-header">
                <h4>{{ planet.planet }}{{ $t('transitAnalysis.planetInfluence') }}</h4>
                <span class="planet-theme">{{ planet.theme }}</span>
              </div>
              <p class="planet-description">{{ planet.description }}</p>
              
              <div class="planet-aspects" v-if="planet.aspects && planet.aspects.length > 0">
                <h5>{{ $t('transitAnalysis.relatedAspects') }}</h5>
                <div class="aspects-list">
                  <div 
                    v-for="aspect in planet.aspects" 
                    :key="aspect.description"
                    class="aspect-item"
                  >
                    <span class="aspect-name">{{ aspect.description }}</span>
                    <span class="aspect-orb">{{ aspect.orb }}°</span>
                  </div>
                </div>
              </div>
              
              <div class="planet-advice">
                <strong>{{ $t('transitAnalysis.guidanceAdvice') }}:</strong> {{ planet.advice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 主要相位 -->
        <div class="major-aspects-section" v-if="transitReport.majorAspects && transitReport.majorAspects.length > 0">
          <h3 class="section-title">{{ $t('transitAnalysis.majorTransitAspects') }}</h3>
          <div class="aspects-list">
            <div 
              v-for="aspect in transitReport.majorAspects" 
              :key="aspect.title"
              class="aspect-card"
              :class="intensityAspectClass(aspect.intensity)"
            >
              <div class="aspect-header">
                <h4>{{ aspect.title }}</h4>
                <div class="aspect-meta">
                  <span class="orb-info">{{ $t('transitAnalysis.orb') }}: {{ aspect.orb }}°</span>
                  <span class="direction-info" v-if="aspect.direction">{{ aspect.direction }}</span>
                  <span class="timeframe-info" v-if="aspect.timeframe">{{ aspect.timeframe }}</span>
                </div>
              </div>
              
              <p class="aspect-description">{{ aspect.description }}</p>
              
              <div class="aspect-keywords" v-if="aspect.keywords && aspect.keywords.length > 0">
                <span 
                  v-for="keyword in aspect.keywords" 
                  :key="keyword"
                  class="keyword-tag"
                >
                  {{ keyword }}
                </span>
              </div>
              
              <div class="aspect-advice" v-if="aspect.advice">
                <strong>{{ $t('transitAnalysis.advice') }}:</strong> {{ aspect.advice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 人生指导 -->
        <div class="life-guidance-section" v-if="transitReport.lifeGuidance">
          <h3 class="section-title">{{ $t('transitAnalysis.lifeGuidanceAdvice') }}</h3>
          <div class="guidance-grid">
            <div class="guidance-card">
              <h4>{{ $t('transitAnalysis.currentFocus') }}</h4>
              <p>{{ transitReport.lifeGuidance.primaryFocus }}</p>
            </div>
            <div class="guidance-card challenge">
              <h4>{{ $t('transitAnalysis.mainChallenge') }}</h4>
              <p>{{ transitReport.lifeGuidance.currentChallenge }}</p>
            </div>
            <div class="guidance-card opportunity">
              <h4>{{ $t('transitAnalysis.importantOpportunity') }}</h4>
              <p>{{ transitReport.lifeGuidance.currentOpportunity }}</p>
            </div>
          </div>
          
          <div class="advice-sections">
            <div class="advice-card">
              <h4>{{ $t('transitAnalysis.emotionalAdvice') }}</h4>
              <p>{{ transitReport.lifeGuidance.emotionalAdvice }}</p>
            </div>
            <div class="advice-card">
              <h4>{{ $t('transitAnalysis.practicalAdvice') }}</h4>
              <p>{{ transitReport.lifeGuidance.practicalAdvice }}</p>
            </div>
            <div class="advice-card">
              <h4>{{ $t('transitAnalysis.spiritualAdvice') }}</h4>
              <p>{{ transitReport.lifeGuidance.spiritualAdvice }}</p>
            </div>
          </div>
        </div>

        <!-- 详细建议 -->
        <div class="recommendations-section" v-if="transitReport.recommendations">
          <h3 class="section-title">{{ $t('transitAnalysis.detailedRecommendations') }}</h3>
          <div class="recommendations-tabs">
            <button 
              v-for="(tab, key) in recommendationTabs" 
              :key="key"
              @click="activeTab = key"
              :class="{ active: activeTab === key }"
              class="tab-button"
            >
              {{ $t(tab.name) }}
            </button>
          </div>
          
          <div class="tab-content">
            <div v-if="activeTab === 'career'" class="recommendation-content">
              <h4 v-if="transitReport.recommendations.career.focus">{{ transitReport.recommendations.career.focus }}</h4>
              <p v-if="transitReport.recommendations.career.advice">{{ transitReport.recommendations.career.advice }}</p>
              <p v-if="transitReport.recommendations.career.timing">
                <strong>{{ $t('transitAnalysis.timeframe') }}:</strong> {{ transitReport.recommendations.career.timing }}
              </p>
            </div>
            
            <div v-if="activeTab === 'relationships'" class="recommendation-content">
              <h4 v-if="transitReport.recommendations.relationships.focus">{{ transitReport.recommendations.relationships.focus }}</h4>
              <p v-if="transitReport.recommendations.relationships.advice">{{ transitReport.recommendations.relationships.advice }}</p>
              <div v-if="transitReport.recommendations.relationships.areas" class="focus-areas">
                <strong>{{ $t('transitAnalysis.focusAreas') }}:</strong>
                <span 
                  v-for="area in transitReport.recommendations.relationships.areas" 
                  :key="area"
                  class="area-tag"
                >
                  {{ area }}
                </span>
              </div>
            </div>
            
            <div v-if="activeTab === 'health'" class="recommendation-content">
              <div class="health-aspects" v-if="transitReport.recommendations.health">
                <div class="health-item" v-if="transitReport.recommendations.health.physical">
                  <strong>{{ $t('transitAnalysis.physicalHealth') }}:</strong> {{ transitReport.recommendations.health.physical }}
                </div>
                <div class="health-item" v-if="transitReport.recommendations.health.mental">
                  <strong>{{ $t('transitAnalysis.mentalHealth') }}:</strong> {{ transitReport.recommendations.health.mental }}
                </div>
                <div class="health-item" v-if="transitReport.recommendations.health.emotional">
                  <strong>{{ $t('transitAnalysis.emotionalHealth') }}:</strong> {{ transitReport.recommendations.health.emotional }}
                </div>
              </div>
            </div>
            
            <div v-if="activeTab === 'personal'" class="recommendation-content">
              <h4>{{ $t('transitAnalysis.personalGrowthFocus') }}</h4>
              <div v-if="transitReport.recommendations.personal.priorities" class="priorities">
                <strong>{{ $t('transitAnalysis.priorityDevelopment') }}:</strong>
                <span 
                  v-for="priority in transitReport.recommendations.personal.priorities" 
                  :key="priority"
                  class="priority-tag"
                >
                  {{ priority }}
                </span>
              </div>
              <div v-if="transitReport.recommendations.personal.methods" class="methods">
                <strong>{{ $t('transitAnalysis.recommendedMethods') }}:</strong>
                <ul>
                  <li v-for="method in transitReport.recommendations.personal.methods" :key="method">
                    {{ method }}
                  </li>
                </ul>
              </div>
            </div>
            
            <div v-if="activeTab === 'financial'" class="recommendation-content">
              <h4 v-if="transitReport.recommendations.financial.priority">{{ transitReport.recommendations.financial.priority }}</h4>
              <p v-if="transitReport.recommendations.financial.approach">
                <strong>{{ $t('transitAnalysis.approach') }}:</strong> {{ transitReport.recommendations.financial.approach }}
              </p>
              <p v-if="transitReport.recommendations.financial.advice">{{ transitReport.recommendations.financial.advice }}</p>
            </div>
            
            <div v-if="activeTab === 'timing'" class="recommendation-content">
              <div class="timing-info" v-if="transitReport.recommendations.timing">
                <div class="timing-item positive" v-if="transitReport.recommendations.timing.bestTiming">
                  <strong>{{ $t('transitAnalysis.bestTiming') }}:</strong> {{ transitReport.recommendations.timing.bestTiming }}
                </div>
                <div class="timing-item caution" v-if="transitReport.recommendations.timing.avoidTiming">
                  <strong>{{ $t('transitAnalysis.cautionPeriod') }}:</strong> {{ transitReport.recommendations.timing.avoidTiming }}
                </div>
                <div class="timing-item neutral" v-if="transitReport.recommendations.timing.keyDates">
                  <strong>{{ $t('transitAnalysis.keyDates') }}:</strong> {{ transitReport.recommendations.timing.keyDates }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 未来展望 -->
        <div class="future-outlook-section" v-if="transitReport.futureOutlook">
          <h3 class="section-title">{{ $t('transitAnalysis.futureOutlook') }}</h3>
          <div class="outlook-timeline">
            <div class="timeline-item" v-if="transitReport.futureOutlook.next3Months">
              <h4>{{ $t('transitAnalysis.next3Months') }}</h4>
              <p>{{ transitReport.futureOutlook.next3Months }}</p>
            </div>
            <div class="timeline-item" v-if="transitReport.futureOutlook.next6Months">
              <h4>{{ $t('transitAnalysis.next6Months') }}</h4>
              <p>{{ transitReport.futureOutlook.next6Months }}</p>
            </div>
            <div class="timeline-item" v-if="transitReport.futureOutlook.nextYear">
              <h4>{{ $t('transitAnalysis.nextYearOutlook') }}</h4>
              <p>{{ transitReport.futureOutlook.nextYear }}</p>
            </div>
            <div class="timeline-item" v-if="transitReport.futureOutlook.longTerm">
              <h4>{{ $t('transitAnalysis.longTermDevelopment') }}</h4>
              <p>{{ transitReport.futureOutlook.longTerm }}</p>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-section">
          <button @click="generateNewAnalysis" class="secondary-btn">{{ $t('transitAnalysis.reanalyze') }}</button>
          <button @click="shareReport" class="primary-btn">{{ $t('transitAnalysis.shareReport') }}</button>
          <button @click="goBack" class="secondary-btn">{{ $t('transitAnalysis.returnHome') }}</button>
        </div>
      </section>

      <!-- 加载状态 -->
      <div class="loading-section" v-if="isAnalyzing">
        <div class="loading-content">
          <div class="spinner"></div>
          <h3>{{ $t('transitAnalysis.analyzingYourTransit') }}</h3>
          <p>{{ $t('transitAnalysis.calculatingPlanets') }}</p>
          <div class="loading-steps">
            <div class="step" :class="{ active: loadingStep >= 1 }">{{ $t('transitAnalysis.step1') }}</div>
            <div class="step" :class="{ active: loadingStep >= 2 }">{{ $t('transitAnalysis.step2') }}</div>
            <div class="step" :class="{ active: loadingStep >= 3 }">{{ $t('transitAnalysis.step3') }}</div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { mapGetters } from 'vuex'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import i18nMixin from '../mixins/i18n.js'
import { calculateTransitChart } from '../utils/transitCalculator.js'
import { generateDetailedTransitReport } from '../utils/transitReportGenerator.js'

export default {
  name: 'TransitAnalysisPage',
  mixins: [i18nMixin],
  components: {
    LanguageSwitcher
  },
  
  setup() {
    // 响应式数据
    const selectedDate = ref('')
    const selectedTime = ref('12:00')
    const isAnalyzing = ref(false)
    const transitReport = ref(null)
    const loadingStep = ref(0)
    const activeTab = ref('career')

    // 建议标签配置
    const recommendationTabs = {
      career: { name: 'transitAnalysis.tabs.career' },
      relationships: { name: 'transitAnalysis.tabs.relationships' },
      health: { name: 'transitAnalysis.tabs.health' },
      personal: { name: 'transitAnalysis.tabs.personal' },
      financial: { name: 'transitAnalysis.tabs.financial' },
      timing: { name: 'transitAnalysis.tabs.timing' }
    }

    // 计算属性
    const today = new Date().toISOString().split('T')[0]
    const minDate = computed(() => {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      return oneYearAgo.toISOString().split('T')[0]
    })
    
    const maxDate = computed(() => {
      const oneYearLater = new Date()
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)
      return oneYearLater.toISOString().split('T')[0]
    })

    const formatSelectedDate = computed(() => {
      if (!selectedDate.value) return ''
      const date = new Date(selectedDate.value)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    })

    const formatAnalysisDate = computed(() => {
      if (!transitReport.value) return ''
      return transitReport.value.header.analysisDate
    })

    const intensityClass = computed(() => {
      if (!transitReport.value) return ''
      const intensity = transitReport.value.overview.intensity
      return {
        'intensity-high': intensity === '高强度' || intensity === 'high',
        'intensity-medium': intensity === '中等强度' || intensity === 'medium', 
        'intensity-low': intensity === '温和强度' || intensity === 'low'
      }
    })

    // 初始化
    onMounted(() => {
      selectedDate.value = today
    })

    return {
      selectedDate,
      selectedTime,
      isAnalyzing,
      transitReport,
      loadingStep,
      activeTab,
      recommendationTabs,
      today,
      minDate,
      maxDate,
      formatSelectedDate,
      formatAnalysisDate,
      intensityClass
    }
  },
  
  computed: {
    ...mapGetters({
      userData: 'getUserData'
    }),
    
    calculatedAge() {
      if (!this.selectedDate || !this.userData) return 0
      const birthDate = new Date(this.userData.fullBirthDateTime)
      const selectedDateTime = new Date(this.selectedDate)
      const ageInMs = selectedDateTime - birthDate
      return Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25))
    },
    
    daysToBirthday() {
      if (!this.selectedDate || !this.userData) return 0
      const birth = new Date(this.userData.fullBirthDateTime)
      const selected = new Date(this.selectedDate)
      const thisYearBirthday = new Date(selected.getFullYear(), birth.getMonth(), birth.getDate())
      
      if (thisYearBirthday < selected) {
        thisYearBirthday.setFullYear(selected.getFullYear() + 1)
      }
      
      const diffTime = thisYearBirthday - selected
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    },

    isToday() {
      return this.selectedDate === this.today
    },
    
    isBirthday() {
      if (!this.userData || !this.selectedDate) return false
      const birth = new Date(this.userData.fullBirthDateTime)
      const selected = new Date(this.selectedDate)
      return selected.getMonth() === birth.getMonth() && selected.getDate() === birth.getDate()
    },
    
    isNewYear() {
      if (!this.selectedDate) return false
      const selected = new Date(this.selectedDate)
      return selected.getMonth() === 0 && selected.getDate() === 1
    },

    isMobile() {
      return window.innerWidth <= 768
    }
  },
  
  methods: {
    onLanguageChanged(language) {
      console.log('Language changed to:', language)
      this.$forceUpdate()
    },

    selectToday() {
      this.selectedDate = this.today
      this.selectedTime = '12:00'
    },
    
    selectBirthday() {
      if (!this.userData) return
      const currentYear = new Date().getFullYear()
      const birthDateStr = this.userData.birthdate // 直接使用原始日期字符串
      const [, birthMonth, birthDay] = birthDateStr.split('-').map(Number)
      const birthday = new Date(currentYear, birthMonth - 1, birthDay)
      // 如果今年生日已过，选择明年生日
      if (birthday < new Date()) {
        birthday.setFullYear(currentYear + 1)
      }

      // 使用本地时间方法构造日期字符串
      const year = birthday.getFullYear()
      const month = String(birthday.getMonth() + 1).padStart(2, '0')
      const day = String(birthday.getDate()).padStart(2, '0')
      this.selectedDate = `${year}-${month}-${day}`
    },
    
    selectNewYear() {
      const nextYear = new Date().getFullYear() + 1
      this.selectedDate = `${nextYear}-01-01`
      this.selectedTime = '00:00'
    },

    async startAnalysis() {
      if (!this.userData || !this.selectedDate) return
      
      this.isAnalyzing = true
      this.loadingStep = 0
      
      try {
        // 模拟加载步骤
        this.loadingStep = 1
        await this.delay(1000)
        
        // 构建分析时间
        const analysisDateTime = `${this.selectedDate}T${this.selectedTime}:00`
        
        this.loadingStep = 2
        await this.delay(1000)
        
        // 计算行运盘数据
        const transitData = calculateTransitChart(this.userData, analysisDateTime)
        
        this.loadingStep = 3
        await this.delay(1000)
        
        // 生成详细报告
        const detailedReport = generateDetailedTransitReport(transitData, this.userData)
        
        this.transitReport = detailedReport
        
      } catch (error) {
        console.error('行运分析失败:', error)
        alert(this.$t('transitAnalysis.analysisError'))
      } finally {
        this.isAnalyzing = false
        this.loadingStep = 0
      }
    },

    intensityAspectClass(intensity) {
      return {
        'aspect-strong': intensity === 'strong' || intensity === '強烈',
        'aspect-moderate': intensity === 'moderate' || intensity === '中等',
        'aspect-weak': !intensity || intensity === 'weak' || intensity === '微弱'
      }
    },

    getIntensityText(intensity) {
      if (intensity === '高强度' || intensity === 'high') return this.$t('transitAnalysis.intensity.high')
      if (intensity === '中等强度' || intensity === 'medium') return this.$t('transitAnalysis.intensity.medium')
      if (intensity === '温和强度' || intensity === 'low') return this.$t('transitAnalysis.intensity.low')
      return this.$t('transitAnalysis.intensity.medium')
    },

    generateNewAnalysis() {
      this.transitReport = null
    },

    shareReport() {
      if (navigator.share) {
        navigator.share({
          title: this.$t('transitAnalysis.shareTitle'),
          text: `${this.userData.name}${this.$t('transitAnalysis.shareText')}`,
          url: window.location.href
        }).catch(console.error)
      } else {
        // 降级方案
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert(this.$t('transitAnalysis.linkCopied')))
          .catch(() => alert(this.$t('transitAnalysis.copyManually')))
      }
    },

    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.$router.push({ name: 'home' })
      }
    },

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  
  created() {
    // 检查用户数据
    if (!this.userData) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.transit-analysis-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #d35400;
  margin-bottom: 0.5rem;
  font-family: 'Shippori Mincho', serif;
}

.subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
}

/* 日期选择区域 */
.selection-card {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.date-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .date-options {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.quick-options h3,
.custom-date h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.quick-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.quick-btn {
  padding: 10px 20px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.quick-btn:hover,
.quick-btn.current {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
}

.date-inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 500;
  color: #34495e;
}

.input-group input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.analysis-preview {
  background: linear-gradient(135deg, #f8f4fd 0%, #f4f1f8 100%);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid rgba(52, 152, 219, 0.1);
}

.analysis-preview h3 {
  color: #3498db;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.preview-info p {
  margin: 8px 0;
  color: #2c3e50;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.analyze-btn {
  background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(211, 84, 0, 0.3);
}

.analyze-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #e67e22 0%, #f39c12 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(211, 84, 0, 0.4);
}

.analyze-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.back-btn {
  background: #7f8c8d;
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.back-btn:hover {
  background: #95a5a6;
  transform: translateY(-1px);
}

/* 加载状态 */
.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  margin-bottom: 20px;
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #d35400;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-content h3 {
  color: #d35400;
  margin-bottom: 8px;
}

.loading-content p {
  color: #7f8c8d;
  margin-bottom: 20px;
}

.loading-steps {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step {
  padding: 8px 16px;
  background: #ecf0f1;
  border-radius: 20px;
  color: #7f8c8d;
  transition: all 0.3s ease;
}

.step.active {
  background: #d35400;
  color: white;
  transform: scale(1.02);
}

/* 分析结果区域 */
.analysis-results {
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ecf0f1;
}

@media (max-width: 768px) {
  .report-header {
    flex-direction: column;
    gap: 15px;
  }
}

.user-info h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.8rem;
}

.basic-info {
  display: flex;
  gap: 20px;
  color: #7f8c8d;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .basic-info {
    flex-direction: column;
    gap: 5px;
  }
}

.intensity-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.intensity-badge.intensity-high {
  background: #e74c3c;
  color: white;
}

.intensity-badge.intensity-medium {
  background: #f39c12;
  color: white;
}

.intensity-badge.intensity-low {
  background: #27ae60;
  color: white;
}

/* 概览区域 */
.overview-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.main-summary {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  line-height: 1.6;
}

.phase-description {
  margin-bottom: 20px;
  opacity: 0.9;
  line-height: 1.5;
}

.key-themes h4 {
  margin-bottom: 10px;
}

.theme-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.theme-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 生命周期区域 */
.cycles-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

@media (max-width: 768px) {
  .cycles-grid {
    grid-template-columns: 1fr;
  }
}

.cycle-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #3498db;
  transition: all 0.3s ease;
}

.cycle-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.cycle-header {
  margin-bottom: 15px;
}

.cycle-header h4 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.progress-indicator {
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: #7f8c8d;
  white-space: nowrap;
}

.cycle-description {
  color: #5a6c7d;
  line-height: 1.6;
  margin-bottom: 15px;
}

.cycle-themes {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.cycle-theme {
  background: #3498db;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.cycle-advice {
  background: #eaf2ff;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #3498db;
  margin-top: 15px;
}

/* 外行星影响区域 */
.overall-theme {
  background: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
}

.overall-theme h4 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.planets-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

@media (max-width: 768px) {
  .planets-grid {
    grid-template-columns: 1fr;
  }
}

.planet-card {
  border: 2px solid #ecf0f1;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  background: white;
}

.planet-card:hover {
  border-color: #d35400;
  box-shadow: 0 4px 15px rgba(211, 84, 0, 0.1);
  transform: translateY(-2px);
}

.planet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.planet-header h4 {
  color: #2c3e50;
  flex: 1;
}

.planet-theme {
  background: #d35400;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  white-space: nowrap;
  margin-left: 10px;
}

.planet-description {
  line-height: 1.6;
  color: #5a6c7d;
  margin-bottom: 15px;
}

.planet-aspects {
  margin: 15px 0;
}

.planet-aspects h5 {
  color: #34495e;
  margin-bottom: 10px;
  font-size: 1rem;
}

.aspects-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.aspect-item {
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid #3498db;
}

.aspect-name {
  flex: 1;
  color: #2c3e50;
}

.aspect-orb {
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
}

.planet-advice {
  background: #fff3cd;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #ffc107;
  margin-top: 15px;
  line-height: 1.5;
}

/* 主要相位区域 */
.aspect-card {
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #95a5a6;
  background: white;
  transition: all 0.3s ease;
}

.aspect-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.aspect-card.aspect-strong {
  border-left-color: #e74c3c;
  background: #fdf2f2;
}

.aspect-card.aspect-moderate {
  border-left-color: #f39c12;
  background: #fef9f3;
}

.aspect-card.aspect-weak {
  border-left-color: #95a5a6;
  background: #f8f9fa;
}

.aspect-header {
  margin-bottom: 15px;
}

.aspect-header h4 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.aspect-meta {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #7f8c8d;
  flex-wrap: wrap;
}

.aspect-description {
  line-height: 1.6;
  color: #5a6c7d;
  margin-bottom: 15px;
}

.aspect-keywords {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.keyword-tag {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.aspect-advice {
  background: rgba(52, 152, 219, 0.1);
  padding: 12px;
  border-radius: 6px;
  border-left: 3px solid #3498db;
  margin-top: 10px;
}

/* 人生指导区域 */
.guidance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.guidance-card {
  padding: 20px;
  border-radius: 12px;
  background: #f8f9fa;
  border-left: 4px solid #3498db;
  transition: all 0.3s ease;
}

.guidance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.guidance-card.challenge {
  border-left-color: #e74c3c;
  background: #fdf2f2;
}

.guidance-card.opportunity {
  border-left-color: #27ae60;
  background: #f1f9f4;
}

.guidance-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.advice-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.advice-card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.advice-card:hover {
  border-color: #3498db;
  box-shadow: 0 2px 10px rgba(52, 152, 219, 0.1);
}

.advice-card h4 {
  color: #495057;
  margin-bottom: 10px;
  font-size: 1rem;
}

/* 建议标签页 */
.recommendations-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
  overflow-x: auto;
}

.tab-button {
  background: none;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  color: #6c757d;
  font-weight: 500;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #d35400;
}

.tab-button.active {
  color: #d35400;
  border-bottom-color: #d35400;
}

.tab-content {
  min-height: 200px;
}

.recommendation-content {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.recommendation-content h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.focus-areas,
.priorities,
.methods {
  margin: 15px 0;
}

.area-tag,
.priority-tag {
  background: #d35400;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-right: 8px;
  margin-bottom: 5px;
  display: inline-block;
}

.health-aspects {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.health-item {
  padding: 15px;
  background: white;
  border-radius: 8px;
  border-left: 3px solid #27ae60;
}

.timing-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.timing-item {
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.timing-item.positive {
  background: #f1f9f4;
  border-left-color: #27ae60;
}

.timing-item.caution {
  background: #fdf2f2;
  border-left-color: #e74c3c;
}

.timing-item.neutral {
  background: #f8f9fa;
  border-left-color: #95a5a6;
}

/* 未来展望区域 */
.outlook-timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.timeline-item {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.timeline-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.3);
}

.timeline-item h4 {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.timeline-item p {
  line-height: 1.6;
  opacity: 0.95;
}

/* 操作按钮 */
.action-section {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.primary-btn {
  background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(211, 84, 0, 0.3);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(211, 84, 0, 0.4);
}

.secondary-btn {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}

.secondary-btn:hover {
  background: #e9ecef;
  transform: translateY(-1px);
  color: #495057;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .transit-analysis-container {
    padding: 15px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .selection-card {
    padding: 20px;
  }
  
  .cycles-grid,
  .planets-grid,
  .guidance-grid,
  .advice-sections,
  .outlook-timeline {
    grid-template-columns: 1fr;
  }
  
  .recommendations-tabs {
    flex-wrap: wrap;
  }
  
  .action-buttons,
  .action-section {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-btn,
  .secondary-btn {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .quick-buttons {
    flex-direction: column;
  }
  
  .quick-btn {
    width: 100%;
  }
  
  .theme-tags,
  .aspect-keywords {
    justify-content: center;
  }
  
  .planet-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .planet-theme {
    align-self: flex-start;
    margin-left: 0;
  }
  
  .aspect-meta {
    flex-direction: column;
    gap: 5px;
  }
}
</style>