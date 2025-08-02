/**
 * 星盘图数据计算扩展模块
 * 基于现有 calculator.js 扩展，生成星盘绘制所需的坐标和位置数据
 */

// 导入现有的 calculator 函数
import { calculateFullFortune } from './calculator.js';

// 星座配置
const ZODIAC_CONFIG = [
  { name: '白羊座', symbol: '♈', startDegree: 0, color: '#FF6B6B' },
  { name: '金牛座', symbol: '♉', startDegree: 30, color: '#4ECDC4' },
  { name: '双子座', symbol: '♊', startDegree: 60, color: '#45B7D1' },
  { name: '巨蟹座', symbol: '♋', startDegree: 90, color: '#96CEB4' },
  { name: '狮子座', symbol: '♌', startDegree: 120, color: '#FFEAA7' },
  { name: '处女座', symbol: '♍', startDegree: 150, color: '#DDA0DD' },
  { name: '天秤座', symbol: '♎', startDegree: 180, color: '#98D8C8' },
  { name: '天蝎座', symbol: '♏', startDegree: 210, color: '#F7DC6F' },
  { name: '射手座', symbol: '♐', startDegree: 240, color: '#BB8FCE' },
  { name: '摩羯座', symbol: '♑', startDegree: 270, color: '#85C1E9' },
  { name: '水瓶座', symbol: '♒', startDegree: 300, color: '#F8C471' },
  { name: '双鱼座', symbol: '♓', startDegree: 330, color: '#82E0AA' }
];

// 行星配置
const PLANET_CONFIG = {
  sun: { symbol: '☉', displayName: '太阳', color: '#FFD700' },
  moon: { symbol: '☽', displayName: '月亮', color: '#C0C0C0' },
  mercury: { symbol: '☿', displayName: '水星', color: '#87CEEB' },
  venus: { symbol: '♀', displayName: '金星', color: '#FFC0CB' },
  mars: { symbol: '♂', displayName: '火星', color: '#FF6347' },
  jupiter: { symbol: '♃', displayName: '木星', color: '#DAA520' },
  saturn: { symbol: '♄', displayName: '土星', color: '#2F4F4F' },
  uranus: { symbol: '♅', displayName: '天王星', color: '#4FD0E3' },
  neptune: { symbol: '♆', displayName: '海王星', color: '#4169E1' },
  pluto: { symbol: '♇', displayName: '冥王星', color: '#8B4513' }
};

/**
 * 将角度转换为SVG坐标系的角度
 * 天文学坐标：白羊座0°在正东方，逆时针增加
 * SVG坐标：0°在正北方，顺时针增加
 * 转换：白羊座0°应在SVG的180°位置（正东方）
 */
function convertToSVGAngle(degree) {
  return (90 - degree + 360) % 360;
}

/**
 * 从星座和度数计算绝对度数
 */
function calculateDegreeFromSign(position) {
  const zodiacOrder = [
    '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
    '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
  ];
  
  const signIndex = zodiacOrder.indexOf(position.sign);
  if (signIndex === -1) return 0;
  
  return signIndex * 30 + position.degree + (position.minute / 60);
}

/**
 * 计算星座环的数据
 */
function calculateZodiacData() {
  return ZODIAC_CONFIG.map(zodiac => ({
    ...zodiac,
    svgAngle: convertToSVGAngle(zodiac.startDegree),
    endDegree: zodiac.startDegree + 30,
    midDegree: zodiac.startDegree + 15
  }));
}

/**
 * 计算宫位数据
 */
function calculateHouseData(ascendantDegree) {
  const houses = [];
  for (let i = 1; i <= 12; i++) {
    const houseDegree = (ascendantDegree + (i - 1) * 30) % 360;
    houses.push({
      number: i,
      startDegree: houseDegree,
      endDegree: (houseDegree + 30) % 360,
      midDegree: (houseDegree + 15) % 360,
      svgAngle: convertToSVGAngle(houseDegree)
    });
  }
  return houses;
}

/**
 * 计算行星位置数据
 */
