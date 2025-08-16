<template>
  <div class="star-chart-3d-container">
    <div class="chart-header">
      <h3 class="chart-title">{{ getLocalizedText('starChart.title') }} - 3D</h3>
      <div class="chart-controls">
        <button 
          @click="toggle3DMode" 
          :class="{ active: is3DMode }"
          class="control-btn mode-btn"
        >
          {{ is3DMode ? '2D模式' : '3D模式' }}
        </button>
        <button 
          @click="toggleAspects" 
          :class="{ active: showAspects }"
          class="control-btn"
        >
          {{ showAspects ? '隐藏相位' : '显示相位' }}
        </button>
        <button 
          @click="toggleAnimation" 
          :class="{ active: animationEnabled }"
          class="control-btn"
        >
          {{ animationEnabled ? '暂停动画' : '开启动画' }}
        </button>
        <button 
          @click="toggleZodiacLabels" 
          :class="{ active: showZodiacLabels }"
          class="control-btn"
        >
          {{ showZodiacLabels ? '隐藏星座' : '显示星座' }}
        </button>
        <button 
          @click="toggleHouseRing" 
          :class="{ active: showHouseRing }"
          class="control-btn"
        >
          {{ showHouseRing ? '隐藏宫位' : '显示宫位' }}
        </button>
        <button 
          @click="resetCamera" 
          class="control-btn"
        >
          重置视角
        </button>
      </div>
    </div>

    <div class="chart-wrapper">
      <!-- 3D Canvas -->
      <div v-show="is3DMode" ref="threejsContainer" class="threejs-container"></div>
      
      <!-- 2D SVG Fallback -->
      <div v-show="!is3DMode" class="svg-fallback">
        <StarChart 
          :chart-data="chartData" 
          :chart-size="400"
          v-if="!is3DMode"
        />
      </div>
    </div>

    <!-- 3D控制面板 -->
    <div v-if="is3DMode" class="controls-panel">
      <div class="control-group">
        <label>性能模式</label>
        <select v-model="performanceMode" @change="setPerformanceMode(performanceMode)" class="performance-select">
          <option value="auto">自动</option>
          <option value="high">高质量</option>
          <option value="medium">中等</option>
          <option value="low">高性能</option>
        </select>
      </div>
      <div class="control-group">
        <label>LOD优化</label>
        <button @click="lodEnabled = !lodEnabled" :class="{ active: lodEnabled }" class="toggle-btn">
          {{ lodEnabled ? '已启用' : '已禁用' }}
        </button>
      </div>
      <div class="control-group">
        <label>自动旋转速度</label>
        <input 
          type="range" 
          v-model="autoRotateSpeed" 
          min="0" 
          max="5" 
          step="0.1"
          @input="updateAutoRotation"
        />
      </div>
      <div class="control-group">
        <label>缩放</label>
        <input 
          type="range" 
          v-model="zoomLevel" 
          min="0.5" 
          max="3" 
          step="0.1"
          @input="updateZoom"
        />
      </div>
      <div class="control-group">
        <label>粒子密度</label>
        <input 
          type="range" 
          v-model="particleDensity" 
          min="200" 
          max="4000" 
          step="200"
          @input="updateParticles"
        />
      </div>
      <div class="control-group">
        <label>光晕强度</label>
        <input 
          type="range" 
          v-model="glowIntensity" 
          min="0" 
          max="2" 
          step="0.1"
          @input="updateGlowIntensity"
        />
      </div>
      <div class="control-group">
        <label>相位线强度</label>
        <input 
          type="range" 
          v-model="aspectIntensity" 
          min="0" 
          max="2" 
          step="0.1"
          @input="updateAspectIntensity"
        />
      </div>
    </div>

    <!-- 性能信息 -->
    <div v-if="showDebugInfo" class="debug-info">
      <div>FPS: {{ currentFPS }} (平均: {{ averageFPS }})</div>
      <div>Objects: {{ objectCount }}</div>
      <div>Triangles: {{ triangleCount }}</div>
      <div>Frame: {{ frameTime.toFixed(1) }}ms</div>
      <div>Mode: {{ performanceMode }}</div>
      <div v-if="isMobile" class="mobile-indicator">📱 移动端</div>
      <div v-if="isLowPerformance" class="performance-warning">⚠️ 低性能</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';
import StarChart from './StarChart.vue';
import { getTranslation, getCurrentLanguage } from '../../i18n';

