<template>
  <div class="article-container">
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
        <span class="current">{{ $t('learn.articles.career-astrology.title') }}</span>
      </nav>
      <h1 class="title">{{ $t('learn.articles.career-astrology.title') }}</h1>
      <div class="article-meta">
        <span class="category">{{ $t('learn.categories.practical') }}</span>
        <span class="read-time">{{ $t('learn.readTime', { minutes: 15 }) }}</span>
        <span class="date">{{ $t('articleMeta.publishDate') }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="article-content">
        <div class="article-intro">
          <p class="lead">{{ $t('learn.articles.career-astrology.excerpt') }}</p>
        </div>

        <div class="article-body">
          <section class="section">
            <h2>{{ $t('careerAstrology.introduction.title') }}</h2>
            <p>{{ $t('careerAstrology.introduction.text1') }}</p>
            <p>{{ $t('careerAstrology.introduction.text2') }}</p>
          </section>

          <section class="section">
            <h2>{{ $t('careerAstrology.keyFactors.title') }}</h2>
            <div class="factors-grid">
              <div class="factor-card">
                <div class="factor-icon">🌟</div>
                <h3>{{ $t('careerAstrology.keyFactors.midheaven.title') }}</h3>
                <p>{{ $t('careerAstrology.keyFactors.midheaven.description') }}</p>
              </div>
              <div class="factor-card">
                <div class="factor-icon">🏠</div>
                <h3>{{ $t('careerAstrology.keyFactors.tenthHouse.title') }}</h3>
                <p>{{ $t('careerAstrology.keyFactors.tenthHouse.description') }}</p>
              </div>
              <div class="factor-card">
                <div class="factor-icon">☀️</div>
                <h3>{{ $t('careerAstrology.keyFactors.sunSign.title') }}</h3>
                <p>{{ $t('careerAstrology.keyFactors.sunSign.description') }}</p>
              </div>
              <div class="factor-card">
                <div class="factor-icon">💫</div>
                <h3>{{ $t('careerAstrology.keyFactors.aspects.title') }}</h3>
                <p>{{ $t('careerAstrology.keyFactors.aspects.description') }}</p>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>{{ $t('careerAstrology.careerSigns.title') }}</h2>
            <p>{{ $t('careerAstrology.careerSigns.introduction') }}</p>
            
            <div class="career-signs">
              <div class="sign-group">
                <h3>{{ $t('careerAstrology.careerSigns.fire.title') }}</h3>
                <p>{{ $t('careerAstrology.careerSigns.fire.description') }}</p>
                <ul>
                  <li>{{ $t('careerAstrology.careerSigns.fire.career1') }}</li>
                  <li>{{ $t('careerAstrology.careerSigns.fire.career2') }}</li>
                  <li>{{ $t('careerAstrology.careerSigns.fire.career3') }}</li>
                </ul>
              </div>
              
              <div class="sign-group">
                <h3>{{ $t('careerAstrology.careerSigns.earth.title') }}</h3>
                <p>{{ $t('careerAstrology.careerSigns.earth.description') }}</p>
                <ul>
                  <li>{{ $t('careerAstrology.careerSigns.earth.career1') }}</li>
                  <li>{{ $t('careerAstrology.careerSigns.earth.career2') }}</li>
                  <li>{{ $t('careerAstrology.careerSigns.earth.career3') }}</li>
                </ul>
              </div>
              
              <div class="sign-group">
                <h3>{{ $t('careerAstrology.careerSigns.air.title') }}</h3>
                <p>{{ $t('careerAstrology.careerSigns.air.description') }}</p>
                <ul>
                  <li>{{ $t('careerAstrology.careerSigns.air.career1') }}</li>
                  <li>{{ $t('careerAstrology.careerSigns.air.career2') }}</li>
                  <li>{{ $t('careerAstrology.careerSigns.air.career3') }}</li>
                </ul>
              </div>
              
              <div class="sign-group">
                <h3>{{ $t('careerAstrology.careerSigns.water.title') }}</h3>
                <p>{{ $t('careerAstrology.careerSigns.water.description') }}</p>
                <ul>
                  <li>{{ $t('careerAstrology.careerSigns.water.career1') }}</li>
                  <li>{{ $t('careerAstrology.careerSigns.water.career2') }}</li>
                  <li>{{ $t('careerAstrology.careerSigns.water.career3') }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>{{ $t('careerAstrology.practical.title') }}</h2>
            <div class="tips-box">
              <h3>{{ $t('careerAstrology.practical.subtitle') }}</h3>
              <ol>
                <li>{{ $t('careerAstrology.practical.tip1') }}</li>
                <li>{{ $t('careerAstrology.practical.tip2') }}</li>
                <li>{{ $t('careerAstrology.practical.tip3') }}</li>
                <li>{{ $t('careerAstrology.practical.tip4') }}</li>
                <li>{{ $t('careerAstrology.practical.tip5') }}</li>
              </ol>
            </div>
          </section>

          <section class="section">
            <h2>{{ $t('careerAstrology.conclusion.title') }}</h2>
            <p>{{ $t('careerAstrology.conclusion.text1') }}</p>
            <p>{{ $t('careerAstrology.conclusion.text2') }}</p>
            
            <div class="cta-box">
              <h3>{{ $t('careerAstrology.cta.title') }}</h3>
              <p>{{ $t('careerAstrology.cta.description') }}</p>
              <router-link to="/" class="cta-button">
                {{ $t('careerAstrology.cta.button') }}
              </router-link>
            </div>
          </section>
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
  name: 'CareerAstrologyArticle',
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
    document.title = this.$t('learn.articles.career-astrology.title') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('learn.articles.career-astrology.excerpt'))
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
.article-container {
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

.article-meta {
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

.read-time, .date {
  color: #666;
  font-weight: 500;
}

/* Content */
.content-container {
  flex: 1;
}

.article-content {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.article-intro {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.lead {
  font-size: 1.2rem;
  line-height: 1.7;
  color: #555;
  font-style: italic;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.section p {
  line-height: 1.7;
  color: #555;
  margin-bottom: 15px;
}

.factors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.factor-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border-left: 4px solid #d35400;
}

.factor-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.factor-card h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.factor-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.career-signs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 25px 0;
}

.sign-group {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
}

.sign-group h3 {
  font-size: 1.2rem;
  color: #d35400;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.sign-group ul {
  padding-left: 20px;
  margin-top: 15px;
}

.sign-group li {
  margin-bottom: 8px;
  line-height: 1.5;
  color: #555;
}

.tips-box {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid #d35400;
}

.tips-box h3 {
  color: #d35400;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.tips-box ol {
  padding-left: 20px;
}

.tips-box li {
  margin-bottom: 12px;
  line-height: 1.6;
  color: #555;
}

.cta-box {
  background: #fff;
  border: 2px solid #d35400;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  margin-top: 30px;
}

.cta-box h3 {
  color: #d35400;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
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
  margin-top: 15px;
}

.cta-button:hover {
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
  .article-container {
    padding: 70px 15px 15px 15px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .article-meta {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .article-content {
    padding: 20px;
  }
  
  .factors-grid {
    grid-template-columns: 1fr;
  }
  
  .career-signs {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }
  
  .lead {
    font-size: 1.1rem;
  }
}
</style>