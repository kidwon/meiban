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
        <router-link to="/learn/category/astrology">{{ $t('learn.categories.astrology') }}</router-link>
        <span class="separator">›</span>
        <span class="current">{{ $t('lesson.lessonContent.astrologyAspects.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.astrologyAspects.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.astrology') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.intermediate') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 26 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.astrologyAspects.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.astrologyAspects.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyAspects.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyAspects.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyAspects.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>相位基础概念</h3>
            
            <div class="aspect-basics">
              <div class="concept-card">
                <h4>🎯 什么是相位</h4>
                <p>相位是指从地球看向两颗行星时形成的角度关系。这些角度反映了行星能量之间的互动模式，可能是和谐的、紧张的或中性的。</p>
                <div class="formula-box">
                  <strong>相位容差 (Orb)</strong>
                  <p>主要相位通常允许±8-10度的误差范围</p>
                  <small>例如：合相0°±8°，即352°-8°之间都算合相</small>
                </div>
              </div>

              <div class="concept-card">
                <h4>⚖️ 相位分类</h4>
                <div class="aspect-categories">
                  <div class="category harmonious">
                    <span class="icon">✨</span>
                    <div>
                      <strong>和谐相位</strong>
                      <p>三分相(120°)、六分相(60°)</p>
                      <small>能量流动顺畅，带来机会和天赋</small>
                    </div>
                  </div>
                  <div class="category challenging">
                    <span class="icon">⚡</span>
                    <div>
                      <strong>紧张相位</strong>
                      <p>四分相(90°)、对分相(180°)</p>
                      <small>产生动力和挑战，促进成长</small>
                    </div>
                  </div>
                  <div class="category neutral">
                    <span class="icon">🔮</span>
                    <div>
                      <strong>中性相位</strong>
                      <p>合相(0°)、其他小相位</p>
                      <small>影响取决于涉及的行星特质</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="aspect-wheel">
              <div class="wheel-visual">
                <div class="circle-chart">
                  <div class="center">相位轮</div>
                  <div class="aspect-line conjunction" style="--angle: 0deg">
                    <span class="aspect-symbol">☌</span>
                    <span class="aspect-name">合相 0°</span>
                  </div>
                  <div class="aspect-line sextile" style="--angle: 60deg">
                    <span class="aspect-symbol">⚹</span>
                    <span class="aspect-name">六分 60°</span>
                  </div>
                  <div class="aspect-line square" style="--angle: 90deg">
                    <span class="aspect-symbol">□</span>
                    <span class="aspect-name">四分 90°</span>
                  </div>
                  <div class="aspect-line trine" style="--angle: 120deg">
                    <span class="aspect-symbol">△</span>
                    <span class="aspect-name">三分 120°</span>
                  </div>
                  <div class="aspect-line opposition" style="--angle: 180deg">
                    <span class="aspect-symbol">☍</span>
                    <span class="aspect-name">对分 180°</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>主要相位详解</h3>
            
            <div class="aspects-detailed">
              <div class="aspect-card conjunction">
                <div class="aspect-header">
                  <div class="aspect-symbol-large">☌</div>
                  <div class="aspect-info">
                    <h4>合相 Conjunction</h4>
                    <span class="angle">0° (±8°)</span>
                  </div>
                  <div class="aspect-nature neutral">中性</div>
                </div>
                <div class="aspect-content">
                  <p><strong>基本含义</strong>：两颗行星位置重叠，能量高度融合，相互强化</p>
                  <p><strong>影响特质</strong>：强化、集中、突出、开始</p>
                  <div class="keywords">
                    <span class="keyword">融合</span>
                    <span class="keyword">强化</span>
                    <span class="keyword">集中</span>
                    <span class="keyword">新开始</span>
                  </div>
                  <div class="interpretation">
                    <h5>解读要点</h5>
                    <ul>
                      <li>合相的性质取决于涉及的行星特质</li>
                      <li>通常表示该领域的天赋或强烈驱动力</li>
                      <li>可能产生失衡，需要学会平衡能量</li>
                      <li>代表人生的重要主题和发展方向</li>
                    </ul>
                  </div>
                  <div class="example">
                    <strong>示例</strong>：太阳合金星 - 具有艺术天赋和魅力，重视美感和关系
                  </div>
                </div>
              </div>

              <div class="aspect-card sextile">
                <div class="aspect-header">
                  <div class="aspect-symbol-large">⚹</div>
                  <div class="aspect-info">
                    <h4>六分相 Sextile</h4>
                    <span class="angle">60° (±6°)</span>
                  </div>
                  <div class="aspect-nature harmonious">和谐</div>
                </div>
                <div class="aspect-content">
                  <p><strong>基本含义</strong>：温和的和谐相位，带来机会和潜在天赋</p>
                  <p><strong>影响特质</strong>：机会、天赋、合作、温和支持</p>
                  <div class="keywords">
                    <span class="keyword">机会</span>
                    <span class="keyword">天赋</span>
                    <span class="keyword">合作</span>
                    <span class="keyword">支持</span>
                  </div>
                  <div class="interpretation">
                    <h5>解读要点</h5>
                    <ul>
                      <li>需要主动发掘和利用其潜能</li>
                      <li>通常不会自动显现，需要努力激活</li>
                      <li>代表学习新技能的良好时机</li>
                      <li>有助于建立有益的人际关系</li>
                    </ul>
                  </div>
                  <div class="example">
                    <strong>示例</strong>：水星六分火星 - 思维敏捷，善于表达，具有说服力
                  </div>
                </div>
              </div>

              <div class="aspect-card square">
                <div class="aspect-header">
                  <div class="aspect-symbol-large">□</div>
                  <div class="aspect-info">
                    <h4>四分相 Square</h4>
                    <span class="angle">90° (±8°)</span>
                  </div>
                  <div class="aspect-nature challenging">紧张</div>
                </div>
                <div class="aspect-content">
                  <p><strong>基本含义</strong>：动态的紧张相位，产生内在冲突和行动动力</p>
                  <p><strong>影响特质</strong>：冲突、挑战、动力、成长</p>
                  <div class="keywords">
                    <span class="keyword">冲突</span>
                    <span class="keyword">挑战</span>
                    <span class="keyword">动力</span>
                    <span class="keyword">突破</span>
                  </div>
                  <div class="interpretation">
                    <h5>解读要点</h5>
                    <ul>
                      <li>创造内在动力，推动个人成长</li>
                      <li>需要找到平衡和整合的方式</li>
                      <li>可能带来挫折，但也激发潜能</li>
                      <li>是人生重要的成长契机</li>
                    </ul>
                  </div>
                  <div class="example">
                    <strong>示例</strong>：月亮四分土星 - 情感与责任的冲突，学会平衡感受与义务
                  </div>
                </div>
              </div>

              <div class="aspect-card trine">
                <div class="aspect-header">
                  <div class="aspect-symbol-large">△</div>
                  <div class="aspect-info">
                    <h4>三分相 Trine</h4>
                    <span class="angle">120° (±8°)</span>
                  </div>
                  <div class="aspect-nature harmonious">和谐</div>
                </div>
                <div class="aspect-content">
                  <p><strong>基本含义</strong>：最和谐的相位，能量流动自然顺畅</p>
                  <p><strong>影响特质</strong>：天赋、顺利、自然、创造力</p>
                  <div class="keywords">
                    <span class="keyword">天赋</span>
                    <span class="keyword">顺利</span>
                    <span class="keyword">自然</span>
                    <span class="keyword">创造</span>
                  </div>
                  <div class="interpretation">
                    <h5>解读要点</h5>
                    <ul>
                      <li>代表天生的才华和优势领域</li>
                      <li>能量流动顺畅，少有阻碍</li>
                      <li>可能因太容易而缺乏动力</li>
                      <li>是个人的幸运和保护因子</li>
                    </ul>
                  </div>
                  <div class="example">
                    <strong>示例</strong>：木星三分金星 - 具有艺术天赋，人际关系和谐，财运较好
                  </div>
                </div>
              </div>

              <div class="aspect-card opposition">
                <div class="aspect-header">
                  <div class="aspect-symbol-large">☍</div>
                  <div class="aspect-info">
                    <h4>对分相 Opposition</h4>
                    <span class="angle">180° (±8°)</span>
                  </div>
                  <div class="aspect-nature challenging">紧张</div>
                </div>
                <div class="aspect-content">
                  <p><strong>基本含义</strong>：两极对立的相位，需要寻求平衡和整合</p>
                  <p><strong>影响特质</strong>：对立、平衡、觉知、投射</p>
                  <div class="keywords">
                    <span class="keyword">对立</span>
                    <span class="keyword">平衡</span>
                    <span class="keyword">觉知</span>
                    <span class="keyword">整合</span>
                  </div>
                  <div class="interpretation">
                    <h5>解读要点</h5>
                    <ul>
                      <li>需要在两个极端之间找到平衡</li>
                      <li>常通过关系和外在经历学习</li>
                      <li>可能将内在冲突投射到他人身上</li>
                      <li>最终目标是整合对立的能量</li>
                    </ul>
                  </div>
                  <div class="example">
                    <strong>示例</strong>：太阳对分月亮 - 理性与感性的平衡，个人与家庭的协调
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>次要相位简介</h3>
            
            <div class="minor-aspects">
              <div class="minor-aspect-grid">
                <div class="minor-aspect-item">
                  <div class="minor-symbol">⚺</div>
                  <h5>半六分相 30°</h5>
                  <p>轻微的机会和成长</p>
                </div>
                <div class="minor-aspect-item">
                  <div class="minor-symbol">∠</div>
                  <h5>半四分相 45°</h5>
                  <p>轻微的摩擦和调整</p>
                </div>
                <div class="minor-aspect-item">
                  <div class="minor-symbol">⚽</div>
                  <h5>五分相 72°</h5>
                  <p>创造力和才华</p>
                </div>
                <div class="minor-aspect-item">
                  <div class="minor-symbol">⌘</div>
                  <h5>八分相 135°</h5>
                  <p>持续的内在张力</p>
                </div>
                <div class="minor-aspect-item">
                  <div class="minor-symbol">Q</div>
                  <h5>十分相 36°</h5>
                  <p>精神层面的连接</p>
                </div>
                <div class="minor-aspect-item">
                  <div class="minor-symbol">⚷</div>
                  <h5>补十二分相 150°</h5>
                  <p>需要调整和适应</p>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>相位解读技巧</h3>
            
            <div class="interpretation-techniques">
              <div class="technique-section">
                <h4>🔍 相位分析步骤</h4>
                <div class="analysis-flow">
                  <div class="flow-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h5>识别相位类型</h5>
                      <p>确定角度和相位性质（和谐/紧张/中性）</p>
                    </div>
                  </div>
                  <div class="flow-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h5>分析涉及行星</h5>
                      <p>理解两颗行星的基本能量和象征意义</p>
                    </div>
                  </div>
                  <div class="flow-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h5>考虑宫位背景</h5>
                      <p>结合行星所在宫位的生活领域</p>
                    </div>
                  </div>
                  <div class="flow-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h5>整合全面解读</h5>
                      <p>将相位含义融入整体星盘分析</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="technique-section">
                <h4>💡 实用解读技巧</h4>
                <div class="tips-grid">
                  <div class="tip-card">
                    <h5>相位容差判断</h5>
                    <p>越紧密的相位影响越强烈，尤其是容差在3度以内的精确相位。</p>
                  </div>
                  <div class="tip-card">
                    <h5>应用与分离</h5>
                    <p>应用相位（逐渐靠近）比分离相位（逐渐远离）影响更强。</p>
                  </div>
                  <div class="tip-card">
                    <h5>行星重要性</h5>
                    <p>涉及个人行星（太阳到火星）的相位比外行星相位更直接影响个性。</p>
                  </div>
                  <div class="tip-card">
                    <h5>相位模式</h5>
                    <p>注意T三角、大三角、大十字等相位图形，它们有特殊意义。</p>
                  </div>
                </div>
              </div>

              <div class="technique-section">
                <h4>⚡ 常见相位组合</h4>
                <div class="combinations">
                  <div class="combination-item">
                    <strong>太阳-月亮相位</strong>
                    <p>内在自我与情感需求的关系，影响个性的统一性和内在平衡。</p>
                  </div>
                  <div class="combination-item">
                    <strong>金星-火星相位</strong>
                    <p>爱情与激情的结合，影响感情关系和创造力的表达方式。</p>
                  </div>
                  <div class="combination-item">
                    <strong>水星-木星相位</strong>
                    <p>思维与智慧的连接，影响学习能力和哲学观念的形成。</p>
                  </div>
                  <div class="combination-item">
                    <strong>土星相位</strong>
                    <p>涉及土星的相位常指向需要承担责任和面对挑战的生活领域。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>相位练习</h3>
          <div class="practice-box">
            <p>通过实际案例练习相位分析，提升解读星盘中行星互动关系的能力。开始您的相位解读之旅！</p>
            <button class="practice-btn" @click="startPractice">
              分析我的相位配置
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/astrology/houses" class="nav-btn prev-btn">
            ← 上一课：宫位详解
          </router-link>
          <router-link to="/learn/astrology/birth-chart" class="nav-btn next-btn">
            下一课：星盘综合解读 →
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
  name: 'AstrologyAspects',
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
    document.title = '相位详解 - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '深入学习占星学相位系统，掌握行星间角度关系的含义，理解和谐与紧张相位的影响。')
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
  background: #e67e22;
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

/* Aspect Basics */
.aspect-basics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin: 25px 0;
}

.concept-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #9b59b6;
}

