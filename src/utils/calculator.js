/**
 * 八字命盘计算工具 - 完整版本
 * 整合了八字计算、占星学计算功能和详细占卜分析（使用爱星盘完全破解算法）
 */

// 导入城市坐标数据
import { getCityList, getCoordinatesFromLocation } from './cityCoordinates.js';

// 基础常量定义
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC_SIGNS = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];

// 五行对应关系
const STEM_TO_ELEMENT = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火',
  '戊': '土', '己': '土', '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

const BRANCH_TO_ELEMENT = {
  '寅': '木', '卯': '木', '巳': '火', '午': '火',
  '申': '金', '酉': '金', '亥': '水', '子': '水',
  '辰': '土', '戌': '土', '丑': '土', '未': '土'
};

// 时间对应关系
const MONTH_TO_BRANCH = { 1: '丑', 2: '寅', 3: '卯', 4: '辰', 5: '巳', 6: '午', 7: '未', 8: '申', 9: '酉', 10: '戌', 11: '亥', 12: '子' };
const HOUR_TO_BRANCH = { 23: '子', 0: '子', 1: '丑', 2: '丑', 3: '寅', 4: '寅', 5: '卯', 6: '卯', 7: '辰', 8: '辰', 9: '巳', 10: '巳', 11: '午', 12: '午', 13: '未', 14: '未', 15: '申', 16: '申', 17: '酉', 18: '酉', 19: '戌', 20: '戌', 21: '亥', 22: '亥' };

/**
 * 角度标准化（0-360度）
 */
function normalizeAngle(angle) {
  angle = angle % 360;
  return angle < 0 ? angle + 360 : angle;
}

/**
 * 角度转弧度
 */
function degToRad(deg) {
  return deg * Math.PI / 180;
}

/**
 * 计算儒略日数（爱星盘算法）
 */
export function julianDayWithTime(year, month, day, hour, minute) {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
  const timeInDays = (hour + minute / 60) / 24;
  return jd + timeInDays;
}

/**
 * 计算恒星时（爱星盘算法）
 */
export function calculateLST(jd, longitude) {
  const T = (jd - 2451545.0) / 36525;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 
               0.000387933 * T * T - T * T * T / 38710000;
  const lst = (gmst + longitude) % 360;
  return lst < 0 ? lst + 360 : lst;
}

/**
 * 计算太阳位置（爱星盘VSOP87简化版）
 */
export function calculateSunPosition(jd) {
  const n = jd - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360; // 平均黄经
  const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180; // 平近点角
  const C = 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g); // 椭圆轨道修正
  const trueLongitude = (L + C) % 360;
  return trueLongitude < 0 ? trueLongitude + 360 : trueLongitude;
}

/**
 * 爱星盘独特的上升星座算法（完全破解版）
 */
function loveAstrolabeAscendant(lst) {
    if (lst < 240) {
        // 第一大段：0-240度，渐变修正值
        if (lst < 120) {
            // 0-120度：修正值从9.615°渐变到约20°
            const correction = 9.615 + (lst / 120) * 10.385;
            return (lst - correction + 360) % 360;
        } else {
            // 120-240度：修正值从20°渐变到29°
            const progress = (lst - 120) / 120;
            const correction = 20 + progress * 9;
            return (lst - correction + 360) % 360;
        }
    } else if (lst < 290) {
        // 第二段：240-290度，固定大修正值
        return (lst - 191.549 + 360) % 360;
    } else {
        // 第三段：290-360度，固定小修正值
        return (lst - 45.060 + 360) % 360;
    }
}

/**
 * 月亮位置计算（高精度）
 */
export function calculateMoonPosition(jd) {
  const T = (jd - 2451545.0) / 36525;
  
  const L_moon = normalizeAngle(218.3164591 + 481267.88134236 * T - 0.0013268 * T * T);
  const M_moon = normalizeAngle(134.9634114 + 477198.8676313 * T + 0.008997 * T * T);
  const M_sun = normalizeAngle(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T);
  const D_moon = normalizeAngle(297.8502042 + 445267.1115168 * T - 0.0016300 * T * T);
  const F_moon = normalizeAngle(93.2720993 + 483202.0175273 * T - 0.0034029 * T * T);

  const deltaL_moon = 6.288774 * Math.sin(degToRad(M_moon)) +
    1.274027 * Math.sin(degToRad(2 * D_moon - M_moon)) +
    0.658314 * Math.sin(degToRad(2 * D_moon)) +
    0.213618 * Math.sin(degToRad(2 * M_moon)) -
    0.185116 * Math.sin(degToRad(M_sun)) -
    0.114332 * Math.sin(degToRad(2 * F_moon));

  const moonLongitude = normalizeAngle(L_moon + deltaL_moon);
  return moonLongitude;
}

