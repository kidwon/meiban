<template>
  <div class="streaming-indicator">
    <div class="message-avatar">
      <img src="/images/meimei.png" alt="冥冥" class="avatar-image" />
    </div>
    
    <div class="message-content">
      <div class="typing-bubble">
        <div class="typing-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="typing-text">{{ $t('aiChat.streaming.thinking') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StreamingIndicator'
}
</script>

<style scoped>
.streaming-indicator {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  animation: fadeInUp 0.3s ease-out;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
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
  align-items: flex-start;
}

.typing-bubble {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 18px;
  border-bottom-left-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.typing-bubble::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
.dot:nth-child(3) { animation-delay: 0s; }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.typing-text {
  color: #6c757d;
  font-size: 0.9rem;
  font-style: italic;
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
  .streaming-indicator {
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .message-avatar {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
  
  .typing-bubble {
    padding: 12px 16px;
    border-radius: 16px;
  }
  
  .typing-text {
    font-size: 0.85rem;
  }
  
  .dot {
    width: 6px;
    height: 6px;
  }
}</style>