function calculatePlanetData(astrologyPositions) {
  const planets = [];
  
  // 太阳
  if (astrologyPositions.sun) {
    planets.push({
      id: 'sun',
      ...PLANET_CONFIG.sun,
      degree: astrologyPositions.sun.longitude || calculateDegreeFromSign(astrologyPositions.sun),
      sign: astrologyPositions.sun.sign,
      signDegree: astrologyPositions.sun.degree,
      signMinute: astrologyPositions.sun.minute
    });
  }

  // 月亮
  if (astrologyPositions.moon) {
    planets.push({
      id: 'moon',
      ...PLANET_CONFIG.moon,
      degree: astrologyPositions.moon.longitude || calculateDegreeFromSign(astrologyPositions.moon),
      sign: astrologyPositions.moon.sign,
      signDegree: astrologyPositions.moon.degree,
      signMinute: astrologyPositions.moon.minute
    });
  }

  // 上升点
  if (astrologyPositions.ascendant) {
    planets.push({
      id: 'ascendant',
      symbol: 'ASC',
      displayName: '上升',
      color: '#d35400',
      degree: astrologyPositions.ascendant.longitude || calculateDegreeFromSign(astrologyPositions.ascendant),
      sign: astrologyPositions.ascendant.sign,
      signDegree: astrologyPositions.ascendant.degree,
      signMinute: astrologyPositions.ascendant.minute,
      isAngle: true
    });
  }

  return planets.map(planet => ({
    ...planet,
    svgAngle: convertToSVGAngle(planet.degree - 30)
  }));
}

/**
 * 计算相位连线数据
 */
function calculateAspectData(planets) {
  const aspects = [];
  const majorAspects = [
    { angle: 0, aspectName: '合相', orb: 8, color: '#FF6B6B' },
    { angle: 60, aspectName: '六分相', orb: 4, color: '#4ECDC4' },
    { angle: 90, aspectName: '四分相', orb: 6, color: '#FFE66D' },
    { angle: 120, aspectName: '三分相', orb: 6, color: '#4CAF50' },
    { angle: 180, aspectName: '对分相', orb: 8, color: '#9C27B0' }
  ];

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planet1 = planets[i];
      const planet2 = planets[j];
      
      const diff = Math.abs(planet1.degree - planet2.degree);
      const actualDiff = Math.min(diff, 360 - diff);
      
      for (const aspect of majorAspects) {
        if (Math.abs(actualDiff - aspect.angle) <= aspect.orb) {
          aspects.push({
            planet1: planet1.id,
            planet2: planet2.id,
            aspect: aspect.aspectName,
            angle: aspect.angle,
            orb: Math.abs(actualDiff - aspect.angle),
            color: aspect.color,
            isApplying: true
          });
          break;
        }
      }
    }
  }

  return aspects;
}

/**
 * 默认星盘数据
 */
function getDefaultChartData() {
  return {
    zodiac: calculateZodiacData(),
    houses: [],
    planets: [
      {
        id: 'sun',
        ...PLANET_CONFIG.sun,
        degree: 352.8,
        sign: '双鱼座',
        signDegree: 13,
        signMinute: 49,
        svgAngle: convertToSVGAngle(352.8)
      },
      {
        id: 'ascendant',
        symbol: 'ASC',
        displayName: '上升',
        color: '#d35400',
        degree: 64.2,
        sign: '双子座',
        signDegree: 4,
        signMinute: 11,
        svgAngle: convertToSVGAngle(64.2),
        isAngle: true
      }
    ],
    aspects: [],
    settings: {
      centerX: 250,
      centerY: 250,
      outerRadius: 220,
      zodiacRadius: 200,
      houseRadius: 180,
      planetRadius: 160,
      innerRadius: 50
    }
  };
}

/**
 * 生成完整的星盘绘制数据
 */
export function generateChartData(calculationResults) {
  try {
    if (!calculationResults || !calculationResults.astrologyPositions) {
      throw new Error('缺少占星位置数据');
    }

    const { astrologyPositions } = calculationResults;
    
    // 计算上升点度数
    const ascendantDegree = astrologyPositions.ascendant.longitude || 
                           calculateDegreeFromSign(astrologyPositions.ascendant);

    // 生成各环数据
    const zodiacData = calculateZodiacData();
    const houseData = calculateHouseData(ascendantDegree);
    const planetData = calculatePlanetData(astrologyPositions);
    const aspectData = calculateAspectData(planetData);

    return {
      zodiac: zodiacData,
      houses: houseData,
      planets: planetData,
      aspects: aspectData,
      settings: {
        centerX: 250,
        centerY: 250,
        outerRadius: 220,
        zodiacRadius: 200,
        houseRadius: 180,
        planetRadius: 160,
        innerRadius: 50
      }
    };

  } catch (error) {
    console.error('星盘数据生成失败:', error);
    return getDefaultChartData();
  }
}

/**
 * 更新现有的 calculateFullFortune 函数以包含星盘数据
 */
export function calculateFullFortuneWithChart(userData) {
  try {
    const fortuneResult = calculateFullFortune(userData);
    const chartData = generateChartData(fortuneResult);
    
    return {
      ...fortuneResult,
      chartData
    };
  } catch (error) {
    console.error('完整命盘计算出错:', error);
    return calculateFullFortune(userData);
  }
}

// 导出配置
export { ZODIAC_CONFIG, PLANET_CONFIG };