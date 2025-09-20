/**
 * 占星详细分析服务 - 根据用户的具体星座动态生成分析内容
 * src/services/astrologyAnalysisService.js
 */

import { getTranslation } from '../i18n/index.js';

/**
 * 生成本地化的分析标题
 * @param {string} type - 分析类型 (sun, moon, ascendant, etc.)
 * @param {string} signName - 星座名称（可选）
 * @param {string} language - 语言代码
 * @returns {string} 本地化的标题
 */
function generateLocalizedTitle(type, signName = null, language = 'ja') {
  if (signName) {
    // 有星座名称时使用模板
    const template = getTranslation(`astrology.titleTemplates.${type}`, language);
    if (template) {
      const translatedSign = getTranslation(`astrology.signNames.${signName}`, language) || signName;
      return template.replace('{sign}', translatedSign);
    }
  }
  
  // 没有星座名称或模板不存在时使用备用标题
  return getTranslation(`astrology.titleTemplates.fallback.${type}`, language) || 
         `${type} Analysis`;
}

/**
 * 星座名称映射 - 将计算系统的中文名称映射到标准英文名称
 */
const SIGN_MAPPING = {
  '白羊座': 'aries',
  '金牛座': 'taurus', 
  '双子座': 'gemini',
  '巨蟹座': 'cancer',
  '狮子座': 'leo',
  '处女座': 'virgo',
  '天秤座': 'libra',
  '天蝎座': 'scorpio',
  '射手座': 'sagittarius',
  '摩羯座': 'capricorn',
  '水瓶座': 'aquarius',
  '双鱼座': 'pisces'
};

/**
 * 行星名称映射（备用，可能在未来版本中使用）
 */
const PLANET_MAPPING = {
  'sun': '太阳',
  'moon': '月亮',
  'ascendant': '上升',
  'mercury': '水星',
  'venus': '金星',
  'mars': '火星',
  'jupiter': '木星',
  'saturn': '土星',
  'midheaven': '中天'
};

// 导出以供其他模块使用
export { PLANET_MAPPING };

/**
 * 将星座名称转换为标准英文名称
 */
function normalizeSignName(sign) {
  if (!sign) {
    console.warn('⚠️ normalizeSignName: 输入星座名称为空');
    return '';
  }

  const normalized = SIGN_MAPPING[sign];
  if (!normalized) {
    console.warn('⚠️ normalizeSignName: 未找到星座映射', {
      输入: sign,
      可用映射: Object.keys(SIGN_MAPPING)
    });
    return sign.toLowerCase();
  }

  return normalized;
}

/**
 * 生成太阳星座分析（核心人格）
 */
export function generateSunSignAnalysis(astrologyPositions, language = 'ja') {
  if (!astrologyPositions?.sun?.sign) {
    return {
      title: '太阳星座｜核心人格',
      advantages: '专注、坚韧、具有独特的个人魅力。',
      risks: '可能过于固执或缺乏灵活性。',
      actions: '保持开放心态，学会适应变化。'
    };
  }

  const sunSign = normalizeSignName(astrologyPositions.sun.sign);
  const signName = astrologyPositions.sun.sign;
  
  const baseKey = `astrology.detailed.sun.${sunSign}`;
  
  return {
    title: generateLocalizedTitle('sun', signName, language),
    advantages: getTranslation(`${baseKey}.advantages`, language) || `${signName}具有独特的优势特质。`,
    risks: getTranslation(`${baseKey}.risks`, language) || `需要注意${signName}的潜在风险。`,
    actions: getTranslation(`${baseKey}.actions`, language) || `发挥${signName}的正面特质。`
  };
}

/**
 * 生成月亮星座分析（情绪与依恋）
 */
