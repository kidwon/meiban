<template>
  <g 
    class="planet-marker" 
    @mouseenter="onHover" 
    @mouseleave="onLeave"
    :transform="`translate(${position.x}, ${position.y})`"
  >
    <!-- 行星背景圆圈 -->
    <circle 
      :r="circleRadius"
      :fill="planet.color"
      :fill-opacity="isHovered ? 0.3 : 0.1"
      :stroke="planet.color"
      :stroke-width="isHovered ? 2 : 1"
      class="planet-background"
    />
    
    <!-- 连接线（从行星到星盘边缘） -->
    <line 
      x1="0" 
      y1="0"
      :x2="lineEnd.x"
      :y2="lineEnd.y"
      :stroke="planet.color"
      stroke-width="1"
      opacity="0.6"
      class="position-line"
    />
    
    <!-- 行星符号 -->
    <text 
      x="0" 
      y="0"
      :fill="planet.color"
      :font-size="symbolSize"
      font-weight="bold"
      text-anchor="middle"
      dominant-baseline="middle"
      class="planet-symbol"
    >
      {{ planet.symbol }}
    </text>
    
    <!-- 度数标签（悬浮时显示） -->
    <g v-if="isHovered" class="degree-label">
      <rect 
        :x="-labelWidth/2" 
        :y="circleRadius + 5"
        :width="labelWidth"
        height="16"
        :fill="planet.color"
        fill-opacity="0.9"
        rx="3"
        class="label-background"
      />
      <text 
        x="0" 
        :y="circleRadius + 15"
        fill="white"
        font-size="10"
        font-weight="500"
        text-anchor="middle"
        dominant-baseline="middle"
        class="degree-text"
      >
        {{ degreeLabel }}
      </text>
    </g>
  </g>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'PlanetMarker',
  props: {
    planet: {
      type: Object,
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
  emits: ['planet-hover', 'planet-leave'],
  setup(props, { emit }) {
    const isHovered = ref(false);

    // 计算行星在圆环上的位置
    const position = computed(() => {
      const angle = (props.planet.svgAngle * Math.PI) / 180;
      return {
        x: props.center + props.radius * Math.cos(angle),
        y: props.center + props.radius * Math.sin(angle)
      };
    });

    // 计算连接线终点（指向星盘中心）
    const lineEnd = computed(() => {
      const angle = (props.planet.svgAngle * Math.PI) / 180;
      const lineLength = props.radius * 0.3;
      return {
        x: -lineLength * Math.cos(angle),
        y: -lineLength * Math.sin(angle)
      };
    });

    // 动态计算圆圈半径
    const circleRadius = computed(() => {
      return props.planet.isAngle ? 12 : 10;
    });

    // 动态计算符号大小
    const symbolSize = computed(() => {
      return props.planet.isAngle ? 10 : 12;
    });

    // 度数标签
    const degreeLabel = computed(() => {
      return `${props.planet.signDegree}°${props.planet.signMinute}'`;
    });

    // 标签宽度（根据内容动态计算）
    const labelWidth = computed(() => {
      return degreeLabel.value.length * 6 + 8;
    });

    // 事件处理
    const onHover = (event) => {
      isHovered.value = true;
      emit('planet-hover', props.planet, event);
    };

    const onLeave = () => {
      isHovered.value = false;
      emit('planet-leave');
    };

    return {
      isHovered,
      position,
      lineEnd,
      circleRadius,
      symbolSize,
      degreeLabel,
      labelWidth,
      onHover,
      onLeave
    };
  }
};
</script>

<style scoped>
.planet-marker {
  cursor: pointer;
  transition: all 0.3s ease;
}

.planet-marker:hover {
  transform-origin: center;
}

.planet-background {
  transition: all 0.3s ease;
}

.position-line {
  transition: opacity 0.3s ease;
}

.planet-symbol {
  font-family: 'Arial Unicode MS', Arial, sans-serif;
  transition: all 0.3s ease;
}

.planet-marker:hover .planet-symbol {
  transform: scale(1.1);
}

.degree-label {
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

.label-background {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.degree-text {
  font-family: 'Courier New', monospace;
}
</style>