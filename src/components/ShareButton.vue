<template>
  <div class="share-container">
    <!-- 分享按钮 -->
    <button 
      @click="handleShare"
      class="btn btn--secondary share-btn"
      :class="{ 'wechat': isWechatBrowser }"
      :disabled="loading"
    >
      <span class="share-icon">📤</span>
      <span class="share-text">{{ shareButtonText }}</span>
    </button>

    <!-- 分享成功提示 -->
    <transition name="fade">
      <div v-if="showSuccessMessage" class="share-success">
        {{ $t('share.success') }}
      </div>
    </transition>

    <!-- 分享选项面板（非微信环境） -->
    <transition name="slide-up">
      <div v-if="showSharePanel" class="share-panel" @click.stop>
        <div class="share-panel-header">
          <h3>{{ $t('share.title') }}</h3>
          <button @click="closeSharePanel" class="close-btn">×</button>
        </div>
        
        <div class="share-content">
          <div class="share-preview">
            <img :src="shareData.imgUrl" :alt="shareData.title" class="share-image" />
            <div class="share-info">
              <h4>{{ shareData.title }}</h4>
              <p>{{ shareData.desc }}</p>
            </div>
          </div>

          <div class="share-options">
            <button @click="copyLink" class="share-option">
              <span class="option-icon">📋</span>
              <span>{{ $t('share.copyLink') }}</span>
            </button>
            
            <button @click="shareToQQ" class="share-option" v-if="!isWechatBrowser">
              <span class="option-icon">🐧</span>
              <span>{{ $t('share.qq') }}</span>
            </button>
            
            <button @click="shareToWeibo" class="share-option" v-if="!isWechatBrowser">
              <span class="option-icon">🏮</span>
              <span>{{ $t('share.weibo') }}</span>
            </button>
            
            <button @click="shareToEmail" class="share-option">
              <span class="option-icon">📧</span>
              <span>{{ $t('share.email') }}</span>
            </button>
          </div>

          <div class="share-url">
            <input 
              ref="urlInput"
              type="text" 
              :value="shareData.link" 
              readonly
              class="url-input"
            />
          </div>
        </div>
      </div>
    </transition>

    <!-- 背景遮罩 -->
    <div 
      v-if="showSharePanel" 
      class="share-overlay"
      @click="closeSharePanel"
    ></div>
  </div>
</template>

<script>
import { 
  generateShareUrl, 
  generateShareContent, 
  isUrlLengthReasonable 
} from '../utils/dataEncoder.js';
import { 
  isWechatBrowser, 
  configWechatShare, 
  generateOpenGraphMeta,
  trackShareEvent 
} from '../utils/wechatShare.js';

