<template>
  <div class="star-chart-container">
    <div class="chart-header">
      <h3 class="chart-title">{{ getLocalizedText('starChart.title') }}</h3>
      <div class="chart-controls">
        <button 
          @click="toggleAspects" 
          :class="{ active: showAspects }"
          class="control-btn"
        >
          {{ showAspects ? getLocalizedText('starChart.controls.hideAspects') : getLocalizedText('starChart.controls.showAspects') }}
        </button>
        <button 
          @click="toggleHouses" 
          :class="{ active: showHouses }"
          class="control-btn"
        >
          {{ showHouses ? getLocalizedText('starChart.controls.hideHouses') : getLocalizedText('starChart.controls.showHouses') }}
        </button>
      </div>
    </div>

    <div class="chart-wrapper">
      <svg 
        :width="chartSize" 
        :height="chartSize" 
        :viewBox="`0 0 ${chartSize} ${chartSize}`"
        class="star-chart-svg"
      >
        <!-- 背景圆圈 -->
        <circle 
          :cx="center" 
          :cy="center" 
          :r="settings.outerRadius"
          class="chart-background"
        />

        <!-- 星座环 -->
        <g class="zodiac-ring">
          <ZodiacSector
            v-for="zodiac in chartData.zodiac"
            :key="zodiac.name"
            :zodiac="zodiac"
            :center="center"
            :inner-radius="settings.zodiacRadius - 20"
            :outer-radius="settings.outerRadius"
          />
        </g>

        <!-- 宫位环 -->
        <g v-if="showHouses && chartData.houses.length > 0" class="house-ring">
          <HouseSector
            v-for="house in chartData.houses"
            :key="house.number"
            :house="house"
            :center="center"
            :inner-radius="settings.houseRadius - 20"
            :outer-radius="settings.zodiacRadius - 20"
          />
        </g>

        <!-- 行星环 -->
        <g class="planet-ring">
          <PlanetMarker
            v-for="planet in chartData.planets"
            :key="planet.id"
            :planet="planet"
            :center="center"
            :radius="settings.planetRadius"
            @planet-hover="onPlanetHover"
          />
        </g>

        <!-- 相位线 -->
        <g v-if="showAspects" class="aspect-lines">
          <AspectLine
            v-for="(aspect, index) in chartData.aspects"
            :key="index"
            :aspect="aspect"
            :planets="chartData.planets"
            :center="center"
            :radius="settings.innerRadius + 30"
          />
        </g>

        <!-- 中心圆 -->
        <circle 
          :cx="center" 
          :cy="center" 
          :r="settings.innerRadius"
          class="chart-center"
        />

        <!-- 十字轴线 -->
        <g class="axis-lines">
          <line 
            :x1="center - settings.outerRadius" 
            :y1="center" 
            :x2="center + settings.outerRadius" 
            :y2="center"
            class="axis-line"
          />
          <line 
            :x1="center" 
            :y1="center - settings.outerRadius" 
            :x2="center" 
            :y2="center + settings.outerRadius"
            class="axis-line"
          />
        </g>
      </svg>

      <!-- 悬浮信息框 -->
      <div 
        v-if="hoveredPlanet"
        class="planet-tooltip"
        :style="tooltipStyle"
      >
        <div class="tooltip-title">{{ getLocalizedPlanetName(hoveredPlanet.displayName || hoveredPlanet.name) }}</div>
        <div class="tooltip-position">
          {{ getLocalizedSignName(hoveredPlanet.sign) }} {{ hoveredPlanet.signDegree }}{{ getLocalizedText('starChart.tooltip.degree') }}{{ hoveredPlanet.signMinute }}{{ getLocalizedText('starChart.tooltip.minute') }}
        </div>
      </div>
    </div>

    <!-- 图例 -->
    <div class="chart-legend">
      <div class="legend-section">
        <h4>{{ getLocalizedText('starChart.legends.planets') }}</h4>
        <div class="legend-items">
          <div 
            v-for="planet in chartData.planets" 
            :key="planet.id"
            class="legend-item"
          >
            <span class="planet-symbol" :style="{ color: planet.color }">
              {{ planet.symbol }}
            </span>
            <span class="planet-name">{{ getLocalizedPlanetName(planet.displayName || planet.name) }}</span>
            <span class="planet-position">
              {{ getLocalizedSignName(planet.sign) }} {{ planet.signDegree }}{{ getLocalizedText('starChart.tooltip.degree') }}{{ planet.signMinute }}{{ getLocalizedText('starChart.tooltip.minute') }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="showAspects && chartData.aspects.length > 0" class="legend-section">
        <h4>{{ getLocalizedText('starChart.legends.majorAspects') }}</h4>
        <div class="legend-items">
          <div 
            v-for="(aspect, index) in chartData.aspects.slice(0, 5)" 
            :key="index"
            class="legend-item"
          >
            <span class="aspect-color" :style="{ backgroundColor: aspect.color }"></span>
            <span class="aspect-description">
              {{ getLocalizedAspectDescription(aspect) }}
            </span>
            <span class="aspect-orb">{{ aspect.orb.toFixed(1) }}°</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { generateChartData } from '../../utils/chartCalculator.js';
import ZodiacSector from './ZodiacSector.vue';
import HouseSector from './HouseSector.vue';
import PlanetMarker from './PlanetMarker.vue';
import AspectLine from './AspectLine.vue';
import { getTranslation, getCurrentLanguage } from '../../i18n/index.js';

export default {
  name: 'StarChart',
  components: {
    ZodiacSector,
    HouseSector,
    PlanetMarker,
    AspectLine
  },
  props: {
    calculationResults: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 500
    }
  },
  setup(props) {
    // 响应式数据
    const showAspects = ref(false);
    const showHouses = ref(true);
    const hoveredPlanet = ref(null);
    const mousePosition = ref({ x: 0, y: 0 });
    const currentLanguage = ref(getCurrentLanguage());

    // 行星名称映射
    const planetKeyMap = {
      'Sun': 'sun',
      'Moon': 'moon',
      'Mercury': 'mercury',
      'Venus': 'venus',
      'Mars': 'mars',
      'Jupiter': 'jupiter',
      'Saturn': 'saturn',
      'Uranus': 'uranus',
      'Neptune': 'neptune',
      'Pluto': 'pluto',
      'North Node': 'north_node',
      'South Node': 'south_node',
      'Ascendant': 'ascendant',
      'Midheaven': 'midheaven',
      'Chiron': 'chiron',
      // 中文名称映射
      '太阳': 'sun',
      '月亮': 'moon',
      '水星': 'mercury',
      '金星': 'venus',
      '火星': 'mars',
      '木星': 'jupiter',
      '土星': 'saturn',
      '天王星': 'uranus',
      '海王星': 'neptune',
      '冥王星': 'pluto',
      '北交点': 'north_node',
      '南交点': 'south_node',
      '上升点': 'ascendant',
      '天顶': 'midheaven',
      '凯龙星': 'chiron'
    };

    // 相位名称映射
    const aspectKeyMap = {
      'Conjunction': 'conjunction',
      'Sextile': 'sextile', 
      'Square': 'square',
      'Trine': 'trine',
      'Opposition': 'opposition',
      // 中文名称映射
      '合相': 'conjunction',
      '六分相': 'sextile',
      '四分相': 'square',
      '三分相': 'trine',
      '对分相': 'opposition'
    };

    // 翻译行星名称
    const getLocalizedPlanetName = (planetName) => {
      const planetKey = planetKeyMap[planetName];
      if (planetKey) {
        const translationKey = `starChart.planets.${planetKey}`;
        const translated = getTranslation(translationKey, currentLanguage.value);
        return translated !== translationKey ? translated : planetName;
      }
      return planetName;
    };

    // 星座名称映射
    const zodiacSignKeyMap = {
      'Aries': 'aries',
      'Taurus': 'taurus', 
      'Gemini': 'gemini',
      'Cancer': 'cancer',
      'Leo': 'leo',
      'Virgo': 'virgo',
      'Libra': 'libra',
      'Scorpio': 'scorpio',
      'Sagittarius': 'sagittarius',
      'Capricorn': 'capricorn',
      'Aquarius': 'aquarius',
      'Pisces': 'pisces',
      // 中文名称映射
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

    // 翻译星座名称
    const getLocalizedSignName = (signName) => {
      const signKey = zodiacSignKeyMap[signName];
      if (signKey) {
        const translationKey = `starChart.zodiac.${signKey}`;
        const translated = getTranslation(translationKey, currentLanguage.value);
        return translated !== translationKey ? translated : signName;
      }
      return signName;
    };

    // 翻译相位名称
    const getLocalizedAspectName = (aspectName) => {
      const aspectKey = aspectKeyMap[aspectName];
      if (aspectKey) {
        const translationKey = `starChart.aspects.${aspectKey}`;
        const translated = getTranslation(translationKey, currentLanguage.value);
        return translated !== translationKey ? translated : aspectName;
      }
      return aspectName;
    };

    // 本地化相位描述
    const getLocalizedAspectDescription = (aspect) => {
      const planet1 = getLocalizedPlanetName(aspect.planet1);
      const aspectName = getLocalizedAspectName(aspect.aspect);
      const planet2 = getLocalizedPlanetName(aspect.planet2);
      return `${planet1} ${aspectName} ${planet2}`;
    };

    // 通用本地化文本获取
    const getLocalizedText = (key) => {
      const translated = getTranslation(key, currentLanguage.value);
      return translated !== key ? translated : key;
    };

    // 监听语言变化
    const handleLanguageChange = (event) => {
      currentLanguage.value = event.detail.language;
    };

    // 添加事件监听
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', handleLanguageChange);
    }

    // 计算属性
    const chartSize = computed(() => props.size);
    const center = computed(() => chartSize.value / 2);
    
    const chartData = computed(() => {
      try {
        return generateChartData(props.calculationResults);
      } catch (error) {
        console.error('生成星盘数据失败:', error);
        return getDefaultChartData();
      }
    });

    const settings = computed(() => ({
      outerRadius: chartSize.value * 0.44,
      zodiacRadius: chartSize.value * 0.40,
      houseRadius: chartSize.value * 0.36,
      planetRadius: chartSize.value * 0.32,
      innerRadius: chartSize.value * 0.10
    }));

    const tooltipStyle = computed(() => {
      if (!hoveredPlanet.value) return {};
      return {
        left: `${mousePosition.value.x + 10}px`,
        top: `${mousePosition.value.y - 30}px`,
        display: 'block'
      };
    });

    // 方法
    const toggleAspects = () => {
      showAspects.value = !showAspects.value;
    };

    const toggleHouses = () => {
      showHouses.value = !showHouses.value;
    };

    const onPlanetHover = (planet, event) => {
      hoveredPlanet.value = planet;
      if (event) {
        const rect = event.target.closest('svg').getBoundingClientRect();
        mousePosition.value = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }
    };

    const onPlanetLeave = () => {
      hoveredPlanet.value = null;
    };

    // 默认数据
    const getDefaultChartData = () => ({
      zodiac: [],
      houses: [],
      planets: [],
      aspects: [],
      settings: settings.value
    });

    // 生命周期
    onMounted(() => {
      console.log('星盘组件已挂载，数据:', chartData.value);
    });

    // 清理事件监听
    onUnmounted(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('languageChanged', handleLanguageChange);
      }
    });

    return {
      showAspects,
      showHouses,
      hoveredPlanet,
      chartSize,
      center,
      chartData,
      settings,
      tooltipStyle,
      toggleAspects,
      toggleHouses,
      onPlanetHover,
      onPlanetLeave,
      getLocalizedAspectDescription,
      getLocalizedPlanetName,
      getLocalizedSignName,
      getLocalizedText
    };
  }
};
</script>

