import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as Astronomy from "astronomy-engine";

/**
 * 3D 星盘（接近 astrolog.org 的 ast3d 示例）- 纯 JS 版本
 *
 * 修复：
 * - 解决控制台报错：Error: Invalid refraction option: [object Object]
 *   原因是 `Astronomy.VectorFromHorizon` 的签名为 `(sphere, time, refraction)`，只有 3 个参数，
 *   之前误传了 (sphere, time, observer, false)，使得第三参收到的是 observer 对象，从而报错。
 *   现已改为 `(sphere, time, false)`，并通过 HOR->ECT 旋转矩阵引入 observer/location。
 *
 * 额外改进：
 * - 添加内置“自检”测试按钮，包含若干断言（不会影响正常运行）。
 * - 保持 React + Three.js 架构不变；仍支持切换赤道环/地平环、修改时间/经纬度。
 */

const DEG = Math.PI / 180;
const R_TURNS = 5.0; // 天球半径（渲染单位）
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
];

const BODY_NAME = new Map([
  [Astronomy.Body.Sun, "Sun"],
  [Astronomy.Body.Moon, "Moon"],
  [Astronomy.Body.Mercury, "Mercury"],
  [Astronomy.Body.Venus, "Venus"],
  [Astronomy.Body.Mars, "Mars"],
  [Astronomy.Body.Jupiter, "Jupiter"],
  [Astronomy.Body.Saturn, "Saturn"],
  [Astronomy.Body.Uranus, "Uranus"],
  [Astronomy.Body.Neptune, "Neptune"],
  [Astronomy.Body.Pluto, "Pluto"],
]);

const ZODIAC = [
  { key: "Aries", label: "♈︎", start: 0 },
  { key: "Taurus", label: "♉︎", start: 30 },
  { key: "Gemini", label: "♊︎", start: 60 },
  { key: "Cancer", label: "♋︎", start: 90 },
  { key: "Leo", label: "♌︎", start: 120 },
  { key: "Virgo", label: "♍︎", start: 150 },
  { key: "Libra", label: "♎︎", start: 180 },
  { key: "Scorpio", label: "♏︎", start: 210 },
  { key: "Sagittarius", label: "♐︎", start: 240 },
  { key: "Capricorn", label: "♑︎", start: 270 },
  { key: "Aquarius", label: "♒︎", start: 300 },
  { key: "Pisces", label: "♓︎", start: 330 },
];

function toMatrix4(rot) {
  const m = new THREE.Matrix4();
  const r = rot.rot;
  m.set(
    r[0][0], r[0][1], r[0][2], 0,
    r[1][0], r[1][1], r[1][2], 0,
    r[2][0], r[2][1], r[2][2], 0,
    0, 0, 0, 1
  );
  return m;
}

function makeCircle(radius, segments = 720) {
  const geom = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    positions.push(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  }
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.8 });
  return new THREE.Line(geom, mat);
}

function makeGridGreatCircles(radius) {
  const g = new THREE.Group();
  const circles = [makeCircle(radius), makeCircle(radius), makeCircle(radius)];
  circles[1].rotation.x = 90 * DEG; // 与 XZ 平面
  circles[2].rotation.y = 90 * DEG; // 与 YZ 平面
  circles.forEach((c) => g.add(c));
  return g;
}

function makeTickMarks(radius, everyDeg = 30) {
  const g = new THREE.Group();
  for (let d = 0; d < 360; d += everyDeg) {
    const a = d * DEG;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius;
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, y, 0),
      new THREE.Vector3(x * 0.95, y * 0.95, 0),
    ]);
    g.add(new THREE.Line(geom, new THREE.LineBasicMaterial()));
  }
  return g;
}

function makeTextSprite(text, options) {
  const opt = options || {};
  const font = opt.font || "12px sans-serif";
  const size = opt.size || 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  ctx.font = font;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 4;
  ctx.strokeText(text, size / 2, size / 2);
  ctx.fillText(text, size / 2, size / 2);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  const scale = 0.4; // 文字大小
  sprite.scale.set(scale, scale, 1);
  return sprite;
}

