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
        <span class="current">{{ $t('lesson.lessonContent.astrologyZodiacSigns.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.astrologyZodiacSigns.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.astrology') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.beginner') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 18 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.astrologyZodiacSigns.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.astrologyZodiacSigns.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyZodiacSigns.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyZodiacSigns.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyZodiacSigns.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.astrologyZodiacSigns.classification.title') }}</h3>
            
            <div class="classification-grid">
              <div class="classification-card elements">
                <h4>{{ $t('lesson.lessonContent.astrologyZodiacSigns.classification.elements.title') }}</h4>
                <div class="element-items">
                  <div class="element fire">
                    <span class="icon">🔥</span>
                    <div>
                      <strong>火象星座</strong>
                      <p>白羊、狮子、射手</p>
                      <small>热情、主动、直觉</small>
                    </div>
                  </div>
                  <div class="element earth">
                    <span class="icon">🌱</span>
                    <div>
                      <strong>土象星座</strong>
                      <p>金牛、处女、摩羯</p>
                      <small>实际、稳定、务实</small>
                    </div>
                  </div>
                  <div class="element air">
                    <span class="icon">💨</span>
                    <div>
                      <strong>风象星座</strong>
                      <p>双子、天秤、水瓶</p>
                      <small>理性、沟通、社交</small>
                    </div>
                  </div>
                  <div class="element water">
                    <span class="icon">💧</span>
                    <div>
                      <strong>水象星座</strong>
                      <p>巨蟹、天蝎、双鱼</p>
                      <small>感性、直觉、深度</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="classification-card modes">
                <h4>三模式分类</h4>
                <div class="mode-items">
                  <div class="mode cardinal">
                    <strong>基本星座</strong>
                    <p>白羊、巨蟹、天秤、摩羯</p>
                    <small>开创、领导、启动</small>
                  </div>
                  <div class="mode fixed">
                    <strong>固定星座</strong>
                    <p>金牛、狮子、天蝎、水瓶</p>
                    <small>稳定、坚持、专注</small>
                  </div>
                  <div class="mode mutable">
                    <strong>变动星座</strong>
                    <p>双子、处女、射手、双鱼</p>
                    <small>适应、变化、灵活</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>十二星座详解</h3>
            
            <div class="zodiac-signs">
              <div class="sign-card aries">
                <div class="sign-header">
                  <span class="symbol">♈</span>
                  <div class="sign-info">
                    <h4>白羊座 Aries</h4>
                    <span class="dates">3月21日 - 4月19日</span>
                  </div>
                  <div class="traits">
                    <span class="element fire">火象</span>
                    <span class="mode cardinal">基本</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：火星</p>
                  <p><strong>关键词</strong>：我是、行动、勇气、领导</p>
                  <p><strong>性格特质</strong>：充满活力、勇于冒险、直来直往、天生领导者，但有时冲动急躁</p>
                  <p><strong>优点</strong>：勇敢、热情、坦诚、积极主动</p>
                  <p><strong>挑战</strong>：缺乏耐心、冲动行事、自我中心</p>
                </div>
              </div>

              <div class="sign-card taurus">
                <div class="sign-header">
                  <span class="symbol">♉</span>
                  <div class="sign-info">
                    <h4>金牛座 Taurus</h4>
                    <span class="dates">4月20日 - 5月20日</span>
                  </div>
                  <div class="traits">
                    <span class="element earth">土象</span>
                    <span class="mode fixed">固定</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：金星</p>
                  <p><strong>关键词</strong>：我拥有、稳定、美感、享受</p>
                  <p><strong>性格特质</strong>：稳重可靠、重视物质享受、有艺术品味、坚持不懈，但有时固执己见</p>
                  <p><strong>优点</strong>：可靠、耐心、务实、有毅力</p>
                  <p><strong>挑战</strong>：固执、抗拒变化、物质主义</p>
                </div>
              </div>

              <div class="sign-card gemini">
                <div class="sign-header">
                  <span class="symbol">♊</span>
                  <div class="sign-info">
                    <h4>双子座 Gemini</h4>
                    <span class="dates">5月21日 - 6月20日</span>
                  </div>
                  <div class="traits">
                    <span class="element air">风象</span>
                    <span class="mode mutable">变动</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：水星</p>
                  <p><strong>关键词</strong>：我思考、沟通、好奇、多样</p>
                  <p><strong>性格特质</strong>：聪明机智、善于沟通、适应力强、兴趣广泛，但有时三分钟热度</p>
                  <p><strong>优点</strong>：聪明、有趣、适应性强、沟通能力佳</p>
                  <p><strong>挑战</strong>：善变、缺乏专注、表面化</p>
                </div>
              </div>

              <div class="sign-card cancer">
                <div class="sign-header">
                  <span class="symbol">♋</span>
                  <div class="sign-info">
                    <h4>巨蟹座 Cancer</h4>
                    <span class="dates">6月21日 - 7月22日</span>
                  </div>
                  <div class="traits">
                    <span class="element water">水象</span>
                    <span class="mode cardinal">基本</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：月亮</p>
                  <p><strong>关键词</strong>：我感受、家庭、保护、滋养</p>
                  <p><strong>性格特质</strong>：情感丰富、重视家庭、直觉敏锐、善于照顾他人，但有时情绪化</p>
                  <p><strong>优点</strong>：体贴、忠诚、直觉强、保护欲强</p>
                  <p><strong>挑战</strong>：情绪化、敏感、过度保护</p>
                </div>
              </div>

              <div class="sign-card leo">
                <div class="sign-header">
                  <span class="symbol">♌</span>
                  <div class="sign-info">
                    <h4>狮子座 Leo</h4>
                    <span class="dates">7月23日 - 8月22日</span>
                  </div>
                  <div class="traits">
                    <span class="element fire">火象</span>
                    <span class="mode fixed">固定</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：太阳</p>
                  <p><strong>关键词</strong>：我创造、自信、表演、荣耀</p>
                  <p><strong>性格特质</strong>：自信大方、富有创造力、喜欢被关注、慷慨大方，但有时自负</p>
                  <p><strong>优点</strong>：自信、慷慨、有魅力、创造力强</p>
                  <p><strong>挑战</strong>：自负、爱面子、控制欲强</p>
                </div>
              </div>

              <div class="sign-card virgo">
                <div class="sign-header">
                  <span class="symbol">♍</span>
                  <div class="sign-info">
                    <h4>处女座 Virgo</h4>
                    <span class="dates">8月23日 - 9月22日</span>
                  </div>
                  <div class="traits">
                    <span class="element earth">土象</span>
                    <span class="mode mutable">变动</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：水星</p>
                  <p><strong>关键词</strong>：我分析、完美、服务、细节</p>
                  <p><strong>性格特质</strong>：注重细节、追求完美、服务意识强、分析能力佳，但有时过于挑剔</p>
                  <p><strong>优点</strong>：细心、可靠、有组织、实用主义</p>
                  <p><strong>挑战</strong>：完美主义、挑剔、担忧过度</p>
                </div>
              </div>

              <div class="sign-card libra">
                <div class="sign-header">
                  <span class="symbol">♎</span>
                  <div class="sign-info">
                    <h4>天秤座 Libra</h4>
                    <span class="dates">9月23日 - 10月22日</span>
                  </div>
                  <div class="traits">
                    <span class="element air">风象</span>
                    <span class="mode cardinal">基本</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：金星</p>
                  <p><strong>关键词</strong>：我平衡、和谐、美感、合作</p>
                  <p><strong>性格特质</strong>：追求和谐、富有美感、善于合作、公正客观，但有时优柔寡断</p>
                  <p><strong>优点</strong>：外交手腕、审美能力、公正、合作精神</p>
                  <p><strong>挑战</strong>：优柔寡断、避免冲突、依赖他人</p>
                </div>
              </div>

              <div class="sign-card scorpio">
                <div class="sign-header">
                  <span class="symbol">♏</span>
                  <div class="sign-info">
                    <h4>天蝎座 Scorpio</h4>
                    <span class="dates">10月23日 - 11月21日</span>
                  </div>
                  <div class="traits">
                    <span class="element water">水象</span>
                    <span class="mode fixed">固定</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：冥王星、火星</p>
                  <p><strong>关键词</strong>：我转化、深度、神秘、重生</p>
                  <p><strong>性格特质</strong>：神秘深邃、意志坚强、洞察力强、情感深刻，但有时过于激烈</p>
                  <p><strong>优点</strong>：洞察力、意志力、忠诚、深度</p>
                  <p><strong>挑战</strong>：嫉妒、报复心、过于神秘</p>
                </div>
              </div>

              <div class="sign-card sagittarius">
                <div class="sign-header">
                  <span class="symbol">♐</span>
                  <div class="sign-info">
                    <h4>射手座 Sagittarius</h4>
                    <span class="dates">11月22日 - 12月21日</span>
                  </div>
                  <div class="traits">
                    <span class="element fire">火象</span>
                    <span class="mode mutable">变动</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：木星</p>
                  <p><strong>关键词</strong>：我探索、自由、哲学、扩展</p>
                  <p><strong>性格特质</strong>：热爱自由、富有哲思、乐观开朗、爱好探险，但有时过于直接</p>
                  <p><strong>优点</strong>：乐观、诚实、冒险精神、哲学思维</p>
                  <p><strong>挑战</strong>：不负责任、言语直接、缺乏耐心</p>
                </div>
              </div>

              <div class="sign-card capricorn">
                <div class="sign-header">
                  <span class="symbol">♑</span>
                  <div class="sign-info">
                    <h4>摩羯座 Capricorn</h4>
                    <span class="dates">12月22日 - 1月19日</span>
                  </div>
                  <div class="traits">
                    <span class="element earth">土象</span>
                    <span class="mode cardinal">基本</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：土星</p>
                  <p><strong>关键词</strong>：我成就、责任、结构、权威</p>
                  <p><strong>性格特质</strong>：有责任感、目标明确、踏实稳重、重视成就，但有时过于严肃</p>
                  <p><strong>优点</strong>：责任感、毅力、实际、组织能力</p>
                  <p><strong>挑战</strong>：悲观、严肃、功利主义</p>
                </div>
              </div>

              <div class="sign-card aquarius">
                <div class="sign-header">
                  <span class="symbol">♒</span>
                  <div class="sign-info">
                    <h4>水瓶座 Aquarius</h4>
                    <span class="dates">1月20日 - 2月18日</span>
                  </div>
                  <div class="traits">
                    <span class="element air">风象</span>
                    <span class="mode fixed">固定</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：天王星、土星</p>
                  <p><strong>关键词</strong>：我了解、创新、人道、未来</p>
                  <p><strong>性格特质</strong>：独立自主、思想前卫、富有创新精神、关心社会，但有时过于疏离</p>
                  <p><strong>优点</strong>：独立、创新、人道主义、客观</p>
                  <p><strong>挑战</strong>：疏离、叛逆、不可预测</p>
                </div>
              </div>

              <div class="sign-card pisces">
                <div class="sign-header">
                  <span class="symbol">♓</span>
                  <div class="sign-info">
                    <h4>双鱼座 Pisces</h4>
                    <span class="dates">2月19日 - 3月20日</span>
                  </div>
                  <div class="traits">
                    <span class="element water">水象</span>
                    <span class="mode mutable">变动</span>
                  </div>
                </div>
                <div class="sign-content">
                  <p><strong>守护星</strong>：海王星、木星</p>
                  <p><strong>关键词</strong>：我相信、同理心、想象、灵性</p>
                  <p><strong>性格特质</strong>：富有同理心、想象力丰富、直觉敏锐、具有艺术天赋，但有时逃避现实</p>
                  <p><strong>优点</strong>：同理心、直觉、创意、灵性</p>
                  <p><strong>挑战</strong>：逃避现实、过于敏感、缺乏界限</p>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>星座应用指南</h3>
            <div class="application-guide">
              <div class="guide-item">
                <h4>🔍 自我了解</h4>
                <p>通过了解你的太阳星座、月亮星座和上升星座，可以更全面地认识自己的性格特质、情感需求和外在表现。</p>
              </div>
              <div class="guide-item">
                <h4>💕 关系相处</h4>
                <p>理解不同星座的沟通方式和需求，有助于改善人际关系，增进彼此的理解和包容。</p>
              </div>
              <div class="guide-item">
                <h4>💼 职业选择</h4>
                <p>每个星座都有其独特的天赋和优势，了解星座特质可以帮助选择适合的职业方向。</p>
              </div>
              <div class="guide-item">
                <h4>📈 个人成长</h4>
                <p>认识星座的挑战和成长方向，可以帮助我们有针对性地进行自我提升和完善。</p>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>星座探索</h3>
          <div class="practice-box">
            <p>现在您已经了解了十二星座的特征，让我们来探索您的完整星座构成吧！</p>
            <button class="practice-btn" @click="startPractice">
              制作我的星座档案
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/astrology/introduction" class="nav-btn prev-btn">
            ← 上一课：占星学入门
          </router-link>
          <router-link to="/learn/astrology/planets" class="nav-btn next-btn">
            下一课：行星详解 →
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
  name: 'AstrologyZodiacSigns',
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
    document.title = '十二星座详解 - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '深入了解十二星座的性格特征、优缺点和象征意义，掌握星座分析的基础知识。')
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
  max-width: 1000px;
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

