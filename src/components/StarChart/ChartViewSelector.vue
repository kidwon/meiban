<template>
  <div class="chart-view-selector">
    <!-- 居中的模式切换按钮 -->
    <div class="chart-header">
      <div class="header-controls">
        <!-- 模式切换toggle按钮 -->
        <div class="mode-toggle">
          <button 
            @click="toggleMode"
            class="toggle-btn"
            :title="activeMode === '2d' ? 'Switch to 3D' : 'Switch to 2D'"
          >
            🌐 {{ activeMode === '2d' ? '3D' : '2D' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- 星盘显示区域 -->
    <div class="chart-area">
      <div ref="chartContainer" class="chart-container">
        <!-- 动态组件渲染 -->
        <component 
          :is="currentComponent"
          v-bind="chartProps"
          @planetClick="$emit('planetClick', $event)"
          @planetHover="$emit('planetHover', $event)"
          @modeChange="handleModeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import StarChart from './StarChart.vue'
import StarChart3D from './StarChart3D.vue'
import { getTranslation, getCurrentLanguage } from '../../i18n/index.js'

export default {
  name: 'ChartViewSelector',
  
  components: {
    StarChart,
    StarChart3D
  },

  props: {
    calculationResults: {
      type: Object,
      required: true
    },
    userData: {
      type: Object,
      default: () => ({})
    },
    initialMode: {
      type: String,
      default: '2d'
    },
    showModeControls: {
      type: Boolean,
      default: true
    }
  },

  emits: ['modeChange', 'planetClick', 'planetHover', 'resetView'],

  setup(props, { emit }) {
    // 响应式状态
    const activeMode = ref(props.initialMode)
    const chartContainer = ref(null)
    const currentLanguage = ref(getCurrentLanguage())

    // 简化的视图模式配置
    const viewModes = [
      { id: '2d', component: 'StarChart' },
      { id: '3d', component: 'StarChart3D' }
    ]

    // Astro3D组件使用内置控制，不需要外部状态管理

    // 生成星座数据
    const generateZodiacData = () => {
      const zodiacSigns = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 
        'Leo', 'Virgo', 'Libra', 'Scorpio',
        'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
      ]
      
      return zodiacSigns.map((name, index) => ({
        name,
        startAngle: index * 30,
        endAngle: (index + 1) * 30
      }))
    }

    // 生成宫位数据
    const generateHouseData = () => {
      const houses = []
      
      for (let i = 1; i <= 12; i++) {
        houses.push({
          number: i,
          startAngle: (i - 1) * 30, // 简化的宫位分割
          endAngle: i * 30
        })
      }
      
      return houses
    }

    // 生成行星数据
    const generatePlanetData = (calculationResults) => {
      const planets = []
      
      if (calculationResults.astrology) {
        Object.entries(calculationResults.astrology).forEach(([planetName, data]) => {
          if (data && typeof data.longitude === 'number') {
            planets.push({
              id: planetName,
              name: planetName,
              longitude: data.longitude,
              latitude: data.latitude || 0,
              sign: data.sign || '',
              house: data.house || 1
            })
          }
        })
      }
      
      // 如果从astrology对象中没有获取到数据，尝试从astrologyPositions获取
      if (planets.length === 0 && calculationResults.astrologyPositions) {
        Object.entries(calculationResults.astrologyPositions).forEach(([planetName, data]) => {
          if (data && typeof data.longitude === 'number') {
            planets.push({
              id: planetName,
              name: planetName,
              longitude: data.longitude,
              latitude: data.latitude || 0,
              sign: data.sign || '',
              house: data.house || 1
            })
          }
        })
      }
      
      return planets
    }

    // 生成相位数据
    const generateAspectData = (calculationResults) => {
      const aspects = []
      
      if (calculationResults.aspects) {
        calculationResults.aspects.forEach(aspect => {
          aspects.push({
            planet1: aspect.planet1,
            planet2: aspect.planet2,
            type: aspect.aspect,
            angle: aspect.angle,
            orb: aspect.orb
          })
        })
      }
      
      return aspects
    }

    // 格式化数据供3D星盘图使用
    const formatChartDataFor3D = (calculationResults) => {
      if (!calculationResults) return { planets: [], houses: [], aspects: [], zodiac: [] }
      
      return {
        zodiac: generateZodiacData(),
        houses: generateHouseData(),
        planets: generatePlanetData(calculationResults),
        aspects: generateAspectData(calculationResults)
      }
    }

    // 计算属性
    const currentComponent = computed(() => {
      const mode = viewModes.find(m => m.id === activeMode.value)
      return mode ? mode.component : 'StarChart'
    })

    const chartProps = computed(() => {
      const baseProps = {
        calculationResults: props.calculationResults,
        userData: props.userData
      }

      switch (activeMode.value) {
        case '2d':
          return {
            ...baseProps,
            size: 450
          }
        
        case '3d':
          return {
            chartData: formatChartDataFor3D(props.calculationResults),
            initialMode: '3d'
          }
        
        default:
          return baseProps
      }
    })


    // 翻译函数
    const $t = (key) => {
      const translated = getTranslation(key, currentLanguage.value)
      return translated !== key ? translated : key
    }

    // 方法
    const toggleMode = () => {
      const newMode = activeMode.value === '2d' ? '3d' : '2d'
      activeMode.value = newMode
      emit('modeChange', newMode)
    }

    const handleModeChange = (newMode) => {
      if (newMode && newMode !== activeMode.value) {
        activeMode.value = newMode
        emit('modeChange', newMode)
      }
    }


    // 监听语言变化
    watch(currentLanguage, () => {
      // 重新获取翻译
    })

    return {
      activeMode,
      chartContainer,
      currentComponent,
      chartProps,
      toggleMode,
      handleModeChange,
      $t
    }
  }
}
</script>

<style scoped>
.chart-view-selector {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 标题和控制区域 */
.chart-header {
  background: white;
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
}


.header-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mode-toggle {
  margin-right: 5px;
}

.toggle-btn {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  display: flex;
  align-items: center;
  gap: 4px;
}

.toggle-btn:hover {
  background: linear-gradient(135deg, #e55a32 0%, #e6821a 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
}

.control-btn {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-1px);
}

/* 星盘显示区域 */
.chart-area {
  background: #f8f9fa;
}

.chart-container {
  min-height: 500px;
  padding: 20px;
  background: white;
  position: relative;
}

.chart-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background: #000;
  padding: 0;
}


/* 响应式设计 */
@media (max-width: 768px) {
  .chart-header {
    padding: 12px 15px;
  }
  
  .chart-container {
    min-height: 400px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .chart-header {
    padding: 10px 12px;
  }
  
  .chart-container {
    min-height: 350px;
    padding: 10px;
  }
  
  .toggle-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style>