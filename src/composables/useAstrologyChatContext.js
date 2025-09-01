import { computed, ref } from 'vue'
import { useStore } from 'vuex'

// 占星聊天上下文构建工具
export function useAstrologyChatContext() {
  const store = useStore()
  
  // 响应式状态
  const contextCache = ref({})
  const lastUpdateTime = ref(null)
  
  // 获取用户数据
  const userData = computed(() => store.getters.getUserData)
  const calculationResults = computed(() => store.getters.getCalculationResults)
  const currentLanguage = computed(() => store.getters.getSettings.language)
  
  // 暂时移除未使用的星座映射
  
  // 天干地支英文映射
  const baziMappings = {
    heavenlyStems: {
      '甲': 'Jia (Yang Wood)', '乙': 'Yi (Yin Wood)',
      '丙': 'Bing (Yang Fire)', '丁': 'Ding (Yin Fire)',
      '戊': 'Wu (Yang Earth)', '己': 'Ji (Yin Earth)',
      '庚': 'Geng (Yang Metal)', '辛': 'Xin (Yin Metal)',
      '壬': 'Ren (Yang Water)', '癸': 'Gui (Yin Water)'
    },
    earthlyBranches: {
      '子': 'Zi (Rat)', '丑': 'Chou (Ox)', '寅': 'Yin (Tiger)',
      '卯': 'Mao (Rabbit)', '辰': 'Chen (Dragon)', '巳': 'Si (Snake)',
      '午': 'Wu (Horse)', '未': 'Wei (Goat)', '申': 'Shen (Monkey)',
      '酉': 'You (Rooster)', '戌': 'Xu (Dog)', '亥': 'Hai (Pig)'
    }
  }
  
  // 五行英文映射
  const elementMappings = {
    '木': 'Wood', '火': 'Fire', '土': 'Earth', '金': 'Metal', '水': 'Water'
  }
  
  // 构建系统提示语
  const buildSystemPrompt = (language) => {
    const prompts = {
      zh: {
        role: "你是一位资深的占星师和生辰八字专家，拥有丰富的中西方占星学知识。你能够深入解读生辰八字（四柱命理学）和西方占星学，为用户提供个性化、准确且富有洞察力的占星建议。",
        style: "请以专业、温和、富有同理心的语气回答。避免过于学术化的表达，用通俗易懂的方式解释复杂的占星概念。",
        guidelines: [
          "基于用户的具体星盘信息给出个性化建议",
          "结合生辰八字和西方占星学的综合分析",
          "避免极端的预测，注重指导性建议",
          "尊重用户的自主选择权",
          "回答简洁明了，通常控制在200-300字"
        ]
      },
      ja: {
        role: "あなたは豊富な東西洋占星術の知識を持つベテランの占星術師および生辰八字の専門家です。四柱推命と西洋占星術を深く理解し、ユーザーに個別的で正確かつ洞察に満ちた占星術アドバイスを提供することができます。",
        style: "専門的でありながら、温かく共感的な口調で回答してください。過度に学術的な表現を避け、複雑な占星術の概念を分かりやすく説明してください。",
        guidelines: [
          "ユーザーの具体的な星盤情報に基づいた個別のアドバイスを提供",
          "生辰八字と西洋占星術の総合的な分析を結合",
          "極端な予測を避け、指導的なアドバイスに重点を置く",
          "ユーザーの自律的な選択権を尊重",
          "回答は簡潔明瞭で、通常200-300文字程度"
        ]
      },
      en: {
        role: "You are a seasoned astrologer and BaZi expert with extensive knowledge of both Eastern and Western astrology. You can deeply interpret BaZi (Four Pillars of Destiny) and Western astrology to provide users with personalized, accurate, and insightful astrological guidance.",
        style: "Please respond with a professional, warm, and empathetic tone. Avoid overly academic expressions and explain complex astrological concepts in an accessible way.",
        guidelines: [
          "Provide personalized advice based on the user's specific birth chart information",
          "Combine comprehensive analysis of BaZi and Western astrology",
          "Avoid extreme predictions and focus on guidance-oriented advice",
          "Respect the user's autonomy in making choices",
          "Keep responses concise and clear, typically 200-300 words"
        ]
      }
    }
    
    return prompts[language] || prompts.zh
  }
  
  // 构建用户基本信息
  const buildUserBasicInfo = (userData, language) => {
    if (!userData) return ''
    
    const labels = {
      zh: {
        birth: "出生信息",
        date: "出生日期",
        time: "出生时间",
        place: "出生地点",
        gender: "性别",
        male: "男性",
        female: "女性"
      },
      ja: {
        birth: "出生情報",
        date: "出生日",
        time: "出生時間",
        place: "出生地",
        gender: "性別",
        male: "男性",
        female: "女性"
      },
      en: {
        birth: "Birth Information",
        date: "Birth Date",
        time: "Birth Time",
        place: "Birth Place",
        gender: "Gender",
        male: "Male",
        female: "Female"
      }
    }
    
    const lang = labels[language] || labels.zh
    const genderText = userData.gender === 'male' ? lang.male : lang.female
    
    return `${lang.birth}:
- ${lang.date}: ${userData.birthdate}
- ${lang.time}: ${userData.birthHour}:${userData.birthMinute.toString().padStart(2, '0')}
- ${lang.place}: ${userData.birthplace}
- ${lang.gender}: ${genderText}
`
  }
  
  // 构建生辰八字信息
  const buildBaziInfo = (calculationResults, language) => {
    if (!calculationResults?.eightCharacters) return ''
    
    const labels = {
      zh: { title: "生辰八字 (四柱)", year: "年柱", month: "月柱", day: "日柱", hour: "时柱" },
      ja: { title: "生辰八字 (四柱)", year: "年柱", month: "月柱", day: "日柱", hour: "時柱" },
      en: { title: "BaZi (Four Pillars of Destiny)", year: "Year Pillar", month: "Month Pillar", day: "Day Pillar", hour: "Hour Pillar" }
    }
    
    const lang = labels[language] || labels.zh
    const { eightCharacters } = calculationResults
    
    const formatPillar = (pillar) => {
      if (!pillar?.heavenlyStem || !pillar?.earthlyBranch) return 'N/A'
      
      if (language === 'en') {
        const stem = baziMappings.heavenlyStems[pillar.heavenlyStem] || pillar.heavenlyStem
        const branch = baziMappings.earthlyBranches[pillar.earthlyBranch] || pillar.earthlyBranch
        return `${pillar.heavenlyStem}${pillar.earthlyBranch} (${stem} + ${branch})`
      }
      
      return `${pillar.heavenlyStem}${pillar.earthlyBranch}`
    }
    
    return `${lang.title}:
- ${lang.year}: ${formatPillar(eightCharacters.year)}
- ${lang.month}: ${formatPillar(eightCharacters.month)}
- ${lang.day}: ${formatPillar(eightCharacters.day)}
- ${lang.hour}: ${formatPillar(eightCharacters.hour)}
`
  }
  
  // 构建西方占星信息
  const buildWesternAstrologyInfo = (calculationResults, language) => {
    if (!calculationResults?.astrologyPositions) return ''
    
    const labels = {
      zh: { title: "西方占星位置", sun: "太阳", moon: "月亮", asc: "上升" },
      ja: { title: "西洋占星術の位置", sun: "太陽", moon: "月", asc: "アセンダント" },
      en: { title: "Western Astrology Positions", sun: "Sun", moon: "Moon", asc: "Ascendant" }
    }
    
    const lang = labels[language] || labels.zh
    const { astrologyPositions } = calculationResults
    
    const formatPosition = (position) => {
      if (!position?.sign) return 'N/A'
      
      const degree = position.degree || 0
      const minute = position.minute || 0
      const sign = language === 'en' ? position.sign : position.sign
      
      return `${sign} ${degree}°${minute.toString().padStart(2, '0')}'`
    }
    
    return `${lang.title}:
- ${lang.sun}: ${formatPosition(astrologyPositions.sun)}
- ${lang.moon}: ${formatPosition(astrologyPositions.moon)}
- ${lang.asc}: ${formatPosition(astrologyPositions.ascendant)}
`
  }
  
  // 构建五行信息
  const buildElementInfo = (calculationResults, language) => {
    if (!calculationResults?.elements?.length) return ''
    
    const labels = {
      zh: { title: "五行分布" },
      ja: { title: "五行分布" },
      en: { title: "Five Elements Distribution" }
    }
    
    const lang = labels[language] || labels.zh
    const elements = calculationResults.elements
    
    const formattedElements = language === 'en' 
      ? elements.map(el => elementMappings[el] || el).join(', ')
      : elements.join('、')
    
    return `${lang.title}: ${formattedElements}
`
  }
  
  // 构建完整的占星上下文
  const buildAstrologyContext = (forceRefresh = false) => {
    const cacheKey = `${userData.value?.birthdate}-${userData.value?.birthHour}-${currentLanguage.value}`
    const now = Date.now()
    
    // 检查缓存
    if (!forceRefresh && contextCache.value[cacheKey] && 
        lastUpdateTime.value && (now - lastUpdateTime.value) < 300000) { // 5分钟缓存
      return contextCache.value[cacheKey]
    }
    
    if (!userData.value || !calculationResults.value) {
      return {
        systemPrompt: buildSystemPrompt(currentLanguage.value),
        userContext: '',
        isValid: false
      }
    }
    
    const language = currentLanguage.value
    const systemPrompt = buildSystemPrompt(language)
    
    let userContext = buildUserBasicInfo(userData.value, language)
    userContext += '\n' + buildBaziInfo(calculationResults.value, language)
    userContext += '\n' + buildWesternAstrologyInfo(calculationResults.value, language)
    userContext += '\n' + buildElementInfo(calculationResults.value, language)
    
    // 添加分析指导
    const analysisGuidance = {
      zh: "\n请基于以上信息，结合生辰八字和西方占星学的原理，为用户提供准确、个性化的占星建议。",
      ja: "\n上記の情報に基づき、生辰八字と西洋占星術の原理を組み合わせて、ユーザーに正確で個別的な占星術アドバイスを提供してください。",
      en: "\nBased on the above information, please combine the principles of BaZi and Western astrology to provide accurate, personalized astrological advice to the user."
    }
    
    userContext += analysisGuidance[language] || analysisGuidance.zh
    
    const context = {
      systemPrompt: `${systemPrompt.role}\n\n${systemPrompt.style}\n\n指导原则:\n${systemPrompt.guidelines.map(g => `- ${g}`).join('\n')}`,
      userContext,
      isValid: true,
      metadata: {
        language,
        generatedAt: new Date().toISOString(),
        userBirthdate: userData.value.birthdate,
        userBirthtime: `${userData.value.birthHour}:${userData.value.birthMinute}`
      }
    }
    
    // 更新缓存
    contextCache.value[cacheKey] = context
    lastUpdateTime.value = now
    
    return context
  }
  
  // 生成建议问题
  const generateSuggestedQuestions = () => {
    const language = currentLanguage.value
    
    const questionTemplates = {
      zh: [
        "根据我的生辰八字，我的性格特点是什么？",
        "我的太阳星座和月亮星座如何影响我的情感生活？",
        "基于我的星盘，什么样的职业最适合我？",
        "我的上升星座对我的外在形象有什么影响？",
        "根据五行分析，我需要注意哪些健康问题？",
        "我的八字中哪些方面最需要平衡？",
        "今年对我来说是什么样的运势？",
        "我应该如何改善我的人际关系？"
      ],
      ja: [
        "私の生辰八字に基づいて、私の性格的特徴は何ですか？",
        "私の太陽星座と月星座は私の感情生活にどのような影響を与えますか？",
        "私の星盤に基づいて、どのようなキャリアが最も適していますか？",
        "私の上昇星座は私の外見的印象にどのような影響を与えますか？",
        "五行分析に基づいて、どのような健康問題に注意すべきですか？",
        "私の八字の中で最もバランスが必要な部分はどこですか？",
        "今年は私にとってどのような運勢ですか？",
        "人間関係をどのように改善すべきでしょうか？"
      ],
      en: [
        "Based on my BaZi chart, what are my personality traits?",
        "How do my Sun and Moon signs influence my emotional life?",
        "What career would be most suitable for me based on my birth chart?",
        "How does my Ascendant sign affect my outward appearance and first impression?",
        "What health issues should I pay attention to based on my Five Elements analysis?",
        "Which aspects of my BaZi chart need the most balancing?",
        "What kind of fortune can I expect this year?",
        "How should I improve my interpersonal relationships?"
      ]
    }
    
    const questions = questionTemplates[language] || questionTemplates.zh
    
    // 随机选择6个问题
    return questions.sort(() => 0.5 - Math.random()).slice(0, 6)
  }
  
  // 验证用户数据完整性
  const validateUserData = () => {
    if (!userData.value) return { isValid: false, error: 'No user data' }
    if (!calculationResults.value) return { isValid: false, error: 'No calculation results' }
    
    const required = ['birthdate', 'birthHour', 'birthMinute', 'birthplace', 'gender']
    for (const field of required) {
      if (!userData.value[field] && userData.value[field] !== 0) {
        return { isValid: false, error: `Missing ${field}` }
      }
    }
    
    return { isValid: true, error: null }
  }
  
  // 清除缓存
  const clearCache = () => {
    contextCache.value = {}
    lastUpdateTime.value = null
  }
  
  return {
    // 数据
    userData,
    calculationResults,
    currentLanguage,
    
    // 方法
    buildAstrologyContext,
    generateSuggestedQuestions,
    validateUserData,
    clearCache,
    
    // 计算属性
    isDataReady: computed(() => {
      const validation = validateUserData()
      return validation.isValid
    }),
    
    contextMetadata: computed(() => {
      if (!userData.value) return null
      
      return {
        hasUserData: !!userData.value,
        hasCalculationResults: !!calculationResults.value,
        language: currentLanguage.value,
        birthInfo: userData.value ? {
          date: userData.value.birthdate,
          time: `${userData.value.birthHour}:${userData.value.birthMinute}`,
          place: userData.value.birthplace
        } : null
      }
    })
  }
}

// 导出单独的工具函数
export const formatAstrologyPosition = (position) => {
  if (!position?.sign) return 'N/A'
  
  const degree = position.degree || 0
  const minute = position.minute || 0
  
  return `${position.sign} ${degree}°${minute.toString().padStart(2, '0')}'`
}

export const formatBaziPillar = (pillar) => {
  if (!pillar?.heavenlyStem || !pillar?.earthlyBranch) return 'N/A'
  
  return `${pillar.heavenlyStem}${pillar.earthlyBranch}`
}