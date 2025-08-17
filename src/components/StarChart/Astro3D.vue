<template>
  <div class="astro3d-container">
    <!-- 标题头部 -->
    <div class="chart-header">
      <h3 class="chart-title">{{ getLocalizedText('starChart.astro3d.title') }}</h3>
      <div class="chart-controls">
        <button 
          @click="resetView" 
          class="control-btn"
          :title="getLocalizedText('starChart.controls.reset')"
        >
          {{ getLocalizedText('starChart.controls.reset') }}
        </button>
        <button 
          @click="handleRunTests"
          class="control-btn"
          :title="getLocalizedText('starChart.astro3d.runTests')"
        >
          {{ getLocalizedText('starChart.astro3d.selfCheck') }}
        </button>
      </div>
    </div>

    <div class="astro3d-content">
      <!-- 控制面板 -->
      <div class="controls-panel">
        <div class="control-section">
          <h4 class="section-title">{{ getLocalizedText('starChart.astro3d.timeLocation') }}</h4>
          
          <!-- 时间控制 -->
          <div class="control-group">
            <label class="control-label">{{ getLocalizedText('starChart.astro3d.dateTime') }}</label>
            <input
              type="datetime-local"
              class="control-input"
              v-model="iso"
            />
          </div>

          <!-- 坐标控制 -->
          <div class="coordinates-grid">
            <div class="coordinate-input">
              <label class="control-label">{{ getLocalizedText('starChart.controls.latitude') }}</label>
              <input 
                type="number" 
                step="0.0001"
                class="control-input"
                v-model.number="lat" 
                :placeholder="getLocalizedText('starChart.astro3d.latitudePlaceholder')"
              />
            </div>
            <div class="coordinate-input">
              <label class="control-label">{{ getLocalizedText('starChart.controls.longitude') }}</label>
              <input 
                type="number" 
                step="0.0001"
                class="control-input"
                v-model.number="lon" 
                :placeholder="getLocalizedText('starChart.astro3d.longitudePlaceholder')"
              />
            </div>
            <div class="coordinate-input">
              <label class="control-label">{{ getLocalizedText('starChart.astro3d.altitude') }}</label>
              <input 
                type="number" 
                step="1"
                class="control-input"
                v-model.number="height" 
                :placeholder="getLocalizedText('starChart.astro3d.altitudePlaceholder')"
              />
            </div>
          </div>
        </div>

        <div class="control-section">
          <h4 class="section-title">{{ getLocalizedText('starChart.astro3d.displayOptions') }}</h4>
          
          <!-- 显示选项 -->
          <div class="toggle-controls">
            <label class="toggle-label">
              <input type="checkbox" v-model="showEquator" />
              <span class="toggle-text">{{ getLocalizedText('starChart.controls.showEquator') }}</span>
            </label>
            <label class="toggle-label">
              <input type="checkbox" v-model="showHorizon" />
              <span class="toggle-text">{{ getLocalizedText('starChart.controls.showHorizon') }}</span>
            </label>
          </div>
        </div>

        <!-- 测试结果 -->
        <div v-if="testLog.length" class="control-section">
          <h4 class="section-title">{{ getLocalizedText('starChart.astro3d.testResults') }}</h4>
          <div class="test-results">
            <div 
              v-for="(test, index) in testLog" 
              :key="index"
              :class="['test-item', { 'test-success': test.ok, 'test-error': !test.ok }]"
            >
              <span class="test-icon">{{ test.ok ? '✓' : '✗' }}</span>
              <span class="test-name">{{ test.name }}</span>
              <span v-if="test.info" class="test-info">{{ test.info }}</span>
            </div>
          </div>
        </div>

        <!-- 信息说明 -->
        <div class="control-section">
          <div class="info-panel">
            <p class="info-text">
              {{ getLocalizedText('starChart.astro3d.description') }}
            </p>
          </div>
        </div>
      </div>

      <!-- 3D 可视化区域 -->
      <div class="chart-wrapper">
        <div ref="mountRef" class="astro3d-canvas" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as Astronomy from 'astronomy-engine'
import { getTranslation, getCurrentLanguage } from '../../i18n/index.js'

