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
        <span>{{ $t('article.fiveElements.title') }}</span>
      </div>
      
      <h1 class="article-title">{{ $t('article.fiveElements.title') }}</h1>
      
      <div class="article-meta">
        <span class="article-category">{{ $t('learn.categories.bazi') }}</span>
        <span class="article-date">{{ $t('article.publishedOn') }}: 2025年8月19日</span>
        <span class="article-time">{{ $t('learn.readTime', { minutes: 12 }) }}</span>
      </div>
    </header>

    <div class="article-content">
      <!-- Introduction -->
      <section class="content-section">
        <p class="article-lead">{{ $t('article.fiveElements.introduction') }}</p>
        
        <p>{{ $t('article.fiveElements.description1') }}</p>
        <p>{{ $t('article.fiveElements.description2') }}</p>
      </section>

      <!-- The Five Elements -->
      <section class="content-section">
        <h2>{{ $t('article.fiveElements.sections.elements.title') }}</h2>
        
        <p>{{ $t('article.fiveElements.sections.elements.description') }}</p>
        
        <div class="elements-grid">
          <!-- Wood Element -->
          <div class="element-card wood">
            <div class="element-icon">🌳</div>
            <h3>{{ $t('article.fiveElements.sections.elements.wood.title') }}</h3>
            <div class="element-attributes">
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.direction') }}</strong>: {{ $t('article.fiveElements.sections.elements.wood.direction') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.season') }}</strong>: {{ $t('article.fiveElements.sections.elements.wood.season') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.color') }}</strong>: {{ $t('article.fiveElements.sections.elements.wood.color') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.emotion') }}</strong>: {{ $t('article.fiveElements.sections.elements.wood.emotion') }}</p>
            </div>
            <p class="element-description">{{ $t('article.fiveElements.sections.elements.wood.description') }}</p>
          </div>

          <!-- Fire Element -->
          <div class="element-card fire">
            <div class="element-icon">🔥</div>
            <h3>{{ $t('article.fiveElements.sections.elements.fire.title') }}</h3>
            <div class="element-attributes">
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.direction') }}</strong>: {{ $t('article.fiveElements.sections.elements.fire.direction') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.season') }}</strong>: {{ $t('article.fiveElements.sections.elements.fire.season') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.color') }}</strong>: {{ $t('article.fiveElements.sections.elements.fire.color') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.emotion') }}</strong>: {{ $t('article.fiveElements.sections.elements.fire.emotion') }}</p>
            </div>
            <p class="element-description">{{ $t('article.fiveElements.sections.elements.fire.description') }}</p>
          </div>

          <!-- Earth Element -->
          <div class="element-card earth">
            <div class="element-icon">⛰️</div>
            <h3>{{ $t('article.fiveElements.sections.elements.earth.title') }}</h3>
            <div class="element-attributes">
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.direction') }}</strong>: {{ $t('article.fiveElements.sections.elements.earth.direction') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.season') }}</strong>: {{ $t('article.fiveElements.sections.elements.earth.season') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.color') }}</strong>: {{ $t('article.fiveElements.sections.elements.earth.color') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.emotion') }}</strong>: {{ $t('article.fiveElements.sections.elements.earth.emotion') }}</p>
            </div>
            <p class="element-description">{{ $t('article.fiveElements.sections.elements.earth.description') }}</p>
          </div>

          <!-- Metal Element -->
          <div class="element-card metal">
            <div class="element-icon">⚔️</div>
            <h3>{{ $t('article.fiveElements.sections.elements.metal.title') }}</h3>
            <div class="element-attributes">
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.direction') }}</strong>: {{ $t('article.fiveElements.sections.elements.metal.direction') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.season') }}</strong>: {{ $t('article.fiveElements.sections.elements.metal.season') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.color') }}</strong>: {{ $t('article.fiveElements.sections.elements.metal.color') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.emotion') }}</strong>: {{ $t('article.fiveElements.sections.elements.metal.emotion') }}</p>
            </div>
            <p class="element-description">{{ $t('article.fiveElements.sections.elements.metal.description') }}</p>
          </div>

          <!-- Water Element -->
          <div class="element-card water">
            <div class="element-icon">🌊</div>
            <h3>{{ $t('article.fiveElements.sections.elements.water.title') }}</h3>
            <div class="element-attributes">
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.direction') }}</strong>: {{ $t('article.fiveElements.sections.elements.water.direction') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.season') }}</strong>: {{ $t('article.fiveElements.sections.elements.water.season') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.color') }}</strong>: {{ $t('article.fiveElements.sections.elements.water.color') }}</p>
              <p><strong>{{ $t('article.fiveElements.sections.elements.attributes.emotion') }}</strong>: {{ $t('article.fiveElements.sections.elements.water.emotion') }}</p>
            </div>
            <p class="element-description">{{ $t('article.fiveElements.sections.elements.water.description') }}</p>
          </div>
        </div>
      </section>

      <!-- Element Interactions -->
      <section class="content-section">
        <h2>{{ $t('article.fiveElements.sections.interactions.title') }}</h2>
        
        <p>{{ $t('article.fiveElements.sections.interactions.description') }}</p>
        
        <h3>{{ $t('article.fiveElements.sections.interactions.generative.title') }}</h3>
        <p>{{ $t('article.fiveElements.sections.interactions.generative.description') }}</p>
        
        <div class="cycle-diagram">
          <div class="cycle-item">
            <span class="cycle-element">🌳 {{ $t('article.fiveElements.sections.elements.wood.title') }}</span>
            <span class="cycle-arrow">→</span>
            <span class="cycle-element">🔥 {{ $t('article.fiveElements.sections.elements.fire.title') }}</span>
            <p class="cycle-explanation">{{ $t('article.fiveElements.sections.interactions.generative.woodFire') }}</p>
          </div>
          
          <div class="cycle-item">
            <span class="cycle-element">🔥 {{ $t('article.fiveElements.sections.elements.fire.title') }}</span>
            <span class="cycle-arrow">→</span>
            <span class="cycle-element">⛰️ {{ $t('article.fiveElements.sections.elements.earth.title') }}</span>
            <p class="cycle-explanation">{{ $t('article.fiveElements.sections.interactions.generative.fireEarth') }}</p>
          </div>
          
          <div class="cycle-item">
            <span class="cycle-element">⛰️ {{ $t('article.fiveElements.sections.elements.earth.title') }}</span>
            <span class="cycle-arrow">→</span>
            <span class="cycle-element">⚔️ {{ $t('article.fiveElements.sections.elements.metal.title') }}</span>
            <p class="cycle-explanation">{{ $t('article.fiveElements.sections.interactions.generative.earthMetal') }}</p>
          </div>
          
          <div class="cycle-item">
            <span class="cycle-element">⚔️ {{ $t('article.fiveElements.sections.elements.metal.title') }}</span>
            <span class="cycle-arrow">→</span>
            <span class="cycle-element">🌊 {{ $t('article.fiveElements.sections.elements.water.title') }}</span>
            <p class="cycle-explanation">{{ $t('article.fiveElements.sections.interactions.generative.metalWater') }}</p>
          </div>
          
          <div class="cycle-item">
            <span class="cycle-element">🌊 {{ $t('article.fiveElements.sections.elements.water.title') }}</span>
            <span class="cycle-arrow">→</span>
            <span class="cycle-element">🌳 {{ $t('article.fiveElements.sections.elements.wood.title') }}</span>
            <p class="cycle-explanation">{{ $t('article.fiveElements.sections.interactions.generative.waterWood') }}</p>
          </div>
        </div>

        <h3>{{ $t('article.fiveElements.sections.interactions.destructive.title') }}</h3>
        <p>{{ $t('article.fiveElements.sections.interactions.destructive.description') }}</p>
        
        <div class="warning-box">
          <h4>{{ $t('article.fiveElements.sections.interactions.destructive.examples.title') }}</h4>
          <ul>
            <li>{{ $t('article.fiveElements.sections.interactions.destructive.examples.woodEarth') }}</li>
            <li>{{ $t('article.fiveElements.sections.interactions.destructive.examples.earthWater') }}</li>
            <li>{{ $t('article.fiveElements.sections.interactions.destructive.examples.waterFire') }}</li>
            <li>{{ $t('article.fiveElements.sections.interactions.destructive.examples.fireMetal') }}</li>
            <li>{{ $t('article.fiveElements.sections.interactions.destructive.examples.metalWood') }}</li>
          </ul>
        </div>
      </section>

      <!-- Applications in BaZi -->
      <section class="content-section">
        <h2>{{ $t('article.fiveElements.sections.bazi.title') }}</h2>
        
        <p>{{ $t('article.fiveElements.sections.bazi.description') }}</p>
        
        <h3>{{ $t('article.fiveElements.sections.bazi.pillars.title') }}</h3>
        <p>{{ $t('article.fiveElements.sections.bazi.pillars.description') }}</p>
        
        <div class="pillars-example">
          <div class="pillar">
            <h4>{{ $t('article.fiveElements.sections.bazi.pillars.year') }}</h4>
            <p>{{ $t('article.fiveElements.sections.bazi.pillars.yearDesc') }}</p>
          </div>
          
          <div class="pillar">
            <h4>{{ $t('article.fiveElements.sections.bazi.pillars.month') }}</h4>
            <p>{{ $t('article.fiveElements.sections.bazi.pillars.monthDesc') }}</p>
          </div>
          
          <div class="pillar">
            <h4>{{ $t('article.fiveElements.sections.bazi.pillars.day') }}</h4>
            <p>{{ $t('article.fiveElements.sections.bazi.pillars.dayDesc') }}</p>
          </div>
          
          <div class="pillar">
            <h4>{{ $t('article.fiveElements.sections.bazi.pillars.hour') }}</h4>
            <p>{{ $t('article.fiveElements.sections.bazi.pillars.hourDesc') }}</p>
          </div>
        </div>

        <h3>{{ $t('article.fiveElements.sections.bazi.balance.title') }}</h3>
        <p>{{ $t('article.fiveElements.sections.bazi.balance.description') }}</p>
        
        <div class="balance-tips">
          <h4>{{ $t('article.fiveElements.sections.bazi.balance.tips.title') }}</h4>
          <ul>
            <li>{{ $t('article.fiveElements.sections.bazi.balance.tips.tip1') }}</li>
            <li>{{ $t('article.fiveElements.sections.bazi.balance.tips.tip2') }}</li>
            <li>{{ $t('article.fiveElements.sections.bazi.balance.tips.tip3') }}</li>
            <li>{{ $t('article.fiveElements.sections.bazi.balance.tips.tip4') }}</li>
          </ul>
        </div>
      </section>

      <!-- Practical Applications -->
      <section class="content-section">
        <h2>{{ $t('article.fiveElements.sections.practical.title') }}</h2>
        
        <p>{{ $t('article.fiveElements.sections.practical.description') }}</p>
        
        <h3>{{ $t('article.fiveElements.sections.practical.personality.title') }}</h3>
        <p>{{ $t('article.fiveElements.sections.practical.personality.description') }}</p>
        
        <h3>{{ $t('article.fiveElements.sections.practical.career.title') }}</h3>
        <p>{{ $t('article.fiveElements.sections.practical.career.description') }}</p>
        
        <h3>{{ $t('article.fiveElements.sections.practical.health.title') }}</h3>
        <p>{{ $t('article.fiveElements.sections.practical.health.description') }}</p>
        
        <div class="success-box">
          <h4>{{ $t('article.fiveElements.sections.practical.success.title') }}</h4>
          <p>{{ $t('article.fiveElements.sections.practical.success.description') }}</p>
        </div>
      </section>

      <!-- Getting Started -->
      <section class="content-section">
        <h2>{{ $t('article.fiveElements.sections.gettingStarted.title') }}</h2>
        
        <p>{{ $t('article.fiveElements.sections.gettingStarted.description') }}</p>
        
        <div class="cta-section">
          <router-link to="/" class="cta-button">
            {{ $t('article.fiveElements.sections.gettingStarted.cta') }}
          </router-link>
        </div>
        
        <div class="next-reading">
          <h3>{{ $t('article.nextReading') }}</h3>
          <ul>
            <li><router-link to="/learn/bazi/basics">{{ $t('article.relatedArticles.baziBasics') }}</router-link></li>
            <li><router-link to="/learn/bazi/heavenly-stems">{{ $t('article.relatedArticles.heavenlyStems') }}</router-link></li>
            <li><router-link to="/learn/bazi/earthly-branches">{{ $t('article.relatedArticles.earthlyBranches') }}</router-link></li>
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
  name: 'FiveElementsTheoryArticle',
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
    document.title = this.$t('article.fiveElements.pageTitle') + ' - ' + this.$t('app.title')
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', this.$t('article.fiveElements.metaDescription'))
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
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 90px;
}

/* Import common article styles from UnderstandingBirthChart */
/* Header and basic styles same as previous article */
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
  background: #fff5f5;
  color: #c53030;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

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

/* Elements Grid */
.elements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.element-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 5px solid;
}

