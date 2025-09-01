<template>
  <div class="category-container">
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
        <span class="current">{{ categoryName }}</span>
      </nav>
      <div class="category-header">
        <div class="category-icon">{{ categoryData.icon }}</div>
        <div class="category-info">
          <h1 class="title">{{ categoryName }}</h1>
          <p class="description">{{ categoryDescription }}</p>
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- Category Articles -->
      <section class="articles-section">
        <h2 class="section-title">{{ $t('category.articles') }}</h2>
        <div class="articles-grid">
          <article class="article-card" v-for="article in categoryArticles" :key="article.id">
            <div class="article-image">
              <div class="article-icon">{{ article.icon }}</div>
            </div>
            <div class="article-content">
              <h3 class="article-title">
                <router-link :to="article.path">{{ $t('learn.articles.' + article.id + '.title') }}</router-link>
              </h3>
              <p class="article-excerpt">{{ $t('learn.articles.' + article.id + '.excerpt') }}</p>
              <div class="article-meta">
                <span class="article-time">{{ $t('learn.readTime', { minutes: article.readTime }) }}</span>
                <span class="article-level">{{ $t('learn.difficulty.' + article.level) }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Related Lessons -->
      <section class="lessons-section" v-if="relatedLessons.length > 0">
        <h2 class="section-title">{{ $t('category.relatedLessons') }}</h2>
        <div class="lessons-grid">
          <div class="lesson-card" v-for="lesson in relatedLessons" :key="lesson.id">
            <div class="lesson-header">
              <div class="lesson-icon">{{ lesson.icon }}</div>
              <h3>{{ $t('learn.paths.' + lesson.path + '.lessons.' + lesson.id) }}</h3>
            </div>
            <p class="lesson-description">{{ $t('lesson.descriptions.' + lesson.path + '.' + lesson.id) }}</p>
            <div class="lesson-meta">
              <span class="lesson-path">{{ $t('learn.paths.' + lesson.path + '.title') }}</span>
              <router-link :to="`/learn/${lesson.path}/${lesson.id}`" class="lesson-link">
                {{ $t('category.startLesson') }}
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Category Introduction -->
      <section class="intro-section">
        <h2 class="section-title">{{ $t('category.about') }} {{ categoryName }}</h2>
        <div class="intro-content">
          <p>{{ $t('category.introductions.' + categoryId + '.text1') }}</p>
          <p>{{ $t('category.introductions.' + categoryId + '.text2') }}</p>
          
          <div class="key-points">
            <h3>{{ $t('category.keyPoints') }}</h3>
            <ul>
              <li>{{ $t('category.introductions.' + categoryId + '.point1') }}</li>
              <li>{{ $t('category.introductions.' + categoryId + '.point2') }}</li>
              <li>{{ $t('category.introductions.' + categoryId + '.point3') }}</li>
            </ul>
          </div>
          
          <div class="getting-started">
            <h3>{{ $t('category.gettingStarted') }}</h3>
            <p>{{ $t('category.gettingStartedText') }}</p>
            <router-link to="/" class="start-button">
              {{ $t('category.startAnalysis') }}
            </router-link>
          </div>
        </div>
      </section>
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
  name: 'CategoryPage',
  mixins: [i18nMixin],
  
  components: {
    LanguageSwitcher,
    AppNavigation
  },
  
  data() {
    return {
      categories: {
        'fundamentals': { icon: '📚' },
        'astrology': { icon: '⭐' },
        'bazi': { icon: '🔮' },
        'practical': { icon: '💡' },
        'relationships': { icon: '💕' },
        'career': { icon: '💼' }
      },
      
      articles: {
        'fundamentals': [
          {
            id: 'understanding-birth-chart',
            icon: '🌟',
            readTime: 8,
            level: 'beginner',
            path: '/learn/article/understanding-birth-chart'
          }
        ],
        'astrology': [
          {
            id: 'understanding-birth-chart',
            icon: '🌟',
            readTime: 8,
            level: 'beginner',
            path: '/learn/article/understanding-birth-chart'
          }
        ],
        'bazi': [
          {
            id: 'five-elements-theory',
            icon: '🌿',
            readTime: 12,
            level: 'beginner',
            path: '/learn/article/five-elements-theory'
          }
        ],
        'practical': [
          {
            id: 'career-astrology',
            icon: '💼',
            readTime: 15,
            level: 'intermediate',
            path: '/learn/article/career-astrology'
          }
        ],
        'relationships': [
          {
            id: 'relationship-compatibility',
            icon: '💕',
            readTime: 10,
            level: 'beginner',
            path: '/learn/article/relationship-compatibility'
          }
        ],
        'career': [
          {
            id: 'career-astrology',
            icon: '💼',
            readTime: 15,
            level: 'intermediate',
            path: '/learn/article/career-astrology'
          }
        ]
      },
      
      lessons: {
        'fundamentals': [
          { id: 'basics', path: 'bazi', icon: '🔮' },
          { id: 'introduction', path: 'astrology', icon: '⭐' }
        ],
        'astrology': [
          { id: 'introduction', path: 'astrology', icon: '⭐' },
          { id: 'zodiac-signs', path: 'astrology', icon: '⭐' },
          { id: 'planets', path: 'astrology', icon: '⭐' },
          { id: 'houses', path: 'astrology', icon: '⭐' }
        ],
        'bazi': [
          { id: 'basics', path: 'bazi', icon: '🔮' },
          { id: 'heavenly-stems', path: 'bazi', icon: '🔮' },
          { id: 'earthly-branches', path: 'bazi', icon: '🔮' },
          { id: 'five-elements', path: 'bazi', icon: '🔮' }
        ],
        'practical': [
          { id: 'preparation', path: 'reading', icon: '📊' },
          { id: 'analysis-method', path: 'reading', icon: '📊' }
        ],
        'relationships': [
          { id: 'interpretation', path: 'reading', icon: '📊' }
        ],
        'career': [
          { id: 'synthesis', path: 'reading', icon: '📊' }
        ]
      }
    }
  },
  
  computed: {
    isMobile() {
      return window.innerWidth <= 768
    },
    
    categoryId() {
      return this.$route.params.category
    },
    
    categoryData() {
      return this.categories[this.categoryId] || { icon: '📚' }
    },
    
    categoryName() {
      return this.$t('learn.categories.' + this.categoryId)
    },
    
    categoryDescription() {
      return this.$t('learn.categoryDescriptions.' + this.categoryId)
    },
    
    categoryArticles() {
      return this.articles[this.categoryId] || []
    },
    
    relatedLessons() {
      return this.lessons[this.categoryId] || []
    }
  },
  
  mounted() {
    // Set page title
    document.title = this.categoryName + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.categoryDescription)
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
    }
  }
}
</script>

