// AI聊天模块的Vuex store
const aiChatModule = {
  namespaced: true,
  
  state: {
    // 聊天会话
    conversations: {},
    // 当前活跃会话ID
    activeConversationId: null,
    // 聊天状态
    chatState: {
      isLoading: false,
      isConnected: true,
      error: null,
      streamingMessageId: null
    },
    // AI配置
    aiConfig: {
      model: 'gpt-4-turbo-preview',
      temperature: 0.7,
      maxTokens: 1000,
      maxHistoryLength: 20
    },
    // 用户偏好
    userPreferences: {
      autoSave: true,
      showTimestamps: true,
      enableSound: false,
      theme: 'default'
    }
  },
  
  getters: {
    // 获取当前会话
    currentConversation: (state) => {
      return state.activeConversationId ? 
        state.conversations[state.activeConversationId] : null
    },
    
    // 获取当前会话的消息
    currentMessages: (state, getters) => {
      const conversation = getters.currentConversation
      return conversation ? conversation.messages : []
    },
    
    // 获取会话列表
    conversationList: (state) => {
      return Object.values(state.conversations)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    },
    
    // 检查是否有活跃会话
    hasActiveConversation: (state) => {
      return state.activeConversationId && 
        state.conversations[state.activeConversationId]
    },
    
    // 获取聊天统计
    chatStats: (state, getters) => {
      const conversation = getters.currentConversation
      if (!conversation) return { totalMessages: 0, userMessages: 0, aiMessages: 0 }
      
      const messages = conversation.messages
      return {
        totalMessages: messages.length,
        userMessages: messages.filter(m => m.role === 'user').length,
        aiMessages: messages.filter(m => m.role === 'assistant').length
      }
    },
    
    // 是否正在加载
    isLoading: (state) => state.chatState.isLoading,
    
    // 是否有错误
    hasError: (state) => state.chatState.error !== null,
    
    // 获取错误信息
    getError: (state) => state.chatState.error,
    
    // 是否连接正常
    isConnected: (state) => state.chatState.isConnected
  },
  
  mutations: {
    // 设置加载状态
    SET_LOADING(state, loading) {
      state.chatState.isLoading = loading
    },
    
    // 设置错误
    SET_ERROR(state, error) {
      state.chatState.error = error
    },
    
    // 清除错误
    CLEAR_ERROR(state) {
      state.chatState.error = null
    },
    
    // 设置连接状态
    SET_CONNECTED(state, connected) {
      state.chatState.isConnected = connected
    },
    
    // 创建新会话
    CREATE_CONVERSATION(state, { conversationId, userData, language }) {
      const now = new Date().toISOString()
      
      state.conversations[conversationId] = {
        id: conversationId,
        messages: [],
        userData: { ...userData },
        language,
        createdAt: now,
        updatedAt: now,
        title: null, // 会从第一条消息生成标题
        metadata: {
          totalTokens: 0,
          messageCount: 0,
          lastActivity: now
        }
      }
    },
    
    // 设置活跃会话
    SET_ACTIVE_CONVERSATION(state, conversationId) {
      state.activeConversationId = conversationId
    },
    
    // 添加消息
    ADD_MESSAGE(state, { conversationId, message }) {
      const conversation = state.conversations[conversationId]
      if (!conversation) return
      
      conversation.messages.push(message)
      conversation.updatedAt = new Date().toISOString()
      conversation.metadata.messageCount = conversation.messages.length
      conversation.metadata.lastActivity = message.timestamp
      
      // 生成会话标题（使用第一条用户消息的前30个字符）
      if (!conversation.title && message.role === 'user') {
        conversation.title = message.content.length > 30 
          ? message.content.substring(0, 30) + '...'
          : message.content
      }
      
      // 限制历史消息数量
      if (conversation.messages.length > state.aiConfig.maxHistoryLength) {
        conversation.messages = conversation.messages.slice(-state.aiConfig.maxHistoryLength)
      }
    },
    
    // 更新消息
    UPDATE_MESSAGE(state, { conversationId, messageId, updates }) {
      const conversation = state.conversations[conversationId]
      if (!conversation) return
      
      const messageIndex = conversation.messages.findIndex(m => m.id === messageId)
      if (messageIndex !== -1) {
        Object.assign(conversation.messages[messageIndex], updates)
        conversation.updatedAt = new Date().toISOString()
      }
    },
    
    // 删除消息
    DELETE_MESSAGE(state, { conversationId, messageId }) {
      const conversation = state.conversations[conversationId]
      if (!conversation) return
      
      conversation.messages = conversation.messages.filter(m => m.id !== messageId)
      conversation.updatedAt = new Date().toISOString()
      conversation.metadata.messageCount = conversation.messages.length
    },
    
    // 删除会话
    DELETE_CONVERSATION(state, conversationId) {
      delete state.conversations[conversationId]
      
      if (state.activeConversationId === conversationId) {
        state.activeConversationId = null
      }
    },
    
    // 清除所有会话
    CLEAR_ALL_CONVERSATIONS(state) {
      state.conversations = {}
      state.activeConversationId = null
    },
    
    // 设置流式消息ID
    SET_STREAMING_MESSAGE(state, messageId) {
      state.chatState.streamingMessageId = messageId
    },
    
    // 更新AI配置
    UPDATE_AI_CONFIG(state, config) {
      state.aiConfig = { ...state.aiConfig, ...config }
    },
    
    // 更新用户偏好
    UPDATE_USER_PREFERENCES(state, preferences) {
      state.userPreferences = { ...state.userPreferences, ...preferences }
    },
    
    // 从存储加载状态
    LOAD_FROM_STORAGE(state, savedState) {
      if (savedState) {
        state.conversations = savedState.conversations || {}
        state.activeConversationId = savedState.activeConversationId || null
        state.aiConfig = { ...state.aiConfig, ...(savedState.aiConfig || {}) }
        state.userPreferences = { ...state.userPreferences, ...(savedState.userPreferences || {}) }
      }
    }
  },
  
  actions: {
    // 初始化聊天系统
    async initializeChat({ commit, dispatch }) {
      try {
        commit('SET_LOADING', true)
        
        // 从本地存储加载状态
        await dispatch('loadFromStorage')
        
        commit('SET_CONNECTED', true)
        commit('CLEAR_ERROR')
        
      } catch (error) {
        console.error('Failed to initialize chat:', error)
        commit('SET_ERROR', error.message)
        commit('SET_CONNECTED', false)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    // 开始新会话
    async startNewConversation({ commit, rootGetters }, options = {}) {
      const userData = rootGetters.getUserData
      const calculationResults = rootGetters.getCalculationResults
      const language = rootGetters.getSettings.language
      
      if (!userData || !calculationResults) {
        throw new Error('需要完整的用户数据才能开始AI对话')
      }
      
      const conversationId = Date.now().toString()
      
      commit('CREATE_CONVERSATION', {
        conversationId,
        userData,
        language,
        ...options
      })
      
      commit('SET_ACTIVE_CONVERSATION', conversationId)
      
      return conversationId
    },
    
    // 发送消息
    async sendMessage({ state, commit }, { content, conversationId }) {
      if (!conversationId && !state.activeConversationId) {
        throw new Error('没有活跃的会话')
      }
      
      const targetConversationId = conversationId || state.activeConversationId
      const conversation = state.conversations[targetConversationId]
      
      if (!conversation) {
        throw new Error('会话不存在')
      }
      
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      
      try {
        // 创建用户消息
        const userMessage = {
          id: Date.now(),
          role: 'user',
          content: content.trim(),
          timestamp: new Date().toISOString(),
          metadata: {
            wordCount: content.trim().split(/\s+/).length
          }
        }
        
        commit('ADD_MESSAGE', {
          conversationId: targetConversationId,
          message: userMessage
        })
        
        // 自动保存
        if (state.userPreferences.autoSave) {
          await this.dispatch('aiChat/saveToStorage')
        }
        
        return userMessage
        
      } catch (error) {
        console.error('Failed to send message:', error)
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    // 处理AI响应（由组件调用）
    async handleAIResponse({ commit }, { conversationId, messageId, content, isComplete = false }) {
      commit('UPDATE_MESSAGE', {
        conversationId,
        messageId,
        updates: {
          content,
          isStreaming: !isComplete,
          updatedAt: new Date().toISOString()
        }
      })
      
      if (isComplete) {
        commit('SET_STREAMING_MESSAGE', null)
        
        // 自动保存
        await this.dispatch('aiChat/saveToStorage')
      } else {
        commit('SET_STREAMING_MESSAGE', messageId)
      }
    },
    
    // 重试消息
    async retryMessage({ state, dispatch }, { conversationId, messageId }) {
      const conversation = state.conversations[conversationId]
      if (!conversation) return
      
      const messageIndex = conversation.messages.findIndex(m => m.id === messageId)
      if (messageIndex === -1) return
      
      const message = conversation.messages[messageIndex]
      if (message.role !== 'user') return
      
      // 删除该消息及其后的所有消息
      const messagesToKeep = conversation.messages.slice(0, messageIndex)
      conversation.messages = messagesToKeep
      
      // 重新发送
      return await dispatch('sendMessage', {
        content: message.content,
        conversationId
      })
    },
    
    // 切换会话
    switchConversation({ commit }, conversationId) {
      commit('SET_ACTIVE_CONVERSATION', conversationId)
    },
    
    // 删除会话
    async deleteConversation({ commit, dispatch }, conversationId) {
      commit('DELETE_CONVERSATION', conversationId)
      await dispatch('saveToStorage')
    },
    
    // 清除所有会话
    async clearAllConversations({ commit, dispatch }) {
      commit('CLEAR_ALL_CONVERSATIONS')
      await dispatch('saveToStorage')
    },
    
    // 更新AI配置
    async updateAIConfig({ commit, dispatch }, config) {
      commit('UPDATE_AI_CONFIG', config)
      await dispatch('saveToStorage')
    },
    
    // 更新用户偏好
    async updateUserPreferences({ commit, dispatch }, preferences) {
      commit('UPDATE_USER_PREFERENCES', preferences)
      await dispatch('saveToStorage')
    },
    
    // 保存到本地存储
    async saveToStorage({ state }) {
      try {
        const stateToSave = {
          conversations: state.conversations,
          activeConversationId: state.activeConversationId,
          aiConfig: state.aiConfig,
          userPreferences: state.userPreferences,
          lastSaved: new Date().toISOString()
        }
        
        localStorage.setItem('aiChatState', JSON.stringify(stateToSave))
        
      } catch (error) {
        console.error('Failed to save chat state to storage:', error)
      }
    },
    
    // 从本地存储加载
    async loadFromStorage({ commit }) {
      try {
        const saved = localStorage.getItem('aiChatState')
        if (saved) {
          const parsedState = JSON.parse(saved)
          commit('LOAD_FROM_STORAGE', parsedState)
        }
      } catch (error) {
        console.error('Failed to load chat state from storage:', error)
      }
    },
    
    // 导出会话
    exportConversation({ state }, conversationId) {
      const conversation = state.conversations[conversationId]
      if (!conversation) return null
      
      return {
        ...conversation,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      }
    },
    
    // 导入会话
    async importConversation({ commit }, conversationData) {
      try {
        if (!conversationData || !conversationData.id) {
          throw new Error('Invalid conversation data')
        }
        
        // 生成新的ID以避免冲突
        const newConversationId = Date.now().toString()
        const importedConversation = {
          ...conversationData,
          id: newConversationId,
          importedAt: new Date().toISOString()
        }
        
        commit('conversations', {
          [newConversationId]: importedConversation
        })
        
        await this.dispatch('aiChat/saveToStorage')
        
        return newConversationId
        
      } catch (error) {
        console.error('Failed to import conversation:', error)
        throw error
      }
    }
  }
}

export default aiChatModule