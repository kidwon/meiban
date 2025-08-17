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

      <!-- 功能导航栏 -->
      <nav class="function-nav">
        <div class="nav-container">
          <button 
            v-for="(nav) in functionNavs" 
            :key="nav.id"
            @click="switchFunctionTab(nav.id)"
            :class="{ 
              'nav-button': true,
              'nav-button--active': activeFunctionTab === nav.id,
              'nav-button--completed': nav.completed,
              'nav-button--visited': nav.visited,
              'nav-button--transitioning': isTransitioning
            }"
            :disabled="isTransitioning"
          >
            <div class="nav-icon">{{ nav.icon }}</div>
            <div class="nav-content">
              <span class="nav-title">{{ $t('astrology.functionNav.' + nav.nameKey) }}</span>
              <span class="nav-status" v-if="nav.completed">✓</span>
              <span class="nav-badge" v-if="nav.badge">{{ nav.badge }}</span>
            </div>
          </button>
        </div>
      </nav>

      <!-- 交互式星盘图 -->
      <section 
        class="section function-tab-content" 
        v-show="activeFunctionTab === 'basic'"
        :class="{ 
          'content-transitioning': isTransitioning,
          'content-direction-forward': tabSwitchDirection === 'forward',
          'content-direction-backward': tabSwitchDirection === 'backward'
        }"
      >
        <h2 class="section-title">{{ $t('astrology.interactiveChart') }}</h2>
        <ChartViewSelector 
          :calculationResults="calculationResults"
          :userData="userData"
          :initialMode="'2d'"
          @modeChange="handleChartModeChange"
          @planetClick="handlePlanetClick"
          @planetHover="handlePlanetHover"
          @resetView="handleResetView"
        />
        
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
      <section class="section" v-show="activeFunctionTab === 'basic'">
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

              <!-- 个性化推荐卡片 -->
              <div class="recommendation-cards">
                <h4 class="recommendations-title">{{ $t('astrology.recommendationsTitle') }}</h4>
                <div class="cards-grid">
                  <div class="recommendation-card recommendation-card--transit" @click="goToTransitAnalysis">
                    <div class="card-icon">🌟</div>
                    <div class="card-content">
                      <h5>{{ $t('astrology.actions.transitAnalysis') }}</h5>
                      <p>{{ $t('astrology.recommendations.transitDescription') }}</p>
                      <div class="card-badge">{{ $t('astrology.recommendations.recommended') }}</div>
                    </div>
                    <div class="card-arrow">→</div>
                  </div>
                  
                  <div class="recommendation-card recommendation-card--compatibility" @click="goToCompatibilityAnalysis">
                    <div class="card-icon">💕</div>
                    <div class="card-content">
                      <h5>{{ $t('astrology.actions.compatibility') }}</h5>
                      <p>{{ $t('astrology.recommendations.compatibilityDescription') }}</p>
                      <div class="card-badge card-badge--hot">{{ $t('astrology.recommendations.popular') }}</div>
                    </div>
                    <div class="card-arrow">→</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 行运分析内容 -->
      <section 
        class="section function-tab-content" 
        v-show="activeFunctionTab === 'transit'"
        :class="{ 
          'content-transitioning': isTransitioning,
          'content-direction-forward': tabSwitchDirection === 'forward',
          'content-direction-backward': tabSwitchDirection === 'backward'
        }"
      >
        <h2 class="section-title">🌟 {{ $t('astrology.functionNav.transitAnalysis') }}</h2>
        <div class="transit-content">
          <div class="feature-preview">
            <div class="preview-icon">🌟</div>
            <h3>{{ $t('astrology.actions.transitAnalysis') }}</h3>
            <p>{{ $t('astrology.advancedFeatures.transitDescription') }}</p>
            <div class="feature-highlights">
              <div class="highlight-item">
                <span class="highlight-icon">📈</span>
                <span>{{ $t('astrology.advancedFeatures.transitFeatures.futureTrends') }}</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">🪐</span>
                <span>{{ $t('astrology.advancedFeatures.transitFeatures.transitPlanets') }}</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">⏰</span>
                <span>{{ $t('astrology.advancedFeatures.transitFeatures.timingDiagnosis') }}</span>
              </div>
            </div>
            <button @click="goToTransitAnalysis" class="btn btn--primary btn--large">
              {{ $t('astrology.actions.transitAnalysis') }}
            </button>
          </div>
        </div>
      </section>

      <!-- 合盘分析内容 -->
      <section 
        class="section function-tab-content" 
        v-show="activeFunctionTab === 'compatibility'"
        :class="{ 
          'content-transitioning': isTransitioning,
          'content-direction-forward': tabSwitchDirection === 'forward',
          'content-direction-backward': tabSwitchDirection === 'backward'
        }"
      >
        <h2 class="section-title">💕 {{ $t('astrology.functionNav.compatibilityAnalysis') }}</h2>
        <div class="compatibility-content">
          <div class="feature-preview">
            <div class="preview-icon">💕</div>
            <h3>{{ $t('astrology.actions.compatibility') }}</h3>
            <p>{{ $t('astrology.advancedFeatures.compatibilityDescription') }}</p>
            <div class="feature-highlights">
              <div class="highlight-item">
                <span class="highlight-icon">❤️</span>
                <span>{{ $t('astrology.advancedFeatures.compatibilityFeatures.loveCompatibility') }}</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">💬</span>
                <span>{{ $t('astrology.advancedFeatures.compatibilityFeatures.communicationTrends') }}</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-icon">💡</span>
                <span>{{ $t('astrology.advancedFeatures.compatibilityFeatures.relationshipAdvice') }}</span>
              </div>
            </div>
            <button @click="goToCompatibilityAnalysis" class="btn btn--primary btn--large">
              {{ $t('astrology.actions.compatibility') }}
            </button>
          </div>
        </div>
      </section>


      <!-- 操作按钮 -->
      <div class="actions">
        <button @click="goBack" class="btn btn--outline">{{ $t('astrology.actions.back') }}</button>
        <button @click="downloadReport" class="btn btn--primary">{{ $t('astrology.actions.download') }}</button>
        <ShareButton 
          :userData="userData"
          :calculationResults="calculationResults"
          analysisType="astrology"
          @shareSuccess="handleShareSuccess"
          @shareCancel="handleShareCancel"
          @error="handleShareError"
          @showTip="showShareTip"
        />
      </div>
    </div>

    <div class="loading" v-else>
      <p>{{ $t('astrology.calculating') }}</p>
    </div>

    <!-- 用户引导覆盖层 -->
    <div class="user-guide-overlay" v-if="showUserGuide" @click="endUserGuide">
      <div class="guide-modal" @click.stop>
        <div class="guide-header">
          <h3>{{ getGuideTitle() }}</h3>
          <button @click="endUserGuide" class="guide-close-btn">×</button>
        </div>
        <div class="guide-content">
          <p>{{ getGuideContent() }}</p>
        </div>
        <div class="guide-footer">
          <div class="guide-progress">
            <span>{{ guideStep + 1 }} / {{ userGuideSteps.length }}</span>
            <div class="progress-dots">
              <span 
                v-for="(step, index) in userGuideSteps" 
                :key="index"
                :class="{ active: index === guideStep, completed: index < guideStep }"
                class="progress-dot"
              ></span>
            </div>
          </div>
          <div class="guide-actions">
            <button @click="prevGuideStep" :disabled="guideStep === 0" class="btn btn--outline">
              {{ $t('astrology.userGuide.previous') }}
            </button>
            <button @click="nextGuideStep" class="btn btn--primary">
              {{ guideStep === userGuideSteps.length - 1 ? $t('astrology.userGuide.finish') : $t('astrology.userGuide.next') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 浮动提示 -->
    <div class="floating-tooltip" v-if="showTooltip" :class="`tooltip-${showTooltip}`">
      <span>{{ $t(`astrology.tooltips.${showTooltip}`) }}</span>
    </div>

    <!-- 广告位 - 只在有完整计算结果且内容充实时显示 -->
    <AdSenseAd 
      v-if="hasCompleteAstrologyContent"
      :ad-slot="$options.AD_SLOTS.RECTANGLE"
      container-class="rectangle"
      :require-content="true"
      :force-hide="false"
    />

    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import ShareButton from '../components/ShareButton.vue'
import AdSenseAd from '../components/AdSenseAd.vue'
import i18nMixin from '../mixins/i18n.js'
import ChartViewSelector from '../components/StarChart/ChartViewSelector.vue'
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
  
  AD_SLOTS: {
    BANNER: process.env.VUE_APP_AD_SLOT_BANNER || '1234567890',
    RECTANGLE: process.env.VUE_APP_AD_SLOT_RECTANGLE || '0987654321',
    RESPONSIVE: process.env.VUE_APP_AD_SLOT_RESPONSIVE || '5678901234'
  },
  
  components: {
    LanguageSwitcher,
    ShareButton,
    AdSenseAd,
    ChartViewSelector
  },
  
  data() {
    return {
      activeTab: 'personality',
      activeFunctionTab: 'basic', // 当前激活的功能标签
      isTransitioning: false, // 控制切换动画状态
      lastActiveTab: 'basic', // 记录上一个激活的标签
      tabSwitchDirection: 'forward', // 切换方向：'forward' 或 'backward'
      showUserGuide: false, // 控制用户引导显示
      guideStep: 0, // 当前引导步骤
      isFirstVisit: false, // 是否首次访问
      showTooltip: null, // 当前显示的提示
      interactionCount: 0, // 用户交互计数
      selectedPlanet: null,
      analysisTabs: [
        { id: 'personality', nameKey: 'personalityAnalysis' },
        { id: 'career', nameKey: 'careerAnalysis' },
        { id: 'relationships', nameKey: 'relationshipAnalysis' },
        { id: 'fortune', nameKey: 'fortuneAnalysis' }
      ],
      functionNavs: [
        { 
          id: 'basic', 
          nameKey: 'basicAnalysis', 
          icon: '📊', 
          completed: true, // 基础分析默认完成
          badge: null 
        },
        { 
          id: 'transit', 
          nameKey: 'transitAnalysis', 
          icon: '🌟', 
          completed: false,
          badge: 'NEW' 
        },
        { 
          id: 'compatibility', 
          nameKey: 'compatibilityAnalysis', 
          icon: '💕', 
          completed: false,
          badge: 'HOT' 
        }
      ],
      userGuideSteps: [
        {
          id: 'welcome',
          target: '.function-nav',
          titleKey: 'astrology.userGuide.welcome.title',
          contentKey: 'astrology.userGuide.welcome.content',
          position: 'bottom'
        },
        {
          id: 'navigation',
          target: '.nav-button--active',
          titleKey: 'astrology.userGuide.navigation.title',
          contentKey: 'astrology.userGuide.navigation.content',
          position: 'bottom'
        },
        {
          id: 'chart-interaction',
          target: '.chart-container',
          titleKey: 'astrology.userGuide.chartInteraction.title',
          contentKey: 'astrology.userGuide.chartInteraction.content',
          position: 'top'
        },
        {
          id: 'recommendations',
          target: '.recommendation-cards',
          titleKey: 'astrology.userGuide.recommendations.title',
          contentKey: 'astrology.userGuide.recommendations.content',
          position: 'top'
        }
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
    },

    // 检查是否有完整的占星内容可以显示广告
    hasCompleteAstrologyContent() {
      return this.calculationResults && 
             this.calculationResults.astrology &&
             this.calculationResults.astrology.planets &&
             this.calculationResults.astrology.houses &&
             this.calculationResults.astrology.aspects &&
             this.userData &&
             this.userData.birthdate &&
             this.userData.birthplace &&
             Object.keys(this.calculationResults.astrology.planets).length > 5 &&
             Object.keys(this.calculationResults.astrology.houses).length > 5;
    }
  },
  
  methods: {
    // 用户引导翻译方法
    getGuideTitle() {
      const step = this.userGuideSteps[this.guideStep]
      if (!step || !step.titleKey) return ''
      return this.$t(step.titleKey)
    },

    getGuideContent() {
      const step = this.userGuideSteps[this.guideStep]
      if (!step || !step.contentKey) return ''
      return this.$t(step.contentKey)
    },

    // 增强的功能切换逻辑
    switchFunctionTab(newTabId) {
      if (this.activeFunctionTab === newTabId || this.isTransitioning) {
        return // 防止重复切换或切换过程中的操作
      }

      // 确定切换方向
      const tabOrder = ['basic', 'transit', 'compatibility']
      const currentIndex = tabOrder.indexOf(this.activeFunctionTab)
      const newIndex = tabOrder.indexOf(newTabId)
      this.tabSwitchDirection = newIndex > currentIndex ? 'forward' : 'backward'

      // 开始切换动画
      this.isTransitioning = true
      this.lastActiveTab = this.activeFunctionTab

      // 添加触觉反馈（如果支持）
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }

      // 延迟切换以显示动画效果
      setTimeout(() => {
        this.activeFunctionTab = newTabId
        
        // 标记导航项为已访问
        const navItem = this.functionNavs.find(nav => nav.id === newTabId)
        if (navItem && !navItem.visited) {
          navItem.visited = true
        }

        // 完成切换动画
        setTimeout(() => {
          this.isTransitioning = false
          this.lastActiveTab = newTabId
        }, 300)
      }, 150)

      // 发送分析事件（用于用户行为追踪）
      this.$nextTick(() => {
        this.trackTabSwitch(newTabId)
      })
    },

    // 用户行为追踪
    trackTabSwitch(tabId) {
      // 这里可以添加分析代码，如Google Analytics
      console.log(`User switched to tab: ${tabId}`)
      
      // 可以发送到analytics服务
      if (window.gtag) {
        window.gtag('event', 'tab_switch', {
          'tab_name': tabId,
          'previous_tab': this.lastActiveTab
        })
      }
    },

    // 处理星盘视图模式变化
    handleChartModeChange(mode) {
      console.log('Chart mode changed to:', mode)
      
      // 添加触觉反馈
      if (navigator.vibrate) {
        navigator.vibrate(100)
      }
      
      // 发送分析事件
      if (window.gtag) {
        window.gtag('event', 'chart_mode_toggle', {
          'mode': mode,
          'user_name': this.userData?.name || 'anonymous'
        })
      }
    },

    // 处理视图重置
    handleResetView() {
      console.log('Chart view reset')
      
      // 可以添加重置逻辑
      if (window.gtag) {
        window.gtag('event', 'chart_view_reset', {
          'user_name': this.userData?.name || 'anonymous'
        })
      }
    },


    // 键盘导航支持
    handleKeyNavigation(event) {
      if (!event.ctrlKey && !event.metaKey) return
      
      const tabOrder = ['basic', 'transit', 'compatibility']
      const currentIndex = tabOrder.indexOf(this.activeFunctionTab)
      
      switch(event.key) {
        case 'ArrowLeft': {
          event.preventDefault()
          const prevIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length
          this.switchFunctionTab(tabOrder[prevIndex])
          break
        }
        case 'ArrowRight': {
          event.preventDefault()
          const nextIndex = (currentIndex + 1) % tabOrder.length
          this.switchFunctionTab(tabOrder[nextIndex])
          break
        }
        case '1':
          event.preventDefault()
          this.switchFunctionTab('basic')
          break
        case '2':
          event.preventDefault()
          this.switchFunctionTab('transit')
          break
        case '3':
          event.preventDefault()
          this.switchFunctionTab('compatibility')
          break
      }
    },

    // 初始化功能导航状态
    initializeFunctionNavigation() {
      // 标记基础分析为已访问
      const basicNav = this.functionNavs.find(nav => nav.id === 'basic')
      if (basicNav) {
        basicNav.visited = true
      }
      
      // 检查是否首次访问
      this.checkFirstVisit()
    },

    // 检查是否首次访问
    checkFirstVisit() {
      const visitKey = 'astrology_results_visited'
      const hasVisited = localStorage.getItem(visitKey)
      
      if (!hasVisited) {
        this.isFirstVisit = true
        localStorage.setItem(visitKey, 'true')
        
        // 延迟显示用户引导 - 暂时禁用
        // setTimeout(() => {
        //   this.startUserGuide()
        // }, 1500)
      }
    },

    // 开始用户引导 (手动调用: 在控制台输入 $vm0.startUserGuide() 来测试)
    startUserGuide() {
      if (this.userGuideSteps.length > 0) {
        this.showUserGuide = true
        this.guideStep = 0
        this.showGuideStep(0)
      }
    },

    // 显示引导步骤
    showGuideStep(stepIndex) {
      if (stepIndex >= this.userGuideSteps.length) {
        this.endUserGuide()
        return
      }

      const step = this.userGuideSteps[stepIndex]
      const targetElement = document.querySelector(step.target)
      
      if (targetElement) {
        // 滚动到目标元素
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
        
        // 高亮目标元素
        this.highlightElement(targetElement)
      }

      this.guideStep = stepIndex
    },

    // 下一个引导步骤
    nextGuideStep() {
      this.clearHighlight()
      if (this.guideStep < this.userGuideSteps.length - 1) {
        this.showGuideStep(this.guideStep + 1)
      } else {
        this.endUserGuide()
      }
    },

    // 上一个引导步骤
    prevGuideStep() {
      this.clearHighlight()
      if (this.guideStep > 0) {
        this.showGuideStep(this.guideStep - 1)
      }
    },

    // 结束用户引导
    endUserGuide() {
      this.showUserGuide = false
      this.guideStep = 0
      this.clearHighlight()
    },

    // 高亮元素
    highlightElement(element) {
      this.clearHighlight()
      element.classList.add('guide-highlight')
    },

    // 清除高亮
    clearHighlight() {
      const highlighted = document.querySelectorAll('.guide-highlight')
      highlighted.forEach(el => el.classList.remove('guide-highlight'))
    },

    // 显示提示
    showInteractionTooltip(type) {
      this.showTooltip = type
      this.interactionCount++
      
      // 自动隐藏提示
      setTimeout(() => {
        this.hideTooltip()
      }, 3000)
    },

    // 隐藏提示
    hideTooltip() {
      this.showTooltip = null
    },

    // 添加微交互反馈
    addMicroInteraction(element, type = 'pulse') {
      if (!element) return
      
      element.classList.add(`micro-${type}`)
      setTimeout(() => {
        element.classList.remove(`micro-${type}`)
      }, 600)
    },

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
    
    async downloadReport() {
      try {
        // 动态导入PDF生成器
        const { generateComprehensivePDFReport, downloadPDF } = await import('../utils/pdfReportGenerator.js')
        
        // 准备数据 - 包含当前页面的所有分析结果和计算出的详细分析
        const enhancedCalculationResults = {
          ...this.calculationResults,
          // 确保生辰八字数据存在
          bazi: this.calculationResults?.bazi || {
            pillars: this.calculationResults?.pillars || [],
            elements: this.calculationResults?.elements || {},
            personality: this.calculationResults?.personality || ''
          },
          // 添加详细的占星分析数据
          astrology: {
            sun: {
              sign: this.calculationResults?.astrologyPositions?.sun?.sign,
              description: this.getSunDescription()
            },
            moon: {
              sign: this.calculationResults?.astrologyPositions?.moon?.sign,
              description: this.getMoonDescription()
            },
            ascendant: {
              sign: this.calculationResults?.astrologyPositions?.ascendant?.sign,
              description: this.getAscendantDescription()
            },
            // 事业分析
            career: {
              strengths: this.getCareerStrengths(),
              suggestions: this.getSuggestedCareers()
            },
            // 感情分析
            relationships: {
              love: this.getLoveDescription(),
              friendship: this.getFriendshipDescription(),
              compatibility: this.getCompatibleSigns()
            },
            // 性格关键词
            planetKeywords: this.calculationResults?.planetKeywords || {},
            // 运势概览
            fortune: {
              overall: this.getOverallFortuneDescription(),
              ...this.calculationResults?.fortune
            }
          }
        }
        
        const reportData = {
          userData: this.userData,
          calculationResults: enhancedCalculationResults,
          // 如果有行运数据也包含进去
          transitReport: this.transitReport || null
        }
        
        // 调试：检查数据完整性
        console.log('Vue Component - Preparing PDF data:')
        console.log('userData:', this.userData)
        console.log('enhancedCalculationResults:', enhancedCalculationResults)
        console.log('transitReport:', this.transitReport)
        
        // 显示加载提示
        const originalText = document.querySelector('.btn[onclick*="downloadReport"]')?.textContent
        if (originalText) {
          document.querySelector('.btn[onclick*="downloadReport"]').textContent = this.$t('astrology.generating')
        }
        
        // 生成PDF
        const pdf = await generateComprehensivePDFReport(
          reportData.userData,
          reportData.calculationResults,
          reportData.transitReport,
          this.currentLanguage
        )
        
        // 下载PDF
        const filename = `astrology-report-${this.userData.name || 'user'}`
        downloadPDF(pdf, filename)
        
        // 恢复按钮文本
        if (originalText) {
          setTimeout(() => {
            const btn = document.querySelector('.btn[onclick*="downloadReport"]')
            if (btn) btn.textContent = originalText
          }, 1000)
        }
        
      } catch (error) {
        console.error('PDF generation failed:', error)
        alert(this.$t('astrology.pdfError') || '生成PDF报告时出现错误')
      }
    },
    
    
    goBack() {
      this.$router.push({ name: 'home' })
    },

    // 分享功能相关方法
    handleShareSuccess(platform) {
      console.log(`占星分析结果分享成功: ${platform}`);
      // 显示成功提示
      this.showTooltip = 'success';
      setTimeout(() => {
        this.showTooltip = null;
      }, 3000);
      
      // 统计分享事件
      if (window.gtag) {
        window.gtag('event', 'share_success', {
          'content_type': 'astrology_results',
          'platform': platform,
          'user_name': this.userData?.name || 'anonymous'
        });
      }
    },

    handleShareCancel(platform) {
      console.log(`取消占星分析结果分享: ${platform}`);
      
      // 统计取消事件
      if (window.gtag) {
        window.gtag('event', 'share_cancel', {
          'content_type': 'astrology_results',
          'platform': platform
        });
      }
    },

    handleShareError(error) {
      console.error('占星分析结果分享失败:', error);
      
      // 显示错误提示
      this.showTooltip = 'error';
      setTimeout(() => {
        this.showTooltip = null;
      }, 3000);

      // 可以显示用户友好的错误消息
      if (this.$toast) {
        this.$toast.error(this.$t('share.error') || '分享失败，请稍后重试');
      } else {
        alert(this.$t('share.error') || '分享失败，请稍后重试');
      }
    },

    showShareTip(message) {
      // 显示分享提示信息
      if (this.$toast) {
        this.$toast.info(message);
      } else {
        // 使用浮动提示显示消息
        this.showTooltip = 'info';
        setTimeout(() => {
          this.showTooltip = null;
        }, 5000);
      }
    }
  },
  
  created() {
    // 对于分享页面，数据可能在路由守卫中异步恢复，给一些时间等待
    if (this.$route.meta.requiresSharedData) {
      // 分享页面数据由路由守卫处理，不需要在这里检查
      return;
    }
    
    if (!this.userData || !this.calculationResults) {
      this.$router.push({ name: 'home' })
    }
  },
  
  mounted() {
    // 监听窗口大小变化，用于响应式设计
    this.handleResize = () => {
      this.$forceUpdate() // 触发isMobile计算属性更新
    }
    window.addEventListener('resize', this.handleResize)
    
    // 处理URL查询参数中的tab切换
    if (this.$route.query.tab) {
      const targetTab = this.$route.query.tab
      if (['basic', 'transit', 'compatibility'].includes(targetTab)) {
        this.activeFunctionTab = targetTab
        // 清除查询参数以保持URL整洁
        this.$router.replace({ query: {} })
      }
    }
    
    // 添加键盘导航支持
    window.addEventListener('keydown', this.handleKeyNavigation)
    
    // 初始化功能导航状态
    this.initializeFunctionNavigation()
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyNavigation)
  }
}
</script>

