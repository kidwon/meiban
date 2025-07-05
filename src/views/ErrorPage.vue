<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">⚠️</div>
      <h1 class="error-title">エラーが発生しました</h1>
      <div class="error-details">
        <h2>{{ errorType }}</h2>
        <p class="error-message">{{ errorMessage }}</p>
      </div>
      
      <div class="error-suggestions">
        <h3>解決方法</h3>
        <ul>
          <li>ページを再読み込みしてください</li>
          <li>入力データを確認してください</li>
          <li>しばらく時間をおいてから再度お試しください</li>
          <li>問題が続く場合は、サポートにお問い合わせください</li>
        </ul>
      </div>
      
      <div class="error-actions">
        <button @click="goHome" class="primary-btn">ホームに戻る</button>
        <button @click="reload" class="secondary-btn">ページを再読み込み</button>
        <button @click="goBack" class="secondary-btn">前のページに戻る</button>
      </div>
      
      <div class="error-info" v-if="showDebugInfo">
        <h4>デバッグ情報</h4>
        <div class="debug-details">
          <p><strong>Error Type:</strong> {{ error }}</p>
          <p><strong>Message:</strong> {{ message }}</p>
          <p><strong>Route:</strong> {{ $route.fullPath }}</p>
          <p><strong>Time:</strong> {{ new Date().toLocaleString() }}</p>
          <p><strong>User Agent:</strong> {{ navigator.userAgent }}</p>
        </div>
      </div>
      
      <button @click="toggleDebugInfo" class="debug-toggle">
        {{ showDebugInfo ? 'デバッグ情報を隠す' : 'デバッグ情報を表示' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: String,
      default: 'UnknownError'
    },
    message: {
      type: String,
      default: 'An unexpected error occurred'
    }
  },
  data() {
    return {
      showDebugInfo: false
    };
  },
  computed: {
    errorType() {
      const errorTypes = {
        'RouterError': 'ルーティングエラー',
        'DataError': 'データエラー',
        'NetworkError': 'ネットワークエラー',
        'ValidationError': '入力検証エラー',
        'CalculationError': '計算エラー',
        'UnknownError': '不明なエラー'
      };
      return errorTypes[this.error] || this.error;
    },
    errorMessage() {
      const messages = {
        'RouterError': 'ページの読み込み中にエラーが発生しました。',
        'DataError': 'データの処理中にエラーが発生しました。',
        'NetworkError': 'ネットワーク接続に問題があります。',
        'ValidationError': '入力されたデータに問題があります。',
        'CalculationError': '計算処理中にエラーが発生しました。',
        'UnknownError': '予期しないエラーが発生しました。'
      };
      return messages[this.error] || this.message;
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'home' });
    },
    reload() {
      window.location.reload();
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.goHome();
      }
    },
    toggleDebugInfo() {
      this.showDebugInfo = !this.showDebugInfo;
    },
    reportError() {
      // 发送错误报告到服务器（如果需要）
      const errorReport = {
        error: this.error,
        message: this.message,
        route: this.$route.fullPath,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };
      
      console.log('Error Report:', errorReport);
      // 这里可以添加实际的错误报告逻辑
    }
  },
  created() {
    // 记录错误信息
    console.error('Error Page Loaded:', {
      error: this.error,
      message: this.message,
      route: this.$route.fullPath
    });
    
    // 自动报告错误
    this.reportError();
  }
};
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.error-content {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.error-title {
  color: #e74c3c;
  font-size: 2rem;
  margin-bottom: 20px;
  font-family: 'Shippori Mincho', serif;
}

.error-details {
  margin-bottom: 30px;
}

.error-details h2 {
  color: #34495e;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.error-message {
  color: #7f8c8d;
  font-size: 1.1rem;
  line-height: 1.6;
}

.error-suggestions {
  text-align: left;
  margin-bottom: 30px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}

.error-suggestions h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.error-suggestions ul {
  color: #34495e;
  line-height: 1.8;
}

.error-suggestions li {
  margin-bottom: 5px;
}

.error-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.primary-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.secondary-btn {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

.error-info {
  background: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  margin-bottom: 20px;
}

.error-info h4 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.debug-details p {
  margin: 8px 0;
  font-family: monospace;
  font-size: 0.9rem;
  color: #34495e;
  word-break: break-all;
}

.debug-toggle {
  background: none;
  border: 1px solid #bdc3c7;
  color: #7f8c8d;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.debug-toggle:hover {
  border-color: #95a5a6;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .error-content {
    padding: 30px 20px;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-btn,
  .secondary-btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>