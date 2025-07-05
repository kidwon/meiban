<template>
  <div class="astrology-results-container">
    <header class="header">
      <h1 class="title">占星分析結果</h1>
      <p class="user-name">{{ userData ? userData.name : 'ゲスト' }}様の星盤</p>
    </header>

    <div class="results-content" v-if="calculationResults">
      <div class="birth-data-summary">
        <p>{{ formatBirthDate }} {{ formatBirthTime }} / {{ userData.birthplace }}</p>
      </div>

      <!-- 个人星座档案卡片 -->
      <section class="personal-profile-card">
        <h2 class="profile-title">個人星座檔案</h2>
        <div class="core-elements">
          <div class="element-item sun-element" @click="focusPlanet('sun')">
            <div class="element-icon">☉</div>
            <div class="element-content">
              <div class="element-label">太陽</div>
              <div class="element-sign">{{ calculationResults.astrologyPositions.sun.sign }}</div>
            </div>
          </div>
          <div class="element-item moon-element" @click="focusPlanet('moon')">
            <div class="element-icon">☽</div>
            <div class="element-content">
              <div class="element-label">月亮</div>
              <div class="element-sign">{{ calculationResults.astrologyPositions.moon.sign }}</div>
            </div>
          </div>
          <div class="element-item ascendant-element" @click="focusPlanet('ascendant')">
            <div class="element-icon">↗</div>
            <div class="element-content">
              <div class="element-label">上升</div>
              <div class="element-sign">{{ calculationResults.astrologyPositions.ascendant.sign }}</div>
            </div>
          </div>
        </div>
        <p class="profile-hint">點擊星盤中的行星查看詳細位置信息</p>
      </section>

      <!-- 交互式星盘图 -->
      <section class="result-section star-chart">
        <h2 class="section-title">互動星盤圖</h2>
        <div class="chart-container">
          <StarChart 
            :calculationResults="calculationResults"
            :size="chartSize"
            @planetClick="handlePlanetClick"
            @planetHover="handlePlanetHover"
          />
        </div>
        
        <!-- 行星详情侧边栏 -->
        <div class="planet-details-sidebar" :class="{ 'open': selectedPlanet }">
          <div class="sidebar-header">
            <h3>{{ getPlanetDisplayName(selectedPlanet) }}</h3>
            <button @click="closePlanetDetails" class="close-btn">×</button>
          </div>
          <div class="sidebar-content" v-if="selectedPlanet">
            <div class="planet-position">
              <div class="position-info">
                <span class="sign-name">{{ getPlanetSign(selectedPlanet) }}</span>
                <span class="degree-info">{{ getPlanetDegree(selectedPlanet) }}</span>
              </div>
            </div>
            <div class="planet-description">
              <p>{{ getPlanetDescription(selectedPlanet) }}</p>
            </div>
            <div class="planet-keywords">
              <h4>關鍵詞</h4>
              <div class="keywords-list">
                <span 
                  v-for="keyword in getPlanetKeywords(selectedPlanet)" 
                  :key="keyword"
                  class="keyword-tag"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 占星分析标签页 -->
      <section class="result-section astrology-analysis">
        <h2 class="section-title">詳細占星分析</h2>
        <div class="analysis-tabs">
          <button 
            v-for="tab in analysisTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="{ active: activeTab === tab.id }"
            class="tab-button"
          >
            {{ tab.name }}
          </button>
        </div>
        
        <div class="tab-content">
          <div v-show="activeTab === 'personality'" class="analysis-content">
            <h3>性格特質分析</h3>
            <div class="personality-analysis">
              <div class="trait-section">
                <h4>核心性格 (太陽星座)</h4>
                <p>{{ getSunDescription() }}</p>
              </div>
              <div class="trait-section">
                <h4>情感需求 (月亮星座)</h4>
                <p>{{ getMoonDescription() }}</p>
              </div>
              <div class="trait-section">
                <h4>外在印象 (上升星座)</h4>
                <p>{{ getAscendantDescription() }}</p>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 'career'" class="analysis-content">
            <h3>事業發展傾向</h3>
            <div class="career-analysis">
              <div class="career-section">
                <h4>事業優勢</h4>
                <p>{{ getCareerStrengths() }}</p>
              </div>
              <div class="career-section">
                <h4>適合職業方向</h4>
                <div class="career-suggestions">
                  <span 
                    v-for="career in getSuggestedCareers()" 
                    :key="career"
                    class="career-tag"
                  >
                    {{ career }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 'relationships'" class="analysis-content">
            <h3>人際關係分析</h3>
            <div class="relationships-analysis">
              <div class="relationship-section">
                <h4>愛情表現</h4>
                <p>{{ getLoveDescription() }}</p>
              </div>
              <div class="relationship-section">
                <h4>友誼特質</h4>
                <p>{{ getFriendshipDescription() }}</p>
              </div>
              <div class="relationship-section">
                <h4>相容星座</h4>
                <div class="compatible-signs">
                  <span 
                    v-for="sign in getCompatibleSigns()" 
                    :key="sign"
                    class="sign-tag"
                  >
                    {{ sign }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 'fortune'" class="analysis-content">
            <h3>運勢傾向分析</h3>
            <div class="fortune-analysis">
              <div class="fortune-section">
                <h4>整體運勢</h4>
                <div class="fortune-rating">{{ calculationResults.fortune.overview }}</div>
                <p>{{ getOverallFortuneDescription() }}</p>
              </div>
              <div class="fortune-details-grid">
                <div class="fortune-detail">
                  <h5>事業運</h5>
                  <div class="stars">{{ calculationResults.fortune.career }}</div>
                </div>
                <div class="fortune-detail">
                  <h5>財運</h5>
                  <div class="stars">{{ calculationResults.fortune.wealth }}</div>
                </div>
                <div class="fortune-detail">
                  <h5>愛情運</h5>
                  <div class="stars">{{ calculationResults.fortune.love }}</div>
                </div>
                <div class="fortune-detail">
                  <h5>健康運</h5>
                  <div class="stars">{{ calculationResults.fortune.health }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 高级功能入口 -->
      <section class="result-section advanced-features">
        <h2 class="section-title">詳細分析</h2>
        <div class="features-grid">
          <div class="feature-card transit" @click="goToTransitAnalysis">
            <div class="feature-icon">🌟</div>
            <div class="feature-content">
              <h3>行運盤分析</h3>
              <p>分析當前行星位置對您的影響</p>
              <div class="feature-details">
                <span>• 外行星影響分析</span>
                <span>• 重要相位解讀</span>
                <span>• 未來運勢預測</span>
              </div>
            </div>
            <div class="feature-arrow">→</div>
          </div>
          
          <div class="feature-card compatibility" @click="openCompatibilityTool">
            <div class="feature-icon">💕</div>
            <div class="feature-content">
              <h3>合盤分析</h3>
              <p>分析與他人的星盤相容性</p>
              <div class="feature-details">
                <span>• 愛情合盤</span>
                <span>• 友誼相性</span>
                <span>• 事業夥伴</span>
              </div>
            </div>
            <div class="feature-arrow">→</div>
          </div>
        </div>
      </section>

      <div class="actions">
        <button @click="shareResults" class="share-btn">結果をシェア</button>
        <button @click="saveResults" class="save-btn">結果を保存</button>
        <button @click="goBack" class="back-btn">トップに戻る</button>
      </div>
    </div>

    <div class="loading" v-else>
      <p>星盤を計算中...</p>
    </div>

    <footer class="footer">
      <p>© 2025 命盤 - 占星分析・星盤圖</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StarChart from '../components/StarChart/StarChart.vue';

export default {
  name: 'AstrologyResultsPage',
  components: {
    StarChart
  },
  data() {
    return {
      activeTab: 'personality',
      chartSize: 500,
      selectedPlanet: null,
      
      analysisTabs: [
        { id: 'personality', name: '性格分析' },
        { id: 'career', name: '事業運' },
        { id: 'relationships', name: '人際關係' },
        { id: 'fortune', name: '運勢' }
      ],
      
      // 星座描述数据
      signDescriptions: {
        sun: {
          '白羊座': '您具有開拓精神和領導能力，喜歡迎接挑戰，行動力強。',
          '金牛座': '您穩重實際，重視安全感，具有持久的毅力和藝術品味。',
          '双子座': '您聰明好奇，善於溝通，喜歡學習新事物，適應能力強。',
          '巨蟹座': '您情感豐富，重視家庭，具有強烈的保護欲和直觉力。',
          '狮子座': '您自信大方，具有表演天賦，喜歡成為注意的焦點。',
          '处女座': '您注重細節，追求完美，具有強烈的服務精神。',
          '天秤座': '您追求和諧平衡，具有藝術氣質，善於外交。',
          '天蝎座': '您深刻敏銳，具有洞察力，意志力堅強。',
          '射手座': '您樂觀開朗，喜歡自由，具有哲學思維。',
          '摩羯座': '您踏實務實，有強烈的責任感和成就欲。',
          '水瓶座': '您獨立創新，思維前衛，關心人道主義。',
          '双鱼座': '您富有想像力，敏感直覺，具有藝術天賦。'
        },
        moon: {
          '白羊座': '情感直接衝動，需要即時的情感回應，喜歡刺激的情感體驗。',
          '金牛座': '情感穩定持久，需要安全感，喜歡溫暖舒適的環境。',
          '双子座': '情感變化多樣，需要智力刺激，喜歡與人交流分享。',
          '巨蟹座': '情感深刻敏感，需要歸屬感，重視家庭親情。',
          '狮子座': '情感熱烈大方，需要被欣賞，喜歡成為焦點。',
          '处女座': '情感細膩理性，需要秩序感，喜歡照顧他人。',
          '天秤座': '情感追求和諧，需要伴侶關係，避免衝突。',
          '天蝎座': '情感深邃強烈，需要深度連結，具有強烈的占有欲。',
          '射手座': '情感自由樂觀，需要空間自由，喜歡探索新體驗。',
          '摩羯座': '情感內斂實際，需要穩定結構，重視傳統價值。',
          '水瓶座': '情感獨立理性，需要友誼支持，關心集體利益。',
          '双鱼座': '情感敏感夢幻，需要精神共鳴，具有同理心。'
        },
        ascendant: {
          '白羊座': '給人積極主動的第一印象，展現出領導者的氣質。',
          '金牛座': '給人穩重可靠的印象，展現出優雅的品味。',
          '双子座': '給人聰明機智的印象，展現出良好的溝通能力。',
          '巨蟹座': '給人溫暖親切的印象，展現出關懷他人的特質。',
          '狮子座': '給人自信大方的印象，展現出王者風範。',
          '处女座': '給人細心周到的印象，展現出專業能力。',
          '天秤座': '給人優雅和諧的印象，展現出良好的社交技巧。',
          '天蝎座': '給人神秘深邃的印象，展現出強烈的個人魅力。',
          '射手座': '給人樂觀自由的印象，展現出冒險精神。',
          '摩羯座': '給人成熟穩重的印象，展現出責任感。',
          '水瓶座': '給人獨特創新的印象，展現出前衛思維。',
          '双鱼座': '給人溫柔夢幻的印象，展現出藝術氣質。'
        }
      },

      planetKeywords: {
        sun: ['自我', '意志', '創造力', '領導力', '自信'],
        moon: ['情感', '直覺', '需求', '習慣', '記憶'],
        ascendant: ['外表', '第一印象', '面具', '起點', '生命主題']
      }
    };
  },
  
  computed: {
    ...mapGetters(['getUserData', 'getCalculationResults']),
    
    userData() {
      return this.getUserData;
    },
    
    calculationResults() {
      return this.getCalculationResults;
    },
    
    formatBirthDate() {
      if (!this.userData || !this.userData.birthDate) return '';
      const date = new Date(this.userData.birthDate);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    },
    
    formatBirthTime() {
      if (!this.userData || !this.userData.birthTime) return '';
      return `${this.userData.birthTime}`;
    }
  },
  
  methods: {
    // 行星交互处理
    handlePlanetClick(planetType) {
      this.selectedPlanet = planetType;
    },
    
    handlePlanetHover() {
      // 可以添加悬停效果
    },
    
    focusPlanet(planetType) {
      this.selectedPlanet = planetType;
      // 滚动到星盘图位置
      const chartElement = document.querySelector('.star-chart');
      if (chartElement) {
        chartElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    
    closePlanetDetails() {
      this.selectedPlanet = null;
    },
    
    getPlanetDisplayName(planetType) {
      const nameMap = {
        sun: '太陽',
        moon: '月亮',
        ascendant: '上升星座'
      };
      return nameMap[planetType] || '';
    },
    
    getPlanetSign(planetType) {
      if (!this.calculationResults || !planetType) return '';
      return this.calculationResults.astrologyPositions[planetType]?.sign || '';
    },
    
    getPlanetDegree(planetType) {
      if (!this.calculationResults || !planetType) return '';
      const position = this.calculationResults.astrologyPositions[planetType];
      if (!position) return '';
      return `${position.degree}°${position.minute}'`;
    },
    
    getPlanetDescription(planetType) {
      if (!planetType) return '';
      const sign = this.getPlanetSign(planetType);
      return this.signDescriptions[planetType]?.[sign] || '';
    },
    
    getPlanetKeywords(planetType) {
      return this.planetKeywords[planetType] || [];
    },
    
    // 原有方法保持不变
    getSunDescription() {
      if (!this.calculationResults) return '';
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      return this.signDescriptions.sun[sunSign] || '';
    },
    
    getMoonDescription() {
      if (!this.calculationResults) return '';
      const moonSign = this.calculationResults.astrologyPositions.moon.sign;
      return this.signDescriptions.moon[moonSign] || '';
    },
    
    getAscendantDescription() {
      if (!this.calculationResults) return '';
      const ascSign = this.calculationResults.astrologyPositions.ascendant.sign;
      return this.signDescriptions.ascendant[ascSign] || '';
    },
    
    getCareerStrengths() {
      if (!this.calculationResults) return '';
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      
      const careerMap = {
        '白羊座': '您具有天生的領導才能和開拓精神，適合在需要創新和決策的環境中發揮。',
        '金牛座': '您擅長務實的工作，在需要穩定性和持續努力的領域表現優秀。',
        '双子座': '您具有優秀的溝通能力和學習適應性，適合多元化的工作環境。',
        '巨蟹座': '您具有強烈的責任心和照顧他人的能力，在服務性行業表現突出。',
        '狮子座': '您具有天生的表演天賦和領袖魅力，適合需要展現個人魅力的工作。',
        '处女座': '您注重細節和品質，在需要精確性和專業技能的領域表現優異。',
        '天秤座': '您具有優秀的協調能力和美感，適合需要平衡和美學的工作。',
        '天蝎座': '您具有深度洞察力和研究能力，適合需要深入分析的專業領域。',
        '射手座': '您具有國際視野和哲學思維，適合教育、出版或國際事務。',
        '摩羯座': '您具有強烈的目標導向和管理能力，適合企業管理和長期規劃。',
        '水瓶座': '您具有創新思維和人道主義精神，適合科技和社會改革領域。',
        '双鱼座': '您具有豐富的想像力和同理心，適合藝術創作和心理輔導。'
      };
      
      return careerMap[sunSign] || '您具有獨特的職業優勢。';
    },
    
    getSuggestedCareers() {
      if (!this.calculationResults) return [];
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      
      const careerMap = {
        '白羊座': ['創業家', '銷售經理', '運動教練', '軍事指揮官'],
        '金牛座': ['銀行家', '建築師', '廚師', '園藝師'],
        '双子座': ['記者', '教師', '翻譯', '市場營銷'],
        '巨蟹座': ['護士', '心理諮詢師', '房地產', '餐飲業'],
        '狮子座': ['演員', '政治家', '時尚設計師', '娛樂業'],
        '处女座': ['會計師', '醫生', '編輯', '質量管理'],
        '天秤座': ['律師', '外交官', '設計師', '人力資源'],
        '天蝎座': ['研究員', '偵探', '心理學家', '外科醫生'],
        '射手座': ['教授', '旅遊業', '出版社', '國際貿易'],
        '摩羯座': ['CEO', '政府官員', '工程師', '項目經理'],
        '水瓶座': ['科學家', 'IT工程師', '社會工作者', '發明家'],
        '双鱼座': ['藝術家', '音樂家', '治療師', '慈善工作']
      };
      
      return careerMap[sunSign] || ['待發掘'];
    },
    
    getLoveDescription() {
      if (!this.calculationResults) return '';
      const moonSign = this.calculationResults.astrologyPositions.moon.sign;
      
      const loveMap = {
        '白羊座': '在愛情中您熱情主動，喜歡直接表達感情，需要伴侶能跟上您的節奏。',
        '金牛座': '在愛情中您忠誠穩定，重視身體接觸和物質安全感，喜歡長久的關係。',
        '双子座': '在愛情中您需要智力刺激，喜歡與伴侶分享想法，重視溝通交流。',
        '巨蟹座': '在愛情中您深情溫柔，重視情感安全感，喜歡照顧和被照顧。',
        '狮子座': '在愛情中您慷慨熱烈，需要被欣賞和讚美，喜歡浪漫的表達方式。',
        '处女座': '在愛情中您細心體貼，重視實際的關愛表現，喜歡為伴侶服務。',
        '天秤座': '在愛情中您追求和諧平衡，重視美感和浪漫，善於妥協和配合。',
        '天蝎座': '在愛情中您深刻專一，需要深度的情感連結，占有欲較強。',
        '射手座': '在愛情中您需要自由空間，喜歡與伴侶一起探索世界，重視精神契合。',
        '摩羯座': '在愛情中您認真負責，重視長期承諾，喜歡穩定發展的關係。',
        '水瓶座': '在愛情中您獨立理性，重視友誼基礎，需要理解和尊重。',
        '双鱼座': '在愛情中您浪漫夢幻，具有強烈的同情心，容易犧牲自己。'
      };
      
      return loveMap[moonSign] || '您在愛情中有獨特的表達方式。';
    },
    
    getFriendshipDescription() {
      if (!this.calculationResults) return '';
      const ascSign = this.calculationResults.astrologyPositions.ascendant.sign;
      
      const friendshipMap = {
        '白羊座': '在友誼中積極主動，喜歡帶領朋友探索新事物，是值得信賴的夥伴。',
        '金牛座': '在友誼中忠誠可靠，重視長久的友誼關係，是很好的傾聽者。',
        '双子座': '在友誼中善於交際，朋友圈廣泛，喜歡與朋友分享新知。',
        '巨蟹座': '在友誼中關懷體貼，重視深度的情感連結，是很好的支持者。',
        '狮子座': '在友誼中慷慨大方，喜歡成為朋友圈的中心人物，重視忠誠。',
        '处女座': '在友誼中細心周到，願意幫助朋友解決實際問題，值得依賴。',
        '天秤座': '在友誼中追求和諧，善於調解朋友間的矛盾，重視公平。',
        '天蝎座': '在友誼中深刻真誠，雖然朋友不多但關係深厚，非常忠誠。',
        '射手座': '在友誼中樂觀開朗，喜歡與朋友分享冒險經歷，重視自由。',
        '摩羯座': '在友誼中可靠穩重，雖然交友謹慎但關係長久，重視品質。',
        '水瓶座': '在友誼中獨特有趣，重視友誼勝過愛情，關心朋友的個人發展。',
        '双鱼座': '在友誼中溫柔體貼，具有強烈的同情心，是很好的情感支持。'
      };
      
      return friendshipMap[ascSign] || '您在友誼中展現獨特的魅力。';
    },
    
    getCompatibleSigns() {
      if (!this.calculationResults) return [];
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      
      const compatibilityMap = {
        '白羊座': ['狮子座', '射手座', '双子座', '水瓶座'],
        '金牛座': ['处女座', '摩羯座', '巨蟹座', '双鱼座'],
        '双子座': ['天秤座', '水瓶座', '白羊座', '狮子座'],
        '巨蟹座': ['天蝎座', '双鱼座', '金牛座', '处女座'],
        '狮子座': ['白羊座', '射手座', '双子座', '天秤座'],
        '处女座': ['金牛座', '摩羯座', '巨蟹座', '天蝎座'],
        '天秤座': ['双子座', '水瓶座', '狮子座', '射手座'],
        '天蝎座': ['巨蟹座', '双鱼座', '处女座', '摩羯座'],
        '射手座': ['白羊座', '狮子座', '天秤座', '水瓶座'],
        '摩羯座': ['金牛座', '处女座', '天蝎座', '双鱼座'],
        '水瓶座': ['双子座', '天秤座', '白羊座', '射手座'],
        '双鱼座': ['巨蟹座', '天蝎座', '金牛座', '摩羯座']
      };
      
      return compatibilityMap[sunSign] || ['待發現'];
    },
    
    getOverallFortuneDescription() {
      if (!this.calculationResults) return '';
      const overview = this.calculationResults.fortune.overview;
      
      const descriptions = {
        '大吉': '您的整體運勢非常強勁，各方面都有良好的發展機會。這是實現目標的絕佳時機。',
        '吉': '您的運勢穩定向上，雖然可能會有一些小挑戰，但整體趨勢是積極的。',
        '中': '您的運勢平穩，適合穩紮穩打，不要急於求成，重點是保持現有的優勢。',
        '凶': '您的運勢面臨一些挑戰，需要謹慎行事，但這也是成長和學習的機會。'
      };
      
      return descriptions[overview] || '您的運勢有其獨特的發展軌跡。';
    },
    
    async goToTransitAnalysis() {
      if (!this.calculationResults) {
        alert('請先完成占星分析');
        return;
      }
      
      try {
        await this.$router.push({ name: 'transit-analysis' });
      } catch (error) {
        console.error('頁面跳轉失敗:', error);
        alert('頁面跳轉失敗，請稍後重試');
      }
    },
    
    openCompatibilityTool() {
      alert('合盤分析功能即將推出，敬請期待！');
    },
    
    shareResults() {
      if (navigator.share) {
        navigator.share({
          title: '占星分析結果',
          text: `${this.userData.name}的占星分析結果`,
          url: window.location.href
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('URLをクリップボードにコピーしました'))
          .catch(() => alert('手動でURLをコピーしてください'));
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
      a.download = `astrology-results-${this.userData.name}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    
    goBack() {
      this.$router.push({ name: 'home' });
    },
    
    updateChartSize() {
      const container = this.$el?.querySelector('.chart-container');
      if (container) {
        const containerWidth = container.clientWidth;
        this.chartSize = Math.min(containerWidth - 40, 600);
      }
    }
  },
  
  created() {
    if (!this.userData || !this.calculationResults) {
      this.$router.push({ name: 'home' });
    }
  },
  
  mounted() {
    this.updateChartSize();
    window.addEventListener('resize', this.updateChartSize);
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.updateChartSize);
  }
};
</script>

<style scoped>
.astrology-results-container {
  max-width: 1200px;
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
  color: #667eea;
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

/* 个人星座档案卡片 */
.personal-profile-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  color: white;
  text-align: center;
}

.profile-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 25px;
  font-family: 'Shippori Mincho', serif;
}

.core-elements {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.element-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  min-width: 120px;
}

.element-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

.element-icon {
  font-size: 2rem;
  margin-bottom: 5px;
}

.element-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.element-sign {
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Shippori Mincho', serif;
}

.profile-hint {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}

/* 星盘图区域 */
.result-section {
  margin-bottom: 30px;
  position: relative;
}

.section-title {
  font-size: 1.3rem;
  color: #34495e;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

/* 行星详情侧边栏 */
.planet-details-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 380px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
}

.planet-details-sidebar.open {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background: #667eea;
  color: white;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-content {
  padding: 20px;
}

.planet-position {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.position-info .sign-name {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 8px;
  font-family: 'Shippori Mincho', serif;
}

.position-info .degree-info {
  font-size: 1.1rem;
  color: #6c757d;
  font-weight: 500;
}

.planet-description {
  margin-bottom: 20px;
}

.planet-description p {
  line-height: 1.6;
  color: #495057;
}

.planet-keywords h4 {
  color: #495057;
  margin-bottom: 15px;
  font-size: 1rem;
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keyword-tag {
  background: #667eea;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* 分析标签页样式 */
.analysis-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
  overflow-x: auto;
}

.tab-button {
  background: none;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  color: #6c757d;
  font-weight: 500;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #667eea;
}

.tab-button.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.tab-content {
  min-height: 300px;
}

.analysis-content {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
}

.analysis-content h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.analysis-content h4 {
  color: #495057;
  margin-bottom: 15px;
  margin-top: 25px;
}

.analysis-content h4:first-child {
  margin-top: 0;
}

/* 性格分析、事业分析等样式 */
.trait-section, .career-section, .relationship-section, .fortune-section {
  margin-bottom: 25px;
}

.career-suggestions, .compatible-signs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.career-tag, .sign-tag {
  background: #28a745;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.sign-tag {
  background: #667eea;
}

/* 运势分析样式 */
.fortune-rating {
  display: inline-block;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 15px;
}

.fortune-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.fortune-detail {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.fortune-detail h5 {
  margin: 0 0 10px 0;
  color: #495057;
}

.fortune-detail .stars {
  color: #ffc107;
  font-weight: 600;
}

/* 高级功能区域 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.feature-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  gap: 20px;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-card.transit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.feature-card.compatibility {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: white;
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature-content {
  flex-grow: 1;
}

.feature-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.feature-content p {
  margin: 0 0 15px 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.feature-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.feature-details span {
  font-size: 0.8rem;
  opacity: 0.8;
}

.feature-arrow {
  font-size: 1.5rem;
  font-weight: bold;
}

/* 操作按钮 */
.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 30px 0;
  flex-wrap: wrap;
}

.actions button {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.share-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.save-btn {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.back-btn {
  background: #6c757d;
  color: white;
}

.actions button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.footer {
  text-align: center;
  margin-top: 30px;
  padding: 20px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  padding: 50px;
  color: #7f8c8d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .astrology-results-container {
    padding: 15px;
  }
  
  .title {
    font-size: 1.6rem;
  }
  
  .core-elements {
    gap: 15px;
  }
  
  .element-item {
    min-width: 100px;
    padding: 12px;
  }
  
  .planet-details-sidebar {
    width: 100%;
    right: -100%;
  }
  
  .chart-container {
    min-height: 400px;
    padding: 15px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: 20px;
  }
  
  .analysis-content {
    padding: 20px;
  }
  
  .fortune-details-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .core-elements {
    flex-direction: column;
    align-items: center;
  }
  
  .element-item {
    width: 100%;
    max-width: 200px;
  }
  
  .fortune-details-grid {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .actions button {
    width: 100%;
    max-width: 250px;
  }
}
</style>