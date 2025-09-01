<template>
  <div class="chat-input">
    <div class="input-container">
      <textarea
        ref="textarea"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="message-input"
        rows="1"
        @keydown="handleKeydown"
        @input="handleInput"
        @paste="handlePaste"
      ></textarea>
      
      <button
        class="send-button"
        :disabled="!canSend"
        @click="handleSend"
        :title="$t('aiChat.input.send')"
      >
        <span v-if="!disabled" class="send-icon">📤</span>
        <span v-else class="loading-icon">⏳</span>
      </button>
    </div>
    
    <div class="input-footer">
      <div class="input-hints">
        <span class="hint">{{ $t('aiChat.input.enterToSend') }}</span>
        <span class="hint">{{ $t('aiChat.input.shiftEnterForNewLine') }}</span>
      </div>
      
      <div class="character-count" :class="{ 'warning': isNearLimit, 'error': isOverLimit }">
        {{ inputValue.length }}/{{ maxLength }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick, watch } from 'vue'

export default {
  name: 'ChatInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 1000
    }
  },
  emits: ['send'],
  setup(props, { emit }) {
    const textarea = ref(null)
    const inputValue = ref('')
    
    // 计算属性
    const canSend = computed(() => {
      return !props.disabled && 
             inputValue.value.trim().length > 0 && 
             inputValue.value.length <= props.maxLength
    })
    
    const isNearLimit = computed(() => {
      return inputValue.value.length > props.maxLength * 0.8
    })
    
    const isOverLimit = computed(() => {
      return inputValue.value.length > props.maxLength
    })
    
    // 自动调整文本域高度
    const adjustTextareaHeight = () => {
      if (!textarea.value) return
      
      textarea.value.style.height = 'auto'
      const scrollHeight = textarea.value.scrollHeight
      const maxHeight = 120 // 最大高度约5行
      
      textarea.value.style.height = Math.min(scrollHeight, maxHeight) + 'px'
      textarea.value.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
    }
    
    // 处理输入
    const handleInput = () => {
      nextTick(() => {
        adjustTextareaHeight()
      })
    }
    
    // 处理粘贴
    const handlePaste = (event) => {
      // 防止粘贴超长文本
      const paste = (event.clipboardData || window.clipboardData).getData('text')
      const newLength = inputValue.value.length + paste.length
      
      if (newLength > props.maxLength) {
        event.preventDefault()
        const remainingLength = props.maxLength - inputValue.value.length
        const trimmedPaste = paste.substring(0, remainingLength)
        
        const selectionStart = textarea.value.selectionStart
        const selectionEnd = textarea.value.selectionEnd
        
        inputValue.value = 
          inputValue.value.substring(0, selectionStart) + 
          trimmedPaste + 
          inputValue.value.substring(selectionEnd)
        
        nextTick(() => {
          textarea.value.setSelectionRange(
            selectionStart + trimmedPaste.length,
            selectionStart + trimmedPaste.length
          )
          adjustTextareaHeight()
        })
      }
    }
    
    // 处理键盘事件
    const handleKeydown = (event) => {
      if (event.key === 'Enter') {
        if (event.shiftKey) {
          // Shift+Enter 换行
          return
        } else {
          // Enter 发送消息
          event.preventDefault()
          handleSend()
        }
      }
      
      // ESC 清空输入
      if (event.key === 'Escape') {
        inputValue.value = ''
        adjustTextareaHeight()
      }
    }
    
    // 发送消息
    const handleSend = () => {
      if (!canSend.value) return
      
      const message = inputValue.value.trim()
      if (message) {
        emit('send', message)
        inputValue.value = ''
        nextTick(() => {
          adjustTextareaHeight()
          textarea.value?.focus()
        })
      }
    }
    
    // 聚焦输入框
    const focus = () => {
      textarea.value?.focus()
    }
    
    // 监听输入值变化
    watch(inputValue, () => {
      nextTick(() => {
        adjustTextareaHeight()
      })
    })
    
    // 监听禁用状态变化
    watch(() => props.disabled, (disabled) => {
      if (!disabled) {
        nextTick(() => {
          focus()
        })
      }
    })
    
    return {
      textarea,
      inputValue,
      canSend,
      isNearLimit,
      isOverLimit,
      handleInput,
      handlePaste,
      handleKeydown,
      handleSend,
      focus
    }
  }
}
</script>

<style scoped>
.chat-input {
  border-top: 1px solid #e9ecef;
  padding: 16px 20px;
  background: #fff;
}

.input-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 0.95rem;
  line-height: 1.4;
  resize: none;
  outline: none;
  font-family: inherit;
  transition: all 0.3s ease;
  min-height: 44px;
  max-height: 120px;
  overflow-y: auto;
}

.message-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.message-input:disabled {
  background: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.message-input::placeholder {
  color: #adb5bd;
}

.send-button {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.send-icon, .loading-icon {
  display: block;
}

.loading-icon {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 0.75rem;
  color: #6c757d;
}

.input-hints {
  display: flex;
  gap: 12px;
}

.hint {
  opacity: 0.8;
}

.character-count {
  font-weight: 500;
}

.character-count.warning {
  color: #f39c12;
}

.character-count.error {
  color: #e74c3c;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .chat-input {
    padding: 12px 15px;
  }
  
  .input-container {
    gap: 10px;
  }
  
  .message-input {
    padding: 10px 14px;
    font-size: 16px; /* 防止iOS自动缩放 */
    border-radius: 18px;
  }
  
  .send-button {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .input-footer {
    margin-top: 6px;
  }
  
  .input-hints {
    gap: 8px;
  }
  
  .hint {
    display: none; /* 移动端隐藏提示 */
  }
  
  .hint:first-child {
    display: inline; /* 只显示第一个提示 */
  }
}
</style>