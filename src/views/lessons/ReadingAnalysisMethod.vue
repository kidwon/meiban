<template>
  <div class="lesson-container">
    <AppNavigation />
    
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="header">
      <nav class="breadcrumb">
        <router-link to="/learn">{{ $t('nav.learn') }}</router-link>
        <span class="separator">›</span>
        <router-link to="/learn/category/reading">{{ $t('learn.categories.reading') }}</router-link>
        <span class="separator">›</span>
        <span class="current">{{ $t('lesson.lessonContent.readingAnalysisMethod.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.readingAnalysisMethod.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.reading') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.intermediate') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 24 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.readingAnalysisMethod.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.readingAnalysisMethod.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.readingAnalysisMethod.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.readingAnalysisMethod.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.readingAnalysisMethod.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>分析原则与框架</h3>
            
            <div class="principles-framework">
              <div class="principles-grid">
                <div class="principle-card">
                  <div class="principle-icon">🎯</div>
                  <h4>整体性原则</h4>
                  <p>不能孤立地看待单一元素，要从整个命局的角度进行综合分析，任何判断都要基于全局考量。</p>
                  <div class="principle-details">
                    <strong>应用要点：</strong>
                    <ul>
                      <li>先看整体格局，再分析具体细节</li>
                      <li>任何单一因素都要结合全局判断</li>
                      <li>注意各部分的相互影响和制衡</li>
                    </ul>
                  </div>
                </div>

                <div class="principle-card">
                  <div class="principle-icon">⚖️</div>
                  <h4>平衡性原则</h4>
                  <p>寻找命局中的平衡点，分析各种力量的对比关系，判断整体的平衡状态和发展趋势。</p>
                  <div class="principle-details">
                    <strong>应用要点：</strong>
                    <ul>
                      <li>分析五行力量的对比关系</li>
                      <li>找出命局的平衡点和失衡点</li>
                      <li>判断需要增强或削弱的因素</li>
                    </ul>
                  </div>
                </div>

                <div class="principle-card">
                  <div class="principle-icon">🔄</div>
                  <h4>动态性原则</h4>
                  <p>命理不是静态的，要结合时间因素分析动态变化，考虑大运流年对原局的影响。</p>
                  <div class="principle-details">
                    <strong>应用要点：</strong>
                    <ul>
                      <li>结合大运分析人生各阶段</li>
                      <li>考虑流年对当前运势的影响</li>
                      <li>预测未来发展趋势和变化</li>
                    </ul>
                  </div>
                </div>

                <div class="principle-card">
                  <div class="principle-icon">🧭</div>
                  <h4>层次性原则</h4>
                  <p>按照重要性和影响力的大小，分层次进行分析，主次分明，重点突出。</p>
                  <div class="principle-details">
                    <strong>应用要点：</strong>
                    <ul>
                      <li>先分析主要格局和用神</li>
                      <li>再分析十神关系和宫位</li>
                      <li>最后考虑神煞和其他因素</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>六步分析法</h3>
            
            <div class="six-step-method">
              <div class="steps-overview">
                <h4>系统化分析流程</h4>
                <p>通过标准化的六个步骤，确保分析的完整性和准确性，避免遗漏重要信息。</p>
              </div>

              <div class="steps-detailed">
                <div class="step-item">
                  <div class="step-header">
                    <div class="step-number">1</div>
                    <h4>基础信息确认</h4>
                    <span class="step-time">5-10分钟</span>
                  </div>
                  <div class="step-content">
                    <div class="step-description">
                      <p>核实和整理基本信息，确保数据准确性，为后续分析奠定基础。</p>
                    </div>
                    <div class="step-checklist">
                      <h5>核查清单</h5>
                      <div class="checklist-items">
                        <div class="checklist-item">
                          <span class="check-icon">✓</span>
                          <span>出生时间准确性（精确到分钟）</span>
                        </div>
                        <div class="checklist-item">
                          <span class="check-icon">✓</span>
                          <span>地理位置和时区转换</span>
                        </div>
                        <div class="checklist-item">
                          <span class="check-icon">✓</span>
                          <span>八字排盘或星图绘制</span>
                        </div>
                        <div class="checklist-item">
                          <span class="check-icon">✓</span>
                          <span>大运流年或推运计算</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-item">
                  <div class="step-header">
                    <div class="step-number">2</div>
                    <h4>整体格局判断</h4>
                    <span class="step-time">15-20分钟</span>
                  </div>
                  <div class="step-content">
                    <div class="step-description">
                      <p>从宏观角度分析整体结构特点，确定主要格局类型和能量分布。</p>
                    </div>
                    <div class="analysis-dimensions">
                      <h5>分析维度</h5>
                      <div class="dimensions-grid">
                        <div class="dimension-item bazi">
                          <strong>八字分析</strong>
                          <ul>
                            <li>日干强弱判断</li>
                            <li>格局类型确定</li>
                            <li>用神忌神分析</li>
                          </ul>
                        </div>
                        <div class="dimension-item astrology">
                          <strong>占星分析</strong>
                          <ul>
                            <li>星座元素分布</li>
                            <li>行星力量对比</li>
                            <li>相位模式识别</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-item">
                  <div class="step-header">
                    <div class="step-number">3</div>
                    <h4>核心要素分析</h4>
                    <span class="step-time">20-25分钟</span>
                  </div>
                  <div class="step-content">
                    <div class="step-description">
                      <p>深入分析影响命运的关键要素，重点关注主要矛盾和核心特征。</p>
                    </div>
                    <div class="core-elements">
                      <div class="element-category personality">
                        <h5>性格特质</h5>
                        <div class="element-items">
                          <span class="element-tag">基本性格</span>
                          <span class="element-tag">行为模式</span>
                          <span class="element-tag">价值观念</span>
                          <span class="element-tag">情感特点</span>
                        </div>
                      </div>
                      <div class="element-category relationships">
                        <h5>人际关系</h5>
                        <div class="element-items">
                          <span class="element-tag">家庭关系</span>
                          <span class="element-tag">感情婚姻</span>
                          <span class="element-tag">社交模式</span>
                          <span class="element-tag">合作能力</span>
                        </div>
                      </div>
                      <div class="element-category career">
                        <h5>事业发展</h5>
                        <div class="element-items">
                          <span class="element-tag">职业倾向</span>
                          <span class="element-tag">成功模式</span>
                          <span class="element-tag">领导能力</span>
                          <span class="element-tag">财富观念</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-item">
                  <div class="step-header">
                    <div class="step-number">4</div>
                    <h4>时间因素分析</h4>
                    <span class="step-time">15-20分钟</span>
                  </div>
                  <div class="step-content">
                    <div class="step-description">
                      <p>结合时间维度分析运势变化，预测重要时期和转折点。</p>
                    </div>
                    <div class="time-analysis">
                      <div class="time-periods">
                        <div class="period-item past">
                          <h5>过去验证</h5>
                          <p>回顾重要历史事件，验证分析准确性</p>
                        </div>
                        <div class="period-item present">
                          <h5>现状分析</h5>
                          <p>分析当前运势特点和主要议题</p>
                        </div>
                        <div class="period-item future">
                          <h5>未来预测</h5>
                          <p>预测发展趋势和关键时机</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-item">
                  <div class="step-header">
                    <div class="step-number">5</div>
                    <h4>综合评估</h4>
                    <span class="step-time">10-15分钟</span>
                  </div>
                  <div class="step-content">
                    <div class="step-description">
                      <p>整合各方面分析结果，形成完整的人生画像和发展建议。</p>
                    </div>
                    <div class="evaluation-matrix">
                      <div class="matrix-item strengths">
                        <h5>优势领域</h5>
                        <p>天赋才能、有利因素</p>
                      </div>
                      <div class="matrix-item challenges">
                        <h5>挑战领域</h5>
                        <p>需要改善、注意事项</p>
                      </div>
                      <div class="matrix-item opportunities">
                        <h5>机会窗口</h5>
                        <p>有利时机、发展方向</p>
                      </div>
                      <div class="matrix-item suggestions">
                        <h5>发展建议</h5>
                        <p>行动指南、策略建议</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-item">
                  <div class="step-header">
                    <div class="step-number">6</div>
                    <h4>报告整理</h4>
                    <span class="step-time">10-15分钟</span>
                  </div>
                  <div class="step-content">
                    <div class="step-description">
                      <p>将分析结果整理成易于理解的报告，突出重点，提供实用指导。</p>
                    </div>
                    <div class="report-structure">
                      <div class="structure-item">
                        <strong>执行摘要</strong>
                        <p>核心特质和主要结论</p>
                      </div>
                      <div class="structure-item">
                        <strong>详细分析</strong>
                        <p>各领域深入解读</p>
                      </div>
                      <div class="structure-item">
                        <strong>时间预测</strong>
                        <p>重要时期和建议</p>
                      </div>
                      <div class="structure-item">
                        <strong>行动指南</strong>
                        <p>具体可行的建议</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>多维度分析工具</h3>
            
            <div class="analysis-tools">
              <div class="tools-grid">
                <div class="tool-card quantitative">
                  <h4>🔢 量化分析工具</h4>
                  <div class="tool-content">
                    <p>通过数值化方法评估各种因素的强弱和影响程度。</p>
                    <div class="tool-methods">
                      <div class="method-item">
                        <strong>力量评分</strong>
                        <p>对五行、行星等要素按影响力打分（1-10分）</p>
                      </div>
                      <div class="method-item">
                        <strong>平衡指数</strong>
                        <p>计算各方面力量的平衡程度</p>
                      </div>
                      <div class="method-item">
                        <strong>趋势指标</strong>
                        <p>量化运势变化的方向和程度</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tool-card qualitative">
                  <h4>🎨 定性分析工具</h4>
                  <div class="tool-content">
                    <p>通过模式识别和直觉判断评估复杂的关系和特质。</p>
                    <div class="tool-methods">
                      <div class="method-item">
                        <strong>模式识别</strong>
                        <p>识别命局中的特殊组合和格局</p>
                      </div>
                      <div class="method-item">
                        <strong>象征解读</strong>
                        <p>理解符号和象征的深层含义</p>
                      </div>
                      <div class="method-item">
                        <strong>直觉整合</strong>
                        <p>综合经验和直觉形成判断</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tool-card comparative">
                  <h4>⚖️ 比较分析工具</h4>
                  <div class="tool-content">
                    <p>通过对比分析揭示相对优势和特殊特征。</p>
                    <div class="tool-methods">
                      <div class="method-item">
                        <strong>同类对比</strong>
                        <p>与相似命局进行对比分析</p>
                      </div>
                      <div class="method-item">
                        <strong>时间对比</strong>
                        <p>比较不同时期的状态变化</p>
                      </div>
                      <div class="method-item">
                        <strong>标准对比</strong>
                        <p>与理想状态进行对比</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tool-card systematic">
                  <h4>🔄 系统分析工具</h4>
                  <div class="tool-content">
                    <p>从系统论角度分析各要素间的相互作用和影响。</p>
                    <div class="tool-methods">
                      <div class="method-item">
                        <strong>关联分析</strong>
                        <p>分析各要素之间的关联关系</p>
                      </div>
                      <div class="method-item">
                        <strong>反馈循环</strong>
                        <p>识别正反馈和负反馈机制</p>
                      </div>
                      <div class="method-item">
                        <strong>系统动力</strong>
                        <p>理解系统整体的发展动力</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>质量控制与验证</h3>
            
            <div class="quality-control">
              <div class="quality-framework">
                <h4>分析质量保证体系</h4>
                <p>通过多重验证机制确保分析结果的准确性和可靠性。</p>
              </div>

              <div class="verification-methods">
                <div class="method-card">
                  <div class="method-header">
                    <span class="method-icon">🔍</span>
                    <h5>逻辑一致性检查</h5>
                  </div>
                  <div class="method-content">
                    <ul>
                      <li>检查各部分分析是否相互矛盾</li>
                      <li>确保结论与证据的逻辑关系</li>
                      <li>验证因果关系的合理性</li>
                    </ul>
                  </div>
                </div>

                <div class="method-card">
                  <div class="method-header">
                    <span class="method-icon">📊</span>
                    <h5>历史事件验证</h5>
                  </div>
                  <div class="method-content">
                    <ul>
                      <li>用已知事件验证分析准确性</li>
                      <li>检查预测与实际的吻合度</li>
                      <li>调整分析方法和参数</li>
                    </ul>
                  </div>
                </div>

                <div class="method-card">
                  <div class="method-header">
                    <span class="method-icon">👥</span>
                    <h5>同行评议机制</h5>
                  </div>
                  <div class="method-content">
                    <ul>
                      <li>邀请其他专业人士复核</li>
                      <li>参与专业讨论和交流</li>
                      <li>吸收不同观点和建议</li>
                    </ul>
                  </div>
                </div>

                <div class="method-card">
                  <div class="method-header">
                    <span class="method-icon">🎯</span>
                    <h5>反馈修正循环</h5>
                  </div>
                  <div class="method-content">
                    <ul>
                      <li>收集客户反馈和意见</li>
                      <li>跟踪预测的实现情况</li>
                      <li>持续改进分析方法</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>分析方法实践</h3>
          <div class="practice-box">
            <p>运用系统化分析方法，开始您的专业命理解读实践。掌握科学的分析流程，提升解读质量和准确性！</p>
            <button class="practice-btn" @click="startPractice">
              开始系统分析实践
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/reading/preparation" class="nav-btn prev-btn">
            ← 上一课：解读前的准备
          </router-link>
          <router-link to="/learn/reading/interpretation" class="nav-btn next-btn">
            下一课：解读技巧 →
          </router-link>
        </div>
      </article>
    </div>

    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script>
import LanguageSwitcher from '../../components/LanguageSwitcher.vue'
import AppNavigation from '../../components/AppNavigation.vue'
import i18nMixin from '../../mixins/i18n.js'

export default {
  name: 'ReadingAnalysisMethod',
  mixins: [i18nMixin],
  
  components: {
    LanguageSwitcher,
    AppNavigation
  },
  
  computed: {
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  
  mounted() {
    document.title = '分析方法 - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '学习系统化的命理分析方法，掌握六步分析法和多维度分析工具，提升解读质量。')
    }
    
    this.handleResize = () => {
      this.$forceUpdate()
    }
    window.addEventListener('resize', this.handleResize)
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  
  methods: {
    onLanguageChanged(language) {
      console.log('Language changed to:', language)
    },
    
    startPractice() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.lesson-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 20px 20px 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header styles - reuse pattern */
.header {
  margin-bottom: 40px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #d35400;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: #ccc;
}

.current {
  color: #666;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2c3e50;
  font-family: 'Shippori Mincho', serif;
}

.lesson-meta {
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 0.9rem;
}

.category {
  background: #16a085;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.difficulty {
  background: #fff3e0;
  color: #f57c00;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.duration {
  color: #666;
  font-weight: 500;
}

/* Content */
.content-container {
  flex: 1;
}

.lesson-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.lesson-intro {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.lesson-intro h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.lesson-intro p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

.lesson-objectives {
  margin-bottom: 30px;
}

.lesson-objectives h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.lesson-objectives ul {
  padding-left: 20px;
}

.lesson-objectives li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #555;
}

.content-section {
  margin-bottom: 40px;
}

.content-section h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.content-section p {
  line-height: 1.7;
  color: #555;
  margin-bottom: 15px;
}

/* Principles Framework */
.principles-framework {
  margin: 25px 0;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.principle-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.principle-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.principle-icon {
  font-size: 2rem;
  margin-bottom: 15px;
}

.principle-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.principle-card > p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.principle-details {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.principle-details strong {
  color: #16a085;
  display: block;
  margin-bottom: 8px;
}

.principle-details ul {
  padding-left: 15px;
  margin: 0;
}

.principle-details li {
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

/* Six Step Method */
.six-step-method {
  margin: 25px 0;
}

.steps-overview {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid #16a085;
}

.steps-overview h4 {
  color: #16a085;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.steps-detailed {
  display: grid;
  gap: 20px;
}

.step-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
}

.step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.step-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #16a085 0%, #1abc9c 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-right: 15px;
}

.step-header h4 {
  flex: 1;
  color: #2c3e50;
  margin: 0;
  font-family: 'Shippori Mincho', serif;
}

.step-time {
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

.step-description p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

/* Checklist */
.step-checklist {
  margin-top: 15px;
}

.step-checklist h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.checklist-items {
  display: grid;
  gap: 8px;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.check-icon {
  color: #16a085;
  font-weight: 600;
}

/* Analysis Dimensions */
.analysis-dimensions {
  margin-top: 15px;
}

.analysis-dimensions h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.dimensions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.dimension-item {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
}

.dimension-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 8px;
}

.dimension-item ul {
  padding-left: 15px;
  margin: 0;
}

.dimension-item li {
  font-size: 0.8rem;
  line-height: 1.3;
  margin-bottom: 3px;
}

/* Core Elements */
.core-elements {
  margin-top: 15px;
}

.element-category {
  margin-bottom: 12px;
}

.element-category h5 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
  font-size: 0.9rem;
}

.element-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.element-tag {
  background: #16a085;
  color: white;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Time Analysis */
.time-analysis {
  margin-top: 15px;
}

.time-periods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.period-item {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.period-item h5 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-family: 'Shippori Mincho', serif;
}

.period-item p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.3;
}

/* Evaluation Matrix */
.evaluation-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-top: 15px;
}

.matrix-item {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.matrix-item h5 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-family: 'Shippori Mincho', serif;
  font-size: 0.9rem;
}

.matrix-item p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.3;
  color: #666;
}

/* Report Structure */
.report-structure {
  display: grid;
  gap: 10px;
  margin-top: 15px;
}

.structure-item {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid #16a085;
}

.structure-item strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 4px;
}

.structure-item p {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

/* Analysis Tools */
.analysis-tools {
  margin: 25px 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tool-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.tool-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.tool-content p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.tool-methods {
  display: grid;
  gap: 12px;
}

.method-item {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
}

.method-item strong {
  display: block;
  color: #16a085;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.method-item p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.3;
  color: #666;
}

/* Quality Control */
.quality-control {
  margin: 25px 0;
}

.quality-framework {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid #16a085;
}

.quality-framework h4 {
  color: #16a085;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.verification-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.method-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.method-icon {
  font-size: 1.5rem;
}

.method-header h5 {
  color: #2c3e50;
  margin: 0;
  font-family: 'Shippori Mincho', serif;
}

.method-content ul {
  padding-left: 15px;
  margin: 0;
}

.method-content li {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

/* Practice and Navigation */
.practice-box {
  background: #fff;
  border: 2px solid #16a085;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #16a085 0%, #1abc9c 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
}

.practice-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(22, 160, 133, 0.3);
}

.lesson-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.nav-btn {
  display: inline-block;
  color: #16a085;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #16a085;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #16a085;
  color: white;
  transform: translateY(-1px);
}

/* Footer */
.footer {
  text-align: center;
  font-size: 0.9rem;
  color: #95a5a6;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .lesson-container {
    padding: 70px 15px 15px 15px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .lesson-meta {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .lesson-content {
    padding: 20px;
  }
  
  .principles-grid {
    grid-template-columns: 1fr;
  }
  
  .step-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .dimensions-grid {
    grid-template-columns: 1fr;
  }
  
  .time-periods {
    grid-template-columns: 1fr;
  }
  
  .evaluation-matrix {
    grid-template-columns: 1fr;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .verification-methods {
    grid-template-columns: 1fr;
  }
  
  .lesson-navigation {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-btn {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }
  
  .step-number {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}
</style>