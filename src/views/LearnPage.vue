<template>
  <div class="learn-container">
    <AppNavigation />
    
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="header">
      <h1 class="title">{{ $t('learn.title') }}</h1>
      <p class="subtitle">{{ $t('learn.subtitle') }}</p>
    </header>

    <div class="content-container">
      <!-- Introduction -->
      <section class="intro-section">
        <div class="intro-content">
          <h2>{{ $t('learn.intro.title') }}</h2>
          <p>{{ $t('learn.intro.description1') }}</p>
          <p>{{ $t('learn.intro.description2') }}</p>
        </div>
      </section>

      <!-- Learning Paths -->
      <section class="learning-paths">
        <h2 class="section-title">{{ $t('learn.paths.title') }}</h2>
        <div class="paths-grid">
          <!-- Bazi Learning Path -->
          <div class="path-card">
            <div class="path-header">
              <div class="path-icon">🔮</div>
              <h3>{{ $t('learn.paths.bazi.title') }}</h3>
            </div>
            <p class="path-description">{{ $t('learn.paths.bazi.description') }}</p>
            <div class="path-lessons">
              <div class="lesson-item" v-for="lesson in baziLessons" :key="lesson">
                <router-link :to="`/learn/bazi/${lesson}`" class="lesson-link">
                  {{ $t('learn.paths.bazi.lessons.' + lesson) }}
                </router-link>
              </div>
            </div>
            <div class="path-stats">
              <span class="lesson-count">{{ baziLessons.length }} {{ $t('learn.lessons') }}</span>
              <span class="difficulty">{{ $t('learn.difficulty.beginner') }}</span>
            </div>
          </div>

          <!-- Western Astrology Learning Path -->
          <div class="path-card">
            <div class="path-header">
              <div class="path-icon">⭐</div>
              <h3>{{ $t('learn.paths.astrology.title') }}</h3>
            </div>
            <p class="path-description">{{ $t('learn.paths.astrology.description') }}</p>
            <div class="path-lessons">
              <div class="lesson-item" v-for="lesson in astrologyLessons" :key="lesson">
                <router-link :to="`/learn/astrology/${lesson}`" class="lesson-link">
                  {{ $t('learn.paths.astrology.lessons.' + lesson) }}
                </router-link>
              </div>
            </div>
            <div class="path-stats">
              <span class="lesson-count">{{ astrologyLessons.length }} {{ $t('learn.lessons') }}</span>
              <span class="difficulty">{{ $t('learn.difficulty.beginner') }}</span>
            </div>
          </div>

          <!-- Chart Reading Learning Path -->
          <div class="path-card">
            <div class="path-header">
              <div class="path-icon">📊</div>
              <h3>{{ $t('learn.paths.reading.title') }}</h3>
            </div>
            <p class="path-description">{{ $t('learn.paths.reading.description') }}</p>
            <div class="path-lessons">
              <div class="lesson-item" v-for="lesson in readingLessons" :key="lesson">
                <router-link :to="`/learn/reading/${lesson}`" class="lesson-link">
                  {{ $t('learn.paths.reading.lessons.' + lesson) }}
                </router-link>
              </div>
            </div>
            <div class="path-stats">
              <span class="lesson-count">{{ readingLessons.length }} {{ $t('learn.lessons') }}</span>
              <span class="difficulty">{{ $t('learn.difficulty.intermediate') }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Articles -->
      <section class="featured-articles">
        <h2 class="section-title">{{ $t('learn.featured.title') }}</h2>
        <div class="articles-grid">
          <article class="article-card" v-for="article in featuredArticles" :key="article.id">
            <div class="article-image">
              <div class="article-icon">{{ article.icon }}</div>
            </div>
            <div class="article-content">
              <h3 class="article-title">
                <router-link :to="article.path">{{ $t('learn.articles.' + article.id + '.title') }}</router-link>
              </h3>
              <p class="article-excerpt">{{ $t('learn.articles.' + article.id + '.excerpt') }}</p>
              <div class="article-meta">
                <span class="article-category">{{ $t('learn.categories.' + article.category) }}</span>
                <span class="article-time">{{ $t('learn.readTime', { minutes: article.readTime }) }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Categories -->
      <section class="categories-section">
        <h2 class="section-title">{{ $t('learn.categories.title') }}</h2>
        <div class="categories-grid">
          <div class="category-card" v-for="category in categories" :key="category.id">
            <div class="category-icon">{{ category.icon }}</div>
            <h3>{{ $t('learn.categories.' + category.id) }}</h3>
            <p>{{ $t('learn.categoryDescriptions.' + category.id) }}</p>
            <router-link :to="`/learn/category/${category.id}`" class="category-link">
              {{ $t('learn.exploreCategory') }}
            </router-link>
          </div>
        </div>
      </section>

      <!-- Quick Start Guide -->
      <section class="quick-start">
        <h2 class="section-title">{{ $t('learn.quickStart.title') }}</h2>
        <div class="quick-start-content">
          <p>{{ $t('learn.quickStart.description') }}</p>
          <ol class="quick-start-steps">
            <li>{{ $t('learn.quickStart.step1') }}</li>
            <li>{{ $t('learn.quickStart.step2') }}</li>
            <li>{{ $t('learn.quickStart.step3') }}</li>
            <li>{{ $t('learn.quickStart.step4') }}</li>
          </ol>
          <div class="quick-start-cta">
            <router-link to="/" class="cta-button">
              {{ $t('learn.quickStart.cta') }}
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
  name: 'LearnPage',
  mixins: [i18nMixin],
  
  components: {
    LanguageSwitcher,
    AppNavigation
  },
  
  data() {
    return {
      baziLessons: [
        'basics',
        'heavenly-stems',
        'earthly-branches',
        'five-elements',
        'reading-pillars',
        'interpreting-chart'
      ],
      astrologyLessons: [
        'introduction',
        'zodiac-signs',
        'planets',
        'houses',
        'aspects',
        'birth-chart'
      ],
      readingLessons: [
        'preparation',
        'analysis-method',
        'interpretation',
        'timing',
        'synthesis',
        'practice'
      ],
      featuredArticles: [
        {
          id: 'understanding-birth-chart',
          icon: '🌟',
          category: 'astrology',
          readTime: 8,
          path: '/learn/article/understanding-birth-chart'
        },
        {
          id: 'five-elements-theory',
          icon: '🌿',
          category: 'bazi',
          readTime: 12,
          path: '/learn/article/five-elements-theory'
        },
        {
          id: 'career-astrology',
          icon: '💼',
          category: 'practical',
          readTime: 15,
          path: '/learn/article/career-astrology'
        },
        {
          id: 'relationship-compatibility',
          icon: '💕',
          category: 'relationships',
          readTime: 10,
          path: '/learn/article/relationship-compatibility'
        }
      ],
      categories: [
        { id: 'fundamentals', icon: '📚' },
        { id: 'astrology', icon: '⭐' },
        { id: 'bazi', icon: '🔮' },
        { id: 'practical', icon: '💡' },
        { id: 'relationships', icon: '💕' },
        { id: 'career', icon: '💼' }
      ]
    }
  },
  
  computed: {
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  
  mounted() {
    // Set page title
    document.title = this.$t('learn.pageTitle') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('learn.metaDescription'))
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
.learn-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 90px 20px 20px 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #d35400;
  font-family: 'Shippori Mincho', serif;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
}

/* Content */
.content-container {
  flex: 1;
}

/* Introduction */
.intro-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
  text-align: center;
}

.intro-content h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.intro-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 15px;
}

