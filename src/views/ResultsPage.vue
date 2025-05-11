<template>
  <div class="results-container">
    <header class="header">
      <h1 class="title">命盤結果</h1>
      <p class="user-name">{{ userData ? userData.name : 'ゲスト' }}様の命盤</p>
    </header>

    <div class="results-content" v-if="calculationResults">
      <div class="birth-data-summary">
        <p>{{ formatBirthDate }} {{ formatBirthTime }} / {{ userData.birthplace }}</p>
      </div>

      <section class="result-section eight-characters">
        <h2 class="section-title">生辰八字</h2>
        <div class="eight-char-grid">
          <div class="char-column">
            <div class="char-label">年柱</div>
            <div class="char-value heavenly">{{ calculationResults.eightCharacters.year.heavenlyStem }}</div>
            <div class="char-value earthly">{{ calculationResults.eightCharacters.year.earthlyBranch }}</div>
          </div>
          <div class="char-column">
            <div class="char-label">月柱</div>
            <div class="char-value heavenly">{{ calculationResults.eightCharacters.month.heavenlyStem }}</div>
            <div class="char-value earthly">{{ calculationResults.eightCharacters.month.earthlyBranch }}</div>
          </div>
          <div class="char-column">
            <div class="char-label">日柱</div>
            <div class="char-value heavenly">{{ calculationResults.eightCharacters.day.heavenlyStem }}</div>
            <div class="char-value earthly">{{ calculationResults.eightCharacters.day.earthlyBranch }}</div>
          </div>
          <div class="char-column">
            <div class="char-label">時柱</div>
            <div class="char-value heavenly">{{ calculationResults.eightCharacters.hour.heavenlyStem }}</div>
            <div class="char-value earthly">{{ calculationResults.eightCharacters.hour.earthlyBranch }}</div>
          </div>
        </div>
      </section>

      <section class="result-section elements">
        <h2 class="section-title">五行配置</h2>
        <div class="elements-grid">
          <div 
            v-for="(element, index) in calculationResults.elements" 
            :key="index" 
            class="element-item"
            :class="getElementClass(element)"
          >
            {{ element }}
          </div>
        </div>
      </section>

      <section class="result-section fortune">
        <h2 class="section-title">運勢分析</h2>
        <div class="fortune-overview">
          <div class="fortune-badge">{{ calculationResults.fortune.overview }}</div>
        </div>
        <div class="fortune-details">
          <div class="fortune-item">
            <div class="fortune-label">仕事運</div>
            <div class="fortune-stars">{{ calculationResults.fortune.career }}</div>
          </div>
          <div class="fortune-item">
            <div class="fortune-label">金運</div>
            <div class="fortune-stars">{{ calculationResults.fortune.wealth }}</div>
          </div>
          <div class="fortune-item">
            <div class="fortune-label">恋愛運</div>
            <div class="fortune-stars">{{ calculationResults.fortune.love }}</div>
          </div>
          <div class="fortune-item">
            <div class="fortune-label">健康運</div>
            <div class="fortune-stars">{{ calculationResults.fortune.health }}</div>
          </div>
        </div>
      </section>

      <div class="actions">
        <button @click="goBack" class="back-btn">トップに戻る</button>
      </div>
    </div>

    <div class="loading" v-else>
      <p>命盤を計算中...</p>
    </div>

    <footer class="footer">
      <p>© 2025 命盤 - 生辰八字・四柱推命・命盤占い</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ResultsPage',
  computed: {
    ...mapGetters({
      userData: 'getUserData',
      calculationResults: 'getCalculationResults'
    }),
    formatBirthDate() {
      if (!this.userData || !this.userData.birthdate) return '';
      const dateParts = this.userData.birthdate.split('-');
      return `${dateParts[0]}年${dateParts[1]}月${dateParts[2]}日`;
    },
    formatBirthTime() {
      if (!this.userData) return '';
      return `${this.userData.birthHour}時${this.userData.birthMinute}分`;
    }
  },
  methods: {
    getElementClass(element) {
      const classes = {
        '木': 'element-wood',
        '火': 'element-fire',
        '土': 'element-earth',
        '金': 'element-metal',
        '水': 'element-water'
      };
      return classes[element] || '';
    },
    goBack() {
      this.$router.push({ name: 'home' });
    }
  },
  created() {
    // 如果没有计算结果，可能是用户直接访问此页面，返回首页
    if (!this.userData || !this.calculationResults) {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style scoped>
.results-container {
  max-width: 600px;
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
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #d35400;
  font-family: 'Shippori Mincho', serif;
}

.user-name {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.birth-data-summary {
  text-align: center;
  margin-bottom: 30px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.results-content {
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  flex-grow: 1;
}

.section-title {
  font-size: 1.3rem;
  color: #34495e;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.result-section {
  margin-bottom: 30px;
}

/* 八字样式 */
.eight-char-grid {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.char-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
}

.char-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 8px;
}

.char-value {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
}

.heavenly {
  background-color: #ffeaa7;
  color: #d35400;
}

.earthly {
  background-color: #81ecec;
  color: #00638d;
}

/* 五行样式 */
.elements-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.element-item {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Shippori Mincho', serif;
}

.element-wood {
  background-color: #55efc4;
  color: #006266;
}

.element-fire {
  background-color: #ff7675;
  color: #6c0000;
}

.element-earth {
  background-color: #fdcb6e;
  color: #6b4226;
}

.element-metal {
  background-color: #dfe6e9;
  color: #636e72;
}

.element-water {
  background-color: #74b9ff;
  color: #0039a6;
}

/* 运势样式 */
.fortune-overview {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.fortune-badge {
  background-color: #d35400;
  color: white;
  padding: 10px 30px;
  font-size: 1.5rem;
  border-radius: 30px;
  font-weight: 700;
  font-family: 'Shippori Mincho', serif;
}

.fortune-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.fortune-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
}

.fortune-label {
  font-size: 1rem;
  margin-bottom: 8px;
  color: #34495e;
}

.fortune-stars {
  color: #f39c12;
  font-size: 1.2rem;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.back-btn {
  background-color: #7f8c8d;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #95a5a6;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 1.2rem;
  color: #7f8c8d;
}

.footer {
  margin-top: 30px;
  text-align: center;
  font-size: 0.8rem;
  color: #95a5a6;
}

@media (max-width: 480px) {
  .results-container {
    padding: 15px;
  }
  
  .results-content {
    padding: 20px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .char-value {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .element-item {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .fortune-details {
    grid-template-columns: 1fr;
  }
}
</style>