// Props
const props = defineProps({
  calculationResults: {
    type: Object,
    default: () => ({})
  },
  userData: {
    type: Object,
    default: () => ({})
  },
  showEquator: {
    type: Boolean,
    default: true
  },
  showHorizon: {
    type: Boolean,
    default: true
  },
  latitude: {
    type: Number,
    default: null
  },
  longitude: {
    type: Number,
    default: null
  }
})

// 国际化支持
const currentLanguage = ref(getCurrentLanguage())
const getLocalizedText = (key) => {
  const translated = getTranslation(key, currentLanguage.value)
  return translated !== key ? translated : key
}

// ------------------ 常量 & 数据 ------------------
const DEG = Math.PI / 180
const R_TURNS = 5.0
const PLANET_BODIES = [
  Astronomy.Body.Sun,
  Astronomy.Body.Moon,
  Astronomy.Body.Mercury,
  Astronomy.Body.Venus,
  Astronomy.Body.Mars,
  Astronomy.Body.Jupiter,
  Astronomy.Body.Saturn,
  Astronomy.Body.Uranus,
  Astronomy.Body.Neptune,
  Astronomy.Body.Pluto,
]
const BODY_NAME = new Map([
  [Astronomy.Body.Sun, 'Sun'],
  [Astronomy.Body.Moon, 'Moon'],
  [Astronomy.Body.Mercury, 'Mercury'],
  [Astronomy.Body.Venus, 'Venus'],
  [Astronomy.Body.Mars, 'Mars'],
  [Astronomy.Body.Jupiter, 'Jupiter'],
  [Astronomy.Body.Saturn, 'Saturn'],
  [Astronomy.Body.Uranus, 'Uranus'],
  [Astronomy.Body.Neptune, 'Neptune'],
  [Astronomy.Body.Pluto, 'Pluto'],
])
const ZODIAC = [
  { key: 'Aries', label: '♈︎', start: 0 },
  { key: 'Taurus', label: '♉︎', start: 30 },
  { key: 'Gemini', label: '♊︎', start: 60 },
  { key: 'Cancer', label: '♋︎', start: 90 },
  { key: 'Leo', label: '♌︎', start: 120 },
  { key: 'Virgo', label: '♍︎', start: 150 },
  { key: 'Libra', label: '♎︎', start: 180 },
  { key: 'Scorpio', label: '♏︎', start: 210 },
  { key: 'Sagittarius', label: '♐︎', start: 240 },
  { key: 'Capricorn', label: '♑︎', start: 270 },
  { key: 'Aquarius', label: '♒︎', start: 300 },
  { key: 'Pisces', label: '♓︎', start: 330 },
]

// ------------------ 工具函数 ------------------
function toMatrix4(rot) {
  const m = new THREE.Matrix4()
  const r = rot.rot
  m.set(
    r[0][0], r[0][1], r[0][2], 0,
    r[1][0], r[1][1], r[1][2], 0,
    r[2][0], r[2][1], r[2][2], 0,
    0, 0, 0, 1
  )
  return m
}

function makeCircle(radius, segments = 720) {
  const geom = new THREE.BufferGeometry()
  const positions = []
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2
    positions.push(Math.cos(a) * radius, Math.sin(a) * radius, 0)
  }
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.8 })
  return new THREE.Line(geom, mat)
}

function makeGridGreatCircles(radius) {
  const g = new THREE.Group()
  const circles = [makeCircle(radius), makeCircle(radius), makeCircle(radius)]
  circles[1].rotation.x = 90 * DEG
  circles[2].rotation.y = 90 * DEG
  circles.forEach(c => g.add(c))
  return g
}

function makeTickMarks(radius, everyDeg = 30) {
  const g = new THREE.Group()
  for (let d = 0; d < 360; d += everyDeg) {
    const a = d * DEG
    const x = Math.cos(a) * radius
    const y = Math.sin(a) * radius
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, y, 0),
      new THREE.Vector3(x * 0.95, y * 0.95, 0),
    ])
    g.add(new THREE.Line(geom, new THREE.LineBasicMaterial()))
  }
  return g
}

function makeTextSprite(text, options) {
  const opt = options || {}
  const font = opt.font || '12px sans-serif'
  const size = opt.size || 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  ctx.font = font
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 4
  ctx.strokeText(text, size / 2, size / 2)
  ctx.fillText(text, size / 2, size / 2)
  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
  const sprite = new THREE.Sprite(material)
  const scale = 0.4
  sprite.scale.set(scale, scale, 1)
  return sprite
}

