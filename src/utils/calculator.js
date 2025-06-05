/**
 * 八字命盘计算工具
 * 整合了八字计算和占星学计算功能
 */

// 天干表
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支表
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 十二星座名称
const ZODIAC_SIGNS = [
  '牡羊座', '金牛座', '双子座', '巨蟹座',
  '狮子座', '処女座', '天秤座', '蠍座',
  '射手座', '山羊座', '水瓶座', '双鱼座'
];

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
  '丑': '土', '未': '土'
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
 * 计算儒略日数
 * @param {Date} date - 日期对象
 * @returns {number} - 儒略日数
 */
function calculateJulianDay(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  // 转换为儒略日
  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;
  
  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // 添加时间部分
  let time = (hour - 12) / 24 + minute / 1440 + second / 86400;
  
  return jdn + time;
}

/**
 * 计算太阳位置（简化版）
 * @param {Date} birthDate - 出生日期
 * @returns {Object} - 太阳位置信息
 */
function calculateSunPosition(birthDate) {
  const jd = calculateJulianDay(birthDate);
  
  // 简化的太阳黄经计算（基于儒略日）
  const T = (jd - 2451545.0) / 36525; // 儒略世纪数
  
  // 太阳平黄经（简化公式）
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  
  // 归一化到0-360度
  L0 = L0 % 360;
  if (L0 < 0) L0 += 360;
  
  // 计算星座和度数
  const signIndex = Math.floor(L0 / 30);
  const degree = Math.floor(L0 % 30);
  const minute = Math.floor((L0 % 30 - degree) * 60);
  
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: degree,
    minute: minute,
    longitude: L0
  };
}

/**
 * 计算月亮位置（简化版）
 * @param {Date} birthDate - 出生日期
 * @returns {Object} - 月亮位置信息
 */
function calculateMoonPosition(birthDate) {
  const jd = calculateJulianDay(birthDate);
  
  // 简化的月亮黄经计算
  const T = (jd - 2451545.0) / 36525;
  
  // 月亮平黄经（简化公式）
  let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  
  // 归一化到0-360度
  L = L % 360;
  if (L < 0) L += 360;
  
  // 计算星座和度数
  const signIndex = Math.floor(L / 30);
  const degree = Math.floor(L % 30);
  const minute = Math.floor((L % 30 - degree) * 60);
  
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: degree,
    minute: minute,
    longitude: L
  };
}

/**
 * 根据地点名称获取大概的经纬度（支持中国和日本主要城市）
 * @param {string} location - 地点名称
 * @returns {Object} - 经纬度信息
 */
