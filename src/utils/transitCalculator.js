/**
 * 行运盘计算模块
 * 计算行运行星位置，分析相位关系，生成运势报告
 */

// 正确导入现有模块的函数
import { 
  calculateAstrologyPositions,
  calculateDegreeFromSign,
} from './calculator.js';

// 行星周期数据
const PLANET_CYCLES = {
  sun: { period: 365.25, name: '太阳' },
  moon: { period: 29.53, name: '月亮' },
  mercury: { period: 87.97, name: '水星' },
  venus: { period: 224.7, name: '金星' },
  mars: { period: 686.98, name: '火星' },
  jupiter: { period: 4332.59, name: '木星' }, // 11.86年
  saturn: { period: 10759.22, name: '土星' }, // 29.46年
  uranus: { period: 30688.5, name: '天王星' }, // 84年
  neptune: { period: 60182, name: '海王星' }, // 164.8年
  pluto: { period: 90560, name: '冥王星' }  // 248年
};

// 相位配置
const ASPECT_CONFIG = {
  合相: { angle: 0, orb: 8, intensity: 'strong', type: 'conjunction' },
  六分相: { angle: 60, orb: 4, intensity: 'moderate', type: 'sextile' },
  四分相: { angle: 90, orb: 6, intensity: 'strong', type: 'square' },
  三分相: { angle: 120, orb: 6, intensity: 'strong', type: 'trine' },
  对分相: { angle: 180, orb: 8, intensity: 'strong', type: 'opposition' }
};

// 重要年龄节点配置
const LIFE_CYCLES = {
  saturn_return_1: { age: 29, duration: 2, name: '第一次土星回归' },
  jupiter_return_1: { age: 12, duration: 1, name: '第一次木星回归' },
  jupiter_return_2: { age: 24, duration: 1, name: '第二次木星回归' },
  jupiter_return_3: { age: 36, duration: 1, name: '第三次木星回归' },
  jupiter_return_4: { age: 48, duration: 1, name: '第四次木星回归' },
  saturn_opposition: { age: 44, duration: 2, name: '土星对冲' },
  saturn_return_2: { age: 58, duration: 2, name: '第二次土星回归' }
};

/**
 * 计算两个角度之间的差值
 */
function calculateAngleDifference(angle1, angle2) {
  let diff = Math.abs(angle1 - angle2);
  if (diff > 180) {
    diff = 360 - diff;
  }
  return diff;
}

/**
 * 判断相位是否在容许度范围内
 */
function isAspectValid(actualAngle, aspectAngle, orb) {
  return Math.abs(actualAngle - aspectAngle) <= orb;
}

/**
 * 安全的度数计算函数 - 处理可能的数据格式问题
 */
function safeDegreeCalculation(position) {
  try {
    if (typeof position === 'number') {
      return position;
    }
    
    if (position && typeof position === 'object') {
      // 如果已经有 longitude 属性，直接使用
      if (position.longitude !== undefined) {
        return position.longitude;
      }
      
      // 否则从星座信息计算
      return calculateDegreeFromSign(position);
    }
    
    console.warn('无效的位置数据:', position);
    return 0;
  } catch (error) {
    console.error('度数计算错误:', error, position);
    return 0;
  }
}

/**
 * 计算行运相位
 */