function formatLonToSign(lonDeg) {
  let lon = ((lonDeg % 360) + 360) % 360;
  const idx = Math.floor(lon / 30);
  const deg = lon - idx * 30;
  const sign = ZODIAC[idx];
  return `${sign.label} ${deg.toFixed(2)}°`;
}

function useObserver(latInit = 35.6812, lonInit = 139.7671, elev = 0) {
  const [lat, setLat] = useState(latInit);
  const [lon, setLon] = useState(lonInit);
  const [height, setHeight] = useState(elev);
  const observer = useMemo(() => new Astronomy.Observer(lat, lon, height), [lat, lon, height]);
  return { lat, setLat, lon, setLon, height, setHeight, observer };
}

function getECTVector(body, date) {
  const vecEQJ = Astronomy.GeoVector(body, date, true);
  const rot = Astronomy.Rotation_EQJ_ECT(date);
  const v = Astronomy.RotateVector(rot, vecEQJ);
  return v; // in ECT orientation
}

function unitFromVector(v) {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return new THREE.Vector3(v.x / len, v.y / len, v.z / len);
}

function buildEclipticRing(radius) {
  const g = new THREE.Group();
  const circle = makeCircle(radius);
  g.add(circle);
  g.add(makeTickMarks(radius, 30));
  ZODIAC.forEach(({ label, start }) => {
    const a = start * DEG + 15 * DEG;
    const x = Math.cos(a) * (radius + 0.3);
    const y = Math.sin(a) * (radius + 0.3);
    const s = makeTextSprite(label, { font: "bold 28px system-ui" });
    s.position.set(x, y, 0);
    g.add(s);
  });
  return g;
}

function buildEquatorRing(radius, date) {
  const g = new THREE.Group();
  g.add(makeCircle(radius));
  g.add(makeTickMarks(radius, 30));
  const R_EQD_ECT = Astronomy.Rotation_EQD_ECT(date);
  g.applyMatrix4(toMatrix4(R_EQD_ECT));
  return g;
}

function buildHorizonRing(radius, date, observer) {
  const g = new THREE.Group();
  g.add(makeCircle(radius));
  g.add(makeTickMarks(radius, 30));

  // HOR -> ECT 旋转用于把“水平坐标系下的向量”变换到世界坐标（ECT）
  const R_HOR_EQD = Astronomy.Rotation_HOR_EQD(date, observer);
  const R_EQD_ECT = Astronomy.Rotation_EQD_ECT(date);
  const R_HOR_ECT = Astronomy.CombineRotation(R_EQD_ECT, R_HOR_EQD);
  g.applyMatrix4(toMatrix4(R_HOR_ECT));

  // 方位标签：在 HOR 中生成向量，然后旋到 ECT
  const azLabels = [["N", 0], ["E", 90], ["S", 180], ["W", 270]];
  azLabels.forEach(([t, az]) => {
    const sph = new Astronomy.Spherical(0, az, 1); // alt=0, az=az, dist=1（HOR 表示）
    // ✅ 正确：VectorFromHorizon(sphere, time, refraction)
    const hv = Astronomy.VectorFromHorizon(sph, date, false);
    const v = Astronomy.RotateVector(R_HOR_ECT, hv);
    const p = unitFromVector(v).multiplyScalar(radius + 0.25);
    const s = makeTextSprite(t, { font: "bold 26px system-ui" });
    s.position.set(p.x, p.y, p.z);
    g.add(s);
  });
  return g;
}

function computePlanetsECT(date) {
  const out = [];
  for (const body of PLANET_BODIES) {
    const v = getECTVector(body, date);
    const sph = Astronomy.SphereFromVector(v); // ECT 取 lon/lat
    const unit = unitFromVector(v);
    out.push({ name: BODY_NAME.get(body) || String(body), lon: sph.lon, lat: sph.lat, pos: unit });
  }
  return out;
}

function placePlanetSprite(name, lon, pos, radius) {
  const label = makeTextSprite(`${name}: ${formatLonToSign(lon)}`, { font: "bold 18px system-ui" });
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial());
  const group = new THREE.Group();
  group.add(marker);
  label.position.set(0.2, 0.2, 0);
  group.add(label);
  group.position.copy(pos.clone().multiplyScalar(radius));
  return group;
}