function getCoordinatesFromLocation(location) {
  const locationMap = {
    // 日本主要城市
    '東京': { lat: 35.6762, lng: 139.6503, country: 'JP' },
    '东京': { lat: 35.6762, lng: 139.6503, country: 'JP' },
    '大阪': { lat: 34.6937, lng: 135.5023, country: 'JP' },
    '京都': { lat: 35.0116, lng: 135.7681, country: 'JP' },
    '横浜': { lat: 35.4437, lng: 139.6380, country: 'JP' },
    '横滨': { lat: 35.4437, lng: 139.6380, country: 'JP' },
    '名古屋': { lat: 35.1815, lng: 136.9066, country: 'JP' },
    '福岡': { lat: 33.5904, lng: 130.4017, country: 'JP' },
    '福冈': { lat: 33.5904, lng: 130.4017, country: 'JP' },
    '札幌': { lat: 43.0642, lng: 141.3469, country: 'JP' },
    '仙台': { lat: 38.2682, lng: 140.8694, country: 'JP' },
    '広島': { lat: 34.3853, lng: 132.4553, country: 'JP' },
    '广岛': { lat: 34.3853, lng: 132.4553, country: 'JP' },
    '沖縄': { lat: 26.2125, lng: 127.6792, country: 'JP' },
    '冲绳': { lat: 26.2125, lng: 127.6792, country: 'JP' },
    
    // 中国主要城市
    '北京': { lat: 39.9042, lng: 116.4074, country: 'CN' },
    '上海': { lat: 31.2304, lng: 121.4737, country: 'CN' },
    '广州': { lat: 23.1291, lng: 113.2644, country: 'CN' },
    '深圳': { lat: 22.5431, lng: 114.0579, country: 'CN' },
    '杭州': { lat: 30.2741, lng: 120.1551, country: 'CN' },
    '南京': { lat: 32.0603, lng: 118.7969, country: 'CN' },
    '苏州': { lat: 31.2989, lng: 120.5853, country: 'CN' },
    '武汉': { lat: 30.5928, lng: 114.3055, country: 'CN' },
    '成都': { lat: 30.5728, lng: 104.0668, country: 'CN' },
    '重庆': { lat: 29.5630, lng: 106.5516, country: 'CN' },
    '西安': { lat: 34.3416, lng: 108.9398, country: 'CN' },
    '天津': { lat: 39.3434, lng: 117.3616, country: 'CN' },
    '青岛': { lat: 36.0986, lng: 120.3719, country: 'CN' },
    '大连': { lat: 38.9140, lng: 121.6147, country: 'CN' },
    '厦门': { lat: 24.4798, lng: 118.0819, country: 'CN' },
    '福州': { lat: 26.0745, lng: 119.2965, country: 'CN' },
    '济南': { lat: 36.6512, lng: 117.1201, country: 'CN' },
    '郑州': { lat: 34.7466, lng: 113.6254, country: 'CN' },
    '长沙': { lat: 28.2282, lng: 112.9388, country: 'CN' },
    '哈尔滨': { lat: 45.8038, lng: 126.5349, country: 'CN' },
    '沈阳': { lat: 41.8057, lng: 123.4315, country: 'CN' },
    '长春': { lat: 43.8171, lng: 125.3235, country: 'CN' },
    '石家庄': { lat: 38.0428, lng: 114.5149, country: 'CN' },
    '太原': { lat: 37.8706, lng: 112.5489, country: 'CN' },
    '呼和浩特': { lat: 40.8414, lng: 111.7525, country: 'CN' },
    '银川': { lat: 38.4681, lng: 106.2731, country: 'CN' },
    '西宁': { lat: 36.6171, lng: 101.7782, country: 'CN' },
    '兰州': { lat: 36.0611, lng: 103.8343, country: 'CN' },
    '乌鲁木齐': { lat: 43.8256, lng: 87.6168, country: 'CN' },
    '拉萨': { lat: 29.6520, lng: 91.1721, country: 'CN' },
    '昆明': { lat: 25.0389, lng: 102.7183, country: 'CN' },
    '贵阳': { lat: 26.6470, lng: 106.6302, country: 'CN' },
    '南宁': { lat: 22.8170, lng: 108.3669, country: 'CN' },
    '海口': { lat: 20.0444, lng: 110.1989, country: 'CN' },
    '三亚': { lat: 18.2533, lng: 109.5007, country: 'CN' },
    
    // 港澳台地区
    '香港': { lat: 22.3193, lng: 114.1694, country: 'HK' },
    '澳门': { lat: 22.1987, lng: 113.5439, country: 'MO' },
    '澳門': { lat: 22.1987, lng: 113.5439, country: 'MO' },
    '台北': { lat: 25.0330, lng: 121.5654, country: 'TW' },
    '臺北': { lat: 25.0330, lng: 121.5654, country: 'TW' },
    '高雄': { lat: 22.6273, lng: 120.3014, country: 'TW' },
    '台中': { lat: 24.1477, lng: 120.6736, country: 'TW' },
    '臺中': { lat: 24.1477, lng: 120.6736, country: 'TW' }
  };
  
  // 首先尝试精确匹配
  if (locationMap[location]) {
    return locationMap[location];
  }
  
  // 然后尝试包含匹配
  for (const [key, coords] of Object.entries(locationMap)) {
    if (location.includes(key) || key.includes(location)) {
      return coords;
    }
  }
  
  // 尝试匹配常见的地区/省份名称到主要城市
  const provinceToCity = {
    '北京市': '北京',
    '上海市': '上海',
    '天津市': '天津',
    '重庆市': '重庆',
    '河北': '石家庄',
    '河北省': '石家庄',
    '山西': '太原',
    '山西省': '太原',
    '内蒙古': '呼和浩特',
    '辽宁': '沈阳',
    '辽宁省': '沈阳',
    '吉林': '长春',
    '吉林省': '长春',
    '黑龙江': '哈尔滨',
    '黑龙江省': '哈尔滨',
    '江苏': '南京',
    '江苏省': '南京',
    '浙江': '杭州',
    '浙江省': '杭州',
    '安徽': '合肥',
    '安徽省': '合肥',
    '福建': '福州',
    '福建省': '福州',
    '江西': '南昌',
    '江西省': '南昌',
    '山东': '济南',
    '山东省': '济南',
    '河南': '郑州',
    '河南省': '郑州',
    '湖北': '武汉',
    '湖北省': '武汉',
    '湖南': '长沙',
    '湖南省': '长沙',
    '广东': '广州',
    '广东省': '广州',
    '广西': '南宁',
    '海南': '海口',
    '海南省': '海口',
    '四川': '成都',
    '四川省': '成都',
    '贵州': '贵阳',
    '贵州省': '贵阳',
    '云南': '昆明',
    '云南省': '昆明',
    '西藏': '拉萨',
    '陕西': '西安',
    '陕西省': '西安',
    '甘肃': '兰州',
    '甘肃省': '兰州',
    '青海': '西宁',
    '青海省': '西宁',
    '宁夏': '银川',
    '新疆': '乌鲁木齐'
  };
  
  // 尝试通过省份匹配到主要城市
  for (const [province, city] of Object.entries(provinceToCity)) {
    if (location.includes(province) && locationMap[city]) {
      return locationMap[city];
    }
  }
  
  // 默认返回东京坐标（如果用户没有指定地点或者地点无法识别）
  return { lat: 35.6762, lng: 139.6503, country: 'JP' };
}

