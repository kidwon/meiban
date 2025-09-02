// Cloudflare Worker 代理配置 (安全的 API 调用)
const DEEPSEEK_API_URL = 'https://meiban-deepseek-proxy.kidyuan.workers.dev';
// API key 已安全地存储在 Cloudflare Secrets Store 中，前端无需配置

// 构建占星分析上下文
function buildAstrologyContext(userData, calculationResults, language = 'zh') {
  const languagePrompts = {
    zh: {
      systemRole: "你是一位资深的占星师和命理专家，精通中国传统生辰八字和西方现代占星学。请基于用户的详细星盘信息，结合五行理论、天干地支以及行星星座的精确位置，为用户提供专业、准确、深入的个性化占星分析。",
      instructions: "请用简洁明了的中文回答，避免过于学术化的表达，语气温和专业，给出实用的建议。每次回答控制在200-300字以内。",
      birthInfo: "用户基本信息",
      calculationInfo: "星盘详细数据"
    },
    ja: {
      systemRole: "あなたは中国伝統の生辰八字と西洋現代占星術に精通した資深の占星術師・命理専門家です。ユーザーの詳細な星盤情報、五行理論、天干地支、そして惑星・星座の正確な位置に基づいて、専門的で正確、深い個別占星術分析を提供してください。",
      instructions: "簡潔で分かりやすい日本語で答え、過度に学術的な表現を避け、温かく専門的な口調で実用的なアドバイスを提供してください。回答は200-300文字以内に収めてください。",
      birthInfo: "ユーザー基本情報",
      calculationInfo: "星盤詳細データ"
    },
    en: {
      systemRole: "You are a senior astrologer and numerology expert, specializing in traditional Chinese BaZi (Eight Characters) and modern Western astrology. Based on the user's detailed birth chart information, Five Elements theory, Heavenly Stems and Earthly Branches, and precise planetary positions, provide professional, accurate, and insightful personalized astrological analysis.",
      instructions: "Please respond in clear, accessible English. Avoid overly academic language, maintain a warm and professional tone, and offer practical advice. Keep responses between 200-300 words.",
      birthInfo: "User Basic Information",
      calculationInfo: "Detailed Chart Data"
    }
  };

  const langConfig = languagePrompts[language] || languagePrompts.zh;
  
  let context = `${langConfig.systemRole}\n\n${langConfig.instructions}\n\n`;
  
  if (userData) {
    context += `${langConfig.birthInfo}:\n`;
    context += `- 出生日期: ${userData.birthdate}\n`;
    context += `- 出生时间: ${userData.birthHour}:${userData.birthMinute}\n`;
    context += `- 出生地点: ${userData.birthplace}\n`;
    context += `- 性别: ${userData.gender === 'male' ? '男性' : '女性'}\n\n`;
  }
  
  if (calculationResults) {
    context += `${langConfig.calculationInfo}:\n`;
    
    // 生辰八字信息
    if (calculationResults.eightCharacters) {
      context += `生辰八字:\n`;
      context += `- 年柱: ${calculationResults.eightCharacters.year?.heavenlyStem}${calculationResults.eightCharacters.year?.earthlyBranch}\n`;
      context += `- 月柱: ${calculationResults.eightCharacters.month?.heavenlyStem}${calculationResults.eightCharacters.month?.earthlyBranch}\n`;
      context += `- 日柱: ${calculationResults.eightCharacters.day?.heavenlyStem}${calculationResults.eightCharacters.day?.earthlyBranch}\n`;
      context += `- 时柱: ${calculationResults.eightCharacters.hour?.heavenlyStem}${calculationResults.eightCharacters.hour?.earthlyBranch}\n\n`;
    }
    
    // 西方占星信息
    if (calculationResults.astrologyPositions) {
      context += `西方占星位置:\n`;
      if (calculationResults.astrologyPositions.sun) {
        context += `- 太阳: ${calculationResults.astrologyPositions.sun.sign} ${calculationResults.astrologyPositions.sun.degree}°${calculationResults.astrologyPositions.sun.minute}'\n`;
      }
      if (calculationResults.astrologyPositions.moon) {
        context += `- 月亮: ${calculationResults.astrologyPositions.moon.sign} ${calculationResults.astrologyPositions.moon.degree}°${calculationResults.astrologyPositions.moon.minute}'\n`;
      }
      if (calculationResults.astrologyPositions.ascendant) {
        context += `- 上升星座: ${calculationResults.astrologyPositions.ascendant.sign} ${calculationResults.astrologyPositions.ascendant.degree}°${calculationResults.astrologyPositions.ascendant.minute}'\n`;
      }
      context += '\n';
    }
    
    // 五行信息
    if (calculationResults.elements && calculationResults.elements.length > 0) {
      context += `五行分布: ${calculationResults.elements.join('、')}\n\n`;
    }
  }
  
  return context;
}