function formatLonToSign(lonDeg) {
  let lon = ((lonDeg % 360) + 360) % 360
  const idx = Math.floor(lon / 30)
  const deg = lon - idx * 30
  const sign = ZODIAC[idx]
  return `${sign.label} ${deg.toFixed(2)}°`
}

function getECTVector(body, date) {
  const vecEQJ = Astronomy.GeoVector(body, date, true)
  const rot = Astronomy.Rotation_EQJ_ECT(date)
  const v = Astronomy.RotateVector(rot, vecEQJ)
  return v
}

function unitFromVector(v) {
  const len = Math.hypot(v.x, v.y, v.z) || 1
  return new THREE.Vector3(v.x / len, v.y / len, v.z / len)
}

function buildEclipticRing(radius) {
  const g = new THREE.Group()
  const circle = makeCircle(radius)
  g.add(circle)
  g.add(makeTickMarks(radius, 30))
  ZODIAC.forEach(({ label, start }) => {
    const a = start * DEG + 15 * DEG
    const x = Math.cos(a) * (radius + 0.3)
    const y = Math.sin(a) * (radius + 0.3)
    const s = makeTextSprite(label, { font: 'bold 28px system-ui' })
    s.position.set(x, y, 0)
    g.add(s)
  })
  return g
}

function buildEquatorRing(radius, date) {
  const g = new THREE.Group()
  g.add(makeCircle(radius))
  g.add(makeTickMarks(radius, 30))
  const R_EQD_ECT = Astronomy.Rotation_EQD_ECT(date)
  g.applyMatrix4(toMatrix4(R_EQD_ECT))
  return g
}

function buildHorizonRing(radius, date, observer) {
  const g = new THREE.Group()
  g.add(makeCircle(radius))
  g.add(makeTickMarks(radius, 30))

  const R_HOR_EQD = Astronomy.Rotation_HOR_EQD(date, observer)
  const R_EQD_ECT = Astronomy.Rotation_EQD_ECT(date)
  const R_HOR_ECT = Astronomy.CombineRotation(R_EQD_ECT, R_HOR_EQD)
  g.applyMatrix4(toMatrix4(R_HOR_ECT))

  const azLabels = [['N', 0], ['E', 90], ['S', 180], ['W', 270]]
  azLabels.forEach(([t, az]) => {
    const sph = new Astronomy.Spherical(0, az, 1) // alt=0, az=az, dist=1（HOR 表示）
    const hv = Astronomy.VectorFromHorizon(sph, date, false) // ✅ 3 参：refraction 为布尔值
    const v = Astronomy.RotateVector(R_HOR_ECT, hv)
    const p = unitFromVector(v).multiplyScalar(radius + 0.25)
    const s = makeTextSprite(t, { font: 'bold 26px system-ui' })
    s.position.set(p.x, p.y, p.z)
    g.add(s)
  })
  return g
}

function computePlanetsECT(date) {
  const out = []
  for (const body of PLANET_BODIES) {
    const v = getECTVector(body, date)
    const sph = Astronomy.SphereFromVector(v)
    const unit = unitFromVector(v)
    out.push({ name: BODY_NAME.get(body) || String(body), lon: sph.lon, lat: sph.lat, pos: unit })
  }
  return out
}

function placePlanetSprite(name, lon, pos, radius) {
  const label = makeTextSprite(`${name}: ${formatLonToSign(lon)}`, { font: 'bold 18px system-ui' })
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial())
  const group = new THREE.Group()
  group.add(marker)
  label.position.set(0.2, 0.2, 0)
  group.add(label)
  group.position.copy(pos.clone().multiplyScalar(radius))
  return group
}

function computeAscendant(date, observer) {
  const R_HOR_EQD = Astronomy.Rotation_HOR_EQD(date, observer)
  const R_EQD_ECT = Astronomy.Rotation_EQD_ECT(date)
  const R_HOR_ECT = Astronomy.CombineRotation(R_EQD_ECT, R_HOR_EQD)
  const eastHor = new Astronomy.Spherical(0, 90, 1)
  const eastVecHor = Astronomy.VectorFromHorizon(eastHor, date, false) // ✅ 3 参
  const eastEct = Astronomy.RotateVector(R_HOR_ECT, eastVecHor)
  const sph = Astronomy.SphereFromVector(eastEct)
  return ((sph.lon % 360) + 360) % 360
}