<style scoped>
.category-container {
  max-width: 1000px;
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

.category-header {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 30px;
}

.category-icon {
  font-size: 4rem;
  min-width: 80px;
  text-align: center;
}

.category-info {
  flex: 1;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #2c3e50;
  font-family: 'Shippori Mincho', serif;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  margin: 0;
}

/* Content */
.content-container {
  flex: 1;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 25px;
  font-family: 'Shippori Mincho', serif;
  text-align: center;
  border-bottom: 3px solid #f0f0f0;
  padding-bottom: 15px;
}

/* Articles Section */
.articles-section {
  margin-bottom: 50px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.article-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-icon {
  font-size: 3rem;
  filter: brightness(0) invert(1);
}

.article-content {
  padding: 20px;
}

.article-title a {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Shippori Mincho', serif;
}

.article-title a:hover {
  color: #d35400;
}

.article-excerpt {
  color: #666;
  line-height: 1.6;
  margin: 10px 0 15px 0;
  font-size: 0.9rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.article-time {
  color: #999;
}

.article-level {
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 500;
}

/* Lessons Section */
.lessons-section {
  margin-bottom: 50px;
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.lesson-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #d35400;
}

.lesson-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.lesson-icon {
  font-size: 1.5rem;
}

.lesson-header h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0;
  font-family: 'Shippori Mincho', serif;
}

.lesson-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.lesson-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-path {
  color: #666;
  font-size: 0.8rem;
  font-weight: 500;
}

.lesson-link {
  color: #d35400;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.lesson-link:hover {
  border-bottom-color: #d35400;
}

/* Introduction Section */
.intro-section {
  background: #fff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.intro-content p {
  line-height: 1.7;
  color: #555;
  margin-bottom: 20px;
}

.key-points {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
  border-left: 4px solid #d35400;
}

.key-points h3 {
  color: #d35400;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.key-points ul {
  padding-left: 20px;
}

.key-points li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #555;
}

.getting-started {
  text-align: center;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #f0f0f0;
}

.getting-started h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.start-button {
  display: inline-block;
  background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 15px;
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(211, 84, 0, 0.3);
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
  .category-container {
    padding: 70px 15px 15px 15px;
  }
  
  .category-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;
    padding: 25px 20px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .articles-grid,
  .lessons-grid {
    grid-template-columns: 1fr;
  }
  
  .intro-section {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .category-icon {
    font-size: 3rem;
  }
}
</style>