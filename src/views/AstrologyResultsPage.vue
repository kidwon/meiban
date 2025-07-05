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
            <div class="position-description">
              {{ getAscendantDescription() }}
            </div>
          </div>
          <div class="position-item sun">
            <div class="position-label">太陽</div>
            <div class="position-value">
              <span class="sign">{{ calculationResults.astrologyPositions.sun.sign }}</span>
              <span class="degree">{{ calculationResults.astrologyPositions.sun.degree }}°{{ calculationResults.astrologyPositions.sun.minute }}'</span>
            </div>
            <div class="position-description">
              {{ getSunDescription() }}
            </div>
          </div>
          <div class="position-item moon">
            <div class="position-label">月亮</div>
            <div class="position-value">
              <span class="sign">{{ calculationResults.astrologyPositions.moon.sign }}</span>
              <span class="degree">{{ calculationResults.astrologyPositions.moon.degree }}°{{ calculationResults.astrologyPositions.moon.minute }}'</span>
            </div>
            <div class="position-description">
              {{ getMoonDescription() }}
            </div>
          </div>
        </div>
      </section>

      <!-- 星盘图组件 -->
      <section class="result-section star-chart">
        <h2 class="section-title">星盤圖</h2>
        <div class="chart-container">
          <StarChart 
            :calculationResults="calculationResults"
            :size="chartSize"
          />
        </div>
      </section>

      <!-- 占星分析 -->
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
          <div v-if="activeTab === 'personality'" class="analysis-content">
            <h3>性格特質分析</h3>
            <div class="personality-grid">
              <div class="trait-card">
                <h4>太陽星座特質</h4>
                <p>{{ getSunTraits() }}</p>
              </div>
              <div class="trait-card">
                <h4>月亮星座情感</h4>
                <p>{{ getMoonTraits() }}</p>
              </div>
              <div class="trait-card">
                <h4>上升星座印象</h4>
                <p>{{ getAscendantTraits() }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'career'" class="analysis-content">
            <h3>事業發展分析</h3>
            <div class="career-analysis">
              <div class="career-section">
                <h4>適合的職業領域</h4>
                <div class="career-tags">
                  <span v-for="career in getSuitableCareers()" :key="career" class="career-tag">
                    {{ career }}
                  </span>
                </div>
              </div>
              <div class="career-section">
                <h4>工作風格</h4>
                <p>{{ getWorkStyle() }}</p>
              </div>
              <div class="career-section">
                <h4>領導能力</h4>
                <p>{{ getLeadershipStyle() }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'relationships'" class="analysis-content">
            <h3>人際關係分析</h3>
            <div class="relationship-analysis">
              <div class="relationship-section">
                <h4>愛情模式</h4>
                <p>{{ getLovePattern() }}</p>
              </div>
              <div class="relationship-section">
                <h4>友誼特質</h4>
                <p>{{ getFriendshipStyle() }}</p>
              </div>
              <div class="relationship-section">
                <h4>相容星座</h4>
                <div class="compatibility-tags">
                  <span v-for="sign in getCompatibleSigns()" :key="sign" class="compatibility-tag">
                    {{ sign }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'fortune'" class="analysis-content">
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
          
          <div class="feature-card chart" @click="focusOnChart">
            <div class="feature-icon">⭐</div>
            <div class="feature-content">
              <h3>互動星盤</h3>
              <p>詳細探索您的星盤配置</p>
              <div class="feature-details">
                <span>• 宮位詳細解讀</span>
                <span>• 相位連線分析</span>
                <span>• 星座分布統計</span>
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
      
      analysisTabs: [
        { id: 'personality', name: '性格分析' },
        { id: 'career', name: '事業運' },
        { id: 'relationships', name: '人際關係' },
        { id: 'fortune', name: '運勢' }
      ],
      
      // 星座描述数据
      signDescriptions: {
        // 太阳星座描述
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
        // 月亮星座描述
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
        // 上升星座描述
        ascendant: {
          '白羊座': '給人積極主動的第一印象，展現出領導者的氣質。',
          '金牛座': '給人穩重可靠的印象，展現出優雅的品味。',
          '双子座': '給人聰明機智的印象，展現出良好的溝通能力。',
          '巨蟹座': '給人溫暖親切的印象，展現出關懷他人的特質。',
          '狮子座': '給人自信大方的印象，展現出王者風範。',
          '处女座': '給人謹慎細心的印象，展現出專業能力。',
          '天秤座': '給人優雅和諧的印象，展現出外交手腕。',
          '天蝎座': '給人神秘深刻的印象，展現出強大的氣場。',
          '射手座': '給人樂觀開朗的印象，展現出冒險精神。',
          '摩羯座': '給人成熟穩重的印象，展現出責任感。',
          '水瓶座': '給人獨特創新的印象，展現出前衛思維。',
          '双鱼座': '給人溫柔夢幻的印象，展現出藝術氣質。'
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
    }
  },
  methods: {
    getAscendantDescription() {
      if (!this.calculationResults) return '';
      const sign = this.calculationResults.astrologyPositions.ascendant.sign;
      return this.signDescriptions.ascendant[sign] || '上升星座影響您給他人的第一印象。';
    },
    
    getSunDescription() {
      if (!this.calculationResults) return '';
      const sign = this.calculationResults.astrologyPositions.sun.sign;
      return this.signDescriptions.sun[sign] || '太陽星座代表您的核心性格特質。';
    },
    
    getMoonDescription() {
      if (!this.calculationResults) return '';
      const sign = this.calculationResults.astrologyPositions.moon.sign;
      return this.signDescriptions.moon[sign] || '月亮星座反映您的情感需求和內在世界。';
    },
    
    getSunTraits() {
      return this.getSunDescription();
    },
    
    getMoonTraits() {
      return this.getMoonDescription();
    },
    
    getAscendantTraits() {
      return this.getAscendantDescription();
    },
    
    getSuitableCareers() {
      if (!this.calculationResults) return [];
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      
      const careerMap = {
        '白羊座': ['企業管理', '軍事', '運動', '創業', '銷售'],
        '金牛座': ['金融', '藝術', '美食', '建築', '園藝'],
        '双子座': ['媒體', '教育', '翻譯', '寫作', '科技'],
        '巨蟹座': ['醫療', '教育', '房地產', '餐飲', '心理諮商'],
        '狮子座': ['娛樂', '表演', '政治', '管理', '創意產業'],
        '处女座': ['醫療', '會計', '編輯', '研究', '服務業'],
        '天秤座': ['法律', '外交', '設計', '諮商', '公關'],
        '天蝎座': ['心理學', '偵探', '醫學', '金融', '研究'],
        '射手座': ['教育', '出版', '旅遊', '哲學', '國際貿易'],
        '摩羯座': ['政府', '管理', '建築', '金融', '傳統產業'],
        '水瓶座': ['科技', '發明', '社會工作', '航空', '未來產業'],
        '双鱼座': ['藝術', '音樂', '攝影', '慈善', '精神服務']
      };
      
      return careerMap[sunSign] || ['多元發展'];
    },
    
    getWorkStyle() {
      if (!this.calculationResults) return '';
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      
      const styleMap = {
        '白羊座': '您喜歡快節奏的工作環境，擅長開創新項目，但需要學習耐心完成細節工作。',
        '金牛座': '您偏好穩定的工作環境，注重品質而非速度，在需要耐心和毅力的工作中表現出色。',
        '双子座': '您適合多變的工作內容，擅長同時處理多項任務，需要智力刺激和社交互動。',
        '巨蟹座': '您重視工作氛圍和團隊關係，在關懷型的工作中表現最佳，需要情感支持。',
        '狮子座': '您喜歡在工作中展現領導能力，需要認可和讚賞，適合需要創意和表現的工作。',
        '处女座': '您注重工作的精確性和效率，擅長分析和改善流程，是完美主義者。',
        '天秤座': '您擅長團隊合作，善於協調不同意見，在和諧的工作環境中表現最佳。',
        '天蝎座': '您適合深度專業的工作，具有強烈的專注力，能夠處理複雜和挑戰性的任務。',
        '射手座': '您需要自由和彈性的工作環境，適合涉及學習、旅行或哲學思考的工作。',
        '摩羯座': '您有強烈的事業心和責任感，適合長期規劃的工作，能夠承受壓力達成目標。',
        '水瓶座': '您喜歡創新和前瞻性的工作，適合團隊協作，但也需要獨立思考的空間。',
        '双鱼座': '您適合富有創意和想像力的工作，需要彈性的工作環境，重視工作的意義和價值。'
      };
      
      return styleMap[sunSign] || '您擁有獨特的工作風格。';
    },
    
    getLeadershipStyle() {
      if (!this.calculationResults) return '';
      const sunSign = this.calculationResults.astrologyPositions.sun.sign;
      
      const leadershipMap = {
        '白羊座': '天生的領導者，能夠激勵團隊迎接挑戰，但需要學習聆聽他人意見。',
        '金牛座': '穩重的領導風格，能夠建立穩固的團隊基礎，重視實際成果。',
        '双子座': '善於溝通的領導者，能夠協調不同觀點，適合知識型團隊的領導。',
        '巨蟹座': '關懷型領導者，重視團隊成員的感受，能夠創造溫暖的工作氛圍。',
        '狮子座': '魅力型領導者，能夠激發團隊的熱情和創意，天生具有領袖魅力。',
        '处女座': '細節導向的領導者，注重效率和品質，善於組織和規劃。',
        '天秤座': '協調型領導者，擅長平衡不同利益，創造和諧的團隊環境。',
        '天蝎座': '深度領導者，具有洞察力，能夠處理複雜的團隊動態。',
        '射手座': '願景型領導者，能夠激發團隊的理想和目標，重視成長和學習。',
        '摩羯座': '權威型領導者，注重紀律和結構，能夠帶領團隊達成長期目標。',
        '水瓶座': '創新型領導者，重視團隊的獨立性和創意，適合領導創新項目。',
        '双鱼座': '直覺型領導者，能夠感知團隊的需求，重視團隊的精神層面。'
      };
      
      return leadershipMap[sunSign] || '您有獨特的領導特質。';
    },
    
    getLovePattern() {
      if (!this.calculationResults) return '';
      const moonSign = this.calculationResults.astrologyPositions.moon.sign;
      
      const loveMap = {
        '白羊座': '在愛情中直接熱情，喜歡追求和被追求的刺激，需要保持新鮮感。',
        '金牛座': '重視穩定和安全的愛情關係，表達愛意的方式溫暖實際。',
        '双子座': '在愛情中需要智力交流，喜歡有趣幽默的伴侶，重視溝通。',
        '巨蟹座': '深情專一，重視家庭和親密關係，需要情感安全感。',
        '狮子座': '在愛情中大方浪漫，希望被欣賞和崇拜，喜歡戲劇性的浪漫。',
        '处女座': '在愛情中謹慎細心，重視實際的關懷，需要時間建立信任。',
        '天秤座': '追求平衡和諧的愛情關係，重視伴侶的外在和內在美。',
        '天蝎座': '愛情深刻強烈，具有強烈的占有欲，需要完全的信任和忠誠。',
        '射手座': '在愛情中保持自由，喜歡有冒險精神的伴侶，重視精神契合。',
        '摩羯座': '在愛情中務實穩重，重視長期承諾，傾向於傳統的愛情模式。',
        '水瓶座': '在愛情中保持獨立，重視友誼基礎，需要精神層面的連結。',
        '双鱼座': '愛情夢幻浪漫，具有強烈的同理心，容易為愛犧牲自己。'
      };
      
      return loveMap[moonSign] || '您在愛情中有獨特的表達方式。';
    },
    
    getFriendshipStyle() {
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
    
    focusOnChart() {
      // 滚动到星盘图位置
      const chartElement = document.querySelector('.star-chart');
      if (chartElement) {
        chartElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
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
    // 根据屏幕大小调整星盘图尺寸
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
  max-width: 1000px;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.position-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 25px;
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
  margin-bottom: 15px;
}

.position-value .sign {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 5px;
  font-family: 'Shippori Mincho', serif;
}

.position-value .degree {
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.9;
}

.position-description {
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.9;
}

/* 星盘图样式 */
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
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

/* 性格分析样式 */
.personality-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.trait-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.trait-card h4 {
  color: #34495e;
  margin-bottom: 10px;
}

.trait-card p {
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0;
}

/* 事业分析样式 */
.career-analysis {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.career-section {
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.career-section h4 {
  color: #34495e;
  margin-bottom: 15px;
}

.career-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.career-tag {
  background: #667eea;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
}

/* 人际关系样式 */
.relationship-analysis {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.relationship-section {
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.relationship-section h4 {
  color: #34495e;
  margin-bottom: 15px;
}

.compatibility-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.compatibility-tag {
  background: #ff6b9d;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
}

/* 运势分析样式 */
.fortune-analysis {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.fortune-section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.fortune-section h4 {
  color: #34495e;
  margin-bottom: 15px;
}

.fortune-rating {
  background: #d35400;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.fortune-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.fortune-detail {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.fortune-detail h5 {
  color: #34495e;
  margin-bottom: 8px;
}

.fortune-detail .stars {
  color: #f39c12;
  font-size: 1.1rem;
}

/* 高级功能样式 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.feature-card {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 20px;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-card.transit {
  border-color: #667eea;
}

.feature-card.transit:hover {
  border-color: #5a67d8;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
}

.feature-card.chart {
  border-color: #48bb78;
}

.feature-card.chart:hover {
  border-color: #38a169;
  box-shadow: 0 8px 25px rgba(72, 187, 120, 0.2);
}

.feature-card.compatibility {
  border-color: #ed64a6;
}

.feature-card.compatibility:hover {
  border-color: #d53f8c;
  box-shadow: 0 8px 25px rgba(237, 100, 166, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  min-width: 60px;
  text-align: center;
}

.feature-content {
  flex: 1;
}

.feature-content h3 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.feature-content p {
  color: #7f8c8d;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.feature-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.feature-details span {
  color: #34495e;
  font-size: 0.8rem;
}

.feature-arrow {
  font-size: 1.5rem;
  color: #bdc3c7;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-arrow {
  transform: translateX(5px);
  color: #34495e;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.share-btn,
.save-btn {
  background-color: #667eea;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.share-btn:hover,
.save-btn:hover {
  background-color: #5a67d8;
}

.back-btn {
  background-color: #7f8c8d;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
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
  .astrology-results-container {
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
  }
  
  .position-item {
    padding: 20px;
  }
  
  .personality-grid {
    grid-template-columns: 1fr;
  }
  
  .fortune-details-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .feature-arrow {
    transform: rotate(90deg);
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>