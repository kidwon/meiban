/**
 * 占星数据服务 - 统一管理占星相关的数据和描述
 * src/services/astrologyDataService.js
 */

import { getTranslation } from '../i18n/index.js';

/**
 * 星座名称映射 - 从计算系统的中文名称映射到i18n键
 */
const ZODIAC_NAME_MAPPING = {
  // 中文计算系统名称 -> i18n键名称
  '白羊座': {
    ja: '牡羊座',
    zh: '白羊座', 
    en: 'aries'
  },
  '金牛座': {
    ja: '牡牛座',
    zh: '金牛座',
    en: 'taurus'
  },
  '双子座': {
    ja: '双子座',
    zh: '双子座',
    en: 'gemini'
  },
  '巨蟹座': {
    ja: '蟹座',
    zh: '巨蟹座',
    en: 'cancer'
  },
  '狮子座': {
    ja: '獅子座',
    zh: '狮子座',
    en: 'leo'
  },
  '处女座': {
    ja: '乙女座',
    zh: '处女座',
    en: 'virgo'
  },
  '天秤座': {
    ja: '天秤座',
    zh: '天秤座',
    en: 'libra'
  },
  '天蝎座': {
    ja: '蠍座',
    zh: '天蝎座',
    en: 'scorpio'
  },
  '射手座': {
    ja: '射手座',
    zh: '射手座',
    en: 'sagittarius'
  },
  '摩羯座': {
    ja: '山羊座',
    zh: '摩羯座',
    en: 'capricorn'
  },
  '水瓶座': {
    ja: '水瓶座',
    zh: '水瓶座',
    en: 'aquarius'
  },
  '双鱼座': {
    ja: '魚座',
    zh: '双鱼座',
    en: 'pisces'
  }
};

/**
 * 将计算系统的星座名称转换为适合特定语言的i18n键名称
 * @param {string} calculatedSignName - 计算系统返回的星座名称（中文）
 * @param {string} language - 目标语言
 * @returns {string} 转换后的星座名称
 */
function mapZodiacName(calculatedSignName, language = 'ja') {
  const mapping = ZODIAC_NAME_MAPPING[calculatedSignName];
  return mapping ? mapping[language] : calculatedSignName;
}

/**
 * 获取星座描述
 * @param {string} planetType - 行星类型 (sun, moon, ascendant)
 * @param {string} sign - 星座名称（计算系统返回的中文名称）
 * @param {string} language - 语言代码 (ja, zh, en)
 * @returns {string} 描述内容
 */
export function getSignDescription(planetType, sign, language = 'ja') {
  // 将计算系统的星座名称转换为适合目标语言的名称
  const mappedSign = mapZodiacName(sign, language);
  const key = `astrology.signs.descriptions.${planetType}.${mappedSign}`;
  return getTranslation(key, language) || `您的${planetType}星座展現獨特的特質。`;
}

/**
 * 获取事业优势描述
 * @param {Object} astrologyPositions - 占星位置数据
 * @param {string} language - 语言代码
 * @returns {string} 事业优势描述
 */
export function getCareerStrengths(astrologyPositions, language = 'ja') {
  if (!astrologyPositions || !astrologyPositions.sun) return '您具有獨特的職業優勢。';
  
  const sunSign = astrologyPositions.sun.sign;
  const mappedSign = mapZodiacName(sunSign, language);
  const key = `astrology.career.strengths.${mappedSign}`;
  return getTranslation(key, language) || '您具有獨特的職業優勢。';
}

/**
 * 获取建议职业列表
 * @param {Object} astrologyPositions - 占星位置数据
 * @param {string} language - 语言代码
 * @returns {Array} 职业建议数组
 */
export function getSuggestedCareers(astrologyPositions, language = 'ja') {
  if (!astrologyPositions || !astrologyPositions.sun) return ['待發掘'];
  
  const sunSign = astrologyPositions.sun.sign;
  const mappedSign = mapZodiacName(sunSign, language);
  const key = `astrology.career.suggestions.${mappedSign}`;
  return getTranslation(key, language) || ['待發掘'];
}

/**
 * 获取爱情描述
 * @param {Object} astrologyPositions - 占星位置数据
 * @param {string} language - 语言代码
 * @returns {string} 爱情描述
 */
export function getLoveDescription(astrologyPositions, language = 'ja') {
  if (!astrologyPositions || !astrologyPositions.moon) return '您在愛情中有獨特的表達方式。';
  
  const moonSign = astrologyPositions.moon.sign;
  const mappedSign = mapZodiacName(moonSign, language);
  const key = `astrology.relationships.love.${mappedSign}`;
  return getTranslation(key, language) || '您在愛情中有獨特的表達方式。';
}

