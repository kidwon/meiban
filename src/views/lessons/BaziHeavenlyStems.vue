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
        <span class="current">{{ $t('lesson.lessonContent.baziHeavenlyStems.breadcrumb') }}</span>
      </nav>
      <h1 class="title">{{ $t('lesson.lessonContent.baziHeavenlyStems.title') }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ $t('learn.categories.bazi') }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.intermediate') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 20 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.lessonContent.common.overview') }}</h2>
          <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.intro') }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.lessonContent.common.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.lessonContent.baziHeavenlyStems.objectives.obj1') }}</li>
            <li>{{ $t('lesson.lessonContent.baziHeavenlyStems.objectives.obj2') }}</li>
            <li>{{ $t('lesson.lessonContent.baziHeavenlyStems.objectives.obj3') }}</li>
            <li>{{ $t('lesson.lessonContent.baziHeavenlyStems.objectives.obj4') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziHeavenlyStems.overview.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.overview.description') }}</p>
            
            <div class="stems-overview">
              <div class="stem-pair wood">
                <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.overview.stems.wood') }}</h4>
                <div class="pair-details">
                  <div class="yang">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.name') }}</div>
                  <div class="yin">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.name') }}</div>
                </div>
              </div>
              <div class="stem-pair fire">
                <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.overview.stems.fire') }}</h4>
                <div class="pair-details">
                  <div class="yang">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.name') }}</div>
                  <div class="yin">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.name') }}</div>
                </div>
              </div>
              <div class="stem-pair earth">
                <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.overview.stems.earth') }}</h4>
                <div class="pair-details">
                  <div class="yang">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.name') }}</div>
                  <div class="yin">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.name') }}</div>
                </div>
              </div>
              <div class="stem-pair metal">
                <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.overview.stems.metal') }}</h4>
                <div class="pair-details">
                  <div class="yang">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.name') }}</div>
                  <div class="yin">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.name') }}</div>
                </div>
              </div>
              <div class="stem-pair water">
                <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.overview.stems.water') }}</h4>
                <div class="pair-details">
                  <div class="yang">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.name') }}</div>
                  <div class="yin">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.name') }}</div>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.title') }}</h3>
            
            <div class="detailed-stems">
              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.name') }}</h4>
                  <span class="element wood">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.jia.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.name') }}</h4>
                  <span class="element wood">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.yi.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.name') }}</h4>
                  <span class="element fire">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.bing.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.name') }}</h4>
                  <span class="element fire">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ding.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.name') }}</h4>
                  <span class="element earth">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.wu.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.name') }}</h4>
                  <span class="element earth">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ji.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.name') }}</h4>
                  <span class="element metal">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.geng.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.name') }}</h4>
                  <span class="element metal">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.xin.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.name') }}</h4>
                  <span class="element water">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.ren.career') }}</p>
                </div>
              </div>

              <div class="stem-detail">
                <div class="stem-header">
                  <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.name') }}</h4>
                  <span class="element water">{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.element') }}</span>
                </div>
                <div class="stem-content">
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.symbolLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.symbol') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.traitsLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.traits') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.personalityLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.personality') }}</p>
                  <p><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.careerLabel') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.detailed.gui.career') }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.title') }}</h3>
            <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.description') }}</p>
            
            <div class="combinations">
              <div class="combo-item">
                <span class="combo">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.jiaji.combo') }}</span>
                <span class="result">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.jiaji.result') }}</span>
                <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.jiaji.meaning') }}</p>
              </div>
              <div class="combo-item">
                <span class="combo">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.yigeng.combo') }}</span>
                <span class="result">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.yigeng.result') }}</span>
                <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.yigeng.meaning') }}</p>
              </div>
              <div class="combo-item">
                <span class="combo">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.bingxin.combo') }}</span>
                <span class="result">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.bingxin.result') }}</span>
                <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.bingxin.meaning') }}</p>
              </div>
              <div class="combo-item">
                <span class="combo">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.dingren.combo') }}</span>
                <span class="result">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.dingren.result') }}</span>
                <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.dingren.meaning') }}</p>
              </div>
              <div class="combo-item">
                <span class="combo">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.wugui.combo') }}</span>
                <span class="result">{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.wugui.result') }}</span>
                <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.combinations.list.wugui.meaning') }}</p>
              </div>
            </div>
          </section>

          <section class="content-section">
            <h3>{{ $t('lesson.lessonContent.baziHeavenlyStems.application.title') }}</h3>
            <div class="application-box">
              <h4>{{ $t('lesson.lessonContent.baziHeavenlyStems.application.subtitle') }}</h4>
              <ul>
                <li><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.application.points.dayMaster.title') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.application.points.dayMaster.description') }}</li>
                <li><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.application.points.tenGods.title') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.application.points.tenGods.description') }}</li>
                <li><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.application.points.pattern.title') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.application.points.pattern.description') }}</li>
                <li><strong>{{ $t('lesson.lessonContent.baziHeavenlyStems.application.points.luck.title') }}</strong>：{{ $t('lesson.lessonContent.baziHeavenlyStems.application.points.luck.description') }}</li>
              </ul>
            </div>
          </section>
        </div>

        <div class="lesson-practice">
          <h3>{{ $t('lesson.lessonContent.common.practice') }}</h3>
          <div class="practice-box">
            <p>{{ $t('lesson.lessonContent.baziHeavenlyStems.practice.question') }}</p>
            <button class="practice-btn" @click="startPractice">
              {{ $t('lesson.lessonContent.baziHeavenlyStems.practice.button') }}
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link to="/learn/bazi/basics" class="nav-btn prev-btn">
            ← {{ $t('lesson.lessonContent.common.previous') }}：{{ $t('lesson.lessons.bazi.basics') }}
          </router-link>
          <router-link to="/learn/bazi/earthly-branches" class="nav-btn next-btn">
            {{ $t('lesson.lessonContent.common.next') }}：{{ $t('lesson.lessons.bazi.earthly-branches') }} →
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
  name: 'BaziHeavenlyStems',
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
    document.title = this.$t('lesson.lessonContent.baziHeavenlyStems.title') + ' - ' + this.$t('app.title')
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('lesson.lessonContent.baziHeavenlyStems.metaDescription'))
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

