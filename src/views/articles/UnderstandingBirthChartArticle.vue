<template>
  <div class="article-container">
    <AppNavigation />
    
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="article-header">
      <div class="breadcrumb">
        <router-link to="/learn">{{ $t('article.breadcrumb.learn') }}</router-link>
        <span class="separator">></span>
        <span>{{ $t('article.understandingBirthChart.title') }}</span>
      </div>
      
      <h1 class="article-title">{{ $t('article.understandingBirthChart.title') }}</h1>
      
      <div class="article-meta">
        <span class="article-category">{{ $t('learn.categories.astrology') }}</span>
        <span class="article-date">{{ $t('article.publishedOn') }}: 2025年8月19日</span>
        <span class="article-time">{{ $t('learn.readTime', { minutes: 8 }) }}</span>
      </div>
    </header>

    <div class="article-content">
      <!-- Introduction -->
      <section class="content-section">
        <p class="article-lead">{{ $t('article.understandingBirthChart.introduction') }}</p>
        
        <p>{{ $t('article.understandingBirthChart.description1') }}</p>
        <p>{{ $t('article.understandingBirthChart.description2') }}</p>
      </section>

      <!-- What is a Birth Chart -->
      <section class="content-section">
        <h2>{{ $t('article.understandingBirthChart.sections.whatIs.title') }}</h2>
        
        <p>{{ $t('article.understandingBirthChart.sections.whatIs.description1') }}</p>
        
        <div class="highlight-box">
          <h3>{{ $t('article.understandingBirthChart.sections.whatIs.keyElements.title') }}</h3>
          <ul>
            <li><strong>{{ $t('article.understandingBirthChart.sections.whatIs.keyElements.birthDate') }}</strong>: {{ $t('article.understandingBirthChart.sections.whatIs.keyElements.birthDateDesc') }}</li>
            <li><strong>{{ $t('article.understandingBirthChart.sections.whatIs.keyElements.birthTime') }}</strong>: {{ $t('article.understandingBirthChart.sections.whatIs.keyElements.birthTimeDesc') }}</li>
            <li><strong>{{ $t('article.understandingBirthChart.sections.whatIs.keyElements.birthPlace') }}</strong>: {{ $t('article.understandingBirthChart.sections.whatIs.keyElements.birthPlaceDesc') }}</li>
          </ul>
        </div>
        
        <p>{{ $t('article.understandingBirthChart.sections.whatIs.description2') }}</p>
      </section>

      <!-- Main Components -->
      <section class="content-section">
        <h2>{{ $t('article.understandingBirthChart.sections.components.title') }}</h2>
        
        <h3>{{ $t('article.understandingBirthChart.sections.components.planets.title') }}</h3>
        <p>{{ $t('article.understandingBirthChart.sections.components.planets.description') }}</p>
        
        <div class="info-grid">
          <div class="info-card">
            <h4>{{ $t('article.understandingBirthChart.sections.components.planets.personal.title') }}</h4>
            <ul>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.personal.sun') }}</li>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.personal.moon') }}</li>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.personal.mercury') }}</li>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.personal.venus') }}</li>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.personal.mars') }}</li>
            </ul>
          </div>
          
          <div class="info-card">
            <h4>{{ $t('article.understandingBirthChart.sections.components.planets.social.title') }}</h4>
            <ul>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.social.jupiter') }}</li>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.social.saturn') }}</li>
            </ul>
          </div>
          
          <div class="info-card">
            <h4>{{ $t('article.understandingBirthChart.sections.components.planets.generational.title') }}</h4>
            <ul>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.generational.uranus') }}</li>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.generational.neptune') }}</li>
              <li>{{ $t('article.understandingBirthChart.sections.components.planets.generational.pluto') }}</li>
            </ul>
          </div>
        </div>

        <h3>{{ $t('article.understandingBirthChart.sections.components.zodiac.title') }}</h3>
        <p>{{ $t('article.understandingBirthChart.sections.components.zodiac.description') }}</p>
        
        <h3>{{ $t('article.understandingBirthChart.sections.components.houses.title') }}</h3>
        <p>{{ $t('article.understandingBirthChart.sections.components.houses.description') }}</p>
        
        <div class="tip-box">
          <h4>{{ $t('article.understandingBirthChart.sections.components.houses.tip.title') }}</h4>
          <p>{{ $t('article.understandingBirthChart.sections.components.houses.tip.description') }}</p>
        </div>
      </section>

      <!-- How to Read -->
      <section class="content-section">
        <h2>{{ $t('article.understandingBirthChart.sections.howToRead.title') }}</h2>
        
        <p>{{ $t('article.understandingBirthChart.sections.howToRead.description') }}</p>
        
        <ol class="reading-steps">
          <li>
            <strong>{{ $t('article.understandingBirthChart.sections.howToRead.steps.step1.title') }}</strong>
            <p>{{ $t('article.understandingBirthChart.sections.howToRead.steps.step1.description') }}</p>
          </li>
          <li>
            <strong>{{ $t('article.understandingBirthChart.sections.howToRead.steps.step2.title') }}</strong>
            <p>{{ $t('article.understandingBirthChart.sections.howToRead.steps.step2.description') }}</p>
          </li>
          <li>
            <strong>{{ $t('article.understandingBirthChart.sections.howToRead.steps.step3.title') }}</strong>
            <p>{{ $t('article.understandingBirthChart.sections.howToRead.steps.step3.description') }}</p>
          </li>
          <li>
            <strong>{{ $t('article.understandingBirthChart.sections.howToRead.steps.step4.title') }}</strong>
            <p>{{ $t('article.understandingBirthChart.sections.howToRead.steps.step4.description') }}</p>
          </li>
        </ol>
      </section>

      <!-- Big Three -->
      <section class="content-section">
        <h2>{{ $t('article.understandingBirthChart.sections.bigThree.title') }}</h2>
        
        <p>{{ $t('article.understandingBirthChart.sections.bigThree.description') }}</p>
        
        <div class="big-three-grid">
          <div class="big-three-card">
            <div class="planet-icon">☉</div>
            <h3>{{ $t('article.understandingBirthChart.sections.bigThree.sun.title') }}</h3>
            <p>{{ $t('article.understandingBirthChart.sections.bigThree.sun.description') }}</p>
          </div>
          
          <div class="big-three-card">
            <div class="planet-icon">☽</div>
            <h3>{{ $t('article.understandingBirthChart.sections.bigThree.moon.title') }}</h3>
            <p>{{ $t('article.understandingBirthChart.sections.bigThree.moon.description') }}</p>
          </div>
          
          <div class="big-three-card">
            <div class="planet-icon">⬆</div>
            <h3>{{ $t('article.understandingBirthChart.sections.bigThree.ascendant.title') }}</h3>
            <p>{{ $t('article.understandingBirthChart.sections.bigThree.ascendant.description') }}</p>
          </div>
        </div>
      </section>

      <!-- Getting Started -->
      <section class="content-section">
        <h2>{{ $t('article.understandingBirthChart.sections.gettingStarted.title') }}</h2>
        
        <p>{{ $t('article.understandingBirthChart.sections.gettingStarted.description') }}</p>
        
        <div class="cta-section">
          <router-link to="/" class="cta-button">
            {{ $t('article.understandingBirthChart.sections.gettingStarted.cta') }}
          </router-link>
        </div>
        
        <div class="next-reading">
          <h3>{{ $t('article.nextReading') }}</h3>
          <ul>
            <li><router-link to="/learn/astrology/zodiac-signs">{{ $t('article.relatedArticles.zodiacSigns') }}</router-link></li>
            <li><router-link to="/learn/astrology/planets">{{ $t('article.relatedArticles.planetMeanings') }}</router-link></li>
            <li><router-link to="/learn/astrology/houses">{{ $t('article.relatedArticles.astrologyHouses') }}</router-link></li>
          </ul>
        </div>
      </section>
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
  name: 'UnderstandingBirthChartArticle',
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
    document.title = this.$t('article.understandingBirthChart.pageTitle') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('article.understandingBirthChart.metaDescription'))
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
  padding: 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 90px; /* Account for navigation */
}

