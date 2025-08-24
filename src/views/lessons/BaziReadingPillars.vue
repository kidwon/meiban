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
        <router-link to="/learn/category/bazi">{{ $t('learn.categories.bazi') }}</router-link>
        <span class="separator">›</span>
        <span class="current">{{ $t('lesson.lessonContent.baziReadingPillars.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.baziReadingPillars.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.bazi') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.advanced') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 28 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.baziReadingPillars.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.baziReadingPillars.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.baziReadingPillars.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.baziReadingPillars.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.baziReadingPillars.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziReadingPillars.structure.title') }}</h3>
            
            <div class="pillars-structure">
              <div class="structure-diagram">
                <div class="pillar-visual">
                  <div class="pillar year">
                    <div class="heavenly-stem">年干</div>
                    <div class="earthly-branch">年支</div>
                    <div class="pillar-name">年柱</div>
                  </div>
                  <div class="pillar month">
                    <div class="heavenly-stem">月干</div>
                    <div class="earthly-branch">月支</div>
                    <div class="pillar-name">月柱</div>
                  </div>
                  <div class="pillar day">
                    <div class="heavenly-stem">日干</div>
                    <div class="earthly-branch">日支</div>
                    <div class="pillar-name">日柱</div>
                  </div>
                  <div class="pillar hour">
                    <div class="heavenly-stem">时干</div>
                    <div class="earthly-branch">时支</div>
                    <div class="pillar-name">时柱</div>
                  </div>
                </div>
                
                <div class="structure-legend">
                  <div class="legend-item">
                    <span class="legend-color heaven"></span>
                    <span>天干：主动性、外在表现</span>
                  </div>
                  <div class="legend-item">
                    <span class="legend-color earth"></span>
                    <span>地支：潜在性、内在根基</span>
                  </div>
                </div>
              </div>

              <div class="pillars-meaning">
                <div class="meaning-grid">
                  <div class="meaning-card year-card">
                    <h4>年柱 - 祖辈宫</h4>
                    <div class="age-range">0-16岁运势</div>
                    <ul>
                      <li><strong>代表</strong>：祖先、父母、出身背景</li>
                      <li><strong>影响</strong>：童年环境、家族传承</li>
                      <li><strong>特征</strong>：先天根基、初期运势</li>
                      <li><strong>观察</strong>：家庭条件、早年教育</li>
                    </ul>
                  </div>

                  <div class="meaning-card month-card">
                    <h4>月柱 - 父母宫</h4>
                    <div class="age-range">17-32岁运势</div>
                    <ul>
                      <li><strong>代表</strong>：父母、兄弟姐妹关系</li>
                      <li><strong>影响</strong>：青年发展、性格形成</li>
                      <li><strong>特征</strong>：主要性格、人生方向</li>
                      <li><strong>观察</strong>：学业事业、人际关系</li>
                    </ul>
                  </div>

                  <div class="meaning-card day-card">
                    <h4>日柱 - 夫妻宫</h4>
                    <div class="age-range">33-48岁运势</div>
                    <ul>
                      <li><strong>代表</strong>：自己、配偶关系</li>
                      <li><strong>影响</strong>：婚姻状况、中年发展</li>
                      <li><strong>特征</strong>：核心个性、人生主调</li>
                      <li><strong>观察</strong>：感情婚姻、事业巅峰</li>
                    </ul>
                  </div>

                  <div class="meaning-card hour-card">
                    <h4>时柱 - 子女宫</h4>
                    <div class="age-range">49-64岁运势</div>
                    <ul>
                      <li><strong>代表</strong>：子女、下属、晚年</li>
                      <li><strong>影响</strong>：子女关系、晚年运势</li>
                      <li><strong>特征</strong>：人生结果、最终归宿</li>
                      <li><strong>观察</strong>：子女教育、退休生活</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>日干分析法</h3>
            
            <div class="day-master-analysis">
              <div class="analysis-intro">
                <h4>日干 = 命主本人</h4>
                <p>日干代表命主自己，是整个八字分析的中心。其他七个字都围绕日干展开分析，判断它们对日干的生助克泄耗关系。</p>
              </div>

              <div class="relationships-grid">
                <div class="relationship-card positive">
                  <div class="relationship-header">
                    <span class="relationship-icon">💚</span>
                    <h5>生助关系</h5>
                  </div>
                  <div class="relationship-content">
                    <p><strong>印星</strong>：生日干的五行（母亲、长辈、学习）</p>
                    <p><strong>比劫</strong>：同日干的五行（兄弟、朋友、帮助）</p>
                    <div class="example-box">
                      <strong>例</strong>：日干为甲木，见壬癸水为印星，甲乙木为比劫
                    </div>
                  </div>
                </div>

                <div class="relationship-card challenging">
                  <div class="relationship-header">
                    <span class="relationship-icon">⚡</span>
                    <h5>克制关系</h5>
                  </div>
                  <div class="relationship-content">
                    <p><strong>官杀</strong>：克日干的五行（官府、压力、挑战）</p>
                    <p><strong>食伤</strong>：日干生的五行（表达、才华、子女）</p>
                    <div class="example-box">
                      <strong>例</strong>：日干为甲木，见庚辛金为官杀，丙丁火为食伤
                    </div>
                  </div>
                </div>

                <div class="relationship-card neutral">
                  <div class="relationship-header">
                    <span class="relationship-icon">💰</span>
                    <h5>财富关系</h5>
                  </div>
                  <div class="relationship-content">
                    <p><strong>财星</strong>：日干克的五行（金钱、妻子、欲望）</p>
                    <div class="example-box">
                      <strong>例</strong>：日干为甲木，见戊己土为财星
                    </div>
                  </div>
                </div>
              </div>

              <div class="ten-gods-chart">
                <h4>十神速查表</h4>
                <div class="gods-table">
                  <div class="god-item seal">
                    <strong>正印 偏印</strong>
                    <span>学习 思考</span>
                  </div>
                  <div class="god-item peer">
                    <strong>比肩 劫财</strong>
                    <span>竞争 合作</span>
                  </div>
                  <div class="god-item talent">
                    <strong>食神 伤官</strong>
                    <span>才华 表达</span>
                  </div>
                  <div class="god-item wealth">
                    <strong>正财 偏财</strong>
                    <span>财富 欲望</span>
                  </div>
                  <div class="god-item authority">
                    <strong>正官 七杀</strong>
                    <span>权威 压力</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>用神忌神分析</h3>
            
            <div class="useful-god-analysis">
              <div class="concept-explanation">
                <div class="concept-card">
                  <h4>🎯 用神 (有用之神)</h4>
                  <p>能够调候、通关、扶弱、抑强的五行，是命局最需要的五行能量。用神有力则命好，用神受伤则不利。</p>
                  <div class="determination-steps">
                    <h5>用神判断步骤</h5>
                    <ol>
                      <li>判断日干强弱</li>
                      <li>分析命局寒暖燥湿</li>
                      <li>确定最需要的五行</li>
                      <li>验证用神是否有力</li>
                    </ol>
                  </div>
                </div>

                <div class="concept-card">
                  <h4>⚠️ 忌神 (忌讳之神)</h4>
                  <p>对命局起坏作用的五行，会破坏命局平衡。忌神临运则不利，忌神受制则吉利。</p>
                  <div class="determination-steps">
                    <h5>忌神识别方法</h5>
                    <ol>
                      <li>克制用神的五行</li>
                      <li>加重命局失衡的五行</li>
                      <li>形成忌神局的五行</li>
                      <li>破坏格局的五行</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div class="analysis-examples">
                <h4>实例分析</h4>
                <div class="examples-grid">
                  <div class="example-case strong-self">
                    <h5>身强案例</h5>
                    <div class="case-info">
                      <strong>特征</strong>：日干得令、多比劫印星
                    </div>
                    <div class="god-selection">
                      <div class="useful-gods">
                        <strong>用神</strong>：食伤（发泄）、财星（消耗）、官杀（制约）
                      </div>
                      <div class="taboo-gods">
                        <strong>忌神</strong>：印星（生身）、比劫（帮身）
                      </div>
                    </div>
                    <p class="strategy">策略：发泄日干旺气，避免进一步增强</p>
                  </div>

                  <div class="example-case weak-self">
                    <h5>身弱案例</h5>
                    <div class="case-info">
                      <strong>特征</strong>：日干失令、多财官食伤
                    </div>
                    <div class="god-selection">
                      <div class="useful-gods">
                        <strong>用神</strong>：印星（生身）、比劫（帮身）
                      </div>
                      <div class="taboo-gods">
                        <strong>忌神</strong>：财星（耗身）、官杀（克身）、食伤（泄身）
                      </div>
                    </div>
                    <p class="strategy">策略：增强日干力量，减少消耗</p>
                  </div>

                  <div class="example-case adjustment-case">
                    <h5>调候案例</h5>
                    <div class="case-info">
                      <strong>特征</strong>：命局过寒、过热、过燥、过湿
                    </div>
                    <div class="god-selection">
                      <div class="useful-gods">
                        <strong>用神</strong>：调节气候的五行（火暖水润）
                      </div>
                      <div class="taboo-gods">
                        <strong>忌神</strong>：加重偏性的五行
                      </div>
                    </div>
                    <p class="strategy">策略：优先调候，再论强弱</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>四柱解读流程</h3>
            
            <div class="reading-process">
              <div class="process-steps">
                <div class="step-card">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>基础信息收集</h4>
                    <ul>
                      <li>确认准确的出生时间</li>
                      <li>排出完整的四柱八字</li>
                      <li>标注藏干和纳音</li>
                      <li>查找大运流年</li>
                    </ul>
                  </div>
                </div>

                <div class="step-card">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>日干强弱判断</h4>
                    <ul>
                      <li>分析日干在月令的旺衰</li>
                      <li>统计生助克制的力量</li>
                      <li>考虑组合和位置关系</li>
                      <li>得出强弱结论</li>
                    </ul>
                  </div>
                </div>

                <div class="step-card">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>用神忌神确定</h4>
                    <ul>
                      <li>根据强弱选择用神方向</li>
                      <li>考虑调候需要</li>
                      <li>分析格局特点</li>
                      <li>确定最终用忌神</li>
                    </ul>
                  </div>
                </div>

                <div class="step-card">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>十神关系分析</h4>
                    <ul>
                      <li>标注各字的十神属性</li>
                      <li>分析十神组合特点</li>
                      <li>判断各方面运势</li>
                      <li>找出性格特征</li>
                    </ul>
                  </div>
                </div>

                <div class="step-card">
                  <div class="step-number">5</div>
                  <div class="step-content">
                    <h4>宫位分析</h4>
                    <ul>
                      <li>分析年月日时各宫位</li>
                      <li>判断六亲关系</li>
                      <li>预测各阶段运势</li>
                      <li>总结人生特点</li>
                    </ul>
                  </div>
                </div>

                <div class="step-card">
                  <div class="step-number">6</div>
                  <div class="step-content">
                    <h4>综合解读</h4>
                    <ul>
                      <li>结合大运流年分析</li>
                      <li>预测重要人生节点</li>
                      <li>提供发展建议</li>
                      <li>指出注意事项</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>实用解读技巧</h3>
            
            <div class="practical-tips">
              <div class="tips-grid">
                <div class="tip-category">
                  <h4>🔍 观察要点</h4>
                  <div class="tips-list">
                    <div class="tip-item">
                      <strong>干支关系</strong>
                      <p>注意天干地支的生克冲合，特别是紧贴关系最重要</p>
                    </div>
                    <div class="tip-item">
                      <strong>月令司权</strong>
                      <p>月支当令之神影响最大，是判断强弱的首要因素</p>
                    </div>
                    <div class="tip-item">
                      <strong>组合效应</strong>
                      <p>三合三会半合等组合会改变原有的力量对比</p>
                    </div>
                    <div class="tip-item">
                      <strong>位置远近</strong>
                      <p>与日干位置越近影响越大，时空距离很重要</p>
                    </div>
                  </div>
                </div>

                <div class="tip-category">
                  <h4>⚖️ 平衡原则</h4>
                  <div class="tips-list">
                    <div class="tip-item">
                      <strong>不偏不倚</strong>
                      <p>命局最忌过强过弱，中和平衡为最佳状态</p>
                    </div>
                    <div class="tip-item">
                      <strong>相辅相成</strong>
                      <p>阴阳调配、刚柔并济、五行俱全为好</p>
                    </div>
                    <div class="tip-item">
                      <strong>有病有药</strong>
                      <p>命局有缺陷不怕，关键是要有化解的方法</p>
                    </div>
                    <div class="tip-item">
                      <strong>顺应天时</strong>
                      <p>结合季节特点，春木夏火秋金冬水各有所宜</p>
                    </div>
                  </div>
                </div>

                <div class="tip-category">
                  <h4>🎯 重点关注</h4>
                  <div class="tips-list">
                    <div class="tip-item">
                      <strong>日支配偶</strong>
                      <p>日支代表配偶，与日干关系影响婚姻质量</p>
                    </div>
                    <div class="tip-item">
                      <strong>月柱格局</strong>
                      <p>月柱决定主要格局，影响人生大方向</p>
                    </div>
                    <div class="tip-item">
                      <strong>时柱结果</strong>
                      <p>时柱看晚年和子女，也代表事业最终成就</p>
                    </div>
                    <div class="tip-item">
                      <strong>空亡神煞</strong>
                      <p>空亡减力，神煞增吉凶，需要综合考虑</p>
                    </div>
                  </div>
                </div>

                <div class="tip-category">
                  <h4>🚫 常见误区</h4>
                  <div class="tips-list">
                    <div class="tip-item">
                      <strong>避免机械化</strong>
                      <p>不能死记硬背，要灵活变通，因命而异</p>
                    </div>
                    <div class="tip-item">
                      <strong>避免绝对化</strong>
                      <p>命理只能论倾向，不能绝对化预测结果</p>
                    </div>
                    <div class="tip-item">
                      <strong>避免单一化</strong>
                      <p>要综合分析，不能只看一个方面就下结论</p>
                    </div>
                    <div class="tip-item">
                      <strong>避免宿命化</strong>
                      <p>命运可以改善，要积极引导正面思考</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>四柱解读练习</h3>
          <div class="practice-box">
            <p>通过实际案例练习四柱解读，掌握系统分析方法。运用所学技巧，开始您的八字解读实践！</p>
            <button class="practice-btn" @click="startPractice">
              练习四柱解读
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/bazi/five-elements" class="nav-btn prev-btn">
            ← 上一课：五行理论深度解析
          </router-link>
          <router-link to="/learn/bazi/interpreting-chart" class="nav-btn next-btn">
            下一课：八字综合分析 →
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
  name: 'BaziReadingPillars',
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
    document.title = '四柱解读技巧 - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '深入学习八字四柱解读技巧，掌握日干分析法、用神忌神判断和系统解读流程。')
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
  background: #c0392b;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.difficulty {
  background: #ffeaa7;
  color: #d63031;
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

