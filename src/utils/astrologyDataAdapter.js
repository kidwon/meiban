/**
 * 星盘数据适配器 - 处理API数据格式转换
 * src/utils/astrologyDataAdapter.js
 */

// 行星代码映射表
const PLANET_CODE_MAP = {
  '0': 'sun',        // 太阳
  '1': 'moon',       // 月亮
  '2': 'mercury',    // 水星
  '3': 'venus',      // 金星
  '4': 'mars',       // 火星
  '5': 'jupiter',    // 木星
  '6': 'saturn',     // 土星
  '7': 'uranus',     // 天王星
  '8': 'neptune',    // 海王星
  '9': 'pluto',      // 冥王星
  't': 'trueNode',   // 北交点
  '10': 'ascendant'  // 上升点
};

// 星座中英文对照表
const ZODIAC_MAPPING = {
  'Aries': '白羊座',
  'Taurus': '金牛座', 
  'Gemini': '双子座',
  'Cancer': '巨蟹座',
  'Leo': '狮子座',
  'Virgo': '处女座',
  'Libra': '天秤座',
  'Scorpio': '天蝎座',
  'Sagittarius': '射手座',
  'Capricorn': '摩羯座',
  'Aquarius': '水瓶座',
  'Pisces': '双鱼座'
};

// 反向映射（中文到英文）
const ZODIAC_REVERSE_MAPPING = Object.fromEntries(
  Object.entries(ZODIAC_MAPPING).map(([en, zh]) => [zh, en])
);

/**
 * 转换星座名称（英文到中文）
 * @param {string} englishName - 英文星座名
 * @returns {string} 中文星座名
 */
function convertZodiacName(englishName) {
  return ZODIAC_MAPPING[englishName] || englishName;
}

/**
 * 从API响应中提取行星数据
 * @param {Object} apiData - API返回的原始数据
 * @returns {Object} 转换后的行星位置数据
 */
function extractPlanetPositions(apiData) {
  const positions = {};
  
  if (!apiData.planet || !Array.isArray(apiData.planet)) {
    console.warn('API数据中缺少行星信息');
    return positions;
  }
  
  // 遍历API返回的行星数据
  apiData.planet.forEach(planetData => {
    const planetKey = PLANET_CODE_MAP[planetData.code_name];
    
    if (planetKey && planetData.sign) {
      positions[planetKey] = {
        sign: convertZodiacName(planetData.sign.sign_english),
        degree: planetData.sign.deg || 0,
        minute: planetData.sign.min || 0,
        second: planetData.sign.sec || 0,
        longitude: planetData.longitude || 0,
        // 保留原始API数据以备后用
        _raw: {
          code_name: planetData.code_name,
          planet_english: planetData.planet_english,
          planet_chinese: planetData.planet_chinese,
          house_id: planetData.house_id,
          speed: planetData.speed
        }
      };
    }
  });
  
  // 检查是否包含必要的三要素
  const essentials = ['sun', 'moon', 'ascendant'];
  const missing = essentials.filter(key => !positions[key]);
  
  if (missing.length > 0) {
    console.warn('缺少重要行星数据:', missing);
  }
  
  return positions;
}

/**
 * 从API响应中提取宫位数据
 * @param {Object} apiData - API返回的原始数据
 * @returns {Object} 转换后的宫位数据
 */
function extractHouseData(apiData) {
  const houses = {};
  
  if (!apiData.house || !Array.isArray(apiData.house)) {
    console.warn('API数据中缺少宫位信息');
    return houses;
  }
  
  apiData.house.forEach(houseData => {
    const houseNumber = houseData.house_id;
    
    houses[houseNumber] = {
      sign: convertZodiacName(houseData.sign.sign_english),
      degree: houseData.sign.deg || 0,
      minute: houseData.sign.min || 0,
      second: houseData.sign.sec || 0,
      longitude: houseData.longitude || 0,
      life_palace: houseData.house_life || '',
      planets: (houseData.planet_array || []).map(planet => ({
        code_name: planet.code_name,
        name: planet.planet_chinese,
        degree: planet.deg || 0,
        minute: planet.min || 0,
        second: planet.sec || 0
      })),
      // 保留坐标信息用于绘制
      coordinates: {
        x: houseData.z_x,
        y: houseData.z_y
      }
    };
  });
  
  return houses;
}