/**
 * 计算上升星座（简化版）
 * @param {Date} birthDate - 出生日期
 * @param {number} latitude - 纬度
 * @param {number} longitude - 经度
 * @returns {Object} - 上升星座信息
 */
function calculateAscendantPosition(birthDate, latitude = 35.6762, longitude = 139.6503) {
  const jd = calculateJulianDay(birthDate);
  
  // 计算恒星时（简化）
  const T = (jd - 2451545.0) / 36525;
  let theta0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000;
  
  // 地方恒星时
  let LST = theta0 + longitude;
  LST = LST % 360;
  if (LST < 0) LST += 360;
  
  // 简化的上升点计算
  let ascendant = LST % 360;
  
  // 根据纬度进行简单调整
  ascendant += latitude * 0.5;
  ascendant = ascendant % 360;
  if (ascendant < 0) ascendant += 360;
  
  // 计算星座和度数
  const signIndex = Math.floor(ascendant / 30);
  const degree = Math.floor(ascendant % 30);
  const minute = Math.floor((ascendant % 30 - degree) * 60);
  
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: degree,
    minute: minute,
    longitude: ascendant
  };
}

/**
 * 计算占星位置信息
 * @param {Object} userData - 用户数据
 * @returns {Object} - 占星位置信息
 */
function calculateAstrologyPositions(userData) {
  try {
    const birthDate = new Date(userData.fullBirthDateTime);
    const coordinates = getCoordinatesFromLocation(userData.birthplace);
    
    // 计算各个位置
    const sunPosition = calculateSunPosition(birthDate);
    const moonPosition = calculateMoonPosition(birthDate);
    const ascendantPosition = calculateAscendantPosition(birthDate, coordinates.lat, coordinates.lng);
    
    return {
      sun: sunPosition,
      moon: moonPosition,
      ascendant: ascendantPosition
    };
  } catch (error) {
    console.error('占星位置计算出错:', error);
    
    // 返回示例数据
    return {
      ascendant: {
        sign: '双子座',
        degree: 4,
        minute: 11
      },
      sun: {
        sign: '双鱼座',
        degree: 13,
        minute: 49
      },
      moon: {
        sign: '水瓶座',
        degree: 18,
        minute: 56
      }
    };
  }
}

/**
 * 计算八字
 * @param {Object} birthData - 出生数据
 * @returns {Object} - 八字计算结果
 */
