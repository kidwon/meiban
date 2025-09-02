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
function generateLocalizedTitle(type, signName = null, language = 'ja', extraData = null) {
  if (type === 'mercury-midheaven' && extraData) {
    // Mercury-Midheaven 组合特殊处理
    const template = getTranslation(`astrology.titleTemplates.mercury-midheaven`, language);
    if (template && extraData.mercury && extraData.midheaven) {
      const translatedMercury = getTranslation(`astrology.signNames.${extraData.mercury}`, language) || extraData.mercury;
      const translatedMidheaven = getTranslation(`astrology.signNames.${extraData.midheaven}`, language) || extraData.midheaven;
      return template.replace('{mercury}', translatedMercury).replace('{midheaven}', translatedMidheaven);
    }
  } else if (signName) {
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
// eslint-disable-next-line no-unused-vars
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

/**
 * 将星座名称转换为标准英文名称
 */
function normalizeSignName(sign) {
  return SIGN_MAPPING[sign] || sign.toLowerCase();
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
 * 生成水星 × 中天分析（思考与沟通）
 */
export function generateMercuryMidheavenAnalysis(astrologyPositions, language = 'ja') {
  const mercury = astrologyPositions?.mercury;
  const midheaven = astrologyPositions?.midheaven;
  
  let title = generateLocalizedTitle('mercury-midheaven', null, language);
  let description = '具有独特的思考和沟通风格。';
  let risks = '在表达上可能存在一些障碍。';
  let techniques = '培养清晰有效的沟通技巧。';

  if (mercury?.sign && midheaven?.sign) {
    const mercurySign = normalizeSignName(mercury.sign);
    const midheavenSign = normalizeSignName(midheaven.sign);
    
    title = generateLocalizedTitle('mercury-midheaven', null, language, { mercury: mercury.sign, midheaven: midheaven.sign });
    
    const mercuryKey = `astrology.detailed.mercury.${mercurySign}`;
    const midheavenKey = `astrology.detailed.midheaven.${midheavenSign}`;
    
    description = getTranslation(`${mercuryKey}.communication`, language) || 
                 getTranslation(`${midheavenKey}.expression`, language) || 
                 '思考深入，表达多元化。';
    
    risks = getTranslation(`${mercuryKey}.risks`, language) || '沟通中可能出现误解。';
    techniques = getTranslation(`${mercuryKey}.techniques`, language) || '运用结构化的表达方式。';
  }

  return {
    title,
    description,
    risks,
    techniques
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
 * 生成中天事业分析
 */
export function generateCareerAnalysis(astrologyPositions, language = 'ja') {
  const midheaven = astrologyPositions?.midheaven;
  // eslint-disable-next-line no-unused-vars
  const jupiter = astrologyPositions?.jupiter;
  // eslint-disable-next-line no-unused-vars
  const saturn = astrologyPositions?.saturn;
  
  let title = '事业走向';
  let direction = '具有独特的事业发展潜力。';
  let advantages = '在职业道路上有天赋优势。';
  let suggestions = '发挥专业能力，建立声誉。';

  if (midheaven?.sign) {
    const mcSign = normalizeSignName(midheaven.sign);
    title = generateLocalizedTitle('career', midheaven.sign, language);
    
    const baseKey = `astrology.detailed.midheaven.${mcSign}`;
    direction = getTranslation(`${baseKey}.career`, language) || `中天${midheaven.sign}的事业方向。`;
    advantages = getTranslation(`${baseKey}.advantages`, language) || '职业优势明显。';
    suggestions = getTranslation(`${baseKey}.suggestions`, language) || '制定长期职业规划。';
  }

  return {
    title,
    direction,
    advantages,
    suggestions
  };
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
  
  // 水星 × 中天分析
  analyses.push({
    type: 'mercury-midheaven',
    ...generateMercuryMidheavenAnalysis(astrologyPositions, language)
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
  
  // 中天事业分析
  analyses.push({
    type: 'career',
    ...generateCareerAnalysis(astrologyPositions, language)
  });

  return analyses;
}