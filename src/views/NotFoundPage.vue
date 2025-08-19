<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-illustration">
        <div class="stars">
          <div class="star" v-for="n in 20" :key="n" :style="getStarStyle(n)">⭐</div>
        </div>
        <div class="main-content">
          <h1 class="error-code">404</h1>
          <div class="crystal-ball">🔮</div>
        </div>
      </div>
      
      <div class="not-found-text">
        <h2 class="title">ページが見つかりません</h2>
        <p class="subtitle">星々の中でページが迷子になってしまいました</p>
        <p class="description">
          お探しのページは移動、削除、または一時的に利用できない可能性があります。<br>
          命盤の星々が正しい道へと導いてくれるでしょう。
        </p>
      </div>
      
      <div class="suggestions">
        <h3>できること</h3>
        <div class="suggestion-cards">
          <div class="suggestion-card" @click="goHome">
            <div class="suggestion-icon">🏠</div>
            <h4>ホームに戻る</h4>
            <p>トップページから新たに始めましょう</p>
          </div>
          
          <div class="suggestion-card" @click="startAnalysis">
            <div class="suggestion-icon">🎯</div>
            <h4>新しい分析を開始</h4>
            <p>生辰八字や占星分析を始めてみませんか</p>
          </div>
          
          <div class="suggestion-card" @click="searchSite">
            <div class="suggestion-icon">🔍</div>
            <h4>サイト内を探索</h4>
            <p>他の機能を探してみましょう</p>
          </div>
        </div>
      </div>
      
      <div class="helpful-links">
        <h3>よく使われる機能</h3>
        <div class="quick-links">
          <router-link to="/" class="quick-link">
            <span class="link-icon">🏮</span>
            <span>生辰八字分析</span>
          </router-link>
          <router-link to="/" class="quick-link">
            <span class="link-icon">⭐</span>
            <span>占星分析</span>
          </router-link>
          <button @click="checkUserData" class="quick-link" v-if="hasUserData">
            <span class="link-icon">🌟</span>
            <span>行運分析</span>
          </button>
        </div>
      </div>
      
      <div class="contact-info">
        <p>それでも問題が解決しない場合は、<a href="#" @click="reportIssue">問題を報告</a>してください。</p>
      </div>
      
      <!-- 隐藏的搜索功能 -->
      <div class="search-section" v-if="showSearch">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="お探しの機能を入力してください..."
            @keyup.enter="performSearch"
          />
          <button @click="performSearch">検索</button>
        </div>
        <div class="search-results" v-if="searchResults.length > 0">
          <h4>検索結果</h4>
          <div class="result-item" v-for="result in searchResults" :key="result.path" @click="navigateTo(result.path)">
            <span class="result-icon">{{ result.icon }}</span>
            <div class="result-info">
              <h5>{{ result.title }}</h5>
              <p>{{ result.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotFoundPage',
  data() {
    return {
      showSearch: false,
      searchQuery: '',
      searchResults: [],
      
      // 可搜索的功能列表
      searchableFeatures: [
        {
          title: '生辰八字分析',
          description: '四柱推命による詳細な運勢分析',
          path: '/',
          icon: '🏮',
          keywords: ['生辰八字', '四柱推命', '八字', '運勢', '分析']
        },
        {
          title: '占星分析',
          description: '西洋占星術による星盤分析',
          path: '/',
          icon: '⭐',
          keywords: ['占星', '星盤', '星座', 'ホロスコープ', '西洋占星術']
        },
        {
          title: '行運分析',
          description: '現在の運勢の詳細な分析',
          path: '/transit-analysis',
          icon: '🌟',
          keywords: ['行運', 'トランジット', '運勢', '未来', '予測']
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      userData: 'getUserData'
    }),
    hasUserData() {
      return this.userData && 
             this.userData.name && 
             this.userData.birthdate && 
             this.userData.birthplace;
    }
  },
  
  mounted() {
    // 记录404错误
    console.warn('404 Page Accessed:', {
      requestedPath: this.$route.fullPath,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    });
    
    // 添加星星动画
    this.addStarAnimation();
  },
  
  methods: {
    getStarStyle() {
      // 随机分布星星
      return {
        position: 'absolute',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        fontSize: (Math.random() * 0.5 + 0.5) + 'rem',
        animationDelay: Math.random() * 3 + 's',
        opacity: Math.random() * 0.7 + 0.3
      };
    },
    
    goHome() {
      this.$router.push('/');
    },
    
    startAnalysis() {
      this.$router.push('/');
      // 滚动到表单区域
      this.$nextTick(() => {
        const formElement = document.querySelector('.form-container');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
    
    searchSite() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        this.$nextTick(() => {
          const searchInput = this.$el.querySelector('input');
          if (searchInput) {
            searchInput.focus();
          }
        });
      }
    },
    
    performSearch() {
      if (!this.searchQuery.trim()) return;
      
      const query = this.searchQuery.toLowerCase();
      this.searchResults = this.searchableFeatures.filter(feature => {
        return feature.title.toLowerCase().includes(query) ||
               feature.description.toLowerCase().includes(query) ||
               feature.keywords.some(keyword => keyword.toLowerCase().includes(query));
      });
    },
    
    navigateTo(path) {
      this.$router.push(path);
    },
    
    checkUserData() {
      if (this.hasUserData) {
        this.$router.push('/transit-analysis');
      } else {
        alert(this.$t('notFound.transitRequiresData'));
        this.goHome();
      }
    },
    
    reportIssue() {
      const issueData = {
        type: '404 Error',
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };
      
      console.log('Issue Report:', issueData);
      
      // 这里可以实现实际的问题报告功能
      alert(this.$t('notFound.issueReported'));
    },
    
    addStarAnimation() {
      const stars = this.$el.querySelectorAll('.star');
      stars.forEach((star) => {
        star.style.animation = `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`;
      });
    }
  }
};
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: white;
  overflow-x: hidden;
}

.not-found-content {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.not-found-illustration {
  position: relative;
  height: 300px;
  margin-bottom: 40px;
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.star {
  position: absolute;
  user-select: none;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.main-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.error-code {
  font-size: 6rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  margin: 0;
}

.crystal-ball {
  font-size: 4rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.not-found-text {
  margin-bottom: 40px;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-family: 'Shippori Mincho', serif;
}

.subtitle {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #a8d8ff;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #e3f2fd;
  max-width: 600px;
  margin: 0 auto;
}

.suggestions {
  margin-bottom: 40px;
}

.suggestions h3 {
  font-size: 1.5rem;
  margin-bottom: 25px;
  color: #fff;
}

.suggestion-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.suggestion-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggestion-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.suggestion-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.suggestion-card h4 {
  color: #fff;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.suggestion-card p {
  color: #e3f2fd;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.helpful-links {
  margin-bottom: 30px;
}

.helpful-links h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #fff;
}

.quick-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.quick-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  color: white;
  text-decoration: none;
}

.link-icon {
  font-size: 1.2rem;
}

.contact-info {
  color: #e3f2fd;
  font-size: 0.9rem;
}

.contact-info a {
  color: #a8d8ff;
  text-decoration: underline;
  cursor: pointer;
}

.contact-info a:hover {
  color: #fff;
}

.search-section {
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-box input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-box input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
}

.search-box button {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-box button:hover {
  background: #2980b9;
}

.search-results h4 {
  color: #fff;
  margin-bottom: 15px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.result-icon {
  font-size: 1.5rem;
}

.result-info {
  flex: 1;
  text-align: left;
}

.result-info h5 {
  color: #fff;
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.result-info p {
  color: #e3f2fd;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 4rem;
  }
  
  .crystal-ball {
    font-size: 3rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .suggestion-cards {
    grid-template-columns: 1fr;
  }
  
  .quick-links {
    flex-direction: column;
    align-items: center;
  }
  
  .search-box {
    flex-direction: column;
  }
  
  .result-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>