/* Pillars Structure */
.pillars-structure {
  margin: 25px 0;
}

.structure-diagram {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
}

.pillar-visual {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.pillar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 15px;
  min-width: 80px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.heavenly-stem {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
  font-size: 0.9rem;
  width: 100%;
  text-align: center;
}

.earthly-branch {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 0 0 8px 8px;
  font-weight: 600;
  font-size: 0.9rem;
  width: 100%;
  text-align: center;
}

.pillar-name {
  margin-top: 10px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.structure-legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 0.9rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
}

.legend-color.heaven {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.legend-color.earth {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Pillars Meaning */
.meaning-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.meaning-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #c0392b;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.meaning-card h4 {
  color: #c0392b;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.age-range {
  background: #c0392b;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 15px;
}

.meaning-card ul {
  padding-left: 15px;
  margin: 0;
}

.meaning-card li {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 8px;
}

/* Day Master Analysis */
.day-master-analysis {
  margin: 25px 0;
}

.analysis-intro {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  border-left: 4px solid #c0392b;
}

.analysis-intro h4 {
  color: #c0392b;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.relationships-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.relationship-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.relationship-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.relationship-icon {
  font-size: 1.5rem;
}

.relationship-card h5 {
  color: #2c3e50;
  margin: 0;
  font-family: 'Shippori Mincho', serif;
}

.relationship-content p {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 10px;
}

.example-box {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  border-left: 3px solid #c0392b;
}

.example-box strong {
  color: #c0392b;
}

/* Ten Gods Chart */
.ten-gods-chart {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #c0392b;
}

.ten-gods-chart h4 {
  color: #c0392b;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.gods-table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.god-item {
  background: white;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.god-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.god-item span {
  font-size: 0.8rem;
  color: #666;
}

/* Useful God Analysis */
.useful-god-analysis {
  margin: 25px 0;
}

.concept-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
}

.concept-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #c0392b;
}

.concept-card h4 {
  color: #c0392b;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.determination-steps {
  margin-top: 15px;
}

.determination-steps h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1rem;
  font-family: 'Shippori Mincho', serif;
}

