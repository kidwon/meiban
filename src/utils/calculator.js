/**
 * 八字命盘计算工具
 * 这是一个简化版的八字计算工具，用于演示目的
 * 实际应用中需要更复杂的天干地支对照表和算法
 */

// 天干表
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支表
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行与天干的对应关系
const STEM_TO_ELEMENT = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 五行与地支的对应关系
const BRANCH_TO_ELEMENT = {
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '申': '金', '酉': '金',
  '亥': '水', '子': '水',
  '辰': '土', '戌': '土',
  '丑': '土', '未': '土',
};

// 月份与地支的对应关系
const MONTH_TO_BRANCH = {
  1: '丑', 2: '寅', 3: '卯',
  4: '辰', 5: '巳', 6: '午',
  7: '未', 8: '申', 9: '酉',
  10: '戌', 11: '亥', 12: '子'
};

// 小时与地支的对应关系
const HOUR_TO_BRANCH = {
  23: '子', 0: '子', 
  1: '丑', 2: '丑',
  3: '寅', 4: '寅',
  5: '卯', 6: '卯',
  7: '辰', 8: '辰',
  9: '巳', 10: '巳',
  11: '午', 12: '午',
  13: '未', 14: '未',
  15: '申', 16: '申',
  17: '酉', 18: '酉',
  19: '戌', 20: '戌',
  21: '亥', 22: '亥'
};

/**
 * 计算八字
 * @param {Object} birthData - 出生数据
 * @param {string} birthData.fullBirthDateTime - ISO格式的出生日期时间
 * @returns {Object} - 八字计算结果
 */
export function calculateEightCharacters(birthData) {
  try {
    const birthDate = new Date(birthData.fullBirthDateTime);
    
    // 提取年、月、日、时
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1; // JavaScript月份从0开始
    const day = birthDate.getDate();
    const hour = birthDate.getHours();
    
    // 计算年柱
    // 年干 = (年份 - 4) % 10
    const yearStemIndex = (year - 4) % 10;
    const yearStem = HEAVENLY_STEMS[yearStemIndex];
    
    // 年支 = (年份 - 4) % 12
    const yearBranchIndex = (year - 4) % 12;
    const yearBranch = EARTHLY_BRANCHES[yearBranchIndex];
    
    // 月柱（简化，实际需考虑节气）
    const monthBranch = MONTH_TO_BRANCH[month];
    // 月干采用简化算法，实际应基于节气和八字干支学
    // 甲己年 丙寅月起始
    // 乙庚年 戊寅月起始
    // 丙辛年 庚寅月起始
    // 丁壬年 壬寅月起始
    // 戊癸年 甲寅月起始
    let monthStemBase;
    if (yearStemIndex === 0 || yearStemIndex === 5) monthStemBase = 2; // 甲己年
    else if (yearStemIndex === 1 || yearStemIndex === 6) monthStemBase = 4; // 乙庚年
    else if (yearStemIndex === 2 || yearStemIndex === 7) monthStemBase = 6; // 丙辛年
    else if (yearStemIndex === 3 || yearStemIndex === 8) monthStemBase = 8; // 丁壬年
    else monthStemBase = 0; // 戊癸年
    
    const monthStemIndex = (monthStemBase + month - 1) % 10;
    const monthStem = HEAVENLY_STEMS[monthStemIndex];
    
    // 日柱（简化算法，实际需要更复杂的计算）
    // 这里使用一个简化的方法来模拟，实际上需要干支纪日表
    const baseDate = new Date(1900, 0, 1); // 1900年1月1日是甲子日
    const dayDiff = Math.floor((birthDate - baseDate) / (24 * 60 * 60 * 1000));
    const dayStemIndex = dayDiff % 10;
    const dayBranchIndex = dayDiff % 12;
    const dayStem = HEAVENLY_STEMS[dayStemIndex];
    const dayBranch = EARTHLY_BRANCHES[dayBranchIndex];
    
    // 时柱
    const hourBranch = HOUR_TO_BRANCH[hour];
    // 时干根据日干推算
    const hourStemBase = (dayStemIndex % 5) * 2;
    // 子时（23:00-01:00）对应的干支序号
    const baseHourIndex = 0;
    // 当前时辰在一天中的序号
    let currentHourIndex;
    if (hour >= 23 || hour < 1) currentHourIndex = 0; // 子时
    else if (hour < 3) currentHourIndex = 1; // 丑时
    else if (hour < 5) currentHourIndex = 2; // 寅时
    else if (hour < 7) currentHourIndex = 3; // 卯时
    else if (hour < 9) currentHourIndex = 4; // 辰时
    else if (hour < 11) currentHourIndex = 5; // 巳时
    else if (hour < 13) currentHourIndex = 6; // 午时
    else if (hour < 15) currentHourIndex = 7; // 未时
    else if (hour < 17) currentHourIndex = 8; // 申时
    else if (hour < 19) currentHourIndex = 9; // 酉时
    else if (hour < 21) currentHourIndex = 10; // 戌时
    else currentHourIndex = 11; // 亥时
    
    const hourStemIndex = (hourStemBase + currentHourIndex) % 10;
    const hourStem = HEAVENLY_STEMS[hourStemIndex];
    
    // 计算五行
    const elements = [
      STEM_TO_ELEMENT[yearStem],
      STEM_TO_ELEMENT[monthStem],
      STEM_TO_ELEMENT[dayStem],
      STEM_TO_ELEMENT[hourStem],
      BRANCH_TO_ELEMENT[yearBranch],
      BRANCH_TO_ELEMENT[monthBranch],
      BRANCH_TO_ELEMENT[dayBranch],
      BRANCH_TO_ELEMENT[hourBranch]
    ];
    
    // 去重五行
    const uniqueElements = [...new Set(elements)];
    
    // 返回八字结果
    return {
      eightCharacters: {
        year: { heavenlyStem: yearStem, earthlyBranch: yearBranch },
        month: { heavenlyStem: monthStem, earthlyBranch: monthBranch },
        day: { heavenlyStem: dayStem, earthlyBranch: dayBranch },
        hour: { heavenlyStem: hourStem, earthlyBranch: hourBranch }
      },
      elements: uniqueElements,
      // 这里可以添加更多的分析结果
    };
  } catch (error) {
    console.error('八字计算出错:', error);
    return null;
  }
}