.concept-card h4 {
  color: #9b59b6;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.formula-box {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  border-left: 3px solid #9b59b6;
}

.formula-box strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 8px;
}

.formula-box small {
  color: #666;
  font-style: italic;
}

/* Aspect Categories */
.aspect-categories {
  display: grid;
  gap: 15px;
  margin-top: 15px;
}

.category {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
}

.category .icon {
  font-size: 1.5rem;
}

.category strong {
  display: block;
  margin-bottom: 3px;
  color: #2c3e50;
}

.category p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.category small {
  font-size: 0.8rem;
  color: #999;
}

/* Aspect Wheel */
.aspect-wheel {
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.wheel-visual {
  position: relative;
  width: 350px;
  height: 350px;
}

.circle-chart {
  position: relative;
  width: 100%;
  height: 100%;
  border: 3px solid #9b59b6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center {
  position: absolute;
  background: #9b59b6;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  z-index: 10;
}

.aspect-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  height: 2px;
  transform-origin: 0 0;
  transform: rotate(var(--angle)) translateY(-1px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.aspect-line.conjunction { background: #34495e; }
.aspect-line.sextile { background: #27ae60; }
.aspect-line.square { background: #e74c3c; }
.aspect-line.trine { background: #f39c12; }
.aspect-line.opposition { background: #8e44ad; }

.aspect-symbol {
  background: white;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  transform: rotate(calc(-1 * var(--angle)));
}

.aspect-name {
  background: white;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  transform: rotate(calc(-1 * var(--angle)));
  white-space: nowrap;
}

/* Aspects Detailed */
.aspects-detailed {
  display: grid;
  gap: 25px;
  margin: 25px 0;
}

.aspect-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.aspect-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.aspect-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.aspect-symbol-large {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin-right: 15px;
}

.aspect-info {
  flex: 1;
}

.aspect-info h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.3rem;
  font-family: 'Shippori Mincho', serif;
}

.angle {
  color: #666;
  font-size: 0.9rem;
}

.aspect-nature {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.aspect-nature.harmonious { background: #27ae60; }
.aspect-nature.challenging { background: #e74c3c; }
.aspect-nature.neutral { background: #95a5a6; }

.aspect-content p {
  margin-bottom: 10px;
  line-height: 1.5;
  font-size: 0.9rem;
}

.aspect-content strong {
  color: #9b59b6;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 15px 0;
}

.keyword {
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 3px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

.interpretation {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.interpretation h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.interpretation ul {
  padding-left: 15px;
  margin: 0;
}

.interpretation li {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

.example {
  background: #fff3e0;
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid #f39c12;
}

.example strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 5px;
}

/* Minor Aspects */
.minor-aspects {
  margin: 25px 0;
}

.minor-aspect-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.minor-aspect-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border-left: 3px solid #9b59b6;
}

.minor-symbol {
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #9b59b6;
}

.minor-aspect-item h5 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-family: 'Shippori Mincho', serif;
}

.minor-aspect-item p {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

/* Interpretation Techniques */
.interpretation-techniques {
  display: grid;
  gap: 25px;
  margin: 25px 0;
}

.technique-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #9b59b6;
}

.technique-section h4 {
  color: #9b59b6;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

/* Analysis Flow */
.analysis-flow {
  display: grid;
  gap: 15px;
}

.flow-step {
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
  background: #9b59b6;
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

/* Tips Grid */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.tip-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #9b59b6;
}

.tip-card h5 {
  color: #2c3e50;
  margin: 0 0 8px 0;
  font-family: 'Shippori Mincho', serif;
}

.tip-card p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Combinations */
.combinations {
  display: grid;
  gap: 15px;
}

.combination-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #9b59b6;
}

.combination-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
}

.combination-item p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Practice and Navigation */
.practice-box {
  background: #fff;
  border: 2px solid #9b59b6;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
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
  box-shadow: 0 6px 20px rgba(155, 89, 182, 0.3);
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
  color: #9b59b6;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #9b59b6;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #9b59b6;
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
  
  .aspect-basics {
    grid-template-columns: 1fr;
  }
  
  .wheel-visual {
    width: 280px;
    height: 280px;
  }
  
  .aspect-line {
    width: 110px;
  }
  
  .aspect-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .minor-aspect-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
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
  
  .wheel-visual {
    width: 240px;
    height: 240px;
  }
  
  .aspect-line {
    width: 90px;
  }
  
  .center {
    width: 60px;
    height: 60px;
    font-size: 0.8rem;
  }
  
  .aspect-symbol-large {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
}
</style>