// ------------------ 组件状态 ------------------
// 使用传入的用户数据或默认值
const lat = ref(
  props.latitude || 
  props.userData?.birthplace?.latitude || 
  35.6812 // 东京默认值
)
const lon = ref(
  props.longitude || 
  props.userData?.birthplace?.longitude || 
  139.7671 // 东京默认值
)
const height = ref(
  props.userData?.birthplace?.elevation || 
  0
)

// 使用用户生日时间或当前时间
const iso = ref(
  props.userData?.birthdate ? 
    new Date(props.userData.birthdate).toISOString().slice(0, 16) :
    new Date().toISOString().slice(0, 16)
)

const showEquator = ref(props.showEquator)
const showHorizon = ref(props.showHorizon)
const testLog = ref([])

const observer = computed(() => new Astronomy.Observer(lat.value, lon.value, height.value))
const dateObj = computed(() => new Date(iso.value))

// ------------------ Three.js 生命周期 ------------------
const mountRef = ref(null)
let scene, renderer, camera, controls
let dynamicGroup

onMounted(() => {
  const root = mountRef.value
  const width = root.clientWidth
  const heightPx = root.clientHeight || 600

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0a)

  camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.01, 1000)
  camera.position.set(0, -R_TURNS * 2.3, R_TURNS * 1.2)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, heightPx)
  root.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  scene.add(new THREE.AmbientLight(0xffffff, 0.75))

  const sphereLines = makeGridGreatCircles(R_TURNS)
  sphereLines.children.forEach(line => (line.material.opacity = 0.15))
  scene.add(sphereLines)

  const ecliptic = buildEclipticRing(R_TURNS)
  scene.add(ecliptic)

  dynamicGroup = new THREE.Group()
  scene.add(dynamicGroup)

  const onResize = () => {
    const w = root.clientWidth
    const h = root.clientHeight || 600
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  let raf = 0
  const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }
  tick()

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', onResize)
    controls.dispose()
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  })
})

function refreshDynamic() {
  if (!dynamicGroup) return
  while (dynamicGroup.children.length) dynamicGroup.remove(dynamicGroup.children[0])

  if (showEquator.value) dynamicGroup.add(buildEquatorRing(R_TURNS, dateObj.value))
  if (showHorizon.value) dynamicGroup.add(buildHorizonRing(R_TURNS * 0.98, dateObj.value, observer.value))

  const planets = computePlanetsECT(dateObj.value)
  planets.forEach(p => {
    dynamicGroup.add(placePlanetSprite(p.name, p.lon, p.pos, R_TURNS * 1.002))
  })

  const ascLon = computeAscendant(dateObj.value, observer.value)
  const ascPos = new THREE.Vector3(Math.cos(ascLon * DEG), Math.sin(ascLon * DEG), 0)
    .normalize().multiplyScalar(R_TURNS * 1.05)
  const ascMark = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial())
  const ascLabel = makeTextSprite(`ASC ${formatLonToSign(ascLon)}`, { font: 'bold 22px system-ui' })
  const ascGroup = new THREE.Group()
  ascGroup.position.copy(ascPos)
  ascLabel.position.set(0.25, 0.25, 0)
  ascGroup.add(ascMark)
  ascGroup.add(ascLabel)
  dynamicGroup.add(ascGroup)

  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(R_TURNS, 64, 64),
    new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.05 })
  )
  dynamicGroup.add(ball)
}

// 自动监听参数变化刷新
watch([dateObj, observer, showEquator, showHorizon], refreshDynamic, { immediate: true })