function calculateTransitAspects(natalPositions, transitPositions) {
  const aspects = [];

  try {
    // 遍历行运行星
    Object.keys(transitPositions).forEach(transitPlanet => {
      if (transitPlanet === 'ascendant') return; // 跳过上升点

      const transitPos = transitPositions[transitPlanet];
      const transitDegree = safeDegreeCalculation(transitPos);

      // 遍历本命行星
      Object.keys(natalPositions).forEach(natalPlanet => {
        const natalPos = natalPositions[natalPlanet];
        const natalDegree = safeDegreeCalculation(natalPos);

        const angleDiff = calculateAngleDifference(transitDegree, natalDegree);

        // 检查每种相位
        Object.entries(ASPECT_CONFIG).forEach(([aspectName, aspectData]) => {
          if (isAspectValid(angleDiff, aspectData.angle, aspectData.orb)) {
            aspects.push({
              transitPlanet: PLANET_CYCLES[transitPlanet]?.name || transitPlanet,
              natalPlanet: PLANET_CYCLES[natalPlanet]?.name || natalPlanet,
              aspect: aspectName,
              orb: Math.abs(angleDiff - aspectData.angle),
              intensity: aspectData.intensity,
              type: aspectData.type,
              applying: transitDegree < natalDegree, // 简化判断
              transitSign: transitPos.sign || '未知',
              natalSign: natalPos.sign || '未知'
            });
          }
        });
      });
    });

    // 按容许度排序，精确相位优先
    return aspects.sort((a, b) => a.orb - b.orb);
    
  } catch (error) {
    console.error('计算行运相位时出错:', error);
    return [];
  }
}

/**
 * 计算当前年龄所处的生命周期
 */
function getCurrentLifeCycles(birthDate, analysisDate) {
  try {
    const birthTime = new Date(birthDate).getTime();
    const analysisTime = new Date(analysisDate).getTime();
    const ageInYears = (analysisTime - birthTime) / (1000 * 60 * 60 * 24 * 365.25);

    const currentCycles = [];
    
    Object.entries(LIFE_CYCLES).forEach(([cycleKey, cycleData]) => {
      const cycleStart = cycleData.age - cycleData.duration / 2;
      const cycleEnd = cycleData.age + cycleData.duration / 2;
      
      if (ageInYears >= cycleStart && ageInYears <= cycleEnd) {
        currentCycles.push({
          ...cycleData,
          key: cycleKey,
          progress: (ageInYears - cycleStart) / cycleData.duration
        });
      }
    });

    return currentCycles;
  } catch (error) {
    console.error('计算生命周期时出错:', error);
    return [];
  }
}

/**
 * 根据相位生成解读文本
 */
function generateAspectInterpretation(aspect) {
  const interpretations = {
    // 月亮相位
    '月亮-合相': {
      positive: '情绪和直觉得到强化，是开始新的情感周期的好时机。',
      challenging: '情绪可能较为强烈，需要学会平衡内在感受。'
    },
    '月亮-三分相': {
      positive: '情感流动顺畅，与他人的关系和谐，直觉力增强。',
      challenging: '过度依赖情感判断，可能忽略理性分析。'
    },
    '月亮-四分相': {
      positive: '情感挑战促进内在成长，学会处理复杂情绪。',
      challenging: '情绪波动较大，人际关系可能出现紧张。'
    },

    // 水星相位
    '水星-合相': {
      positive: '思维敏锐，沟通能力增强，学习新事物的好时机。',
      challenging: '思绪过于活跃，可能导致焦虑或决策困难。'
    },
    '水星-三分相': {
      positive: '逻辑思维清晰，表达能力强，适合谈判和学习。',
      challenging: '可能过于理性，忽略情感因素。'
    },

    // 金星相位  
    '金星-合相': {
      positive: '魅力增强，人际关系改善，艺术创造力提升。',
      challenging: '可能过于注重外表或物质享受。'
    },
    '金星-三分相': {
      positive: '爱情运佳，社交活跃，审美品味提升。',
      challenging: '可能过于追求和谐，避免必要冲突。'
    },

    // 土星相位
    '土星-合相': {
      positive: '建立稳固基础，承担重要责任，获得长期成就。',
      challenging: '压力增大，可能感到限制和负担。'
    },
    '土星-三分相': {
      positive: '通过努力获得稳定成果，责任感增强。',
      challenging: '可能过于保守，缺乏冒险精神。'
    },
    '土星-四分相': {
      positive: '通过挑战获得成长，建立更强的自律能力。',
      challenging: '面临重要考验，需要做出艰难决定。'
    },

    // 天王星相位
    '天王星-合相': {
      positive: '突破旧有模式，迎来革命性变化，创新能力强。',
      challenging: '变化来得突然，可能带来不稳定感。'
    },
    '天王星-四分相': {
      positive: '被迫改变促进个人成长，获得新的自由。',
      challenging: '面临突发变故，原有计划可能被打乱。'
    },

    // 海王星相位
    '海王星-合相': {
      positive: '精神觉醒，直觉增强，艺术灵感丰富。',
      challenging: '现实感模糊，可能出现迷惑或逃避。'
    },
    '海王星-三分相': {
      positive: '灵性成长，同理心增强，创造力提升。',
      challenging: '可能过于理想化，忽视现实问题。'
    }
  };

  const key = `${aspect.transitPlanet}-${aspect.aspect}`;
  const interpretation = interpretations[key];
  
  if (!interpretation) {
    return `${aspect.transitPlanet}${aspect.aspect}${aspect.natalPlanet}：这个相位带来重要的能量交流，容许度${aspect.orb.toFixed(1)}度。`;
  }

  // 根据相位类型选择正面或挑战性解读
  const isPositive = ['三分相', '六分相'].includes(aspect.aspect);
  return interpretation[isPositive ? 'positive' : 'challenging'];
}

