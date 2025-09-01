<template>
  <div class="ai-chat-interface">
    <!-- 聊天历史区域 -->
    <div class="chat-messages" ref="messagesContainer">
      <div v-if="messages.length === 0" class="welcome-message">
        <img src="/images/meimei.png" alt="冥冥" class="welcome-icon" />
        <h3>{{ $t('aiChat.welcome.title') }}</h3>
        <p>{{ $t('aiChat.welcome.description') }}</p>
        
        <!-- 建议问题 -->
        <div class="suggested-questions">
          <h4>{{ $t('aiChat.suggestedQuestions.title') }}</h4>
          <div class="questions-grid">
            <button 
              v-for="(question, index) in suggestedQuestions" 
              :key="index"
              class="question-button"
              @click="sendMessage(question)"
              :disabled="isLoading"
            >
              {{ question }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- 聊天消息 -->
      <ChatMessage 
        v-for="message in messages" 
        :key="message.id"
        :message="message"
        :is-user="message.role === 'user'"
      />
      
      <!-- 流式响应指示器 -->
      <StreamingIndicator v-if="isLoading" />
    </div>
    
    <!-- 输入区域 -->
    <ChatInput 
      :disabled="isLoading"
      :placeholder="$t('aiChat.input.placeholder')"
      @send="sendMessage"
    />
    
    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span>
      {{ error }}
      <button @click="clearError" class="error-close">×</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'
import StreamingIndicator from './StreamingIndicator.vue'
import { handleChatRequest, generateSuggestedQuestions, handleAPIError } from '../../api/ai-chat.js'

export default {
  name: 'AiChatInterface',
  components: {
    ChatMessage,
    ChatInput,
    StreamingIndicator
  },
  setup() {
    const store = useStore()
    
    // 状态管理
    const messages = ref([])
    const isLoading = ref(false)
    const error = ref('')
    const messagesContainer = ref(null)
    
    // 计算属性
    const userData = computed(() => store.getters.getUserData)
    const calculationResults = computed(() => store.getters.getCalculationResults)
    const currentLanguage = computed(() => store.getters.getSettings.language)
    
    // 建议问题
    const suggestedQuestions = computed(() => {
      return generateSuggestedQuestions(
        userData.value, 
        calculationResults.value, 
        currentLanguage.value
      )
    })
    
    // 发送消息
    const sendMessage = async (content) => {
      if (!content?.trim() || isLoading.value) return
      
      // 添加用户消息
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date()
      }
      messages.value.push(userMessage)
      
      // 滚动到底部
      await nextTick()
      scrollToBottom()
      
      // 设置加载状态
      isLoading.value = true
      error.value = ''
      
      let assistantMessage = null
      
      try {
        // 准备上下文
        const userContext = {
          userData: userData.value,
          calculationResults: calculationResults.value,
          language: currentLanguage.value
        }
        
        // 准备消息历史 (不包括刚添加的用户消息，避免重复)
        const chatMessages = messages.value.map(msg => ({
          role: msg.role,
          content: typeof msg.content === 'object' && msg.content.value !== undefined 
            ? msg.content.value 
            : msg.content
        }))
        
        console.log('调用AI API，消息历史:', chatMessages)
        
        // 调用 AI API
        const result = await handleChatRequest(chatMessages, userContext)
        console.log('AI API调用成功，获得result:', result)
        
        // 只有在API调用成功后才创建助手消息
        const contentRef = ref('')
        assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: contentRef,
          timestamp: new Date(),
          isStreaming: true
        }
        messages.value.push(assistantMessage)
        
        // 滚动到底部显示新的助手消息框
        await nextTick()
        scrollToBottom()
        
        // 处理流式响应
        let fullContent = ''
        console.log('开始处理流式响应...')
        
        try {
          let chunkCount = 0
          for await (const delta of result.textStream) {
            chunkCount++
            console.log(`收到第${chunkCount}个流式内容片段:`, delta)
            fullContent += delta
            
            // 通过响应式引用更新内容
            assistantMessage.content.value = fullContent
            
            // 实时滚动到底部
            await nextTick()
            scrollToBottom()
          }
          console.log('流式响应完成，最终内容长度:', fullContent.length, '实际内容:', fullContent)
          
          // 检查是否真的收到了内容
          if (!fullContent.trim()) {
            throw new Error('未收到任何AI回复内容')
          }
          
        } catch (streamError) {
          console.error('流式响应处理错误:', streamError)
          throw streamError
        }
        
        // 完成流式响应
        assistantMessage.isStreaming = false
        
        // 保存到本地存储
        saveChatHistory()
        
      } catch (err) {
        console.error('Chat error:', err)
        error.value = handleAPIError(err, currentLanguage.value)
        
        // 如果创建了助手消息但失败了，移除它
        if (assistantMessage) {
          const assistantIndex = messages.value.findIndex(msg => msg.id === assistantMessage.id)
          if (assistantIndex !== -1) {
            messages.value.splice(assistantIndex, 1)
          }
        }
        
        // 移除失败的用户消息
        if (messages.value.length > 0 && messages.value[messages.value.length - 1].role === 'user') {
          messages.value.pop()
        }
        
      } finally {
        isLoading.value = false
      }
    }
    
    // 滚动到底部
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }
    
    // 清除错误
    const clearError = () => {
      error.value = ''
    }
    
    // 保存聊天历史
    const saveChatHistory = () => {
      // 转换响应式内容为普通字符串进行序列化
      const serializedMessages = messages.value.map(msg => ({
        ...msg,
        content: typeof msg.content === 'object' && msg.content.value !== undefined 
          ? msg.content.value 
          : msg.content
      }))
      
      const chatHistory = {
        messages: serializedMessages,
        timestamp: new Date().toISOString(),
        userData: userData.value,
        language: currentLanguage.value
      }
      
      localStorage.setItem('ai-chat-history', JSON.stringify(chatHistory))
    }
    
    // 加载聊天历史
    const loadChatHistory = () => {
      try {
        const saved = localStorage.getItem('ai-chat-history')
        if (saved) {
          const chatHistory = JSON.parse(saved)
          
          // 检查是否是同一用户的历史记录
          if (chatHistory.userData && userData.value && 
              chatHistory.userData.birthdate === userData.value.birthdate &&
              chatHistory.userData.birthHour === userData.value.birthHour &&
              chatHistory.userData.birthMinute === userData.value.birthMinute) {
            messages.value = chatHistory.messages || []
            
            // 滚动到底部
            nextTick(() => {
              scrollToBottom()
            })
          }
        }
      } catch (err) {
        console.error('Failed to load chat history:', err)
      }
    }
    
    // 清除聊天历史
    const clearChatHistory = () => {
      messages.value = []
      localStorage.removeItem('ai-chat-history')
    }
    
    // 监听用户数据变化
    watch([userData, calculationResults], () => {
      // 用户数据变化时清除聊天历史
      clearChatHistory()
    }, { deep: true })
    
    // 组件挂载时加载历史记录
    onMounted(() => {
      if (userData.value && calculationResults.value) {
        loadChatHistory()
      }
    })
    
    return {
      messages,
      isLoading,
      error,
      messagesContainer,
      suggestedQuestions,
      sendMessage,
      clearError,
      clearChatHistory
    }
  }
}
</script>

