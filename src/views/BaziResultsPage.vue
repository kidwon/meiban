<template>
  <div class="bazi-results-container">
    <header class="header">
      <h1 class="title">生辰八字命盤結果</h1>
      <p class="user-name">{{ userData ? userData.name : 'ゲスト' }}様の八字命盤</p>
    </header>

    <div class="results-content" v-if="calculationResults">
      <div class="birth-data-summary">
        <p>{{ formatBirthDate }} {{ formatBirthTime }} / {{ userData.birthplace }}</p>
      </div>

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
        <div class="element-analysis">
          <h3>五行分析</h3>
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
      <section class="result-section fortune">
        <h2 class="section-title">運勢分析</h2>
        <div class="fortune-overview">
          <div class="fortune-badge">{{ calculationResults.fortune.overview }}</div>
        </div>
        <div class="fortune-details">
          <div class="fortune-item">
            <div class="fortune-label">仕事運</div>
            <div class="fortune-stars">{{ calculationResults.fortune.career }}</div>
            <div class="fortune-description">
              {{ getFortuneDescription('career', calculationResults.fortune.career) }}
            </div>
          </div>
          <div class="fortune-item">
            <div class="fortune-label">金運</div>
            <div class="fortune-stars">{{ calculationResults.fortune.wealth }}</div>
            <div class="fortune-description">
              {{ getFortuneDescription('wealth', calculationResults.fortune.wealth) }}
            </div>
          </div>
          <div class="fortune-item">
            <div class="fortune-label">恋愛運</div>
            <div class="fortune-stars">{{ calculationResults.fortune.love }}</div>
            <div class="fortune-description">
              {{ getFortuneDescription('love', calculationResults.fortune.love) }}
            </div>
          </div>
          <div class="fortune-item">
            <div class="fortune-label">健康運</div>
            <div class="fortune-stars">{{ calculationResults.fortune.health }}</div>
            <div class="fortune-description">
              {{ getFortuneDescription('health', calculationResults.fortune.health) }}
            </div>
          </div>
        </div>
      </section>

      <!-- 八字特征分析 -->
      <section class="result-section bazi-analysis">
        <h2 class="section-title">八字特徵分析</h2>
        <div class="analysis-grid">
          <div class="analysis-card">
            <h3>日主特質</h3>
            <div class="day-master">
              <span class="master-stem">{{ calculationResults.eightCharacters.day.heavenlyStem }}</span>
              <span class="master-element">{{ getStemElement(calculationResults.eightCharacters.day.heavenlyStem) }}</span>
            </div>
            <p class="analysis-text">{{ getDayMasterAnalysis() }}</p>
          </div>
          
          <div class="analysis-card">
            <h3>用神分析</h3>
            <div class="useful-god">
              <span class="god-element">{{ getUsefulGod() }}</span>
            </div>
            <p class="analysis-text">{{ getUsefulGodAnalysis() }}</p>
          </div>
          
          <div class="analysis-card">
            <h3>格局判斷</h3>
            <div class="pattern">
              <span class="pattern-name">{{ getBaziPattern() }}</span>
            </div>
            <p class="analysis-text">{{ getPatternAnalysis() }}</p>
          </div>
        </div>
      </section>

      <!-- 流年运势 -->
      <section class="result-section yearly-fortune">
        <h2 class="section-title">流年運勢</h2>
        <div class="yearly-grid">
          <div class="current-year">
            <h3>{{ currentYear }}年運勢</h3>
            <div class="year-elements">
              <span class="year-stem">{{ getCurrentYearStem() }}</span>
              <span class="year-branch">{{ getCurrentYearBranch() }}</span>
            </div>
            <div class="year-fortune">
              {{ getYearlyFortune() }}
            </div>
          </div>
          
          <div class="future-years">
            <h3>未來三年趨勢</h3>
            <div class="trend-items">
              <div class="trend-item" v-for="year in getNextThreeYears()" :key="year.year">
                <span class="trend-year">{{ year.year }}年</span>
                <span class="trend-info">{{ year.stem }}{{ year.branch }}</span>
                <span class="trend-rating">{{ year.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="actions">
        <ShareButton 
          :userData="userData"
          :calculationResults="calculationResults"
          analysisType="bazi"
          @shareSuccess="handleShareSuccess"
          @shareCancel="handleShareCancel"
          @error="handleShareError"
          @showTip="showShareTip"
        />
        <button @click="saveResults" class="btn btn--primary">結果を保存</button>
        <button @click="goBack" class="btn btn--outline">トップに戻る</button>
      </div>
    </div>

    <div class="loading" v-else>
      <p>八字命盤を計算中...</p>
    </div>

    <!-- 广告位 - 只在有完整计算结果且内容充实时显示 -->
    <AdSenseAd 
      v-if="hasCompleteContent"
      :ad-slot="$options.AD_SLOTS.RECTANGLE"
      container-class="rectangle"
      :require-content="true"
      :force-hide="false"
    />

    <footer class="footer">
      <p>© 2025 命盤 - 生辰八字・四柱推命</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ShareButton from '../components/ShareButton.vue';
import AdSenseAd from '../components/AdSenseAd.vue';

export default {
  name: 'BaziResultsPage',
  
  AD_SLOTS: {
    BANNER: process.env.VUE_APP_AD_SLOT_BANNER || '1234567890',
    RECTANGLE: process.env.VUE_APP_AD_SLOT_RECTANGLE || '0987654321',
    RESPONSIVE: process.env.VUE_APP_AD_SLOT_RESPONSIVE || '5678901234'
  },
  
  components: {
    ShareButton,
    AdSenseAd
  },
  data() {
    return {
      allElements: ['木', '火', '土', '金', '水'],
      currentYear: new Date().getFullYear(),
      
      // 运势描述
      fortuneDescriptions: {
        career: {
          '★★★★★': '事業運が絶好調です。昇進や新しいプロジェクトで大きな成功が期待できます。',
          '★★★★☆': '仕事面で良好な進展があります。努力が認められ評価が上がるでしょう。',
          '★★★☆☆': '安定した仕事運です。現状維持を心がけながら着実に進歩しましょう。',
          '★★☆☆☆': '仕事面で注意が必要です。慎重な判断と継続的な努力が重要です。',
          '★☆☆☆☆': '困難な時期ですが、基本に立ち返り地道な努力を続けてください。'
        },
        wealth: {
          '★★★★★': '金運が非常に良好です。投資や財テクで良い結果が期待できます。',
          '★★★★☆': '収入面で安定しています。計画的な貯蓄を心がけましょう。',
          '★★★☆☆': '平均的な金運です。無駄遣いを避け堅実な財政管理を。',
          '★★☆☆☆': '支出に注意が必要です。計画的な家計管理を心がけてください。',
          '★☆☆☆☆': '財政面で慎重になる時期です。不要な出費を控えましょう。'
        },
        love: {
          '★★★★★': '恋愛運が最高潮です。理想的な出会いや関係の発展が期待できます。',
          '★★★★☆': '愛情面で良い変化があります。積極的にアプローチしてみましょう。',
          '★★★☆☆': '安定した恋愛運です。相手とのコミュニケーションを大切にしましょう。',
          '★★☆☆☆': '恋愛面で慎重さが必要です。相手の気持ちを理解することから始めましょう。',
          '★☆☆☆☆': '恋愛よりも自分磨きに集中する時期です。内面の充実を図りましょう。'
        },
        health: {
          '★★★★★': '健康運が素晴らしい状態です。エネルギッシュに活動できるでしょう。',
          '★★★★☆': '体調が良好です。適度な運動で更なる健康増進を。',
          '★★★☆☆': '平均的な健康状態です。規則正しい生活を心がけてください。',
          '★★☆☆☆': '体調管理に注意が必要です。ストレス解消を心がけましょう。',
          '★☆☆☆☆': '健康面で注意深いケアが必要です。無理をせず休息を取ってください。'
        }
      }
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
    },
    // 检查是否有完整的内容可以显示广告
    hasCompleteContent() {
      return this.calculationResults && 
             this.calculationResults.bazi &&
             this.calculationResults.eightCharacters &&
             this.calculationResults.eightCharacters.year &&
             this.calculationResults.eightCharacters.month &&
             this.calculationResults.eightCharacters.day &&
             this.calculationResults.eightCharacters.hour &&
             this.calculationResults.elements &&
             this.calculationResults.elements.length > 0 &&
             this.calculationResults.fortune &&
             this.userData &&
             this.userData.birthdate &&
             this.userData.birthplace;
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
    
    getElementCount(element) {
      if (!this.calculationResults) return 0;
      return this.calculationResults.elements.filter(e => e === element).length;
    },
    
    getElementPercentage(element) {
      const count = this.getElementCount(element);
      const total = this.calculationResults ? this.calculationResults.elements.length : 1;
      return (count / total) * 100;
    },
    
    getFortuneDescription(type, stars) {
      return this.fortuneDescriptions[type][stars] || '運勢を分析中です...';
    },
    
    getStemElement(stem) {
      const stemElements = {
        '甲': '木', '乙': '木', '丙': '火', '丁': '火',
        '戊': '土', '己': '土', '庚': '金', '辛': '金',
        '壬': '水', '癸': '水'
      };
      return stemElements[stem] || '';
    },
    
    getDayMasterAnalysis() {
      if (!this.calculationResults) return '';
      const dayStem = this.calculationResults.eightCharacters.day.heavenlyStem;
      const element = this.getStemElement(dayStem);
      
      const analyses = {
        '木': '性格が柔軟で成長志向。創造力に富み、人とのつながりを大切にします。',
        '火': '情熱的で積極的な性格。リーダーシップを発揮し、明るいエネルギーを持っています。',
        '土': '安定感があり信頼される性格。忍耐強く、堅実な判断力を持っています。',
        '金': '意志が強く正義感のある性格。秩序を重んじ、責任感が強いです。',
        '水': '知恵深く適応力のある性格。直感力に優れ、変化に柔軟に対応します。'
      };
      
      return analyses[element] || '個性的な特徴を持っています。';
    },
    
    getUsefulGod() {
      if (!this.calculationResults) return '';
      const elements = this.calculationResults.elements;
      const elementCounts = {};
      
      this.allElements.forEach(element => {
        elementCounts[element] = elements.filter(e => e === element).length;
      });
      
      // 最少的五行を用神とする簡单的判定
      let minElement = this.allElements[0];
      let minCount = elementCounts[minElement];
      
      this.allElements.forEach(element => {
        if (elementCounts[element] < minCount && elementCounts[element] < 2) {
          minElement = element;
          minCount = elementCounts[element];
        }
      });
      
      return minElement;
    },
    
    getUsefulGodAnalysis() {
      const usefulGod = this.getUsefulGod();
      const analyses = {
        '木': '木を補強することで運勢が向上します。緑色のアイテムや植物が吉。',
        '火': '火の要素を取り入れると良いでしょう。赤色や明るい環境が運気アップに。',
        '土': '土の安定性を活用しましょう。黄色や茶色のアイテムが効果的。',
        '金': '金の力を借りて運勢改善を。白色や金属製品が幸運を呼びます。',
        '水': '水の流れのような柔軟性が鍵。黒色や青色のアイテムがお勧め。'
      };
      return analyses[usefulGod] || 'バランスの取れた生活を心がけましょう。';
    },
    
    getBaziPattern() {
      if (!this.calculationResults) return '普通格';
      
      // 简单的格局判定
      const patterns = ['正官格', '偏官格', '正財格', '偏財格', '食神格', '傷官格', '正印格', '偏印格', '建禄格', '羊刃格'];
      return patterns[Math.floor(Math.random() * patterns.length)];
    },
    
    getPatternAnalysis() {
      const pattern = this.getBaziPattern();
      const analyses = {
        '正官格': '責任感が強く、安定した人生を歩む傾向があります。',
        '偏官格': '行動力があり、困難を乗り越える力を持っています。',
        '正財格': '堅実な財運に恵まれ、計画的な人生設計が得意です。',
        '偏財格': '商才があり、多方面での収入機会に恵まれます。',
        '食神格': '創造力豊かで、芸術的才能を発揮できます。',
        '傷官格': '独創性があり、新しいことに挑戦する勇気を持っています。',
        '正印格': '学習能力が高く、知識を活かした分野で成功します。',
        '偏印格': '直感力に優れ、独特の視点で物事を捉えます。',
        '建禄格': '自立心が強く、自分の力で道を切り開きます。',
        '羊刃格': 'エネルギッシュで、リーダーシップを発揮します。'
      };
      return analyses[pattern] || 'ユニークな人生パターンを持っています。';
    },
    
    getCurrentYearStem() {
      const year = this.currentYear;
      const stems = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'];
      return stems[(year - 4) % 10];
    },
    
    getCurrentYearBranch() {
      const year = this.currentYear;
      const branches = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'];
      return branches[(year - 4) % 12];
    },
    
    getYearlyFortune() {
      const fortunes = [
        '大吉の年です。新しいことを始めるのに最適な時期です。',
        '吉運の年です。着実な成果を期待できるでしょう。',
        '平運の年です。現状維持を心がけながら準備を整えましょう。',
        '注意が必要な年です。慎重な行動と忍耐が求められます。',
        '挑戦の年です。困難を乗り越えることで成長できるでしょう。'
      ];
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    },
    
    getNextThreeYears() {
      const years = [];
      const stems = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'];
      const branches = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'];
      const ratings = ['★★★★★', '★★★★☆', '★★★☆☆', '★★☆☆☆', '★☆☆☆☆'];
      
      for (let i = 1; i <= 3; i++) {
        const year = this.currentYear + i;
        years.push({
          year: year,
          stem: stems[(year - 4) % 10],
          branch: branches[(year - 4) % 12],
          rating: ratings[Math.floor(Math.random() * ratings.length)]
        });
      }
      
      return years;
    },
    
    // 新的分享功能方法
    handleShareSuccess(platform) {
      console.log(`生辰八字结果分享成功: ${platform}`);
      
      // 统计分享事件
      if (window.gtag) {
        window.gtag('event', 'share_success', {
          'content_type': 'bazi_results',
          'platform': platform,
          'user_name': this.userData?.name || 'anonymous'
        });
      }
    },

    handleShareCancel(platform) {
      console.log(`取消生辰八字结果分享: ${platform}`);
      
      // 统计取消事件
      if (window.gtag) {
        window.gtag('event', 'share_cancel', {
          'content_type': 'bazi_results',
          'platform': platform
        });
      }
    },

    handleShareError(error) {
      console.error('生辰八字结果分享失败:', error);

      // 可以显示用户友好的错误消息
      if (this.$toast) {
        this.$toast.error(this.$t('share.error') || '分享失败，请稍后重试');
      } else {
        alert(this.$t('share.error') || '分享失败，请稍后重试');
      }
    },

    showShareTip(message) {
      // 显示分享提示信息
      if (this.$toast) {
        this.$toast.info(message);
      } else {
        alert(message);
      }
    },
    
    
    saveResults() {
      const data = {
        userData: this.userData,
        results: this.calculationResults,
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bazi-results-${this.userData.name}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    
    goBack() {
      this.$router.push({ name: 'home' });
    }
  },
  created() {
    // 对于分享页面，数据可能在路由守卫中异步恢复，给一些时间等待
    if (this.$route.meta.requiresSharedData) {
      // 分享页面数据由路由守卫处理，不需要在这里检查
      return;
    }
    
    if (!this.userData || !this.calculationResults) {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.bazi-results-container {
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
  margin-bottom: 25px;
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

/* 五行分析 */
.element-analysis {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.element-analysis h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.element-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.element-name {
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1rem;
}

.element-count {
  width: 30px;
  text-align: center;
  font-weight: 600;
}

.element-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.element-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
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
  padding: 20px;
  border-radius: 10px;
}

.fortune-label {
  font-size: 1rem;
  margin-bottom: 8px;
  color: #34495e;
  font-weight: 600;
}

.fortune-stars {
  color: #f39c12;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.fortune-description {
  font-size: 0.9rem;
  color: #7f8c8d;
  text-align: center;
  line-height: 1.4;
}

/* 八字分析 */
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.analysis-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #3498db;
}

.analysis-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.day-master {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.master-stem {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3498db;
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
}

.master-element {
  background: #e8f4fd;
  color: #3498db;
  padding: 5px 15px;
  border-radius: 15px;
  font-weight: 600;
}

.useful-god,
.pattern {
  text-align: center;
  margin-bottom: 15px;
}

.god-element {
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  background: #27ae60;
  color: white;
}

.pattern-name {
  background: #e74c3c;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
}

.analysis-text {
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0;
}

/* 流年运势 */
.yearly-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.current-year,
.future-years {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
}

.current-year h3,
.future-years h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.year-elements {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
}

.year-stem,
.year-branch {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: 700;
}

.year-stem {
  background: #ffeaa7;
  color: #d35400;
}

.year-branch {
  background: #81ecec;
  color: #00638d;
}

.year-fortune {
  color: #34495e;
  text-align: center;
  line-height: 1.6;
}

.trend-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.trend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
}

.trend-year {
  font-weight: 600;
  color: #2c3e50;
}

.trend-info {
  color: #7f8c8d;
}

.trend-rating {
  color: #f39c12;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

/* 统一按钮样式系统 */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn--primary {
  background: #d35400;
  color: white;
}

.btn--primary:hover {
  background: #e67e22;
  transform: translateY(-1px);
}

.btn--secondary {
  background: #6c757d;
  color: white;
}

.btn--secondary:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

.btn--outline {
  background: none;
  color: #6c757d;
  border: 1px solid #6c757d;
}

.btn--outline:hover {
  background: #6c757d;
  color: white;
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
  .bazi-results-container {
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
  
  .analysis-grid {
    grid-template-columns: 1fr;
  }
  
  .yearly-grid {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>