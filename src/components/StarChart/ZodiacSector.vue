<template>
  <g class="zodiac-sector" @mouseenter="onHover" @mouseleave="onLeave">
    <!-- 扇形背景 -->
    <path 
      :d="sectorPath" 
      :fill="zodiac.color"
      :fill-opacity="isHovered ? 0.3 : 0.15"
      :stroke="zodiac.color"
      :stroke-width="isHovered ? 2 : 1"
      class="sector-background"
    />
    
    <!-- 分割线 -->
    <line 
      :x1="innerPoint.x" 
      :y1="innerPoint.y" 
      :x2="outerPoint.x" 
      :y2="outerPoint.y"
      :stroke="zodiac.color"
      stroke-width="1"
      opacity="0.5"
      class="sector-divider"
    />
    
    <!-- 星座符号 -->
    <text 
      :x="symbolPosition.x" 
      :y="symbolPosition.y"
      :fill="zodiac.color"
      :font-size="symbolSize"
      font-weight="bold"
      text-anchor="middle"
      dominant-baseline="middle"
      class="zodiac-symbol"
    >
      {{ zodiac.symbol }}
    </text>
    
    <!-- 星座名称（悬浮时显示） -->
    <text 
      v-if="isHovered"
      :x="namePosition.x" 
      :y="namePosition.y"
      :fill="zodiac.color"
      font-size="11"
      font-weight="500"
      text-anchor="middle"
      dominant-baseline="middle"
      class="zodiac-name"
    >
      {{ localizedZodiacName }}
    </text>
  </g>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue';
import { getTranslation, getCurrentLanguage } from '../../i18n/index.js';

export default {
  name: 'ZodiacSector',
  props: {
    zodiac: {
      type: Object,
      required: true
    },
    center: {
      type: Number,
      required: true
    },
    innerRadius: {
      type: Number,
      required: true
    },
    outerRadius: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const isHovered = ref(false);
    const currentLanguage = ref(getCurrentLanguage());

    // 星座名称映射（英文到翻译key）
    const zodiacKeyMap = {
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

    // 本地化的星座名称
    const localizedZodiacName = computed(() => {
      const zodiacKey = zodiacKeyMap[props.zodiac.name];
      if (zodiacKey) {
        const translationKey = `starChart.zodiac.${zodiacKey}`;
        const translated = getTranslation(translationKey, currentLanguage.value);
        return translated !== translationKey ? translated : props.zodiac.name;
      }
      return props.zodiac.name;
    });

    // 监听语言变化
    const handleLanguageChange = (event) => {
      currentLanguage.value = event.detail.language;
    };

    // 添加事件监听
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', handleLanguageChange);
    }

    // 计算扇形路径
    const sectorPath = computed(() => {
      const startAngle = props.zodiac.svgAngle;
      const endAngle = startAngle + 30;
      
      const startRadians = (startAngle * Math.PI) / 180;
      const endRadians = (endAngle * Math.PI) / 180;
      
      const x1 = props.center + props.innerRadius * Math.cos(startRadians);
      const y1 = props.center + props.innerRadius * Math.sin(startRadians);
      const x2 = props.center + props.outerRadius * Math.cos(startRadians);
      const y2 = props.center + props.outerRadius * Math.sin(startRadians);
      
      const x3 = props.center + props.outerRadius * Math.cos(endRadians);
      const y3 = props.center + props.outerRadius * Math.sin(endRadians);
      const x4 = props.center + props.innerRadius * Math.cos(endRadians);
      const y4 = props.center + props.innerRadius * Math.sin(endRadians);
      
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      return [
        `M ${x1} ${y1}`,
        `L ${x2} ${y2}`,
        `A ${props.outerRadius} ${props.outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
        `L ${x4} ${y4}`,
        `A ${props.innerRadius} ${props.innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
        'Z'
      ].join(' ');
    });

    // 计算分割线端点
    const innerPoint = computed(() => {
      const angle = (props.zodiac.svgAngle * Math.PI) / 180;
      return {
        x: props.center + props.innerRadius * Math.cos(angle),
        y: props.center + props.innerRadius * Math.sin(angle)
      };
    });

    const outerPoint = computed(() => {
      const angle = (props.zodiac.svgAngle * Math.PI) / 180;
      return {
        x: props.center + props.outerRadius * Math.cos(angle),
        y: props.center + props.outerRadius * Math.sin(angle)
      };
    });

    // 计算符号位置（外环中点）
    const symbolPosition = computed(() => {
      const midAngle = ((props.zodiac.svgAngle + 15) * Math.PI) / 180;
      const symbolRadius = props.outerRadius - 10;
      return {
        x: props.center + symbolRadius * Math.cos(midAngle),
        y: props.center + symbolRadius * Math.sin(midAngle)
      };
    });

    // 计算名称位置（内环中点）
    const namePosition = computed(() => {
      const midAngle = ((props.zodiac.svgAngle + 15) * Math.PI) / 180;
      const nameRadius = props.innerRadius + 15;
      return {
        x: props.center + nameRadius * Math.cos(midAngle),
        y: props.center + nameRadius * Math.sin(midAngle)
      };
    });

    // 根据半径动态调整符号大小
    const symbolSize = computed(() => {
      const baseSize = Math.min(props.outerRadius - props.innerRadius, 20);
      return Math.max(baseSize * 0.8, 12);
    });

    // 事件处理
    const onHover = () => {
      isHovered.value = true;
    };

    const onLeave = () => {
      isHovered.value = false;
    };

    // 清理事件监听
    onUnmounted(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('languageChanged', handleLanguageChange);
      }
    });

    return {
      isHovered,
      sectorPath,
      innerPoint,
      outerPoint,
      symbolPosition,
      namePosition,
      symbolSize,
      localizedZodiacName,
      onHover,
      onLeave
    };
  }
};
</script>

<style scoped>
.zodiac-sector {
  cursor: pointer;
  transition: all 0.3s ease;
}

.sector-background {
  transition: all 0.3s ease;
}

.sector-divider {
  transition: all 0.3s ease;
}

.zodiac-symbol {
  font-family: 'Arial Unicode MS', Arial, sans-serif;
  transition: all 0.3s ease;
  user-select: none;
}

.zodiac-name {
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.zodiac-sector:hover .zodiac-symbol {
  transform: scale(1.1);
}

.zodiac-sector:hover .sector-background {
  filter: brightness(1.1);
}
</style>