<style scoped>
.ai-chat-interface {
  display: flex;
  flex-direction: column;
  height: 600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.welcome-message {
  text-align: center;
  padding: 40px 20px;
}

.welcome-icon {
  width: 4rem;
  height: 4rem;
  margin-bottom: 20px;
  opacity: 0.8;
  border-radius: 50%;
  object-fit: cover;
}

.welcome-message h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.welcome-message p {
  color: #7f8c8d;
  margin-bottom: 30px;
  line-height: 1.6;
}

.suggested-questions {
  margin-top: 30px;
}

.suggested-questions h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.1rem;
  font-weight: 600;
}

.questions-grid {
  display: grid;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.question-button {
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.4;
}

.question-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.question-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #fee;
  color: #c62828;
  border-top: 1px solid #ffcdd2;
}

.error-icon {
  font-size: 1.2rem;
}

.error-close {
  margin-left: auto;
  background: none;
  border: none;
  color: #c62828;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.error-close:hover {
  background: rgba(198, 40, 40, 0.1);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .ai-chat-interface {
    height: calc(100vh - 120px);
    border-radius: 8px;
  }
  
  .chat-messages {
    padding: 15px;
  }
  
  .welcome-message {
    padding: 20px 10px;
  }
  
  .welcome-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .question-button {
    padding: 10px 14px;
    font-size: 0.85rem;
  }
}
</style>