export default {
  name: 'StarChart3D',
  components: {
    StarChart
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    initialMode: {
      type: String,
      default: '2d' // '2d' or '3d'
    }
  },
  setup(props) {
    // 响应式变量
    const threejsContainer = ref(null);
    const is3DMode = ref(props.initialMode === '3d');
    const showAspects = ref(true);
    const animationEnabled = ref(true);
    const showZodiacLabels = ref(true);
    const showHouseRing = ref(true);
    const autoRotateSpeed = ref(1);
    const zoomLevel = ref(1);
    const particleDensity = ref(2000); // 增加默认粒子密度
    const glowIntensity = ref(1);
    const aspectIntensity = ref(1);
    const showDebugInfo = ref(false);
    const currentFPS = ref(0);
    const objectCount = ref(0);
    const triangleCount = ref(0);
    
    // 性能优化变量
    const performanceMode = ref('auto'); // auto, high, medium, low
    const lodEnabled = ref(true);
    // 移除未使用的devicePixelRatio变量
    const isMobile = ref(window.innerWidth < 768);
    const isLowPerformance = ref(false);
    const frameTime = ref(0);
    const averageFPS = ref(60);
    const fpsHistory = [];
    
    // LOD设置 - 增强星空密度
    const lodSettings = {
      high: {
        starCount: 3000, // 增加高性能模式下的星星数量
        planetSegments: 32,
        aspectSegments: 20,
        enableGlow: true,
        enableAnimation: true,
        pixelRatio: 2
      },
      medium: {
        starCount: 1800, // 增加中等性能模式下的星星数量
        planetSegments: 16,
        aspectSegments: 12,
        enableGlow: true,
        enableAnimation: true,
        pixelRatio: 1.5
      },
      low: {
        starCount: 800, // 增加低性能模式下的星星数量
        planetSegments: 8,
        aspectSegments: 8,
        enableGlow: false,
        enableAnimation: false,
        pixelRatio: 1
      }
    };

    // Three.js 核心对象
    let scene, camera, renderer, controls;
    let planetSpheres = [];
    let zodiacRing, houseRing, aspectLines;
    let starField, energyCore;
    let animationId;

    // 性能监控
    let frameCount = 0;
    let lastTime = performance.now();
    let frameStartTime = 0;
    let lowPerformanceFrames = 0;

    // 国际化
    const currentLanguage = ref(getCurrentLanguage());
    const getLocalizedText = (key) => {
      return getTranslation(key, currentLanguage.value);
    };

    // 性能检测和自适应设置
    const detectPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        performanceMode.value = 'low';
        return;
      }
      
      // 检测GPU信息
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      let gpu = '';
      if (debugInfo) {
        gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
      }
      
      // 检测设备性能
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      
      // 移动设备或低性能设备
      if (isMobile.value || memory < 4 || hardwareConcurrency < 4) {
        performanceMode.value = 'low';
      } else if (gpu.includes('intel') || memory < 8) {
        performanceMode.value = 'medium';
      } else {
        performanceMode.value = 'high';
      }
      
      console.log(`性能检测: ${performanceMode.value}, 移动端: ${isMobile.value}, 内存: ${memory}GB, CPU核心: ${hardwareConcurrency}`);
    };
    
    // 获取当前LOD设置
    const getCurrentLOD = () => {
      if (!lodEnabled.value) return lodSettings.high;
      
      if (isLowPerformance.value) return lodSettings.low;
      
      return lodSettings[performanceMode.value] || lodSettings.medium;
    };

    // 初始化3D场景
    const init3D = async () => {
      if (!threejsContainer.value) return;
      
      // 性能检测
      detectPerformance();
      const lod = getCurrentLOD();

      // 场景
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000011);

      // 相机
      camera = new THREE.PerspectiveCamera(
        75,
        threejsContainer.value.clientWidth / threejsContainer.value.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 10);

      // 渲染器 - 性能优化设置
      const antialias = !isMobile.value && performanceMode.value !== 'low';
      renderer = new THREE.WebGLRenderer({ 
        antialias: antialias,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(
        threejsContainer.value.clientWidth, 
        threejsContainer.value.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lod.pixelRatio));
      
      // 移动端优化
      if (isMobile.value) {
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(1);
      } else {
        renderer.shadowMap.enabled = lod.enableGlow;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }
      
      threejsContainer.value.appendChild(renderer.domElement);

      // 相机控制
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = true;
      controls.autoRotateSpeed = autoRotateSpeed.value;

      // 创建3D元素
      createStarField();
      createEnergyCore();
      createZodiacRing();
      createHouseRing();
      createPlanets();
      createAspectLines();
      
      // 添加光照
      setupLighting();

      // 移动端优化
      setupMobileOptimizations();
      
      // 开始动画循环
      animate();

      // 处理窗口大小变化
      window.addEventListener('resize', onWindowResize);
    };

    // 创建星空背景 - 使用3D微型几何体 (LOD优化)
    const createStarField = () => {
      starField = new THREE.Group();
      const lod = getCurrentLOD();
      const starCount = Math.min(particleDensity.value, lod.starCount);
      
      // 根据性能模式选择几何体复杂度
      let starGeometries;
      if (performanceMode.value === 'low') {
        // 低性能模式使用简单几何体
        starGeometries = [
          new THREE.BoxGeometry(0.01, 0.01, 0.01),
          new THREE.SphereGeometry(0.01, 3, 3)
        ];
      } else if (performanceMode.value === 'medium') {
        starGeometries = [
          new THREE.TetrahedronGeometry(0.015, 0),
          new THREE.SphereGeometry(0.01, 4, 4),
          new THREE.BoxGeometry(0.01, 0.01, 0.01)
        ];
      } else {
        // 高性能模式使用完整几何体
        starGeometries = [
          new THREE.TetrahedronGeometry(0.02, 0),
          new THREE.OctahedronGeometry(0.015),
          new THREE.SphereGeometry(0.01, 4, 4),
          new THREE.BoxGeometry(0.01, 0.01, 0.01)
        ];
      }

      for (let i = 0; i < starCount; i++) {
        // 随机选择几何体类型
        const geometry = starGeometries[Math.floor(Math.random() * starGeometries.length)];
        
        // 创建材质
        const color = new THREE.Color();
        color.setHSL(
          Math.random() * 0.3 + 0.5, // 偏向蓝白色
          0.7, 
          Math.random() * 0.5 + 0.5
        );
        
        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: Math.random() * 0.7 + 0.3
        });

        const star = new THREE.Mesh(geometry, material);
        
        // 更广泛的随机位置分布
        const distance = Math.random() * 150 + 50; // 距离50-200之间
        const phi = Math.random() * Math.PI * 2; // 方位角
        const theta = Math.random() * Math.PI; // 极角
        
        star.position.set(
          distance * Math.sin(theta) * Math.cos(phi),
          distance * Math.sin(theta) * Math.sin(phi),
          distance * Math.cos(theta)
        );
        
        // 随机旋转
        star.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );
        
        // 随机缩放
        const scale = Math.random() * 0.8 + 0.2;
        star.scale.setScalar(scale);
        
        // 添加动画数据
        star.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
          },
          twinkleSpeed: Math.random() * 0.05 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          originalOpacity: material.opacity
        };
        
        starField.add(star);
      }
      
      scene.add(starField);
    };

    // 创建能量核心
    const createEnergyCore = () => {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x4444ff,
        transparent: true,
        opacity: 0.7
      });
      
      energyCore = new THREE.Mesh(geometry, material);
      
      // 添加发光效果
      const glowGeometry = new THREE.SphereGeometry(0.7, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.5 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            vec3 glow = vec3(0.3, 0.6, 1.0) * intensity;
            gl_FragColor = vec4(glow + sin(time) * 0.1, 1.0);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      energyCore.add(glowMesh);
      
      scene.add(energyCore);
    };

    // 创建星座环 - 带文字标签版本，包含用户重要星座标记
    const createZodiacRing = () => {
      if (!showZodiacLabels.value) return;
      
      zodiacRing = new THREE.Group();
      
      // 创建一个完整的星座环
      const ringGeometry = new THREE.TorusGeometry(
        4.5, // 主半径
        0.05, // 管半径 - 更细的环
        16, // 径向分段
        100 // 管道分段
      );
      
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.6
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      zodiacRing.add(ring);
      
      // 获取用户的重要星座信息
      const userImportantSigns = getUserImportantSigns();
      
      // 星座数据：名称、符号、颜色
      const zodiacData = [
        { name: 'Aries', symbol: '♈', color: 0xff4444, cnName: '白羊座' },
        { name: 'Taurus', symbol: '♉', color: 0x44ff44, cnName: '金牛座' },
        { name: 'Gemini', symbol: '♊', color: 0xffff44, cnName: '双子座' },
        { name: 'Cancer', symbol: '♋', color: 0x4444ff, cnName: '巨蟹座' },
        { name: 'Leo', symbol: '♌', color: 0xff8844, cnName: '狮子座' },
        { name: 'Virgo', symbol: '♍', color: 0x884488, cnName: '处女座' },
        { name: 'Libra', symbol: '♎', color: 0x44ffff, cnName: '天秤座' },
        { name: 'Scorpio', symbol: '♏', color: 0xff4488, cnName: '天蝎座' },
        { name: 'Sagittarius', symbol: '♐', color: 0x8844ff, cnName: '射手座' },
        { name: 'Capricorn', symbol: '♑', color: 0x448844, cnName: '摩羯座' },
        { name: 'Aquarius', symbol: '♒', color: 0x4488ff, cnName: '水瓶座' },
        { name: 'Pisces', symbol: '♓', color: 0xff8888, cnName: '双鱼座' }
      ];
      
      zodiacData.forEach((zodiac, index) => {
        const angle = (index * 30) * Math.PI / 180;
        const x = Math.cos(angle) * 4.5;
        const z = Math.sin(angle) * 4.5;
        
        // 检查是否为用户重要星座
        const isImportant = userImportantSigns.isImportantSign(zodiac.name);
        const importantType = userImportantSigns.getSignType(zodiac.name);
        
        // 创建增强的星座标记点群组
        const zodiacGroup = new THREE.Group();
        
        // 主标记点 - 根据重要性调整大小和材质
        const mainMarkerRadius = isImportant ? 0.16 : 0.12;
        const mainMarkerGeometry = new THREE.SphereGeometry(mainMarkerRadius, 16, 16);
        
        let mainMarkerMaterial;
        if (isImportant) {
          // 重要星座使用特殊材质
          mainMarkerMaterial = new THREE.MeshPhongMaterial({
            color: zodiac.color,
            emissive: new THREE.Color(zodiac.color).multiplyScalar(0.5),
            shininess: 200,
            transparent: true,
            opacity: 0.95
          });
        } else {
          // 普通星座使用标准材质
          mainMarkerMaterial = new THREE.MeshPhongMaterial({
            color: zodiac.color,
            emissive: new THREE.Color(zodiac.color).multiplyScalar(0.3),
            shininess: 100
          });
        }
        
        const mainMarker = new THREE.Mesh(mainMarkerGeometry, mainMarkerMaterial);
        zodiacGroup.add(mainMarker);
        
        // 如果是重要星座，添加特殊光环效果
        if (isImportant) {
          createImportantSignEffects(zodiacGroup, zodiac, importantType);
        }
        
        // 创建星座专属的几何装饰
        createZodiacDecoration(zodiacGroup, zodiac);
        
        // 设置组的位置
        zodiacGroup.position.set(x, 0, z);
        
        // 添加动画数据 - 重要星座有不同的动画参数
        zodiacGroup.userData = {
          zodiacName: zodiac.name,
          isImportant: isImportant,
          importantType: importantType,
          rotationSpeed: isImportant ? 0.015 + Math.random() * 0.01 : 0.01 + Math.random() * 0.01,
          pulseSpeed: isImportant ? 0.03 + Math.random() * 0.015 : 0.02 + Math.random() * 0.01,
          pulsePhase: (index / 12) * Math.PI * 2
        };
        
        zodiacRing.add(zodiacGroup);
        
        // 创建连接线到环中心，增强视觉连接
        createZodiacConnectionLine(zodiac, x, z, index, isImportant);
        
        // 创建文字标签 - 重要星座有特殊标记
        createZodiacLabel(zodiac, x, z, index, isImportant, importantType);
      });
      
      console.log(`创建了星座环，包含${zodiacData.length}个星座和标签`);
      scene.add(zodiacRing);
    };

    // 获取用户的重要星座信息（太阳、月亮、上升）
    const getUserImportantSigns = () => {
      const planets = props.chartData.planets || [];
      const result = {
        sunSign: null,
        moonSign: null,
        ascendantSign: null
      };
      
      // 查找太阳星座
      const sun = planets.find(planet => 
        checkIsSun(planet)
      );
      if (sun && sun.sign) {
        result.sunSign = sun.sign;
      }
      
      // 查找月亮星座
      const moon = planets.find(planet => 
        checkIsMoon(planet)
      );
      if (moon && moon.sign) {
        result.moonSign = moon.sign;
      }
      
      // 查找上升星座
      const ascendant = planets.find(planet => {
        const name = planet.name || planet.displayName || planet.id || '';
        return name.toLowerCase().includes('ascendant') || 
               name.toLowerCase().includes('asc') ||
               name.toLowerCase().includes('上升') ||
               planet.symbol === 'ASC' || 
               planet.symbol === '⬆';
      });
      if (ascendant && ascendant.sign) {
        result.ascendantSign = ascendant.sign;
      }
      
      console.log('用户重要星座:', result);
      
      return {
        isImportantSign: (signName) => {
          return result.sunSign === signName || 
                 result.moonSign === signName || 
                 result.ascendantSign === signName;
        },
        getSignType: (signName) => {
          if (result.sunSign === signName) return 'sun';
          if (result.moonSign === signName) return 'moon';
          if (result.ascendantSign === signName) return 'ascendant';
          return null;
        },
        data: result
      };
    };

    // 为重要星座创建特殊效果
    const createImportantSignEffects = (zodiacGroup, zodiac, importantType) => {
      // 根据重要星座类型创建不同的特殊效果
      switch (importantType) {
        case 'sun': // 太阳星座 - 金色光环和射线
          createSunSignEffects(zodiacGroup);
          break;
        case 'moon': // 月亮星座 - 银色光环和月相
          createMoonSignEffects(zodiacGroup);
          break;
        case 'ascendant': // 上升星座 - 彩虹光环和箭头
          createAscendantSignEffects(zodiacGroup);
          break;
      }
    };

    // 太阳星座特殊效果
    const createSunSignEffects = (zodiacGroup) => {
      // 创建金色外光环
      const sunRingGeometry = new THREE.TorusGeometry(0.25, 0.04, 8, 24);
      const sunRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.8
      });
      const sunRing = new THREE.Mesh(sunRingGeometry, sunRingMaterial);
      sunRing.rotation.x = Math.PI / 2;
      zodiacGroup.add(sunRing);
      
      // 创建太阳射线
      for (let i = 0; i < 8; i++) {
        const rayGeometry = new THREE.ConeGeometry(0.02, 0.2, 4);
        const rayMaterial = new THREE.MeshBasicMaterial({
          color: 0xffaa00,
          transparent: true,
          opacity: 0.7
        });
        const ray = new THREE.Mesh(rayGeometry, rayMaterial);
        const rayAngle = (i / 8) * Math.PI * 2;
        ray.position.set(
          Math.cos(rayAngle) * 0.3,
          0.25,
          Math.sin(rayAngle) * 0.3
        );
        ray.lookAt(0, 0, 0);
        zodiacGroup.add(ray);
      }
      
      // 添加太阳符号标记
      const sunSymbolSprite = createSymbolSprite('☉', 0xffd700, 0.3);
      sunSymbolSprite.position.set(0, 0.4, 0);
      zodiacGroup.add(sunSymbolSprite);
      
      // 存储效果引用用于动画
      zodiacGroup.userData.sunEffects = [sunRing];
    };

    // 月亮星座特殊效果
    const createMoonSignEffects = (zodiacGroup) => {
      // 创建银色外光环
      const moonRingGeometry = new THREE.TorusGeometry(0.22, 0.03, 8, 24);
      const moonRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xc0c0c0,
        transparent: true,
        opacity: 0.7
      });
      const moonRing = new THREE.Mesh(moonRingGeometry, moonRingMaterial);
      moonRing.rotation.x = Math.PI / 2;
      zodiacGroup.add(moonRing);
      
      // 创建月相装饰
      const crescentGeometry = new THREE.SphereGeometry(0.08, 8, 8, 0, Math.PI, 0, Math.PI);
      const crescentMaterial = new THREE.MeshBasicMaterial({
        color: 0xf0f0f0,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const crescent = new THREE.Mesh(crescentGeometry, crescentMaterial);
      crescent.position.y = 0.25;
      crescent.rotation.z = Math.PI / 4;
      zodiacGroup.add(crescent);
      
      // 添加月亮符号标记
      const moonSymbolSprite = createSymbolSprite('☽', 0xc0c0c0, 0.3);
      moonSymbolSprite.position.set(0, 0.4, 0);
      zodiacGroup.add(moonSymbolSprite);
      
      // 存储效果引用用于动画
      zodiacGroup.userData.moonEffects = [moonRing, crescent];
    };

    // 上升星座特殊效果
    const createAscendantSignEffects = (zodiacGroup) => {
      // 创建彩虹渐变光环
      const ascRingGeometry = new THREE.TorusGeometry(0.24, 0.035, 8, 24);
      const ascRingMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec2 vUv;
          void main() {
            float angle = atan(vUv.y - 0.5, vUv.x - 0.5) + time;
            vec3 color = vec3(
              0.5 + 0.5 * sin(angle * 3.0),
              0.5 + 0.5 * sin(angle * 3.0 + 2.0),
              0.5 + 0.5 * sin(angle * 3.0 + 4.0)
            );
            gl_FragColor = vec4(color, 0.8);
          }
        `,
        transparent: true
      });
      const ascRing = new THREE.Mesh(ascRingGeometry, ascRingMaterial);
      ascRing.rotation.x = Math.PI / 2;
      zodiacGroup.add(ascRing);
      
      // 创建上升箭头
      const arrowGeometry = new THREE.ConeGeometry(0.05, 0.15, 6);
      const arrowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8
      });
      const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
      arrow.position.y = 0.3;
      arrow.rotation.x = Math.PI; // 指向上方
      zodiacGroup.add(arrow);
      
      // 添加ASC符号标记
      const ascSymbolSprite = createSymbolSprite('ASC', 0x00ff88, 0.25);
      ascSymbolSprite.position.set(0, 0.45, 0);
      zodiacGroup.add(ascSymbolSprite);
      
      // 存储效果引用用于动画
      zodiacGroup.userData.ascEffects = [ascRing, arrow];
    };

    // 创建符号精灵
    const createSymbolSprite = (symbol, color, scale) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 128;
      canvas.height = 128;
      
      // 绘制符号背景
      context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      context.beginPath();
      context.arc(64, 64, 60, 0, Math.PI * 2);
      context.fill();
      
      // 绘制白色边框
      context.strokeStyle = 'white';
      context.lineWidth = 4;
      context.stroke();
      
      // 绘制符号
      context.fillStyle = 'white';
      context.font = 'bold 36px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.shadowColor = 'rgba(0, 0, 0, 0.5)';
      context.shadowBlur = 3;
      context.fillText(symbol, 64, 64);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(scale, scale, 1);
      
      return sprite;
    };

    // 创建星座专属几何装饰 - 提升识别度
    const createZodiacDecoration = (zodiacGroup, zodiac) => {
      const decorationColor = new THREE.Color(zodiac.color);
      
      // 根据星座创建不同的装饰图案
      switch (zodiac.name) {
        case 'Aries': { // 白羊座 - 三角形装饰
          const triangleGeometry = new THREE.ConeGeometry(0.08, 0.15, 3);
          const triangleMaterial = new THREE.MeshBasicMaterial({
            color: decorationColor,
            transparent: true,
            opacity: 0.7
          });
          const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
          triangle.position.y = 0.2;
          triangle.rotation.y = Math.PI / 6;
          zodiacGroup.add(triangle);
          break;
        }
          
        case 'Taurus': { // 金牛座 - 环形装饰
          const ringGeometry = new THREE.TorusGeometry(0.12, 0.03, 6, 12);
          const ringMaterial = new THREE.MeshBasicMaterial({
            color: decorationColor,
            transparent: true,
            opacity: 0.6
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.position.y = 0.18;
          ring.rotation.x = Math.PI / 2;
          zodiacGroup.add(ring);
          break;
        }
          
        case 'Gemini': { // 双子座 - 双球装饰
          for (let i = 0; i < 2; i++) {
            const geminiSphere = new THREE.SphereGeometry(0.05, 8, 8);
            const geminiMaterial = new THREE.MeshBasicMaterial({
              color: decorationColor,
              transparent: true,
              opacity: 0.7
            });
            const sphere = new THREE.Mesh(geminiSphere, geminiMaterial);
            sphere.position.set(i === 0 ? -0.1 : 0.1, 0.15, 0);
            zodiacGroup.add(sphere);
          }
          break;
        }
          
        case 'Cancer': { // 巨蟹座 - 壳状装饰
          const shellGeometry = new THREE.SphereGeometry(0.08, 8, 8, 0, Math.PI);
          const shellMaterial = new THREE.MeshBasicMaterial({
            color: decorationColor,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
          });
          const shell = new THREE.Mesh(shellGeometry, shellMaterial);
          shell.position.y = 0.12;
          shell.rotation.z = Math.PI;
          zodiacGroup.add(shell);
          break;
        }
          
        case 'Leo': { // 狮子座 - 尖刺装饰
          for (let i = 0; i < 6; i++) {
            const spikeGeometry = new THREE.ConeGeometry(0.02, 0.12, 4);
            const spikeMaterial = new THREE.MeshBasicMaterial({
              color: decorationColor,
              transparent: true,
              opacity: 0.6
            });
            const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
            const spikeAngle = (i / 6) * Math.PI * 2;
            spike.position.set(
              Math.cos(spikeAngle) * 0.15,
              0.1,
              Math.sin(spikeAngle) * 0.15
            );
            spike.lookAt(zodiacGroup.position);
            zodiacGroup.add(spike);
          }
          break;
        }
          
        case 'Virgo': { // 处女座 - 十字装饰
          const crossBar1 = new THREE.BoxGeometry(0.15, 0.02, 0.02);
          const crossBar2 = new THREE.BoxGeometry(0.02, 0.15, 0.02);
          const crossMaterial = new THREE.MeshBasicMaterial({
            color: decorationColor,
            transparent: true,
            opacity: 0.7
          });
          const cross1 = new THREE.Mesh(crossBar1, crossMaterial);
          const cross2 = new THREE.Mesh(crossBar2, crossMaterial);
          cross1.position.y = 0.18;
          cross2.position.y = 0.18;
          zodiacGroup.add(cross1);
          zodiacGroup.add(cross2);
          break;
        }
          
        case 'Libra': { // 天秤座 - 天平装饰
          const scaleBar = new THREE.BoxGeometry(0.2, 0.02, 0.02);
          const scaleMaterial = new THREE.MeshBasicMaterial({
            color: decorationColor,
            transparent: true,
            opacity: 0.7
          });
          const scale = new THREE.Mesh(scaleBar, scaleMaterial);
          scale.position.y = 0.15;
          zodiacGroup.add(scale);
          
          // 天平两侧
          for (let i = 0; i < 2; i++) {
            const plateGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 8);
            const plate = new THREE.Mesh(plateGeometry, scaleMaterial);
            plate.position.set(i === 0 ? -0.08 : 0.08, 0.12, 0);
            zodiacGroup.add(plate);
          }
          break;
        }
          
        case 'Scorpio': { // 天蝎座 - 弯曲尾巴装饰
          const curvePoints = [];
          for (let i = 0; i <= 10; i++) {
            const t = i / 10;
            curvePoints.push(new THREE.Vector3(
              t * 0.15,
              0.1 + Math.sin(t * Math.PI * 2) * 0.05,
              Math.cos(t * Math.PI) * 0.05
            ));
          }
          const curveGeometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(curvePoints),
            20, 0.01, 6, false
          );
          const curveMaterial = new THREE.MeshBasicMaterial({
            color: decorationColor,
            transparent: true,
            opacity: 0.7
          });
          const curve = new THREE.Mesh(curveGeometry, curveMaterial);
          zodiacGroup.add(curve);
          break;
        }
          
        default: {
          // 默认装饰 - 小型光环
          const defaultRingGeometry = new THREE.TorusGeometry(0.08, 0.02, 4, 8);
          const defaultRingMaterial = new THREE.MeshBasicMaterial({
            color: decorationColor,
            transparent: true,
            opacity: 0.5
          });
          const defaultRing = new THREE.Mesh(defaultRingGeometry, defaultRingMaterial);
          defaultRing.position.y = 0.15;
          defaultRing.rotation.x = Math.PI / 2;
          zodiacGroup.add(defaultRing);
          break;
        }
      }
    };

    // 创建星座连接线 - 增强视觉连接，重要星座有特殊效果
    const createZodiacConnectionLine = (zodiac, x, z, index, isImportant) => {
      // 创建从环中心到星座标记的连接线
      const linePoints = [
        new THREE.Vector3(0, 0, 0), // 环中心
        new THREE.Vector3(x * 0.6, 0, z * 0.6), // 中间点
        new THREE.Vector3(x, 0, z) // 星座位置
      ];
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
      
      // 重要星座使用更亮、更粗的连接线
      const lineMaterial = new THREE.LineBasicMaterial({
        color: zodiac.color,
        transparent: true,
        opacity: isImportant ? 0.8 : 0.4,
        linewidth: isImportant ? 4 : 2
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      
      // 如果是重要星座，添加额外的光晕连接线
      if (isImportant) {
        const glowLineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        const glowLineMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.3,
          linewidth: 6
        });
        const glowLine = new THREE.Line(glowLineGeometry, glowLineMaterial);
        zodiacRing.add(glowLine);
        
        // 存储光晕线引用
        line.userData.glowLine = glowLine;
      }
      
      // 添加动画数据
      line.userData = {
        zodiacName: zodiac.name,
        isImportant: isImportant,
        pulseSpeed: isImportant ? 0.05 + Math.random() * 0.02 : 0.03 + Math.random() * 0.02,
        pulsePhase: (index / 12) * Math.PI * 2,
        originalOpacity: isImportant ? 0.8 : 0.4
      };
      
      zodiacRing.add(line);
    };

    // 创建星座文字标签 - 优化可见性和位置，重要星座有特殊标记
    const createZodiacLabel = (zodiac, x, z, index, isImportant, importantType) => {
      // 创建Canvas用于绘制文字 - 更高分辨率
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = isImportant ? 350 : 300;
      canvas.height = isImportant ? 180 : 150;
      
      // 启用抗锯齿
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      // 重要星座使用特殊背景颜色和效果
      if (isImportant) {
        // 绘制特殊背景（渐变效果）
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        switch (importantType) {
          case 'sun':
            gradient.addColorStop(0, 'rgba(255, 215, 0, 0.95)');
            gradient.addColorStop(1, 'rgba(255, 140, 0, 0.95)');
            break;
          case 'moon':
            gradient.addColorStop(0, 'rgba(192, 192, 192, 0.95)');
            gradient.addColorStop(1, 'rgba(169, 169, 169, 0.95)');
            break;
          case 'ascendant':
            gradient.addColorStop(0, 'rgba(0, 255, 136, 0.95)');
            gradient.addColorStop(1, 'rgba(0, 128, 255, 0.95)');
            break;
        }
        context.fillStyle = gradient;
      } else {
        // 普通星座使用原来的背景
        context.fillStyle = `rgba(${
          (zodiac.color >> 16) & 255
        }, ${
          (zodiac.color >> 8) & 255
        }, ${
          zodiac.color & 255
        }, 0.9)`;
      }
      
      const cornerRadius = 20;
      context.beginPath();
      context.roundRect(10, 10, canvas.width - 20, canvas.height - 20, cornerRadius);
      context.fill();
      
      // 重要星座添加特殊边框
      if (isImportant) {
        context.strokeStyle = 'rgba(255, 255, 255, 1.0)';
        context.lineWidth = 5;
        context.stroke();
        
        // 添加内发光边框
        context.strokeStyle = getImportantSignGlowColor(importantType);
        context.lineWidth = 3;
        context.beginPath();
        context.roundRect(15, 15, canvas.width - 30, canvas.height - 30, cornerRadius - 5);
        context.stroke();
      } else {
        // 普通边框
        context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        context.lineWidth = 3;
        context.stroke();
      }
      
      // 添加内阴影效果
      const shadowGradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      shadowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      context.fillStyle = shadowGradient;
      context.fill();
      
      // 绘制星座符号 - 更大更清晰
      context.fillStyle = 'white';
      context.font = isImportant ? 'bold 64px Arial' : 'bold 56px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // 添加文字阴影
      context.shadowColor = 'rgba(0, 0, 0, 0.7)';
      context.shadowBlur = 4;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      
      // 重要星座在符号旁添加标识
      if (isImportant) {
        let typeSymbol = '';
        switch (importantType) {
          case 'sun': typeSymbol = ' ☉'; break;
          case 'moon': typeSymbol = ' ☽'; break;
          case 'ascendant': typeSymbol = ' ⬆'; break;
        }
        context.fillText(zodiac.symbol + typeSymbol, canvas.width / 2, canvas.height / 2 - 30);
      } else {
        context.fillText(zodiac.symbol, canvas.width / 2, canvas.height / 2 - 25);
      }
      
      // 绘制星座名称 - 支持中英文
      context.font = isImportant ? 'bold 26px Arial' : 'bold 22px Arial';
      const nameText = zodiac.cnName || zodiac.name;
      const yOffset = isImportant ? 35 : 30;
      context.fillText(nameText, canvas.width / 2, canvas.height / 2 + yOffset);
      
      // 重要星座添加类型说明
      if (isImportant) {
        context.font = 'bold 18px Arial';
        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        let typeText = '';
        switch (importantType) {
          case 'sun': typeText = '太阳星座'; break;
          case 'moon': typeText = '月亮星座'; break;
          case 'ascendant': typeText = '上升星座'; break;
        }
        context.fillText(typeText, canvas.width / 2, canvas.height / 2 + 60);
      }
      
      // 重置阴影
      context.shadowColor = 'transparent';
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      
      // 创建纹理
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      // 创建材质 - 优化透明度和混合模式
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.1,
        depthTest: false, // 确保标签不被遮挡
        depthWrite: false
      });
      
      // 创建精灵（始终面向相机的平面）
      const sprite = new THREE.Sprite(spriteMaterial);
      
      // 根据重要性和性能模式调整大小
      const baseScale = performanceMode.value === 'low' ? 0.8 : 1.2;
      const importantScale = isImportant ? 1.3 : 1.0;
      sprite.scale.set(
        baseScale * importantScale * 1.2, 
        baseScale * importantScale * 0.6, 
        1
      );
      
      // 优化位置 - 重要星座稍微远一点以容纳更大的标签
      const labelRadius = isImportant ? 6.2 : 5.8;
      const labelAngle = (index * 30) * Math.PI / 180;
      
      // 添加轻微的高度变化以提高3D效果
      const heightOffset = Math.sin(index * Math.PI / 6) * 0.2;
      
      sprite.position.set(
        Math.cos(labelAngle) * labelRadius,
        heightOffset,
        Math.sin(labelAngle) * labelRadius
      );
      
      // 标记为精灵以便在动画中识别
      sprite.isSprite = true;
      
      // 添加到星座环组
      zodiacRing.add(sprite);
      
      // 存储引用用于动画 - 重要星座有不同的动画参数
      sprite.userData = {
        zodiacName: zodiac.name,
        isImportant: isImportant,
        importantType: importantType,
        originalScale: sprite.scale.clone(),
        pulseSpeed: isImportant ? 0.012 + Math.random() * 0.008 : 0.008 + Math.random() * 0.005,
        pulsePhase: (index / 12) * Math.PI * 2,
        originalOpacity: 1.0
      };
    };

    // 获取重要星座发光颜色
    const getImportantSignGlowColor = (importantType) => {
      switch (importantType) {
        case 'sun': return 'rgba(255, 215, 0, 0.8)';
        case 'moon': return 'rgba(192, 192, 192, 0.8)';
        case 'ascendant': return 'rgba(0, 255, 136, 0.8)';
        default: return 'rgba(255, 255, 255, 0.8)';
      }
    };

    // 更新重要星座的特殊动画效果
    const updateImportantSignAnimations = (zodiacGroup, time, normalizedPhase, importantType) => {
      switch (importantType) {
        case 'sun':
          // 太阳星座动画
          if (zodiacGroup.userData.sunEffects) {
            zodiacGroup.userData.sunEffects.forEach((effect) => {
              // 金色光环的呼吸效果
              if (effect.geometry.type === 'TorusGeometry') {
                effect.rotation.z += 0.01;
                effect.material.opacity = 0.6 + (normalizedPhase * 0.4);
              }
            });
            
            // 太阳射线的旋转和闪烁
            zodiacGroup.children.forEach((child) => {
              if (child.geometry && child.geometry.type === 'ConeGeometry') {
                child.rotation.y += 0.02;
                child.material.opacity = 0.5 + (Math.sin(time * 3) * 0.3);
              }
            });
          }
          break;
          
        case 'moon':
          // 月亮星座动画
          if (zodiacGroup.userData.moonEffects) {
            zodiacGroup.userData.moonEffects.forEach((effect) => {
              // 银色光环的缓慢旋转
              if (effect.geometry.type === 'TorusGeometry') {
                effect.rotation.z += 0.005;
                effect.material.opacity = 0.5 + (normalizedPhase * 0.3);
              }
              // 月相装饰的摆动
              if (effect.geometry.type === 'SphereGeometry') {
                effect.rotation.z = Math.PI / 4 + Math.sin(time * 1.5) * 0.2;
                effect.material.opacity = 0.6 + (normalizedPhase * 0.3);
              }
            });
          }
          break;
          
        case 'ascendant':
          // 上升星座动画
          if (zodiacGroup.userData.ascEffects) {
            zodiacGroup.userData.ascEffects.forEach((effect) => {
              // 彩虹光环的颜色变换
              if (effect.material.uniforms && effect.material.uniforms.time) {
                effect.material.uniforms.time.value = time;
                effect.rotation.z += 0.008;
              }
              // 上升箭头的上下浮动
              if (effect.geometry.type === 'ConeGeometry') {
                const originalY = 0.3;
                effect.position.y = originalY + Math.sin(time * 2) * 0.05;
                effect.material.opacity = 0.6 + (normalizedPhase * 0.3);
              }
            });
          }
          break;
      }
    };

    // 创建宫位环 - 带数字标签版本
    const createHouseRing = () => {
      if (!showHouseRing.value) return;
      
      houseRing = new THREE.Group();
      
      // 创建一个完整的宫位环
      const ringGeometry = new THREE.TorusGeometry(
        3.0, // 主半径
        0.03, // 管半径 - 很细的环
        12, // 径向分段
        80 // 管道分段
      );
      
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa500,
        transparent: true,
        opacity: 0.4
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      houseRing.add(ring);
      
      // 添加宫位标记和标签
      for (let index = 0; index < 12; index++) {
        const angle = (index * 30) * Math.PI / 180;
        const x = Math.cos(angle) * 3.0;
        const z = Math.sin(angle) * 3.0;
        
        // 创建宫位标记点
        const markerGeometry = new THREE.SphereGeometry(0.05, 6, 6);
        const markerMaterial = new THREE.MeshBasicMaterial({
          color: getHouseColor(index + 1)
        });
        
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(x, 0, z);
        
        // 添加动画数据
        marker.userData = {
          houseNumber: index + 1,
          rotationSpeed: 0.005 + Math.random() * 0.005,
          pulseSpeed: 0.03,
          pulsePhase: (index / 12) * Math.PI * 2
        };
        
        houseRing.add(marker);
        
        // 创建宫位数字标签
        createHouseLabel(index + 1, angle);
      }
      
      console.log('创建了宫位环，包含12个宫位和数字标签');
      scene.add(houseRing);
    };

    // 创建宫位数字标签 - 优化可见性和位置
    const createHouseLabel = (houseNumber, angle) => {
      // 创建Canvas用于绘制数字 - 提高分辨率
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 160;
      canvas.height = 160;
      
      // 启用抗锯齿
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      // 创建径向渐变背景
      const houseColor = getHouseColor(houseNumber);
      const gradient = context.createRadialGradient(80, 80, 0, 80, 80, 75);
      gradient.addColorStop(0, `#${houseColor.toString(16).padStart(6, '0')}`);
      gradient.addColorStop(0.8, `#${((houseColor & 0xfefefe) >> 1).toString(16).padStart(6, '0')}`); // 稍暗版本
      gradient.addColorStop(1, `#${((houseColor & 0xfcfcfc) >> 2).toString(16).padStart(6, '0')}`); // 更暗版本
      
      // 绘制圆形背景
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(80, 80, 75, 0, Math.PI * 2);
      context.fill();
      
      // 添加内光晕效果
      const innerGlow = context.createRadialGradient(80, 80, 0, 80, 80, 75);
      innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      innerGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)');
      innerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = innerGlow;
      context.fill();
      
      // 绘制多层边框效果
      context.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      context.lineWidth = 5;
      context.stroke();
      
      context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      context.lineWidth = 2;
      context.beginPath();
      context.arc(80, 80, 68, 0, Math.PI * 2);
      context.stroke();
      
      // 绘制数字 - 添加阴影和高亮效果
      context.fillStyle = 'white';
      context.font = 'bold 56px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // 添加数字阴影
      context.shadowColor = 'rgba(0, 0, 0, 0.8)';
      context.shadowBlur = 6;
      context.shadowOffsetX = 3;
      context.shadowOffsetY = 3;
      
      context.fillText(houseNumber.toString(), 80, 80);
      
      // 添加数字高光
      context.shadowColor = 'transparent';
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      
      context.fillStyle = 'rgba(255, 255, 255, 0.4)';
      context.font = 'bold 54px Arial';
      context.fillText(houseNumber.toString(), 78, 78);
      
      // 创建纹理
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      // 创建材质 - 优化渲染设置
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.05,
        depthTest: false, // 确保标签不被遮挡
        depthWrite: false
      });
      
      // 创建精灵
      const sprite = new THREE.Sprite(spriteMaterial);
      
      // 根据性能模式调整大小
      const baseScale = performanceMode.value === 'low' ? 0.5 : 0.7;
      sprite.scale.set(baseScale, baseScale, 1);
      
      // 优化位置 - 确保在宫位环内且清晰可见
      const labelRadius = 2.8; // 稍微调整位置
      
      // 添加轻微的随机高度变化
      const heightOffset = (Math.sin(houseNumber * Math.PI / 6) * 0.1) + (Math.random() - 0.5) * 0.05;
      
      sprite.position.set(
        Math.cos(angle) * labelRadius,
        heightOffset,
        Math.sin(angle) * labelRadius
      );
      
      // 标记为精灵以便在动画中识别
      sprite.isSprite = true;
      
      // 添加到宫位环组
      houseRing.add(sprite);
      
      // 存储引用用于动画 - 优化动画参数
      sprite.userData = {
        houseNumber: houseNumber,
        originalScale: sprite.scale.clone(),
        pulseSpeed: 0.01 + Math.random() * 0.008, // 更柔和的动画
        pulsePhase: (houseNumber / 12) * Math.PI * 2,
        originalOpacity: 1.0
      };
    };

    // 检查是否为太阳
    const checkIsSun = (planet) => {
      const sunNames = ['Sun', '太阳', 'sun', 'SUN', '日', 'Sol'];
      const name = planet.name || planet.displayName || planet.id || '';
      const symbol = planet.symbol || '';
      
      return sunNames.some(sunName => 
        name.toLowerCase().includes(sunName.toLowerCase()) ||
        symbol.includes('☉') || symbol.includes('○')
      );
    };

    // 检查是否为月亮
    const checkIsMoon = (planet) => {
      const moonNames = ['Moon', '月亮', 'moon', 'MOON', '月', 'Luna'];
      const name = planet.name || planet.displayName || planet.id || '';
      const symbol = planet.symbol || '';
      
      return moonNames.some(moonName => 
        name.toLowerCase().includes(moonName.toLowerCase()) ||
        symbol.includes('☽') || symbol.includes('☾') || symbol.includes(')')
      );
    };

    // 创建行星 (包含太阳和月亮的特殊效果)
    const createPlanets = () => {
      planetSpheres = [];
      const lod = getCurrentLOD();
      
      const planets = props.chartData.planets || [];
      console.log('行星数据:', planets);
      
      // 详细打印每个行星的信息以便调试
      planets.forEach((planet, index) => {
        console.log(`行星 ${index}:`, {
          name: planet.name,
          displayName: planet.displayName,
          id: planet.id,
          symbol: planet.symbol
        });
      });
      
      planets.forEach((planet) => {
        // 使用正确的黄道经度计算位置
        let longitude = 0;
        if (planet.longitude !== undefined) {
          longitude = planet.longitude;
        } else if (planet.eclipticLongitude !== undefined) {
          longitude = planet.eclipticLongitude;
        } else if (planet.position && planet.position.longitude !== undefined) {
          longitude = planet.position.longitude;
        } else {
          // 如果没有经度数据，使用随机分布
          longitude = Math.random() * 360;
          console.warn(`行星 ${planet.name} 缺少经度数据，使用随机位置:`, longitude);
        }
        
        const angle = (longitude * Math.PI) / 180;
        const radius = 3.8; // 稍微调整半径以避免与星座环重叠
        
        // 根据行星类型设置大小和特殊效果
        let planetRadius = 0.1;
        let hasSpecialEffect = false;
        
        // 检查是否为太阳和月亮 - 支持多种名称格式
        const isSun = checkIsSun(planet);
        const isMoon = checkIsMoon(planet);
        
        if (isSun) {
          planetRadius = 0.18; // 太阳更大
          hasSpecialEffect = true;
          console.log('检测到太阳:', planet.name);
        } else if (isMoon) {
          planetRadius = 0.15; // 月亮较大  
          hasSpecialEffect = true;
          console.log('检测到月亮:', planet.name);
        }
        
        // 行星球体 - 根据性能调整分段数
        const segments = Math.max(8, lod.planetSegments);
        const geometry = new THREE.SphereGeometry(planetRadius, segments, segments);
        
        // 为太阳和月亮创建特殊材质
        let material;
        if (isSun) {
          // 太阳：发光材质
          material = new THREE.MeshBasicMaterial({
            color: 0xffd700,
            emissive: 0xffaa00,
            emissiveIntensity: 0.3
          });
        } else if (isMoon) {
          // 月亮：反光材质
          material = new THREE.MeshPhongMaterial({
            color: 0xf0f0f0,
            shininess: 200,
            specular: 0x666666
          });
        } else {
          // 其他行星：标准材质
          material = new THREE.MeshPhongMaterial({
            color: getPlanetColor(planet.name),
            shininess: 100
          });
        }
        
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 0.3, // 轻微的高度变化
          Math.sin(angle) * radius
        );
        
        // 为太阳和月亮添加特殊效果（即使在低性能模式下也显示基本效果）
        if (hasSpecialEffect) {
          if (isSun) {
            // 太阳特殊效果：多层光环
            createSunEffects(sphere, lod);
          } else if (isMoon) {
            // 月亮特殊效果：月相和光环
            createMoonEffects(sphere, lod);
          }
        } else if (lod.enableGlow && !isMobile.value) {
          // 其他行星的标准光晕
          createStandardPlanetGlow(sphere, getPlanetColor(planet.name), lod);
        }
        
        // 添加行星标识
        sphere.userData.planetName = planet.name;
        sphere.userData.planetType = hasSpecialEffect ? (isSun ? 'sun' : 'moon') : 'planet';
        sphere.userData.glows = sphere.userData.glows || [];
        
        planetSpheres.push({
          mesh: sphere,
          planet: planet,
          originalAngle: angle
        });
        
        scene.add(sphere);
      });
    };

    // 创建太阳特殊效果
    const createSunEffects = (sunMesh, lod) => {
      console.log('创建太阳效果, LOD:', lod);
      
      // 简化的太阳光环效果 - 使用基本材质确保兼容性
      const glowGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.4
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      sunMesh.add(glow);
      
      // 太阳光芒效果
      const rayGeometry = new THREE.RingGeometry(0.25, 0.5, 8);
      const rayMaterial = new THREE.MeshBasicMaterial({
        color: 0xffdd44,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      });
      const rays = new THREE.Mesh(rayGeometry, rayMaterial);
      rays.rotation.x = Math.PI / 2;
      sunMesh.add(rays);
      
      // 如果支持高级效果，添加shader光环
      if (lod.enableGlow && !isMobile.value) {
        const advancedGlowGeometry = new THREE.SphereGeometry(0.4, 12, 12);
        const advancedGlowMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 }
          },
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.5 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
              vec3 sunColor = vec3(1.0, 0.7, 0.0);
              float pulse = sin(time * 2.0) * 0.3 + 0.7;
              gl_FragColor = vec4(sunColor * intensity * pulse, intensity * 0.6);
            }
          `,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        });
        const advancedGlow = new THREE.Mesh(advancedGlowGeometry, advancedGlowMaterial);
        sunMesh.add(advancedGlow);
        
        sunMesh.userData.glows = [glow, rays, advancedGlow];
      } else {
        sunMesh.userData.glows = [glow, rays];
      }
      
      console.log('太阳效果创建完成，光晕数量:', sunMesh.userData.glows.length);
    };

    // 创建月亮特殊效果
    const createMoonEffects = (moonMesh, lod) => {
      console.log('创建月亮效果, LOD:', lod);
      
      // 简化的月亮光环效果
      const moonGlowGeometry = new THREE.SphereGeometry(0.22, 12, 12);
      const moonGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0xccddff,
        transparent: true,
        opacity: 0.3
      });
      const moonGlow = new THREE.Mesh(moonGlowGeometry, moonGlowMaterial);
      moonMesh.add(moonGlow);
      
      // 月相效果（一个半透明的遮罩）
      const phaseGeometry = new THREE.SphereGeometry(0.16, 12, 12);
      const phaseMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 0.4
      });
      const phase = new THREE.Mesh(phaseGeometry, phaseMaterial);
      phase.position.x = 0.05; // 轻微偏移创造月相效果
      moonMesh.add(phase);
      
      // 如果支持高级效果，添加shader光环
      if (lod.enableGlow && !isMobile.value) {
        const advancedGlowGeometry = new THREE.SphereGeometry(0.25, 12, 12);
        const advancedGlowMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 }
          },
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
              vec3 moonColor = vec3(0.9, 0.9, 1.0);
              float pulse = sin(time * 1.5) * 0.2 + 0.6;
              gl_FragColor = vec4(moonColor * intensity * pulse, intensity * 0.4);
            }
          `,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        });
        const advancedGlow = new THREE.Mesh(advancedGlowGeometry, advancedGlowMaterial);
        moonMesh.add(advancedGlow);
        
        moonMesh.userData.glows = [moonGlow, phase, advancedGlow];
      } else {
        moonMesh.userData.glows = [moonGlow, phase];
      }
      
      console.log('月亮效果创建完成，光晕数量:', moonMesh.userData.glows.length);
    };

    // 创建标准行星光晕
    const createStandardPlanetGlow = (planetMesh, planetColor, lod) => {
      const glowSegments = Math.max(8, lod.planetSegments / 2);
      
      // 内层光晕
      const innerGlowGeometry = new THREE.SphereGeometry(0.15, glowSegments, glowSegments);
      const innerGlowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(planetColor) }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            vec3 glow = color * intensity;
            float pulse = sin(time * 2.0) * 0.3 + 0.7;
            gl_FragColor = vec4(glow * pulse, intensity * 0.8);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
      planetMesh.add(innerGlow);
      
      // 外层光晕
      const outerGlowGeometry = new THREE.SphereGeometry(0.25, glowSegments, glowSegments);
      const outerGlowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(planetColor) }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.5 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
            vec3 glow = color * intensity;
            float pulse = sin(time * 1.5 + 1.0) * 0.2 + 0.5;
            gl_FragColor = vec4(glow * pulse, intensity * 0.4);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
      planetMesh.add(outerGlow);
      
      planetMesh.userData.glows = [innerGlow, outerGlow];
    };

    // 创建相位线 - 简化版本使用直线
    const createAspectLines = () => {
      if (!showAspects.value) return;
      
      aspectLines = new THREE.Group();
      
      const aspects = props.chartData.aspects || [];
      // 在低性能模式下限制相位线数量
      const maxAspects = performanceMode.value === 'low' ? 5 : Math.min(aspects.length, 10);
      
      aspects.slice(0, maxAspects).forEach((aspect) => {
        const planet1 = planetSpheres.find(p => p.planet.name === aspect.planet1);
        const planet2 = planetSpheres.find(p => p.planet.name === aspect.planet2);
        
        if (planet1 && planet2) {
          // 使用简单的直线几何体
          const start = planet1.mesh.position.clone();
          const end = planet2.mesh.position.clone();
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);
          const aspectProps = getAspectProperties(aspect.type);
          
          const lineMaterial = new THREE.LineBasicMaterial({
            color: aspectProps.color,
            transparent: true,
            opacity: aspectProps.opacity * 0.7,
            linewidth: 2
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          
          // 添加动画数据
          line.userData = {
            aspectType: aspect.type,
            pulseSpeed: aspectProps.pulseSpeed,
            pulsePhase: Math.random() * Math.PI * 2,
            originalOpacity: aspectProps.opacity * 0.7
          };
          
          aspectLines.add(line);
        }
      });
      
      if (aspectLines.children.length > 0) {
        scene.add(aspectLines);
        console.log(`创建了${aspectLines.children.length}条简化相位线`);
      }
    };

    // 获取相位属性
    const getAspectProperties = (aspectType) => {
      const properties = {
        'Conjunction': {
          color: 0xffff00,
          radius: 0.02,
          opacity: 0.8,
          pulseSpeed: 0.03
        },
        'Sextile': {
          color: 0x44ff44,
          radius: 0.015,
          opacity: 0.6,
          pulseSpeed: 0.02
        },
        'Square': {
          color: 0xff4444,
          radius: 0.025,
          opacity: 0.7,
          pulseSpeed: 0.04
        },
        'Trine': {
          color: 0x4444ff,
          radius: 0.02,
          opacity: 0.7,
          pulseSpeed: 0.025
        },
        'Opposition': {
          color: 0xff8844,
          radius: 0.03,
          opacity: 0.8,
          pulseSpeed: 0.035
        }
      };
      
      return properties[aspectType] || {
        color: 0x888888,
        radius: 0.015,
        opacity: 0.5,
        pulseSpeed: 0.02
      };
    };

    // 设置光照 - 增强环形结构的可见性
    const setupLighting = () => {
      // 环境光 - 提高亮度以确保环形结构可见
      const ambientLight = new THREE.AmbientLight(0x606060, 0.8);
      scene.add(ambientLight);
      
      // 主光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);
      
      // 点光源（用于行星照明）
      const pointLight = new THREE.PointLight(0xffffff, 0.6, 50);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);
      
      // 额外的定向光源以照亮环形结构
      const sideLight = new THREE.DirectionalLight(0x4444ff, 0.4);
      sideLight.position.set(-5, 0, 5);
      scene.add(sideLight);
    };

    // 动画循环 (性能优化)
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // 性能监控
      const startTime = performance.now();
      
      if (!animationEnabled.value || (isLowPerformance.value && !getCurrentLOD().enableAnimation)) {
        // 低性能模式下减少渲染频率
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
        return;
      }
      
      const time = performance.now() * 0.001;
      
      // 更新能量核心
      if (energyCore) {
        energyCore.rotation.y += 0.01;
        energyCore.children[0].material.uniforms.time.value = time;
      }
      
      // 更新星空 - 3D星星动画
      if (starField) {
        starField.rotation.y += 0.0005;
        
        // 更新每个星星的动画
        starField.children.forEach((star) => {
          if (star.userData.rotationSpeed) {
            // 旋转动画
            star.rotation.x += star.userData.rotationSpeed.x;
            star.rotation.y += star.userData.rotationSpeed.y;
            star.rotation.z += star.userData.rotationSpeed.z;
            
            // 闪烁动画
            star.userData.twinklePhase += star.userData.twinkleSpeed;
            const twinkle = Math.sin(star.userData.twinklePhase) * 0.3 + 0.7;
            star.material.opacity = star.userData.originalOpacity * twinkle;
          }
        });
      }
      
      // 更新行星轨道动画（包含太阳和月亮特殊效果）
      planetSpheres.forEach((planetData, planetIndex) => {
        const { mesh, originalAngle } = planetData;
        const orbitSpeed = 0.1 + planetIndex * 0.02;
        const newAngle = originalAngle + time * orbitSpeed * 0.1;
        const radius = 3.8;
        
        // 根据行星类型设置不同的动画
        if (mesh.userData.planetType === 'sun') {
          // 太阳的特殊动画：更慢的移动，更强的脉冲
          const sunAngle = originalAngle + time * 0.05;
          mesh.position.set(
            Math.cos(sunAngle) * radius,
            Math.sin(time * 0.5) * 0.05, // 轻微的上下浮动
            Math.sin(sunAngle) * radius
          );
          
          // 太阳自转
          mesh.rotation.y += 0.01;
          
          // 太阳光芒旋转
          if (mesh.userData.glows && mesh.userData.glows[2]) {
            mesh.userData.glows[2].rotation.z += 0.005; // 光芒旋转
          }
          
        } else if (mesh.userData.planetType === 'moon') {
          // 月亮的特殊动画：较快的轨道运动
          const moonAngle = originalAngle + time * 0.3;
          mesh.position.set(
            Math.cos(moonAngle) * radius,
            Math.sin(time * 2.0 + planetIndex) * 0.08, // 轻微的波浪运动
            Math.sin(moonAngle) * radius
          );
          
          // 月亮自转（展现月相变化）
          mesh.rotation.y += 0.008;
          
          // 月相效果变化
          if (mesh.userData.glows && mesh.userData.glows[1]) {
            const phaseShift = Math.sin(time * 0.1) * 0.1;
            mesh.userData.glows[1].position.x = 0.05 + phaseShift;
          }
          
        } else {
          // 其他行星的标准动画
          mesh.position.set(
            Math.cos(newAngle) * radius,
            Math.sin(time + planetIndex) * 0.1,
            Math.sin(newAngle) * radius
          );
          
          mesh.rotation.y += 0.02;
        }
        
        // 更新所有行星的光晕动画
        if (mesh.userData.glows) {
          mesh.userData.glows.forEach((glow) => {
            if (glow.material.uniforms && glow.material.uniforms.time) {
              glow.material.uniforms.time.value = time;
            }
          });
        }
      });
      
      // 更新星座环动画 - 优化动画效果，包含新的装饰元素
      if (zodiacRing) {
        zodiacRing.children.forEach((child) => {
          if (child.userData.zodiacName) {
            child.userData.pulsePhase += child.userData.pulseSpeed || 0.02;
            
            // 更柔和的脉冲动画曲线
            const normalizedPhase = (Math.sin(child.userData.pulsePhase) + 1) / 2; // 0-1范围
            const smoothPulse = 0.8 + (normalizedPhase * 0.3); // 0.8-1.1范围，更温和的变化
            
            // 处理不同类型的子元素
            if (child.isSprite) {
              // 文字标签的优化动画
              const scale = child.userData.originalScale.clone();
              scale.multiplyScalar(smoothPulse);
              child.scale.copy(scale);
              
              // 透明度动画更稳定
              const opacityPulse = 0.85 + (normalizedPhase * 0.15); // 0.85-1.0范围
              child.material.opacity = child.userData.originalOpacity * opacityPulse;
              
              // 添加轻微的旋转效果让标签更有活力
              child.material.rotation = Math.sin(child.userData.pulsePhase * 0.5) * 0.05;
            } else if (child.isGroup || child.type === 'Group') {
              // 星座装饰群组动画 - 重要星座有增强效果
              const isImportant = child.userData.isImportant;
              const importantType = child.userData.importantType;
              
              if (child.userData.rotationSpeed) {
                child.rotation.y += child.userData.rotationSpeed;
              }
              
              // 更新群组内所有装饰元素
              child.children.forEach((decoration) => {
                if (decoration.material) {
                  // 装饰元素的脉冲效果
                  decoration.material.opacity = (decoration.material.opacity || 0.7) * smoothPulse;
                  
                  // 添加轻微的个别旋转
                  if (decoration.geometry.type === 'ConeGeometry') {
                    decoration.rotation.y += 0.01; // 锥形装饰旋转
                  } else if (decoration.geometry.type === 'TorusGeometry') {
                    decoration.rotation.z += 0.005; // 环形装饰旋转
                  }
                }
              });
              
              // 更新重要星座的特殊效果动画
              if (isImportant) {
                updateImportantSignAnimations(child, time, normalizedPhase, importantType);
              }
              
              // 整个群组的轻微浮动 - 重要星座浮动更明显
              const floatIntensity = isImportant ? 0.05 : 0.03;
              const floatOffset = Math.sin(child.userData.pulsePhase * 0.8) * floatIntensity;
              child.position.y = floatOffset;
            } else if (child.type === 'Line') {
              // 连接线的脉冲动画 - 重要星座连接线更亮
              const isImportantLine = child.userData.isImportant;
              const basePulse = isImportantLine ? 0.4 : 0.2;
              const pulseRange = isImportantLine ? 0.8 : 0.6;
              const linePulse = basePulse + (normalizedPhase * pulseRange);
              child.material.opacity = child.userData.originalOpacity * linePulse;
              
              // 重要星座连接线的额外光晕效果
              if (isImportantLine && child.userData.glowLine) {
                const glowPulse = 0.1 + (normalizedPhase * 0.4);
                child.userData.glowLine.material.opacity = 0.3 * glowPulse;
              }
              
              // 连接线的流动效果（通过修改线条的渲染偏移）
              if (child.material.uniforms && child.material.uniforms.time) {
                child.material.uniforms.time.value = time;
              }
            } else if (child.material && child.material.opacity !== undefined) {
              // 其他元素的基础透明度动画
              child.material.opacity = smoothPulse * 0.8;
            }
          }
        });
      }
      
      // 更新宫位环动画 - 优化动画效果
      if (houseRing) {
        houseRing.children.forEach((houseElement) => {
          if (houseElement.userData.houseNumber && houseElement.userData.pulseSpeed) {
            // 宫位动画
            houseElement.userData.pulsePhase += houseElement.userData.pulseSpeed;
            
            // 更柔和的脉冲动画曲线
            const normalizedPhase = (Math.sin(houseElement.userData.pulsePhase) + 1) / 2; // 0-1范围
            const smoothPulse = 0.85 + (normalizedPhase * 0.2); // 0.85-1.05范围，比星座更稳定
            
            // 区分标记点和数字标签
            if (houseElement.isSprite) {
              // 数字标签的优化动画
              const scale = houseElement.userData.originalScale.clone();
              scale.multiplyScalar(smoothPulse);
              houseElement.scale.copy(scale);
              
              // 宫位标签透明度更稳定
              const opacityPulse = 0.9 + (normalizedPhase * 0.1); // 0.9-1.0范围
              houseElement.material.opacity = houseElement.userData.originalOpacity * opacityPulse;
              
              // 添加非常轻微的浮动效果
              const floatOffset = Math.sin(houseElement.userData.pulsePhase * 0.3) * 0.02;
              houseElement.position.y = houseElement.userData.originalHeight || 0 + floatOffset;
            } else if (houseElement.material && houseElement.material.opacity !== undefined) {
              // 标记点的优化透明度动画
              houseElement.material.opacity = smoothPulse * 0.6;
            }
            
            // 非常轻微的旋转，让宫位标签保持稳定
            if (houseElement.userData.rotationSpeed) {
              houseElement.rotation.y += houseElement.userData.rotationSpeed * 0.5; // 减半旋转速度
            }
          }
        });
      }
      
      // 更新相位线脉冲动画
      if (aspectLines) {
        aspectLines.children.forEach((line) => {
          if (line.userData.pulseSpeed) {
            line.userData.pulsePhase += line.userData.pulseSpeed;
            
            // 脉冲效果
            const pulse = Math.sin(line.userData.pulsePhase) * 0.4 + 0.6;
            line.material.opacity = line.userData.originalOpacity * pulse;
          }
        });
      }
      
      // 更新控制器
      if (controls) {
        controls.update();
      }
      
      // 渲染
      renderer.render(scene, camera);
      
      // 更新性能信息
      updatePerformanceInfo();
      
      // 性能警告
      const renderTime = performance.now() - startTime;
      if (renderTime > 16.67) { // 超过60fps阈值
        console.warn(`渲染时间过长: ${renderTime.toFixed(2)}ms`);
      }
    };

    // 窗口大小变化处理 (移动端优化)
    const onWindowResize = () => {
      if (!threejsContainer.value) return;
      
      // 检测是否切换到移动端
      const wasMobile = isMobile.value;
      isMobile.value = window.innerWidth < 768;
      
      if (wasMobile !== isMobile.value) {
        // 设备类型变化，重新初始化
        console.log(`设备类型变化: ${isMobile.value ? '移动端' : '桌面端'}`);
        cleanup3D();
        setTimeout(init3D, 100);
        return;
      }
      
      camera.aspect = threejsContainer.value.clientWidth / threejsContainer.value.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threejsContainer.value.clientWidth, threejsContainer.value.clientHeight);
    };

    // 辅助函数

    const getHouseColor = (houseNumber) => {
      const hue = (houseNumber * 30) / 360;
      return new THREE.Color().setHSL(hue, 0.7, 0.6).getHex();
    };

    const getPlanetColor = (planetName) => {
      const colors = {
        'Sun': 0xffff00, 'Moon': 0xcccccc, 'Mercury': 0xff8800,
        'Venus': 0xff44ff, 'Mars': 0xff4444, 'Jupiter': 0x8844ff,
        'Saturn': 0x888844, 'Uranus': 0x44ffff, 'Neptune': 0x4444ff,
        'Pluto': 0x884444
      };
      return colors[planetName] || 0x888888;
    };

    // 移除未使用的getAspectColor函数

    // 移除未使用的getZodiacGeometry函数 - 简化版本不再需要

    // 性能监控和自适应调整
    const updatePerformanceInfo = () => {
      frameCount++;
      const currentTime = performance.now();
      
      // 计算帧时间
      if (frameStartTime > 0) {
        frameTime.value = currentTime - frameStartTime;
      }
      frameStartTime = currentTime;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
        currentFPS.value = fps;
        
        // FPS历史记录
        fpsHistory.push(fps);
        if (fpsHistory.length > 10) {
          fpsHistory.shift();
        }
        
        // 计算平均FPS
        averageFPS.value = Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length);
        
        // 性能自适应调整
        if (performanceMode.value === 'auto') {
          adaptPerformance(fps);
        }
        
        frameCount = 0;
        lastTime = currentTime;
        
        if (scene) {
          objectCount.value = scene.children.length;
          triangleCount.value = renderer.info.render.triangles;
        }
      }
    };
    
    // 性能自适应调整
    const adaptPerformance = (fps) => {
      // 检测低性能
      if (fps < 30) {
        lowPerformanceFrames++;
        if (lowPerformanceFrames > 5) {
          // 连续5秒低于30fps，启用低性能模式
          if (!isLowPerformance.value) {
            console.log('检测到性能问题，切换到低性能模式');
            isLowPerformance.value = true;
            optimizeForLowPerformance();
          }
        }
      } else if (fps > 45) {
        lowPerformanceFrames = 0;
        // 性能恢复，可以尝试提升质量
        if (isLowPerformance.value && averageFPS.value > 50) {
          console.log('性能恢复，退出低性能模式');
          isLowPerformance.value = false;
          restorePerformance();
        }
      }
    };
    
    // 优化低性能设备
    const optimizeForLowPerformance = () => {
      // 降低像素比
      renderer.setPixelRatio(0.8);
      
      // 减少粒子数量
      if (starField && starField.children.length > 300) {
        const toRemove = starField.children.slice(300);
        toRemove.forEach(star => starField.remove(star));
      }
      
      // 禁用一些动画
      if (controls) {
        controls.autoRotate = false;
      }
      
      // 降低光晕效果
      planetSpheres.forEach(({ mesh }) => {
        if (mesh.userData.glows) {
          mesh.userData.glows.forEach(glow => {
            glow.visible = false;
          });
        }
      });
    };
    
    // 恢复性能设置
    const restorePerformance = () => {
      const lod = getCurrentLOD();
      
      // 恢复像素比
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lod.pixelRatio));
      
      // 恢复自动旋转
      if (controls && animationEnabled.value) {
        controls.autoRotate = true;
      }
      
      // 恢复光晕效果
      if (lod.enableGlow) {
        planetSpheres.forEach(({ mesh }) => {
          if (mesh.userData.glows) {
            mesh.userData.glows.forEach(glow => {
              glow.visible = true;
            });
          }
        });
      }
    };

    // 控制函数
    const toggle3DMode = () => {
      is3DMode.value = !is3DMode.value;
      if (is3DMode.value) {
        setTimeout(init3D, 100);
      } else {
        cleanup3D();
      }
    };

    const toggleAspects = () => {
      showAspects.value = !showAspects.value;
      if (is3DMode.value) {
        // 重新创建相位线
        if (aspectLines) {
          scene.remove(aspectLines);
        }
        createAspectLines();
      }
    };

    const toggleAnimation = () => {
      animationEnabled.value = !animationEnabled.value;
    };

    const toggleZodiacLabels = () => {
      showZodiacLabels.value = !showZodiacLabels.value;
      
      if (is3DMode.value && scene) {
        // 移除现有星座环
        if (zodiacRing) {
          scene.remove(zodiacRing);
        }
        // 重新创建
        createZodiacRing();
      }
    };

    const resetCamera = () => {
      if (camera && controls) {
        camera.position.set(0, 0, 10);
        controls.reset();
      }
    };

    const updateAutoRotation = () => {
      if (controls) {
        controls.autoRotateSpeed = autoRotateSpeed.value;
      }
    };

    const updateZoom = () => {
      if (camera) {
        camera.position.setLength(10 / zoomLevel.value);
      }
    };

    const updateParticles = () => {
      if (starField) {
        scene.remove(starField);
        createStarField();
      }
    };
    
    // 切换性能模式
    const setPerformanceMode = (mode) => {
      performanceMode.value = mode;
      
      if (scene && renderer) {
        const lod = getCurrentLOD();
        
        // 更新像素比
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, lod.pixelRatio));
        
        // 重建星空
        if (starField) {
          scene.remove(starField);
          createStarField();
        }
        
        // 重建行星
        planetSpheres.forEach(p => scene.remove(p.mesh));
        createPlanets();
        
        // 重建相位线
        if (aspectLines) {
          scene.remove(aspectLines);
          createAspectLines();
        }
        
        console.log(`切换到${mode}性能模式`);
      }
    };
    
    // 获取内存使用情况 (保留供调试使用)
    // const getMemoryUsage = () => {
    //   if (performance.memory) {
    //     return {
    //       used: Math.round(performance.memory.usedJSHeapSize / 1048576),
    //       total: Math.round(performance.memory.totalJSHeapSize / 1048576),
    //       limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
    //     };
    //   }
    //   return null;
    // };
    
    // 移动端触摸优化
    const setupMobileOptimizations = () => {
      if (!isMobile.value || !threejsContainer.value) return;
      
      // 禁用上下文菜单
      threejsContainer.value.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
      
      // 优化触摸事件
      threejsContainer.value.style.touchAction = 'none';
      
      // 减少移动端的复杂度
      if (controls) {
        controls.enableDamping = false; // 减少计算
        controls.autoRotateSpeed = 0.5; // 降低旋转速度
      }
    };

    const toggleHouseRing = () => {
      showHouseRing.value = !showHouseRing.value;
      
      if (is3DMode.value && scene) {
        if (houseRing) {
          scene.remove(houseRing);
        }
        if (showHouseRing.value) {
          createHouseRing();
        }
      }
    };

    const updateGlowIntensity = () => {
      planetSpheres.forEach(({ mesh }) => {
        if (mesh.userData.glows) {
          mesh.userData.glows.forEach((glow) => {
            // 直接应用光晕强度
            glow.material.uniforms.color.value.multiplyScalar(glowIntensity.value);
          });
        }
      });
    };

    const updateAspectIntensity = () => {
      if (aspectLines) {
        aspectLines.children.forEach((tube) => {
          tube.material.opacity = tube.userData.originalOpacity * aspectIntensity.value;
          tube.material.emissiveIntensity = tube.userData.originalEmissive * aspectIntensity.value;
        });
      }
    };

    const cleanup3D = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      if (renderer && threejsContainer.value) {
        threejsContainer.value.removeChild(renderer.domElement);
        renderer.dispose();
      }
      
      window.removeEventListener('resize', onWindowResize);
    };

    // 生命周期
    onMounted(() => {
      if (is3DMode.value) {
        setTimeout(init3D, 100);
      }
      
      // 开发模式显示调试信息
      showDebugInfo.value = process.env.NODE_ENV === 'development';
    });

    onUnmounted(() => {
      cleanup3D();
    });

    // 监听数据变化
    watch(() => props.chartData, () => {
      if (is3DMode.value && scene) {
        // 清除现有元素
        planetSpheres.forEach(p => scene.remove(p.mesh));
        if (zodiacRing) scene.remove(zodiacRing);
        if (houseRing) scene.remove(houseRing);
        if (aspectLines) scene.remove(aspectLines);
        
        // 重新创建
        createZodiacRing();
        createHouseRing();
        createPlanets();
        createAspectLines();
      }
    }, { deep: true });
    
    // 移动端特定优化
    watch(isMobile, (newVal, oldVal) => {
      if (newVal !== oldVal && scene) {
        console.log(`移动端状态变化: ${newVal}`);
        // 重新初始化以应用移动端优化
        cleanup3D();
        setTimeout(init3D, 100);
      }
    });

    return {
      // 模板引用
      threejsContainer,
      
      // 响应式数据
      is3DMode,
      showAspects,
      animationEnabled,
      showZodiacLabels,
      showHouseRing,
      autoRotateSpeed,
      zoomLevel,
      particleDensity,
      glowIntensity,
      aspectIntensity,
      showDebugInfo,
      currentFPS,
      objectCount,
      triangleCount,
      
      // 性能优化相关
      performanceMode,
      lodEnabled,
      isMobile,
      isLowPerformance,
      frameTime,
      averageFPS,
      
      // 方法
      toggle3DMode,
      toggleAspects,
      toggleAnimation,
      toggleZodiacLabels,
      toggleHouseRing,
      resetCamera,
      updateAutoRotation,
      updateZoom,
      updateParticles,
      updateGlowIntensity,
      updateAspectIntensity,
      setPerformanceMode,
      getLocalizedText
    };
  }
};
</script>

