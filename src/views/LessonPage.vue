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
        <span class="current">{{ lessonTitle }}</span>
      </nav>
      <h1 class="title">{{ lessonTitle }}</h1>
      <div class="lesson-meta">
        <span class="category">{{ categoryName }}</span>
        <span class="difficulty">{{ $t('learn.difficulty.beginner') }}</span>
        <span class="duration">{{ $t('learn.readTime', { minutes: 10 }) }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="lesson-content">
        <div class="lesson-intro">
          <h2>{{ $t('lesson.overview') }}</h2>
          <p>{{ lessonDescription }}</p>
        </div>

        <div class="lesson-objectives">
          <h3>{{ $t('lesson.objectives') }}</h3>
          <ul>
            <li>{{ $t('lesson.objective1') }}</li>
            <li>{{ $t('lesson.objective2') }}</li>
            <li>{{ $t('lesson.objective3') }}</li>
          </ul>
        </div>

        <div class="lesson-body">
          <h3>{{ $t('lesson.content') }}</h3>
          <p>{{ $t('lesson.placeholder1') }}</p>
          <p>{{ $t('lesson.placeholder2') }}</p>
          
          <div class="example-box">
            <h4>{{ $t('lesson.example') }}</h4>
            <p>{{ $t('lesson.exampleText') }}</p>
          </div>
          
          <p>{{ $t('lesson.placeholder3') }}</p>
        </div>

        <div class="lesson-practice">
          <h3>{{ $t('lesson.practice') }}</h3>
          <div class="practice-box">
            <p>{{ $t('lesson.practiceInstruction') }}</p>
            <button class="practice-btn" @click="startPractice">
              {{ $t('lesson.startPractice') }}
            </button>
          </div>
        </div>

        <div class="lesson-navigation">
          <router-link v-if="previousLesson" :to="previousLesson" class="nav-btn prev-btn">
            ← {{ $t('lesson.previous') }}
          </router-link>
          <router-link v-if="nextLesson" :to="nextLesson" class="nav-btn next-btn">
            {{ $t('lesson.next') }} →
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
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import AppNavigation from '../components/AppNavigation.vue'
import i18nMixin from '../mixins/i18n.js'

export default {
  name: 'LessonPage',
  mixins: [i18nMixin],
  
  components: {
    LanguageSwitcher,
    AppNavigation
  },
  
  data() {
    return {
      lessonData: {
        bazi: {
          'basics': { category: 'bazi', prev: null, next: 'heavenly-stems' },
          'heavenly-stems': { category: 'bazi', prev: 'basics', next: 'earthly-branches' },
          'earthly-branches': { category: 'bazi', prev: 'heavenly-stems', next: 'five-elements' },
          'five-elements': { category: 'bazi', prev: 'earthly-branches', next: 'reading-pillars' },
          'reading-pillars': { category: 'bazi', prev: 'five-elements', next: 'interpreting-chart' },
          'interpreting-chart': { category: 'bazi', prev: 'reading-pillars', next: null }
        },
        astrology: {
          'introduction': { category: 'astrology', prev: null, next: 'zodiac-signs' },
          'zodiac-signs': { category: 'astrology', prev: 'introduction', next: 'planets' },
          'planets': { category: 'astrology', prev: 'zodiac-signs', next: 'houses' },
          'houses': { category: 'astrology', prev: 'planets', next: 'aspects' },
          'aspects': { category: 'astrology', prev: 'houses', next: 'birth-chart' },
          'birth-chart': { category: 'astrology', prev: 'aspects', next: null }
        },
        reading: {
          'preparation': { category: 'reading', prev: null, next: 'analysis-method' },
          'analysis-method': { category: 'reading', prev: 'preparation', next: 'interpretation' },
          'interpretation': { category: 'reading', prev: 'analysis-method', next: 'timing' },
          'timing': { category: 'reading', prev: 'interpretation', next: 'synthesis' },
          'synthesis': { category: 'reading', prev: 'timing', next: 'practice' },
          'practice': { category: 'reading', prev: 'synthesis', next: null }
        }
      }
    }
  },
  
  computed: {
    isMobile() {
      return window.innerWidth <= 768
    },
    
    pathType() {
      return this.$route.params.type
    },
    
    lessonId() {
      return this.$route.params.lesson
    },
    
    currentLesson() {
      return this.lessonData[this.pathType]?.[this.lessonId]
    },
    
    lessonTitle() {
      if (!this.currentLesson) return this.$t('lesson.notFound')
      return this.$t(`learn.paths.${this.pathType}.lessons.${this.lessonId}`)
    },
    
    categoryName() {
      if (!this.currentLesson) return ''
      return this.$t(`learn.categories.${this.currentLesson.category}`)
    },
    
    lessonDescription() {
      return this.$t(`lesson.descriptions.${this.pathType}.${this.lessonId}`)
    },
    
    previousLesson() {
      const prev = this.currentLesson?.prev
      return prev ? `/learn/${this.pathType}/${prev}` : null
    },
    
    nextLesson() {
      const next = this.currentLesson?.next
      return next ? `/learn/${this.pathType}/${next}` : null
    }
  },
  
  mounted() {
    // Set page title
    document.title = this.lessonTitle + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.lessonDescription)
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
  background: #d35400;
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

.lesson-body {
  margin-bottom: 30px;
}

.lesson-body h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.lesson-body p {
  line-height: 1.7;
  color: #555;
  margin-bottom: 15px;
}

.example-box {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
  border-left: 4px solid #d35400;
}

.example-box h4 {
  color: #d35400;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.practice-box {
  background: #fff;
  border: 2px solid #d35400;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.practice-btn {
  background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
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
  box-shadow: 0 6px 20px rgba(211, 84, 0, 0.3);
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
  color: #d35400;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #d35400;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #d35400;
  color: white;
  transform: translateY(-1px);
}

.next-btn {
  margin-left: auto;
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
  
  .breadcrumb {
    font-size: 0.8rem;
  }
  
  .lesson-meta {
    font-size: 0.8rem;
  }
}
</style>