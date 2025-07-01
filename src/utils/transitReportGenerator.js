/**
 * 行运分析报告生成器
 * 基于行运数据生成详细的中文分析报告
 */

// 详细的行运解读数据库
const TRANSIT_INTERPRETATIONS = {
  // 外行星影响模板
  outerPlanets: {
    saturn: {
      name: '土星',
      themes: ['责任', '限制', '成熟', '结构', '考验'],
      periods: {
        '1宫': '此时会把注意力从自身转移到事业或者感情生活上，也可能在此时遇到更多的对手；与婚姻或者伴侣之间的关系会出现危机，甚至是分离，要多加注意；同时也会受到关注，以及来自他人和伴侣的嫉妒心，要学会安抚。',
        '7宫': '这是掌管婚姻和伴侣的宫位，当流年土星经过时，如果夫妻二人的感情出现了危机，那么这个宫位也同时掌管着离异。需要在关系中做出重要决定，不要拖延，否则土星会代替你做决定。',
        '10宫': '事业发展的重要时期，可能面临职业转换或承担更大责任，需要建立长期的专业声誉。',
        '4宫': '家庭和居住环境的重要调整期，可能需要承担更多家庭责任或进行房产相关决定。'
      }
    },
    uranus: {
      name: '天王星', 
      themes: ['变革', '突破', '自由', '创新', '反叛'],
      periods: {
        '9宫': '会使你迷恋上旅行，特别是想去那些考验勇气和胆量的地方。可能会被某种宗教深深吸引，在诉讼方面要注意突然的变故，适宜学习高等知识，特别是和计算机、电子或者一些同边缘科学相关的知识。',
        '1宫': '个人形象和自我认知发生重大变化，可能突然改变外貌或生活方式，追求更大的个人自由。',
        '7宫': '人际关系和伙伴关系面临突变，可能遇到不寻常的人或关系，需要在独立与合作间找到平衡。'
      }
    },
    neptune: {
      name: '海王星',
      themes: ['直觉', '精神', '迷惑', '同情', '艺术'],
      periods: {
        '7宫': '在伙伴关系中要避免过度理想化，想通过结婚来帮助对方实在不是什么好方法，不要把那些需要经济援助的人当成你未来的伙伴或伴侣。',
        '1宫': '自我认知可能变得模糊，但直觉力增强，适合从事艺术创作或精神修养。',
        '12宫': '精神世界的深度探索期，可能对宗教、冥想产生兴趣，但要小心逃避现实的倾向。'
      }
    },
    pluto: {
      name: '冥王星',
      themes: ['转化', '重生', '权力', '深度', '极端'],
      periods: {
        '5宫': '会沉迷于赌博、运动、游戏或者其他嗜好，不宜对此过大的投入；有利于与艺术有关的创作活动；会相当重视爱情，且会对爱人有极端的占有欲，从而导致嫉妒；容易对孩子使用暴力，要控制自己。',
        '8宫': '面临深度的心理转化，可能涉及金融、遗产或他人资源的重大变化，是心理重生的时期。',
        '10宫': '事业和社会地位面临根本性变革，可能经历权力斗争，但也有机会获得真正的影响力。'
      }
    }
  },

  // 相位解读模板
  aspects: {
    '月亮拱火星': {
      description: '情感与行动力和谐统一，是开始新项目或表达情感的良好时机。你的直觉与冲动达到平衡，能够果断而不冲动地行动。',
      advice: '信任你的直觉，同时保持适度的行动力。这是处理家庭关系和个人目标的好时期。'
    },
    '水星拱太阳': {
      description: '思维清晰，表达能力强，自我认知与沟通能力达到和谐。这是学习、写作、谈判的绝佳时机。',
      advice: '充分利用这段时间进行重要的沟通、签订合约或制定计划。你的想法能够清晰地传达给他人。'
    },
    '水星刑冥王': {
      description: '思维深度增加但可能过于强迫，容易陷入权力斗争或强迫性思考。需要警惕过度怀疑或控制欲。',
      advice: '避免在这段时间做重要决定，特别是涉及权力或控制的问题。多听取他人意见，避免偏执。'
    },
    '金星拱火星': {
      description: '爱情与激情和谐统一，魅力增强，是开始恋情或改善关系的良好时机。创造力和艺术表现力提升。',
      advice: '这是表达爱意、进行艺术创作或社交活动的绝佳时期。保持自信，展现你的魅力。'
    },
    '土星拱月亮': {
      description: '情感稳定与现实责任达到平衡，能够以成熟的方式处理情感问题。这是建立长期情感基础的好时机。',
      advice: '专注于建立稳定的情感关系和家庭基础。这段时间适合做长期的情感承诺。'
    },
    '土星拱天王星': {
      description: '传统与创新找到平衡点，能够以稳健的方式推进改革。变化将以渐进而非激进的方式进行。',
      advice: '在保持稳定的基础上逐步创新。这是改革和现代化的好时机，但要避免过于激进。'
    },
    '天王星六合月亮': {
      description: '情感与自由意志和谐统一，可能会有突然的情感洞察或关系突破。直觉力增强，对变化的适应力提升。',
      advice: '保持开放的心态接受情感上的新体验。这段时间适合尝试新的生活方式或关系模式。'
    },
    '天王星冲天王星': {
      description: '正在经历天王星对冲，这是人生的重要转折点。过去的反叛精神与当前的稳定需求产生冲突。',
      advice: '这是重新评估人生方向的时期。接受必要的改变，但不要为了改变而改变。寻找稳定与自由的平衡。'
    },
    '海王星拱月亮': {
      description: '直觉与情感达到高度和谐，精神敏感度增强。可能会有深刻的情感或精神体验。',
      advice: '信任你的直觉，但要保持与现实的连接。这是进行艺术创作、冥想或精神修养的好时期。'
    },
    '上升合水星': {
      description: '个人形象与沟通方式密切结合，你的想法和言语能够准确反映你的个性。表达力增强。',
      advice: '这是展现你的思维能力和沟通技巧的好时机。你的话语具有更强的说服力和影响力。'
    },
    '上升六合上升': {
      description: '个人形象与自我认知达到和谐状态，自信心增强，他人对你的印象与你的自我期望一致。',
      advice: '这是建立个人品牌、改善形象或开始新的人际关系的绝佳时期。保持真实的自我表达。'
    }
  },

  // 生命周期解读模板
  lifeCycles: {
    saturn_return_1: {
      title: '第一次土星回归（29-31岁）',
      description: '这是从青年过渡到成年的关键时期。土星要求你承担起真正的成人责任，建立稳固的人生基础。这可能是一个充满挑战但极其重要的转折点。',
      themes: ['成人责任', '人生定向', '基础建立', '成熟成长'],
      advice: '不要逃避责任，勇敢面对生活的挑战。这段时间的努力将为未来30年奠定基础。'
    },
    jupiter_return_3: {
      title: '第三次木星回归（36岁）',
      description: '木星回归带来扩展和成长的机会。这是重新评估人生目标，寻求更高层次发展的时期。可能会有新的学习机会或国际化发展。',
      themes: ['机遇扩展', '视野开阔', '学习成长', '积极进取'],
      advice: '保持开放的心态，积极把握成长机会。这是提升自己、扩大影响力的好时期。'
    },
    saturn_opposition: {
      title: '土星对冲（43-45岁）',
      description: '这是人生中期的重要检验期。你需要在已建立的基础上进行调整，平衡责任与自由，传统与创新。这可能是一个重新定向的时期。',
      themes: ['中期评估', '平衡调整', '重新定向', '智慧积累'],
      advice: '以智慧和耐心面对这个转折期。避免极端的改变，寻求渐进式的调整。'
    }
  }
};

