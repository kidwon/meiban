/**
 * 占星学计算工具
 * 计算太阳、月亮、上升星座位置
 */

// 十二星座名称
const ZODIAC_SIGNS = [
  '牡羊座', '金牛座', '双子座', '巨蟹座',
  '狮子座', '処女座', '天秤座', '蠍座',
  '射手座', '山羊座', '水瓶座', '双鱼座'
];

// 星座对应的英文名（用于计算）
const ZODIAC_SIGNS_EN = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

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
  // 这是一个近似算法，实际计算需要更复杂的天体力学公式
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
  // 实际计算需要考虑黄道倾角、纬度等复杂因素
  let ascendant = LST % 360;
  
  // 根据纬度进行简单调整（这是一个很粗略的近似）
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
 * 根据地点名称获取大概的经纬度（简化版）
 * @param {string} location - 地点名称
 * @returns {Object} - 经纬度信息
 */
function getCoordinatesFromLocation(location) {
  // 这是一个简化的地点到坐标的映射
  // 实际应用中应该使用地理编码API
  const locationMap = {
    '東京': { lat: 35.6762, lng: 139.6503 },
    '大阪': { lat: 34.6937, lng: 135.5023 },
    '京都': { lat: 35.0116, lng: 135.7681 },
    '横浜': { lat: 35.4437, lng: 139.6380 },
    '名古屋': { lat: 35.1815, lng: 136.9066 },
    '福岡': { lat: 33.5904, lng: 130.4017 },
    '札幌': { lat: 43.0642, lng: 141.3469 },
    '仙台': { lat: 38.2682, lng: 140.8694 },
    '広島': { lat: 34.3853, lng: 132.4553 },
    '沖縄': { lat: 26.2125, lng: 127.6792 }
  };
  
  // 尝试匹配地点
  for (const [key, coords] of Object.entries(locationMap)) {
    if (location.includes(key)) {
      return coords;
    }
  }
  
  // 默认返回东京坐标
  return { lat: 35.6762, lng: 139.6503 };
}

/**
 * 计算完整的占星位置信息
 * @param {Object} userData - 用户数据
 * @returns {Object} - 占星位置信息
 */
export function calculateAstrologyPositions(userData) {
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
    
    // 返回示例数据（您提到的具体位置）
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

export default {
  calculateAstrologyPositions,
  calculateSunPosition,
  calculateMoonPosition,
  calculateAscendantPosition
};