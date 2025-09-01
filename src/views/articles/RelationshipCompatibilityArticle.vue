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
        <span class="current">{{ $t('learn.articles.relationship-compatibility.title') }}</span>
      </nav>
      <h1 class="title">{{ $t('learn.articles.relationship-compatibility.title') }}</h1>
      <div class="article-meta">
        <span class="category">{{ $t('learn.categories.relationships') }}</span>
        <span class="read-time">{{ $t('learn.readTime', { minutes: 10 }) }}</span>
        <span class="date">{{ $t('articleMeta.publishDate') }}</span>
      </div>
    </header>

    <div class="content-container">
      <article class="article-content">
        <div class="article-intro">
          <p class="lead">{{ $t('learn.articles.relationship-compatibility.excerpt') }}</p>
        </div>

        <div class="article-body">
          <section class="section">
            <h2>{{ $t('relationshipCompatibility.introduction.title') }}</h2>
            <p>{{ $t('relationshipCompatibility.introduction.text1') }}</p>
            <p>{{ $t('relationshipCompatibility.introduction.text2') }}</p>
          </section>

          <section class="section">
            <h2>{{ $t('relationshipCompatibility.keyAspects.title') }}</h2>
            <div class="aspects-grid">
              <div class="aspect-card">
                <div class="aspect-icon">☀️</div>
                <h3>{{ $t('relationshipCompatibility.keyAspects.sunMoon.title') }}</h3>
                <p>{{ $t('relationshipCompatibility.keyAspects.sunMoon.description') }}</p>
              </div>
              <div class="aspect-card">
                <div class="aspect-icon">💕</div>
                <h3>{{ $t('relationshipCompatibility.keyAspects.venus.title') }}</h3>
                <p>{{ $t('relationshipCompatibility.keyAspects.venus.description') }}</p>
              </div>
              <div class="aspect-card">
                <div class="aspect-icon">🔥</div>
                <h3>{{ $t('relationshipCompatibility.keyAspects.mars.title') }}</h3>
                <p>{{ $t('relationshipCompatibility.keyAspects.mars.description') }}</p>
              </div>
              <div class="aspect-card">
                <div class="aspect-icon">🏠</div>
                <h3>{{ $t('relationshipCompatibility.keyAspects.houses.title') }}</h3>
                <p>{{ $t('relationshipCompatibility.keyAspects.houses.description') }}</p>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>{{ $t('relationshipCompatibility.elements.title') }}</h2>
            <p>{{ $t('relationshipCompatibility.elements.introduction') }}</p>
            
            <div class="compatibility-matrix">
              <div class="matrix-row">
                <div class="element-header fire">{{ $t('relationshipCompatibility.elements.fire') }}</div>
                <div class="compatibility-cell high">{{ $t('relationshipCompatibility.compatibility.high') }}</div>
                <div class="compatibility-cell medium">{{ $t('relationshipCompatibility.compatibility.medium') }}</div>
                <div class="compatibility-cell high">{{ $t('relationshipCompatibility.compatibility.high') }}</div>
                <div class="compatibility-cell low">{{ $t('relationshipCompatibility.compatibility.low') }}</div>
              </div>
              <div class="matrix-row">
                <div class="element-header earth">{{ $t('relationshipCompatibility.elements.earth') }}</div>
                <div class="compatibility-cell medium">{{ $t('relationshipCompatibility.compatibility.medium') }}</div>
                <div class="compatibility-cell high">{{ $t('relationshipCompatibility.compatibility.high') }}</div>
                <div class="compatibility-cell low">{{ $t('relationshipCompatibility.compatibility.low') }}</div>
                <div class="compatibility-cell high">{{ $t('relationshipCompatibility.compatibility.high') }}</div>
              </div>
              <div class="matrix-row">
                <div class="element-header air">{{ $t('relationshipCompatibility.elements.air') }}</div>
                <div class="compatibility-cell high">{{ $t('relationshipCompatibility.compatibility.high') }}</div>
                <div class="compatibility-cell low">{{ $t('relationshipCompatibility.compatibility.low') }}</div>
                <div class="compatibility-cell high">{{ $t('relationshipCompatibility.compatibility.high') }}</div>
                <div class="compatibility-cell medium">{{ $t('relationshipCompatibility.compatibility.medium') }}</div>
              </div>
              <div class="matrix-row">
                <div class="element-header water">{{ $t('relationshipCompatibility.elements.water') }}</div>
                <div class="compatibility-cell low">{{ $t('relationshipCompatibility.compatibility.low') }}</div>
                <div class="compatibility-cell high">{{ $t('relationshipCompatibility.compatibility.high') }}</div>
                <div class="compatibility-cell medium">{{ $t('relationshipCompatibility.compatibility.medium') }}</div>
                <div class="compatibility-cell high">{{ $t('relationshipCompatibility.compatibility.high') }}</div>
              </div>
              <div class="matrix-labels">
                <div></div>
                <div class="label">{{ $t('relationshipCompatibility.elements.fire') }}</div>
                <div class="label">{{ $t('relationshipCompatibility.elements.earth') }}</div>
                <div class="label">{{ $t('relationshipCompatibility.elements.air') }}</div>
                <div class="label">{{ $t('relationshipCompatibility.elements.water') }}</div>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>{{ $t('relationshipCompatibility.redFlags.title') }}</h2>
            <div class="warning-box">
              <h3>{{ $t('relationshipCompatibility.redFlags.subtitle') }}</h3>
              <ul>
                <li>{{ $t('relationshipCompatibility.redFlags.flag1') }}</li>
                <li>{{ $t('relationshipCompatibility.redFlags.flag2') }}</li>
                <li>{{ $t('relationshipCompatibility.redFlags.flag3') }}</li>
                <li>{{ $t('relationshipCompatibility.redFlags.flag4') }}</li>
                <li>{{ $t('relationshipCompatibility.redFlags.flag5') }}</li>
              </ul>
            </div>
          </section>

          <section class="section">
            <h2>{{ $t('relationshipCompatibility.tips.title') }}</h2>
            <div class="tips-grid">
              <div class="tip-card">
                <div class="tip-number">1</div>
                <h3>{{ $t('relationshipCompatibility.tips.tip1.title') }}</h3>
                <p>{{ $t('relationshipCompatibility.tips.tip1.description') }}</p>
              </div>
              <div class="tip-card">
                <div class="tip-number">2</div>
                <h3>{{ $t('relationshipCompatibility.tips.tip2.title') }}</h3>
                <p>{{ $t('relationshipCompatibility.tips.tip2.description') }}</p>
              </div>
              <div class="tip-card">
                <div class="tip-number">3</div>
                <h3>{{ $t('relationshipCompatibility.tips.tip3.title') }}</h3>
                <p>{{ $t('relationshipCompatibility.tips.tip3.description') }}</p>
              </div>
              <div class="tip-card">
                <div class="tip-number">4</div>
                <h3>{{ $t('relationshipCompatibility.tips.tip4.title') }}</h3>
                <p>{{ $t('relationshipCompatibility.tips.tip4.description') }}</p>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>{{ $t('relationshipCompatibility.conclusion.title') }}</h2>
            <p>{{ $t('relationshipCompatibility.conclusion.text1') }}</p>
            <p>{{ $t('relationshipCompatibility.conclusion.text2') }}</p>
            
            <div class="cta-box">
              <h3>{{ $t('relationshipCompatibility.cta.title') }}</h3>
              <p>{{ $t('relationshipCompatibility.cta.description') }}</p>
              <router-link to="/" class="cta-button">
                {{ $t('relationshipCompatibility.cta.button') }}
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
  name: 'RelationshipCompatibilityArticle',
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
    document.title = this.$t('learn.articles.relationship-compatibility.title') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('learn.articles.relationship-compatibility.excerpt'))
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
  background: #e91e63;
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

