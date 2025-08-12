<template>
  <div class="meiban-container">
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
    
    <div class="form-container">
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
      
      <!-- 分析类型选择 -->
      <div class="section">
        <h3 class="section-title">{{ $t('analysis.selectType') }}</h3>
        <div class="analysis-buttons">
          <button 
            type="button"
            @click="submitWithAnalysisType('bazi')"
            class="analysis-btn analysis-btn--bazi"
          >
            <div class="btn-icon">🔮</div>
            <div class="btn-content">
              <h4>{{ $t('analysis.bazi.title') }}</h4>
              <p class="btn-description">{{ $t('analysis.bazi.description') }}</p>
            </div>
          </button>
          
          <button 
            type="button"
            @click="submitWithAnalysisType('astrology')"
            class="analysis-btn analysis-btn--astrology"
          >
            <div class="btn-icon">⭐</div>
            <div class="btn-content">
              <h4>{{ $t('analysis.astrology.title') }}</h4>
              <p class="btn-description">{{ $t('analysis.astrology.description') }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 广告位 - 主页有实质内容，可以显示 -->
    <AdSenseAd 
      :ad-slot="$options.AD_SLOTS.BANNER"
      container-class="banner"
    />
    
    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script>
import { getCityList } from '../utils/calculator.js'
import { mapGetters } from 'vuex'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import AdSenseAd from '../components/AdSenseAd.vue'
import i18nMixin from '../mixins/i18n.js'

export default {
  name: 'HomePage',
  mixins: [i18nMixin],
  
  AD_SLOTS: {
    BANNER: process.env.VUE_APP_AD_SLOT_BANNER || '1234567890',
    RECTANGLE: process.env.VUE_APP_AD_SLOT_RECTANGLE || '0987654321',
    RESPONSIVE: process.env.VUE_APP_AD_SLOT_RESPONSIVE || '5678901234'
  },
  
  components: {
    LanguageSwitcher,
    AdSenseAd
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
    
    submitWithAnalysisType(type) {
      // 验证表单数据
      if (!this.validateForm()) {
        return
      }
      
      this.analysisType = type
      
      const formattedData = {
        ...this.formData,
        birthHour: parseInt(this.formData.birthHour),
        birthMinute: parseInt(this.formData.birthMinute),
        fullBirthDateTime: `${this.formData.birthdate}T${String(this.formData.birthHour).padStart(2, '0')}:${String(this.formData.birthMinute).padStart(2, '0')}:00`
      }
      
      this.$store.dispatch('saveUserData', formattedData)
      this.$store.dispatch('setAnalysisType', type)
      this.$store.dispatch('calculateFortune', formattedData)
      
      // 根据选择的分析类型跳转到不同页面
      if (type === 'bazi') {
        this.$router.push({ name: 'bazi-results', params: { id: Date.now() } })
      } else {
        this.$router.push({ name: 'astrology-results', params: { id: Date.now() } })
      }
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

/* 分析类型选择样式 */
.section {
  margin-bottom: 15px;
}

.section-title {
  font-size: 1.2rem;
  color: #34495e;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
  margin-bottom: 12px;
  font-family: 'Shippori Mincho', serif;
}

.analysis-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.analysis-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.analysis-btn:hover {
  transform: translateY(-2px);
}

.analysis-btn--bazi {
  background: linear-gradient(135deg, #e8f2ff 0%, #f0f4ff 50%, #fff0f8 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.analysis-btn--bazi:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  background: linear-gradient(135deg, #dae8ff 0%, #e6ebff 50%, #ffe8f3 100%);
}

.analysis-btn--astrology {
  background: linear-gradient(135deg, #fff0f8 0%, #fef7ff 50%, #f0f9ff 100%);
  border: 1px solid rgba(240, 147, 251, 0.2);
}

.analysis-btn--astrology:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(240, 147, 251, 0.15);
  background: linear-gradient(135deg, #ffe8f3 0%, #fdf2ff 50%, #e6f7ff 100%);
}

.analysis-btn .btn-icon {
  font-size: 2.5rem;
  min-width: 50px;
  text-align: center;
}

.analysis-btn .btn-content {
  flex: 1;
}

.analysis-btn .btn-content h4 {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.analysis-btn .btn-content .btn-description {
  margin: 0;
  font-size: 0.8rem;
  color: #7f8c8d;
  line-height: 1.2;
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
  
  .analysis-btn {
    padding: 12px;
    gap: 8px;
  }
  
  .analysis-btn .btn-icon {
    font-size: 2rem;
    min-width: 40px;
  }
  
  .analysis-btn .btn-content h4 {
    font-size: 1rem;
  }
  
  .analysis-btn .btn-content .btn-description {
    font-size: 0.75rem;
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
  
  .analysis-btn {
    padding: 10px;
    gap: 6px;
  }
  
  .analysis-btn .btn-icon {
    font-size: 1.8rem;
    min-width: 36px;
  }
  
  .analysis-btn .btn-content h4 {
    font-size: 0.95rem;
  }
  
  .analysis-btn .btn-content .btn-description {
    font-size: 0.7rem;
  }
  
}
</style>