/* Header */
.article-header {
  margin-bottom: 40px;
}

.breadcrumb {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
}

.breadcrumb a {
  color: #d35400;
  text-decoration: none;
}

.breadcrumb .separator {
  margin: 0 8px;
  color: #ccc;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2c3e50;
  font-family: 'Shippori Mincho', serif;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}

.article-category {
  background: #e8f5e8;
  color: #2d5a2d;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

/* Content */
.article-content {
  flex: 1;
}

.content-section {
  margin-bottom: 40px;
}

.article-lead {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444;
  font-weight: 500;
  margin-bottom: 25px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  border-left: 4px solid #d35400;
}

.content-section h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.content-section h3 {
  font-size: 1.4rem;
  color: #34495e;
  margin: 25px 0 15px 0;
  font-family: 'Shippori Mincho', serif;
}

.content-section p {
  line-height: 1.8;
  margin-bottom: 16px;
  color: #444;
  font-size: 1rem;
}

.content-section ul, .content-section ol {
  margin: 15px 0;
  padding-left: 25px;
}

.content-section li {
  margin-bottom: 8px;
  line-height: 1.6;
  color: #555;
}

/* Highlight Boxes */
.highlight-box {
  background: #fff8dc;
  border: 1px solid #f0e68c;
  border-left: 4px solid #daa520;
  border-radius: 8px;
  padding: 20px;
  margin: 25px 0;
}

.highlight-box h3 {
  color: #b8860b;
  margin-top: 0;
  margin-bottom: 15px;
}

.tip-box {
  background: #e8f5e8;
  border: 1px solid #c3e6c3;
  border-left: 4px solid #28a745;
  border-radius: 8px;
  padding: 20px;
  margin: 25px 0;
}

.tip-box h4 {
  color: #155724;
  margin-top: 0;
  margin-bottom: 10px;
}

.tip-box p {
  color: #155724;
  margin: 0;
}

/* Grids */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.info-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #e9ecef;
}

