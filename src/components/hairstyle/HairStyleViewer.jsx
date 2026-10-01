import { useMemo, useRef, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

/*
 * Shared-face procedural 3D barber model.
 *
 * The head/face is identical for every hairstyle. Only the hair geometry
 * changes according to hairstyle.id. This gives the application one
 * consistent mannequin and lets users inspect every style from 360 degrees
 * without requiring a backend or external 3D service.
 */

const SKIN = '#c88f72';
const SKIN_DARK = '#a96f57';
const HAIR = '#17120f';
const HAIR_HIGHLIGHT = '#2b211b';

const STYLE_PRESETS = {
  'low-fade-textured-crop': { top: 0.62, sides: 0.34, front: 0.78, back: 0.45, direction: 'forward', texture: 0.8 },
  'mid-fade-quiff': { top: 0.88, sides: 0.30, front: 0.95, back: 0.50, direction: 'upback', texture: 0.35 },
  'high-fade-pompadour': { top: 1.05, sides: 0.20, front: 1.05, back: 0.42, direction: 'upback', texture: 0.22 },
  'classic-taper': { top: 0.62, sides: 0.58, front: 0.48, back: 0.62, direction: 'back', texture: 0.18 },
  'buzz-cut': { top: 0.18, sides: 0.16, front: 0.12, back: 0.16, direction: 'back', texture: 0.08 },
  'french-crop': { top: 0.58, sides: 0.30, front: 0.72, back: 0.42, direction: 'forward', texture: 0.55 },
  'skin-fade': { top: 0.60, sides: 0.16, front: 0.62, back: 0.24, direction: 'forward', texture: 0.7 },
  'slick-back': { top: 0.72, sides: 0.46, front: 0.52, back: 0.76, direction: 'back', texture: 0.12 },
  'messy-fringe': { top: 0.82, sides: 0.30, front: 0.88, back: 0.46, direction: 'messy', texture: 0.95 },
  'curly-fade': { top: 0.82, sides: 0.18, front: 0.76, back: 0.28, direction: 'curly', texture: 1 },
  undercut: { top: 0.90, sides: 0.12, front: 0.72, back: 0.16, direction: 'back', texture: 0.28 },
  'classic-side-part': { top: 0.68, sides: 0.42, front: 0.62, back: 0.56, direction: 'side', texture: 0.16 },
};

function seeded(index) {
  const x = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function SkinMaterial() {
  return (
    <meshPhysicalMaterial
      color={SKIN}
      roughness={0.58}
      metalness={0}
      clearcoat={0.08}
      clearcoatRoughness={0.45}
      sheen={0.12}
      sheenColor="#d9a18a"
    />
  );
}

function BaseHead() {
  return (
    <group>
      <mesh scale={[0.86, 1.08, 0.84]} position={[0, 0.02, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 96, 64]} />
        <SkinMaterial />
      </mesh>

      <mesh scale={[0.70, 0.62, 0.72]} position={[0, -0.34, 0.17]} castShadow>
        <sphereGeometry args={[1, 64, 48]} />
        <SkinMaterial />
      </mesh>

      <mesh position={[0, -1.16, -0.03]} castShadow>
        <cylinderGeometry args={[0.40, 0.52, 0.92, 64]} />
        <SkinMaterial />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.84, -0.01, 0.02]}
          scale={[0.16, 0.27, 0.11]}
          castShadow
        >
          <sphereGeometry args={[1, 32, 24]} />
          <SkinMaterial />
        </mesh>
      ))}

      <mesh position={[0, -0.04, 0.80]} scale={[0.11, 0.26, 0.16]} castShadow>
        <sphereGeometry args={[1, 32, 24]} />
        <SkinMaterial />
      </mesh>

      <mesh position={[0, -0.19, 0.88]} scale={[0.13, 0.08, 0.11]} castShadow>
        <sphereGeometry args={[1, 32, 24]} />
        <SkinMaterial />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.29, 0.16, 0.80]} scale={[0.115, 0.055, 0.045]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#f1e8df" roughness={0.55} />
          </mesh>
          <mesh position={[side * 0.29, 0.16, 0.842]} scale={[0.036, 0.036, 0.018]}>
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#211812" roughness={0.35} />
          </mesh>
          <mesh
            position={[side * 0.29, 0.29, 0.79]}
            rotation={[0, 0, side * 0.08]}
            scale={[0.23, 0.028, 0.035]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={SKIN_DARK} roughness={0.8} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -0.34, 0.75]} scale={[0.16, 0.035, 0.035]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#8f5b51" roughness={0.72} />
      </mesh>
    </group>
  );
}

function HairCap({ preset }) {
  const thetaLength = Math.PI * (0.47 + Math.min(preset.sides, 0.5) * 0.35);

  return (
    <mesh
      position={[0, 0.26 + preset.top * 0.08, 0]}
      scale={[0.90, 1.0 + preset.top * 0.16, 0.88]}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 64, 40, 0, Math.PI * 2, 0, thetaLength]} />
      <meshPhysicalMaterial
        color={HAIR}
        roughness={0.72}
        metalness={0}
        clearcoat={0.18}
        clearcoatRoughness={0.35}
      />
    </mesh>
  );
}