<style scoped>
.star-chart-3d-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.chart-title {
  color: #fff;
  font-size: 1.5rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.chart-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.control-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.control-btn.active {
  background: rgba(64, 158, 255, 0.8);
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.mode-btn.active {
  background: rgba(255, 107, 107, 0.8);
  border-color: #ff6b6b;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.chart-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  background: radial-gradient(circle, #1a1a2e 0%, #000011 100%);
}

.threejs-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.threejs-container canvas {
  display: block;
  border-radius: 15px;
}

.svg-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls-panel {
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.control-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.control-group:last-child {
  margin-bottom: 0;
}

.control-group label {
  color: #fff;
  font-weight: 500;
  margin-right: 15px;
  min-width: 100px;
}

.control-group input[type="range"] {
  flex: 1;
  margin: 0 10px;
  accent-color: #409eff;
}

.performance-select {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.9rem;
  cursor: pointer;
}

.performance-select:focus {
  outline: none;
  border-color: #409eff;
}

.performance-select option {
  background: #1a1a2e;
  color: white;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.toggle-btn.active {
  background: rgba(64, 158, 255, 0.8);
  border-color: #409eff;
}

.debug-info {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.8rem;
  min-width: 120px;
}

.debug-info div {
  margin-bottom: 5px;
}

.debug-info div:last-child {
  margin-bottom: 0;
}

.mobile-indicator {
  color: #ff9500 !important;
  font-weight: bold;
}

.performance-warning {
  color: #ff6b6b !important;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@media (max-width: 768px) {
  .star-chart-3d-container {
    padding: 15px;
  }
  
  .chart-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .chart-controls {
    justify-content: center;
  }
  
  .control-btn {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
  
  .chart-wrapper {
    height: 400px;
  }
  
  .controls-panel {
    padding: 15px;
  }
  
  .control-group {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .control-group label {
    min-width: auto;
    margin-right: 0;
  }
}

/* 加载动画 */
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}

/* 自定义滚动条 */
.controls-panel::-webkit-scrollbar {
  width: 6px;
}

.controls-panel::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.controls-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.controls-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>