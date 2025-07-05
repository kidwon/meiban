<template>
  <div class="meiban-container">
    <header class="header">
      <h1 class="title">命盤</h1>
      <p class="subtitle">生辰八字・命盤占い・占星分析</p>
    </header>
    
    <div class="form-container">
      <form class="birth-form">
        <div class="form-group">
          <label for="name">お名前</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            placeholder="お名前を入力してください" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="birthdate">生年月日</label>
          <input 
            type="date" 
            id="birthdate" 
            v-model="formData.birthdate" 
            required
          />
        </div>
        
        <div class="form-row">
          <div class="form-group time-group">
            <label for="birthHour">時間</label>
            <select id="birthHour" v-model="formData.birthHour" required>
              <option value="" disabled>時</option>
              <option v-for="hour in 24" :key="hour" :value="String(hour - 1)">{{ hour - 1 }}</option>
            </select>
          </div>
          
          <div class="form-group time-group">
            <label for="birthMinute">分</label>
            <select id="birthMinute" v-model="formData.birthMinute" required>
              <option value="" disabled>分</option>
              <option v-for="minute in 60" :key="minute" :value="String(minute - 1)">{{ minute - 1 }}</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label for="birthplace">出生地</label>
          <div class="location-input-wrapper">
            <select v-model="selectedCity" @change="onCitySelect" class="city-select">
              <option value="">都市を選択してください</option>
              <optgroup v-for="(cities, region) in cityGroups" :key="region" :label="regionLabels[region]">
                <option v-for="city in cities" :key="city.value" :value="city.value">{{ city.label }}</option>
              </optgroup>
            </select>
            <input 
              type="text" 
              id="birthplace" 
              v-model="formData.birthplace" 
              placeholder="または直接入力してください" 
              required
              class="city-input"
            />
          </div>
          <p class="location-hint">リストから選択するか、直接入力してください</p>
        </div>
        
        <div class="form-group gender-group">
          <label>性別</label>
          <div class="radio-group">
            <label class="radio-label" v-for="option in genderOptions" :key="option.value">
              <input type="radio" v-model="formData.gender" :value="option.value" required />
              <span>{{ option.label }}</span>
            </label>
          </div>
        </div>
        
        <!-- 分析类型选择 -->
        <div class="section">
          <h3 class="section-title">分析種類を選択</h3>
          <div class="analysis-buttons">
            <button 
              type="button"
              @click="submitWithAnalysisType('bazi')"
              class="analysis-btn analysis-btn--bazi"
            >
              <div class="btn-icon">🏮</div>
              <div class="btn-content">
                <h4>生辰八字</h4>
                <p>四柱推命による詳細な運勢分析</p>
              </div>
            </button>
            
            <button 
              type="button"
              @click="submitWithAnalysisType('astrology')"
              class="analysis-btn analysis-btn--astrology"
            >
              <div class="btn-icon">⭐</div>
              <div class="btn-content">
                <h4>占星分析</h4>
                <p>西洋占星術による星盤分析</p>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
    
    <!-- 功能介绍区域 -->
    <div class="features-section">
      <h3 class="features-title">機能紹介</h3>
      <div class="features-grid">
        <div class="feature-card feature-card--primary">
          <div class="feature-icon">🏮</div>
          <h4>生辰八字</h4>
          <p>四柱推命による伝統的な運勢分析</p>
        </div>
        <div class="feature-card feature-card--secondary">
          <div class="feature-icon">⭐</div>
          <h4>占星分析</h4>
          <p>西洋占星術による詳細な星盤分析</p>
        </div>
        <div class="feature-card feature-card--success">
          <div class="feature-icon">🌟</div>
          <h4>行運分析</h4>
          <p>現在の運勢の詳細な分析レポート</p>
        </div>
        <div class="feature-card feature-card--primary">
          <div class="feature-icon">📈</div>
          <h4>運勢予測</h4>
          <p>未来の傾向と重要な時期の予測</p>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <p>© 2025 命盤 - 生辰八字・四柱推命・命盤占い・占星分析</p>
    </footer>
  </div>
</template>

