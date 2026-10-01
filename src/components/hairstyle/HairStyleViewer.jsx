import { useMemo, useRef, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

/*
 * Faceless barber mannequin + procedural hair system.
 *
 * IMPORTANT DESIGN:
 * - The mannequin is deliberately faceless: NO eyes, nose, mouth or eyebrows.
 * - The same blank head is used for every hairstyle.
 * - Only the hair geometry changes with hairstyle.id.
 * - Hair roots conform to the scalp and flow outward from the scalp instead
 *   of using the previous vertical tube approach.
 *
 * This remains frontend-only. No backend or external 3D service is required.
 */

const SKIN = '#d6b09a';
const HAIR = '#17120f';
const HAIR_LIGHT = '#3a2a22';

const STYLE_PRESETS = {
  'low-fade-textured-crop': { top: 0.58, side: 0.22, back: 0.28, front: 0.72, flow: 'forward', texture: 0.9 },
  'mid-fade-quiff': { top: 0.90, side: 0.16, back: 0.22, front: 0.96, flow: 'up', texture: 0.35 },
  'high-fade-pompadour': { top: 1.04, side: 0.08, back: 0.14, front: 1.08, flow: 'up', texture: 0.18 },
  'classic-taper': { top: 0.58, side: 0.42, back: 0.46, front: 0.48, flow: 'back', texture: 0.16 },
  'buzz-cut': { top: 0.12, side: 0.09, back: 0.10, front: 0.10, flow: 'back', texture: 0.04 },
  'french-crop': { top: 0.52, side: 0.20, back: 0.25, front: 0.76, flow: 'forward', texture: 0.65 },
  'skin-fade': { top: 0.56, side: 0.035, back: 0.06, front: 0.58, flow: 'forward', texture: 0.72 },
  'slick-back': { top: 0.72, side: 0.34, back: 0.42, front: 0.46, flow: 'back', texture: 0.08 },
  'messy-fringe': { top: 0.74, side: 0.20, back: 0.28, front: 0.82, flow: 'messy', texture: 1 },
  'curly-fade': { top: 0.76, side: 0.07, back: 0.12, front: 0.70, flow: 'curly', texture: 1 },
  undercut: { top: 0.88, side: 0.035, back: 0.045, front: 0.68, flow: 'back', texture: 0.24 },
  'classic-side-part': { top: 0.64, side: 0.28, back: 0.34, front: 0.58, flow: 'side', texture: 0.12 },
};

function seeded(index) {
  const x = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function SkinMaterial() {
  return (
    <meshPhysicalMaterial
      color={SKIN}
      roughness={0.68}
      metalness={0}
      clearcoat={0.08}
      clearcoatRoughness={0.5}
      sheen={0.08}
    />
  );
}

/**
 * A deliberately blank human/mannequin head.
 * There are no facial features at all, matching the supplied reference.
 */
function BlankHead() {
  return (
    <group>
      <mesh
        scale={[0.88, 1.08, 0.82]}
        position={[0, 0.02, 0]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 96, 64]} />
        <SkinMaterial />
      </mesh>

      {/* subtle jaw/chin volume, still completely faceless */}
      <mesh
        scale={[0.73, 0.60, 0.69]}
        position={[0, -0.38, 0.16]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 80, 56]} />
        <SkinMaterial />
      </mesh>

      <mesh position={[0, -1.18, -0.02]} castShadow receiveShadow>
        <cylinderGeometry args={[0.39, 0.49, 0.92, 72]} />
        <SkinMaterial />
      </mesh>
    </group>
  );
}

/*
 * Dense scalp layer. It is intentionally subtle so the individual clumps
 * read as hair rather than a plastic black helmet.
 */
function HairCap({ preset }) {
  const sideLift = Math.max(preset.side, 0.03);

  return (
    <mesh
      position={[0, 0.24 + preset.top * 0.08, 0]}
      scale={[0.90, 1.02 + preset.top * 0.13, 0.86]}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 96, 64, 0, Math.PI * 2, 0, Math.PI * 0.53]} />
      <meshPhysicalMaterial
        color={HAIR}
        roughness={0.74}
        metalness={0}
        clearcoat={0.16}
        clearcoatRoughness={0.38}
      />
    </mesh>
  );
}

