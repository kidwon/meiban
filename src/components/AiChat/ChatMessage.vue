<template>
  <div class="chat-message" :class="{ 'user-message': isUser, 'assistant-message': !isUser }">
    <div class="message-avatar">
      <span v-if="isUser">👤</span>
      <img v-else src="/images/meimei.png" alt="冥冥" class="avatar-image" />
    </div>
    
    <div class="message-content">
      <div class="message-bubble">
        <div class="message-text" v-html="formattedContent"></div>
        <div v-if="message.isStreaming" class="streaming-cursor">|</div>
      </div>
      <div class="message-time">
        {{ formatTime(message.timestamp) }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      required: true
    },
    isUser: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    
    // 格式化消息内容
    const formattedContent = computed(() => {
      // 处理响应式引用和普通字符串
      const rawContent = props.message.content
      let content = typeof rawContent === 'object' && rawContent.value !== undefined 
        ? rawContent.value 
        : rawContent
      
      if (!content) return ''
      
      // 调试: 监控内容变化
      console.log('ChatMessage内容更新:', content)
      
      // 处理换行
      content = content.replace(/\n/g, '<br>')
      
      // 处理加粗文本
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      content = content.replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // 处理列表项
      content = content.replace(/^- (.*?)$/gm, '• $1')
      
      return content
    })
    
    // 格式化时间
    const formatTime = (timestamp) => {
      if (!timestamp) return ''
      
      const date = new Date(timestamp)
      const now = new Date()
      const diffInHours = (now - date) / (1000 * 60 * 60)
      
      if (diffInHours < 24) {
        // 24小时内显示具体时间
        return date.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      } else {
        // 超过24小时显示日期
        return date.toLocaleDateString()
      }
    }
    
    return {
      formattedContent,
      formatTime
    }
  }
}
</script>

<style scoped>
.chat-message {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  animation: fadeInUp 0.3s ease-out;
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.assistant-message .message-avatar {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.message-content {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.user-message .message-content {
  align-items: flex-end;
}

.assistant-message .message-content {
  align-items: flex-start;
}

.message-bubble {
  position: relative;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  max-width: 100%;
}

.user-message .message-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 8px;
}

.assistant-message .message-bubble {
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #e9ecef;
  border-bottom-left-radius: 8px;
}

.message-text {
  line-height: 1.5;
  font-size: 0.95rem;
}

.message-text :deep(strong) {
  font-weight: 600;
}

.message-text :deep(em) {
  font-style: italic;
}

.message-text :deep(br) {
  line-height: 1.8;
}

.streaming-cursor {
  display: inline-block;
  animation: blink 1s infinite;
  font-weight: bold;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.message-time {
  font-size: 0.75rem;
  color: #95a5a6;
  margin-top: 4px;
  padding: 0 4px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .message-content {
    max-width: 85%;
  }
  
  .message-avatar {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
  
  .message-bubble {
    padding: 10px 14px;
    border-radius: 16px;
  }
  
  .message-text {
    font-size: 0.9rem;
  }
  
  .chat-message {
    gap: 8px;
    margin-bottom: 16px;
  }
}
</style>