/**
 * 生成完整的行运分析报告
 */
export function generateDetailedTransitReport(transitData, userData) {
  try {
    console.log('📊 开始生成详细行运报告');
    console.log('行运数据:', transitData);
    console.log('用户数据:', userData);
    
    const { age, aspects, currentCycles, outerPlanetAnalysis, transitDate } = transitData;
    
    // 验证输入数据
    if (!transitData || !userData) {
      throw new Error('缺少必要的输入数据');
    }
    
    // 格式化日期的安全函数
    const formatDate = (dateStr) => {
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
          throw new Error('无效日期');
        }
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      } catch (error) {
        console.warn('日期格式化失败:', dateStr, error);
        return '日期格式错误';
      }
    };

    const report = {
      header: {
        title: '个人行运盘深度分析报告',
        user: userData.name || '匿名用户',
        age: age || 0,
        analysisDate: formatDate(transitDate),
        birthDate: formatDate(userData.fullBirthDateTime),
        birthPlace: userData.birthplace || '未知地点'
      },
      
      overview: generateOverview(transitData),
      majorCycles: generateMajorCyclesAnalysis(currentCycles || [], age || 0),
      outerPlanets: generateOuterPlanetReport(outerPlanetAnalysis || {}, age || 0),
      majorAspects: generateMajorAspectsReport((aspects || []).slice(0, 8)),
      lifeGuidance: generateLifeGuidance(transitData, age || 0),
      recommendations: generateDetailedRecommendations(transitData),
      futureOutlook: generateFutureOutlook(age || 0, aspects || [])
    };

    console.log('✅ 详细行运报告生成完成');
    return report;
    
  } catch (error) {
    console.error('❌ 生成详细行运报告失败:', error);
    console.error('错误堆栈:', error.stack);
    
    // 返回默认报告以防止应用崩溃
    return getDefaultTransitReport(userData);
  }
}

