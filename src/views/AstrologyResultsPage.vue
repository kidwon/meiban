<template>
  <div class="app-container app-container--lg">
    <header class="page-header">
      <h1 class="page-title">占星分析結果</h1>
      <p class="user-name">{{ userData ? userData.name : 'ゲスト' }}様の星盤</p>
    </header>

    <div class="content-wrapper" v-if="calculationResults">
      <!-- 出生信息摘要 -->
      <div class="birth-data-summary">
        <p>{{ formattedBirthInfo }}</p>
      </div>

      <!-- 交互式星盘图 -->
      <section class="section">
        <h2 class="section-title">互動星盤圖</h2>
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
              <h4>關鍵詞</h4>
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
        <h2 class="section-title">詳細占星分析</h2>
        <div class="tabs">
          <div class="tab-list">
            <button 
              v-for="tab in analysisTabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="{ active: activeTab === tab.id }"
              class="tab-button"
            >
              {{ tab.name }}
            </button>
          </div>
          
          <div class="tab-content">
            <div v-show="activeTab === 'personality'" class="tab-panel">
              <h3>性格特質分析</h3>
              <div class="personality-analysis">
                <div class="trait-section">
                  <h4>核心性格 (太陽星座)</h4>
                  <p>{{ getSunDescription() }}</p>
                </div>
                <div class="trait-section">
                  <h4>情感需求 (月亮星座)</h4>
                  <p>{{ getMoonDescription() }}</p>
                </div>
                <div class="trait-section">
                  <h4>外在印象 (上升星座)</h4>
                  <p>{{ getAscendantDescription() }}</p>
                </div>
              </div>
            </div>

            <div v-show="activeTab === 'career'" class="tab-panel">
              <h3>事業發展傾向</h3>
              <div class="career-analysis">
                <div class="career-section">
                  <h4>事業優勢</h4>
                  <p>{{ getCareerStrengths() }}</p>
                </div>
                <div class="career-section">
                  <h4>適合職業方向</h4>
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
              <h3>人際關係分析</h3>
              <div class="relationships-analysis">
                <div class="relationship-section">
                  <h4>愛情表現</h4>
                  <p>{{ getLoveDescription() }}</p>
                </div>
                <div class="relationship-section">
                  <h4>友誼特質</h4>
                  <p>{{ getFriendshipDescription() }}</p>
                </div>
                <div class="relationship-section">
                  <h4>相容星座</h4>
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
              <h3>運勢傾向分析</h3>
              <div class="fortune-analysis">
                <div class="fortune-overview">
                  <div class="fortune-badge">{{ calculationResults.fortune.overview }}</div>
                </div>
                <p>{{ getOverallFortuneDescription() }}</p>
                <div class="fortune-grid">
                  <div class="fortune-item">
                    <div class="fortune-label">事業運</div>
                    <div class="fortune-stars">{{ calculationResults.fortune.career }}</div>
                  </div>
                  <div class="fortune-item">
                    <div class="fortune-label">財運</div>
                    <div class="fortune-stars">{{ calculationResults.fortune.wealth }}</div>
                  </div>
                  <div class="fortune-item">
                    <div class="fortune-label">愛情運</div>
                    <div class="fortune-stars">{{ calculationResults.fortune.love }}</div>
                  </div>
                  <div class="fortune-item">
                    <div class="fortune-label">健康運</div>
                    <div class="fortune-stars">{{ calculationResults.fortune.health }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级功能入口 -->
      <section class="section">
        <h2 class="section-title">詳細分析</h2>
        <div class="advanced-features-grid">
          <button 
            type="button"
            @click="goToTransitAnalysis"
            class="advanced-feature-btn advanced-feature-btn--transit"
          >
            <div class="btn-icon">🌟</div>
            <div class="btn-content">
              <h3>行運盤分析</h3>
              <p>分析當前行星位置對您的影響</p>
              <div class="feature-details">
                <span>• 外行星影響分析</span>
                <span>• 重要相位解讀</span>
                <span>• 未來運勢預測</span>
              </div>
            </div>
          </button>
          
          <button 
            type="button"
            @click="openCompatibilityTool"
            class="advanced-feature-btn advanced-feature-btn--compatibility"
          >
            <div class="btn-icon">💕</div>
            <div class="btn-content">
              <h3>合盤分析</h3>
              <p>分析與他人的星盤相容性</p>
              <div class="feature-details">
                <span>• 愛情合盤</span>
                <span>• 友誼相性</span>
                <span>• 事業夥伴</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      <div class="actions">
        <button @click="shareResults" class="btn btn--primary">結果をシェア</button>
        <button @click="saveResults" class="btn btn--success">結果を保存</button>
        <button @click="goBack" class="btn btn--ghost">トップに戻る</button>
      </div>
    </div>

    <div class="loading" v-else>
      <p>星盤を計算中...</p>
    </div>

    <footer class="footer">
      <p>© 2025 命盤 - 占星分析・星盤圖</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StarChart from '../components/StarChart/StarChart.vue';
import {
  getSignDescription,
  getCareerStrengths,
  getSuggestedCareers,
  getLoveDescription,
  getFriendshipDescription,
  getCompatibleSigns,
  getFortuneDescription,
  getPlanetKeywords,
  formatBirthInfo,
  analysisTabs
} from '../services/astrologyDataService.js';

export default {
  name: 'AstrologyResultsPage',
  components: {
    StarChart
  },
  data() {
    return {
      activeTab: 'personality',
      chartSize: 500,
      selectedPlanet: null,
      analysisTabs
    };
  },
  
  computed: {
    ...mapGetters(['getUserData', 'getCalculationResults']),
    
    userData() {
      return this.getUserData;
    },
    
    calculationResults() {
      return this.getCalculationResults;
    },
    
    formattedBirthInfo() {
      return formatBirthInfo(this.userData);
    }
  },
  
  methods: {
    // 行星交互处理
    handlePlanetClick(planetType) {
      this.selectedPlanet = planetType;
    },
    
    handlePlanetHover() {
      // 可以添加悬停效果
    },
    
    closePlanetDetails() {
      this.selectedPlanet = null;
    },
    
    getPlanetDisplayName(planetType) {
      const nameMap = {
        sun: '太陽',
        moon: '月亮',
        ascendant: '上升星座'
      };
      return nameMap[planetType] || '';
    },
    
    getPlanetSign(planetType) {
      if (!this.calculationResults || !planetType) return '';
      return this.calculationResults.astrologyPositions[planetType]?.sign || '';
    },
    
    getPlanetDegree(planetType) {
      if (!this.calculationResults || !planetType) return '';
      const position = this.calculationResults.astrologyPositions[planetType];
      if (!position) return '';
      return `${position.degree}°${position.minute}'`;
    },
    
    getPlanetDescription(planetType) {
      if (!planetType) return '';
      const sign = this.getPlanetSign(planetType);
      return getSignDescription(planetType, sign);
    },
    
    getPlanetKeywords(planetType) {
      return getPlanetKeywords(planetType);
    },
    
    // 使用数据服务的方法
    getSunDescription() {
      if (!this.calculationResults) return '';
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      return getSignDescription('sun', sunSign);
    },
    
    getMoonDescription() {
      if (!this.calculationResults) return '';
      const moonSign = this.calculationResults.astrologyPositions.moon.sign;
      return getSignDescription('moon', moonSign);
    },
    
    getAscendantDescription() {
      if (!this.calculationResults) return '';
      const ascSign = this.calculationResults.astrologyPositions.ascendant.sign;
      return getSignDescription('ascendant', ascSign);
    },
    
    getCareerStrengths() {
      if (!this.calculationResults) return '';
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      return getCareerStrengths(sunSign);
    },
    
    getSuggestedCareers() {
      if (!this.calculationResults) return [];
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      return getSuggestedCareers(sunSign);
    },
    
    getLoveDescription() {
      if (!this.calculationResults) return '';
      const moonSign = this.calculationResults.astrologyPositions.moon.sign;
      return getLoveDescription(moonSign);
    },
    
    getFriendshipDescription() {
      if (!this.calculationResults) return '';
      const ascSign = this.calculationResults.astrologyPositions.ascendant.sign;
      return getFriendshipDescription(ascSign);
    },
    
    getCompatibleSigns() {
      if (!this.calculationResults) return [];
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      return getCompatibleSigns(sunSign);
    },
    
    getOverallFortuneDescription() {
      if (!this.calculationResults) return '';
      const overview = this.calculationResults.fortune.overview;
      return getFortuneDescription(overview);
    },
    
    async goToTransitAnalysis() {
      if (!this.calculationResults) {
        alert('請先完成占星分析');
        return;
      }
      
      try {
        await this.$router.push({ name: 'transit-analysis' });
      } catch (error) {
        console.error('頁面跳轉失敗:', error);
        alert('頁面跳轉失敗，請稍後重試');
      }
    },
    
    openCompatibilityTool() {
      alert('合盤分析功能即將推出，敬請期待！');
    },
    
    shareResults() {
      if (navigator.share) {
        navigator.share({
          title: '占星分析結果',
          text: `${this.userData.name}的占星分析結果`,
          url: window.location.href
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('URLをクリップボードにコピーしました'))
          .catch(() => alert('手動でURLをコピーしてください'));
      }
    },
    
    saveResults() {
      const data = {
        userData: this.userData,
        results: this.calculationResults,
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `astrology-results-${this.userData.name}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    
    goBack() {
      this.$router.push({ name: 'home' });
    },
    
    updateChartSize() {
      const container = this.$el?.querySelector('.chart-container');
      if (container) {
        const containerWidth = container.clientWidth;
        this.chartSize = Math.min(containerWidth - 40, 600);
      }
    }
  },
  
  created() {
    if (!this.userData || !this.calculationResults) {
      this.$router.push({ name: 'home' });
    }
  },
  
  mounted() {
    this.updateChartSize();
    window.addEventListener('resize', this.updateChartSize);
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.updateChartSize);
  }
};
</script>

<style scoped>
/* 导入通用样式，大部分样式使用common.css中的类 */
@import '@/assets/styles/common.css';

/* 只添加此页面特有的样式 */
.birth-data-summary {
  text-align: center;
  margin-bottom: var(--spacing-8);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* 星盘图容器 */
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-5);
  position: relative;
}

/* 行星详情侧边栏 */
.planet-details-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 380px;
  height: 100vh;
  background: var(--color-bg-primary);
  box-shadow: var(--shadow-2xl);
  transition: right 0.3s ease;
  z-index: var(--z-index-modal);
  overflow-y: auto;
}

.planet-details-sidebar.open {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-5);
  border-bottom: 1px solid var(--color-border-light);
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.sidebar-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
}

.close-btn {
  background: none !important;
  border: none !important;
  color: var(--color-text-inverse) !important;
  font-size: var(--font-size-2xl);
  cursor: pointer;
  padding: var(--spacing-1) !important;
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
  padding: var(--spacing-5);
}

.planet-position {
  text-align: center;
  margin-bottom: var(--spacing-5);
}

.position-info .position-sign {
  display: block;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
  font-family: var(--font-family-serif);
}

.position-info .position-degree {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.planet-description {
  margin-bottom: var(--spacing-5);
}

.planet-description p {
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

.planet-keywords h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-base);
}

/* 分析内容样式 */
.trait-section,
.career-section,
.relationship-section {
  margin-bottom: var(--spacing-6);
}

.trait-section h4,
.career-section h4,
.relationship-section h4 {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-3);
  margin-top: var(--spacing-6);
  font-size: var(--font-size-lg);
}

.trait-section h4:first-child,
.career-section h4:first-child,
.relationship-section h4:first-child {
  margin-top: 0;
}

/* 高级功能按钮样式 */
.advanced-features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-5);
  margin-bottom: var(--spacing-5);
}

.advanced-feature-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-5);
  padding: var(--spacing-7);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  width: 100%;
  font-family: inherit;
  position: relative;
  overflow: hidden;
  background: var(--color-bg-primary);
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
  font-size: 3.5rem;
  min-width: 70px;
  text-align: center;
  flex-shrink: 0;
}

.advanced-feature-btn .btn-content {
  flex: 1;
}

.advanced-feature-btn .btn-content h3 {
  margin: 0 0 var(--spacing-2) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  font-family: var(--font-family-serif);
}

.advanced-feature-btn .btn-content p {
  margin: 0 0 var(--spacing-3) 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.advanced-feature-btn .feature-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.advanced-feature-btn .feature-details span {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  opacity: 0.8;
}

/* 操作按钮区域 */
.actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  margin: var(--spacing-8) 0;
  flex-wrap: wrap;
}

.actions .btn {
  min-width: 120px;
}

.footer {
  text-align: center;
  margin-top: var(--spacing-8);
  padding: var(--spacing-5);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.loading {
  text-align: center;
  padding: var(--spacing-12);
  color: var(--color-text-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .planet-details-sidebar {
    width: 100%;
    right: -100%;
  }
  
  .chart-container {
    min-height: 400px;
    padding: var(--spacing-4);
  }
  
  .advanced-features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  
  .advanced-feature-btn {
    padding: var(--spacing-5);
    gap: var(--spacing-4);
  }
  
  .advanced-feature-btn .btn-icon {
    font-size: 3rem;
    min-width: 60px;
  }
  
  .advanced-feature-btn .btn-content h3 {
    font-size: var(--font-size-lg);
  }
  
  .advanced-feature-btn .btn-content p {
    font-size: var(--font-size-xs);
  }
  
  .advanced-feature-btn .feature-details span {
    font-size: 10px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .actions .btn {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .advanced-feature-btn {
    flex-direction: column;
    text-align: center;
    padding: var(--spacing-4);
    gap: var(--spacing-3);
  }
  
  .advanced-feature-btn .btn-icon {
    font-size: 2.5rem;
    min-width: auto;
  }
  
  .advanced-feature-btn .btn-content h3 {
    font-size: var(--font-size-base);
  }
  
  .advanced-feature-btn .feature-details {
    align-items: center;
  }
}
</style>