/**
 * 从API响应中提取相位数据
 * @param {Object} apiData - API返回的原始数据
 * @returns {Array} 转换后的相位数据
 */
function extractAspectData(apiData) {
  const aspects = [];
  
  if (!apiData.planet) {
    return aspects;
  }
  
  // 遍历行星的相位信息
  apiData.planet.forEach(planetData => {
    if (planetData.planet_allow_degree && Array.isArray(planetData.planet_allow_degree)) {
      planetData.planet_allow_degree.forEach(aspect => {
        const planet1Key = PLANET_CODE_MAP[planetData.code_name];
        const planet2Key = PLANET_CODE_MAP[aspect.code_name];
        
        if (planet1Key && planet2Key) {
          aspects.push({
            planet1: planet1Key,
            planet2: planet2Key,
            angle: aspect.allow || 0,
            orb: {
              degree: aspect.deg || 0,
              minute: aspect.min || 0,
              second: aspect.sec || 0
            },
            type: aspect.in_out === '1' ? 'applying' : 'separating'
          });
        }
      });
    }
  });
  
  return aspects;
}

/**
 * 从API响应中提取元素分布数据
 * @param {Object} apiData - API返回的原始数据
 * @returns {Object} 转换后的元素分布数据
 */
function extractElementDistribution(apiData) {
  const distribution = {
    elements: { fire: 0, earth: 0, air: 0, water: 0 },
    qualities: { cardinal: 0, fixed: 0, mutable: 0 },
    polarities: { positive: 0, negative: 0 }
  };
  
  if (!apiData.attribute) {
    return distribution;
  }
  
  // 映射中文元素到英文
  const elementMap = {
    fire: ['火相'],
    earth: ['土相'], 
    air: ['风相'],
    water: ['水相']
  };
  
  const qualityMap = {
    cardinal: ['本位'],
    fixed: ['固定'],
    mutable: ['变动']
  };
  
  // 统计各个元素和性质的分布
  Object.entries(apiData.attribute).forEach(([key, planets]) => {
    if (Array.isArray(planets)) {
      // 根据key判断是哪种属性
      Object.entries(elementMap).forEach(([element, chineseNames]) => {
        if (chineseNames.includes(key)) {
          distribution.elements[element] = planets.length;
        }
      });
      
      Object.entries(qualityMap).forEach(([quality, chineseNames]) => {
        if (chineseNames.includes(key)) {
          distribution.qualities[quality] = planets.length;
        }
      });
    }
  });
  
  return distribution;
}

/**
 * 生成运势评分（基于行星强弱和相位）
 * @param {Object} planetPositions - 行星位置数据
 * @param {Array} aspects - 相位数据
 * @returns {Object} 运势评分
 */
function generateFortuneScores(planetPositions, aspects) {
  // 简化的运势评分算法
  const scores = {
    career: 3,   // 事业
    wealth: 3,   // 财富
    love: 3,     // 爱情
    health: 3,   // 健康
    overall: 3   // 总体
  };
  
  // 基于太阳和月亮位置调整分数
  if (planetPositions.sun) {
    // 火象星座在事业上有优势
    const fireSign = ['白羊座', '狮子座', '射手座'];
    if (fireSign.includes(planetPositions.sun.sign)) {
      scores.career += 1;
    }
  }
  
  if (planetPositions.moon) {
    // 水象星座在情感上更敏感
    const waterSign = ['巨蟹座', '天蝎座', '双鱼座'];
    if (waterSign.includes(planetPositions.moon.sign)) {
      scores.love += 1;
    }
  }
  
  // 基于相位数量调整总体分数
  const beneficAspects = aspects.filter(a => [60, 120].includes(a.angle));
  const maleficAspects = aspects.filter(a => [90, 180].includes(a.angle));
  
  scores.overall += beneficAspects.length * 0.5 - maleficAspects.length * 0.3;
  
  // 确保分数在1-5范围内
  Object.keys(scores).forEach(key => {
    scores[key] = Math.max(1, Math.min(5, Math.round(scores[key])));
  });
  
  return scores;
}

/**
 * 将API数据转换为应用内部格式
 * @param {Object} apiData - API返回的原始数据
 * @returns {Object} 转换后的占星数据
 */
