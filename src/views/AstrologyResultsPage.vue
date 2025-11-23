<template>
  <div class="app-container app-container--lg">
    <!-- 浮动语言切换器 -->
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="page-header">
      <h1 class="page-title">{{ userData ? userData.name : $t('astrology.guest') }}{{ $t('astrology.chartSuffix') }}</h1>
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
            <div class="nav-icon" v-if="!nav.isImage">
              {{ nav.icon }}
            </div>
            <div class="nav-content">
              <span class="nav-title">{{ $t('astrology.functionNav.' + nav.nameKey) }}</span>
              <span class="nav-status" v-if="nav.completed">✓</span>
              <img v-if="nav.isImage" :src="nav.icon" :alt="$t('astrology.functionNav.' + nav.nameKey)" class="nav-badge-image" />
              <span class="nav-badge" v-else-if="nav.badge">{{ nav.badge }}</span>
            </div>
          </button>
        </div>
      </nav>

      <!-- 我的命盘内容 -->
      <section 
        class="section function-tab-content" 
        v-show="activeFunctionTab === 'my-chart'"
        :class="{ 
          'content-transitioning': isTransitioning,
          'content-direction-forward': tabSwitchDirection === 'forward',
          'content-direction-backward': tabSwitchDirection === 'backward'
        }"
      >
        <!-- 占星分析部分 -->
        <div class="chart-section">
          <div class="section-header" @click="toggleAstrologySection">
            <h3 class="section-header-title">
              <span class="section-icon">⭐</span>
              {{ $t('astrology.myChart.astrologySection') }}
            </h3>
            <button class="collapse-btn" :class="{ 'collapsed': !astrologyExpanded }">
              <span>{{ astrologyExpanded ? '▼' : '▶' }}</span>
            </button>
          </div>
            
            <div class="section-content" v-show="astrologyExpanded">
              <!-- 交互式星盘图 -->
              <ChartViewSelector 
                :calculationResults="calculationResults"
                :userData="userData"
                :initialMode="'2d'"
                @modeChange="handleChartModeChange"
                @planetClick="handlePlanetClick"
                @planetHover="handlePlanetHover"
                @resetView="handleResetView"
              />

              <!-- 占星分析内容 -->
              <div class="analysis-content">
                <!-- 动态生成的分析卡片 -->
                <div 
                  v-for="analysis in dynamicAnalysisCards" 
                  :key="analysis.type" 
                  class="analysis-card"
                  :class="{
                    'warning-card': analysis.type === 'warning',
                    'highlight-card': analysis.type === 'suggestions'
                  }"
                >
                  <div class="card-header">
                    <h3 class="card-title">{{ analysis.title }}</h3>
                  </div>
                  <div class="card-content">
                    <!-- 太阳星座分析 -->
                    <template v-if="analysis.type === 'sun'">
                      <div class="highlight-section" v-if="analysis.advantages">
                        <h4>{{ $t('astrology.analysisLabels.advantages') }}：</h4>
                        <p>{{ analysis.advantages }}</p>
                      </div>
                      <div class="risk-section" v-if="analysis.risks">
                        <h4>{{ $t('astrology.analysisLabels.risks') }}：</h4>
                        <p>{{ analysis.risks }}</p>
                      </div>
                      <div class="action-section" v-if="analysis.actions">
                        <h4>{{ $t('astrology.analysisLabels.actions') }}：</h4>
                        <p>{{ analysis.actions }}</p>
                      </div>
                    </template>

                    <!-- 月亮星座分析 -->
                    <template v-else-if="analysis.type === 'moon'">
                      <p v-if="analysis.description">{{ analysis.description }}</p>
                      <div class="trigger-section" v-if="analysis.triggers">
                        <h4>{{ $t('astrology.analysisLabels.triggers') }}：</h4>
                        <p>{{ analysis.triggers }}</p>
                      </div>
                      <div class="action-section" v-if="analysis.actions">
                        <h4>{{ $t('astrology.analysisLabels.actions') }}：</h4>
                        <p>{{ analysis.actions }}</p>
                      </div>
                    </template>

                    <!-- 上升星座分析 -->
                    <template v-else-if="analysis.type === 'ascendant'">
                      <div class="impression-section" v-if="analysis.impression">
                        <h4>{{ $t('astrology.analysisLabels.impression') }}：</h4>
                        <p>{{ analysis.impression }}</p>
                      </div>
                      <div class="risk-section" v-if="analysis.risks">
                        <h4>{{ $t('astrology.analysisLabels.risks') }}：</h4>
                        <p>{{ analysis.risks }}</p>
                      </div>
                      <div class="action-section" v-if="analysis.actions">
                        <h4>{{ $t('astrology.analysisLabels.actions') }}：</h4>
                        <p>{{ analysis.actions }}</p>
                      </div>
                    </template>

                    <!-- 中天分析 -->
                    <template v-else-if="analysis.type === 'midheaven'">
                      <p v-if="analysis.description">{{ analysis.description }}</p>
                      <div class="career-section" v-if="analysis.career">
                        <h4>{{ $t('astrology.analysisLabels.career') }}：</h4>
                        <p>{{ analysis.career }}</p>
                      </div>
                      <div class="advantages-section" v-if="analysis.advantages">
                        <h4>{{ $t('astrology.analysisLabels.advantages') }}：</h4>
                        <p>{{ analysis.advantages }}</p>
                      </div>
                      <div class="suggestions-section" v-if="analysis.suggestions">
                        <h4>{{ $t('astrology.analysisLabels.suggestions') }}：</h4>
                        <p>{{ analysis.suggestions }}</p>
                      </div>
                    </template>

                    <!-- 金星关系分析 -->
                    <template v-else-if="analysis.type === 'venus'">
                      <p v-if="analysis.description">{{ analysis.description }}</p>
                      <div class="action-section" v-if="analysis.approach">
                        <h4>{{ $t('astrology.analysisLabels.approach') }}：</h4>
                        <p>{{ analysis.approach }}</p>
                      </div>
                    </template>

                    <!-- 火星行动分析 -->
                    <template v-else-if="analysis.type === 'mars'">
                      <div class="strength-section" v-if="analysis.strengths">
                        <h4>{{ $t('astrology.analysisLabels.strengths') }}：</h4>
                        <p>{{ analysis.strengths }}</p>
                      </div>
                      <div class="risk-section" v-if="analysis.risks">
                        <h4>{{ $t('astrology.analysisLabels.risks') }}：</h4>
                        <p>{{ analysis.risks }}</p>
                      </div>
                      <div class="action-section" v-if="analysis.actions">
                        <h4>{{ $t('astrology.analysisLabels.actions') }}：</h4>
                        <p>{{ analysis.actions }}</p>
                      </div>
                    </template>

                    <!-- 事业分析 -->
                    <template v-else-if="analysis.type === 'career'">
                      <div class="direction-section" v-if="analysis.direction">
                        <h4>{{ $t('astrology.analysisLabels.direction') }}：</h4>
                        <p>{{ analysis.direction }}</p>
                      </div>
                      <div class="advantages-section" v-if="analysis.advantages">
                        <h4>{{ $t('astrology.analysisLabels.advantages') }}：</h4>
                        <p>{{ analysis.advantages }}</p>
                      </div>
                      <div class="suggestion-section" v-if="analysis.suggestions">
                        <h4>{{ $t('astrology.analysisLabels.suggestions') }}：</h4>
                        <p>{{ analysis.suggestions }}</p>
                      </div>
                    </template>

                    <!-- 木星分析 -->
                    <template v-else-if="analysis.type === 'jupiter'">
                      <div class="strength-section" v-if="analysis.strengths">
                        <h4>{{ $t('astrology.analysisLabels.strengths') }}：</h4>
                        <p>{{ analysis.strengths }}</p>
                      </div>
                      <div class="opportunity-section" v-if="analysis.opportunities">
                        <h4>{{ $t('astrology.analysisLabels.opportunities') }}：</h4>
                        <p>{{ analysis.opportunities }}</p>
                      </div>
                      <div class="guidance-section" v-if="analysis.guidance">
                        <h4>{{ $t('astrology.analysisLabels.guidance') }}：</h4>
                        <p>{{ analysis.guidance }}</p>
                      </div>
                    </template>

                    <!-- 土星分析 -->
                    <template v-else-if="analysis.type === 'saturn'">
                      <div class="challenge-section" v-if="analysis.challenges">
                        <h4>{{ $t('astrology.analysisLabels.challenges') }}：</h4>
                        <p>{{ analysis.challenges }}</p>
                      </div>
                      <div class="lesson-section" v-if="analysis.lessons">
                        <h4>{{ $t('astrology.analysisLabels.lessons') }}：</h4>
                        <p>{{ analysis.lessons }}</p>
                      </div>
                      <div class="growth-section" v-if="analysis.growth">
                        <h4>{{ $t('astrology.analysisLabels.growth') }}：</h4>
                        <p>{{ analysis.growth }}</p>
                      </div>
                    </template>

                    <!-- 天王星分析 -->
                    <template v-else-if="analysis.type === 'uranus'">
                      <div class="innovation-section" v-if="analysis.innovations">
                        <h4>{{ $t('astrology.analysisLabels.innovations') }}：</h4>
                        <p>{{ analysis.innovations }}</p>
                      </div>
                      <div class="independence-section" v-if="analysis.independence">
                        <h4>{{ $t('astrology.analysisLabels.independence') }}：</h4>
                        <p>{{ analysis.independence }}</p>
                      </div>
                      <div class="guidance-section" v-if="analysis.guidance">
                        <h4>{{ $t('astrology.analysisLabels.guidance') }}：</h4>
                        <p>{{ analysis.guidance }}</p>
                      </div>
                    </template>

                    <!-- 海王星分析 -->
                    <template v-else-if="analysis.type === 'neptune'">
                      <div class="intuition-section" v-if="analysis.intuition">
                        <h4>{{ $t('astrology.analysisLabels.intuition') }}：</h4>
                        <p>{{ analysis.intuition }}</p>
                      </div>
                      <div class="dream-section" v-if="analysis.dreams">
                        <h4>{{ $t('astrology.analysisLabels.dreams') }}：</h4>
                        <p>{{ analysis.dreams }}</p>
                      </div>
                      <div class="guidance-section" v-if="analysis.guidance">
                        <h4>{{ $t('astrology.analysisLabels.guidance') }}：</h4>
                        <p>{{ analysis.guidance }}</p>
                      </div>
                    </template>

                    <!-- 冥王星分析 -->
                    <template v-else-if="analysis.type === 'pluto'">
                      <div class="transformation-section" v-if="analysis.transformation">
                        <h4>{{ $t('astrology.analysisLabels.transformation') }}：</h4>
                        <p>{{ analysis.transformation }}</p>
                      </div>
                      <div class="shadow-section" v-if="analysis.shadow">
                        <h4>{{ $t('astrology.analysisLabels.shadow') }}：</h4>
                        <p>{{ analysis.shadow }}</p>
                      </div>
                      <div class="guidance-section" v-if="analysis.guidance">
                        <h4>{{ $t('astrology.analysisLabels.guidance') }}：</h4>
                        <p>{{ analysis.guidance }}</p>
                      </div>
                    </template>

                    <!-- 北交点分析 -->
                    <template v-else-if="analysis.type === 'northNode'">
                      <div class="purpose-section" v-if="analysis.purpose">
                        <h4>{{ $t('astrology.analysisLabels.purpose') }}：</h4>
                        <p>{{ analysis.purpose }}</p>
                      </div>
                      <div class="development-section" v-if="analysis.development">
                        <h4>{{ $t('astrology.analysisLabels.development') }}：</h4>
                        <p>{{ analysis.development }}</p>
                      </div>
                      <div class="guidance-section" v-if="analysis.guidance">
                        <h4>{{ $t('astrology.analysisLabels.guidance') }}：</h4>
                        <p>{{ analysis.guidance }}</p>
                      </div>
                    </template>

                    <!-- 水星分析 -->
                    <template v-else-if="analysis.type === 'mercury'">
                      <p v-if="analysis.description">{{ analysis.description }}</p>
                      <div class="thinking-section" v-if="analysis.thinking">
                        <h4>{{ $t('astrology.analysisLabels.thinking') }}：</h4>
                        <p>{{ analysis.thinking }}</p>
                      </div>
                      <div class="communication-section" v-if="analysis.communication">
                        <h4>{{ $t('astrology.analysisLabels.communication') }}：</h4>
                        <p>{{ analysis.communication }}</p>
                      </div>
                      <div class="learning-section" v-if="analysis.learning">
                        <h4>{{ $t('astrology.analysisLabels.learning') }}：</h4>
                        <p>{{ analysis.learning }}</p>
                      </div>
                    </template>

                    <!-- 通用内容显示 -->
                    <template v-else>
                      <p v-if="analysis.description">{{ analysis.description }}</p>
                      <div v-if="analysis.content" v-html="analysis.content"></div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 生辰八字部分 -->
          <div class="chart-section" v-if="calculationResults && calculationResults.eightCharacters">
            <div class="section-header" @click="toggleBaziSection">
              <h3 class="section-header-title">
                <span class="section-icon">🔮</span>
                {{ $t('astrology.myChart.baziSection') }}
              </h3>
              <button class="collapse-btn" :class="{ 'collapsed': !baziExpanded }">
                <span>{{ baziExpanded ? '▼' : '▶' }}</span>
              </button>
            </div>
            
            <div class="section-content" v-show="baziExpanded">
              <!-- 生辰八字显示组件将在这里插入 -->
              <BaziDisplay 
                :calculationResults="calculationResults"
              />
            </div>
          </div>

          <!-- 推荐功能卡片 -->
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
              
              <div class="recommendation-card recommendation-card--ai-expert" @click="showAiExpertTab">
                <div class="card-icon">
                  <img src="/images/meimei.png" alt="冥冥" class="card-icon-image card-icon-image--large" />
                </div>
                <div class="card-content">
                  <h5>{{ $t('astrology.actions.aiExpert') }}</h5>
                  <p>{{ $t('astrology.recommendations.aiExpertDescription') }}</p>
                  <div class="card-badge">{{ $t('astrology.recommendations.new') }}</div>
                </div>
                <div class="card-arrow">→</div>
              </div>
            </div>
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

      <!-- AI专家内容 -->
      <section 
        class="section function-tab-content" 
        v-show="activeFunctionTab === 'ai-expert'"
        :class="{ 
          'content-transitioning': isTransitioning,
          'content-direction-forward': tabSwitchDirection === 'forward',
          'content-direction-backward': tabSwitchDirection === 'backward'
        }"
      >
        <div class="ai-expert-content">
          <AiChatInterface 
            v-if="isDataReady"
            ref="aiChatInterface"
          />
          
          <!-- 数据未准备好的提示 -->
          <div v-else class="ai-expert-loading">
            <div class="loading-icon">🤖</div>
            <h3>{{ $t('aiChat.loading.title') }}</h3>
            <p>{{ $t('aiChat.loading.description') }}</p>
            <button @click="initializeUserData" class="btn btn--primary">
              {{ $t('aiChat.loading.refresh') }}
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
                v-for="(_, index) in userGuideSteps" 
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

    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import ShareButton from '../components/ShareButton.vue'
