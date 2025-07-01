<template>
  <div class="transit-analysis-container">
    <header class="header">
      <h1 class="title">個人行運盤深度分析</h1>
      <p class="subtitle">基於您的出生資料進行專業的行運分析</p>
    </header>

    <div class="analysis-content">
      <!-- 日期选择区域 -->
      <section class="date-selection-section" v-if="!transitReport">
        <div class="selection-card">
          <h2 class="section-title">選擇分析日期</h2>
          
          <div class="date-options">
            <div class="quick-options">
              <h3>快速選擇</h3>
              <div class="quick-buttons">
                <button @click="selectToday" class="quick-btn current">今天</button>
                <button @click="selectBirthday" class="quick-btn">生日</button>
                <button @click="selectNewYear" class="quick-btn">新年</button>
              </div>
            </div>
            
            <div class="custom-date">
              <h3>自定義日期</h3>
              <div class="date-inputs">
                <div class="input-group">
                  <label>分析日期</label>
                  <input 
                    type="date" 
                    v-model="selectedDate" 
                    :min="minDate"
                    :max="maxDate"
                  />
                </div>
                <div class="input-group">
                  <label>分析時間</label>
                  <input 
                    type="time" 
                    v-model="selectedTime"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="analysis-preview" v-if="selectedDate">
            <h3>分析預覽</h3>
            <div class="preview-info">
              <p><strong>分析日期:</strong> {{ formatSelectedDate }}</p>
              <p><strong>當時年齡:</strong> {{ calculatedAge }}歲</p>
              <p><strong>距離生日:</strong> {{ daysToBirthday }}天</p>
            </div>
          </div>

          <div class="action-buttons">
            <button @click="startAnalysis" :disabled="!selectedDate || isAnalyzing" class="analyze-btn">
              {{ isAnalyzing ? '分析中...' : '開始分析' }}
            </button>
            <button @click="goBack" class="back-btn">返回</button>
          </div>
        </div>
      </section>

      <!-- 分析结果区域 -->
      <section class="analysis-results" v-if="transitReport && !isAnalyzing">
        <div class="report-header">
          <div class="user-info">
            <h2>{{ userData.name }}的行運分析</h2>
            <div class="basic-info">
              <span>分析日期: {{ formatAnalysisDate }}</span>
              <span>年齡: {{ transitReport.header.age }}歲</span>
              <span>出生地: {{ transitReport.header.birthPlace }}</span>
            </div>
          </div>
          <div class="analysis-meta">
            <span class="intensity-badge" :class="intensityClass">
              {{ transitReport.overview.intensity }}
            </span>
          </div>
        </div>

        <!-- 概览 -->
        <div class="overview-section">
          <h3 class="section-title">總體概覽</h3>
          <div class="overview-card">
            <div class="summary">
              <p class="main-summary">{{ transitReport.overview.summary }}</p>
              <p class="phase-description">{{ transitReport.overview.phaseDescription }}</p>
            </div>
            <div class="key-themes">
              <h4>當前主要主題</h4>
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
        <div class="life-cycles-section" v-if="transitReport.majorCycles.length > 0">
          <h3 class="section-title">重要生命週期</h3>
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
              <div class="cycle-themes">
                <span 
                  v-for="theme in cycle.themes" 
                  :key="theme"
                  class="cycle-theme"
                >
                  {{ theme }}
                </span>
              </div>
              <div class="cycle-advice">
                <strong>建議:</strong> {{ cycle.advice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 外行星影响 -->
        <div class="outer-planets-section" v-if="transitReport.outerPlanets.planets.length > 0">
          <h3 class="section-title">外行星深度影響</h3>
          <div class="overall-theme">
            <h4>總體主題: {{ transitReport.outerPlanets.overallTheme }}</h4>
            <p>{{ transitReport.outerPlanets.summary.description }}</p>
          </div>
          
          <div class="planets-grid">
            <div 
              v-for="planet in transitReport.outerPlanets.planets" 
              :key="planet.planet"
              class="planet-card"
            >
              <div class="planet-header">
                <h4>{{ planet.planet }}的影響</h4>
                <span class="planet-theme">{{ planet.theme }}</span>
              </div>
              <p class="planet-description">{{ planet.description }}</p>
              
              <div class="planet-aspects" v-if="planet.aspects.length > 0">
                <h5>相關相位</h5>
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
                <strong>指導建議:</strong> {{ planet.advice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 主要相位 -->
        <div class="major-aspects-section">
          <h3 class="section-title">重要行運相位</h3>
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
                  <span class="orb-info">容許度: {{ aspect.orb }}°</span>
                  <span class="direction-info">{{ aspect.direction }}</span>
                  <span class="timeframe-info">{{ aspect.timeframe }}</span>
                </div>
              </div>
              
              <p class="aspect-description">{{ aspect.description }}</p>
              
              <div class="aspect-keywords">
                <span 
                  v-for="keyword in aspect.keywords" 
                  :key="keyword"
                  class="keyword-tag"
                >
                  {{ keyword }}
                </span>
              </div>
              
              <div class="aspect-advice">
                <strong>建議:</strong> {{ aspect.advice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 人生指导 -->
        <div class="life-guidance-section">
          <h3 class="section-title">人生指導與建議</h3>
          <div class="guidance-grid">
            <div class="guidance-card">
              <h4>當前重點</h4>
              <p>{{ transitReport.lifeGuidance.primaryFocus }}</p>
            </div>
            <div class="guidance-card challenge">
              <h4>主要挑戰</h4>
              <p>{{ transitReport.lifeGuidance.currentChallenge }}</p>
            </div>
            <div class="guidance-card opportunity">
              <h4>重要機遇</h4>
              <p>{{ transitReport.lifeGuidance.currentOpportunity }}</p>
            </div>
          </div>
          
          <div class="advice-sections">
            <div class="advice-card">
              <h4>情感建議</h4>
              <p>{{ transitReport.lifeGuidance.emotionalAdvice }}</p>
            </div>
            <div class="advice-card">
              <h4>實際建議</h4>
              <p>{{ transitReport.lifeGuidance.practicalAdvice }}</p>
            </div>
            <div class="advice-card">
              <h4>精神建議</h4>
              <p>{{ transitReport.lifeGuidance.spiritualAdvice }}</p>
            </div>
          </div>
        </div>

        <!-- 详细建议 -->
        <div class="recommendations-section">
          <h3 class="section-title">分領域詳細建議</h3>
          <div class="recommendations-tabs">
            <button 
              v-for="(tab, key) in recommendationTabs" 
              :key="key"
              @click="activeTab = key"
              :class="{ active: activeTab === key }"
              class="tab-button"
            >
              {{ tab.name }}
            </button>
          </div>
          
          <div class="tab-content">
            <div v-if="activeTab === 'career'" class="recommendation-content">
              <h4>{{ transitReport.recommendations.career.focus }}</h4>
              <p>{{ transitReport.recommendations.career.advice }}</p>
              <p><strong>時間框架:</strong> {{ transitReport.recommendations.career.timing }}</p>
            </div>
            
            <div v-if="activeTab === 'relationships'" class="recommendation-content">
              <h4>{{ transitReport.recommendations.relationships.focus }}</h4>
              <p>{{ transitReport.recommendations.relationships.advice }}</p>
              <div class="focus-areas">
                <strong>關注領域:</strong>
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
              <div class="health-aspects">
                <div class="health-item">
                  <strong>身體健康:</strong> {{ transitReport.recommendations.health.physical }}
                </div>
                <div class="health-item">
                  <strong>心理健康:</strong> {{ transitReport.recommendations.health.mental }}
                </div>
                <div class="health-item">
                  <strong>情感健康:</strong> {{ transitReport.recommendations.health.emotional }}
                </div>
              </div>
            </div>
            
            <div v-if="activeTab === 'personal'" class="recommendation-content">
              <h4>個人成長重點</h4>
              <div class="priorities">
                <strong>優先發展:</strong>
                <span 
                  v-for="priority in transitReport.recommendations.personal.priorities" 
                  :key="priority"
                  class="priority-tag"
                >
                  {{ priority }}
                </span>
              </div>
              <div class="methods">
                <strong>建議方法:</strong>
                <ul>
                  <li v-for="method in transitReport.recommendations.personal.methods" :key="method">
                    {{ method }}
                  </li>
                </ul>
              </div>
            </div>
            
            <div v-if="activeTab === 'financial'" class="recommendation-content">
              <h4>{{ transitReport.recommendations.financial.priority }}</h4>
              <p><strong>方針:</strong> {{ transitReport.recommendations.financial.approach }}</p>
              <p>{{ transitReport.recommendations.financial.advice }}</p>
            </div>
            
            <div v-if="activeTab === 'timing'" class="recommendation-content">
              <div class="timing-info">
                <div class="timing-item positive">
                  <strong>最佳時機:</strong> {{ transitReport.recommendations.timing.bestTiming }}
                </div>
                <div class="timing-item caution">
                  <strong>謹慎時期:</strong> {{ transitReport.recommendations.timing.avoidTiming }}
                </div>
                <div class="timing-item neutral">
                  <strong>關鍵日期:</strong> {{ transitReport.recommendations.timing.keyDates }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 未来展望 -->
        <div class="future-outlook-section">
          <h3 class="section-title">未來展望</h3>
          <div class="outlook-timeline">
            <div class="timeline-item">
              <h4>未來3個月</h4>
              <p>{{ transitReport.futureOutlook.next3Months }}</p>
            </div>
            <div class="timeline-item">
              <h4>未來6個月</h4>
              <p>{{ transitReport.futureOutlook.next6Months }}</p>
            </div>
            <div class="timeline-item">
              <h4>明年展望</h4>
              <p>{{ transitReport.futureOutlook.nextYear }}</p>
            </div>
            <div class="timeline-item">
              <h4>長期發展</h4>
              <p>{{ transitReport.futureOutlook.longTerm }}</p>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-section">
          <button @click="generateNewAnalysis" class="secondary-btn">重新分析</button>
          <button @click="shareReport" class="primary-btn">分享報告</button>
          <button @click="goBack" class="secondary-btn">返回首頁</button>
        </div>
      </section>

      <!-- 加载状态 -->
      <div class="loading-section" v-if="isAnalyzing">
        <div class="loading-content">
          <div class="spinner"></div>
          <h3>正在分析您的行運盤...</h3>
          <p>請稍候，我們正在計算行星位置和相位關係</p>
          <div class="loading-steps">
            <div class="step" :class="{ active: loadingStep >= 1 }">計算行運行星位置</div>
            <div class="step" :class="{ active: loadingStep >= 2 }">分析相位關係</div>
            <div class="step" :class="{ active: loadingStep >= 3 }">生成詳細報告</div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2025 命盤 - 專業行運盤分析系統</p>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { mapGetters } from 'vuex';
import { calculateTransitChart } from '../utils/transitCalculator.js';
import { generateDetailedTransitReport } from '../utils/transitReportGenerator.js';

export default {
  name: 'TransitAnalysisPage',
  setup() {
    // 响应式数据
    const selectedDate = ref('');
    const selectedTime = ref('12:00');
    const isAnalyzing = ref(false);
    const transitReport = ref(null);
    const loadingStep = ref(0);
    const activeTab = ref('career');

    // 建议标签配置
    const recommendationTabs = {
      career: { name: '事業發展' },
      relationships: { name: '人際關係' },
      health: { name: '健康管理' },
      personal: { name: '個人成長' },
      financial: { name: '財務規劃' },
      timing: { name: '時機把握' }
    };

    // 计算属性
    const today = new Date().toISOString().split('T')[0];
    const minDate = computed(() => {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return oneYearAgo.toISOString().split('T')[0];
    });
    
    const maxDate = computed(() => {
      const oneYearLater = new Date();
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      return oneYearLater.toISOString().split('T')[0];
    });

    const formatSelectedDate = computed(() => {
      if (!selectedDate.value) return '';
      const date = new Date(selectedDate.value);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    });

    const formatAnalysisDate = computed(() => {
      if (!transitReport.value) return '';
      return transitReport.value.header.analysisDate;
    });

    const intensityClass = computed(() => {
      if (!transitReport.value) return '';
      const intensity = transitReport.value.overview.intensity;
      return {
        'intensity-high': intensity === '高强度',
        'intensity-medium': intensity === '中等强度',
        'intensity-low': intensity === '温和强度'
      };
    });

    // 初始化
    onMounted(() => {
      selectedDate.value = today;
    });

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
    };
  },
  computed: {
    ...mapGetters({
      userData: 'getUserData'
    }),
    calculatedAge() {
      if (!this.selectedDate || !this.userData) return 0;
      const birthDate = new Date(this.userData.fullBirthDateTime);
      const selectedDateTime = new Date(this.selectedDate);
      const ageInMs = selectedDateTime - birthDate;
      return Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25));
    },
    daysToBirthday() {
      if (!this.selectedDate || !this.userData) return 0;
      const birth = new Date(this.userData.fullBirthDateTime);
      const selected = new Date(this.selectedDate);
      const thisYearBirthday = new Date(selected.getFullYear(), birth.getMonth(), birth.getDate());
      
      if (thisYearBirthday < selected) {
        thisYearBirthday.setFullYear(selected.getFullYear() + 1);
      }
      
      const diffTime = thisYearBirthday - selected;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  },
  methods: {
    selectToday() {
      this.selectedDate = this.today;
      this.selectedTime = '12:00';
    },
    
    selectBirthday() {
      if (!this.userData) return;
      const birth = new Date(this.userData.fullBirthDateTime);
      const currentYear = new Date().getFullYear();
      const birthday = new Date(currentYear, birth.getMonth(), birth.getDate());
      
      // 如果今年生日已过，选择明年生日
      if (birthday < new Date()) {
        birthday.setFullYear(currentYear + 1);
      }
      
      this.selectedDate = birthday.toISOString().split('T')[0];
      this.selectedTime = birth.toTimeString().substring(0, 5);
    },
    
    selectNewYear() {
      const nextYear = new Date().getFullYear() + 1;
      this.selectedDate = `${nextYear}-01-01`;
      this.selectedTime = '00:00';
    },

    async startAnalysis() {
      if (!this.userData || !this.selectedDate) return;
      
      this.isAnalyzing = true;
      this.loadingStep = 0;
      
      try {
        // 模拟加载步骤
        this.loadingStep = 1;
        await this.delay(1000);
        
        // 构建分析时间
        const analysisDateTime = `${this.selectedDate}T${this.selectedTime}:00`;
        
        this.loadingStep = 2;
        await this.delay(1000);
        
        // 计算行运盘数据
        const transitData = calculateTransitChart(this.userData, analysisDateTime);
        
        this.loadingStep = 3;
        await this.delay(1000);
        
        // 生成详细报告
        const detailedReport = generateDetailedTransitReport(transitData, this.userData);
        
        this.transitReport = detailedReport;
        
      } catch (error) {
        console.error('行运分析失败:', error);
        alert('分析过程中出现错误，请稍后重试');
      } finally {
        this.isAnalyzing = false;
        this.loadingStep = 0;
      }
    },

    intensityAspectClass(intensity) {
      return {
        'aspect-strong': intensity === 'strong',
        'aspect-moderate': intensity === 'moderate',
        'aspect-weak': !intensity || intensity === 'weak'
      };
    },

    generateNewAnalysis() {
      this.transitReport = null;
    },

    shareReport() {
      if (navigator.share) {
        navigator.share({
          title: '我的行运盘分析报告',
          text: `${this.userData.name}的个人行运盘深度分析`,
          url: window.location.href
        }).catch(console.error);
      } else {
        // 降级方案
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('链接已复制到剪贴板'))
          .catch(() => alert('请手动复制当前页面链接进行分享'));
      }
    },

    goBack() {
      this.$router.push({ name: 'home' });
    },

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  
  created() {
    // 检查用户数据
    if (!this.userData) {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.transit-analysis-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
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

.quick-options h3,
.custom-date h3 {
  color: #2c3e50;
  margin-bottom: 15px;
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
}

.quick-btn:hover,
.quick-btn.current {
  background: #3498db;
  color: white;
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
}

.analysis-preview {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.preview-info p {
  margin: 8px 0;
  color: #2c3e50;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.analyze-btn {
  background: #d35400;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.analyze-btn:hover:not(:disabled) {
  background: #e67e22;
}

.analyze-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.back-btn {
  background: #7f8c8d;
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #95a5a6;
}

/* 加载状态 */
.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
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

.user-info h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.basic-info {
  display: flex;
  gap: 20px;
  color: #7f8c8d;
  font-size: 0.9rem;
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
}

.phase-description {
  margin-bottom: 20px;
  opacity: 0.9;
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
}

/* 生命周期区域 */
.cycles-grid {
  display: grid;
  gap: 20px;
}

.cycle-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #3498db;
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
  background: #3498db;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: #7f8c8d;
  white-space: nowrap;
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
}

.planets-grid {
  display: grid;
  gap: 20px;
}

.planet-card {
  border: 2px solid #ecf0f1;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.planet-card:hover {
  border-color: #d35400;
  box-shadow: 0 4px 15px rgba(211, 84, 0, 0.1);
}

.planet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.planet-header h4 {
  color: #2c3e50;
}

.planet-theme {
  background: #d35400;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
}

.planet-aspects {
  margin: 15px 0;
}

.planet-aspects h5 {
  color: #34495e;
  margin-bottom: 10px;
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
}

.aspect-orb {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.planet-advice {
  background: #fff3cd;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #ffc107;
  margin-top: 15px;
}

/* 主要相位区域 */
.aspect-card {
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #95a5a6;
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
}

.aspect-meta {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #7f8c8d;
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
}

.advice-card h4 {
  color: #495057;
  margin-bottom: 10px;
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

.focus-areas,
.priorities {
  margin: 15px 0;
}

.area-tag,
.priority-tag {
  background: #d35400;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-right: 8px
}
</style>