.aspects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.aspect-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border-left: 4px solid #e91e63;
}

.aspect-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.aspect-card h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.aspect-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.compatibility-matrix {
  margin: 25px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.matrix-row {
  display: grid;
  grid-template-columns: 120px repeat(4, 1fr);
  align-items: center;
}

.matrix-labels {
  display: grid;
  grid-template-columns: 120px repeat(4, 1fr);
  background: #f8f9fa;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  padding: 10px 0;
}

.element-header {
  padding: 15px 10px;
  color: white;
  font-weight: 600;
  text-align: center;
}

.element-header.fire {
  background: #e74c3c;
}

.element-header.earth {
  background: #8e7cc3;
}

.element-header.air {
  background: #3498db;
}

.element-header.water {
  background: #1abc9c;
}

.compatibility-cell {
  padding: 12px;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
}

.compatibility-cell.high {
  background: #d4edda;
  color: #155724;
}

.compatibility-cell.medium {
  background: #fff3cd;
  color: #856404;
}

.compatibility-cell.low {
  background: #f8d7da;
  color: #721c24;
}

.warning-box {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid #ffc107;
}

.warning-box h3 {
  color: #856404;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.warning-box ul {
  padding-left: 20px;
}

.warning-box li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #856404;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.tip-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.tip-number {
  position: absolute;
  top: -10px;
  left: 20px;
  background: #e91e63;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.tip-card h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 10px;
  margin-top: 10px;
  font-family: 'Shippori Mincho', serif;
}

.tip-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.cta-box {
  background: #fff;
  border: 2px solid #e91e63;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  margin-top: 30px;
}

.cta-box h3 {
  color: #e91e63;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #e91e63 0%, #f06292 100%);
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
  box-shadow: 0 6px 20px rgba(233, 30, 99, 0.3);
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
  
  .aspects-grid {
    grid-template-columns: 1fr;
  }
  
  .matrix-row, .matrix-labels {
    grid-template-columns: 80px repeat(4, 1fr);
    font-size: 0.8rem;
  }
  
  .element-header {
    padding: 10px 5px;
    font-size: 0.8rem;
  }
  
  .compatibility-cell {
    padding: 8px 4px;
    font-size: 0.8rem;
  }
  
  .tips-grid {
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
  
  .matrix-row, .matrix-labels {
    grid-template-columns: 60px repeat(4, 1fr);
    font-size: 0.7rem;
  }
  
  .compatibility-cell {
    padding: 6px 2px;
  }
}
</style>