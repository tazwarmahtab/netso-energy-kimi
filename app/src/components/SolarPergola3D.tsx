import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sun, Moon, RotateCcw, ShieldCheck, Layers } from "lucide-react";

export default function SolarPergola3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Time of day slider (hours: 8 to 20, default 18 = 6:00 PM sunset)
  const [timeOfDay, setTimeOfDay] = useState(18);
  const [isRotating, setIsRotating] = useState(true);

  const sceneRefs = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    sunLight: THREE.DirectionalLight;
    canopyLight: THREE.PointLight;
    ledMesh: THREE.Mesh;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null; // Transparent canvas

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(7, 5, 8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera going below floor
    controls.minDistance = 4;
    controls.maxDistance = 16;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.target.set(0, 1.8, 0);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffecd2, 2.0);
    sunLight.position.set(10, 8, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Under-canopy LED warm light
    const canopyLight = new THREE.PointLight(0xffba59, 2.5, 8);
    canopyLight.position.set(0, 2.8, 0);
    canopyLight.castShadow = false;
    scene.add(canopyLight);

    // 5. Build Solar Pergola Geometry
    const pergolaGroup = new THREE.Group();

    // Material: Hot-dip galvanized architectural steel
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x242d28,
      metalness: 0.85,
      roughness: 0.35,
    });

    // Material: Bifacial solar glass panels (deep navy/black with reflective sheen)
    const solarGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a1420,
      metalness: 0.9,
      roughness: 0.15,
      transmission: 0.3,
      thickness: 0.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Material: Glowing LED diffuser strip
    const ledMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe6a3,
      emissive: 0xffba59,
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });

    // Columns (4 corner posts)
    const postHeight = 3.0;
    const postGeo = new THREE.BoxGeometry(0.14, postHeight, 0.14);
    const spanX = 2.4;
    const spanZ = 1.8;

    [
      [-spanX, -spanZ],
      [spanX, -spanZ],
      [-spanX, spanZ],
      [spanX, spanZ],
    ].forEach(([x, z]) => {
      const post = new THREE.Mesh(postGeo, steelMaterial);
      post.position.set(x, postHeight / 2, z);
      post.castShadow = true;
      post.receiveShadow = true;
      pergolaGroup.add(post);
    });

    // Perimeter Frame Beams
    const beamGeoX = new THREE.BoxGeometry(spanX * 2 + 0.3, 0.16, 0.12);
    const beam1 = new THREE.Mesh(beamGeoX, steelMaterial);
    beam1.position.set(0, postHeight + 0.08, -spanZ);
    beam1.castShadow = true;
    pergolaGroup.add(beam1);

    const beam2 = new THREE.Mesh(beamGeoX, steelMaterial);
    beam2.position.set(0, postHeight + 0.08, spanZ);
    beam2.castShadow = true;
    pergolaGroup.add(beam2);

    const beamGeoZ = new THREE.BoxGeometry(0.12, 0.16, spanZ * 2 + 0.3);
    const beam3 = new THREE.Mesh(beamGeoZ, steelMaterial);
    beam3.position.set(-spanX, postHeight + 0.08, 0);
    beam3.castShadow = true;
    pergolaGroup.add(beam3);

    const beam4 = new THREE.Mesh(beamGeoZ, steelMaterial);
    beam4.position.set(spanX, postHeight + 0.08, 0);
    beam4.castShadow = true;
    pergolaGroup.add(beam4);

    // Cross Rafters
    const rafterGeo = new THREE.BoxGeometry(0.08, 0.12, spanZ * 2 + 0.2);
    for (let i = -3; i <= 3; i++) {
      const rafter = new THREE.Mesh(rafterGeo, steelMaterial);
      rafter.position.set((i * (spanX * 2)) / 7, postHeight + 0.22, 0);
      rafter.castShadow = true;
      pergolaGroup.add(rafter);
    }

    // Solar Panel Canopy (12 Bifacial Glass Modules arrayed in 4x3 grid)
    const panelW = (spanX * 2) / 3 - 0.06;
    const panelL = (spanZ * 2) / 2 - 0.06;
    const panelGeo = new THREE.BoxGeometry(panelW, 0.03, panelL);

    for (let rx = 0; rx < 3; rx++) {
      for (let rz = 0; rz < 2; rz++) {
        const panel = new THREE.Mesh(panelGeo, solarGlassMaterial);
        const px = (rx - 1) * (panelW + 0.06);
        const pz = (rz - 0.5) * (panelL + 0.06);
        panel.position.set(px, postHeight + 0.3, pz);
        panel.castShadow = true;
        panel.receiveShadow = true;
        pergolaGroup.add(panel);
      }
    }

    // Under-Canopy Integrated Linear LED Perimeter Strip
    const ledFrame = new THREE.Group();
    const ledX = new THREE.Mesh(new THREE.BoxGeometry(spanX * 2 - 0.2, 0.03, 0.03), ledMaterial);
    ledX.position.set(0, postHeight - 0.02, -spanZ + 0.1);
    ledFrame.add(ledX);

    const ledX2 = new THREE.Mesh(new THREE.BoxGeometry(spanX * 2 - 0.2, 0.03, 0.03), ledMaterial);
    ledX2.position.set(0, postHeight - 0.02, spanZ - 0.1);
    ledFrame.add(ledX2);

    const ledZ = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, spanZ * 2 - 0.2), ledMaterial);
    ledZ.position.set(-spanX + 0.1, postHeight - 0.02, 0);
    ledFrame.add(ledZ);

    const ledZ2 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, spanZ * 2 - 0.2), ledMaterial);
    ledZ2.position.set(spanX - 0.1, postHeight - 0.02, 0);
    ledFrame.add(ledZ2);

    pergolaGroup.add(ledFrame);

    // Rooftop Terrace Floor & Pavers
    const floorGeo = new THREE.BoxGeometry(10, 0.2, 8);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f2b25,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -0.1, 0);
    floor.receiveShadow = true;
    pergolaGroup.add(floor);

    // Parapet Wall
    const parapetMat = new THREE.MeshStandardMaterial({
      color: 0x16221c,
      roughness: 0.7,
    });
    const parapetGeo = new THREE.BoxGeometry(10, 0.9, 0.25);
    const parapet = new THREE.Mesh(parapetGeo, parapetMat);
    parapet.position.set(0, 0.45, -4.0);
    parapet.receiveShadow = true;
    parapet.castShadow = true;
    pergolaGroup.add(parapet);

    scene.add(pergolaGroup);

    sceneRefs.current = {
      scene,
      camera,
      renderer,
      controls,
      sunLight,
      canopyLight,
      ledMesh: ledX,
    };

    // Animation Render Loop with Viewport Visibility Gating
    let animId: number = 0;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    // Pause rendering loop completely when off-screen to preserve CPU/GPU battery
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        isVisible = visible;
        if (visible) {
          cancelAnimationFrame(animId);
          animate();
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Responsive Canvas Resize via ResizeObserver (eliminates window resize layout thrashing)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();
      controls.dispose();

      // Deep clean geometries and materials to prevent WebGL GPU memory leaks
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  // Update Sun Angle and Lighting based on Time of Day slider
  useEffect(() => {
    if (!sceneRefs.current) return;
    const { sunLight, canopyLight, ledMesh } = sceneRefs.current;

    // Time ranges: 8.0 (morning) to 20.0 (night)
    // Noon is 13.0, Sunset is 18.0
    const progress = (timeOfDay - 8) / 12; // 0.0 to 1.0
    const angle = progress * Math.PI;

    // Sun position arc
    const sunX = Math.cos(angle) * 12;
    const sunY = Math.sin(angle) * 10;
    const sunZ = Math.sin(angle) * 6;
    sunLight.position.set(sunX, Math.max(0.5, sunY), sunZ);

    if (timeOfDay >= 18) {
      // Sunset to Night: Warm LED lights turn on
      const nightIntensity = (timeOfDay - 17.5) / 2.5; // 0 to 1
      sunLight.intensity = Math.max(0.2, 2.0 * (1 - nightIntensity));
      sunLight.color.setHex(0xff7733); // deep sunset amber
      canopyLight.intensity = 2.5 * nightIntensity;
      canopyLight.color.setHex(0xffba59);
      if (ledMesh && ledMesh.material instanceof THREE.MeshStandardMaterial) {
        ledMesh.material.emissiveIntensity = 2.5 * nightIntensity;
      }
    } else {
      // Daytime: Bright sun, LEDs off
      sunLight.intensity = 2.2;
      sunLight.color.setHex(0xffecd2);
      canopyLight.intensity = 0.1;
      if (ledMesh && ledMesh.material instanceof THREE.MeshStandardMaterial) {
        ledMesh.material.emissiveIntensity = 0.2;
      }
    }
  }, [timeOfDay]);

  const toggleAutoRotate = () => {
    if (!sceneRefs.current) return;
    const next = !isRotating;
    setIsRotating(next);
    sceneRefs.current.controls.autoRotate = next;
  };

  const resetView = () => {
    if (!sceneRefs.current) return;
    const { camera, controls } = sceneRefs.current;
    camera.position.set(7, 5, 8);
    controls.target.set(0, 1.8, 0);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-forest/90 via-forest to-forest-dark p-6 shadow-2xl backdrop-blur-xl md:p-8">
      {/* 3D Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-warm/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <h3 className="font-display text-xl font-bold text-warm md:text-2xl">
              Architectural Solar Pergola Digital Twin
            </h3>
          </div>
          <p className="mt-1 font-mono text-xs text-sage">
            Real-time WebGL structural model · Drag to orbit 360° · Test sun shadows
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoRotate}
            className={`rounded-full border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
              isRotating
                ? "border-gold bg-gold/15 text-gold"
                : "border-warm/20 bg-warm/5 text-warm/70 hover:border-warm/40"
            }`}
          >
            {isRotating ? "Orbiting" : "Paused"}
          </button>
          <button
            onClick={resetView}
            aria-label="Reset Camera View"
            className="flex items-center gap-1 rounded-full border border-warm/20 bg-warm/5 px-3 py-1.5 font-mono text-xs text-warm/70 hover:border-warm/40"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative mt-4 h-[420px] w-full cursor-grab active:cursor-grabbing md:h-[480px]"
      >
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* Hotspot Overlay Tags */}
        <div className="pointer-events-none absolute top-4 left-4 z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-gold/40 bg-forest/80 px-3 py-1 text-xs text-warm backdrop-blur-md">
            <Layers className="h-3.5 w-3.5 text-gold" />
            <span>Tier-1 Bi-facial Glass Modules (PR ≥ 81%)</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gold/40 bg-forest/80 px-3 py-1 text-xs text-warm backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            <span>Hot-Dip Galvanized Structural Steel (140mph wind certified)</span>
          </div>
        </div>

        {/* Floating Sun Time Indicator */}
        <div className="absolute right-4 bottom-4 z-10 flex items-center gap-3 rounded-2xl border border-warm/15 bg-black/60 px-4 py-2.5 backdrop-blur-md">
          {timeOfDay < 18 ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-gold" />
          )}
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase text-warm/50">Solar Lighting Angle</span>
            <span className="font-mono text-sm font-bold text-warm">
              {timeOfDay === 12
                ? "12:00 PM (Solar Noon)"
                : timeOfDay === 18
                ? "6:00 PM (Sunset / LEDs On)"
                : timeOfDay > 12
                ? `${timeOfDay - 12}:00 PM`
                : `${timeOfDay}:00 AM`}
            </span>
          </div>
        </div>
      </div>

      {/* Time-of-Day Slider Controller */}
      <div className="mt-4 rounded-2xl border border-warm/10 bg-black/30 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-wider text-warm/70">
            Simulate Solar Position & Shadow Casting
          </span>
          <span className="font-mono font-bold text-gold">
            {timeOfDay >= 18 ? "Night Living Space (Canopy LEDs Active)" : "Daylight Solar Harvesting"}
          </span>
        </div>
        <input
          type="range"
          min={8}
          max={20}
          step={0.5}
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(Number(e.target.value))}
          className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-warm/15 accent-gold"
        />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-warm/40">
          <span>8:00 AM (Morning)</span>
          <span>1:00 PM (Peak Generation)</span>
          <span>6:00 PM (Sunset)</span>
          <span>8:00 PM (Illuminated Night)</span>
        </div>
      </div>
    </div>
  );
}
