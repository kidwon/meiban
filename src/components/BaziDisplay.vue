<template>
  <div class="bazi-display">
    <!-- 生辰八字 -->
    <section class="bazi-section eight-characters">
      <h3 class="section-subtitle">生辰八字</h3>
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
    <section class="bazi-section elements" v-if="calculationResults.elements">
      <h3 class="section-subtitle">五行配置</h3>
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
      <div class="element-analysis">
        <h4>五行分析</h4>
        <div class="element-stats">
          <div class="stat-item" v-for="element in allElements" :key="element">
            <span class="element-name" :class="getElementClass(element)">{{ element }}</span>
            <span class="element-count">{{ getElementCount(element) }}</span>
            <div class="element-bar">
              <div class="element-bar-fill" 
                   :style="{ width: getElementPercentage(element) + '%' }"
                   :class="getElementClass(element)"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 运势分析 -->
    <section class="bazi-section fortune" v-if="calculationResults.fortune">
      <h3 class="section-subtitle">運勢分析</h3>
      <div class="fortune-overview">
        <div class="fortune-badge">{{ calculationResults.fortune.overview }}</div>
      </div>
      <div class="fortune-details">
        <div class="fortune-item" v-if="calculationResults.fortune.career">
          <div class="fortune-label">仕事運</div>
          <div class="fortune-stars">{{ calculationResults.fortune.career }}</div>
          <div class="fortune-description">
            {{ getFortuneDescription('career', calculationResults.fortune.career) }}
          </div>
        </div>
        <div class="fortune-item" v-if="calculationResults.fortune.wealth">
          <div class="fortune-label">金運</div>
          <div class="fortune-stars">{{ calculationResults.fortune.wealth }}</div>
          <div class="fortune-description">
            {{ getFortuneDescription('wealth', calculationResults.fortune.wealth) }}
          </div>
        </div>
        <div class="fortune-item" v-if="calculationResults.fortune.love">
          <div class="fortune-label">恋愛運</div>
          <div class="fortune-stars">{{ calculationResults.fortune.love }}</div>
          <div class="fortune-description">
            {{ getFortuneDescription('love', calculationResults.fortune.love) }}
          </div>
        </div>
        <div class="fortune-item" v-if="calculationResults.fortune.health">
          <div class="fortune-label">健康運</div>
          <div class="fortune-stars">{{ calculationResults.fortune.health }}</div>
          <div class="fortune-description">
            {{ getFortuneDescription('health', calculationResults.fortune.health) }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BaziDisplay',
  props: {
    calculationResults: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      allElements: ['木', '火', '土', '金', '水']
    }
  },
  methods: {
    getElementClass(element) {
      const classes = {
        '木': 'wood',
        '火': 'fire', 
        '土': 'earth',
        '金': 'metal',
        '水': 'water'
      };
      return classes[element] || '';
    },
    getElementCount(element) {
      if (!this.calculationResults.elements) return 0;
      return this.calculationResults.elements.filter(e => e === element).length;
    },
    getElementPercentage(element) {
      if (!this.calculationResults.elements) return 0;
      const count = this.getElementCount(element);
      const total = this.calculationResults.elements.length;
      return total > 0 ? Math.round((count / total) * 100) : 0;
    },
    getFortuneDescription(type, stars) {
      const descriptions = {
        career: {
          '★★★★★': 'キャリアにおいて非常に良い運勢です',
          '★★★★☆': 'キャリアにおいて良い運勢です',
          '★★★☆☆': 'キャリアにおいて普通の運勢です',
          '★★☆☆☆': 'キャリアにおいて注意が必要です',
          '★☆☆☆☆': 'キャリアにおいて困難な時期です'
        },
        wealth: {
          '★★★★★': '金運が非常に良好です',
          '★★★★☆': '金運が良好です', 
          '★★★☆☆': '金運は普通です',
          '★★☆☆☆': '金運に注意が必要です',
          '★☆☆☆☆': '金運が低迷しています'
        },
        love: {
          '★★★★★': '恋愛運が非常に良好です',
          '★★★★☆': '恋愛運が良好です',
          '★★★☆☆': '恋愛運は普通です', 
          '★★☆☆☆': '恋愛運に注意が必要です',
          '★☆☆☆☆': '恋愛運が低迷しています'
        },
        health: {
          '★★★★★': '健康運が非常に良好です',
          '★★★★☆': '健康運が良好です',
          '★★★☆☆': '健康運は普通です',
          '★★☆☆☆': '健康運に注意が必要です', 
          '★☆☆☆☆': '健康運が低迷しています'
        }
      };
      return descriptions[type]?.[stars] || '';
    }
  }
}
</script>

<style scoped>
.bazi-display {
  padding: 1rem 0;
}

.bazi-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
  border-radius: 16px;
  border: 1px solid #e1e8ff;
}

.section-subtitle {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #6366f1;
}

/* 生辰八字样式 */
.eight-char-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.char-column {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.char-column:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.char-label {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.char-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.25rem 0;
}

.char-value.heavenly {
  color: #dc2626;
}

.char-value.earthly {
  color: #2563eb;
}

/* 五行样式 */
.elements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.element-item {
  padding: 0.75rem;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.element-item.wood { background: linear-gradient(135deg, #059669, #10b981); }
.element-item.fire { background: linear-gradient(135deg, #dc2626, #ef4444); }
.element-item.earth { background: linear-gradient(135deg, #d97706, #f59e0b); }
.element-item.metal { background: linear-gradient(135deg, #64748b, #94a3b8); }
.element-item.water { background: linear-gradient(135deg, #2563eb, #3b82f6); }

.element-analysis h4 {
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.element-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-item {
  display: grid;
  grid-template-columns: 60px 40px 1fr;
  align-items: center;
  gap: 1rem;
}

.element-name {
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-align: center;
  color: white;
  font-size: 0.9rem;
}

.element-name.wood { background: #059669; }
.element-name.fire { background: #dc2626; }
.element-name.earth { background: #d97706; }
.element-name.metal { background: #64748b; }
.element-name.water { background: #2563eb; }

.element-count {
  font-weight: 600;
  color: #374151;
  text-align: center;
}

.element-bar {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.element-bar-fill {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 4px;
}

.element-bar-fill.wood { background: #059669; }
.element-bar-fill.fire { background: #dc2626; }
.element-bar-fill.earth { background: #d97706; }
.element-bar-fill.metal { background: #64748b; }
.element-bar-fill.water { background: #2563eb; }

/* 运势分析样式 */
.fortune-overview {
  margin-bottom: 1.5rem;
  text-align: center;
}

.fortune-badge {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.fortune-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.fortune-item {
  padding: 1.25rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.fortune-item:hover {
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
  transform: translateY(-1px);
}

.fortune-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.fortune-stars {
  color: #f59e0b;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.fortune-description {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .eight-char-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .char-column {
    padding: 0.75rem;
  }
  
  .char-value {
    font-size: 1.25rem;
  }
  
  .fortune-details {
    grid-template-columns: 1fr;
  }
  
  .stat-item {
    grid-template-columns: 50px 30px 1fr;
    gap: 0.5rem;
  }
}
</style>