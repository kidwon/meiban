<template>
  <div class="contact-container">
    <AppNavigation />
    
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="header">
      <h1 class="title">{{ $t('contact.title') }}</h1>
      <p class="subtitle">{{ $t('contact.subtitle') }}</p>
    </header>

    <div class="content-container">
      <!-- Contact Information -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('contact.info.title') }}</h2>
        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div class="contact-details">
              <h3>{{ $t('contact.info.email.title') }}</h3>
              <p>{{ $t('contact.info.email.description') }}</p>
              <a href="mailto:support@meiban.info" class="contact-link">support@meiban.info</a>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">🔒</div>
            <div class="contact-details">
              <h3>{{ $t('contact.info.privacy.title') }}</h3>
              <p>{{ $t('contact.info.privacy.description') }}</p>
              <a href="mailto:privacy@meiban.info" class="contact-link">privacy@meiban.info</a>
            </div>
          </div>
          
          <div class="contact-item">
            <div class="contact-icon">🌐</div>
            <div class="contact-details">
              <h3>{{ $t('contact.info.website.title') }}</h3>
              <p>{{ $t('contact.info.website.description') }}</p>
              <a href="https://meiban.info" class="contact-link">meiban.info</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Form -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('contact.form.title') }}</h2>
        <div class="form-container">
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="contactName">{{ $t('contact.form.name.label') }} <span class="required">*</span></label>
              <input 
                type="text" 
                id="contactName" 
                v-model="form.name" 
                :placeholder="$t('contact.form.name.placeholder')"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="contactEmail">{{ $t('contact.form.email.label') }} <span class="required">*</span></label>
              <input 
                type="email" 
                id="contactEmail" 
                v-model="form.email" 
                :placeholder="$t('contact.form.email.placeholder')"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="contactSubject">{{ $t('contact.form.subject.label') }} <span class="required">*</span></label>
              <select id="contactSubject" v-model="form.subject" required>
                <option value="">{{ $t('contact.form.subject.placeholder') }}</option>
                <option value="general">{{ $t('contact.form.subject.options.general') }}</option>
                <option value="technical">{{ $t('contact.form.subject.options.technical') }}</option>
                <option value="privacy">{{ $t('contact.form.subject.options.privacy') }}</option>
                <option value="feedback">{{ $t('contact.form.subject.options.feedback') }}</option>
                <option value="partnership">{{ $t('contact.form.subject.options.partnership') }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="contactMessage">{{ $t('contact.form.message.label') }} <span class="required">*</span></label>
              <textarea 
                id="contactMessage" 
                v-model="form.message" 
                :placeholder="$t('contact.form.message.placeholder')"
                rows="5"
                required
              ></textarea>
            </div>
            
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.consent" required />
                <span>{{ $t('contact.form.consent.text') }} <router-link to="/privacy" target="_blank">{{ $t('contact.form.consent.link') }}</router-link></span>
              </label>
            </div>
            
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="!isSubmitting">{{ $t('contact.form.submit') }}</span>
              <span v-else>{{ $t('contact.form.submitting') }}</span>
            </button>
          </form>
          
          <div v-if="submitStatus === 'success'" class="success-message">
            <div class="message-icon">✅</div>
            <p>{{ $t('contact.form.success') }}</p>
          </div>
          
          <div v-if="submitStatus === 'error'" class="error-message">
            <div class="message-icon">❌</div>
            <p>{{ $t('contact.form.error') }}</p>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('contact.faq.title') }}</h2>
        <div class="faq-container">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <h3 class="faq-question">{{ $t('contact.faq.items.' + faq + '.question') }}</h3>
            <p class="faq-answer">{{ $t('contact.faq.items.' + faq + '.answer') }}</p>
          </div>
        </div>
      </section>

      <!-- Response Time -->
      <section class="content-section">
        <h2 class="section-title">{{ $t('contact.response.title') }}</h2>
        <div class="response-info">
          <div class="response-item">
            <div class="response-icon">⚡</div>
            <div class="response-details">
              <h3>{{ $t('contact.response.urgent.title') }}</h3>
              <p>{{ $t('contact.response.urgent.description') }}</p>
            </div>
          </div>
          
          <div class="response-item">
            <div class="response-icon">📝</div>
            <div class="response-details">
              <h3>{{ $t('contact.response.general.title') }}</h3>
              <p>{{ $t('contact.response.general.description') }}</p>
            </div>
          </div>
          
          <div class="response-item">
            <div class="response-icon">🔍</div>
            <div class="response-details">
              <h3>{{ $t('contact.response.complex.title') }}</h3>
              <p>{{ $t('contact.response.complex.description') }}</p>
            </div>
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
  name: 'ContactPage',
  mixins: [i18nMixin],
  
  components: {
    LanguageSwitcher,
    AppNavigation
  },
  
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
        consent: false
      },
      isSubmitting: false,
      submitStatus: null, // 'success', 'error', or null
      faqs: ['accuracy', 'privacy', 'technical', 'languages', 'mobile']
    }
  },
  
  computed: {
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  
  mounted() {
    // Set page title
    document.title = this.$t('contact.pageTitle') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('contact.metaDescription'))
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
    
    async submitForm() {
      this.isSubmitting = true
      this.submitStatus = null
      
      try {
        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Here you would normally send the form data to your backend
        console.log('Form submitted:', this.form)
        
        // For now, we'll just show success
        this.submitStatus = 'success'
        this.resetForm()
        
      } catch (error) {
        console.error('Form submission error:', error)
        this.submitStatus = 'error'
      } finally {
        this.isSubmitting = false
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
          this.submitStatus = null
        }, 5000)
      }
    },
    
    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: '',
        consent: false
      }
    }
  }
}
</script>

<style scoped>
.contact-container {
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
  margin-bottom: 25px;
  font-family: 'Shippori Mincho', serif;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.contact-icon {
  font-size: 2rem;
  min-width: 50px;
  text-align: center;
}

.contact-details h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
}

.contact-details p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

.contact-link {
  color: #d35400;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.contact-link:hover {
  border-bottom-color: #d35400;
}

/* Contact Form */
.form-container {
  position: relative;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 1rem;
  font-weight: 500;
  color: #34495e;
}

.required {
  color: #e74c3c;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #d35400;
  outline: none;
  box-shadow: 0 0 0 3px rgba(211, 84, 0, 0.1);
}

.checkbox-group {
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin: 0;
  min-width: 16px;
  margin-top: 2px;
}

.submit-button {
  background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(211, 84, 0, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Messages */
.success-message,
.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.success-message {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.message-icon {
  font-size: 1.2rem;
}

/* FAQ */
.faq-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #d35400;
}

.faq-question {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.faq-answer {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Response Info */
.response-info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.response-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.response-icon {
  font-size: 1.5rem;
  min-width: 40px;
  text-align: center;
}

.response-details h3 {
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 5px;
  font-weight: 600;
}

.response-details p {
  color: #666;
  line-height: 1.5;
  margin: 0;
  font-size: 0.9rem;
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
  .contact-container {
    padding: 80px 15px 15px 15px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .content-section {
    padding: 20px;
    margin-bottom: 25px;
  }
  
  .contact-item {
    padding: 15px;
  }
  
  .submit-button {
    align-self: stretch;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }
  
  .content-section {
    padding: 15px;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style>