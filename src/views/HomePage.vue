<template>
  <div class="meiban-container">
    <header class="header">
      <h1 class="title">命盤</h1>
      <p class="subtitle">生辰八字・命盤占い</p>
    </header>
    
    <div class="form-container">
      <form @submit.prevent="submitForm" class="birth-form">
        <div class="form-group">
          <label for="name">
            お名前 
            <span class="field-indicator optional">任意</span>
          </label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            placeholder="お名前を入力してください（空欄でも鑑定可能）"
          />
        </div>
        
        <div class="form-group">
          <label for="birthdate">
            生年月日 
            <span class="field-indicator required">必須</span>
          </label>
          <input 
            type="date" 
            id="birthdate" 
            v-model="formData.birthdate" 
            required
          />
        </div>
        
        <div class="form-row">
          <div class="form-group time-group">
            <label for="birthHour">
              時間 
              <span class="field-indicator required">必須</span>
            </label>
            <select id="birthHour" v-model="formData.birthHour" required>
              <option value="" disabled>時</option>
              <option v-for="hour in 24" :key="hour" :value="hour - 1">{{ hour - 1 }}</option>
            </select>
          </div>
          
          <div class="form-group time-group">
            <label for="birthMinute">
              分 
              <span class="field-indicator required">必須</span>
            </label>
            <select id="birthMinute" v-model="formData.birthMinute" required>
              <option value="" disabled>分</option>
              <option v-for="minute in 60" :key="minute" :value="minute - 1">{{ minute - 1 }}</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label for="birthplace">
            出生地 
            <span class="field-indicator required">必須</span>
          </label>
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
          <label>
            性別 
            <span class="field-indicator required">必須</span>
          </label>
          <div class="radio-group">
            <label class="radio-label" v-for="option in genderOptions" :key="option.value">
              <input type="radio" v-model="formData.gender" :value="option.value" required />
              <span>{{ option.label }}</span>
            </label>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="!isFormValid()">
            鑑定する
          </button>
          <button type="button" @click="clearForm" class="clear-btn">クリア</button>
        </div>
        
        <!-- 表单状态提示 -->
        <div class="form-status" v-if="!isFormValid()">
          <p class="status-message">
            <span class="status-icon">⚠️</span>
            必須項目をすべて入力してください
          </p>
          <div class="missing-fields">
            <span v-if="!formData.birthdate" class="missing-field">生年月日</span>
            <span v-if="formData.birthHour === ''" class="missing-field">時間</span>
            <span v-if="formData.birthMinute === ''" class="missing-field">分</span>
            <span v-if="!formData.birthplace" class="missing-field">出生地</span>
            <span v-if="!formData.gender" class="missing-field">性別</span>
          </div>
        </div>
      </form>
    </div>
    
    <footer class="footer">
      <p>© 2025 命盤 - 生辰八字・四柱推命・命盤占い</p>
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
      storedUserData: 'getUserData'
    })
  },
  created() {
    this.cityGroups = getCityList();
    // 从 Vuex 恢复之前的输入
    this.restoreFormData();
  },
  methods: {
    /**
     * 从 Vuex 恢复表单数据
     */
    restoreFormData() {
      if (this.storedUserData) {
        this.formData = {
          name: this.storedUserData.name || '',
          birthdate: this.storedUserData.birthdate || '',
          birthHour: this.storedUserData.birthHour !== undefined ? this.storedUserData.birthHour : '',
          birthMinute: this.storedUserData.birthMinute !== undefined ? this.storedUserData.birthMinute : '',
          birthplace: this.storedUserData.birthplace || '',
          gender: this.storedUserData.gender || ''
        };
        
        // 同步城市选择器
        if (this.formData.birthplace) {
          this.selectedCity = this.formData.birthplace;
        }
        
        console.log('恢复表单数据:', this.formData);
      }
    },
    
    /**
     * 检查表单是否有效（名字为可选）
     */
    isFormValid() {
      return this.formData.birthdate && 
             this.formData.birthHour !== '' && 
             this.formData.birthMinute !== '' && 
             this.formData.birthplace && 
             this.formData.gender;
    },
    onCitySelect() {
      if (this.selectedCity) {
        this.formData.birthplace = this.selectedCity;
      }
    },
    
    /**
     * 提交表单
     */
    submitForm() {
      // 检查必填项（名字除外）
      if (!this.isFormValid()) {
        alert('必須項目を入力してください（お名前以外）');
        return;
      }
      
      const formattedData = {
        ...this.formData,
        // 如果名字为空，使用默认值
        name: this.formData.name.trim() || 'ゲスト',
        fullBirthDateTime: `${this.formData.birthdate}T${String(this.formData.birthHour).padStart(2, '0')}:${String(this.formData.birthMinute).padStart(2, '0')}:00`
      };
      
      // 保存到 Vuex
      this.$store.dispatch('saveUserData', formattedData);
      this.$store.dispatch('calculateFortune', formattedData);
      this.$router.push({ name: 'results', params: { id: Date.now() } });
    },
    
    /**
     * 清空表单
     */
    clearForm() {
      this.formData = {
        name: '',
        birthdate: '',
        birthHour: '',
        birthMinute: '',
        birthplace: '',
        gender: ''
      };
      this.selectedCity = '';
      
      // 清空 Vuex 中的数据
      this.$store.dispatch('saveUserData', null);
      this.$store.commit('setCalculationResults', null);
      
      console.log('表单已清空');
    }
  },
  
  /**
   * 监听表单数据变化，实时保存到 Vuex
   */
  watch: {
    formData: {
      handler(newData) {
        // 实时保存表单数据（可选功能）
        // 只要有任何有效数据就保存（名字可为空）
        if (newData.birthdate || newData.birthplace || newData.gender) {
          const dataToSave = {
            ...newData,
            name: newData.name.trim() || 'ゲスト',
            fullBirthDateTime: newData.birthdate && newData.birthHour !== '' && newData.birthMinute !== '' 
              ? `${newData.birthdate}T${String(newData.birthHour).padStart(2, '0')}:${String(newData.birthMinute).padStart(2, '0')}:00`
              : null
          };
          this.$store.dispatch('saveUserData', dataToSave);
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.meiban-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans JP', sans-serif;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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

.form-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  flex-grow: 1;
}

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

label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 8px;
}

.field-indicator {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-indicator.required {
  background-color: #e74c3c;
  color: white;
}

.field-indicator.optional {
  background-color: #95a5a6;
  color: white;
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

optgroup {
  font-weight: 600;
  color: #34495e;
  background-color: #f1f2f6;
}

option {
  font-weight: 400;
  color: #333;
  background-color: #fff;
}

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

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.submit-btn {
  background-color: #d35400;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.submit-btn:hover:not(:disabled) {
  background-color: #e67e22;
}

.submit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  opacity: 0.7;
}

.clear-btn {
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 100px;
}

.clear-btn:hover {
  background-color: #7f8c8d;
}

/* 表单状态提示样式 */
.form-status {
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
}

.status-message {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px 0;
  font-size: 0.9rem;
  color: #e53e3e;
  font-weight: 500;
}

.status-icon {
  font-size: 1rem;
}

.missing-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.missing-field {
  background-color: #feb2b2;
  color: #c53030;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.footer {
  margin-top: 30px;
  text-align: center;
  font-size: 0.8rem;
  color: #95a5a6;
}

@media (max-width: 480px) {
  .meiban-container {
    padding: 15px;
  }
  
  .form-container {
    padding: 20px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .location-input-wrapper {
    gap: 8px;
  }
  
  .city-select, .city-input {
    font-size: 0.9rem;
    padding: 10px 12px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .clear-btn {
    min-width: auto;
  }
  
  .missing-fields {
    justify-content: center;
  }
  
  .field-indicator {
    font-size: 0.7rem;
    padding: 1px 6px;
  }
}
</style>