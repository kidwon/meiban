<template>
  <nav class="app-navigation" :class="{ 'nav-open': isMenuOpen }">
    <!-- Mobile Menu Toggle -->
    <button 
      class="menu-toggle"
      @click="toggleMenu"
      :aria-label="$t('nav.menuToggle')"
      v-if="isMobile"
    >
      <span class="hamburger"></span>
    </button>

    <!-- Navigation Links -->
    <div class="nav-links" :class="{ 'links-open': isMenuOpen }">
      <router-link to="/" class="nav-link" @click="closeMenu">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">{{ $t('nav.home') }}</span>
      </router-link>
      
      <router-link to="/learn" class="nav-link" @click="closeMenu">
        <span class="nav-icon">📚</span>
        <span class="nav-text">{{ $t('nav.learn') }}</span>
      </router-link>
      
      <router-link to="/about" class="nav-link" @click="closeMenu">
        <span class="nav-icon">ℹ️</span>
        <span class="nav-text">{{ $t('nav.about') }}</span>
      </router-link>
      
      <router-link to="/contact" class="nav-link" @click="closeMenu">
        <span class="nav-icon">📧</span>
        <span class="nav-text">{{ $t('nav.contact') }}</span>
      </router-link>
    </div>

    <!-- Footer Links (Mobile Only) -->
    <div class="nav-footer" v-if="isMobile && isMenuOpen">
      <router-link to="/privacy" class="footer-link" @click="closeMenu">
        {{ $t('nav.privacy') }}
      </router-link>
      <router-link to="/terms" class="footer-link" @click="closeMenu">
        {{ $t('nav.terms') }}
      </router-link>
    </div>

    <!-- Overlay for mobile -->
    <div 
      class="nav-overlay" 
      v-if="isMobile && isMenuOpen" 
      @click="closeMenu"
    ></div>
  </nav>
</template>

<script>
import i18nMixin from '../mixins/i18n.js'

export default {
  name: 'AppNavigation',
  mixins: [i18nMixin],
  
  data() {
    return {
      isMenuOpen: false
    }
  },
  
  computed: {
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  
  mounted() {
    // Ensure menu starts closed
    this.isMenuOpen = false
    document.body.style.overflow = ''
    
    // Monitor resize for responsive design
    this.handleResize = () => {
      if (!this.isMobile && this.isMenuOpen) {
        this.closeMenu()
      }
      this.$forceUpdate()
    }
    window.addEventListener('resize', this.handleResize)
    
    // Close menu on route change
    this.$router.afterEach(() => {
      this.closeMenu()
    })
    
    // Close menu when clicking outside (fallback)
    this.handleOutsideClick = (event) => {
      const nav = this.$el
      const isClickInsideNav = nav && nav.contains(event.target)
      
      if (!isClickInsideNav && this.isMenuOpen && this.isMobile) {
        this.closeMenu()
      }
    }
    document.addEventListener('click', this.handleOutsideClick)
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('click', this.handleOutsideClick)
    // Ensure body scroll is restored
    document.body.style.overflow = ''
  },
  
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      
      // Prevent body scroll when menu is open
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.app-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10000;
  padding: 6px 20px;
}

/* Desktop Navigation */
.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(211, 84, 0, 0.1);
  color: #d35400;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: #d35400;
  color: white;
  box-shadow: 0 2px 10px rgba(211, 84, 0, 0.3);
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-text {
  font-family: 'Noto Sans JP', sans-serif;
}

.menu-toggle {
  display: none;
}

.nav-footer {
  display: none;
}

.nav-overlay {
  display: none;
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .app-navigation {
    padding: 8px 20px;
  }
  
  .menu-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    position: relative;
    z-index: 10002;
  }
  
  .hamburger {
    display: block;
    width: 25px;
    height: 3px;
    background: #333;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 3px;
    background: #333;
    transition: all 0.3s ease;
  }
  
  .hamburger::before {
    top: -8px;
  }
  
  .hamburger::after {
    bottom: -8px;
  }
  
  /* Hamburger Animation */
  .nav-open .hamburger {
    background: transparent;
  }
  
  .nav-open .hamburger::before {
    transform: rotate(45deg);
    top: 0;
  }
  
  .nav-open .hamburger::after {
    transform: rotate(-45deg);
    bottom: 0;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0;
    padding: 80px 20px 20px 20px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
    z-index: 10002;
  }
  
  .links-open {
    transform: translateX(0);
  }
  
  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: 15px 20px;
    border-radius: 10px;
    margin-bottom: 5px;
    font-size: 1rem;
  }
  
  .nav-footer {
    display: block;
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    width: 240px;
    padding: 20px 0;
    border-top: 1px solid #f0f0f0;
  }
  
  .footer-link {
    display: block;
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    padding: 8px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .footer-link:hover {
    background: #f8f9fa;
    color: #d35400;
  }
  
  .nav-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10001;
  }
}

/* Remove global body padding - will be handled by individual pages */
</style>