export function generateMoonSignAnalysis(astrologyPositions, language = 'ja') {
  if (!astrologyPositions?.moon?.sign) {
    return {
      title: '月亮星座｜情绪与依恋',
      description: '情绪表达具有独特的方式和需求。',
      triggers: '在特定情况下可能出现情绪波动。',
      actions: '学会理解和管理自己的情绪模式。'
    };
  }

  const moonSign = normalizeSignName(astrologyPositions.moon.sign);
  const signName = astrologyPositions.moon.sign;
  
  const baseKey = `astrology.detailed.moon.${moonSign}`;
  
  return {
    title: generateLocalizedTitle('moon', signName, language),
    description: getTranslation(`${baseKey}.description`, language) || `月亮${signName}具有独特的情绪表达方式。`,
    triggers: getTranslation(`${baseKey}.triggers`, language) || `在某些情况下可能触发强烈的情绪反应。`,
    actions: getTranslation(`${baseKey}.actions`, language) || `建立健康的情绪表达模式。`
  };
}

/**
 * 生成上升星座分析（第一印象与人设）
 */
export function generateAscendantAnalysis(astrologyPositions, language = 'ja') {
  if (!astrologyPositions?.ascendant?.sign) {
    return {
      title: '上升星座｜第一印象与人设',
      impression: '给他人留下独特而深刻的第一印象。',
      risks: '可能在某些情况下产生误解。',
      actions: '充分发挥个人魅力和优势。'
    };
  }

  const ascSign = normalizeSignName(astrologyPositions.ascendant.sign);
  const signName = astrologyPositions.ascendant.sign;
  
  const baseKey = `astrology.detailed.ascendant.${ascSign}`;
  
  return {
    title: generateLocalizedTitle('ascendant', signName, language),
    impression: getTranslation(`${baseKey}.impression`, language) || `上升${signName}给人留下独特的第一印象。`,
    risks: getTranslation(`${baseKey}.risks`, language) || `可能出现的形象误区。`,
    actions: getTranslation(`${baseKey}.actions`, language) || `优化个人形象和表达方式。`
  };
}

/**
 * 生成水星分析（思考与沟通）
 */
export function generateMercuryAnalysis(astrologyPositions, language = 'zh') {
  const mercury = astrologyPositions?.mercury;
  
  if (!mercury?.sign) {
    return {
      title: getTranslation('astrology.titleTemplates.mercury', language) || '水星｜思考与沟通',
      description: getTranslation('astrology.detailed.mercury.default.description', language) || '具有独特的思考和沟通风格。',
      risks: getTranslation('astrology.detailed.mercury.default.risks', language) || '在表达上可能存在一些障碍。',
      techniques: getTranslation('astrology.detailed.mercury.default.techniques', language) || '培养清晰有效的沟通技巧。'
    };
  }

  const signName = mercury.sign;
  const normalizedSign = normalizeSignName(signName);
  const baseKey = `astrology.detailed.mercury.${normalizedSign}`;
  
  return {
    title: generateLocalizedTitle('mercury', signName, language),
    thinking: getTranslation(`${baseKey}.thinking`, language) || `水星${signName}的思维特质独特。`,
    communication: getTranslation(`${baseKey}.communication`, language) || `善于用${signName}的方式表达想法。`,
    learning: getTranslation(`${baseKey}.learning`, language) || `具有特定的学习风格和信息处理方式。`
  };
}

/**
 * 生成金星关系分析
 */
export function generateVenusRelationshipAnalysis(astrologyPositions, language = 'ja') {
  const venus = astrologyPositions?.venus;
  
  if (!venus?.sign) {
    return {
      title: '金星｜关系与价值观',
      description: '在关系中有独特的价值观和表达方式。',
      approach: '建立健康平衡的关系模式。'
    };
  }

  const venusSign = normalizeSignName(venus.sign);
  const signName = venus.sign;
  
  const baseKey = `astrology.detailed.venus.${venusSign}`;
  
  return {
    title: generateLocalizedTitle('venus', signName, language),
    description: getTranslation(`${baseKey}.relationships`, language) || `金星${signName}在关系中的独特表现。`,
    approach: getTranslation(`${baseKey}.approach`, language) || '建立稳定和谐的关系。'
  };
}

/**
 * 生成火星行动分析
 */
