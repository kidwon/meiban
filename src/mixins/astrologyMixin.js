/**
 * 占星数据Mixin - 提供可复用的占星相关方法和计算属性
 * src/mixins/astrologyMixin.js
 */

import {
  getSignDescription,
  getCareerStrengths,
  getSuggestedCareers,
  getLoveDescription,
  getFriendshipDescription,
  getCompatibleSigns,
  getFortuneDescription,
  getPlanetKeywords,
  formatBirthInfo
} from '../services/astrologyDataService.js';

export const astrologyMixin = {
  methods: {
    /**
     * 获取行星显示名称
     */
    getPlanetDisplayName(planetType) {
      const nameMap = {
        sun: '太陽',
        moon: '月亮',
        ascendant: '上升星座',
        mercury: '水星',
        venus: '金星',
        mars: '火星',
        jupiter: '木星',
        saturn: '土星',
        uranus: '天王星',
        neptune: '海王星',
        pluto: '冥王星'
      };
      return nameMap[planetType] || '';
    },

    /**
     * 获取行星符号
     */
    getPlanetSymbol(planetType) {
      const symbolMap = {
        sun: '☉',
        moon: '☽',
        ascendant: 'AC',
        mercury: '☿',
        venus: '♀',
        mars: '♂',
        jupiter: '♃',
        saturn: '♄',
        uranus: '♅',
        neptune: '♆',
        pluto: '♇'
      };
      return symbolMap[planetType] || '';
    },

    /**
     * 获取行星星座
     */
    getPlanetSign(planetType, calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results || !planetType) return '';
      return results.astrologyPositions[planetType]?.sign || '';
    },

    /**
     * 获取行星度数
     */
    getPlanetDegree(planetType, calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results || !planetType) return '';
      const position = results.astrologyPositions[planetType];
      if (!position) return '';
      return `${position.degree}°${position.minute}'`;
    },

    /**
     * 获取行星完整位置信息
     */
    getPlanetPosition(planetType, calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results || !planetType) return null;
      return results.astrologyPositions[planetType];
    },

    /**
     * 获取行星描述
     */
    getPlanetDescription(planetType, calculationResults = null) {
      if (!planetType) return '';
      const sign = this.getPlanetSign(planetType, calculationResults);
      return getSignDescription(planetType, sign);
    },

    /**
     * 获取行星关键词
     */
    getPlanetKeywords(planetType) {
      return getPlanetKeywords(planetType);
    },

    /**
     * 获取太阳星座描述
     */
    getSunDescription(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return '';
      const sunSign = results.astrologyPositions.sun.sign;
      return getSignDescription('sun', sunSign);
    },

    /**
     * 获取月亮星座描述
     */
    getMoonDescription(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return '';
      const moonSign = results.astrologyPositions.moon.sign;
      return getSignDescription('moon', moonSign);
    },

    /**
     * 获取上升星座描述
     */
    getAscendantDescription(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return '';
      const ascSign = results.astrologyPositions.ascendant.sign;
      return getSignDescription('ascendant', ascSign);
    },

    /**
     * 获取事业优势
     */
    getCareerStrengths(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return '';
      const sunSign = results.astrologyPositions.sun.sign;
      return getCareerStrengths(sunSign);
    },

    /**
     * 获取建议职业
     */
    getSuggestedCareers(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return [];
      const sunSign = results.astrologyPositions.sun.sign;
      return getSuggestedCareers(sunSign);
    },

    /**
     * 获取爱情描述
     */
    getLoveDescription(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return '';
      const moonSign = results.astrologyPositions.moon.sign;
      return getLoveDescription(moonSign);
    },

    /**
     * 获取友谊描述
     */
    getFriendshipDescription(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return '';
      const ascSign = results.astrologyPositions.ascendant.sign;
      return getFriendshipDescription(ascSign);
    },

    /**
     * 获取相容星座
     */
    getCompatibleSigns(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return [];
      const sunSign = results.astrologyPositions.sun.sign;
      return getCompatibleSigns(sunSign);
    },

    /**
     * 获取运势总体描述
     */
    getOverallFortuneDescription(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results) return '';
      const overview = results.fortune.overview;
      return getFortuneDescription(overview);
    },

    /**
     * 格式化出生信息
     */
    formatBirthInfo(userData = null) {
      const user = userData || this.userData || this.getUserData;
      return formatBirthInfo(user);
    },

    /**
     * 检查是否有有效的占星数据
     */
    hasValidAstrologyData(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      return !!(results && 
                results.astrologyPositions && 
                results.astrologyPositions.sun && 
                results.astrologyPositions.moon && 
                results.astrologyPositions.ascendant);
    },

    /**
     * 获取星座元素
     */
    getSignElement(sign) {
      const elementMap = {
        '白羊座': '火', '狮子座': '火', '射手座': '火',
        '金牛座': '土', '处女座': '土', '摩羯座': '土',
        '双子座': '风', '天秤座': '风', '水瓶座': '风',
        '巨蟹座': '水', '天蝎座': '水', '双鱼座': '水'
      };
      return elementMap[sign] || '';
    },

    /**
     * 获取星座模式
     */
    getSignMode(sign) {
      const modeMap = {
        '白羊座': '基本', '巨蟹座': '基本', '天秤座': '基本', '摩羯座': '基本',
        '金牛座': '固定', '狮子座': '固定', '天蝎座': '固定', '水瓶座': '固定',
        '双子座': '变动', '处女座': '变动', '射手座': '变动', '双鱼座': '变动'
      };
      return modeMap[sign] || '';
    },

    /**
     * 获取星座极性
     */
    getSignPolarity(sign) {
      const polarityMap = {
        '白羊座': '阳', '双子座': '阳', '狮子座': '阳', '天秤座': '阳', '射手座': '阳', '水瓶座': '阳',
        '金牛座': '阴', '巨蟹座': '阴', '处女座': '阴', '天蝎座': '阴', '摩羯座': '阴', '双鱼座': '阴'
      };
      return polarityMap[sign] || '';
    },

    /**
     * 计算星座分布统计
     */
    getSignDistribution(calculationResults = null) {
      const results = calculationResults || this.calculationResults || this.getCalculationResults;
      if (!results || !results.astrologyPositions) return {};

      const distribution = {
        elements: { '火': 0, '土': 0, '风': 0, '水': 0 },
        modes: { '基本': 0, '固定': 0, '变动': 0 },
        polarities: { '阳': 0, '阴': 0 }
      };

      Object.values(results.astrologyPositions).forEach(position => {
        if (position && position.sign) {
          const element = this.getSignElement(position.sign);
          const mode = this.getSignMode(position.sign);
          const polarity = this.getSignPolarity(position.sign);

          if (element) distribution.elements[element]++;
          if (mode) distribution.modes[mode]++;
          if (polarity) distribution.polarities[polarity]++;
        }
      });

      return distribution;
    }
  },

  computed: {
    /**
     * 格式化的出生信息计算属性
     */
    formattedBirthInfo() {
      return this.formatBirthInfo();
    },

    /**
     * 主要三要素计算属性
     */
    mainTriad() {
      if (!this.hasValidAstrologyData()) return null;

      const results = this.calculationResults || this.getCalculationResults;
      return {
        sun: {
          sign: results.astrologyPositions.sun.sign,
          degree: this.getPlanetDegree('sun'),
          description: this.getSunDescription()
        },
        moon: {
          sign: results.astrologyPositions.moon.sign,
          degree: this.getPlanetDegree('moon'),
          description: this.getMoonDescription()
        },
        ascendant: {
          sign: results.astrologyPositions.ascendant.sign,
          degree: this.getPlanetDegree('ascendant'),
          description: this.getAscendantDescription()
        }
      };
    },

    /**
     * 星座分布统计计算属性
     */
    signDistribution() {
      return this.getSignDistribution();
    }
  }
};

export default astrologyMixin;