/**
 * 获取友谊描述
 * @param {Object} astrologyPositions - 占星位置数据
 * @param {string} language - 语言代码
 * @returns {string} 友谊描述
 */
export function getFriendshipDescription(astrologyPositions, language = 'ja') {
  if (!astrologyPositions || !astrologyPositions.ascendant) return '您在友誼中展現獨特的魅力。';
  
  const ascSign = astrologyPositions.ascendant.sign;
  const mappedSign = mapZodiacName(ascSign, language);
  const key = `astrology.relationships.friendship.${mappedSign}`;
  return getTranslation(key, language) || '您在友誼中展現獨特的魅力。';
}

/**
 * 获取相容星座
 * @param {string} sunSign - 太阳星座（计算系统返回的中文名称）
 * @param {string} language - 语言代码
 * @returns {Array} 相容星座数组
 */
export function getCompatibleSigns(sunSign, language = 'ja') {
  const mappedSign = mapZodiacName(sunSign, language);
  const key = `astrology.relationships.compatibility.${mappedSign}`;
  return getTranslation(key, language) || ['待發現'];
}

/**
 * 获取运势总体描述
 * @param {Object} fortune - 运势数据
 * @param {string} language - 语言代码
 * @returns {string} 运势描述
 */
export function getFortuneDescription(fortune, language = 'ja') {
  if (!fortune || !fortune.overview) return '您的運勢有其獨特的發展軌跡。';
  
  const key = `astrology.fortune.overview.${fortune.overview}`;
  return getTranslation(key, language) || '您的運勢有其獨特的發展軌跡。';
}

/**
 * 获取行星关键词
 * @param {string} planetType - 行星类型
 * @param {string} language - 语言代码
 * @returns {Array} 关键词数组
 */
export function getPlanetKeywords(planetType, language = 'ja') {
  const key = `astrology.planetKeywords.${planetType}`;
  return getTranslation(key, language) || [];
}

import { getCoordinatesFromLocation } from '../utils/cityCoordinates.js';

/**
 * 格式化出生信息
 * @param {Object} userData - 用户数据
 * @returns {Object} 格式化的出生信息对象
 */
export function formatBirthInfo(userData) {
  if (!userData) return { basic: '', location: '', lunar: '', full: '' };
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };
  
  const formatTime = (hour, minute) => {
    const h = String(hour || '00').padStart(2, '0');
    const m = String(minute || '00').padStart(2, '0');
    return `${h}:${m}`;
  };
  
  const formatCoordinates = (latitude, longitude) => {
    if (!latitude || !longitude) return '';
    const lat = parseFloat(latitude).toFixed(4);
    const lng = parseFloat(longitude).toFixed(4);
    const latDir = latitude >= 0 ? 'N' : 'S';
    const lngDir = longitude >= 0 ? 'E' : 'W';
    return `(${Math.abs(lng)}°${lngDir}, ${Math.abs(lat)}°${latDir})`;
  };
  
  const getLunarInfo = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    
    const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    const stemIndex = (year - 4) % 10;
    const branchIndex = (year - 4) % 12;
    
    return `${heavenlyStems[stemIndex]}${earthlyBranches[branchIndex]}年`;
  };

  // 🔧 修复：统一使用 birthdate 字段（不是 birthDate）
  const birthDateStr = userData.birthdate || userData.fullBirthDateTime;
  const birthDate = formatDate(birthDateStr);
  const birthTime = formatTime(userData.birthHour, userData.birthMinute);
  const birthPlace = userData.birthplace || '';
  
  // 🔧 修复：如果没有坐标信息，则根据出生地获取
  let coordinates = '';
  if (userData.latitude && userData.longitude) {
    coordinates = formatCoordinates(userData.latitude, userData.longitude);
  } else if (birthPlace) {
    // 根据出生地获取坐标
    const coordInfo = getCoordinatesFromLocation(birthPlace);
    if (coordInfo) {
      coordinates = formatCoordinates(coordInfo.lat, coordInfo.lng);
    }
  }
  
  const lunarYear = getLunarInfo(birthDateStr);
  
  // 🔧 修复：清理多余空格并确保格式正确
  const basic = `${birthDate} ${birthTime}`.trim();
  const location = `${birthPlace} ${coordinates}`.trim();
  const lunar = lunarYear ? `生於 ${lunarYear}` : '';
  const full = `${birthDate} ${birthTime} / ${birthPlace} ${coordinates}`.replace(/\s+/g, ' ').trim();
  
  return {
    basic,
    location,
    lunar,
    full
  };
}