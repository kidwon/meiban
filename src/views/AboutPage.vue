<template>
  <div class="about-container">
    <AppNavigation />
    
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="header">
      <h1 class="title">{{ $t('about.title') }}</h1>
      <p class="subtitle">{{ $t('about.subtitle') }}</p>
    </header>

    <div class="content-container">
      <!-- Our Mission -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('about.mission.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('about.mission.description1') }}</p>
          <p>{{ $t('about.mission.description2') }}</p>
          <p>{{ $t('about.mission.description3') }}</p>
        </div>
      </section>

      <!-- What We Offer -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('about.services.title') }}</h2>
        <div class="services-grid">
          <div class="service-item">
            <div class="service-icon">🔮</div>
            <h3>{{ $t('about.services.bazi.title') }}</h3>
            <p>{{ $t('about.services.bazi.description') }}</p>
          </div>
          <div class="service-item">
            <div class="service-icon">⭐</div>
            <h3>{{ $t('about.services.western.title') }}</h3>
            <p>{{ $t('about.services.western.description') }}</p>
          </div>
          <div class="service-item">
            <div class="service-icon">🌙</div>
            <h3>{{ $t('about.services.transit.title') }}</h3>
            <p>{{ $t('about.services.transit.description') }}</p>
          </div>
        </div>
      </section>

      <!-- Our Methodology -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('about.methodology.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('about.methodology.description1') }}</p>
          <ul class="method-list">
            <li>{{ $t('about.methodology.point1') }}</li>
            <li>{{ $t('about.methodology.point2') }}</li>
            <li>{{ $t('about.methodology.point3') }}</li>
            <li>{{ $t('about.methodology.point4') }}</li>
          </ul>
          <p>{{ $t('about.methodology.description2') }}</p>
        </div>
      </section>

      <!-- Accuracy & Reliability -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('about.accuracy.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('about.accuracy.description1') }}</p>
          <p>{{ $t('about.accuracy.description2') }}</p>
          <div class="tech-highlights">
            <div class="tech-item">
              <strong>{{ $t('about.accuracy.tech1.title') }}</strong>
              <span>{{ $t('about.accuracy.tech1.description') }}</span>
            </div>
            <div class="tech-item">
              <strong>{{ $t('about.accuracy.tech2.title') }}</strong>
              <span>{{ $t('about.accuracy.tech2.description') }}</span>
            </div>
            <div class="tech-item">
              <strong>{{ $t('about.accuracy.tech3.title') }}</strong>
              <span>{{ $t('about.accuracy.tech3.description') }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Languages & Accessibility -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('about.accessibility.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('about.accessibility.description1') }}</p>
          <p>{{ $t('about.accessibility.description2') }}</p>
        </div>
      </section>

      <!-- Privacy & Security -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('about.privacy.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('about.privacy.description1') }}</p>
          <p>{{ $t('about.privacy.description2') }}</p>
        </div>
      </section>
    </div>

    <div class="cta-section">
      <router-link to="/" class="cta-button">
        {{ $t('about.cta') }}
      </router-link>
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
  name: 'AboutPage',
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
    document.title = this.$t('about.pageTitle') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('about.metaDescription'))
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
.about-container {
  max-width: 800px;
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
  font-size: 1.1rem;
  color: #7f8c8d;
  margin: 0;
}

/* Content */
.content-container {
  flex: 1;
}

.content-section {
  margin-bottom: 40px;
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.section-content {
  line-height: 1.7;
  font-size: 1rem;
}

.section-content p {
  margin-bottom: 16px;
  color: #444;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.service-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.service-item h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.service-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Method List */
.method-list {
  margin: 20px 0;
  padding-left: 0;
}

.method-list li {
  list-style: none;
  position: relative;
  padding: 8px 0 8px 25px;
  color: #444;
}

.method-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #27ae60;
  font-weight: bold;
}

/* Tech Highlights */
.tech-highlights {
  margin-top: 20px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #d35400;
}

.tech-item strong {
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 1.05rem;
}

.tech-item span {
  color: #666;
  line-height: 1.5;
}

/* CTA Section */
.cta-section {
  text-align: center;
  margin: 40px 0 20px 0;
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
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-container {
    padding: 80px 15px 15px 15px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .content-section {
    padding: 20px;
    margin-bottom: 25px;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .service-item {
    padding: 15px;
  }
  
  .cta-button {
    font-size: 1rem;
    padding: 12px 25px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }
  
  .content-section {
    padding: 15px;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .section-content {
    font-size: 0.95rem;
  }
}
</style>