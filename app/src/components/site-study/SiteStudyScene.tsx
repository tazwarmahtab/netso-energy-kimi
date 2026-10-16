import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type SiteStudySceneProps = {
  asset: string;
  alt: string;
  beatId: string;
};

type SceneStatus = "loading" | "ready" | "error";

type SceneState = {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  model: THREE.Object3D;
  maxDimension: number;
};

const CAMERA_PRESETS: Record<string, { position: [number, number, number]; target: [number, number, number] }> = {
  arrival: { position: [1.05, 0.8, 1.15], target: [0, -0.02, 0] },
  "roof-fit": { position: [0.72, 1.1, 0.76], target: [0.08, 0.18, 0.12] },
  access: { position: [1.15, 0.62, 0.68], target: [-0.02, 0.06, 0.08] },
  electrical: { position: [0.94, 0.68, -1.02], target: [0.18, 0.02, -0.06] },
  assessment: { position: [1.08, 0.78, 1.12], target: [0, 0.02, 0] },
};

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => material.dispose());
  });
}

function applyCameraPreset(state: SceneState, beatId: string) {
  const preset = CAMERA_PRESETS[beatId] ?? CAMERA_PRESETS.arrival;
  const { maxDimension, camera, renderer, scene } = state;

  camera.position.set(
    preset.position[0] * maxDimension,
    preset.position[1] * maxDimension,
    preset.position[2] * maxDimension,
  );
  camera.lookAt(
    preset.target[0] * maxDimension,
    preset.target[1] * maxDimension,
    preset.target[2] * maxDimension,
  );
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}

export default function SiteStudyScene({ asset, alt, beatId }: SiteStudySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneStateRef = useRef<SceneState | null>(null);
  const [status, setStatus] = useState<SceneStatus>("loading");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let loadedModel: THREE.Object3D | null = null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 300);

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
    } catch {
      const failureTimer = window.setTimeout(() => {
        if (!disposed) setStatus("error");
      }, 0);
      return () => {
        disposed = true;
        window.clearTimeout(failureTimer);
      };
    }

    scene.add(new THREE.HemisphereLight(0xe8dec8, 0x17231c, 1.7));

    const keyLight = new THREE.DirectionalLight(0xffe5bd, 3.2);
    keyLight.position.set(38, 62, 28);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9cb9af, 1.1);
    fillLight.position.set(-34, 24, -42);
    scene.add(fillLight);

    const resize = () => {
      if (!renderer) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (sceneStateRef.current) renderer.render(scene, camera);
    };

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const loader = new GLTFLoader();
    loader.load(
      asset,
      (gltf) => {
        if (disposed || !renderer) {
          disposeObject(gltf.scene);
          return;
        }

        loadedModel = gltf.scene;
        // The generated study uses a Z-up authoring coordinate system; Three.js scenes are Y-up.
        loadedModel.rotation.x = -Math.PI / 2;
        loadedModel.updateMatrixWorld(true);
        loadedModel.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          child.frustumCulled = true;
          child.castShadow = false;
          child.receiveShadow = false;
        });

        const bounds = new THREE.Box3().setFromObject(loadedModel);
        const center = bounds.getCenter(new THREE.Vector3());
        const size = bounds.getSize(new THREE.Vector3());
        loadedModel.position.sub(center);
        scene.add(loadedModel);

        sceneStateRef.current = {
          camera,
          renderer,
          scene,
          model: loadedModel,
          maxDimension: Math.max(size.x, size.y, size.z),
        };

        resize();
        setStatus("ready");
      },
      undefined,
      () => {
        if (!disposed) setStatus("error");
      },
    );

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      resizeObserver = null;
      sceneStateRef.current = null;
      if (loadedModel) disposeObject(loadedModel);
      renderer?.dispose();
      renderer = null;
    };
  }, [asset]);

  useEffect(() => {
    if (status !== "ready" || !sceneStateRef.current) return;
    applyCameraPreset(sceneStateRef.current, beatId);
  }, [beatId, status]);

  return (
    <div
      ref={containerRef}
      className="site-study__scene"
      data-status={status}
      aria-hidden={status === "ready"}
    >
      <canvas ref={canvasRef} role="img" aria-label={status === "ready" ? alt : undefined} />
      {status === "loading" && (
        <span className="site-study__scene-status" role="status">
          Loading optional 3D site study…
        </span>
      )}
      {status === "error" && (
        <span className="site-study__scene-status site-study__scene-status--error" role="status">
          3D preview unavailable · temporary poster retained
        </span>
      )}
    </div>
  );
}