/**
 * 简单命运分析（演示用）
 * @param {Object} eightCharResult - 八字计算结果
 * @param {Object} userData - 用户输入数据
 * @returns {Object} - 运势分析结果
 */
export function analyzeFortune(eightCharResult, userData) {
  if (!eightCharResult) return null;
  
  // 这是一个非常简化的示例，实际分析会更加复杂
  const elements = eightCharResult.elements;
  
  // 检查五行是否平衡
  const hasWood = elements.includes('木');
  const hasFire = elements.includes('火');
  const hasEarth = elements.includes('土');
  const hasMetal = elements.includes('金');
  const hasWater = elements.includes('水');
  
  const balanceScore = [hasWood, hasFire, hasEarth, hasMetal, hasWater].filter(Boolean).length;
  
  // 根据平衡度设定总体运势
  let overview = '普通';
  if (balanceScore >= 4) {
    overview = '大吉';
  } else if (balanceScore === 3) {
    overview = '吉';
  } else if (balanceScore <= 2) {
    overview = '凶';
  }
  
  // 根据性别和五行简单分析具体运势（仅为演示）
  const gender = userData.gender;
  let career = '★★★☆☆';
  let wealth = '★★★☆☆';
  let love = '★★★☆☆';
  let health = '★★★☆☆';
  
  // 简单示例：男性金水组合利于事业，女性火土组合利于财富等
  if (gender === 'male') {
    if (hasMetal && hasWater) career = '★★★★★';
    if (hasWood && hasFire) wealth = '★★★★☆';
    if (hasEarth && hasFire) love = '★★★★☆';
    if (hasWater && hasWood) health = '★★★★★';
  } else {
    if (hasFire && hasEarth) career = '★★★★☆';
    if (hasMetal && hasWater) wealth = '★★★★★';
    if (hasWood && hasWater) love = '★★★★★';
    if (hasEarth && hasMetal) health = '★★★★☆';
  }
  
  return {
    overview,
    career,
    wealth,
    love,
    health
  };
}

/**
 * 完整命盘计算与分析
 * @param {Object} userData - 用户输入数据
 * @returns {Object} - 完整计算结果
 */
export function calculateFullFortune(userData) {
  // 计算八字
  const eightCharResult = calculateEightCharacters(userData);
  
  // 分析运势
  const fortuneResult = analyzeFortune(eightCharResult, userData);
  
  // 合并结果
  return {
    ...eightCharResult,
    fortune: fortuneResult
  };
}

export default {
  calculateEightCharacters,
  analyzeFortune,
  calculateFullFortune
};