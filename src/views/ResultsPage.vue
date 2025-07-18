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

      <!-- 新增：星盘图区域 -->
      <section class="result-section star-chart-section">
        <h2 class="section-title">星盤圖</h2>
        <div class="chart-container">
          <StarChart :calculation-results="calculationResults" :size="chartSize" />
        </div>
      </section>

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

      <!-- 生辰八字 -->
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

      <!-- 運勢分析 -->
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
        <button @click="shareChart" class="share-btn">星盤を共有</button>
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import StarChart from '../components/StarChart/StarChart.vue';

export default {
  name: 'ResultsPage',
  components: {
    StarChart
  },
  setup() {
    const chartSize = ref(500);

    // 响应式图表大小
    const updateChartSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        chartSize.value = 350;
      } else if (width < 768) {
        chartSize.value = 400;
      } else {
        chartSize.value = 500;
      }
    };

    // 生命周期
    onMounted(() => {
      updateChartSize();
      window.addEventListener('resize', updateChartSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateChartSize);
    });

    return {
      chartSize
    };
  },
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
    },
    shareChart() {
      // 分享功能 - 可以截图或生成链接
      if (navigator.share) {
        navigator.share({
          title: '我的星盘命盘',
          text: `${this.userData.name}の星盤命盤結果`,
          url: window.location.href
        }).catch(err => {
          console.log('分享失败:', err);
          this.fallbackShare();
        });
      } else {
        this.fallbackShare();
      }
    },
    fallbackShare() {
      // 降级方案：复制链接
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            alert('链接已复制到剪贴板');
          })
          .catch(() => {
            alert('请手动复制当前页面链接进行分享');
          });
      } else {
        alert('请手动复制当前页面链接进行分享');
      }
    }
  },
  created() {
    // 如果没有计算结果，可能是用户直接访问此页面，返回首页
    if (!this.userData || !this.calculationResults) {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.results-container {
  max-width: 800px;
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

/* 星盘图区域样式 */
.star-chart-section {
  margin-bottom: 40px;
}

.chart-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

/* 星座位置样式 */
.astrology-positions {
  margin-bottom: 30px;
}

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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.position-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.position-item.ascendant {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.3);
}

.position-item.sun {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(252, 182, 159, 0.3);
}

.position-item.moon {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(168, 237, 234, 0.3);
}

.position-label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  opacity: 0.9;
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
  opacity: 0.9;
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
  gap: 15px;
  margin-top: 30px;
}

.back-btn, .share-btn {
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn {
  background-color: #7f8c8d;
  color: white;
}

.back-btn:hover {
  background-color: #95a5a6;
}

.share-btn {
  background-color: #3498db;
  color: white;
}

.share-btn:hover {
  background-color: #2980b9;
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
  
  .title {
    font-size: 1.8rem;
  }
  
  .positions-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .position-item {
    padding: 15px;
  }
  
  .position-value .sign {
    font-size: 1.2rem;
  }
  
  .position-value .degree {
    font-size: 1rem;
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

  .actions {
    flex-direction: column;
    align-items: center;
  }

  .back-btn, .share-btn {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    margin: 15px 0;
  }
  
  .eight-char-grid {
    justify-content: space-around;
  }
  
  .char-column {
    width: 20%;
  }
  
  .elements-grid {
    gap: 15px;
  }
  
  .element-item {
    width: 45px;
    height: 45px;
    font-size: 1.4rem;
  }
}
</style>