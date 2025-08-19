<template>
  <div class="privacy-container">
    <AppNavigation />
    
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="header">
      <h1 class="title">{{ $t('privacy.title') }}</h1>
      <p class="updated">{{ $t('privacy.lastUpdated') }}: 2025年8月19日</p>
    </header>

    <div class="content-container">
      <!-- Introduction -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.introduction.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.introduction.description1') }}</p>
          <p>{{ $t('privacy.introduction.description2') }}</p>
        </div>
      </section>

      <!-- Information We Collect -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.collection.title') }}</h2>
        <div class="section-content">
          <h3>{{ $t('privacy.collection.personal.title') }}</h3>
          <ul>
            <li>{{ $t('privacy.collection.personal.name') }}</li>
            <li>{{ $t('privacy.collection.personal.birthdate') }}</li>
            <li>{{ $t('privacy.collection.personal.birthtime') }}</li>
            <li>{{ $t('privacy.collection.personal.birthplace') }}</li>
            <li>{{ $t('privacy.collection.personal.gender') }}</li>
          </ul>
          
          <h3>{{ $t('privacy.collection.automatic.title') }}</h3>
          <ul>
            <li>{{ $t('privacy.collection.automatic.ip') }}</li>
            <li>{{ $t('privacy.collection.automatic.browser') }}</li>
            <li>{{ $t('privacy.collection.automatic.device') }}</li>
            <li>{{ $t('privacy.collection.automatic.usage') }}</li>
            <li>{{ $t('privacy.collection.automatic.cookies') }}</li>
          </ul>
        </div>
      </section>

      <!-- How We Use Information -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.usage.title') }}</h2>
        <div class="section-content">
          <ul>
            <li>{{ $t('privacy.usage.calculate') }}</li>
            <li>{{ $t('privacy.usage.provide') }}</li>
            <li>{{ $t('privacy.usage.improve') }}</li>
            <li>{{ $t('privacy.usage.communicate') }}</li>
            <li>{{ $t('privacy.usage.analytics') }}</li>
            <li>{{ $t('privacy.usage.ads') }}</li>
          </ul>
        </div>
      </section>

      <!-- Google AdSense -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.adsense.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.adsense.description1') }}</p>
          <p>{{ $t('privacy.adsense.description2') }}</p>
          
          <h3>{{ $t('privacy.adsense.cookies.title') }}</h3>
          <ul>
            <li>{{ $t('privacy.adsense.cookies.doubleclick') }}</li>
            <li>{{ $t('privacy.adsense.cookies.personalization') }}</li>
            <li>{{ $t('privacy.adsense.cookies.analytics') }}</li>
          </ul>
          
          <p>{{ $t('privacy.adsense.optout') }}</p>
          <p>{{ $t('privacy.adsense.learnmore') }} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">{{ $t('privacy.adsense.googlePrivacy') }}</a></p>
        </div>
      </section>

      <!-- Google Analytics -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.analytics.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.analytics.description1') }}</p>
          <p>{{ $t('privacy.analytics.description2') }}</p>
          <p>{{ $t('privacy.analytics.optout') }} <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">{{ $t('privacy.analytics.optoutLink') }}</a></p>
        </div>
      </section>

      <!-- Cookies -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.cookies.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.cookies.description1') }}</p>
          
          <h3>{{ $t('privacy.cookies.types.title') }}</h3>
          <ul>
            <li><strong>{{ $t('privacy.cookies.types.essential.title') }}</strong>: {{ $t('privacy.cookies.types.essential.description') }}</li>
            <li><strong>{{ $t('privacy.cookies.types.analytics.title') }}</strong>: {{ $t('privacy.cookies.types.analytics.description') }}</li>
            <li><strong>{{ $t('privacy.cookies.types.advertising.title') }}</strong>: {{ $t('privacy.cookies.types.advertising.description') }}</li>
            <li><strong>{{ $t('privacy.cookies.types.functional.title') }}</strong>: {{ $t('privacy.cookies.types.functional.description') }}</li>
          </ul>
          
          <p>{{ $t('privacy.cookies.control') }}</p>
        </div>
      </section>

      <!-- Data Storage -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.storage.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.storage.description1') }}</p>
          <p>{{ $t('privacy.storage.description2') }}</p>
          <p>{{ $t('privacy.storage.retention') }}</p>
        </div>
      </section>

      <!-- Data Sharing -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.sharing.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.sharing.description1') }}</p>
          <ul>
            <li>{{ $t('privacy.sharing.google') }}</li>
            <li>{{ $t('privacy.sharing.legal') }}</li>
            <li>{{ $t('privacy.sharing.protection') }}</li>
            <li>{{ $t('privacy.sharing.consent') }}</li>
          </ul>
        </div>
      </section>

      <!-- Your Rights -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.rights.title') }}</h2>
        <div class="section-content">
          <ul>
            <li>{{ $t('privacy.rights.access') }}</li>
            <li>{{ $t('privacy.rights.correct') }}</li>
            <li>{{ $t('privacy.rights.delete') }}</li>
            <li>{{ $t('privacy.rights.portability') }}</li>
            <li>{{ $t('privacy.rights.object') }}</li>
            <li>{{ $t('privacy.rights.restrict') }}</li>
          </ul>
          <p>{{ $t('privacy.rights.contact') }}</p>
        </div>
      </section>

      <!-- Security -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.security.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.security.description1') }}</p>
          <p>{{ $t('privacy.security.description2') }}</p>
        </div>
      </section>

      <!-- International Transfers -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.international.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.international.description1') }}</p>
          <p>{{ $t('privacy.international.description2') }}</p>
        </div>
      </section>

      <!-- Children's Privacy -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.children.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.children.description1') }}</p>
          <p>{{ $t('privacy.children.description2') }}</p>
        </div>
      </section>

      <!-- Changes to Policy -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.changes.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.changes.description1') }}</p>
          <p>{{ $t('privacy.changes.description2') }}</p>
        </div>
      </section>

      <!-- Contact Information -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('privacy.contact.title') }}</h2>
        <div class="section-content">
          <p>{{ $t('privacy.contact.description') }}</p>
          <div class="contact-info">
            <p><strong>{{ $t('privacy.contact.email.label') }}</strong>: privacy@meiban.info</p>
            <p><strong>{{ $t('privacy.contact.website.label') }}</strong>: <router-link to="/contact">{{ $t('privacy.contact.website.link') }}</router-link></p>
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
  name: 'PrivacyPage',
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
    document.title = this.$t('privacy.pageTitle') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('privacy.metaDescription'))
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
.privacy-container {
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
  .privacy-container {
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