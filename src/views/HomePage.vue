<template>
  <div class="meiban-container">
    <!-- Navigation -->
    <AppNavigation />
    
    <!-- 浮动语言切换器 -->
    <LanguageSwitcher 
      :compact="isMobile"
      :show-names="!isMobile"
      @language-changed="onLanguageChanged"
    />
    
    <header class="header">
      <h1 class="title">{{ $t('app.title') }}</h1>
      <p class="subtitle">{{ $t('app.subtitle') }}</p>
    </header>
    
    <div class="form-container no-adsense">
      <form class="birth-form">
        <!-- 姓名 - 选填 -->
        <div class="form-group">
          <label for="name">
            {{ $t('form.name') }}
            <span class="optional-badge">{{ $t('form.optional') }}</span>
          </label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            :placeholder="$t('form.namePlaceholder')" 
          />
        </div>
        
        <!-- 生年月日 - 必填 -->
        <div class="form-group">
          <label for="birthdate">
            {{ $t('form.birthdate') }}
            <span class="required-badge">{{ $t('form.required') }}</span>
          </label>
          <input 
            type="date" 
            id="birthdate" 
            v-model="formData.birthdate" 
            required
          />
        </div>
        
        <!-- 出生时间 - 必填，合并为一行 -->
        <div class="form-group">
          <label for="birthTime">
            {{ $t('form.birthTime') }}
            <span class="required-badge">{{ $t('form.required') }}</span>
          </label>
          <div class="time-input-wrapper">
            <select id="birthHour" v-model="formData.birthHour" required class="time-select">
              <option value="" disabled>{{ $t('form.hour') }}</option>
              <option v-for="hour in 24" :key="hour" :value="String(hour - 1)">
                {{ String(hour - 1).padStart(2, '0') }}
              </option>
            </select>
            <span class="time-separator">:</span>
            <select id="birthMinute" v-model="formData.birthMinute" required class="time-select">
              <option value="" disabled>{{ $t('form.minute') }}</option>
              <option v-for="minute in 12" :key="minute" :value="String((minute - 1) * 5)">
                {{ String((minute - 1) * 5).padStart(2, '0') }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- 出生地 - 必填，合并组件 -->
        <div class="form-group">
          <label for="birthplace">
            {{ $t('form.birthplace') }}
            <span class="required-badge">{{ $t('form.required') }}</span>
          </label>
          <div class="location-combo-wrapper">
            <input 
              type="text" 
              id="birthplace" 
              v-model="formData.birthplace" 
              :placeholder="$t('form.birthplacePlaceholder')"
              required
              @focus="onLocationFocus"
              @input="filterCities"
              @blur="hideDropdown"
              @keydown.esc="showDropdown = false"
              class="location-input"
            />
            <div class="city-dropdown" v-show="showDropdown && Object.keys(filteredCities).length > 0">
              <div class="city-group" v-for="(cities, region) in filteredCities" :key="region">
                <div class="region-header">{{ $t('regions.' + region) }}</div>
                <div 
                  class="city-option" 
                  v-for="city in cities" 
                  :key="city.value"
                  @mousedown.prevent="selectCity(city.value)"
                >
                  {{ city.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 性别 - 必填 -->
        <div class="form-group gender-group">
          <label>
            {{ $t('form.gender') }}
            <span class="required-badge">{{ $t('form.required') }}</span>
          </label>
          <div class="radio-group">
            <label class="radio-label" v-for="option in genderOptions" :key="option.value">
              <input type="radio" v-model="formData.gender" :value="option.value" required />
              <span>{{ $t('form.genders.' + option.value) }}</span>
            </label>
          </div>
        </div>
      </form>
      
      <!-- 开始分析按钮 -->
      <div class="section">
        <div class="start-button-container">
          <button 
            type="button"
            @click="startAnalysis"
            class="start-btn"
          >
            <div class="start-btn-icon">🌟</div>
            <div class="start-btn-content">
              <h4>{{ $t('form.startAnalysis') }}</h4>
              <p class="start-btn-description">{{ $t('form.startAnalysisDescription') }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script>
import { getCityList } from '../utils/calculator.js'
import { mapGetters } from 'vuex'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import AppNavigation from '../components/AppNavigation.vue'
import i18nMixin from '../mixins/i18n.js'

export default {
  name: 'HomePage',
  mixins: [i18nMixin],
  
  components: {
    LanguageSwitcher,
    AppNavigation
  },
  
  data() {
    return {
      formData: {
        name: '',
        birthdate: '',
        birthHour: '',
        birthMinute: '',
        birthplace: '',
        gender: ''
      },
      showDropdown: false,
      filteredCities: {},
      cityGroups: {},
      genderOptions: [
        { value: 'male' },
        { value: 'female' }
      ]
    }
  },
  
  computed: {
    ...mapGetters({
      userData: 'getUserData',
      calculationResults: 'getCalculationResults'
    }),
    
    isMobile() {
      return window.innerWidth <= 768
    }
  },
  
  watch: {
    userData: {
      handler(newVal) {
        if (newVal) {
          this.fillFormWithStoredData()
        }
      },
      immediate: true
    }
  },
  
  created() {
    this.cityGroups = getCityList()
    this.filteredCities = this.cityGroups
  },
  
  mounted() {
    if (this.userData) {
      this.fillFormWithStoredData()
    }
    
    // 检查是否是从过期链接重定向过来的
    if (this.$route.query.expired === '1') {
      // 显示友好提示
      this.$nextTick(() => {
        const message = this.$t('messages.linkExpired') || '链接可能已过期，请重新进行分析'
        if (typeof window !== 'undefined' && window.alert) {
          alert(message)
        }
        // 清除URL中的expired参数
        this.$router.replace({ name: 'home' })
      })
    }
    
    // 监听窗口大小变化，用于响应式设计
    this.handleResize = () => {
      this.$forceUpdate() // 触发isMobile计算属性更新
    }
    window.addEventListener('resize', this.handleResize)

    // 监听窗口大小变化，用于响应式设计
    this.handleResize = () => {
      this.$forceUpdate() // 触发isMobile计算属性更新
    }
    window.addEventListener('resize', this.handleResize)
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  
  methods: {

    onLanguageChanged(language) {
      console.log('Language changed to:', language)
      // 可以在这里执行语言切换后的其他逻辑
    },
    
    onLocationFocus() {
      this.showDropdown = true
      // 如果有输入内容，重新过滤
      if (this.formData.birthplace.trim()) {
        this.filterCities()
      }
    },
    
    selectCity(cityValue) {
      this.formData.birthplace = cityValue
      this.showDropdown = false
      // 重置过滤结果
      this.filteredCities = this.cityGroups
    },
    
    filterCities() {
      const query = this.formData.birthplace.toLowerCase().trim()
      if (!query) {
        this.filteredCities = this.cityGroups
        return
      }
      
      const filtered = {}
      Object.keys(this.cityGroups).forEach(region => {
        const matchingCities = this.cityGroups[region].filter(city => 
          city.label.toLowerCase().includes(query) || 
          city.value.toLowerCase().includes(query)
        )
        if (matchingCities.length > 0) {
          filtered[region] = matchingCities
        }
      })
      this.filteredCities = filtered
    },
    
    hideDropdown() {
      // 使用setTimeout让点击事件先执行
      setTimeout(() => {
        this.showDropdown = false
      }, 150)
    },
    
    fillFormWithStoredData() {
      if (this.userData) {
        this.formData = {
          name: this.userData.name || '',
          birthdate: this.userData.birthdate || '',
          birthHour: String(this.userData.birthHour !== undefined ? this.userData.birthHour : ''),
          birthMinute: String(this.userData.birthMinute !== undefined ? this.userData.birthMinute : ''),
          birthplace: this.userData.birthplace || '',
          gender: this.userData.gender || ''
        }
      }
    },
    
    startAnalysis() {
      // 验证表单数据
      if (!this.validateForm()) {
        return
      }
      
      const formattedData = {
        ...this.formData,
        birthHour: parseInt(this.formData.birthHour),
        birthMinute: parseInt(this.formData.birthMinute),
        fullBirthDateTime: `${this.formData.birthdate}T${String(this.formData.birthHour).padStart(2, '0')}:${String(this.formData.birthMinute).padStart(2, '0')}:00`
      }
      
      this.$store.dispatch('saveUserData', formattedData)
      // 设置分析类型为占星，但同时计算八字和占星数据
      this.$store.dispatch('setAnalysisType', 'astrology')
      this.$store.dispatch('calculateFortune', formattedData)
      
      // 直接跳转到占星分析页面
      this.$router.push({ name: 'astrology-results', params: { id: Date.now() } })
    },
    
    validateForm() {
      // 姓名现在是可选的，不需要验证
      
      if (!this.formData.birthdate) {
        alert(this.$t('alerts.birthdateRequired'))
        return false
      }
      
      if (this.formData.birthHour === '') {
        alert(this.$t('alerts.birthTimeRequired'))
        return false
      }
      
      if (this.formData.birthMinute === '') {
        alert(this.$t('alerts.birthMinuteRequired'))
        return false
      }
      
      if (!this.formData.birthplace.trim()) {
        alert(this.$t('alerts.birthplaceRequired'))
        return false
      }
      
      if (!this.formData.gender) {
        alert(this.$t('alerts.genderRequired'))
        return false
      }
      
      return true
    }
  }
}
</script>

<style scoped>
/* =============================================================================
   HomePage 基础样式
   ============================================================================= */

.meiban-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 页头样式 */
.header {
  text-align: center;
  margin-bottom: 15px;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: #d35400;
  font-family: 'Shippori Mincho', serif;
}

.subtitle {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0;
}

/* 表单容器样式 */
.form-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  /* 阻止 AdSense 自动广告插入 */
  isolation: isolate;
}

/* 表单样式 */
.birth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* 标签样式 */
label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 6px;
}

.required-badge {
  background: #e74c3c;
  color: white;
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 500;
}

.optional-badge {
  background: #95a5a6;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: normal;
}

/* 表单元素样式 */
input, select {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s ease;
}

input:focus, select:focus {
  border-color: #d35400;
  outline: none;
}

/* 时间输入组合样式 */
.time-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-select {
  flex: 1;
  min-width: 70px;
}

.time-separator {
  font-size: 1.2rem;
  font-weight: bold;
  color: #7f8c8d;
}

/* 地点输入组合样式 */
.location-combo-wrapper {
  position: relative;
}

.location-input {
  width: 100%;
}

.city-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.city-group .region-header {
  background: #f8f9fa;
  padding: 8px 15px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #6c757d;
  border-bottom: 1px solid #e9ecef;
}

.city-option {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f1f1f1;
  transition: background 0.2s ease;
}

.city-option:hover {
  background: #f8f9fa;
}

.city-option:last-child {
  border-bottom: none;
}

/* 性别选择样式 */
.radio-group {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

/* 开始分析按钮样式 */
.section {
  margin-bottom: 15px;
}

.start-button-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.start-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 40px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-family: inherit;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  min-width: 300px;
  position: relative;
  overflow: hidden;
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, #5a67d8 0%, #667eea 100%);
}

.start-btn-icon {
  font-size: 3rem;
  min-width: 60px;
  text-align: center;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.start-btn-content {
  flex: 1;
}

.start-btn-content h4 {
  margin: 0 0 6px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  font-family: 'Shippori Mincho', serif;
}

.start-btn-content .start-btn-description {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.3;
}


/* 页脚样式 */
.footer {
  margin-top: 15px;
  text-align: center;
  font-size: 0.75rem;
  color: #95a5a6;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .meiban-container {
    padding: 15px;
  }
  
  .header {
    margin-bottom: 12px;
  }
  
  .form-container {
    padding: 18px;
  }
  
  .title {
    font-size: 1.9rem;
    margin-bottom: 0.2rem;
  }
  
  .subtitle {
    font-size: 0.85rem;
  }
  
  .start-btn {
    padding: 16px 24px;
    gap: 12px;
    min-width: 280px;
  }
  
  .start-btn-icon {
    font-size: 2.5rem;
    min-width: 50px;
  }
  
  .start-btn-content h4 {
    font-size: 1.2rem;
  }
  
  .start-btn-content .start-btn-description {
    font-size: 0.85rem;
  }
  
}

@media (max-width: 480px) {
  .header {
    margin-bottom: 10px;
  }
  
  .title {
    font-size: 1.7rem;
    margin-bottom: 0.1rem;
  }
  
  .subtitle {
    font-size: 0.8rem;
  }
  
  .birth-form {
    gap: 10px;
  }
  
  .form-group {
    gap: 5px;
  }
  
  .time-input-wrapper {
    gap: 6px;
  }
  
  .start-btn {
    padding: 14px 20px;
    gap: 10px;
    min-width: 260px;
  }
  
  .start-btn-icon {
    font-size: 2.2rem;
    min-width: 45px;
  }
  
  .start-btn-content h4 {
    font-size: 1.1rem;
  }
  
  .start-btn-content .start-btn-description {
    font-size: 0.8rem;
  }

}
</style>