<style scoped>
.star-chart-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.chart-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.chart-controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  padding: 8px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover,
.control-btn.active {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.6);
}

.chart-wrapper {
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.star-chart-svg {
  max-width: 100%;
  height: auto;
  background: radial-gradient(circle, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 50%;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
}

.chart-background {
  fill: none;
  stroke: #dee2e6;
  stroke-width: 1;
}

.chart-center {
  fill: #fff;
  stroke: #d35400;
  stroke-width: 2;
}

.axis-lines .axis-line {
  stroke: #adb5bd;
  stroke-width: 1;
  stroke-dasharray: 2,2;
}

.planet-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  pointer-events: none;
  z-index: 1000;
  display: none;
}

.tooltip-title {
  font-weight: 600;
  margin-bottom: 2px;
}

.tooltip-position {
  font-size: 0.7rem;
  opacity: 0.9;
}

.chart-legend {
  padding: 20px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.legend-section {
  margin-bottom: 20px;
}

.legend-section:last-child {
  margin-bottom: 0;
}

.legend-section h4 {
  margin: 0 0 10px 0;
  color: #495057;
  font-size: 1rem;
}

.legend-items {
  display: grid;
  gap: 8px;
}

.legend-item {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.planet-symbol {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

.planet-name {
  color: #495057;
}

.planet-position {
  color: #6c757d;
  font-size: 0.8rem;
}

.aspect-color {
  width: 20px;
  height: 3px;
  border-radius: 2px;
}

.aspect-description {
  color: #495057;
}

.aspect-orb {
  color: #6c757d;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .chart-controls {
    justify-content: center;
  }

  .control-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .chart-wrapper {
    padding: 15px;
  }

  .legend-item {
    grid-template-columns: 25px 1fr;
    gap: 8px;
  }

  .planet-position,
  .aspect-orb {
    grid-column: 2;
    font-size: 0.7rem;
    margin-left: 25px;
  }
}
</style>