/**
 * 生成外行星影响分析
 */
function generateOuterPlanetAnalysis(aspects, currentAge) {
  const outerPlanetAspects = aspects.filter(aspect => 
    ['土星', '天王星', '海王星', '冥王星'].includes(aspect.transitPlanet)
  );

  const analysis = {
    saturn: [],
    uranus: [],
    neptune: [],
    pluto: []
  };

  outerPlanetAspects.forEach(aspect => {
    const planetKey = {
      '土星': 'saturn',
      '天王星': 'uranus', 
      '海王星': 'neptune',
      '冥王星': 'pluto'
    }[aspect.transitPlanet];

    if (planetKey) {
      analysis[planetKey].push({
        ...aspect,
        interpretation: generateAspectInterpretation(aspect)
      });
    }
  });

  return {
    ...analysis,
    summary: generateLifePhaseAnalysis(currentAge)
  };
}

/**
 * 生成人生阶段分析
 */
function generateLifePhaseAnalysis(age) {
  if (age >= 42 && age <= 46) {
    return {
      phase: '中年转化期',
      description: '正处于人生的重要转折点，外行星的影响促使您重新评估人生方向和价值观。这是一个深度内省和转化的时期。',
      keyThemes: ['责任与自由的平衡', '内在蜕变', '事业重新定位', '精神觉醒']
    };
  } else if (age >= 28 && age <= 32) {
    return {
      phase: '成年确立期',
      description: '土星回归带来成年责任的确立，这是从青年过渡到成熟成年人的关键时期。',
      keyThemes: ['承担责任', '建立基础', '确立方向', '成熟成长']
    };
  } else if (age >= 35 && age <= 37) {
    return {
      phase: '扩展成长期', 
      description: '木星回归带来新的成长机遇和视野扩展，是追求更高目标的良好时期。',
      keyThemes: ['机遇扩展', '视野开阔', '学习成长', '积极进取']
    };
  } else {
    return {
      phase: '稳定发展期',
      description: '当前处于相对稳定的发展阶段，适合巩固既有成果并为未来做准备。',
      keyThemes: ['稳定发展', '积累经验', '完善技能', '准备机遇']
    };
  }
}

/**
 * 计算完整的行运盘数据
 */
