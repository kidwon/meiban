<template>
  <div class="meiban-container">
    <header class="header">
      <h1 class="title">命盤</h1>
      <p class="subtitle">生辰八字・命盤占い・行運分析</p>
    </header>
    
    <div class="form-container">
      <form @submit.prevent="submitForm" class="birth-form">
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
        
        <button type="submit" class="submit-btn">鑑定する</button>
      </form>
      
      <!-- 快速功能入口 -->
      <div class="quick-actions" v-if="hasStoredData">
        <h3 class="quick-title">クイックアクション</h3>
        <p class="quick-subtitle">保存されたデータを使用して素早く分析</p>
        <div class="action-buttons">
          <button @click="goToTransitAnalysis" class="action-btn transit-btn">
            <div class="btn-icon">🌟</div>
            <div class="btn-content">
              <h4>行運盤分析</h4>
              <p>現在の運勢を詳しく分析</p>
            </div>
          </button>
          <button @click="viewLastResults" class="action-btn results-btn">
            <div class="btn-icon">📊</div>
            <div class="btn-content">
              <h4>前回の結果</h4>
              <p>基本命盤を再表示</p>
            </div>
          </button>
        </div>
        
        <!-- 调试信息 -->
        <div class="debug-info" v-if="showDebug">
          <h4>🔍 Debug Info:</h4>
          <div class="debug-item">
            <strong>hasStoredData:</strong> {{ hasStoredData }}
          </div>
          <div class="debug-item">
            <strong>userData exists:</strong> {{ !!userData }}
          </div>
          <div class="debug-item" v-if="userData">
            <strong>userData.name:</strong> "{{ userData.name }}"
          </div>
          <div class="debug-item" v-if="userData">
            <strong>userData.birthdate:</strong> "{{ userData.birthdate }}"
          </div>
          <div class="debug-item" v-if="userData">
            <strong>userData.birthHour:</strong> {{ userData.birthHour }} ({{ typeof userData.birthHour }})
          </div>
          <div class="debug-item" v-if="userData">
            <strong>userData.birthMinute:</strong> {{ userData.birthMinute }} ({{ typeof userData.birthMinute }})
          </div>
          <div class="debug-item" v-if="userData">
            <strong>userData.birthplace:</strong> "{{ userData.birthplace }}"
          </div>
          <div class="debug-item" v-if="userData">
            <strong>userData.gender:</strong> "{{ userData.gender }}"
          </div>
          <button @click="testTransitNavigation" class="debug-btn">🧪 测试路由跳转</button>
        </div>
      </div>
    </div>
    
    <!-- 功能介绍区域 -->
    <div class="features-section">
      <h3 class="features-title">機能紹介</h3>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h4>基本命盤</h4>
          <p>生辰八字と星座位置の基本分析</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⭐</div>
          <h4>星盤圖</h4>
          <p>インタラクティブな星盤の可視化</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌟</div>
          <h4>行運盤分析</h4>
          <p>現在の運勢の詳細な分析レポート</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📈</div>
          <h4>運勢予測</h4>
          <p>未来の傾向と重要な時期の予測</p>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <p>© 2025 命盤 - 生辰八字・四柱推命・命盤占い・行運分析</p>
    </footer>
  </div>
</template>

<script>
import { getCityList } from '../utils/calculator.js';
import { mapGetters } from 'vuex';
import './HomePage.css'; // 导入分离的CSS文件

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
      ],
      showDebug: process.env.NODE_ENV === 'development'
    }
  },
  computed: {
    ...mapGetters({
      userData: 'getUserData',
      calculationResults: 'getCalculationResults'
    }),
    
    hasStoredData() {
      const result = this.userData && 
             this.userData.name && 
             this.userData.name.trim() !== '' &&
             this.userData.birthdate &&
             this.userData.birthHour !== null &&
             this.userData.birthHour !== undefined &&
             this.userData.birthHour !== '' &&
             this.userData.birthMinute !== null &&
             this.userData.birthMinute !== undefined &&
             this.userData.birthMinute !== '' &&
             this.userData.birthplace &&
             this.userData.birthplace.trim() !== '' &&
             this.userData.gender;
      
      console.log('hasStoredData 计算结果:', result);
      return result;
    }
  },
  
  watch: {
    userData: {
      handler(newVal) {
        console.log('userData 变化:', newVal);
        if (newVal) {
          this.fillFormWithStoredData();
        }
      },
      immediate: true
    }
  },
  
  created() {
    this.cityGroups = getCityList();
    console.log('HomePage created, userData:', this.userData);
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
        console.log('填充表单数据:', this.userData);
        
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
        
        console.log('填充后的表单数据:', this.formData);
      }
    },
    
    submitForm() {
      const formattedData = {
        ...this.formData,
        birthHour: parseInt(this.formData.birthHour),
        birthMinute: parseInt(this.formData.birthMinute),
        fullBirthDateTime: `${this.formData.birthdate}T${String(this.formData.birthHour).padStart(2, '0')}:${String(this.formData.birthMinute).padStart(2, '0')}:00`
      };
      
      console.log('提交表单数据:', formattedData);
      
      this.$store.dispatch('saveUserData', formattedData);
      this.$store.dispatch('calculateFortune', formattedData);
      this.$router.push({ name: 'results', params: { id: Date.now() } });
    },
    
    // 增强的行运分析跳转方法
    async goToTransitAnalysis() {
      console.log('🌟 点击行运分析');
      console.log('hasStoredData:', this.hasStoredData);
      console.log('当前 userData:', this.userData);
      
      if (!this.hasStoredData) {
        let missingFields = [];
        if (!this.userData) {
          missingFields.push('用户数据');
        } else {
          if (!this.userData.name || this.userData.name.trim() === '') missingFields.push('姓名');
          if (!this.userData.birthdate) missingFields.push('生年月日');
          if (this.userData.birthHour === null || this.userData.birthHour === undefined || this.userData.birthHour === '') missingFields.push('时间');
          if (!this.userData.birthplace || this.userData.birthplace.trim() === '') missingFields.push('出生地');
          if (!this.userData.gender) missingFields.push('性别');
        }
        
        alert(`先に以下の情報を入力してください: ${missingFields.join(', ')}`);
        return;
      }
      
      try {
        console.log('📍 准备跳转到行运分析页面...');
        await this.$router.push({ name: 'transit-analysis' });
        console.log('✅ 路由跳转成功');
      } catch (error) {
        console.error('❌ 路由跳转失败:', error);
        alert('页面跳转失败，请稍后重试');
      }
    },
    
    viewLastResults() {
      if (!this.hasStoredData || !this.calculationResults) {
        alert('まず鑑定を実行してください');
        return;
      }
      this.$router.push({ name: 'results', params: { id: 'last' } });
    },
    
    // 调试用的测试方法
    testTransitNavigation() {
      console.log('🧪 测试路由跳转');
      console.log('当前路由:', this.$route);
      console.log('路由器实例:', this.$router);
      
      // 直接测试路由跳转
      this.$router.push({ name: 'transit-analysis' })
        .then(() => {
          console.log('✅ 测试跳转成功');
        })
        .catch(error => {
          console.error('❌ 测试跳转失败:', error);
        });
    }
  }
}
</script>

<style>
/* 样式现在从 HomePage.css 文件导入 */
</style>