.determination-steps ol {
  padding-left: 15px;
  margin: 0;
}

.determination-steps li {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

/* Analysis Examples */
.analysis-examples {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #c0392b;
}

.analysis-examples h4 {
  color: #c0392b;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.example-case {
  background: white;
  padding: 15px;
  border-radius: 8px;
}

.example-case h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.case-info {
  margin-bottom: 12px;
}

.case-info strong {
  color: #c0392b;
}

.god-selection {
  margin-bottom: 10px;
}

.useful-gods,
.taboo-gods {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.useful-gods strong {
  color: #27ae60;
}

.taboo-gods strong {
  color: #e74c3c;
}

.strategy {
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
  margin: 0;
}

/* Reading Process */
.reading-process {
  margin: 25px 0;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.step-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #c0392b;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #c0392b;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.step-content h4 {
  color: #2c3e50;
  margin-bottom: 12px;
  font-family: 'Shippori Mincho', serif;
}

.step-content ul {
  padding-left: 15px;
  margin: 0;
}

.step-content li {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 6px;
}

/* Practical Tips */
.practical-tips {
  margin: 25px 0;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tip-category {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #c0392b;
}

.tip-category h4 {
  color: #c0392b;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.tips-list {
  display: grid;
  gap: 12px;
}

.tip-item {
  background: white;
  padding: 12px;
  border-radius: 8px;
}

.tip-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.tip-item p {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
  color: #666;
}

/* Practice and Navigation */
.practice-box {
  background: #fff;
  border: 2px solid #c0392b;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
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
  box-shadow: 0 6px 20px rgba(192, 57, 43, 0.3);
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
  color: #c0392b;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #c0392b;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #c0392b;
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
  
  .pillar-visual {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .pillar {
    min-width: 60px;
    padding: 10px;
  }
  
  .structure-legend {
    flex-direction: column;
    gap: 10px;
  }
  
  .meaning-grid {
    grid-template-columns: 1fr;
  }
  
  .concept-explanation {
    grid-template-columns: 1fr;
  }
  
  .relationships-grid {
    grid-template-columns: 1fr;
  }
  
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .process-steps {
    grid-template-columns: 1fr;
  }
  
  .tips-grid {
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
  
  .gods-table {
    grid-template-columns: 1fr 1fr;
  }
}
</style>