export function convertApiDataToAppFormat(apiData) {
  try {
    console.log('🔄 开始转换API数据格式');
    console.log('📥 原始API数据:', apiData);
    
    // 提取各类数据
    const planetPositions = extractPlanetPositions(apiData);
    const houses = extractHouseData(apiData);
    const aspects = extractAspectData(apiData);
    const elementDistribution = extractElementDistribution(apiData);
    
    // 生成运势评分
    const fortuneScores = generateFortuneScores(planetPositions, aspects);
    
    // 构建最终数据结构
    const convertedData = {
      // 行星位置（保持与现有应用兼容的格式）
      astrologyPositions: planetPositions,
      
      // 宫位信息
      houses: houses,
      
      // 相位信息
      aspects: aspects,
      
      // 元素分布
      elementDistribution: elementDistribution,
      
      // 运势信息
      fortune: {
        overview: fortuneScores.overall >= 4 ? '大吉' : fortuneScores.overall >= 3 ? '中吉' : '平常',
        career: '★'.repeat(fortuneScores.career) + '☆'.repeat(5 - fortuneScores.career),
        wealth: '★'.repeat(fortuneScores.wealth) + '☆'.repeat(5 - fortuneScores.wealth),
        love: '★'.repeat(fortuneScores.love) + '☆'.repeat(5 - fortuneScores.love),
        health: '★'.repeat(fortuneScores.health) + '☆'.repeat(5 - fortuneScores.health),
        scores: fortuneScores
      },
      
      // SVG图表（如果API返回了的话）
      chart: {
        svg: apiData.svg || null,
        hasChart: !!apiData.svg
      },
      
      // 保留原始数据用于调试
      _rawApiData: process.env.NODE_ENV === 'development' ? apiData : null,
      _convertedAt: new Date().toISOString()
    };
    
    console.log('✅ 数据转换完成');
    console.log('📤 转换后数据:', convertedData);
    
    return convertedData;
    
  } catch (error) {
    console.error('❌ 数据转换失败:', error);
    throw new Error(`数据转换失败: ${error.message}`);
  }
}

/**
 * 验证转换后的数据完整性
 * @param {Object} convertedData - 转换后的数据
 * @returns {Object} 验证结果
 */
export function validateConvertedData(convertedData) {
  const validation = {
    isValid: true,
    errors: [],
    warnings: []
  };
  
  // 检查必要的行星位置
  const requiredPlanets = ['sun', 'moon', 'ascendant'];
  requiredPlanets.forEach(planet => {
    if (!convertedData.astrologyPositions[planet]) {
      validation.errors.push(`缺少${planet}位置信息`);
      validation.isValid = false;
    }
  });
  
  // 检查数据格式
  if (!convertedData.astrologyPositions || typeof convertedData.astrologyPositions !== 'object') {
    validation.errors.push('行星位置数据格式错误');
    validation.isValid = false;
  }
  
  // 检查运势数据
  if (!convertedData.fortune) {
    validation.warnings.push('缺少运势信息');
  }
  
  // 检查宫位数据
  if (!convertedData.houses || Object.keys(convertedData.houses).length < 12) {
    validation.warnings.push('宫位数据不完整');
  }
  
  return validation;
}

/**
 * 创建兼容的占星数据格式（用于替换本地计算）
 * @param {Object} apiData - API返回的原始数据
 * @returns {Object} 与现有应用兼容的数据格式
 */
export function createCompatibleAstrologyData(apiData) {
  const convertedData = convertApiDataToAppFormat(apiData);
  const validation = validateConvertedData(convertedData);
  
  if (!validation.isValid) {
    console.error('数据验证失败:', validation.errors);
    throw new Error('转换的数据不满足应用要求');
  }
  
  if (validation.warnings.length > 0) {
    console.warn('数据验证警告:', validation.warnings);
  }
  
  // 返回与现有应用完全兼容的数据结构
  return {
    astrologyPositions: convertedData.astrologyPositions,
    fortune: convertedData.fortune,
    houses: convertedData.houses,
    aspects: convertedData.aspects,
    elementDistribution: convertedData.elementDistribution,
    chart: convertedData.chart,
    // 额外的元数据
    dataSource: 'xingpan_api',
    timestamp: new Date().toISOString()
  };
}

// 导出工具函数
export {
  PLANET_CODE_MAP,
  ZODIAC_MAPPING,
  ZODIAC_REVERSE_MAPPING,
  convertZodiacName
};