import AiChatInterface from '../components/AiChat/AiChatInterface.vue'
import BaziDisplay from '../components/BaziDisplay.vue'
import i18nMixin from '../mixins/i18n.js'
import ChartViewSelector from '../components/StarChart/ChartViewSelector.vue'
import {
  getPlanetKeywords,
  formatBirthInfo
} from '../services/astrologyDataService.js'
import {
  generateDetailedAstrologyAnalysis
} from '../services/astrologyAnalysisService.js'

export default {
  name: 'AstrologyResultsPage',
  mixins: [i18nMixin],
  
  components: {
    LanguageSwitcher,
    ShareButton,
    AiChatInterface,
    BaziDisplay,
    ChartViewSelector
  },
  
  data() {
    return {
      activeFunctionTab: 'my-chart', // 当前激活的功能标签
      isTransitioning: false, // 控制切换动画状态
      lastActiveTab: 'my-chart', // 记录上一个激活的标签
      tabSwitchDirection: 'forward', // 切换方向：'forward' 或 'backward'
      showUserGuide: false, // 控制用户引导显示
      guideStep: 0, // 当前引导步骤
      isFirstVisit: false, // 是否首次访问
      showTooltip: null, // 当前显示的提示
      interactionCount: 0, // 用户交互计数
      selectedPlanet: null,
      astrologyExpanded: true, // 占星分析部分是否展开
      baziExpanded: false, // 生辰八字部分是否展开
      functionNavs: [
        { 
          id: 'my-chart', 
          nameKey: 'myChart', 
          icon: '📊', 
          completed: true, // 我的命盘默认完成
          badge: null 
        },
        { 
          id: 'ai-expert', 
          nameKey: 'aiExpert', 
          icon: '/images/meimei2.png', 
          isImage: true,
          completed: false,
          badge: null 
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
    ...mapGetters(['getUserData', 'getCalculationResults', 'getSettings']),
    
    userData() {
      return this.getUserData
    },
    
    calculationResults() {
      return this.getCalculationResults
    },
    
    // AI聊天数据就绪检查
    isDataReady() {
      return this.userData && 
             this.calculationResults && 
             this.userData.birthdate && 
             this.userData.birthHour !== null && 
             this.userData.birthMinute !== null &&
             this.calculationResults.eightCharacters &&
             this.calculationResults.astrologyPositions
    },
    
    formattedBirthInfo() {
      return formatBirthInfo(this.userData)
    },
    
    isMobile() {
      return window.innerWidth <= 768
    },

    // 动态生成的详细分析内容
    dynamicAnalysisCards() {
      if (!this.calculationResults?.astrologyPositions) {
        return [];
      }
      
      return generateDetailedAstrologyAnalysis(
        this.calculationResults.astrologyPositions,
        this.currentLanguage
      );
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
      const tabOrder = ['my-chart', 'ai-expert']
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
      
      const tabOrder = ['my-chart', 'ai-expert']
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
          this.switchFunctionTab('my-chart')
          break
        case '2':
          event.preventDefault()
          this.switchFunctionTab('ai-expert')
          break
      }
    },

    // 初始化功能导航状态
    initializeFunctionNavigation() {
      // 标记我的命盘为已访问
      const myChartNav = this.functionNavs.find(nav => nav.id === 'my-chart')
      if (myChartNav) {
        myChartNav.visited = true
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
      // 返回基本的星座位置信息，不再使用详细描述
      return `${this.getPlanetDisplayName(planetType)} 位于 ${sign}`
    },
    
    getPlanetKeywords(planetType) {
      return getPlanetKeywords(planetType, this.currentLanguage)
    },
    
    
    // 导航方法
    goToTransitAnalysis() {
      this.$router.push({ name: 'transit-analysis' })
    },
    
    // 显示AI专家标签页
    showAiExpertTab() {
      this.switchFunctionTab('ai-expert')
    },
    
    // 折叠功能方法
    toggleAstrologySection() {
      this.astrologyExpanded = !this.astrologyExpanded
      // 保存用户偏好到localStorage
      localStorage.setItem('astrologyExpanded', this.astrologyExpanded)
    },
    
    toggleBaziSection() {
      this.baziExpanded = !this.baziExpanded
      // 保存用户偏好到localStorage
      localStorage.setItem('baziExpanded', this.baziExpanded)
    },
    
    // 初始化用户数据
    async initializeUserData() {
      try {
        if (!this.userData || !this.calculationResults) {
          // 尝试重新加载数据
          await this.$store.dispatch('initializeApp')
        }
      } catch (error) {
        console.error('Failed to initialize user data:', error)
      }
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
          // 添加新的占星分析数据结构
          astrology: {
            sun: {
              sign: this.calculationResults?.astrologyPositions?.sun?.sign
            },
            moon: {
              sign: this.calculationResults?.astrologyPositions?.moon?.sign
            },
            ascendant: {
              sign: this.calculationResults?.astrologyPositions?.ascendant?.sign
            },
            // 性格关键词
            planetKeywords: this.calculationResults?.planetKeywords || {},
            // 运势概览
            fortune: {
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
      if (['my-chart', 'ai-expert'].includes(targetTab)) {
        this.activeFunctionTab = targetTab
        // 清除查询参数以保持URL整洁
        this.$router.replace({ query: {} })
      }
    }
    
    // 添加键盘导航支持
    window.addEventListener('keydown', this.handleKeyNavigation)
    
    // 初始化功能导航状态
    this.initializeFunctionNavigation()
    
    // 恢复折叠状态偏好
    const savedAstrologyExpanded = localStorage.getItem('astrologyExpanded')
    if (savedAstrologyExpanded !== null) {
      this.astrologyExpanded = savedAstrologyExpanded === 'true'
    }
    
    const savedBaziExpanded = localStorage.getItem('baziExpanded')
    if (savedBaziExpanded !== null) {
      this.baziExpanded = savedBaziExpanded === 'true'
    }
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyNavigation)
  }
}
</script>

<style scoped>
/* 导入通用样式和专用样式文件 */
@import '@/assets/styles/common.css';
@import '@/assets/styles/astrology-function-nav.css';
@import '@/assets/styles/astrology-analysis-cards.css';
@import '@/assets/styles/astrology-planet-sidebar.css';
@import '@/assets/styles/astrology-ui-components.css';
@import '@/assets/styles/astrology-collapsible-sections.css';

/* =============================================================================
   页面特定样式覆盖（如有需要）
   ============================================================================= */

/* 操作按钮容器 - 确保在scoped样式中正确应用 */
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 30px 0;
  padding: 20px;
  flex-wrap: wrap;
}

/* 分享容器和按钮 */
.actions .share-container {
  display: flex;
  align-items: center;
  position: relative;
}

.actions .btn {
  margin: 0; /* 确保没有额外margin覆盖gap */
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    gap: 12px;
    margin: 20px 0;
    padding: 16px;
  }

  .actions .btn,
  .actions .share-container {
    width: 100%;
    max-width: 280px;
  }
}
</style>
