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
        <span class="current">{{ $t('lesson.lessonContent.baziBasics.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.baziBasics.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.bazi') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.beginner') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 15 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.baziBasics.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.baziBasics.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.baziBasics.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.baziBasics.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.baziBasics.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.description') }}</p>
            
            <div class="info-box">
              <h4>{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.title') }}</h4>
              <ul>
                <li><strong>{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.year') }}</strong>：{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.yearDesc') }}</li>
                <li><strong>{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.month') }}</strong>：{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.monthDesc') }}</li>
                <li><strong>{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.day') }}</strong>：{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.dayDesc') }}</li>
                <li><strong>{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.hour') }}</strong>：{{ $t('lesson.lessonContent.baziBasics.sections.whatIsBazi.composition.hourDesc') }}</li>
              </ul>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.description') }}</p>
            
            <div class="two-columns">
              <div class="column">
                <h4>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.heavenlyStems.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.heavenlyStems.sequence') }}</p>
                <ul>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.heavenlyStems.wood') }}</li>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.heavenlyStems.fire') }}</li>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.heavenlyStems.earth') }}</li>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.heavenlyStems.metal') }}</li>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.heavenlyStems.water') }}</li>
                </ul>
              </div>
              
              <div class="column">
                <h4>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.earthlyBranches.title') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.earthlyBranches.sequence') }}</p>
                <ul>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.earthlyBranches.water') }}</li>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.earthlyBranches.wood') }}</li>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.earthlyBranches.fire') }}</li>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.earthlyBranches.metal') }}</li>
                  <li>{{ $t('lesson.lessonContent.baziBasics.sections.stemsBranches.earthlyBranches.earth') }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.description') }}</p>
            
            <div class="five-elements">
              <div class="element-card wood">
                <h4>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.wood.name') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.wood.traits') }}</p>
                <small>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.wood.associations') }}</small>
              </div>
              <div class="element-card fire">
                <h4>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.fire.name') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.fire.traits') }}</p>
                <small>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.fire.associations') }}</small>
              </div>
              <div class="element-card earth">
                <h4>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.earth.name') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.earth.traits') }}</p>
                <small>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.earth.associations') }}</small>
              </div>
              <div class="element-card metal">
                <h4>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.metal.name') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.metal.traits') }}</p>
                <small>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.metal.associations') }}</small>
              </div>
              <div class="element-card water">
                <h4>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.water.name') }}</h4>
                <p>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.water.traits') }}</p>
                <small>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.elements.water.associations') }}</small>
              </div>
            </div>

            <div class="relationships">
              <h4>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.relationships.title') }}</h4>
              <p><strong>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.relationships.generating') }}</strong>：{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.relationships.generatingCycle') }}</p>
              <p><strong>{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.relationships.overcoming') }}</strong>：{{ $t('lesson.lessonContent.baziBasics.sections.fiveElements.relationships.overcomingCycle') }}</p>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziBasics.sections.example.title') }}</h3>
            <div class="example-box">
              <h4>{{ $t('lesson.lessonContent.baziBasics.sections.example.caseTitle') }}</h4>
              <table class="bazi-table">
                <thead>
                  <tr>
                    <th>{{ $t('lesson.lessonContent.baziBasics.sections.example.table.year') }}</th>
                    <th>{{ $t('lesson.lessonContent.baziBasics.sections.example.table.month') }}</th>
                    <th>{{ $t('lesson.lessonContent.baziBasics.sections.example.table.day') }}</th>
                    <th>{{ $t('lesson.lessonContent.baziBasics.sections.example.table.hour') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="tiangan">
                    <td>庚</td>
                    <td>己</td>
                    <td>甲</td>
                    <td>己</td>
                  </tr>
                  <tr class="dizhi">
                    <td>午</td>
                    <td>卯</td>
                    <td>戌</td>
                    <td>巳</td>
                  </tr>
                </tbody>
              </table>
              <p class="analysis">
                <strong>{{ $t('lesson.lessonContent.baziBasics.sections.example.analysisTitle') }}</strong>：{{ $t('lesson.lessonContent.baziBasics.sections.example.analysisContent') }}
              </p>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>{{ $t('lesson.lessonContent.common.practice') }}</h3>
          <div class="practice-box">
            <p>{{ $t('lesson.lessonContent.baziBasics.practice.question') }}</p>
            <button class="practice-btn" @click="startPractice">
              {{ $t('lesson.lessonContent.baziBasics.practice.button') }}
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <div class="nav-placeholder"></div>
          <router-link to="/learn/bazi/heavenly-stems" class="nav-btn next-btn">
            {{ $t('lesson.lessonContent.common.next') }}：{{ $t('lesson.lessons.bazi.heavenly-stems') }} →
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
  name: 'BaziBasicsLesson',
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
    document.title = this.$t('learn.paths.bazi.lessons.basics') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('lesson.lessonContent.baziBasics.metaDescription'))
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

/* Header */
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
  background: #9b59b6;
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
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  border-left: 4px solid #9b59b6;
}

.info-box h4 {
  color: #9b59b6;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin: 25px 0;
}

.column h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.column ul {
  padding-left: 15px;
  font-size: 0.9rem;
}

.column li {
  margin-bottom: 5px;
  line-height: 1.5;
}

.five-elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 25px 0;
}

.element-card {
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
}

.element-card.wood {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.element-card.fire {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.element-card.earth {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.element-card.metal {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
}

.element-card.water {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.element-card h4 {
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.element-card p {
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.element-card small {
  font-size: 0.8rem;
  opacity: 0.9;
}

.relationships {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}

.relationships h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.bazi-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  font-family: 'Shippori Mincho', serif;
}

.bazi-table th,
.bazi-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
}

.bazi-table th {
  background: #f8f9fa;
  color: #333;
  font-size: 1rem;
}

.tiangan td {
  background: #e8f4fd;
  color: #2980b9;
}

.dizhi td {
  background: #fff3e0;
  color: #e67e22;
}

.analysis {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #9b59b6;
  margin-top: 15px;
}

.example-box {
  background: #fff;
  border: 2px solid #9b59b6;
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
}

.example-box h4 {
  color: #9b59b6;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.practice-box {
  background: #fff;
  border: 2px solid #27ae60;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
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
  box-shadow: 0 6px 20px rgba(39, 174, 96, 0.3);
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
  
  .two-columns {
    grid-template-columns: 1fr;
  }
  
  .five-elements {
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
  
  .breadcrumb {
    font-size: 0.8rem;
  }
  
  .lesson-meta {
    font-size: 0.8rem;
  }
  
  .five-elements {
    grid-template-columns: 1fr;
  }
  
  .bazi-table th,
  .bazi-table td {
    padding: 8px;
    font-size: 1rem;
  }
}
</style>