/* Section Titles */
.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 30px;
  font-family: 'Shippori Mincho', serif;
  text-align: center;
  border-bottom: 3px solid #f0f0f0;
  padding-bottom: 15px;
}

/* Learning Paths */
.learning-paths {
  margin-bottom: 50px;
}

.paths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
}

.path-card {
  background: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.path-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.path-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.path-icon {
  font-size: 2.5rem;
  min-width: 60px;
}

.path-header h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0;
  font-family: 'Shippori Mincho', serif;
}

.path-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.path-lessons {
  margin-bottom: 20px;
}

.lesson-item {
  margin-bottom: 8px;
}

.lesson-link {
  color: #d35400;
  text-decoration: none;
  font-size: 0.95rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.lesson-link:hover {
  border-bottom-color: #d35400;
}

.path-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
  font-size: 0.9rem;
}

.lesson-count {
  color: #666;
  font-weight: 500;
}

.difficulty {
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Featured Articles */
.featured-articles {
  margin-bottom: 50px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.article-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-3px);
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

.article-title {
  margin-bottom: 10px;
}

.article-title a {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Shippori Mincho', serif;
}

.article-title a:hover {
  color: #d35400;
}

.article-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.article-category {
  background: #f8f9fa;
  color: #666;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 500;
}

.article-time {
  color: #999;
}

/* Categories */
.categories-section {
  margin-bottom: 50px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.category-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-3px);
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.category-card h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.category-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.category-link {
  color: #d35400;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.category-link:hover {
  border-bottom-color: #d35400;
}

/* Quick Start */
.quick-start {
  background: #fff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.quick-start-content p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 20px;
}

.quick-start-steps {
  margin: 20px 0;
  padding-left: 20px;
}

.quick-start-steps li {
  margin-bottom: 10px;
  color: #444;
  line-height: 1.6;
}

.quick-start-cta {
  text-align: center;
  margin-top: 25px;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(211, 84, 0, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(211, 84, 0, 0.4);
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
  .learn-container {
    padding: 80px 15px 15px 15px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .paths-grid,
  .articles-grid,
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .path-card,
  .quick-start {
    padding: 20px;
  }
  
  .intro-section {
    padding: 20px;
  }
  
  .intro-content h2 {
    font-size: 1.5rem;
  }
  
  .intro-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .path-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .path-stats {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
}
</style>