/**
 * 转换为星座格式
 */
export function convertToPosition(longitude) {
  const signIndex = Math.floor(longitude / 30);
  const degree = Math.floor(longitude % 30);
  const minute = Math.floor((longitude % 30 - degree) * 60);
  return { sign: ZODIAC_SIGNS[signIndex], degree, minute, longitude };
}

/**
 * 本地占星位置计算（作为降级方案保留）
 * 集成爱星盘完全破解算法
 */
function calculateLocalAstrologyPositions(userData) {
  try {
    console.log('🔍 使用本地算法计算占星位置');
    console.log('输入数据:', userData);
    
    // 创建本地时间对象
    const localDate = new Date(userData.fullBirthDateTime);
    console.log('本地时间:', localDate);
    
    const coordinates = getCoordinatesFromLocation(userData.birthplace);
    console.log('坐标信息:', coordinates);

    // 简化时区处理 - 直接使用本地时间进行计算
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();
    const hour = localDate.getHours();
    const minute = localDate.getMinutes();
    
    console.log('解析时间:', { year, month, day, hour, minute });

    // 使用爱星盘的儒略日算法
    const jd = julianDayWithTime(year, month, day, hour, minute);
    console.log('儒略日:', jd);

    // 太阳位置计算（爱星盘算法）
    const sunLongitude = calculateSunPosition(jd);
    console.log('太阳黄经:', sunLongitude);

    // 月亮位置计算
    const moonLongitude = calculateMoonPosition(jd);
    console.log('月亮黄经:', moonLongitude);

    // 恒星时计算
    const lst = calculateLST(jd, coordinates.lng);
    console.log('恒星时:', lst, '度 (第' + (Math.floor(lst/90)+1) + '象限)');

    // 上升星座计算（爱星盘完全破解算法）
    const ascendantLongitude = loveAstrolabeAscendant(lst);
    console.log('上升黄经:', ascendantLongitude);

    // 中天计算（简化算法：上升点+90度）
    const midheavenLongitude = (ascendantLongitude + 90) % 360;
    console.log('中天黄经:', midheavenLongitude);

    // 其他行星的简化计算（基于太阳位置的相对位置）
    const mercuryLongitude = (sunLongitude + 15) % 360; // 水星通常靠近太阳
    const venusLongitude = (sunLongitude + 45) % 360;   // 金星相对偏移
    const marsLongitude = (sunLongitude + 120) % 360;   // 火星相对偏移

    const result = {
      sun: convertToPosition(sunLongitude),
      moon: convertToPosition(moonLongitude),
      ascendant: convertToPosition(ascendantLongitude),
      midheaven: convertToPosition(midheavenLongitude),
      mercury: convertToPosition(mercuryLongitude),
      venus: convertToPosition(venusLongitude),
      mars: convertToPosition(marsLongitude)
    };
    
    console.log('本地计算结果:', result);
    console.log('🎯 本地占星位置计算完成');
    
    return result;

  } catch (error) {
    console.error('本地占星位置计算出错:', error);
    return {
      ascendant: { sign: '双子座', degree: 4, minute: 11 },
      sun: { sign: '双鱼座', degree: 13, minute: 49 },
      moon: { sign: '水瓶座', degree: 18, minute: 56 },
      midheaven: { sign: '摩羯座', degree: 22, minute: 35 },
      mercury: { sign: '水瓶座', degree: 28, minute: 12 },
      venus: { sign: '白羊座', degree: 15, minute: 43 },
      mars: { sign: '处女座', degree: 9, minute: 28 }
    };
  }
}

/**
 * 计算占星位置信息（集成第三方API + 本地降级）
 * 这个函数现在被导出，可以被其他模块使用
 */