export default {
  name: 'ShareButton',
  props: {
    userData: {
      type: Object,
      required: true
    },
    calculationResults: {
      type: Object,
      required: true
    },
    analysisType: {
      type: String,
      default: 'astrology',
      validator: value => ['astrology', 'bazi'].includes(value)
    }
  },
  data() {
    return {
      loading: false,
      showSharePanel: false,
      showSuccessMessage: false,
      shareData: null,
      isWechatBrowser: false
    };
  },
  computed: {
    shareButtonText() {
      if (this.loading) {
        return this.$t('share.generating');
      }
      return this.isWechatBrowser ? this.$t('share.wechat') : this.$t('share.share');
    }
  },
  mounted() {
    this.isWechatBrowser = isWechatBrowser();
    this.prepareShareData();
  },
  methods: {
    /**
     * 准备分享数据
     */
    async prepareShareData() {
      try {
        this.loading = true;
        
        // 生成分享URL
        const shareUrl = generateShareUrl(
          this.userData, 
          this.calculationResults, 
          this.analysisType
        );

        // 检查URL长度
        if (!isUrlLengthReasonable(shareUrl)) {
          console.warn('分享URL过长，建议优化');
        }

        // 生成分享内容
        const shareContent = generateShareContent(
          this.userData,
          this.calculationResults,
          this.analysisType
        );

        this.shareData = {
          ...shareContent,
          link: shareUrl
        };

        // 更新页面meta标签（用于分享预览）
        generateOpenGraphMeta(this.shareData);

        // 如果在微信环境，配置微信分享
        if (this.isWechatBrowser) {
          await this.setupWechatShare();
        }

      } catch (error) {
        console.error('准备分享数据失败:', error);
        this.$emit('error', error.message);
      } finally {
        this.loading = false;
      }
    },

    /**
     * 设置微信分享
     */
    async setupWechatShare() {
      try {
        await configWechatShare({
          title: this.shareData.title,
          desc: this.shareData.desc,
          link: this.shareData.link,
          imgUrl: this.shareData.imgUrl,
          success: () => {
            this.showSuccessMessage = true;
            setTimeout(() => {
              this.showSuccessMessage = false;
            }, 3000);
            trackShareEvent('wechat', this.analysisType);
            this.$emit('shareSuccess', 'wechat');
          },
          cancel: () => {
            this.$emit('shareCancel', 'wechat');
          }
        });
      } catch (error) {
        console.error('配置微信分享失败:', error);
      }
    },

    /**
     * 处理分享按钮点击
     */
    async handleShare() {
      if (this.loading || !this.shareData) return;

      if (this.isWechatBrowser) {
        // 微信环境：显示提示用户点击右上角分享
        this.showWechatShareTip();
      } else {
        // 非微信环境：显示分享选项面板
        this.showSharePanel = true;
      }

      trackShareEvent('button_click', this.analysisType);
    },

    /**
     * 显示微信分享提示
     */
    showWechatShareTip() {
      this.$emit('showTip', this.$t('share.wechatTip'));
    },

    /**
     * 复制链接
     */
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.shareData.link);
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
        trackShareEvent('copy_link', this.analysisType);
        this.$emit('shareSuccess', 'copy');
      } catch (error) {
        // 降级方案：选中文本
        this.$refs.urlInput.select();
        document.execCommand('copy');
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      }
    },

    /**
     * 分享到QQ
     */
    shareToQQ() {
      const url = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(this.shareData.link)}&title=${encodeURIComponent(this.shareData.title)}&desc=${encodeURIComponent(this.shareData.desc)}&pics=${encodeURIComponent(this.shareData.imgUrl)}`;
      window.open(url, '_blank');
      trackShareEvent('qq', this.analysisType);
      this.$emit('shareSuccess', 'qq');
    },

    /**
     * 分享到微博
     */
    shareToWeibo() {
      const text = `${this.shareData.title} - ${this.shareData.desc}`;
      const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(this.shareData.link)}&title=${encodeURIComponent(text)}&pic=${encodeURIComponent(this.shareData.imgUrl)}`;
      window.open(url, '_blank');
      trackShareEvent('weibo', this.analysisType);
      this.$emit('shareSuccess', 'weibo');
    },

    /**
     * 分享到邮件
     */
    shareToEmail() {
      const subject = encodeURIComponent(this.shareData.title);
      const body = encodeURIComponent(`${this.shareData.desc}\n\n${this.shareData.link}`);
      const url = `mailto:?subject=${subject}&body=${body}`;
      window.location.href = url;
      trackShareEvent('email', this.analysisType);
      this.$emit('shareSuccess', 'email');
    },

    /**
     * 关闭分享面板
     */
    closeSharePanel() {
      this.showSharePanel = false;
    }
  }
};
</script>

<style scoped>
.share-container {
  position: relative;
  display: inline-block;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.share-btn.wechat {
  background: linear-gradient(135deg, #07c160 0%, #00d4aa 100%);
}

.share-btn.wechat:hover {
  background: linear-gradient(135deg, #059a4f 0%, #00c49a 100%);
}

.share-icon {
  font-size: 16px;
}

.share-success {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}

.share-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.share-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 20px 20px 0 0;
  z-index: 1001;
  max-height: 80vh;
  overflow-y: auto;
}

.share-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.share-panel-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #f5f5f5;
}

.share-content {
  padding: 20px;
}

.share-preview {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.share-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.share-info h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;
}

.share-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.share-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.share-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 15px 10px;
  background: #f8f9fa;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.share-option:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.option-icon {
  font-size: 20px;
}

.share-url {
  margin-top: 15px;
}

.url-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: #f8f9fa;
}

/* 动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-up-leave-active {
  transition: transform 0.3s ease-in;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .share-panel {
    max-height: 85vh;
  }
  
  .share-options {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .share-preview {
    flex-direction: column;
  }
  
  .share-image {
    align-self: center;
  }
}
</style>