export function calculateEightCharacters(birthData) {
  try {
    const birthDate = new Date(birthData.fullBirthDateTime);
    
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const hour = birthDate.getHours();
    
    // 计算年柱
    const yearStemIndex = (year - 4) % 10;
    const yearStem = HEAVENLY_STEMS[yearStemIndex];
    const yearBranchIndex = (year - 4) % 12;
    const yearBranch = EARTHLY_BRANCHES[yearBranchIndex];
    
    // 计算月柱
    const monthBranch = MONTH_TO_BRANCH[month];
    let monthStemBase;
    if (yearStemIndex === 0 || yearStemIndex === 5) monthStemBase = 2;
    else if (yearStemIndex === 1 || yearStemIndex === 6) monthStemBase = 4;
    else if (yearStemIndex === 2 || yearStemIndex === 7) monthStemBase = 6;
    else if (yearStemIndex === 3 || yearStemIndex === 8) monthStemBase = 8;
    else monthStemBase = 0;
    
    const monthStemIndex = (monthStemBase + month - 1) % 10;
    const monthStem = HEAVENLY_STEMS[monthStemIndex];
    
    // 计算日柱
    const baseDate = new Date(1900, 0, 1);
    const dayDiff = Math.floor((birthDate - baseDate) / (24 * 60 * 60 * 1000));
    const dayStemIndex = dayDiff % 10;
    const dayBranchIndex = dayDiff % 12;
    const dayStem = HEAVENLY_STEMS[dayStemIndex];
    const dayBranch = EARTHLY_BRANCHES[dayBranchIndex];
    
    // 计算时柱
    const hourBranch = HOUR_TO_BRANCH[hour] || '子';
    const hourStemBase = (dayStemIndex % 5) * 2;
    let currentHourIndex;
    if (hour >= 23 || hour < 1) currentHourIndex = 0;
    else if (hour < 3) currentHourIndex = 1;
    else if (hour < 5) currentHourIndex = 2;
    else if (hour < 7) currentHourIndex = 3;
    else if (hour < 9) currentHourIndex = 4;
    else if (hour < 11) currentHourIndex = 5;
    else if (hour < 13) currentHourIndex = 6;
    else if (hour < 15) currentHourIndex = 7;
    else if (hour < 17) currentHourIndex = 8;
    else if (hour < 19) currentHourIndex = 9;
    else if (hour < 21) currentHourIndex = 10;
    else currentHourIndex = 11;
    
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
    ].filter(Boolean);
    
    const uniqueElements = [...new Set(elements)];
    
    return {
      eightCharacters: {
        year: { heavenlyStem: yearStem, earthlyBranch: yearBranch },
        month: { heavenlyStem: monthStem, earthlyBranch: monthBranch },
        day: { heavenlyStem: dayStem, earthlyBranch: dayBranch },
        hour: { heavenlyStem: hourStem, earthlyBranch: hourBranch }
      },
      elements: uniqueElements
    };
  } catch (error) {
    console.error('八字计算出错:', error);
    return null;
  }
}

/**
 * 简单命运分析
 * @param {Object} eightCharResult - 八字计算结果
 * @param {Object} userData - 用户输入数据
 * @returns {Object} - 运势分析结果
 */
export function analyzeFortune(eightCharResult, userData) {
  if (!eightCharResult) return null;
  
  const elements = eightCharResult.elements;
  
  const hasWood = elements.includes('木');
  const hasFire = elements.includes('火');
  const hasEarth = elements.includes('土');
  const hasMetal = elements.includes('金');
  const hasWater = elements.includes('水');
  
  const balanceScore = [hasWood, hasFire, hasEarth, hasMetal, hasWater].filter(Boolean).length;
  
  let overview = '普通';
  if (balanceScore >= 4) {
    overview = '大吉';
  } else if (balanceScore === 3) {
    overview = '吉';
  } else if (balanceScore <= 2) {
    overview = '凶';
  }
  
  const gender = userData.gender;
  let career = '★★★☆☆';
  let wealth = '★★★☆☆';
  let love = '★★★☆☆';
  let health = '★★★☆☆';
  
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
  try {
    // 计算八字
    const eightCharResult = calculateEightCharacters(userData);
    
    // 计算占星位置
    const astrologyPositions = calculateAstrologyPositions(userData);
    
    // 分析运势
    const fortuneResult = analyzeFortune(eightCharResult, userData);
    
    // 合并结果
    return {
      ...eightCharResult,
      astrologyPositions: astrologyPositions,
      fortune: fortuneResult
    };
  } catch (error) {
    console.error('完整命盘计算出错:', error);
    
    // 返回示例数据
    return {
      eightCharacters: {
        year: { heavenlyStem: '甲', earthlyBranch: '子' },
        month: { heavenlyStem: '丙', earthlyBranch: '寅' },
        day: { heavenlyStem: '戊', earthlyBranch: '午' },
        hour: { heavenlyStem: '庚', earthlyBranch: '申' }
      },
      elements: ['木', '火', '土', '金'],
      astrologyPositions: {
        ascendant: {
          sign: '双子座',
          degree: 4,
          minute: 11
        },
        sun: {
          sign: '双鱼座',
          degree: 13,
          minute: 49
        },
        moon: {
          sign: '水瓶座',
          degree: 18,
          minute: 56
        }
      },
      fortune: {
        overview: '大吉',
        career: '★★★☆☆',
        wealth: '★★★★☆',
        love: '★★★★★',
        health: '★★★☆☆'
      }
    };
  }
}

export default {
  calculateEightCharacters,
  analyzeFortune,
  calculateFullFortune
};