.info-card h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.info-card ul {
  margin: 0;
  padding-left: 20px;
}

/* Big Three Grid */
.big-three-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.big-three-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.big-three-card:hover {
  transform: translateY(-5px);
}

.planet-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  color: #d35400;
}

.big-three-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.big-three-card p {
  margin: 0;
  line-height: 1.6;
  color: #666;
}

/* Reading Steps */
.reading-steps {
  counter-reset: step-counter;
  list-style: none;
  padding-left: 0;
}

.reading-steps li {
  counter-increment: step-counter;
  position: relative;
  padding: 20px 0 20px 60px;
  border-left: 2px solid #f0f0f0;
  margin-bottom: 20px;
}

.reading-steps li::before {
  content: counter(step-counter);
  position: absolute;
  left: -15px;
  top: 20px;
  background: #d35400;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.reading-steps li:last-child {
  border-left: none;
}

.reading-steps li strong {
  color: #2c3e50;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 8px;
}

.reading-steps li p {
  margin: 0;
  color: #555;
}

/* CTA Section */
.cta-section {
  text-align: center;
  margin: 30px 0;
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

/* Next Reading */
.next-reading {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 25px;
  margin-top: 30px;
}

.next-reading h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.next-reading ul {
  margin: 0;
  padding-left: 20px;
}

.next-reading a {
  color: #d35400;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.next-reading a:hover {
  border-bottom-color: #d35400;
}

/* Footer */
.footer {
  text-align: center;
  font-size: 0.9rem;
  color: #95a5a6;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .article-container {
    padding: 15px;
    padding-top: 80px;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .info-grid,
  .big-three-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .reading-steps li {
    padding-left: 45px;
  }
  
  .reading-steps li::before {
    left: -12px;
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .article-title {
    font-size: 1.8rem;
  }
  
  .content-section h2 {
    font-size: 1.5rem;
  }
  
  .content-section h3 {
    font-size: 1.2rem;
  }
  
  .highlight-box,
  .tip-box,
  .info-card,
  .next-reading {
    padding: 15px;
  }
  
  .big-three-card {
    padding: 20px;
  }
  
  .planet-icon {
    font-size: 2.5rem;
  }
}
</style>