/* Header styles - same as other lessons */
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
  background: #fff3cd;
  color: #856404;
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

/* Stems Overview */
.stems-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin: 25px 0;
}

.stem-pair {
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
}

.stem-pair.wood {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.stem-pair.fire {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.stem-pair.earth {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.stem-pair.metal {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
}

.stem-pair.water {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.stem-pair h4 {
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-family: 'Shippori Mincho', serif;
}

.pair-details {
  display: flex;
  justify-content: space-around;
  font-size: 0.9rem;
}

.yang {
  font-weight: 600;
}

.yin {
  opacity: 0.9;
}

/* Detailed Stems */
.detailed-stems {
  display: grid;
  gap: 20px;
  margin: 25px 0;
}

.stem-detail {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #9b59b6;
}

.stem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.stem-header h4 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.2rem;
  font-family: 'Shippori Mincho', serif;
}

.element {
  padding: 4px 12px;
  border-radius: 12px;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
}

.element.wood { background: #27ae60; }
.element.fire { background: #e74c3c; }
.element.earth { background: #f39c12; }
.element.metal { background: #95a5a6; }
.element.water { background: #3498db; }

.stem-content p {
  margin-bottom: 8px;
  line-height: 1.5;
  font-size: 0.9rem;
}

.stem-content strong {
  color: #9b59b6;
}

/* Combinations */
.combinations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 25px 0;
}

.combo-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
}

.combo {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #9b59b6;
  margin-bottom: 5px;
  font-family: 'Shippori Mincho', serif;
}

.result {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.combo-item p {
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 0;
}

/* Application */
.application-box {
  background: #fff;
  border: 2px solid #9b59b6;
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
}

.application-box h4 {
  color: #9b59b6;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.application-box ul {
  padding-left: 20px;
}

.application-box li {
  margin-bottom: 10px;
  line-height: 1.6;
}

/* Practice and Navigation */
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
  
  .stems-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .combinations {
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
  
  .stems-overview {
    grid-template-columns: 1fr;
  }
}
</style>