/**
 * 生成报告概述
 */
function generateOverview(transitData) {
  try {
    const { age, aspects, currentCycles } = transitData;
    
    let phaseDescription = '';
    if (age >= 42 && age <= 46) {
      phaseDescription = '您正处于人生的重要转换期。外行星的影响正在帮助您深度转化，重新定义人生的意义和方向。';
    } else if (age >= 28 && age <= 32) {
      phaseDescription = '您正在经历土星回归期，这是建立成人基础的关键时期。虽然充满挑战，但也充满机遇。';
    } else if (age >= 35 && age <= 37) {
      phaseDescription = '木星回归带来扩展和成长的能量，这是追求更高目标和拓展视野的良好时期。';
    } else {
      phaseDescription = '您当前处于相对稳定的发展阶段，适合巩固既有成果并为未来的重要变化做准备。';
    }

    const majorAspectsCount = (aspects || []).filter(a => a.intensity === 'strong').length;
    const currentCyclesCount = (currentCycles || []).length;

    return {
      summary: `${age}岁的您正在经历${(aspects || []).length}个重要的行运相位，其中${majorAspectsCount}个为强力相位。${currentCyclesCount > 0 ? `同时正在经历${currentCyclesCount}个重要的生命周期。` : ''}`,
      phaseDescription,
      keyThemes: extractKeyThemes(aspects || [], currentCycles || []),
      intensity: calculateCurrentIntensity(aspects || [], currentCycles || [])
    };
  } catch (error) {
    console.error('生成概述失败:', error);
    return {
      summary: '正在经历人生的重要阶段',
      phaseDescription: '当前处于稳定发展期',
      keyThemes: ['稳定发展'],
      intensity: '温和强度'
    };
  }
}

/**
 * 生成主要周期分析
 */
function generateMajorCyclesAnalysis(currentCycles) {
  try {
    if (!currentCycles || currentCycles.length === 0) {
      return [{
        name: '当前没有主要的生命周期激活',
        progress: 0,
        phase: '稳定期',
        description: '您处于相对平静的发展期，可以专注于日常的成长和积累。',
        themes: ['稳定发展', '技能提升', '基础巩固'],
        advice: '利用这段稳定期完善技能，为即将到来的重要周期做准备。'
      }];
    }

    return currentCycles.map(cycle => {
      const interpretation = TRANSIT_INTERPRETATIONS.lifeCycles[cycle.key];
      return {
        name: cycle.name || '未知周期',
        progress: Math.round((cycle.progress || 0) * 100),
        phase: (cycle.progress || 0) < 0.3 ? '初期' : (cycle.progress || 0) < 0.7 ? '中期' : '后期',
        description: interpretation ? interpretation.description : `正在经历${cycle.name}的重要影响。`,
        themes: interpretation ? interpretation.themes : ['个人成长', '责任承担'],
        advice: interpretation ? interpretation.advice : '专注于这个周期带来的成长机会。'
      };
    });
  } catch (error) {
    console.error('生成周期分析失败:', error);
    return [{
      name: '分析出错',
      progress: 0,
      phase: '未知',
      description: '无法分析当前生命周期',
      themes: ['需要重新分析'],
      advice: '请稍后重试分析'
    }];
  }
}

/**
 * 生成外行星报告
 */