// ------------------ 自检测试 ------------------
function runSelfTests(date, obs) {
  const tests = []
  const push = (name, ok, info = '') => tests.push({ name, ok, info })

  try {
    const v = Astronomy.VectorFromHorizon(new Astronomy.Spherical(0, 0, 1), date, false)
    const len = Math.hypot(v.x, v.y, v.z)
    push('VectorFromHorizon 3参调用应成功', Number.isFinite(len) && len > 0)
  } catch (e) {
    push('VectorFromHorizon 3参调用应成功', false, String(e))
  }

  try {
    // 故意错误：第四参传 observer 应抛错
    Astronomy.VectorFromHorizon(new Astronomy.Spherical(0, 0, 1), date, obs, false)
    push('VectorFromHorizon 4参调用应抛错', false, '未抛错')
  } catch (e) {
    const msg = String(e || '')
    const ok = msg.includes('Invalid refraction option') || msg.includes('refraction')
    push('VectorFromHorizon 4参调用应抛错', ok, msg)
  }

  try {
    const asc = computeAscendant(date, obs)
    push('ASC 黄经应在 [0,360)', asc >= 0 && asc < 360, `asc=${asc}`)
  } catch (e) {
    push('ASC 计算异常', false, String(e))
  }

  try {
    const arr = computePlanetsECT(date)
    const ok = arr.length >= 5 && arr.every(p => Number.isFinite(p.lon) && Number.isFinite(p.lat))
    push('行星黄经/黄纬为有限数', ok, `${arr.length} bodies`)
  } catch (e) {
    push('行星解算异常', false, String(e))
  }

  return tests
}

// 重置视图函数
function resetView() {
  if (controls) {
    // 重置摄像机位置
    camera.position.set(0, -R_TURNS * 2.3, R_TURNS * 1.2)
    controls.reset()
  }
  
  // 重置到用户原始数据
  if (props.userData?.birthdate) {
    iso.value = new Date(props.userData.birthdate).toISOString().slice(0, 16)
  }
  if (props.userData?.birthplace) {
    lat.value = props.userData.birthplace.latitude || 35.6812
    lon.value = props.userData.birthplace.longitude || 139.7671
    height.value = props.userData.birthplace.elevation || 0
  }
  
  // 清空测试日志
  testLog.value = []
}

function handleRunTests() {
  const results = runSelfTests(dateObj.value, observer.value)
  testLog.value = results
  console.groupCollapsed('Astro3D 自检')
  for (const t of results) {
    console[t.ok ? 'log' : 'error'](`✔/✖ ${t.name}: ${t.ok ? 'OK' : 'FAIL'} ${t.info ? `(${t.info})` : ''}`)
  }
  console.groupEnd()
}
</script>

<style scoped>
/* Astro3D 组件样式 - 与现有 StarChart 系统保持一致 */

.astro3d-container {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 头部样式 - 与StarChart保持一致 */
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

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.6);
}

/* 内容区域 */
.astro3d-content {
  display: flex;
  gap: 20px;
  padding: 20px;
}

/* 控制面板 */
.controls-panel {
  width: 300px;
  flex-shrink: 0;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  height: fit-content;
}

.control-section {
  margin-bottom: 20px;
}

.control-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 8px;
}

.control-group {
  margin-bottom: 15px;
}

.control-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 5px;
}

.control-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 0.9rem;
  background: #fff;
  transition: border-color 0.3s ease;
}

.control-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* 坐标输入网格 */
.coordinates-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.coordinate-input {
  display: flex;
  flex-direction: column;
}

/* 切换控制 */
.toggle-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}

.toggle-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #667eea;
}

.toggle-text {
  color: #495057;
}

/* 测试结果 */
.test-results {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.test-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
}

.test-success {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.test-error {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.test-icon {
  font-weight: bold;
  font-family: monospace;
}

.test-name {
  flex: 1;
  font-weight: 500;
}

.test-info {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* 信息面板 */
.info-panel {
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  padding: 12px;
}

.info-text {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #495057;
}

/* 图表包装器 */
.chart-wrapper {
  flex: 1;
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.astro3d-canvas {
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%);
  border-radius: 12px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .astro3d-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .controls-panel {
    width: 100%;
  }
  
  .coordinates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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
  
  .astro3d-content {
    padding: 15px;
  }
  
  .coordinates-grid {
    grid-template-columns: 1fr;
  }
  
  .astro3d-canvas {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .chart-title {
    font-size: 1.3rem;
  }
  
  .astro3d-content {
    padding: 10px;
  }
  
  .controls-panel {
    padding: 15px;
  }
  
  .astro3d-canvas {
    height: 350px;
  }
}
</style>
