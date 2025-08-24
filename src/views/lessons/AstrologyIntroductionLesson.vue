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
        <span class="current">{{ $t('lesson.lessonContent.astrologyIntroduction.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.astrologyIntroduction.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.astrology') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.beginner') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 12 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.astrologyIntroduction.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.astrologyIntroduction.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyIntroduction.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyIntroduction.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.astrologyIntroduction.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.astrologyIntroduction.whatIs.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.astrologyIntroduction.whatIs.intro') }}</p>
            
            <div class="info-box">
              <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.whatIs.philosophy.title') }}</h4>
              <p>{{ $t('lesson.lessonContent.astrologyIntroduction.whatIs.philosophy.desc') }}</p>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.title') }}</h3>
            
            <div class="three-pillars">
              <div class="pillar-card">
                <div class="pillar-icon">♈</div>
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.signs.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.signs.desc') }}</p>
                <ul>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.signs.fire') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.signs.earth') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.signs.air') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.signs.water') }}</li>
                </ul>
              </div>
              
              <div class="pillar-card">
                <div class="pillar-icon">☉</div>
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.planets.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.planets.desc') }}</p>
                <ul>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.planets.personal') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.planets.social') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.planets.outer') }}</li>
                </ul>
              </div>
              
              <div class="pillar-card">
                <div class="pillar-icon">🏠</div>
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.houses.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.houses.desc') }}</p>
                <ul>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.houses.first') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.houses.seventh') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.houses.tenth') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.pillars.houses.fourth') }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.intro') }}</p>
            
            <div class="chart-explanation">
              <div class="chart-visual">
                <div class="chart-circle">
                  <div class="chart-center">{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.center') }}</div>
                  <div class="chart-segments">
                    <div class="segment" style="--deg: 30deg">♈ 1宫</div>
                    <div class="segment" style="--deg: 60deg">♉ 2宫</div>
                    <div class="segment" style="--deg: 90deg">♊ 3宫</div>
                    <div class="segment" style="--deg: 120deg">♋ 4宫</div>
                  </div>
                </div>
              </div>
              
              <div class="chart-info">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.components.title') }}</h4>
                <ul>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.components.ascendant') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.components.sun') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.components.moon') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.components.planets') }}</li>
                  <li>{{ $t('lesson.lessonContent.astrologyIntroduction.birthChart.components.aspects') }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.intro') }}</p>
            
            <div class="elements-grid">
              <div class="element-card fire">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.fire.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.fire.signs') }}</p>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.fire.traits') }}</p>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.fire.keywords') }}</p>
              </div>
              
              <div class="element-card earth">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.earth.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.earth.signs') }}</p>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.earth.traits') }}</p>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.earth.keywords') }}</p>
              </div>
              
              <div class="element-card air">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.air.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.air.signs') }}</p>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.air.traits') }}</p>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.air.keywords') }}</p>
              </div>
              
              <div class="element-card water">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.water.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.water.signs') }}</p>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.water.traits') }}</p>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.elements.water.keywords') }}</p>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.title') }}</h3>
            <div class="applications">
              <div class="app-item">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.personal.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.personal.desc') }}</p>
              </div>
              <div class="app-item">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.relationships.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.relationships.desc') }}</p>
              </div>
              <div class="app-item">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.career.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.career.desc') }}</p>
              </div>
              <div class="app-item">
                <h4>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.timing.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.astrologyIntroduction.applications.timing.desc') }}</p>
              </div>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>{{ $t('lesson.lessonContent.common.practice') }}</h3>
          <div class="practice-box">
            <p>{{ $t('lesson.lessonContent.astrologyIntroduction.practice.question') }}</p>
            <button class="practice-btn" @click="startPractice">
              {{ $t('lesson.lessonContent.astrologyIntroduction.practice.button') }}
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <div class="nav-placeholder"></div>
          <router-link to="/learn/astrology/zodiac-signs" class="nav-btn next-btn">
            {{ $t('lesson.lessonContent.common.next') }}：{{ $t('lesson.lessons.astrology.zodiac-signs') }} →
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
  name: 'AstrologyIntroductionLesson',
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
    // Set page title
    document.title = this.$t('learn.paths.astrology.lessons.introduction') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', '西方占星学入门课程，了解星座、行星、宫位的基本概念，开始您的占星学习之旅。')
    }
    
    // Monitor resize for responsive design
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
      // 跳转到主页开始实际分析
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.lesson-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px 20px 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header styles same as BaziBasicsLesson */
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
  margin-bottom: 30px;
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

.info-box {
  background: linear-gradient(135deg, #fff7e6 0%, #ffecb3 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  border-left: 4px solid #e67e22;
}

.info-box h4 {
  color: #e67e22;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.three-pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.pillar-card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.pillar-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.pillar-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #e67e22;
}

.pillar-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.pillar-card ul {
  text-align: left;
  padding-left: 15px;
  font-size: 0.9rem;
}

.pillar-card li {
  margin-bottom: 5px;
  line-height: 1.4;
}

.chart-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 25px 0;
  align-items: center;
}

.chart-visual {
  display: flex;
  justify-content: center;
}

.chart-circle {
  width: 200px;
  height: 200px;
  border: 3px solid #e67e22;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, #fff7e6, #ffffff);
}

.chart-center {
  font-weight: 600;
  color: #e67e22;
  font-family: 'Shippori Mincho', serif;
}

.chart-info h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.chart-info ul {
  padding-left: 15px;
}

.chart-info li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.elements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.element-card {
  border-radius: 12px;
  padding: 20px;
  color: white;
  text-align: center;
}

.element-card.fire {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.element-card.earth {
  background: linear-gradient(135deg, #8e7cc3, #6c5b7b);
}

.element-card.air {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.element-card.water {
  background: linear-gradient(135deg, #1abc9c, #16a085);
}

.element-card h4 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-family: 'Shippori Mincho', serif;
}

.element-card p {
  margin-bottom: 8px;
  font-size: 0.9rem;
  line-height: 1.4;
}

.applications {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.app-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border-left: 4px solid #e67e22;
}

.app-item h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.app-item p {
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

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
  
  .three-pillars {
    grid-template-columns: 1fr;
  }
  
  .chart-explanation {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .chart-circle {
    width: 150px;
    height: 150px;
  }
  
  .elements-grid {
    grid-template-columns: 1fr;
  }
  
  .applications {
    grid-template-columns: repeat(2, 1fr);
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
  
  .applications {
    grid-template-columns: 1fr;
  }
}
</style>