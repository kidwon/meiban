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

      <!-- 星座位置信息 -->
      <section class="result-section astrology-positions">
        <h2 class="section-title">星座位置</h2>
        <div class="positions-grid">
          <div class="position-item ascendant">
            <div class="position-label">上升</div>
            <div class="position-value">
              <span class="sign">{{ calculationResults.astrologyPositions.ascendant.sign }}</span>
              <span class="degree">{{ calculationResults.astrologyPositions.ascendant.degree }}°{{ calculationResults.astrologyPositions.ascendant.minute }}'</span>
            </div>
          </div>
          <div class="position-item sun">
            <div class="position-label">太陽</div>
            <div class="position-value">
              <span class="sign">{{ calculationResults.astrologyPositions.sun.sign }}</span>
              <span class="degree">{{ calculationResults.astrologyPositions.sun.degree }}°{{ calculationResults.astrologyPositions.sun.minute }}'</span>
            </div>
          </div>
          <div class="position-item moon">
            <div class="position-label">月亮</div>
            <div class="position-value">
              <span class="sign">{{ calculationResults.astrologyPositions.moon.sign }}</span>
              <span class="degree">{{ calculationResults.astrologyPositions.moon.degree }}°{{ calculationResults.astrologyPositions.moon.minute }}'</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 八字信息 -->
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

      <!-- 五行配置 -->
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

      <!-- 詳細運勢分析 -->
      <section class="result-section detailed-fortune" v-if="calculationResults.detailedFortune">
        <h2 class="section-title">詳細運勢分析</h2>
        
        <!-- 恋愛運 -->
        <div class="fortune-category">
          <h3 class="category-title">
            <span class="category-icon">💕</span>
            恋愛運
            <span class="category-stars">{{ calculationResults.detailedFortune.love.stars }}</span>
          </h3>
          <div class="fortune-content">
            <p class="fortune-advice">{{ calculationResults.detailedFortune.love.advice }}</p>
            <p class="fortune-tips">{{ calculationResults.detailedFortune.love.tips }}</p>
          </div>
        </div>

        <!-- 出会い運 -->
        <div class="fortune-category">
          <h3 class="category-title">
            <span class="category-icon">🌟</span>
            出会い運
            <span class="category-stars">{{ calculationResults.detailedFortune.encounter.stars }}</span>
          </h3>
          <div class="fortune-content">
            <p class="fortune-advice">{{ calculationResults.detailedFortune.encounter.advice }}</p>
            <p class="fortune-tips">{{ calculationResults.detailedFortune.encounter.tips }}</p>
          </div>
        </div>

        <!-- 結婚運 -->
        <div class="fortune-category">
          <h3 class="category-title">
            <span class="category-icon">💒</span>
            結婚運
            <span class="category-stars">{{ calculationResults.detailedFortune.marriage.stars }}</span>
          </h3>
          <div class="fortune-content">
            <p class="fortune-advice">{{ calculationResults.detailedFortune.marriage.advice }}</p>
            <p class="fortune-tips">{{ calculationResults.detailedFortune.marriage.tips }}</p>
          </div>
        </div>

        <!-- 総合運 -->
        <div class="fortune-category">
          <h3 class="category-title">
            <span class="category-icon">🎯</span>
            総合運
            <span class="category-stars">{{ calculationResults.detailedFortune.overall.stars }}</span>
          </h3>
          <div class="fortune-content">
            <p class="fortune-advice">{{ calculationResults.detailedFortune.overall.advice }}</p>
            <p class="fortune-tips">{{ calculationResults.detailedFortune.overall.tips }}</p>
          </div>
        </div>

        <!-- 人生運 -->
        <div class="fortune-category">
          <h3 class="category-title">
            <span class="category-icon">🌱</span>
            人生運
            <span class="category-stars">{{ calculationResults.detailedFortune.life.stars }}</span>
          </h3>
          <div class="fortune-content">
            <p class="fortune-advice">{{ calculationResults.detailedFortune.life.advice }}</p>
            <p class="fortune-tips">{{ calculationResults.detailedFortune.life.tips }}</p>
          </div>
        </div>

        <!-- 仕事運 -->
        <div class="fortune-category">
          <h3 class="category-title">
            <span class="category-icon">💼</span>
            仕事運
            <span class="category-stars">{{ calculationResults.detailedFortune.work.stars }}</span>
          </h3>
          <div class="fortune-content">
            <p class="fortune-advice">{{ calculationResults.detailedFortune.work.advice }}</p>
            <p class="fortune-tips">{{ calculationResults.detailedFortune.work.tips }}</p>
          </div>
        </div>
      </section>

      <!-- 简要运势概览（保持原有的） -->
      <section class="result-section fortune">
        <h2 class="section-title">運勢概覧</h2>
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
    if (!this.userData || !this.calculationResults) {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style scoped>
.results-container {
  max-width: 700px;
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

/* 星座位置样式 */
.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.position-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease;
}

.position-item:hover {
  transform: translateY(-5px);
}

.position-item.ascendant {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

.position-item.sun {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #333;
}

.position-item.moon {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
}

.position-label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.position-value {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.position-value .sign {
  font-size: 1.4rem;
  font-weight: 700;
  font-family: 'Shippori Mincho', serif;
}

.position-value .degree {
  font-size: 1.1rem;
  font-weight: 500;
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

.element-wood { background-color: #55efc4; color: #006266; }
.element-fire { background-color: #ff7675; color: #6c0000; }
.element-earth { background-color: #fdcb6e; color: #6b4226; }
.element-metal { background-color: #dfe6e9; color: #636e72; }
.element-water { background-color: #74b9ff; color: #0039a6; }

/* 详细运势样式 */
.detailed-fortune {
  margin-top: 40px;
}

.fortune-category {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.fortune-category:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.category-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e74c3c;
  font-family: 'Shippori Mincho', serif;
}

.category-icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

.category-stars {
  color: #f39c12;
  font-size: 1.1rem;
  font-family: monospace;
}

.fortune-content {
  color: #34495e;
  line-height: 1.7;
}

.fortune-advice {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 12px;
  color: #2c3e50;
}

.fortune-tips {
  font-size: 0.95rem;
  color: #7f8c8d;
  font-style: italic;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

/* 简要运势概览样式 */
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

@media (max-width: 768px) {
  .results-container {
    padding: 15px;
  }
  
  .results-content {
    padding: 20px;
  }
  
  .positions-grid {
    grid-template-columns: 1fr;
    gap: 15px;
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
  
  .category-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .fortune-category {
    padding: 20px;
  }
}
</style>