function generateOuterPlanetReport(outerPlanetAnalysis) {
  try {
    const { saturn = [], uranus = [], neptune = [], pluto = [], summary } = outerPlanetAnalysis;
    
    const planetReports = [];

    // 土星影响
    if (saturn.length > 0) {
      planetReports.push({
        planet: '土星',
        theme: '责任与结构重建',
        description: '土星正在要求您承担更多责任，建立更稳固的人生结构。虽然可能感到压力，但这是获得长期成就的重要时期。',
        aspects: saturn.map(formatAspectForReport),
        advice: '耐心面对挑战，专注于建立长期基础。避免走捷径，踏实的努力将带来持久的成果。'
      });
    }

    // 天王星影响  
    if (uranus.length > 0) {
      planetReports.push({
        planet: '天王星',
        theme: '突破与革新',
        description: '天王星带来突破和变革的能量。您可能会突然想要改变现状，追求更大的自由和独立。',
        aspects: uranus.map(formatAspectForReport),
        advice: '拥抱变化，但要避免过于冲动。寻找创新的方式解决旧问题，但保持一定的稳定性。'
      });
    }

    // 海王星影响
    if (neptune.length > 0) {
      planetReports.push({
        planet: '海王星', 
        theme: '精神觉醒与直觉',
        description: '海王星增强您的直觉和精神敏感度。这是艺术创作、精神修养和同理心发展的好时期。',
        aspects: neptune.map(formatAspectForReport),
        advice: '信任您的直觉，但保持与现实的连接。避免过度理想化，在精神追求与实际生活间保持平衡。'
      });
    }

    // 冥王星影响
    if (pluto.length > 0) {
      planetReports.push({
        planet: '冥王星',
        theme: '深度转化与重生', 
        description: '冥王星带来深层的心理转化。您可能会放下旧的模式，经历内在的死亡与重生。',
        aspects: pluto.map(formatAspectForReport),
        advice: '勇敢面对内在的转化过程。释放不再服务于您的旧模式，拥抱新的自我。'
      });
    }

    return {
      summary: summary || { description: '当前外行星影响相对温和，是稳定发展的时期。' },
      planets: planetReports,
      overallTheme: determineOverallTheme(planetReports)
    };
  } catch (error) {
    console.error('生成外行星报告失败:', error);
    return {
      summary: { description: '外行星分析出现错误' },
      planets: [],
      overallTheme: '需要重新分析'
    };
  }
}

/**
 * 生成主要相位报告
 */
function generateMajorAspectsReport(aspects) {
  try {
    return (aspects || []).map(aspect => {
      const key = `${aspect.transitPlanet || '未知'}${aspect.aspect || '未知'}`;
      const interpretation = TRANSIT_INTERPRETATIONS.aspects[key];
      
      return {
        title: `${aspect.transitPlanet || '未知'} ${aspect.aspect || '未知'} ${aspect.natalPlanet || '未知'}`,
        orb: (aspect.orb || 0).toFixed(1),
        intensity: aspect.intensity || 'unknown',
        direction: aspect.applying ? '入相' : '出相',
        description: interpretation ? interpretation.description : generateGenericAspectDescription(aspect),
        advice: interpretation ? interpretation.advice : '关注这个相位带来的能量变化，适当调整生活节奏。',
        timeframe: estimateAspectDuration(aspect),
        keywords: extractAspectKeywords(aspect)
      };
    });
  } catch (error) {
    console.error('生成相位报告失败:', error);
    return [];
  }
}

// 辅助函数们...
function extractKeyThemes(aspects, cycles) {
  try {
    const themes = new Set();
    
    (aspects || []).forEach(aspect => {
      if (aspect.transitPlanet === '土星') themes.add('责任与结构');
      if (aspect.transitPlanet === '木星') themes.add('成长与扩展');
      if (aspect.transitPlanet === '天王星') themes.add('变革与自由');
      if (aspect.transitPlanet === '海王星') themes.add('精神与直觉');
      if (aspect.transitPlanet === '冥王星') themes.add('转化与重生');
    });
    
    (cycles || []).forEach(cycle => {
      if (cycle.key && cycle.key.includes('saturn')) themes.add('责任与成熟');
      if (cycle.key && cycle.key.includes('jupiter')) themes.add('机遇与成长');
    });
    
    return Array.from(themes);
  } catch (error) {
    console.error('提取主题失败:', error);
    return ['稳定发展'];
  }
}

function calculateCurrentIntensity(aspects, cycles) {
  try {
    let intensity = 0;
    intensity += (aspects || []).filter(a => a.intensity === 'strong').length * 3;
    intensity += (aspects || []).filter(a => a.intensity === 'moderate').length * 1;
    intensity += (cycles || []).length * 2;
    
    if (intensity >= 10) return '高强度';
    if (intensity >= 6) return '中等强度';
    return '温和强度';
  } catch (error) {
    console.error('计算强度失败:', error);
    return '未知强度';
  }
}