function computeAscendant(date, observer) {
  // HOR -> ECT 旋转
  const R_HOR_EQD = Astronomy.Rotation_HOR_EQD(date, observer);
  const R_EQD_ECT = Astronomy.Rotation_EQD_ECT(date);
  const R_HOR_ECT = Astronomy.CombineRotation(R_EQD_ECT, R_HOR_EQD);
  // 东方地平方向（HOR 中 az=90, alt=0）
  const eastHor = new Astronomy.Spherical(0, 90, 1);
  // ✅ 正确：只传 (sphere, time, refraction)
  const eastVecHor = Astronomy.VectorFromHorizon(eastHor, date, false);
  const eastEct = Astronomy.RotateVector(R_HOR_ECT, eastVecHor);
  const sph = Astronomy.SphereFromVector(eastEct);
  return ((sph.lon % 360) + 360) % 360; // 0..360 的黄经
}

// -------------------------
// 简易自检（测试）
// -------------------------
function runSelfTests(date, observer) {
  const tests = [];
  const push = (name, ok, info = "") => tests.push({ name, ok, info });

  // 1) VectorFromHorizon 签名与返回值
  try {
    const v = Astronomy.VectorFromHorizon(new Astronomy.Spherical(0, 0, 1), date, false);
    const len = Math.hypot(v.x, v.y, v.z);
    push("VectorFromHorizon 3参调用应成功", Number.isFinite(len) && len > 0);
  } catch (e) {
    push("VectorFromHorizon 3参调用应成功", false, String(e));
  }

  // 2) 误用 4 参应抛错（被安全捕获）
  try {
    // @ts-ignore 故意错误调用以验证不会崩溃应用
    Astronomy.VectorFromHorizon(new Astronomy.Spherical(0, 0, 1), date, observer, false);
    push("VectorFromHorizon 4参调用应抛错", false, "未抛错");
  } catch (e) {
    const msg = String(e || "");
    const ok = msg.includes("Invalid refraction option") || msg.includes("refraction");
    push("VectorFromHorizon 4参调用应抛错", ok, msg);
  }

  // 3) ASC 黄经范围
  try {
    const asc = computeAscendant(date, observer);
    push("ASC 黄经应在 [0,360)", asc >= 0 && asc < 360, `asc=${asc}`);
  } catch (e) {
    push("ASC 计算异常", false, String(e));
  }

  // 4) 行星解算结果有效
  try {
    const arr = computePlanetsECT(date);
    const ok = arr.length >= 5 && arr.every(p => Number.isFinite(p.lon) && Number.isFinite(p.lat));
    push("行星黄经/黄纬为有限数", ok, `${arr.length} bodies`);
  } catch (e) {
    push("行星解算异常", false, String(e));
  }

  return tests;
}