.element-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.element-card.wood {
  border-left-color: #28a745;
}

.element-card.fire {
  border-left-color: #dc3545;
}

.element-card.earth {
  border-left-color: #fd7e14;
}

.element-card.metal {
  border-left-color: #6c757d;
}

.element-card.water {
  border-left-color: #007bff;
}

.element-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 15px;
}

.element-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
  font-family: 'Shippori Mincho', serif;
}

.element-attributes {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.element-attributes p {
  margin: 5px 0;
  color: #555;
}

.element-description {
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

/* Cycle Diagram */
.cycle-diagram {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  margin: 25px 0;
}

.cycle-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.cycle-element {
  background: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cycle-arrow {
  font-size: 1.5rem;
  color: #d35400;
  font-weight: bold;
}

.cycle-explanation {
  color: #666;
  font-style: italic;
  margin: 5px 0 0 0;
  flex-basis: 100%;
  font-size: 0.9rem;
}

/* Pillars Example */
.pillars-example {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.pillar {
  background: #fff8dc;
  border: 1px solid #f0e68c;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.pillar h4 {
  color: #b8860b;
  margin-top: 0;
  margin-bottom: 10px;
  font-family: 'Shippori Mincho', serif;
}

.pillar p {
  color: #6b6b00;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

/* Boxes */
.warning-box {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-left: 4px solid #fdcb6e;
  border-radius: 8px;
  padding: 20px;
  margin: 25px 0;
}

.warning-box h4 {
  color: #856404;
  margin-top: 0;
  margin-bottom: 15px;
}

.warning-box ul {
  margin: 0;
  padding-left: 20px;
}

.warning-box li {
  color: #856404;
  margin-bottom: 8px;
}

.balance-tips {
  background: #e8f5e8;
  border: 1px solid #c3e6c3;
  border-left: 4px solid #28a745;
  border-radius: 8px;
  padding: 20px;
  margin: 25px 0;
}

.balance-tips h4 {
  color: #155724;
  margin-top: 0;
  margin-bottom: 15px;
}

.balance-tips ul {
  margin: 0;
  padding-left: 20px;
}

.balance-tips li {
  color: #155724;
  margin-bottom: 8px;
  line-height: 1.6;
}

.success-box {
  background: #d1ecf1;
  border: 1px solid #bee5eb;
  border-left: 4px solid #17a2b8;
  border-radius: 8px;
  padding: 20px;
  margin: 25px 0;
}

.success-box h4 {
  color: #0c5460;
  margin-top: 0;
  margin-bottom: 10px;
}

.success-box p {
  color: #0c5460;
  margin: 0;
  line-height: 1.6;
}

/* CTA and Navigation */
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
  
  .elements-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .pillars-example {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .cycle-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .cycle-arrow {
    transform: rotate(90deg);
    align-self: center;
  }
}

@media (max-width: 480px) {
  .article-title {
    font-size: 1.8rem;
  }
  
  .element-card {
    padding: 20px;
  }
  
  .element-icon {
    font-size: 2.5rem;
  }
  
  .cycle-diagram {
    padding: 20px;
  }
}
</style>