function makeHairCurve({ theta, phi, length, flow, texture, index, style }) {
  // Scalp ellipsoid dimensions. Hair starts directly on this surface.
  const rx = 0.91;
  const ry = 1.08;
  const rz = 0.84;
  const cy = 0.03;

  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  const root = new THREE.Vector3(
    rx * sinTheta * Math.cos(phi),
    cy + ry * cosTheta + 0.02,
    rz * sinTheta * Math.sin(phi)
  );

  // Local outward normal of the ellipsoid.
  const normal = new THREE.Vector3(
    root.x / (rx * rx),
    (root.y - cy) / (ry * ry),
    root.z / (rz * rz)
  ).normalize();

  const tangent = new THREE.Vector3(-Math.sin(phi), 0, Math.cos(phi)).normalize();
  const points = [];

  for (let s = 0; s <= 8; s += 1) {
    const t = s / 8;
    const n = normal.clone().multiplyScalar(length * t);

    let flowVector = new THREE.Vector3(0, 0, 0);

    if (flow === 'forward') {
      flowVector.set(0, -0.16 * t, 0.36 * t);
    } else if (flow === 'back') {
      flowVector.set(0, 0.08 * t, -0.34 * t);
    } else if (flow === 'up') {
      flowVector.set(0, 0.36 * t, -0.12 * t);
    } else if (flow === 'side') {
      flowVector.copy(tangent).multiplyScalar((root.x >= 0 ? 1 : -1) * 0.26 * t);
      flowVector.y += 0.10 * t;
    } else if (flow === 'messy') {
      flowVector.set(
        Math.sin(index * 1.73 + t * 5.2) * 0.11 * t,
        0.16 * t + Math.sin(index * 0.8 + t * 4) * 0.06 * t,
        Math.cos(index * 1.19 + t * 4.5) * 0.13 * t
      );
    } else if (flow === 'curly') {
      const curl = Math.sin(t * Math.PI * 3 + index * 0.8) * 0.08 * t;
      flowVector.set(
        curl,
        0.14 * t,
        Math.cos(t * Math.PI * 3 + index * 0.8) * 0.08 * t
      );
    }

    const noise =
      (seeded(index * 31 + s * 7) - 0.5) *
      texture *
      0.065 *
      t;

    const p = root
      .clone()
      .add(n)
      .add(flowVector)
      .add(tangent.clone().multiplyScalar(noise));

    points.push(p);
  }

  return points;
}