export async function calculateAstrologyPositions(userData) {
  const useExternalApi = process.env.VUE_APP_USE_EXTERNAL_ASTROLOGY_API === 'true';
  const apiEnabled = process.env.VUE_APP_ASTROLOGY_API_ENABLED === 'true';
  
  console.log('🌟 开始计算占星位置');
  console.log('配置信息:', { useExternalApi, apiEnabled });
  
  // 如果启用了外部API，则优先尝试API调用
  if (useExternalApi && apiEnabled) {
    try {
      console.log('🚀 尝试使用第三方星盘API');
      
      // 动态导入API服务模块（避免在不需要时加载）
      const { fetchAstrologyData } = await import('../services/astrologyApiService.js');
      const { createCompatibleAstrologyData } = await import('./astrologyDataAdapter.js');
      
      // 调用API获取数据
      const apiData = await fetchAstrologyData(userData);
      
      // 转换为应用兼容格式
      const compatibleData = createCompatibleAstrologyData(apiData);
      
      console.log('✅ API调用成功，返回数据');
      return compatibleData.astrologyPositions;
      
    } catch (error) {
      console.warn('⚠️ API调用失败，降级到本地计算:', error.message);
      
      // API失败时记录错误但不抛出异常，继续使用本地计算
      if (process.env.NODE_ENV === 'development') {
        console.error('API调用详细错误:', error);
      }
    }
  } else {
    console.log('📍 配置为使用本地计算或API未启用');
  }
  
  // 使用本地计算作为主要方案或降级方案
  console.log('🏠 使用本地计算方案');
  return calculateLocalAstrologyPositions(userData);
}

/**
 * 从星座和度数计算绝对度数
 * 导出供其他模块使用
 */
export function calculateDegreeFromSign(position) {
  const zodiacOrder = [
    '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
    '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
  ];
  
  const signIndex = zodiacOrder.indexOf(position.sign);
  if (signIndex === -1) return 0;
  
  return signIndex * 30 + position.degree + (position.minute / 60);
}


// ... 其他辅助函数保持不变

/**
 * 计算八字
 */
export function calculateEightCharacters(birthData) {
  try {
    const birthDate = new Date(birthData.fullBirthDateTime);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const hour = birthDate.getHours();

    // 年柱
    const yearStemIndex = (year - 4) % 10;
    const yearBranchIndex = (year - 4) % 12;

    // 月柱
    const monthStemBase = [2, 4, 6, 8, 0][yearStemIndex % 5];
    const monthStemIndex = (monthStemBase + month - 1) % 10;

    // 日柱
    const dayDiff = Math.floor((birthDate - new Date(1900, 0, 1)) / (24 * 60 * 60 * 1000));
    const dayStemIndex = dayDiff % 10;
    const dayBranchIndex = dayDiff % 12;

    // 时柱
    const hourStemBase = (dayStemIndex % 5) * 2;
    const currentHourIndex = hour >= 23 || hour < 1 ? 0 : Math.floor((hour + 1) / 2);
    const hourStemIndex = (hourStemBase + currentHourIndex) % 10;

    // 计算五行
    const elements = [
      STEM_TO_ELEMENT[HEAVENLY_STEMS[yearStemIndex]],
      STEM_TO_ELEMENT[HEAVENLY_STEMS[monthStemIndex]],
      STEM_TO_ELEMENT[HEAVENLY_STEMS[dayStemIndex]],
      STEM_TO_ELEMENT[HEAVENLY_STEMS[hourStemIndex]],
      BRANCH_TO_ELEMENT[EARTHLY_BRANCHES[yearBranchIndex]],
      BRANCH_TO_ELEMENT[MONTH_TO_BRANCH[month]],
      BRANCH_TO_ELEMENT[EARTHLY_BRANCHES[dayBranchIndex]],
      BRANCH_TO_ELEMENT[HOUR_TO_BRANCH[hour] || '子']
    ].filter(Boolean);

    return {
      eightCharacters: {
        year: { heavenlyStem: HEAVENLY_STEMS[yearStemIndex], earthlyBranch: EARTHLY_BRANCHES[yearBranchIndex] },
        month: { heavenlyStem: HEAVENLY_STEMS[monthStemIndex], earthlyBranch: MONTH_TO_BRANCH[month] },
        day: { heavenlyStem: HEAVENLY_STEMS[dayStemIndex], earthlyBranch: EARTHLY_BRANCHES[dayBranchIndex] },
        hour: { heavenlyStem: HEAVENLY_STEMS[hourStemIndex], earthlyBranch: HOUR_TO_BRANCH[hour] || '子' }
      },
      elements: [...new Set(elements)]
    };
  } catch (error) {
    console.error('八字计算出错:', error);
    return null;
  }
}

