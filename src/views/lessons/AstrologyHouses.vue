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
        <span class="current">{{ $t('lesson.lessonContent.astrologyHouses.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.astrologyHouses.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.astrology') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.intermediate') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 22 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.astrologyHouses.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.astrologyHouses.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyHouses.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyHouses.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyHouses.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>宫位系统概述</h3>
            
            <div class="houses-wheel">
              <div class="wheel-container">
                <div class="center-circle">
                  <h4>宫位轮</h4>
                  <p>生活的十二个领域</p>
                </div>
                
                <div class="house-segments">
                  <div class="house-segment house-1" style="--angle: 0deg">
                    <div class="house-number">1</div>
                    <div class="house-name">自我</div>
                  </div>
                  <div class="house-segment house-2" style="--angle: 30deg">
                    <div class="house-number">2</div>
                    <div class="house-name">财富</div>
                  </div>
                  <div class="house-segment house-3" style="--angle: 60deg">
                    <div class="house-number">3</div>
                    <div class="house-name">沟通</div>
                  </div>
                  <div class="house-segment house-4" style="--angle: 90deg">
                    <div class="house-number">4</div>
                    <div class="house-name">家庭</div>
                  </div>
                  <div class="house-segment house-5" style="--angle: 120deg">
                    <div class="house-number">5</div>
                    <div class="house-name">创造</div>
                  </div>
                  <div class="house-segment house-6" style="--angle: 150deg">
                    <div class="house-number">6</div>
                    <div class="house-name">健康</div>
                  </div>
                  <div class="house-segment house-7" style="--angle: 180deg">
                    <div class="house-number">7</div>
                    <div class="house-name">关系</div>
                  </div>
                  <div class="house-segment house-8" style="--angle: 210deg">
                    <div class="house-number">8</div>
                    <div class="house-name">转化</div>
                  </div>
                  <div class="house-segment house-9" style="--angle: 240deg">
                    <div class="house-number">9</div>
                    <div class="house-name">哲学</div>
                  </div>
                  <div class="house-segment house-10" style="--angle: 270deg">
                    <div class="house-number">10</div>
                    <div class="house-name">事业</div>
                  </div>
                  <div class="house-segment house-11" style="--angle: 300deg">
                    <div class="house-number">11</div>
                    <div class="house-name">理想</div>
                  </div>
                  <div class="house-segment house-12" style="--angle: 330deg">
                    <div class="house-number">12</div>
                    <div class="house-name">精神</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="house-categories">
              <div class="category-group angular">
                <h4>🎯 基本宫位 (Angular Houses)</h4>
                <p>第1、4、7、10宫 - 行动力和重要性的宫位</p>
                <div class="houses-list">
                  <span class="house-tag">1宫-自我</span>
                  <span class="house-tag">4宫-家庭</span>
                  <span class="house-tag">7宫-关系</span>
                  <span class="house-tag">10宫-事业</span>
                </div>
              </div>

              <div class="category-group succedent">
                <h4>🏗️ 固定宫位 (Succedent Houses)</h4>
                <p>第2、5、8、11宫 - 稳定和资源的宫位</p>
                <div class="houses-list">
                  <span class="house-tag">2宫-财富</span>
                  <span class="house-tag">5宫-创造</span>
                  <span class="house-tag">8宫-转化</span>
                  <span class="house-tag">11宫-理想</span>
                </div>
              </div>

              <div class="category-group cadent">
                <h4>🌀 变动宫位 (Cadent Houses)</h4>
                <p>第3、6、9、12宫 - 学习和适应的宫位</p>
                <div class="houses-list">
                  <span class="house-tag">3宫-沟通</span>
                  <span class="house-tag">6宫-健康</span>
                  <span class="house-tag">9宫-哲学</span>
                  <span class="house-tag">12宫-精神</span>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>十二宫位详解</h3>
            
            <div class="houses-detailed">
              <div class="house-card first-house">
                <div class="house-header">
                  <div class="house-symbol">1</div>
                  <div class="house-info">
                    <h4>第一宫 - 自我宫</h4>
                    <span class="natural-sign">白羊座 | 火星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我是谁、个性、外表、第一印象</p>
                  <p><strong>生活领域</strong>：个人身份认同、外在形象、体质健康、自我表达方式</p>
                  <p><strong>代表意义</strong>：第一宫是个人的门面，显示我们如何呈现自己给世界，以及他人对我们的第一印象。</p>
                  <div class="keywords">
                    <span class="keyword">个性</span>
                    <span class="keyword">外表</span>
                    <span class="keyword">开始</span>
                    <span class="keyword">活力</span>
                  </div>
                </div>
              </div>

              <div class="house-card second-house">
                <div class="house-header">
                  <div class="house-symbol">2</div>
                  <div class="house-info">
                    <h4>第二宫 - 财富宫</h4>
                    <span class="natural-sign">金牛座 | 金星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我拥有什么、物质、价值观、安全感</p>
                  <p><strong>生活领域</strong>：个人财务、物质享受、价值观念、自我价值、赚钱能力</p>
                  <p><strong>代表意义</strong>：第二宫反映我们的物质需求、理财方式以及对安全感的追求。</p>
                  <div class="keywords">
                    <span class="keyword">金钱</span>
                    <span class="keyword">物质</span>
                    <span class="keyword">价值</span>
                    <span class="keyword">安全</span>
                  </div>
                </div>
              </div>

              <div class="house-card third-house">
                <div class="house-header">
                  <div class="house-symbol">3</div>
                  <div class="house-info">
                    <h4>第三宫 - 沟通宫</h4>
                    <span class="natural-sign">双子座 | 水星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我思考什么、沟通、学习、兄弟姐妹</p>
                  <p><strong>生活领域</strong>：日常沟通、学习能力、短途旅行、邻里关系、兄弟姐妹</p>
                  <p><strong>代表意义</strong>：第三宫显示我们的沟通方式、学习偏好以及处理日常信息的能力。</p>
                  <div class="keywords">
                    <span class="keyword">沟通</span>
                    <span class="keyword">学习</span>
                    <span class="keyword">兄弟</span>
                    <span class="keyword">旅行</span>
                  </div>
                </div>
              </div>

              <div class="house-card fourth-house">
                <div class="house-header">
                  <div class="house-symbol">4</div>
                  <div class="house-info">
                    <h4>第四宫 - 家庭宫</h4>
                    <span class="natural-sign">巨蟹座 | 月亮</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我的根源、家庭、母亲、内心深处</p>
                  <p><strong>生活领域</strong>：家庭关系、房产、童年回忆、情感安全、母亲关系</p>
                  <p><strong>代表意义</strong>：第四宫代表我们的根基、内心世界以及最私密的情感需求。</p>
                  <div class="keywords">
                    <span class="keyword">家庭</span>
                    <span class="keyword">根源</span>
                    <span class="keyword">母亲</span>
                    <span class="keyword">安全</span>
                  </div>
                </div>
              </div>

              <div class="house-card fifth-house">
                <div class="house-header">
                  <div class="house-symbol">5</div>
                  <div class="house-info">
                    <h4>第五宫 - 创造宫</h4>
                    <span class="natural-sign">狮子座 | 太阳</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我创造什么、爱情、子女、娱乐</p>
                  <p><strong>生活领域</strong>：创造力、浪漫爱情、子女关系、艺术才华、娱乐休闲</p>
                  <p><strong>代表意义</strong>：第五宫展现我们的创造天赋、恋爱模式以及如何表达快乐。</p>
                  <div class="keywords">
                    <span class="keyword">创造</span>
                    <span class="keyword">爱情</span>
                    <span class="keyword">子女</span>
                    <span class="keyword">艺术</span>
                  </div>
                </div>
              </div>

              <div class="house-card sixth-house">
                <div class="house-header">
                  <div class="house-symbol">6</div>
                  <div class="house-info">
                    <h4>第六宫 - 健康宫</h4>
                    <span class="natural-sign">处女座 | 水星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我如何服务、工作、健康、日常习惯</p>
                  <p><strong>生活领域</strong>：健康状况、工作环境、日常例行事务、服务态度、宠物</p>
                  <p><strong>代表意义</strong>：第六宫关注我们的健康管理、工作习惯以及对完美的追求。</p>
                  <div class="keywords">
                    <span class="keyword">健康</span>
                    <span class="keyword">工作</span>
                    <span class="keyword">服务</span>
                    <span class="keyword">习惯</span>
                  </div>
                </div>
              </div>

              <div class="house-card seventh-house">
                <div class="house-header">
                  <div class="house-symbol">7</div>
                  <div class="house-info">
                    <h4>第七宫 - 关系宫</h4>
                    <span class="natural-sign">天秤座 | 金星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我如何合作、婚姻、伙伴、公开敌人</p>
                  <p><strong>生活领域</strong>：婚姻关系、商业伙伴、法律事务、公开竞争、合作模式</p>
                  <p><strong>代表意义</strong>：第七宫反映我们的伙伴关系、合作方式以及寻求平衡的需求。</p>
                  <div class="keywords">
                    <span class="keyword">伙伴</span>
                    <span class="keyword">婚姻</span>
                    <span class="keyword">合作</span>
                    <span class="keyword">平衡</span>
                  </div>
                </div>
              </div>

              <div class="house-card eighth-house">
                <div class="house-header">
                  <div class="house-symbol">8</div>
                  <div class="house-info">
                    <h4>第八宫 - 转化宫</h4>
                    <span class="natural-sign">天蝎座 | 冥王星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我如何转化、共同财产、神秘、重生</p>
                  <p><strong>生活领域</strong>：投资理财、税务保险、心理深度、性生活、死亡与重生</p>
                  <p><strong>代表意义</strong>：第八宫涉及深层转化、共享资源以及生命的神秘面向。</p>
                  <div class="keywords">
                    <span class="keyword">转化</span>
                    <span class="keyword">投资</span>
                    <span class="keyword">神秘</span>
                    <span class="keyword">重生</span>
                  </div>
                </div>
              </div>

              <div class="house-card ninth-house">
                <div class="house-header">
                  <div class="house-symbol">9</div>
                  <div class="house-info">
                    <h4>第九宫 - 哲学宫</h4>
                    <span class="natural-sign">射手座 | 木星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我相信什么、高等教育、哲学、远行</p>
                  <p><strong>生活领域</strong>：哲学信念、高等教育、远途旅行、宗教信仰、出版发表</p>
                  <p><strong>代表意义</strong>：第九宫展现我们的世界观、学术追求以及精神探索。</p>
                  <div class="keywords">
                    <span class="keyword">哲学</span>
                    <span class="keyword">教育</span>
                    <span class="keyword">信仰</span>
                    <span class="keyword">远行</span>
                  </div>
                </div>
              </div>

              <div class="house-card tenth-house">
                <div class="house-header">
                  <div class="house-symbol">10</div>
                  <div class="house-info">
                    <h4>第十宫 - 事业宫</h4>
                    <span class="natural-sign">摩羯座 | 土星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我的成就、事业、声誉、父亲</p>
                  <p><strong>生活领域</strong>：职业发展、社会地位、公众形象、权威关系、父亲角色</p>
                  <p><strong>代表意义</strong>：第十宫代表我们的事业抱负、社会成就以及如何被外界认知。</p>
                  <div class="keywords">
                    <span class="keyword">事业</span>
                    <span class="keyword">成就</span>
                    <span class="keyword">声誉</span>
                    <span class="keyword">权威</span>
                  </div>
                </div>
              </div>

              <div class="house-card eleventh-house">
                <div class="house-header">
                  <div class="house-symbol">11</div>
                  <div class="house-info">
                    <h4>第十一宫 - 理想宫</h4>
                    <span class="natural-sign">水瓶座 | 天王星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我的希望、朋友、团体、社会理想</p>
                  <p><strong>生活领域</strong>：友谊关系、社交团体、人生理想、社会改革、集体活动</p>
                  <p><strong>代表意义</strong>：第十一宫反映我们的社交圈、人生愿景以及对未来的期待。</p>
                  <div class="keywords">
                    <span class="keyword">朋友</span>
                    <span class="keyword">理想</span>
                    <span class="keyword">团体</span>
                    <span class="keyword">未来</span>
                  </div>
                </div>
              </div>

              <div class="house-card twelfth-house">
                <div class="house-header">
                  <div class="house-symbol">12</div>
                  <div class="house-info">
                    <h4>第十二宫 - 精神宫</h4>
                    <span class="natural-sign">双鱼座 | 海王星</span>
                  </div>
                </div>
                <div class="house-content">
                  <p><strong>关键词</strong>：我的潜意识、隐秘、牺牲、精神修行</p>
                  <p><strong>生活领域</strong>：潜意识、隐秘敌人、慈善服务、精神修行、宿命因果</p>
                  <p><strong>代表意义</strong>：第十二宫涉及我们的内心世界、精神成长以及超越物质的追求。</p>
                  <div class="keywords">
                    <span class="keyword">潜意识</span>
                    <span class="keyword">精神</span>
                    <span class="keyword">牺牲</span>
                    <span class="keyword">超越</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>宫位解读技巧</h3>
            
            <div class="interpretation-guide">
              <div class="guide-section">
                <h4>🎯 行星落宫分析</h4>
                <div class="analysis-steps">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h5>确定行星位置</h5>
                      <p>找出每颗行星落在哪个宫位</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h5>理解宫位意义</h5>
                      <p>分析该宫位代表的生活领域</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h5>结合行星能量</h5>
                      <p>将行星特质与宫位主题融合</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h5>考虑相位影响</h5>
                      <p>分析其他行星的相位影响</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="guide-section">
                <h4>💡 实用解读示例</h4>
                <div class="examples">
                  <div class="example">
                    <strong>太阳在第10宫</strong>
                    <p>个人身份与事业成就密切相关，渴望在职场上发光发热，具有天生的领导能力和野心。</p>
                  </div>
                  <div class="example">
                    <strong>金星在第5宫</strong>
                    <p>在创造和娱乐中找到快乐，具有艺术天赋，浪漫的恋爱观，可能通过才华获得赞赏。</p>
                  </div>
                  <div class="example">
                    <strong>火星在第6宫</strong>
                    <p>在工作中充满活力和竞争力，注重效率和实际成果，可能容易过度劳累。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>宫位练习</h3>
          <div class="practice-box">
            <p>通过练习分析行星落宫，加深对宫位系统的理解。制作属于您的个人宫位分析图表！</p>
            <button class="practice-btn" @click="startPractice">
              分析我的宫位配置
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/astrology/planets" class="nav-btn prev-btn">
            ← 上一课：行星详解
          </router-link>
          <router-link to="/learn/astrology/aspects" class="nav-btn next-btn">
            下一课：相位详解 →
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
  name: 'AstrologyHouses',
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
    document.title = '宫位详解 - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '深入学习占星学十二宫位系统，理解宫位与生活领域的对应关系，掌握行星落宫分析技巧。')
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

/* Houses Wheel */
.houses-wheel {
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.wheel-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 20px auto;
}

.center-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  z-index: 10;
}

.center-circle h4 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  font-family: 'Shippori Mincho', serif;
}