<script>
import { getCityList } from '../utils/calculator.js';
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
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
      selectedCity: '',
      cityGroups: {},
      regionLabels: {
        japanese: '日本',
        chinese: '中国', 
        hkTaiwan: '港澳台'
      },
      genderOptions: [
        { value: 'male', label: '男性' },
        { value: 'female', label: '女性' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      userData: 'getUserData',
      calculationResults: 'getCalculationResults'
    })
  },
  
  watch: {
    userData: {
      handler(newVal) {
        if (newVal) {
          this.fillFormWithStoredData();
        }
      },
      immediate: true
    }
  },
  
  created() {
    this.cityGroups = getCityList();
  },
  
  mounted() {
    if (this.userData) {
      this.fillFormWithStoredData();
    }
  },
  
  methods: {
    onCitySelect() {
      if (this.selectedCity) {
        this.formData.birthplace = this.selectedCity;
      }
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
        };
        
        if (this.userData.birthplace) {
          this.selectedCity = this.userData.birthplace;
        }
      }
    },
    
    submitWithAnalysisType(type) {
      // 验证表单数据
      if (!this.validateForm()) {
        return;
      }
      
      this.analysisType = type;
      
      const formattedData = {
        ...this.formData,
        birthHour: parseInt(this.formData.birthHour),
        birthMinute: parseInt(this.formData.birthMinute),
        fullBirthDateTime: `${this.formData.birthdate}T${String(this.formData.birthHour).padStart(2, '0')}:${String(this.formData.birthMinute).padStart(2, '0')}:00`
      };
      
      this.$store.dispatch('saveUserData', formattedData);
      this.$store.dispatch('setAnalysisType', type);
      this.$store.dispatch('calculateFortune', formattedData);
      
      // 根据选择的分析类型跳转到不同页面
      if (type === 'bazi') {
        this.$router.push({ name: 'bazi-results', params: { id: Date.now() } });
      } else {
        this.$router.push({ name: 'astrology-results', params: { id: Date.now() } });
      }
    },
    
    validateForm() {
      // 检查必填字段
      if (!this.formData.name.trim()) {
        alert('お名前を入力してください');
        return false;
      }
      
      if (!this.formData.birthdate) {
        alert('生年月日を選択してください');
        return false;
      }
      
      if (this.formData.birthHour === '') {
        alert('時間を選択してください');
        return false;
      }
      
      if (this.formData.birthMinute === '') {
        alert('分を選択してください');
        return false;
      }
      
      if (!this.formData.birthplace.trim()) {
        alert('出生地を入力してください');
        return false;
      }
      
      if (!this.formData.gender) {
        alert('性別を選択してください');
        return false;
      }
      
      return true;
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
  margin-bottom: 30px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #d35400;
  font-family: 'Shippori Mincho', serif;
}

.subtitle {
  font-size: 1rem;
  color: #7f8c8d;
}

/* 表单容器样式 */
.form-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

/* 表单样式 */
.birth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.time-group {
  flex: 1;
}

/* 表单元素样式 */
label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #34495e;
}

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

/* 地点输入样式 */
.location-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.city-select {
  background-color: #f8f9fa;
  color: #666;
}

.city-select:focus {
  background-color: #fff;
  border-color: #d35400;
}

.location-hint {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin: 0;
  font-style: italic;
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
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.3rem;
  color: #34495e;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.analysis-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.analysis-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
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
  font-size: 3rem;
  min-width: 60px;
  text-align: center;
}

.analysis-btn .btn-content {
  flex: 1;
}

.analysis-btn .btn-content h4 {
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
}

.analysis-btn .btn-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #7f8c8d;
  line-height: 1.4;
}

/* 功能介绍区域样式 */
.features-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
}

.features-title {
  text-align: center;
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 25px;
  font-family: 'Shippori Mincho', serif;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.feature-card--primary:hover {
  border-color: #d35400;
  box-shadow: 0 8px 25px rgba(211, 84, 0, 0.2);
}

.feature-card--secondary:hover {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
}

.feature-card--success:hover {
  border-color: #27ae60;
  box-shadow: 0 8px 25px rgba(39, 174, 96, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.feature-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.feature-card p {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

/* 页脚样式 */
.footer {
  margin-top: 30px;
  text-align: center;
  font-size: 0.8rem;
  color: #95a5a6;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .meiban-container {
    padding: 15px;
  }
  
  .form-container {
    padding: 20px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .analysis-buttons {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .analysis-btn {
    padding: 20px;
    gap: 15px;
  }
  
  .analysis-btn .btn-icon {
    font-size: 2.5rem;
    min-width: 50px;
  }
  
  .analysis-btn .btn-content h4 {
    font-size: 1.1rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .feature-card {
    padding: 15px;
  }
  
  .feature-icon {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .birth-form {
    gap: 15px;
  }
  
  .analysis-btn {
    padding: 15px;
    gap: 12px;
  }
  
  .analysis-btn .btn-icon {
    font-size: 2rem;
    min-width: 40px;
  }
  
  .analysis-btn .btn-content h4 {
    font-size: 1rem;
  }
  
  .analysis-btn .btn-content p {
    font-size: 0.8rem;
  }
  
  .feature-icon {
    font-size: 1.8rem;
  }
}
</style>