export default function Astro3D() {
  const { lat, setLat, lon, setLon, height, setHeight, observer } = useObserver(35.6812, 139.7671, 0);
  const [iso, setIso] = useState(() => new Date().toISOString().slice(0, 16)); // yyyy-MM-ddTHH:mm
  const [showEquator, setShowEquator] = useState(true);
  const [showHorizon, setShowHorizon] = useState(true);
  const [testLog, setTestLog] = useState([]);
  const mountRef = useRef(null);

  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const dynamicGroupRef = useRef();

  const date = useMemo(() => new Date(iso), [iso]);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const heightPx = mountRef.current.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.01, 1000);
    camera.position.set(0, -R_TURNS * 2.3, R_TURNS * 1.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, heightPx);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));

    const sphereLines = makeGridGreatCircles(R_TURNS);
    sphereLines.children.forEach((line) => (line.material.opacity = 0.15));
    scene.add(sphereLines);

    const ecliptic = buildEclipticRing(R_TURNS);
    scene.add(ecliptic);

    const dyn = new THREE.Group();
    scene.add(dyn);
    dynamicGroupRef.current = dyn;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    controlsRef.current = controls;

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 600;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!dynamicGroupRef.current) return;
    const dyn = dynamicGroupRef.current;
    while (dyn.children.length) dyn.remove(dyn.children[0]);

    if (showEquator) dyn.add(buildEquatorRing(R_TURNS, date));
    if (showHorizon) dyn.add(buildHorizonRing(R_TURNS * 0.98, date, observer));

    const planets = computePlanetsECT(date);
    planets.forEach((p) => {
      dyn.add(placePlanetSprite(p.name, p.lon, p.pos, R_TURNS * 1.002));
    });

    const ascLon = computeAscendant(date, observer);
    const ascPos = new THREE.Vector3(Math.cos(ascLon * DEG), Math.sin(ascLon * DEG), 0)
      .normalize()
      .multiplyScalar(R_TURNS * 1.05);
    const ascMark = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial());
    const ascLabel = makeTextSprite(`ASC ${formatLonToSign(ascLon)}`, { font: "bold 22px system-ui" });
    const ascGroup = new THREE.Group();
    ascGroup.position.copy(ascPos);
    ascLabel.position.set(0.25, 0.25, 0);
    ascGroup.add(ascMark);
    ascGroup.add(ascLabel);
    dyn.add(ascGroup);

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(R_TURNS, 64, 64),
      new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.05 })
    );
    dyn.add(ball);
  }, [date, observer, showEquator, showHorizon]);

  const handleRunTests = () => {
    const results = runSelfTests(date, observer);
    setTestLog(results);
    // 同时输出到控制台便于调试
    console.groupCollapsed("Astro3D 自检");
    for (const t of results) {
      console[t.ok ? "log" : "error"](`✔/✖ ${t.name}: ${t.ok ? "OK" : "FAIL"} ${t.info ? `(${t.info})` : ""}`);
    }
    console.groupEnd();
  };

  return (
    <div className="w-full h-full grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 lg:col-span-3 space-y-4">
        <div className="p-4 rounded-2xl shadow border border-zinc-800">
          <div className="text-lg font-semibold mb-3">参数</div>
          <label className="block text-sm mb-1">日期时间（本地时区）</label>
          <input
            type="datetime-local"
            className="w-full bg-black/40 border border-zinc-700 rounded-xl p-2"
            value={iso}
            onChange={(e) => setIso(e.target.value)}
          />
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div>
              <label className="block text-sm mb-1">纬度 φ</label>
              <input
                type="number"
                step="0.0001"
                className="w-full bg-black/40 border border-zinc-700 rounded-xl p-2"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">经度 λ</label>
              <input
                type="number"
                step="0.0001"
                className="w-full bg-black/40 border border-zinc-700 rounded-xl p-2"
                value={lon}
                onChange={(e) => setLon(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">海拔 (m)</label>
              <input
                type="number"
                step="1"
                className="w-full bg-black/40 border border-zinc-700 rounded-xl p-2"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={showEquator} onChange={(e) => setShowEquator(e.target.checked)} />
              <span>显示赤道环</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={showHorizon} onChange={(e) => setShowHorizon(e.target.checked)} />
              <span>显示地平环</span>
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleRunTests}
              className="px-3 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800"
              title="运行一组内置断言，结果显示在下方和浏览器控制台"
            >
              运行自检
            </button>
          </div>

          {testLog.length > 0 && (
            <div className="mt-3 text-xs space-y-1">
              {testLog.map((t, i) => (
                <div key={i} className={"px-2 py-1 rounded " + (t.ok ? "bg-emerald-900/30" : "bg-rose-900/30") }>
                  <span className="font-mono">{t.ok ? "✔" : "✖"}</span> {t.name}
                  {t.info ? <span className="opacity-70"> — {t.info}</span> : null}
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
            世界坐标系：ECT（真黄道-当日）。行星点位基于 Astronomy Engine 的地心坐标，随后变换到 ECT。
            你可以旋转/缩放查看 3D 空间关系。
          </p>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-9">
        <div ref={mountRef} className="w-full h-[70vh] rounded-2xl overflow-hidden border border-zinc-800" />
      </div>
    </div>
  );
}