function HairStrands({ id }) {
  const preset = STYLE_PRESETS[id] || STYLE_PRESETS['classic-taper'];

  const strands = useMemo(() => {
    const result = [];
    const count = id === 'buzz-cut' ? 220 : id === 'curly-fade' ? 300 : 260;

    for (let i = 0; i < count; i += 1) {
      const u = (i + 0.5) / count;
      const jitter = seeded(i + id.length * 13) * 0.055;

      // Concentrate roots over the upper scalp.
      const theta = 0.18 + u * 1.22 + jitter;
      const phi = seeded(i * 3 + id.length * 19) * Math.PI * 2;

      // Shorter hair around the sides/back gives fades instead of a helmet.
      const sideFactor = Math.abs(Math.sin(theta) * Math.cos(phi));
      const backFactor = Math.sin(theta) * Math.sin(phi);

      let length = 0.14 + preset.top * 0.52;

      if (sideFactor > 0.62) {
        length *= Math.max(0.12, preset.side / 0.42);
      }

      if (backFactor < -0.35) {
        length *= Math.max(0.18, preset.back / 0.46);
      }

      // Front fringe is longer for crop/fringe styles.
      if (backFactor > 0.45) {
        length += preset.front * 0.12;
      }

      // Very short styles should not create long tubes.
      if (id === 'buzz-cut') length = 0.055 + seeded(i) * 0.035;

      result.push(
        makeHairCurve({
          theta,
          phi,
          length,
          flow: preset.flow,
          texture: preset.texture,
          index: i,
          style: id,
        })
      );
    }

    return result;
  }, [id, preset]);

  return (
    <group>
      {strands.map((points, index) => {
        const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
        const geometry = new THREE.TubeGeometry(
          curve,
          6,
          id === 'buzz-cut' ? 0.008 : 0.010 + (index % 4) * 0.001,
          5,
          false
        );

        return (
          <mesh key={index} geometry={geometry} castShadow>
            <meshPhysicalMaterial
              color={index % 11 === 0 ? HAIR_LIGHT : HAIR}
              roughness={0.57}
              metalness={0}
              clearcoat={0.28}
              clearcoatRoughness={0.25}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Model({ hairstyle }) {
  const preset = STYLE_PRESETS[hairstyle?.id] || STYLE_PRESETS['classic-taper'];

  return (
    <group>
      <BlankHead />
      <HairCap preset={preset} />
      <HairStrands id={hairstyle?.id} />
    </group>
  );
}

function Scene({ hairstyle, controlsRef }) {
  return (
    <>
      <ambientLight intensity={0.48} />
      <hemisphereLight intensity={0.52} groundColor="#1c1715" skyColor="#f2e4d4" />

      <directionalLight
        position={[4, 6, 5]}
        intensity={2.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <directionalLight position={[-4, 3, 2]} intensity={0.55} />
      <directionalLight position={[1, 2, -5]} intensity={0.48} />

      <Environment preset="studio" />

      <Suspense fallback={<Html center><LoadingSpinner /></Html>}>
        <Model hairstyle={hairstyle} />
      </Suspense>

      <ContactShadows
        position={[0, -1.65, 0]}
        opacity={0.34}
        scale={4.5}
        blur={2.6}
        far={3.5}
      />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.065}
        minDistance={2.45}
        maxDistance={5.1}
        target={[0, -0.08, 0]}
        minPolarAngle={Math.PI * 0.20}
        maxPolarAngle={Math.PI * 0.79}
      />
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-2 border-gold-400/20 border-t-gold-400 rounded-full animate-spin" />
      <span className="text-xs text-gold-300">Preparing 3D hairstyle…</span>
    </div>
  );
}

export default function HairStyleViewer({ hairstyle, className = '' }) {
  const controlsRef = useRef(null);
  const containerRef = useRef(null);
  const [error, setError] = useState(false);

  const setView = (view) => {
    const controls = controlsRef.current;
    if (!controls) return;

    const dist = controls.getDistance();
    const positions = {
      front: [0, 0.12, dist],
      back: [0, 0.12, -dist],
      left: [-dist, 0.12, 0],
      right: [dist, 0.12, 0],
    };

    const pos = positions[view];
    if (!pos) return;

    controls.object.position.set(...pos);
    controls.target.set(0, -0.08, 0);
    controls.update();
  };

  const resetCamera = () => {
    const controls = controlsRef.current;
    if (!controls) return;

    controls.object.position.set(0, 0.30, 4);
    controls.target.set(0, -0.08, 0);
    controls.update();
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-ink-800 rounded-3xl p-8 min-h-[320px]">
        <p className="text-gray-300 font-medium mb-1">3D Preview Unavailable</p>
        <p className="text-gray-500 text-sm text-center">
          The 3D scene could not be rendered on this device.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden viewer-container ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0.30, 4], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={() => setError(false)}
        style={{ background: 'transparent' }}
      >
        <Scene hairstyle={hairstyle} controlsRef={controlsRef} />
      </Canvas>

      <div className="absolute top-3 left-3 glass-light rounded-full px-3 py-1">
        <span className="text-xs text-gold-300 font-medium">
          3D • Blank mannequin • Realistic hair
        </span>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 glass rounded-full px-2 py-1.5 safe-mb max-w-[96%] overflow-x-auto">
        <ViewBtn label="Front" onClick={() => setView('front')} />
        <ViewBtn label="Left" onClick={() => setView('left')} />
        <ViewBtn label="Back" onClick={() => setView('back')} />
        <ViewBtn label="Right" onClick={() => setView('right')} />
        <div className="w-px h-5 bg-white/10 shrink-0" />
        <ViewBtn label="Reset" onClick={resetCamera} />
        <ViewBtn label="Fullscreen" onClick={toggleFullscreen} />
      </div>
    </div>
  );
}

function ViewBtn({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-300 hover:text-gold-300 hover:bg-white/5 transition-colors whitespace-nowrap"
    >
      {label}
    </button>
  );
}
