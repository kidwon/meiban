<template>
  <div class="meiban-container">
    <header class="header">
      <h1 class="title">命盤</h1>
      <p class="subtitle">生辰八字・命盤占い</p>
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
              <option value="" disabled selected>時</option>
              <option v-for="hour in 24" :key="`hour-${hour}`" :value="hour - 1">
                {{ hour - 1 }}
              </option>
            </select>
          </div>
          
          <div class="form-group time-group">
            <label for="birthMinute">分</label>
            <select id="birthMinute" v-model="formData.birthMinute" required>
              <option value="" disabled selected>分</option>
              <option v-for="minute in 60" :key="`minute-${minute}`" :value="minute - 1">
                {{ minute - 1 }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label for="birthplace">出生地</label>
          <input 
            type="text" 
            id="birthplace" 
            v-model="formData.birthplace" 
            placeholder="東京都など" 
            required
          />
        </div>
        
        <div class="form-group gender-group">
          <label>性別</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="formData.gender" value="male" required />
              <span>男性</span>
            </label>
            <label class="radio-label">
              <input type="radio" v-model="formData.gender" value="female" />
              <span>女性</span>
            </label>
          </div>
        </div>
        
        <button type="submit" class="submit-btn">鑑定する</button>
      </form>
    </div>
    
    <footer class="footer">
      <p>© 2025 命盤 - 生辰八字・四柱推命・命盤占い</p>
    </footer>
  </div>
</template>

<script>
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
      }
    }
  },
  methods: {
    submitForm() {
      // 将表单数据格式化为需要的格式
      const formattedData = {
        ...this.formData,
        fullBirthDateTime: `${this.formData.birthdate}T${String(this.formData.birthHour).padStart(2, '0')}:${String(this.formData.birthMinute).padStart(2, '0')}:00`
      };
      
      // 保存到Vuex
      this.$store.dispatch('saveUserData', formattedData);
      
      // 计算结果
      this.$store.dispatch('calculateFortune', formattedData);
      
      // 导航到结果页面
      this.$router.push({
        name: 'results',
        params: { id: Date.now() }
      });
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

.gender-group .radio-group {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
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
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #e67e22;
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
}
</style>