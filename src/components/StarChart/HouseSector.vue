<template>
  <g class="house-sector" @mouseenter="onHover" @mouseleave="onLeave">
    <!-- 宫位背景（透明，仅用于交互） -->
    <path 
      :d="sectorPath" 
      fill="transparent"
      stroke="none"
      class="house-background"
    />
    
    <!-- 宫位分割线 -->
    <line 
      :x1="innerPoint.x" 
      :y1="innerPoint.y" 
      :x2="outerPoint.x" 
      :y2="outerPoint.y"
      stroke="#6c757d"
      :stroke-width="isHovered ? 2 : 1"
      :opacity="isHovered ? 0.8 : 0.4"
      stroke-dasharray="2,2"
      class="house-divider"
    />
    
    <!-- 宫位编号 -->
    <text 
      :x="numberPosition.x" 
      :y="numberPosition.y"
      fill="#495057"
      :font-size="numberSize"
      font-weight="600"
      text-anchor="middle"
      dominant-baseline="middle"
      :opacity="isHovered ? 1 : 0.7"
      class="house-number"
    >
      {{ house.number }}
    </text>
    
    <!-- 宫位说明（悬浮时显示） -->
    <g v-if="isHovered" class="house-tooltip">
      <rect 
        :x="tooltipPosition.x - tooltipWidth/2" 
        :y="tooltipPosition.y - 10"
        :width="tooltipWidth"
        height="20"
        fill="rgba(0,0,0,0.8)"
        rx="3"
        class="tooltip-background"
      />
      <text 
        :x="tooltipPosition.x" 
        :y="tooltipPosition.y"
        fill="white"
        font-size="10"
        font-weight="500"
        text-anchor="middle"
        dominant-baseline="middle"
        class="tooltip-text"
      >
        {{ houseDescription }}
      </text>
    </g>
  </g>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'HouseSector',
  props: {
    house: {
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

    // 宫位描述映射
    const houseDescriptions = {
      1: '自我・个性',
      2: '财富・价值',
      3: '沟通・学习',
      4: '家庭・根源',
      5: '创造・恋爱',
      6: '工作・健康',
      7: '关系・合作',
      8: '转化・共享',
      9: '哲学・远行',
      10: '事业・声誉',
      11: '友谊・希望',
      12: '潜意识・牺牲'
    };

    // 计算扇形路径
    const sectorPath = computed(() => {
      const startAngle = props.house.svgAngle;
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
      const angle = (props.house.svgAngle * Math.PI) / 180;
      return {
        x: props.center + props.innerRadius * Math.cos(angle),
        y: props.center + props.innerRadius * Math.sin(angle)
      };
    });

    const outerPoint = computed(() => {
      const angle = (props.house.svgAngle * Math.PI) / 180;
      return {
        x: props.center + props.outerRadius * Math.cos(angle),
        y: props.center + props.outerRadius * Math.sin(angle)
      };
    });

    // 计算宫位编号位置
    const numberPosition = computed(() => {
      const midAngle = ((props.house.svgAngle + 15) * Math.PI) / 180;
      const numberRadius = (props.innerRadius + props.outerRadius) / 2;
      return {
        x: props.center + numberRadius * Math.cos(midAngle),
        y: props.center + numberRadius * Math.sin(midAngle)
      };
    });

    // 计算提示框位置
    const tooltipPosition = computed(() => {
      const midAngle = ((props.house.svgAngle + 15) * Math.PI) / 180;
      const tooltipRadius = props.outerRadius + 20;
      return {
        x: props.center + tooltipRadius * Math.cos(midAngle),
        y: props.center + tooltipRadius * Math.sin(midAngle)
      };
    });

    // 宫位描述
    const houseDescription = computed(() => {
      return houseDescriptions[props.house.number] || `第${props.house.number}宫`;
    });

    // 提示框宽度
    const tooltipWidth = computed(() => {
      return houseDescription.value.length * 8 + 16;
    });

    // 编号大小
    const numberSize = computed(() => {
      const baseSize = Math.min(props.outerRadius - props.innerRadius, 16);
      return Math.max(baseSize * 0.6, 10);
    });

    // 事件处理
    const onHover = () => {
      isHovered.value = true;
    };

    const onLeave = () => {
      isHovered.value = false;
    };

    return {
      isHovered,
      sectorPath,
      innerPoint,
      outerPoint,
      numberPosition,
      tooltipPosition,
      houseDescription,
      tooltipWidth,
      numberSize,
      onHover,
      onLeave
    };
  }
};
</script>

<style scoped>
.house-sector {
  cursor: pointer;
  transition: all 0.3s ease;
}

.house-background {
  transition: all 0.3s ease;
}

.house-divider {
  transition: all 0.3s ease;
}

.house-number {
  font-family: 'Arial', sans-serif;
  transition: all 0.3s ease;
  user-select: none;
}

.house-tooltip {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tooltip-background {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.tooltip-text {
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
}
</style>