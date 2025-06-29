<template>
  <g class="aspect-line" @mouseenter="onHover" @mouseleave="onLeave">
    <!-- 相位连线 -->
    <line 
      :x1="startPoint.x" 
      :y1="startPoint.y"
      :x2="endPoint.x" 
      :y2="endPoint.y"
      :stroke="aspect.color"
      :stroke-width="lineWidth"
      :opacity="lineOpacity"
      :stroke-dasharray="dashPattern"
      class="aspect-connection"
    />
    
    <!-- 相位标记点（线段中点） -->
    <circle 
      v-if="isHovered"
      :cx="midPoint.x" 
      :cy="midPoint.y"
      :r="3"
      :fill="aspect.color"
      class="aspect-marker"
    />
    
    <!-- 相位信息提示框（悬浮时显示） -->
    <g v-if="isHovered" class="aspect-tooltip">
      <rect 
        :x="tooltipPosition.x - tooltipWidth/2" 
        :y="tooltipPosition.y - 12"
        :width="tooltipWidth"
        height="24"
        fill="rgba(0,0,0,0.9)"
        rx="4"
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
        {{ aspectDescription }}
      </text>
    </g>
  </g>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'AspectLine',
  props: {
    aspect: {
      type: Object,
      required: true
    },
    planets: {
      type: Array,
      required: true
    },
    center: {
      type: Number,
      required: true
    },
    radius: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const isHovered = ref(false);

    // 查找行星位置
    const planet1 = computed(() => {
      return props.planets.find(p => p.name === props.aspect.planet1);
    });

    const planet2 = computed(() => {
      return props.planets.find(p => p.name === props.aspect.planet2);
    });

    // 计算连线起点
    const startPoint = computed(() => {
      if (!planet1.value) return { x: 0, y: 0 };
      const angle = (planet1.value.svgAngle * Math.PI) / 180;
      return {
        x: props.center + props.radius * Math.cos(angle),
        y: props.center + props.radius * Math.sin(angle)
      };
    });

    // 计算连线终点
    const endPoint = computed(() => {
      if (!planet2.value) return { x: 0, y: 0 };
      const angle = (planet2.value.svgAngle * Math.PI) / 180;
      return {
        x: props.center + props.radius * Math.cos(angle),
        y: props.center + props.radius * Math.sin(angle)
      };
    });

    // 计算中点
    const midPoint = computed(() => {
      return {
        x: (startPoint.value.x + endPoint.value.x) / 2,
        y: (startPoint.value.y + endPoint.value.y) / 2
      };
    });

    // 计算提示框位置（避免超出边界）
    const tooltipPosition = computed(() => {
      const baseX = midPoint.value.x;
      const baseY = midPoint.value.y - 20;
      
      // 确保提示框在可见区域内
      const boundaryRadius = props.center * 0.9;
      const distanceFromCenter = Math.sqrt(
        Math.pow(baseX - props.center, 2) + Math.pow(baseY - props.center, 2)
      );
      
      if (distanceFromCenter > boundaryRadius) {
        // 调整到边界内
        const angle = Math.atan2(baseY - props.center, baseX - props.center);
        return {
          x: props.center + boundaryRadius * Math.cos(angle),
          y: props.center + boundaryRadius * Math.sin(angle)
        };
      }
      
      return { x: baseX, y: baseY };
    });

    // 线条样式配置
    const lineConfig = computed(() => {
      const configs = {
        '合相': { width: 2, opacity: 0.8, dash: 'none' },
        '六分相': { width: 1.5, opacity: 0.6, dash: '3,2' },
        '四分相': { width: 2, opacity: 0.7, dash: '5,3' },
        '三分相': { width: 1.5, opacity: 0.6, dash: 'none' },
        '对分相': { width: 2, opacity: 0.8, dash: '2,2' }
      };
      return configs[props.aspect.aspect] || { width: 1, opacity: 0.5, dash: 'none' };
    });

    const lineWidth = computed(() => {
      return isHovered.value ? lineConfig.value.width + 1 : lineConfig.value.width;
    });

    const lineOpacity = computed(() => {
      return isHovered.value ? lineConfig.value.opacity + 0.2 : lineConfig.value.opacity;
    });

    const dashPattern = computed(() => {
      return lineConfig.value.dash;
    });

    // 相位描述
    const aspectDescription = computed(() => {
      const planet1Name = planet1.value?.name || props.aspect.planet1;
      const planet2Name = planet2.value?.name || props.aspect.planet2;
      const orbText = `${props.aspect.orb.toFixed(1)}°`;
      
      return `${planet1Name} ${props.aspect.aspect} ${planet2Name} (${orbText})`;
    });

    // 提示框宽度
    const tooltipWidth = computed(() => {
      return Math.max(aspectDescription.value.length * 6, 120);
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
      startPoint,
      endPoint,
      midPoint,
      tooltipPosition,
      lineWidth,
      lineOpacity,
      dashPattern,
      aspectDescription,
      tooltipWidth,
      onHover,
      onLeave
    };
  }
};
</script>

<style scoped>
.aspect-line {
  cursor: pointer;
  transition: all 0.3s ease;
}

.aspect-connection {
  transition: all 0.3s ease;
}

.aspect-marker {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.aspect-tooltip {
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
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
}

.tooltip-text {
  font-family: 'Microsoft YaHei', '微软雅黑', sans-serif;
}
</style>