function formatAspectForReport(aspect) {
  try {
    return {
      description: `${aspect.transitPlanet || '未知'}${aspect.aspect || '未知'}${aspect.natalPlanet || '未知'}`,
      orb: (aspect.orb || 0).toFixed(1),
      interpretation: aspect.interpretation || '这个相位带来重要的能量交流'
    };
  } catch (error) {
    console.error('格式化相位失败:', error);
    return {
      description: '相位信息错误',
      orb: '0.0',
      interpretation: '无法解析相位信息'
    };
  }
}

function determineOverallTheme(planetReports) {
  try {
    if (planetReports.some(p => p.planet === '土星')) return '结构重建与责任承担';
    if (planetReports.some(p => p.planet === '天王星')) return '突破与革新';
    if (planetReports.some(p => p.planet === '海王星')) return '精神觉醒';
    if (planetReports.some(p => p.planet === '冥王星')) return '深度转化';
    return '平稳发展';
  } catch (error) {
    console.error('确定主题失败:', error);
    return '需要重新分析';
  }
}

function generateGenericAspectDescription(aspect) {
  try {
    return `${aspect.transitPlanet || '未知'}与${aspect.natalPlanet || '未知'}形成${aspect.aspect || '未知'}，容许度${(aspect.orb || 0).toFixed(1)}度。这个相位带来相关领域的能量交流。`;
  } catch (error) {
    console.error('生成相位描述失败:', error);
    return '相位描述生成失败';
  }
}

function estimateAspectDuration(aspect) {
  try {
    if (['土星', '天王星', '海王星', '冥王星'].includes(aspect.transitPlanet)) {
      return '3-12个月';
    } else if (aspect.transitPlanet === '木星') {
      return '2-4周';
    } else {
      return '几天到2周';
    }
  } catch (error) {
    console.error('估算相位持续时间失败:', error);
    return '持续时间未知';
  }
}

function extractAspectKeywords(aspect) {
  try {
    const keywords = [];
    if (aspect.aspect === '合相') keywords.push('融合', '开始', '强化');
    if (aspect.aspect === '三分相') keywords.push('和谐', '流动', '支持');
    if (aspect.aspect === '四分相') keywords.push('挑战', '紧张', '成长');
    if (aspect.aspect === '对分相') keywords.push('对立', '平衡', '整合');
    if (aspect.aspect === '六分相') keywords.push('机会', '合作', '调和');
    return keywords;
  } catch (error) {
    console.error('提取关键词失败:', error);
    return ['未知'];
  }
}

// 生成其他部分的函数...
function generateLifeGuidance(transitData, age) {
  try {
    const { aspects, currentCycles } = transitData;
    
    const themes = extractKeyThemes(aspects || [], currentCycles || []);
    const primaryTheme = themes[0] || '稳定发展';
    
    return {
      primaryFocus: primaryTheme,
      currentChallenge: identifyMainChallenge(aspects || []),
      currentOpportunity: identifyMainOpportunity(aspects || []),
      emotionalAdvice: generateEmotionalAdvice(aspects || []),
      practicalAdvice: generatePracticalAdvice(aspects || [], age),
      spiritualAdvice: generateSpiritualAdvice(aspects || [])
    };
  } catch (error) {
    console.error('生成人生指导失败:', error);
    return {
      primaryFocus: '稳定发展',
      currentChallenge: '当前没有特别明显的挑战',
      currentOpportunity: '寻找日常生活中的小机会',
      emotionalAdvice: '保持情绪稳定',
      practicalAdvice: '维持当前的稳定发展',
      spiritualAdvice: '保持对生活意义的思考'
    };
  }
}