/* Classification Grid */
.classification-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin: 25px 0;
}

.classification-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #e67e22;
}

.classification-card h4 {
  color: #e67e22;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

/* Elements */
.element-items {
  display: grid;
  gap: 12px;
}

.element {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: white;
  border-radius: 8px;
}

.element .icon {
  font-size: 1.5rem;
}

.element strong {
  display: block;
  margin-bottom: 3px;
  color: #2c3e50;
}

.element p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.element small {
  font-size: 0.8rem;
  color: #999;
}

/* Modes */
.mode-items {
  display: grid;
  gap: 15px;
}

.mode {
  padding: 15px;
  background: white;
  border-radius: 8px;
  text-align: center;
}

.mode strong {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-family: 'Shippori Mincho', serif;
}

.mode p {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  color: #666;
}

.mode small {
  font-size: 0.8rem;
  color: #999;
}

/* Zodiac Signs */
.zodiac-signs {
  display: grid;
  gap: 20px;
  margin: 25px 0;
}

.sign-card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sign-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.sign-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.symbol {
  font-size: 2.5rem;
  margin-right: 15px;
}

.sign-info {
  flex: 1;
}

.sign-info h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.3rem;
  font-family: 'Shippori Mincho', serif;
}

.dates {
  color: #666;
  font-size: 0.9rem;
}

.traits {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.traits span {
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  color: white;
}

.element.fire { background: #e74c3c; }
.element.earth { background: #8e7cc3; }
.element.air { background: #3498db; }
.element.water { background: #1abc9c; }

.mode.cardinal { background: #f39c12; }
.mode.fixed { background: #e67e22; }
.mode.mutable { background: #95a5a6; }

.sign-content p {
  margin-bottom: 8px;
  line-height: 1.5;
  font-size: 0.9rem;
}

.sign-content strong {
  color: #e67e22;
}

/* Application Guide */
.application-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.guide-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #e67e22;
}

.guide-item h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.guide-item p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

/* Practice and Navigation */
.practice-box {
  background: #fff;
  border: 2px solid #3498db;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
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
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
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
  
  .classification-grid {
    grid-template-columns: 1fr;
  }
  
  .sign-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .traits {
    flex-direction: row;
    gap: 8px;
  }
  
  .application-guide {
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
  
  .sign-header {
    text-align: center;
  }
  
  .symbol {
    font-size: 2rem;
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>