<style scoped>
/* 导入通用样式，大部分样式使用common.css中的类 */
@import '@/assets/styles/common.css';

/* =============================================================================
   功能导航栏样式
   ============================================================================= */

/* 功能导航栏容器 */
.function-nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 16px 0;
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.nav-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* 导航按钮样式 */
.nav-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;
  min-width: 140px;
  text-align: center;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-button--active {
  background: white !important;
  color: #667eea !important;
  border-color: white !important;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3) !important;
}

.nav-button--active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4) !important;
  background: white !important;
  color: #667eea !important;
}

/* 导航图标和内容 */
.nav-icon {
  font-size: 16px;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-title {
  font-weight: 500;
}

.nav-status {
  color: #28a745;
  font-size: 12px;
  font-weight: bold;
}

.nav-badge {
  background: #ff6b6b;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
}

/* 功能内容区域动画 */
.function-content {
  min-height: 400px;
  animation: fadeIn 0.3s ease-in-out;
}

/* 功能标签切换动画 */
.function-tab-content {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-transitioning {
  pointer-events: none;
}

/* Vue transition 动画 */
.tab-content-enter-active,
.tab-content-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-content-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.tab-content-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.content-direction-forward.tab-content-enter-from {
  transform: translateX(30px);
}

.content-direction-forward.tab-content-leave-to {
  transform: translateX(-30px);
}

.content-direction-backward.tab-content-enter-from {
  transform: translateX(-30px);
}

.content-direction-backward.tab-content-leave-to {
  transform: translateX(30px);
}

/* 导航按钮增强状态 */
.nav-button--visited {
  position: relative;
}

.nav-button--visited:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #28a745;
  border-radius: 50%;
  opacity: 0.7;
}

.nav-button--transitioning {
  transform: scale(0.95);
  opacity: 0.7;
  pointer-events: none;
}

.nav-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 键盘导航提示 */
.function-nav:after {
  content: 'Ctrl + ← → 或 Ctrl + 1/2/3 快速切换';
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: #95a5a6;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  pointer-events: none;
}

.function-nav:hover:after {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 功能预览卡片样式 */
.feature-preview {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px;
  color: white;
  margin: 20px 0;
}

/* 行运分析专属配色 - 蓝色系 */
.transit-content .feature-preview {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.transit-content .highlight-item {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.transit-content .highlight-item:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.preview-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.feature-preview h3 {
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: 600;
  font-family: 'Shippori Mincho', serif;
}

.feature-preview p {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 30px;
}

/* 功能亮点列表 */
.feature-highlights {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 30px 0;
  align-items: center;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.2);
  padding: 12px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  font-size: 14px;
  font-weight: 500;
}

.highlight-icon {
  font-size: 18px;
}

/* 功能按钮样式 */
.btn--large {
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 25px;
  background: white;
  color: #667eea;
  border: none;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.btn--large:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
  background: #f8f9fa;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .function-nav {
    padding: 12px 8px;
    margin: 0 -15px 20px -15px;
    border-radius: 0;
  }
  
  .nav-container {
    gap: 6px;
  }
  
  /* 移动端隐藏键盘导航提示 */
  .function-nav:after {
    display: none;
  }
  
  .nav-button {
    padding: 10px 16px;
    font-size: 13px;
    min-width: 110px;
    flex-direction: column;
    gap: 4px;
  }
  
  .nav-icon {
    font-size: 14px;
  }
  
  .nav-content {
    flex-direction: column;
    gap: 2px;
  }
  
  .nav-title {
    font-size: 12px;
  }
  
  .feature-preview {
    margin: 20px -15px;
    border-radius: 0;
    padding: 30px 20px;
  }
  
  .feature-preview h3 {
    font-size: 24px;
  }
  
  .preview-icon {
    font-size: 50px;
    margin-bottom: 15px;
  }
  
  .feature-highlights {
    gap: 8px;
  }
  
  .highlight-item {
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .highlight-icon {
    font-size: 16px;
  }
}

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}


/* 出生信息摘要 */
.birth-data-summary {
  text-align: center;
  margin-bottom: 20px; /* 从25px压缩 */
  color: #7f8c8d;
  font-size: 0.9rem;
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
  
  
  .tab-button {
    padding: 8px 6px;
    font-size: 0.75rem;
  }
}

/* 用户引导样式 */
.user-guide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  pointer-events: auto;
}

.guide-modal {
  background: white;
  border-radius: 16px;
  max-width: 480px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: guideModalIn 0.3s ease-out;
}

@keyframes guideModalIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e9ecef;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.guide-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.guide-close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.guide-close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.guide-content {
  padding: 25px;
}

.guide-content p {
  margin: 0;
  line-height: 1.6;
  color: #495057;
  font-size: 0.95rem;
}

.guide-footer {
  padding: 20px 25px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.guide-progress {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.85rem;
  color: #6c757d;
}

.progress-dots {
  display: flex;
  gap: 6px;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e9ecef;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: #667eea;
}

.progress-dot.completed {
  background: #28a745;
}

.guide-actions {
  display: flex;
  gap: 10px;
}

.guide-actions .btn {
  padding: 8px 16px;
  font-size: 0.85rem;
}

/* 高亮效果 */
.guide-highlight {
  position: relative;
  z-index: 9999;
  animation: guideHighlight 2s infinite;
  border-radius: 8px;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.5) !important;
}

@keyframes guideHighlight {
  0%, 100% {
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.5);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(102, 126, 234, 0.3);
  }
}

/* 浮动提示样式 */
.floating-tooltip {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #28a745;
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 500;
  z-index: 9998;
  animation: tooltipSlideIn 0.3s ease-out;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

@keyframes tooltipSlideIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.tooltip-interaction {
  background: #17a2b8;
  box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
}

.tooltip-success {
  background: #28a745;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.tooltip-info {
  background: #007bff;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

/* 微交互动画 */
.micro-pulse {
  animation: microPulse 0.6s ease-out;
}

@keyframes microPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.micro-bounce {
  animation: microBounce 0.6s ease-out;
}

@keyframes microBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.micro-shake {
  animation: microShake 0.6s ease-out;
}

@keyframes microShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .user-guide-overlay {
    padding: 20px;
  }
  
  .guide-modal {
    width: 100%;
    max-width: none;
    margin: 0;
    border-radius: 12px;
  }
  
  .guide-header {
    padding: 15px 20px;
  }
  
  .guide-content {
    padding: 20px;
  }
  
  .guide-footer {
    padding: 15px 20px;
    flex-direction: column;
    gap: 15px;
  }
  
  .guide-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .floating-tooltip {
    top: 10px;
    right: 10px;
    left: 10px;
    text-align: center;
  }
}
</style>