export function generateMarsActionAnalysis(astrologyPositions, language = 'ja') {
  const mars = astrologyPositions?.mars;
  
  if (!mars?.sign) {
    return {
      title: '火星｜行动风格',
      strengths: '具有独特的行动力和执行风格。',
      risks: '在行动上可能存在冲动性。',
      actions: '培养理性和高效的行动模式。'
    };
  }

  const marsSign = normalizeSignName(mars.sign);
  const signName = mars.sign;
  
  const baseKey = `astrology.detailed.mars.${marsSign}`;
  
  return {
    title: generateLocalizedTitle('mars', signName, language),
    strengths: getTranslation(`${baseKey}.strengths`, language) || `火星${signName}的行动优势。`,
    risks: getTranslation(`${baseKey}.risks`, language) || '需要注意的行动风险。',
    actions: getTranslation(`${baseKey}.actions`, language) || '优化行动策略。'
  };
}

/**
 * 生成木星分析（扩展与成长）
 */
export function generateJupiterAnalysis(astrologyPositions, language = 'ja') {
  const jupiter = astrologyPositions?.jupiter;
  
  if (!jupiter?.sign) {
    return {
      title: '木星｜扩展与成长',
      strengths: '具有独特的成长潜力和扩展能力。',
      opportunities: '在某些领域有突出的发展机会。',
      guidance: '抓住成长机遇，发挥天赋潜能。'
    };
  }

  const jupiterSign = normalizeSignName(jupiter.sign);
  const signName = jupiter.sign;
  
  const baseKey = `astrology.detailed.jupiter.${jupiterSign}`;
  
  // 调试信息
  console.log('木星分析调试信息:', {
    language,
    signName,
    jupiterSign,
    baseKey,
    strengthsKey: `${baseKey}.strengths`,
    strengthsValue: getTranslation(`${baseKey}.strengths`, language)
  });
  
  return {
    title: generateLocalizedTitle('jupiter', signName, language),
    strengths: getTranslation(`${baseKey}.strengths`, language) || `木星${signName}具有独特的扩展能力和成长潜力。`,
    opportunities: getTranslation(`${baseKey}.opportunities`, language) || '在学习、旅行和智慧拓展方面有良好机遇。',
    guidance: getTranslation(`${baseKey}.guidance`, language) || '保持乐观心态，善用天赋，持续成长。'
  };
}

/**
 * 生成土星分析（约束与责任）
 */
export function generateSaturnAnalysis(astrologyPositions, language = 'ja') {
  const saturn = astrologyPositions?.saturn;
  
  if (!saturn?.sign) {
    return {
      title: '土星｜约束与责任',
      challenges: '面临独特的人生课题和挑战。',
      lessons: '需要学习承担责任和面对困难。',
      growth: '通过克服挑战获得成长和智慧。'
    };
  }

  const saturnSign = normalizeSignName(saturn.sign);
  const signName = saturn.sign;
  
  const baseKey = `astrology.detailed.saturn.${saturnSign}`;
  
  return {
    title: generateLocalizedTitle('saturn', signName, language),
    challenges: getTranslation(`${baseKey}.challenges`, language) || `土星${signName}需要面对的人生课题和挑战。`,
    lessons: getTranslation(`${baseKey}.lessons`, language) || '需要学习耐心、坚持和面对困难的勇气。',
    growth: getTranslation(`${baseKey}.growth`, language) || '通过努力和坚持获得成长，建立稳固基础。'
  };
}

/**
 * 生成天王星分析（变革与创新）
 */
