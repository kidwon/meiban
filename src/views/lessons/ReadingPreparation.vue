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
        <span class="current">{{ $t('lesson.lessonContent.readingPreparation.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.readingPreparation.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.reading') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.beginner') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 12 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.readingPreparation.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.readingPreparation.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.readingPreparation.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.readingPreparation.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.readingPreparation.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>1. 出生信息的收集</h3>
            <p>准确的出生信息是所有命理分析的基础，任何细微的偏差都可能导致解读结果的根本性差异。</p>
            
            <div class="info-collection">
              <div class="collection-item essential">
                <h4>📅 必需信息</h4>
                <div class="info-details">
                  <div class="info-item">
                    <strong>出生日期</strong>
                    <p>年、月、日（阳历/农历都要确认）</p>
                    <span class="accuracy">准确度：100%必需</span>
                  </div>
                  <div class="info-item">
                    <strong>出生时间</strong>
                    <p>精确到分钟，24小时制</p>
                    <span class="accuracy">准确度：±15分钟内</span>
                  </div>
                  <div class="info-item">
                    <strong>出生地点</strong>
                    <p>城市、省份、国家（用于时区和经纬度）</p>
                    <span class="accuracy">准确度：城市级别</span>
                  </div>
                  <div class="info-item">
                    <strong>性别</strong>
                    <p>影响某些分析方法的应用</p>
                    <span class="accuracy">准确度：100%必需</span>
                  </div>
                </div>
              </div>

              <div class="collection-item helpful">
                <h4>💡 有用信息</h4>
                <div class="info-details">
                  <div class="info-item">
                    <strong>姓名</strong>
                    <p>用于建立个人档案和称呼</p>
                  </div>
                  <div class="info-item">
                    <strong>出生证明</strong>
                    <p>最权威的时间来源</p>
                  </div>
                  <div class="info-item">
                    <strong>家族信息</strong>
                    <p>父母出生信息（家族模式分析）</p>
                  </div>
                  <div class="info-item">
                    <strong>重大事件</strong>
                    <p>人生关键节点（验证准确性）</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="warning-box">
              <h4>⚠️ 常见陷阱</h4>
              <ul>
                <li><strong>夏令时误区</strong>：不同地区不同年份的夏令时规则可能不同</li>
                <li><strong>时区混淆</strong>：出生在A地但记录用B地时间</li>
                <li><strong>农历阳历混淆</strong>：特别是老一辈可能只记得农历</li>
                <li><strong>记忆偏差</strong>：家人回忆的时间可能不够准确</li>
              </ul>
            </div>
          </section>

          <section class="content-section">
            <h3>2. 解读者的心态准备</h3>
            
            <div class="mindset-grid">
              <div class="mindset-card">
                <div class="mindset-icon">🧘</div>
                <h4>保持客观中立</h4>
                <p>不带个人偏见，不强加主观判断。每个人的命理都有其独特性，避免用固化的模式去套用。</p>
                <div class="tips">
                  <strong>实践方法：</strong>
                  <ul>
                    <li>解读前做几分钟冥想或深呼吸</li>
                    <li>清空对当事人的先入为主的印象</li>
                    <li>准备多种可能的解释角度</li>
                  </ul>
                </div>
              </div>

              <div class="mindset-card">
                <div class="mindset-icon">💝</div>
                <h4>怀有同理心</h4>
                <p>理解每个人来寻求命理指导时的心理状态，可能正面临困惑、迷茫或重大决策。</p>
                <div class="tips">
                  <strong>实践方法：</strong>
                  <ul>
                    <li>用温和友善的语调交流</li>
                    <li>关注对方的情绪反应</li>
                    <li>避免使用过于专业或冰冷的术语</li>
                  </ul>
                </div>
              </div>

              <div class="mindset-card">
                <div class="mindset-icon">🔍</div>
                <h4>持续学习的态度</h4>
                <p>命理学博大精深，每个案例都是学习的机会。保持谦逊和开放的心态。</p>
                <div class="tips">
                  <strong>实践方法：</strong>
                  <ul>
                    <li>记录有趣或特殊的案例</li>
                    <li>定期回顾和反思解读质量</li>
                    <li>与其他专业人士交流学习</li>
                  </ul>
                </div>
              </div>

              <div class="mindset-card">
                <div class="mindset-icon">⚖️</div>
                <h4>职业道德操守</h4>
                <p>严格保护客户隐私，提供建设性指导而非宿命论，鼓励积极的人生态度。</p>
                <div class="tips">
                  <strong>实践方法：</strong>
                  <ul>
                    <li>签署保密协议</li>
                    <li>强调个人选择的重要性</li>
                    <li>避免做出绝对性的预言</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>3. 环境和工具准备</h3>
            
            <div class="preparation-sections">
              <div class="prep-section">
                <h4>🏠 物理环境</h4>
                <div class="environment-checklist">
                  <div class="checklist-item">
                    <input type="checkbox" id="quiet" />
                    <label for="quiet">安静无干扰的空间</label>
                  </div>
                  <div class="checklist-item">
                    <input type="checkbox" id="comfortable" />
                    <label for="comfortable">舒适的座椅和桌子</label>
                  </div>
                  <div class="checklist-item">
                    <input type="checkbox" id="lighting" />
                    <label for="lighting">柔和充足的照明</label>
                  </div>
                  <div class="checklist-item">
                    <input type="checkbox" id="temperature" />
                    <label for="temperature">适宜的室温</label>
                  </div>
                  <div class="checklist-item">
                    <input type="checkbox" id="privacy" />
                    <label for="privacy">隐私保护（避免被他人听到）</label>
                  </div>
                </div>
              </div>

              <div class="prep-section">
                <h4>🛠️ 工具准备</h4>
                <div class="tools-grid">
                  <div class="tool-category">
                    <h5>基础工具</h5>
                    <ul>
                      <li>万年历或专业排盘软件</li>
                      <li>计算器</li>
                      <li>纸笔或电子记录设备</li>
                      <li>世界时区查询工具</li>
                    </ul>
                  </div>
                  <div class="tool-category">
                    <h5>参考资料</h5>
                    <ul>
                      <li>天干地支对照表</li>
                      <li>星座日期表</li>
                      <li>行星意义速查手册</li>
                      <li>宫位含义参考</li>
                    </ul>
                  </div>
                  <div class="tool-category">
                    <h5>数字化工具</h5>
                    <ul>
                      <li>专业占星软件</li>
                      <li>在线排盘网站</li>
                      <li>移动端应用程序</li>
                      <li>云端储存备份</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="prep-section">
                <h4>📋 流程准备</h4>
                <div class="process-steps">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h5>信息确认</h5>
                      <p>再次核实出生信息的准确性</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h5>排盘计算</h5>
                      <p>生成准确的八字或占星图</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h5>初步分析</h5>
                      <p>识别主要特征和模式</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h5>深度解读</h5>
                      <p>结合具体问题进行针对性分析</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                      <h5>建议总结</h5>
                      <p>提供实用可行的指导建议</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>4. 与咨询者的沟通准备</h3>
            
            <div class="communication-guide">
              <div class="communication-item">
                <h4>🎯 了解咨询目的</h4>
                <div class="purpose-types">
                  <div class="purpose-card general">
                    <strong>整体了解型</strong>
                    <p>想要全面认识自己的性格、天赋、生命主题</p>
                    <small>解读重点：基础性格、天赋潜能、人生方向</small>
                  </div>
                  <div class="purpose-card specific">
                    <strong>问题解决型</strong>
                    <p>面临具体问题需要指导和建议</p>
                    <small>解读重点：相关宫位、流年运势、应对策略</small>
                  </div>
                  <div class="purpose-card timing">
                    <strong>时机选择型</strong>
                    <p>想要选择最佳的行动时机</p>
                    <small>解读重点：运势周期、吉凶时机、适宜行动</small>
                  </div>
                  <div class="purpose-card relationship">
                    <strong>关系咨询型</strong>
                    <p>关于感情、事业、人际关系的困惑</p>
                    <small>解读重点：相关宫位、合盘分析、互动模式</small>
                  </div>
                </div>
              </div>

              <div class="communication-item">
                <h4>💬 建立有效沟通</h4>
                <div class="communication-tips">
                  <div class="tip-section">
                    <h5>开场建立信任</h5>
                    <ul>
                      <li>简单介绍自己的经验和方法</li>
                      <li>说明解读的流程和时间安排</li>
                      <li>强调保密原则和职业操守</li>
                      <li>营造轻松开放的交流氛围</li>
                    </ul>
                  </div>
                  <div class="tip-section">
                    <h5>引导式提问</h5>
                    <ul>
                      <li>"您最希望了解哪些方面？"</li>
                      <li>"目前有什么特别困惑的问题吗？"</li>
                      <li>"这个解读您希望获得什么帮助？"</li>
                      <li>"有什么特殊的背景我需要了解的吗？"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>5. 解读质量的自我检核</h3>
            
            <div class="quality-checklist">
              <div class="quality-section">
                <h4>📊 解读前检核</h4>
                <div class="checklist">
                  <div class="check-item">✓ 信息准确性已确认</div>
                  <div class="check-item">✓ 排盘计算无误</div>
                  <div class="check-item">✓ 参考资料已准备</div>
                  <div class="check-item">✓ 解读环境已布置</div>
                  <div class="check-item">✓ 个人状态良好</div>
                </div>
              </div>

              <div class="quality-section">
                <h4>🎯 解读中注意</h4>
                <div class="checklist">
                  <div class="check-item">✓ 保持客观中立的态度</div>
                  <div class="check-item">✓ 用易懂的语言表达</div>
                  <div class="check-item">✓ 关注咨询者的反应</div>
                  <div class="check-item">✓ 提供建设性的建议</div>
                  <div class="check-item">✓ 避免绝对化的判断</div>
                </div>
              </div>

              <div class="quality-section">
                <h4>🔄 解读后反思</h4>
                <div class="checklist">
                  <div class="check-item">✓ 主要观点是否清晰</div>
                  <div class="check-item">✓ 建议是否具体可行</div>
                  <div class="check-item">✓ 咨询者是否满意</div>
                  <div class="check-item">✓ 有无需要补充的内容</div>
                  <div class="check-item">✓ 记录案例和心得</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>实践练习</h3>
          <div class="practice-box">
            <p>现在让我们运用所学的准备技巧，开始您的第一次专业解读体验！</p>
            <button class="practice-btn" @click="startPractice">
              开始专业解读实践
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <div class="nav-placeholder"></div>
          <router-link to="/learn/reading/analysis-method" class="nav-btn next-btn">
            下一课：分析方法 →
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
  name: 'ReadingPreparation',
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
    document.title = '解读前的准备 - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '学习命理解读前的各项准备工作，包括信息收集、心态调整、环境布置等专业技巧。')
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
  max-width: 900px;
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
  background: #e8f5e8;
  color: #2d5a2d;
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

/* Information Collection */
.info-collection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 25px 0;
}

.collection-item {
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #16a085;
}

.collection-item.essential {
  background: linear-gradient(135deg, #e8f8f5 0%, #d5f4e6 100%);
}

.collection-item.helpful {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b3 100%);
  border-left-color: #f39c12;
}

.collection-item h4 {
  color: #16a085;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.collection-item.helpful h4 {
  color: #f39c12;
}

.info-details {
  display: grid;
  gap: 15px;
}

.info-item {
  background: white;
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid #16a085;
}

.helpful .info-item {
  border-left-color: #f39c12;
}

.info-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-family: 'Shippori Mincho', serif;
}