function HairStrands({ id }) {
  const preset = STYLE_PRESETS[id] || STYLE_PRESETS['classic-taper'];

  const strands = useMemo(() => {
    const result = [];
    const count = id === 'buzz-cut' ? 80 : id === 'curly-fade' ? 115 : 100;

    for (let i = 0; i < count; i += 1) {
      const u = seeded(i + id.length * 17);
      const v = seeded(i * 3 + id.length * 29);
      const angle = u * Math.PI * 2;
      const radius = Math.sqrt(v) * 0.82;

      let x = Math.cos(angle) * radius;
      let z = Math.sin(angle) * radius;
      let y = 0.46 + Math.sqrt(Math.max(0, 1 - radius * radius)) * 0.48;

      if (Math.abs(x) > 0.55 && preset.sides < 0.3) {
        y -= (0.3 - preset.sides) * 0.45;
      }

      y += preset.top * 0.16;

      const points = [];

      for (let s = 0; s < 7; s += 1) {
        const t = s / 6;
        let px = x;
        let pz = z;
        let py = y;

        if (preset.direction === 'forward') {
          pz += t * (0.18 + preset.front * 0.28);
          py -= t * (0.05 + preset.front * 0.13);
        } else if (preset.direction === 'back') {
          pz -= t * (0.16 + preset.back * 0.22);
          py += t * 0.03;
        } else if (preset.direction === 'upback') {
          pz -= t * 0.16;
          py += t * (0.20 + preset.front * 0.25);
        } else if (preset.direction === 'side') {
          px += t * (x > 0 ? 0.18 : -0.12);
          pz -= t * 0.08;
          py += t * 0.06;
        } else if (preset.direction === 'messy') {
          px += Math.sin(i * 1.7 + t * 4) * 0.07 * t;
          pz += Math.cos(i * 1.2 + t * 5) * 0.09 * t;
          py += t * (0.10 + seeded(i) * 0.15);
        } else if (preset.direction === 'curly') {
          const curl = Math.sin(t * Math.PI * 2.2 + i) * 0.055;
          px += curl;
          pz += Math.cos(t * Math.PI * 2.2 + i) * 0.055;
          py += t * 0.13;
        }

        const texture = (seeded(i * 11 + s) - 0.5) * preset.texture * 0.055;
        points.push(new THREE.Vector3(px + texture, py, pz + texture));
      }

      if (id === 'buzz-cut') {
        points[points.length - 1].y = y + 0.05;
      }

      result.push(points);
    }

    return result;
  }, [id, preset]);

  return (
    <group>
      {strands.map((points, index) => {
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(
          curve,
          8,
          id === 'buzz-cut' ? 0.010 : 0.014,
          5,
          false
        );

        return (
          <mesh key={index} geometry={geometry} castShadow>
            <meshPhysicalMaterial
              color={index % 7 === 0 ? HAIR_HIGHLIGHT : HAIR}
              roughness={0.64}
              metalness={0}
              clearcoat={0.22}
              clearcoatRoughness={0.28}
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
      <BaseHead />
      <HairCap preset={preset} />
      <HairStrands id={hairstyle?.id} />
    </group>
  );
}

function Scene({ hairstyle, controlsRef }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight intensity={0.55} groundColor="#241b18" skyColor="#f4dfc7" />
      <directionalLight
        position={[4, 7, 6]}
        intensity={2.0}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, 2]} intensity={0.65} color="#b7c9ff" />
      <directionalLight position={[2, 2, -5]} intensity={0.45} color="#ffd6ad" />
      <Environment preset="studio" />

      <Suspense fallback={<Html center><LoadingSpinner /></Html>}>
        <Model hairstyle={hairstyle} />
      </Suspense>

      <ContactShadows position={[0, -1.65, 0]} opacity={0.38} scale={5} blur={2.5} far={3.5} />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        minDistance={2.45}
        maxDistance={5.2}
        target={[0, -0.05, 0]}
        minPolarAngle={Math.PI * 0.20}
        maxPolarAngle={Math.PI * 0.78}
      />
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-2 border-gold-400/20 border-t-gold-400 rounded-full animate-spin" />
      <span className="text-xs text-gold-300">Preparing 3D style…</span>
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
      front: [0, 0.15, dist],
      back: [0, 0.15, -dist],
      left: [-dist, 0.15, 0],
      right: [dist, 0.15, 0],
    };

    const pos = positions[view];
    if (!pos) return;

    controls.object.position.set(...pos);
    controls.target.set(0, -0.05, 0);
    controls.update();
  };

  const resetCamera = () => {
    const controls = controlsRef.current;
    if (!controls) return;

    controls.object.position.set(0, 0.35, 4);
    controls.target.set(0, -0.05, 0);
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
        camera={{ position: [0, 0.35, 4], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={() => setError(false)}
        style={{ background: 'transparent' }}
      >
        <Scene hairstyle={hairstyle} controlsRef={controlsRef} />
      </Canvas>

      <div className="absolute top-3 left-3 glass-light rounded-full px-3 py-1">
        <span className="text-xs text-gold-300 font-medium">3D • Same face, different hair</span>
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