export function generateUranusAnalysis(astrologyPositions, language = 'ja') {
  const uranus = astrologyPositions?.uranus;
  
  if (!uranus?.sign) {
    return {
      title: '天王星｜变革与创新',
      innovations: '具有独特的创新思维和变革能力。',
      independence: '追求个性化和独立自主的生活方式。',
      guidance: '善用创新天赋，引领时代潮流。'
    };
  }

  const uranusSign = normalizeSignName(uranus.sign);
  const signName = uranus.sign;
  
  const baseKey = `astrology.detailed.uranus.${uranusSign}`;
  
  return {
    title: generateLocalizedTitle('uranus', signName, language),
    innovations: getTranslation(`${baseKey}.innovations`, language) || `天王星${signName}具有独特的创新思维和变革能力。`,
    independence: getTranslation(`${baseKey}.independence`, language) || '追求独立自主，不喜欢被传统束缚。',
    guidance: getTranslation(`${baseKey}.guidance`, language) || '发挥原创性思维，勇于引领变革。'
  };
}

/**
 * 生成海王星分析（直觉与灵性）
 */
export function generateNeptuneAnalysis(astrologyPositions, language = 'ja') {
  const neptune = astrologyPositions?.neptune;
  
  if (!neptune?.sign) {
    return {
      title: '海王星｜直觉与灵性',
      intuition: '具有敏锐的直觉和感知能力。',
      dreams: '拥有丰富的想象力和艺术天赋。',
      guidance: '相信内在智慧，保持心灵纯净。'
    };
  }

  const neptuneSign = normalizeSignName(neptune.sign);
  const signName = neptune.sign;
  
  const baseKey = `astrology.detailed.neptune.${neptuneSign}`;
  
  return {
    title: generateLocalizedTitle('neptune', signName, language),
    intuition: getTranslation(`${baseKey}.intuition`, language) || `海王星${signName}具有敏锐的直觉和精神感知能力。`,
    dreams: getTranslation(`${baseKey}.dreams`, language) || '拥有丰富想象力和艺术创造力。',
    guidance: getTranslation(`${baseKey}.guidance`, language) || '平衡理想与现实，相信内在智慧。'
  };
}

/**
 * 生成冥王星分析（转化与重生）
 */
export function generatePlutoAnalysis(astrologyPositions, language = 'ja') {
  const pluto = astrologyPositions?.pluto;
  
  if (!pluto?.sign) {
    return {
      title: '冥王星｜转化与重生',
      transformation: '具有深层的转化和重生能力。',
      power: '拥有强大的内在力量和洞察力。',
      guidance: '勇敢面对内心深处，实现真正蜕变。'
    };
  }

  const plutoSign = normalizeSignName(pluto.sign);
  const signName = pluto.sign;
  
  const baseKey = `astrology.detailed.pluto.${plutoSign}`;
  
  return {
    title: generateLocalizedTitle('pluto', signName, language),
    transformation: getTranslation(`${baseKey}.transformation`, language) || `冥王星${signName}具有深层的转化和重生能力。`,
    power: getTranslation(`${baseKey}.power`, language) || '拥有强大的内在力量和洞察力。',
    guidance: getTranslation(`${baseKey}.guidance`, language) || '勇敢面对内心深处，实现真正蜕变。'
  };
}

/**
 * 生成北交点分析（人生方向与灵魂使命）
 */
export function generateNorthNodeAnalysis(astrologyPositions, language = 'ja') {
  const northNode = astrologyPositions?.trueNode;
  
  if (!northNode?.sign) {
    return {
      title: '北交点｜人生方向与灵魂使命',
      purpose: '具有独特的人生使命和发展方向。',
      growth: '需要在某些方面实现成长和突破。',
      guidance: '朝着灵魂渴望的方向前进。'
    };
  }

  const nodeSign = normalizeSignName(northNode.sign);
  const signName = northNode.sign;
  
  const baseKey = `astrology.detailed.northNode.${nodeSign}`;
  
  return {
    title: generateLocalizedTitle('northNode', signName, language),
    purpose: getTranslation(`${baseKey}.purpose`, language) || `北交点${signName}的人生使命。`,
    growth: getTranslation(`${baseKey}.growth`, language) || '需要发展的生命课题。',
    guidance: getTranslation(`${baseKey}.guidance`, language) || '跟随内心指引，实现灵魂成长。'
  };
}

/**
 * 生成中天事业分析
 */