export function calculateTransitChart(birthData, transitDate) {
  try {
    console.log('🌟 开始计算行运盘');
    console.log('出生数据:', birthData);
    console.log('行运日期:', transitDate);

    // 计算本命盘位置
    console.log('📍 计算本命盘位置...');
    const natalPositions = calculateAstrologyPositions(birthData);
    console.log('本命盘位置:', natalPositions);
    
    // 计算行运盘位置
    console.log('📍 计算行运盘位置...');
    const transitUserData = {
      ...birthData,
      fullBirthDateTime: transitDate
    };
    const transitPositions = calculateAstrologyPositions(transitUserData);
    console.log('行运盘位置:', transitPositions);

    // 计算年龄
    const birthTime = new Date(birthData.fullBirthDateTime);
    const transitTime = new Date(transitDate);
    const ageInYears = (transitTime - birthTime) / (1000 * 60 * 60 * 24 * 365.25);
    console.log('当前年龄:', ageInYears);

    // 计算相位
    console.log('📍 计算相位关系...');
    const aspects = calculateTransitAspects(natalPositions, transitPositions);
    console.log('相位关系:', aspects);

    // 获取当前生命周期
    console.log('📍 分析生命周期...');
    const currentCycles = getCurrentLifeCycles(birthData.fullBirthDateTime, transitDate);
    console.log('当前生命周期:', currentCycles);

    // 生成外行星分析
    console.log('📍 生成外行星分析...');
    const outerPlanetAnalysis = generateOuterPlanetAnalysis(aspects, ageInYears);
    console.log('外行星分析:', outerPlanetAnalysis);

    const result = {
      birthData,
      transitDate,
      age: Math.floor(ageInYears),
      natalPositions,
      transitPositions,
      aspects: aspects.slice(0, 10), // 取前10个最重要的相位
      currentCycles,
      outerPlanetAnalysis,
      metadata: {
        calculationTime: new Date().toISOString(),
        aspectCount: aspects.length,
        majorAspects: aspects.filter(a => a.intensity === 'strong').length
      }
    };

    console.log('✅ 行运盘计算完成');
    return result;

  } catch (error) {
    console.error('❌ 行运盘计算失败:', error);
    console.error('错误堆栈:', error.stack);
    throw new Error(`行运盘计算失败: ${error.message}`);
  }
}

/**
 * 生成行运报告文本
 */
export function generateTransitReport(transitData) {
  try {
    const { age, aspects, currentCycles, outerPlanetAnalysis } = transitData;
    
    const report = {
      summary: `${age}岁的行运分析显示了${aspects.length}个重要相位正在发生作用。`,
      currentPhase: outerPlanetAnalysis.summary,
      majorAspects: aspects.slice(0, 5).map(aspect => ({
        title: `${aspect.transitPlanet} ${aspect.aspect} ${aspect.natalPlanet}`,
        description: generateAspectInterpretation(aspect),
        orb: aspect.orb,
        intensity: aspect.intensity
      })),
      lifeCycles: currentCycles.map(cycle => ({
        name: cycle.name,
        progress: Math.round(cycle.progress * 100),
        description: `正在经历${cycle.name}，完成度${Math.round(cycle.progress * 100)}%`
      })),
      recommendations: generateRecommendations(transitData)
    };

    return report;
  } catch (error) {
    console.error('生成行运报告失败:', error);
    throw error;
  }
}

/**
 * 生成建议
 */
function generateRecommendations(transitData) {
  try {
    const { aspects } = transitData;
    const recommendations = [];

    // 基于主要相位的建议
    const majorAspects = aspects.filter(a => a.intensity === 'strong').slice(0, 3);
    
    majorAspects.forEach(aspect => {
      if (aspect.transitPlanet === '土星') {
        recommendations.push({
          area: '责任与结构',
          advice: '这是建立长期基础的重要时期，虽然可能面临压力，但坚持下去会有稳固的收获。',
          timeframe: '未来6-12个月'
        });
      } else if (aspect.transitPlanet === '木星') {
        recommendations.push({
          area: '成长与机遇',
          advice: '积极把握扩展机会，这是学习新技能和拓展视野的良好时机。',
          timeframe: '未来3-6个月'
        });
      } else if (aspect.transitPlanet === '天王星') {
        recommendations.push({
          area: '变化与创新',
          advice: '拥抱变化，不要抗拒突如其来的转变，它们可能带来意想不到的机遇。',
          timeframe: '未来1-2年'
        });
      }
    });

    return recommendations;
  } catch (error) {
    console.error('生成建议失败:', error);
    return [];
  }
}

// 导出配置常量
export { PLANET_CYCLES, ASPECT_CONFIG, LIFE_CYCLES };