// 处理聊天请求 (通过 Cloudflare Worker 代理调用 DeepSeek)
export async function handleChatRequest(messages, userContext) {
  try {

    const { userData, calculationResults, language = 'zh' } = userContext;
    
    // 构建系统上下文
    const systemContext = buildAstrologyContext(userData, calculationResults, language);
    
    // 构建完整的消息数组
    const fullMessages = [
      {
        role: 'system',
        content: systemContext
      },
      ...messages
    ];
    
    // 调用 Cloudflare Worker 代理
    console.log('Calling DeepSeek API via Cloudflare Worker with messages:', fullMessages);
    
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.9,
        stream: true, // 启用流式响应
      }),
    });

    console.log('Cloudflare Worker Response status:', response.status);
    console.log('Cloudflare Worker Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudflare Worker Error response:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText } };
      }
      throw new Error(`API Proxy Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    // 返回一个模拟 Vercel AI SDK 格式的流式响应
    return {
      textStream: createTextStream(response)
    };
    
  } catch (error) {
    console.error('AI Chat API Error:', error);
    throw error;
  }
}

// 创建文本流式响应
async function* createTextStream(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let hasYieldedContent = false;
  
  console.log('开始创建文本流...');
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('读取流完成，hasYieldedContent:', hasYieldedContent);
        break;
      }
      
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      console.log('收到原始数据块:', chunk);
      
      // 处理完整的行
      const lines = buffer.split('\n');
      buffer = lines.pop(); // 保留不完整的最后一行
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue; // 跳过空行
        
        console.log('处理行:', trimmedLine);
        
        if (trimmedLine.startsWith('data: ')) {
          const data = trimmedLine.slice(6); // 移除 "data: " 前缀
          
          console.log('DeepSeek Stream Data:', data);
          
          if (data === '[DONE]') {
            console.log('Stream finished');
            return;
          }
          
          try {
            const parsed = JSON.parse(data);
            console.log('Parsed response:', JSON.stringify(parsed, null, 2));
            
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              console.log('Content chunk:', content);
              hasYieldedContent = true;
              yield content;
            } else if (parsed.choices?.[0]?.delta) {
              console.log('Delta without content:', parsed.choices[0].delta);
            }
          } catch (e) {
            console.error('Failed to parse JSON:', data, e);
            // 尝试作为纯文本处理
            if (data && data !== 'null' && !data.startsWith('{')) {
              console.log('作为纯文本处理:', data);
              hasYieldedContent = true;
              yield data;
            }
          }
        } else if (trimmedLine.startsWith('{')) {
          // 有时候数据可能没有 "data: " 前缀
          try {
            const parsed = JSON.parse(trimmedLine);
            console.log('直接解析JSON:', JSON.stringify(parsed, null, 2));
            
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              console.log('Content chunk (直接解析):', content);
              hasYieldedContent = true;
              yield content;
            }
          } catch (e) {
            console.error('直接解析JSON失败:', trimmedLine, e);
          }
        }
      }
    }
    
    // 处理剩余的buffer
    if (buffer.trim()) {
      console.log('处理剩余buffer:', buffer.trim());
    }
    
  } catch (error) {
    console.error('Stream processing error:', error);
    throw error;
  } finally {
    reader.releaseLock();
  }
}

// 生成建议问题 (针对 DeepSeek 优化的占星学问题)
export function generateSuggestedQuestions(userData, calculationResults, language = 'ja') {
  const suggestions = {
    zh: [
      "根据我的八字和五行配置，分析我的核心性格特质",
      "我的日柱天干地支组合透露了什么命理信息？",
      "结合我的太阳月亮上升，我在感情中会表现出怎样的特点？",
      "基于我的星盘配置，哪些职业领域最能发挥我的天赋？",
      "从五行旺衰角度，我在人际关系中需要注意什么？",
      "我的时柱配置对我的晚年运势有什么指示？",
      "如何根据我的星盘特点制定今年的发展策略？",
      "我的命盘中最大的贵人和阻碍分别是什么？"
    ],
    ja: [
      "私の八字と五行の配置から、核心となる性格特性を分析してください",
      "私の日柱の天干地支の組み合わせはどのような命理情報を示していますか？",
      "私の太陽・月・上昇星座を合わせて、恋愛でどのような特徴を示すでしょうか？",
      "私の星盤配置に基づいて、どの職業分野で最も才能を発揮できますか？",
      "五行の旺衰の観点から、人間関係で注意すべき点は何ですか？",
      "私の時柱の配置は晩年の運勢にどのような示唆を与えていますか？",
      "私の星盤の特徴に基づいて、今年の発展戦略をどう立てればよいですか？",
      "私の命盤で最大の貴人と障害は何ですか？"
    ],
    en: [
      "Analyze my core personality traits based on my BaZi and Five Elements configuration",
      "What numerological insights does my Day Pillar reveal?",
      "How do my Sun, Moon, and Rising signs combine to influence my romantic relationships?",
      "Which career fields would best utilize my talents based on my chart configuration?",
      "From a Five Elements perspective, what should I be mindful of in relationships?",
      "What does my Hour Pillar indicate about my later life fortune?",
      "How should I develop my strategy for this year based on my chart characteristics?",
      "What are the greatest supporters and obstacles in my natal chart?"
    ]
  };
  
  return suggestions[language] || suggestions.ja;
}

// 错误处理函数 (针对 Cloudflare Worker 代理优化)
export function handleAPIError(error, language = 'ja') {
  const errorMessages = {
    zh: {
      network: "网络连接错误，请检查网络设置",
      apiKey: "API服务配置错误，请稍后重试",
      rateLimit: "请求过于频繁，请稍后再试",
      quota: "API配额已用完，请稍后重试",
      serverError: "AI服务暂时不可用，请稍后重试",
      default: "AI服务暂时不可用，请稍后重试"
    },
    ja: {
      network: "ネットワーク接続エラーです。ネットワーク設定をご確認ください",
      apiKey: "APIサービスの設定エラーです。しばらくしてからお試しください",
      rateLimit: "リクエストが頻繁すぎます。しばらくお待ちください",
      quota: "APIクオータが上限に達しました。しばらくしてからお試しください",
      serverError: "AIサービスが一時的に利用できません。しばらくしてからお試しください",
      default: "AIサービスが一時的に利用できません。しばらくしてからお試しください"
    },
    en: {
      network: "Network connection error. Please check your network settings",
      apiKey: "API service configuration error. Please try again later",
      rateLimit: "Too many requests. Please try again later",
      quota: "API quota exceeded. Please try again later",
      serverError: "AI service is temporarily unavailable. Please try again later",
      default: "AI service is temporarily unavailable. Please try again later"
    }
  };
  
  const messages = errorMessages[language] || errorMessages.ja;
  
  // 检查具体的错误类型
  if (error.message?.includes('network') || error.message?.includes('fetch') || error.name === 'NetworkError') {
    return messages.network;
  }
  if (error.message?.includes('API key') || error.message?.includes('401') || error.message?.includes('Unauthorized')) {
    return messages.apiKey;
  }
  if (error.message?.includes('rate limit') || error.message?.includes('429') || error.message?.includes('Too Many Requests')) {
    return messages.rateLimit;
  }
  if (error.message?.includes('quota') || error.message?.includes('billing') || error.message?.includes('insufficient_quota')) {
    return messages.quota;
  }
  if (error.message?.includes('500') || error.message?.includes('502') || error.message?.includes('503') || error.message?.includes('504')) {
    return messages.serverError;
  }
  
  console.error('AI API Error Details:', error);
  return messages.default;
}