export function generateCareerAnalysis(astrologyPositions, language = 'ja') {
  const midheaven = astrologyPositions?.midheaven;


  // 使用本地化的默认值而不是硬编码的中文
  let title = getTranslation('astrology.titleTemplates.fallback.midheaven', language) || 'Career Direction111';
  let direction = getTranslation('astrology.career.default.direction', language) || '具有独特的事业发展潜力。';
  let advantages = getTranslation('astrology.career.default.advantages', language) || '在职业道路上有天赋优势。';
  let suggestions = getTranslation('astrology.career.default.suggestions', language) || '发挥专业能力，建立声誉。';

  if (midheaven?.sign) {

    try {
      const mcSign = normalizeSignName(midheaven.sign);

      // 验证映射结果
      if (!mcSign || mcSign === '') {
        throw new Error(`星座名称映射失败: ${midheaven.sign}`);
      }

      title = generateLocalizedTitle('midheaven', midheaven.sign, language);

      const baseKey = `astrology.detailed.midheaven.${mcSign}`;

      const careerTranslation = getTranslation(`${baseKey}.career`, language);
      const advantagesTranslation = getTranslation(`${baseKey}.advantages`, language);
      const suggestionsTranslation = getTranslation(`${baseKey}.suggestions`, language);




      direction = careerTranslation || `中天${midheaven.sign}的事业方向。`;
      advantages = advantagesTranslation || '职业优势明显。';
      suggestions = suggestionsTranslation || '制定长期职业规划。';


    } catch (error) {
      // 保持默认值不变
    }
  } else {

    // 提供更详细的调试信息
    if (midheaven) {
      console.log('🔍 中天对象存在但缺少sign属性:', Object.keys(midheaven));
    } else {
      console.log('🔍 完整缺少中天数据');
    }
  }

  const result = {
    title,
    direction,
    advantages,
    suggestions
  };

  return result;
}


/**
 * 生成完整的占星详细分析
 */
export function generateDetailedAstrologyAnalysis(astrologyPositions, language = 'ja') {
  if (!astrologyPositions) {
    return [];
  }

  const analyses = [];
  
  // 太阳星座分析
  analyses.push({
    type: 'sun',
    ...generateSunSignAnalysis(astrologyPositions, language)
  });
  
  // 月亮星座分析
  analyses.push({
    type: 'moon',
    ...generateMoonSignAnalysis(astrologyPositions, language)
  });
  
  // 上升星座分析
  analyses.push({
    type: 'ascendant',
    ...generateAscendantAnalysis(astrologyPositions, language)
  });
  
  // 水星分析
  analyses.push({
    type: 'mercury',
    ...generateMercuryAnalysis(astrologyPositions, language)
  });
  
  // 木星分析
  analyses.push({
    type: 'jupiter',
    ...generateJupiterAnalysis(astrologyPositions, language)
  });
  
  // 土星分析
  analyses.push({
    type: 'saturn',
    ...generateSaturnAnalysis(astrologyPositions, language)
  });
  
  // 天王星分析
  analyses.push({
    type: 'uranus',
    ...generateUranusAnalysis(astrologyPositions, language)
  });
  
  // 海王星分析
  analyses.push({
    type: 'neptune',
    ...generateNeptuneAnalysis(astrologyPositions, language)
  });
  
  // 冥王星分析
  analyses.push({
    type: 'pluto',
    ...generatePlutoAnalysis(astrologyPositions, language)
  });
  
  // 北交点分析
  analyses.push({
    type: 'northNode',
    ...generateNorthNodeAnalysis(astrologyPositions, language)
  });
  
  // 金星关系分析
  analyses.push({
    type: 'venus',
    ...generateVenusRelationshipAnalysis(astrologyPositions, language)
  });
  
  // 火星行动分析
  analyses.push({
    type: 'mars',
    ...generateMarsActionAnalysis(astrologyPositions, language)
  });
  
  // 中天分析
  analyses.push({
    type: 'midheaven',
    ...generateCareerAnalysis(astrologyPositions, language)
  });

  return analyses;
}