function generateDetailedRecommendations(transitData) {
  try {
    const { aspects = [], currentCycles = [], age = 0 } = transitData;
    
    return {
      career: generateCareerRecommendations(aspects, age),
      relationships: generateRelationshipRecommendations(aspects),
      health: generateHealthRecommendations(),
      personal: generatePersonalGrowthRecommendations(aspects, currentCycles),
      financial: generateFinancialRecommendations(aspects),
      timing: generateTimingRecommendations(aspects)
    };
  } catch (error) {
    console.error('生成详细建议失败:', error);
    return {
      career: { focus: '稳定发展', advice: '保持当前状态', timing: '无特殊要求' },
      relationships: { focus: '维护关系', advice: '保持良好沟通', areas: ['现有关系'] },
      health: { physical: '注意健康', mental: '保持心理平衡', emotional: '情绪稳定' },
      personal: { priorities: ['个人发展'], methods: ['学习成长'] },
      financial: { approach: '稳健理财', advice: '保持财务稳定', priority: '风险控制' },
      timing: { bestTiming: '适时而动', avoidTiming: '避免冲动', keyDates: '关注重要时机' }
    };
  }
}

function generateFutureOutlook(age) {
  try {
    return {
      next3Months: '未来三个月重点关注当前激活的相位带来的变化，特别是涉及个人成长和关系调整的部分。',
      next6Months: '未来半年是巩固当前变化成果的时期，建议保持耐心，不要急于求成。',
      nextYear: '明年的发展将建立在今年的基础之上，继续深化当前的转化过程。',
      longTerm: generateLongTermOutlook(age)
    };
  } catch (error) {
    console.error('生成未来展望失败:', error);
    return {
      next3Months: '关注短期变化',
      next6Months: '巩固当前成果',
      nextYear: '继续稳定发展',
      longTerm: '保持长期规划'
    };
  }
}

// 其他辅助函数的基础实现...
function identifyMainChallenge(aspects) {
  const challengingAspects = aspects.filter(a => ['四分相', '对分相'].includes(a.aspect));
  if (challengingAspects.length > 0) {
    const aspect = challengingAspects[0];
    return `${aspect.transitPlanet}${aspect.aspect}${aspect.natalPlanet}带来的挑战需要您积极面对和解决。`;
  }
  return '当前没有特别明显的挑战相位，是相对平稳的时期。';
}

function identifyMainOpportunity(aspects) {
  const positiveAspects = aspects.filter(a => ['三分相', '六分相'].includes(a.aspect));
  if (positiveAspects.length > 0) {
    const aspect = positiveAspects[0];
    return `${aspect.transitPlanet}${aspect.aspect}${aspect.natalPlanet}带来良好的发展机会，要积极把握。`;
  }
  return '寻找日常生活中的小机会，积累成长的基础。';
}

function generateEmotionalAdvice(aspects) {
  const moonAspects = aspects.filter(a => a.natalPlanet === '月亮');
  if (moonAspects.length > 0) {
    return '关注情绪变化，给自己足够的时间处理内在感受。保持情感表达的平衡。';
  }
  return '保持情绪稳定，通过冥想或其他方式增强内在平静。';
}

function generatePracticalAdvice(aspects) {
  const saturnAspects = aspects.filter(a => a.transitPlanet === '土星');
  if (saturnAspects.length > 0) {
    return '制定明确的长期计划，专注于建立稳固的基础。避免急功近利。';
  }
  return '维持当前的稳定发展，适当做一些优化调整。';
}

function generateSpiritualAdvice(aspects) {
  const spiritualPlanets = aspects.filter(a => 
    ['海王星', '冥王星'].includes(a.transitPlanet)
  );
  if (spiritualPlanets.length > 0) {
    return '这是精神成长的重要时期，可以通过冥想、学习或艺术创作来深化内在体验。';
  }
  return '保持对生活意义的思考，通过阅读或学习拓展精神视野。';
}

function generateCareerRecommendations(aspects) {
  const careerPlanets = aspects.filter(a => 
    a.transitPlanet === '土星' || a.natalPlanet === '太阳'
  );
  
  if (careerPlanets.length > 0) {
    return {
      focus: '事业发展的重要时期',
      advice: '专注于长期职业规划，可能面临重要的职业选择或责任增加。',
      timing: '未来6-12个月是关键期'
    };
  }
  
  return {
    focus: '稳定发展期',
    advice: '保持当前工作状态，适当提升专业技能。',
    timing: '无特别紧急的时间要求'
  };
}

function generateRelationshipRecommendations(aspects) {
  const relationshipAspects = aspects.filter(a => 
    a.natalPlanet === '金星' || a.natalPlanet === '月亮' || a.transitPlanet === '金星'
  );
  
  if (relationshipAspects.length > 0) {
    return {
      focus: '人际关系调整期',
      advice: '关注与他人的情感连接，可能需要在关系中做出重要决定。',
      areas: ['亲密关系', '家庭关系', '友情']
    };
  }
  
  return {
    focus: '关系稳定期',
    advice: '维护现有关系，适当扩展社交圈。',
    areas: ['维护现有关系']
  };
}