.info-item p {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.accuracy {
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
}

/* Warning Box */
.warning-box {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
  border-left: 4px solid #ffc107;
}

.warning-box h4 {
  color: #856404;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.warning-box ul {
  padding-left: 20px;
}

.warning-box li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #856404;
}

/* Mindset Grid */
.mindset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.mindset-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border-left: 4px solid #16a085;
}

.mindset-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.mindset-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.mindset-card > p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.tips {
  text-align: left;
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}

.tips strong {
  color: #16a085;
  display: block;
  margin-bottom: 8px;
}

.tips ul {
  padding-left: 15px;
  margin: 0;
}

.tips li {
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

/* Preparation Sections */
.preparation-sections {
  display: grid;
  gap: 25px;
  margin: 25px 0;
}

.prep-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #16a085;
}

.prep-section h4 {
  color: #16a085;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

/* Environment Checklist */
.environment-checklist {
  display: grid;
  gap: 10px;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: white;
  border-radius: 6px;
}

.checklist-item input[type="checkbox"] {
  accent-color: #16a085;
}

.checklist-item label {
  font-size: 0.9rem;
  cursor: pointer;
}

/* Tools Grid */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.tool-category {
  background: white;
  padding: 15px;
  border-radius: 8px;
}

.tool-category h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.tool-category ul {
  padding-left: 15px;
  margin: 0;
}

.tool-category li {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

/* Process Steps */
.process-steps {
  display: grid;
  gap: 15px;
}

.step {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 15px;
  border-radius: 8px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #16a085;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.step-content h5 {
  color: #2c3e50;
  margin: 0 0 5px 0;
  font-family: 'Shippori Mincho', serif;
}

.step-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

/* Communication Guide */
.communication-guide {
  display: grid;
  gap: 25px;
  margin: 25px 0;
}

.communication-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #16a085;
}

.communication-item h4 {
  color: #16a085;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

/* Purpose Types */
.purpose-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.purpose-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #16a085;
}

.purpose-card strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
}

.purpose-card p {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.purpose-card small {
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
}

/* Communication Tips */
.communication-tips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.tip-section {
  background: white;
  padding: 15px;
  border-radius: 8px;
}

.tip-section h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.tip-section ul {
  padding-left: 15px;
  margin: 0;
}

.tip-section li {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

/* Quality Checklist */
.quality-checklist {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.quality-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #16a085;
}

.quality-section h4 {
  color: #16a085;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.checklist {
  display: grid;
  gap: 8px;
}

.check-item {
  background: white;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.4;
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

.nav-placeholder {
  width: 1px;
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
  
  .info-collection {
    grid-template-columns: 1fr;
  }
  
  .mindset-grid {
    grid-template-columns: 1fr;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .communication-tips {
    grid-template-columns: 1fr;
  }
  
  .quality-checklist {
    grid-template-columns: 1fr;
  }
  
  .lesson-navigation {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-btn {
    text-align: center;
  }
  
  .nav-placeholder {
    display: none;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }
  
  .purpose-types {
    grid-template-columns: 1fr;
  }
}
</style>