.center-circle p {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.9;
}

.house-segments {
  position: relative;
  width: 100%;
  height: 100%;
}

.house-segment {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  transform-origin: 0 0;
  transform: rotate(var(--angle)) translateX(140px) rotate(calc(-1 * var(--angle)));
}

.house-segment {
  background: white;
  border: 2px solid #e67e22;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.house-segment:hover {
  background: #e67e22;
  color: white;
  transform: rotate(var(--angle)) translateX(140px) rotate(calc(-1 * var(--angle))) scale(1.1);
}

.house-number {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.house-name {
  font-size: 0.8rem;
  font-weight: 500;
}

/* House Categories */
.house-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.category-group {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #e67e22;
}

.category-group h4 {
  color: #e67e22;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.category-group p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
}

.houses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.house-tag {
  background: #e67e22;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Houses Detailed */
.houses-detailed {
  display: grid;
  gap: 20px;
  margin: 25px 0;
}

.house-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.house-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.house-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.house-symbol {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 15px;
}

.house-info {
  flex: 1;
}

.house-info h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.2rem;
  font-family: 'Shippori Mincho', serif;
}

.natural-sign {
  color: #666;
  font-size: 0.9rem;
}

.house-content p {
  margin-bottom: 8px;
  line-height: 1.5;
  font-size: 0.9rem;
}

.house-content strong {
  color: #e67e22;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 15px;
}

.keyword {
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 3px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Interpretation Guide */
.interpretation-guide {
  display: grid;
  gap: 25px;
  margin: 25px 0;
}

.guide-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #e67e22;
}

.guide-section h4 {
  color: #e67e22;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

/* Analysis Steps */
.analysis-steps {
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
  background: #e67e22;
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

/* Examples */
.examples {
  display: grid;
  gap: 15px;
}

.example {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #e67e22;
}

.example strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
}

.example p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Practice and Navigation */
.practice-box {
  background: #fff;
  border: 2px solid #667eea;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
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
  color: #e67e22;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #e67e22;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #e67e22;
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
  
  .wheel-container {
    width: 300px;
    height: 300px;
  }
  
  .center-circle {
    width: 100px;
    height: 100px;
  }
  
  .house-segment {
    width: 60px;
    height: 60px;
    margin: -30px 0 0 -30px;
    transform: rotate(var(--angle)) translateX(100px) rotate(calc(-1 * var(--angle)));
  }
  
  .house-segment:hover {
    transform: rotate(var(--angle)) translateX(100px) rotate(calc(-1 * var(--angle))) scale(1.1);
  }
  
  .house-categories {
    grid-template-columns: 1fr;
  }
  
  .house-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .interpretation-guide {
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
  
  .wheel-container {
    width: 250px;
    height: 250px;
  }
  
  .center-circle {
    width: 80px;
    height: 80px;
  }
  
  .house-segment {
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    transform: rotate(var(--angle)) translateX(80px) rotate(calc(-1 * var(--angle)));
  }
  
  .house-segment:hover {
    transform: rotate(var(--angle)) translateX(80px) rotate(calc(-1 * var(--angle))) scale(1.1);
  }
  
  .house-number {
    font-size: 1rem;
  }
  
  .house-name {
    font-size: 0.7rem;
  }
}
</style>