function generateHealthRecommendations() {
  return {
    physical: '保持规律作息，注意压力管理。',
    mental: '通过适当的放松方式缓解精神压力。',
    emotional: '保持情绪表达的平衡，避免压抑或过度表达。'
  };
}

function generatePersonalGrowthRecommendations(aspects, cycles) {
  const growthAreas = [];
  
  if (aspects.some(a => a.transitPlanet === '木星')) {
    growthAreas.push('学习新技能', '拓展视野');
  }
  if (cycles.some(c => c.key && c.key.includes('saturn'))) {
    growthAreas.push('承担责任', '建立纪律');
  }
  if (aspects.some(a => a.transitPlanet === '天王星')) {
    growthAreas.push('培养创新思维', '增强适应性');
  }
  
  return {
    priorities: growthAreas.length > 0 ? growthAreas : ['保持现有发展轨道'],
    methods: ['阅读学习', '实践体验', '反思总结']
  };
}

function generateFinancialRecommendations(aspects) {
  const saturnAspects = aspects.filter(a => a.transitPlanet === '土星');
  
  if (saturnAspects.length > 0) {
    return {
      approach: '保守稳健',
      advice: '专注于长期财务规划，避免高风险投资。',
      priority: '建立稳固的经济基础'
    };
  }
  
  return {
    approach: '稳中求进',
    advice: '维持现有财务状况，适当进行稳健投资。',
    priority: '财务状况保持稳定'
  };
}

function generateTimingRecommendations(aspects) {
  const strongAspects = aspects.filter(a => a.intensity === 'strong');
  
  return {
    bestTiming: '未来1-3个月是行动的好时机',
    avoidTiming: strongAspects.some(a => a.aspect === '四分相') ? 
      '避免在高压力时期做重大决定' : '无特别需要避免的时期',
    keyDates: '关注每月的新月和满月时期，能量变化较为明显'
  };
}

function generateLongTermOutlook(age) {
  if (age < 30) {
    return '未来几年将是建立人生基础的重要时期，专注于技能发展和关系建立。';
  } else if (age < 45) {
    return '进入人生的重要发展期，事业和家庭将是主要关注点。';
  } else if (age < 60) {
    return '人生经验的积累期，可以考虑承担更多指导和领导的角色。';
  } else {
    return '进入智慧分享期，可以将人生经验传承给年轻一代。';
  }
}

/**
 * 默认报告 - 用于错误处理
 */
function getDefaultTransitReport(userData) {
  return {
    header: {
      title: '个人行运盘深度分析报告',
      user: userData?.name || '匿名用户',
      age: 0,
      analysisDate: '日期错误',
      birthDate: '日期错误',
      birthPlace: userData?.birthplace || '未知地点'
    },
    overview: {
      summary: '分析过程中出现错误，请稍后重试',
      phaseDescription: '无法确定当前阶段',
      keyThemes: ['重新分析'],
      intensity: '未知强度'
    },
    majorCycles: [],
    outerPlanets: {
      summary: { description: '外行星分析失败' },
      planets: [],
      overallTheme: '需要重新分析'
    },
    majorAspects: [],
    lifeGuidance: {
      primaryFocus: '重新分析',
      currentChallenge: '分析系统错误',
      currentOpportunity: '请稍后重试',
      emotionalAdvice: '保持耐心',
      practicalAdvice: '检查输入数据',
      spiritualAdvice: '相信过程'
    },
    recommendations: {
      career: { focus: '请重新分析', advice: '系统错误', timing: '未知' },
      relationships: { focus: '请重新分析', advice: '系统错误', areas: ['未知'] },
      health: { physical: '注意健康', mental: '保持平静', emotional: '耐心等待' },
      personal: { priorities: ['重新分析'], methods: ['检查数据'] },
      financial: { approach: '保持谨慎', advice: '等待重新分析', priority: '数据验证' },
      timing: { bestTiming: '稍后重试', avoidTiming: '避免现在分析', keyDates: '等待修复' }
    },
    futureOutlook: {
      next3Months: '请重新进行分析',
      next6Months: '等待系统修复',
      nextYear: '需要重新计算',
      longTerm: '请联系技术支持'
    }
  };
}

// 导出主要函数
export { 
  TRANSIT_INTERPRETATIONS 
};