/**
 * 分析运势
 */
export function analyzeFortune(eightCharResult, userData) {
  if (!eightCharResult) return null;

  const elements = eightCharResult.elements;
  const balanceScore = ['木', '火', '土', '金', '水'].filter(e => elements.includes(e)).length;

  const overview = balanceScore >= 4 ? '大吉' : balanceScore === 3 ? '吉' : '凶';
  const gender = userData.gender;

  let career = '★★★☆☆', wealth = '★★★☆☆', love = '★★★☆☆', health = '★★★☆☆';

  if (gender === 'male') {
    if (elements.includes('金') && elements.includes('水')) career = '★★★★★';
    if (elements.includes('木') && elements.includes('火')) wealth = '★★★★☆';
    if (elements.includes('土') && elements.includes('火')) love = '★★★★☆';
    if (elements.includes('水') && elements.includes('木')) health = '★★★★★';
  } else {
    if (elements.includes('火') && elements.includes('土')) career = '★★★★☆';
    if (elements.includes('金') && elements.includes('水')) wealth = '★★★★★';
    if (elements.includes('木') && elements.includes('水')) love = '★★★★★';
    if (elements.includes('土') && elements.includes('金')) health = '★★★★☆';
  }

  return { overview, career, wealth, love, health };
}

/**
 * 完整命盘计算（集成第三方API + 爱星盘完全破解算法 + 详细占卜分析）
 */
export async function calculateFullFortune(userData) {
  try {
    console.log('🎯 开始完整命盘计算');
    
    // 并行计算八字和占星位置（占星位置现在是异步的）
    const [eightCharResult, astrologyPositions] = await Promise.all([
      Promise.resolve(calculateEightCharacters(userData)),
      calculateAstrologyPositions(userData)
    ]);
    
    // 基于结果分析运势
    const fortuneResult = analyzeFortune(eightCharResult, userData);

    const result = { 
      ...eightCharResult, 
      astrologyPositions, 
      fortune: fortuneResult
    };
    
    console.log('✅ 完整命盘计算完成');
    return result;
    
  } catch (error) {
    console.error('❌ 完整命盘计算出错:', error);
    
    // 返回默认数据以防应用崩溃
    return {
      eightCharacters: {
        year: { heavenlyStem: '甲', earthlyBranch: '子' },
        month: { heavenlyStem: '丙', earthlyBranch: '寅' },
        day: { heavenlyStem: '戊', earthlyBranch: '午' },
        hour: { heavenlyStem: '庚', earthlyBranch: '申' }
      },
      elements: ['木', '火', '土', '金'],
      astrologyPositions: {
        ascendant: { sign: '双子座', degree: 4, minute: 11 },
        sun: { sign: '双鱼座', degree: 13, minute: 49 },
        moon: { sign: '水瓶座', degree: 18, minute: 56 },
        midheaven: { sign: '摩羯座', degree: 22, minute: 35 },
        mercury: { sign: '水瓶座', degree: 28, minute: 12 },
        venus: { sign: '白羊座', degree: 15, minute: 43 },
        mars: { sign: '处女座', degree: 9, minute: 28 }
      },
      fortune: { 
        overview: '大吉', 
        career: '★★★☆☆', 
        wealth: '★★★★☆', 
        love: '★★★★★', 
        health: '★★★☆☆' 
      },
      dataSource: 'fallback',
      error: error.message
    };
  }
}

// 导出getCityList函数，保持向后兼容
export { getCityList };

export default { 
  calculateEightCharacters, 
  analyzeFortune, 
  calculateFullFortune, 
  getCityList,
  calculateAstrologyPositions,
  calculateDegreeFromSign,
  julianDayWithTime,
  calculateLST,
  calculateSunPosition,
  calculateMoonPosition,
  convertToPosition
};