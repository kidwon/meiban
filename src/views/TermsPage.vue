<template>
  <div class="terms-container">
    <AppNavigation />
    
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="header">
      <h1 class="title">{{ $t('terms.title') }}</h1>
      <p class="updated">{{ $t('terms.lastUpdated') }}: 2025年8月19日</p>
    </header>

    <div class="content-container">
      <!-- Introduction -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.introduction.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.introduction.description1') }}</p>
          <p>{{ $t('terms.introduction.description2') }}</p>
          <p>{{ $t('terms.introduction.description3') }}</p>
        </div>
      </section>

      <!-- Acceptance of Terms -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.acceptance.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.acceptance.description1') }}</p>
          <p>{{ $t('terms.acceptance.description2') }}</p>
        </div>
      </section>

      <!-- Description of Service -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.service.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.service.description1') }}</p>
          <ul>
            <li>{{ $t('terms.service.feature1') }}</li>
            <li>{{ $t('terms.service.feature2') }}</li>
            <li>{{ $t('terms.service.feature3') }}</li>
            <li>{{ $t('terms.service.feature4') }}</li>
          </ul>
          <p>{{ $t('terms.service.description2') }}</p>
        </div>
      </section>

      <!-- User Responsibilities -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.responsibilities.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.responsibilities.description1') }}</p>
          <ul>
            <li>{{ $t('terms.responsibilities.accurate') }}</li>
            <li>{{ $t('terms.responsibilities.legal') }}</li>
            <li>{{ $t('terms.responsibilities.respectful') }}</li>
            <li>{{ $t('terms.responsibilities.security') }}</li>
            <li>{{ $t('terms.responsibilities.compliance') }}</li>
          </ul>
        </div>
      </section>

      <!-- Prohibited Uses -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.prohibited.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.prohibited.description1') }}</p>
          <ul>
            <li>{{ $t('terms.prohibited.illegal') }}</li>
            <li>{{ $t('terms.prohibited.harmful') }}</li>
            <li>{{ $t('terms.prohibited.spam') }}</li>
            <li>{{ $t('terms.prohibited.unauthorized') }}</li>
            <li>{{ $t('terms.prohibited.interference') }}</li>
            <li>{{ $t('terms.prohibited.violate') }}</li>
            <li>{{ $t('terms.prohibited.impersonate') }}</li>
          </ul>
        </div>
      </section>

      <!-- Intellectual Property -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.intellectual.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.intellectual.description1') }}</p>
          <p>{{ $t('terms.intellectual.description2') }}</p>
          <p>{{ $t('terms.intellectual.description3') }}</p>
        </div>
      </section>

      <!-- Privacy and Data -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.privacy.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.privacy.description1') }}</p>
          <p>{{ $t('terms.privacy.description2') }} <router-link to="/privacy">{{ $t('terms.privacy.link') }}</router-link></p>
        </div>
      </section>

      <!-- Disclaimers -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.disclaimers.title') }}</h2>
        <div class="section-content">
          <div class="disclaimer-box">
            <h3>{{ $t('terms.disclaimers.entertainment.title') }}</h3>
            <p>{{ $t('terms.disclaimers.entertainment.description') }}</p>
          </div>
          
          <div class="disclaimer-box">
            <h3>{{ $t('terms.disclaimers.accuracy.title') }}</h3>
            <p>{{ $t('terms.disclaimers.accuracy.description') }}</p>
          </div>
          
          <div class="disclaimer-box">
            <h3>{{ $t('terms.disclaimers.decisions.title') }}</h3>
            <p>{{ $t('terms.disclaimers.decisions.description') }}</p>
          </div>
          
          <div class="disclaimer-box">
            <h3>{{ $t('terms.disclaimers.professional.title') }}</h3>
            <p>{{ $t('terms.disclaimers.professional.description') }}</p>
          </div>
        </div>
      </section>

      <!-- Limitation of Liability -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.liability.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.liability.description1') }}</p>
          <p>{{ $t('terms.liability.description2') }}</p>
          <p>{{ $t('terms.liability.description3') }}</p>
        </div>
      </section>

      <!-- Service Availability -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.availability.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.availability.description1') }}</p>
          <p>{{ $t('terms.availability.description2') }}</p>
          <p>{{ $t('terms.availability.description3') }}</p>
        </div>
      </section>

      <!-- Modifications -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.modifications.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.modifications.description1') }}</p>
          <p>{{ $t('terms.modifications.description2') }}</p>
        </div>
      </section>

      <!-- Termination -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.termination.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.termination.description1') }}</p>
          <p>{{ $t('terms.termination.description2') }}</p>
        </div>
      </section>

      <!-- Governing Law -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.governing.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.governing.description1') }}</p>
          <p>{{ $t('terms.governing.description2') }}</p>
        </div>
      </section>

      <!-- Contact Information -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('terms.contact.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('terms.contact.description') }}</p>
          <div class="contact-info">
            <p><strong>{{ $t('terms.contact.email.label') }}</strong>: legal@meiban.info</p>
            <p><strong>{{ $t('terms.contact.website.label') }}</strong>: <router-link to="/contact">{{ $t('terms.contact.website.link') }}</router-link></p>
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
  name: 'TermsPage',
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
    document.title = this.$t('terms.pageTitle') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('terms.metaDescription'))
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
.terms-container {
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
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #d35400;
  font-family: 'Shippori Mincho', serif;
}

.updated {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0;
  font-style: italic;
}

/* Content */
.content-container {
  flex: 1;
}

.content-section {
  margin-bottom: 35px;
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

.section-content {
  line-height: 1.7;
  font-size: 0.95rem;
}

.section-content p {
  margin-bottom: 14px;
  color: #444;
}

.section-content h3 {
  font-size: 1.1rem;
  color: #34495e;
  margin: 20px 0 10px 0;
  font-weight: 600;
}

.section-content ul {
  margin: 15px 0;
  padding-left: 20px;
}

.section-content ul li {
  margin-bottom: 8px;
  color: #555;
}

.section-content a {
  color: #d35400;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.section-content a:hover {
  border-bottom-color: #d35400;
}

/* Disclaimer Boxes */
.disclaimer-box {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-left: 4px solid #e53e3e;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.disclaimer-box h3 {
  color: #c53030;
  margin-top: 0 !important;
  margin-bottom: 10px !important;
  font-size: 1rem;
  font-weight: 600;
}

.disclaimer-box p {
  color: #744a4a;
  margin: 0 !important;
  line-height: 1.6;
}

/* Contact Info */
.contact-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #d35400;
  margin-top: 15px;
}

.contact-info p {
  margin-bottom: 10px !important;
  color: #2c3e50;
}

.contact-info p:last-child {
  margin-bottom: 0 !important;
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
  .terms-container {
    padding: 80px 15px 15px 15px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .content-section {
    padding: 20px;
    margin-bottom: 25px;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .section-content {
    font-size: 0.9rem;
  }
  
  .disclaimer-box {
    padding: 15px;
  }
  
  .contact-info {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.6rem;
  }
  
  .content-section {
    padding: 15px;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
  
  .section-content {
    font-size: 0.85rem;
  }
  
  .section-content ul {
    padding-left: 15px;
  }
}
</style>