import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// ── Procedural placeholder head ──────────────────────────────────
// This is NOT a professional haircut model — it is a functional 3D
// head demo so the viewer works without real assets. Real .glb/.gltf
// models can replace this by setting `model` on the hairstyle data.

function HeadBase() {
  return (
    <mesh castShadow receiveShadow position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#c8956d" roughness={0.6} metalness={0.05} />
    </mesh>
  );
}

function Neck() {
  return (
    <mesh position={[0, -1.2, 0]} castShadow>
      <cylinderGeometry args={[0.42, 0.55, 0.8, 32]} />
      <meshStandardMaterial color="#c8956d" roughness={0.6} metalness={0.05} />
    </mesh>
  );
}

function Ears() {
  const earGeo = useMemo(() => new THREE.SphereGeometry(0.12, 16, 16), []);
  return (
    <>
      <mesh geometry={earGeo} position={[-1.0, 0.05, 0]} scale={[0.5, 1, 0.6]} castShadow>
        <meshStandardMaterial color="#b8845a" roughness={0.7} />
      </mesh>
      <mesh geometry={earGeo} position={[1.0, 0.05, 0]} scale={[0.5, 1, 0.6]} castShadow>
        <meshStandardMaterial color="#b8845a" roughness={0.7} />
      </mesh>
    </>
  );
}

function Eyes() {
  const eyeGeo = useMemo(() => new THREE.SphereGeometry(0.08, 16, 16), []);
  return (
    <>
      <mesh geometry={eyeGeo} position={[-0.32, 0.15, 0.88]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
      </mesh>
      <mesh geometry={eyeGeo} position={[0.32, 0.15, 0.88]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
      </mesh>
    </>
  );
}

function Brows() {
  const browGeo = useMemo(() => new THREE.BoxGeometry(0.2, 0.03, 0.05), []);
  return (
    <>
      <mesh geometry={browGeo} position={[-0.32, 0.3, 0.9]} rotation={[0, 0, -0.05]}>
        <meshStandardMaterial color="#3a2a1a" roughness={0.8} />
      </mesh>
      <mesh geometry={browGeo} position={[0.32, 0.3, 0.9]} rotation={[0, 0, 0.05]}>
        <meshStandardMaterial color="#3a2a1a" roughness={0.8} />
      </mesh>
    </>
  );
}

function Nose() {
  return (
    <mesh position={[0, -0.05, 0.95]} rotation={[0.3, 0, 0]}>
      <coneGeometry args={[0.1, 0.25, 16]} />
      <meshStandardMaterial color="#b8845a" roughness={0.6} />
    </mesh>
  );
}

// ── Procedural hairstyles ────────────────────────────────────────
// Each returns a group of meshes approximating the hairstyle shape.
// Color and style vary by category to visually differentiate them.

function HairMesh({ category, color }) {
  const hairMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.0 }),
    [color]
  );

  switch (category) {
    case 'Buzz':
      return (
        <mesh material={hairMaterial} position={[0, 0.15, 0]}>
          <sphereGeometry args={[1.03, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        </mesh>
      );
    case 'Fade':
    case 'Crop':
      return (
        <group>
          {/* Top textured hair */}
          <mesh material={hairMaterial} position={[0, 0.35, -0.05]} castShadow>
            <sphereGeometry args={[0.85, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          </mesh>
          {/* Front fringe */}
          <mesh material={hairMaterial} position={[0, 0.3, 0.7]} scale={[1, 0.6, 0.5]} castShadow>
            <sphereGeometry args={[0.4, 32, 32]} />
          </mesh>
          {/* Faded sides - thin layer */}
          <mesh material={hairMaterial} position={[0, 0.05, 0]}>
            <sphereGeometry args={[1.01, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          </mesh>
        </group>
      );
    case 'Quiff':
    case 'Pompadour':
      return (
        <group>
          {/* High volume top */}
          <mesh material={hairMaterial} position={[0, 0.6, -0.1]} scale={[1, 1.2, 1.1]} castShadow>
            <sphereGeometry args={[0.8, 48, 48]} />
          </mesh>
          {/* Front swept up */}
          <mesh material={hairMaterial} position={[0, 0.55, 0.55]} scale={[0.8, 1, 0.6]} castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
          </mesh>
          {/* Sides */}
          <mesh material={hairMaterial} position={[0, 0.1, 0]}>
            <sphereGeometry args={[1.02, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
          </mesh>
        </group>
      );
    case 'Undercut':
      return (
        <group>
          {/* Long top, disconnected */}
          <mesh material={hairMaterial} position={[0, 0.5, 0]} scale={[1.1, 0.8, 1.3]} castShadow>
            <boxGeometry args={[1.3, 0.5, 1.5]} />
          </mesh>
          <mesh material={hairMaterial} position={[0, 0.7, -0.2]} scale={[1, 1, 1]} castShadow>
            <sphereGeometry args={[0.6, 32, 32]} />
          </mesh>
        </group>
      );
    case 'Curly':
      return (
        <group>
          {Array.from({ length: 24 }).map((_, i) => {
            const phi = (i / 24) * Math.PI * 2;
            const theta = (i / 24) * Math.PI * 0.5;
            const r = 1.05;
            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = 0.15 + r * Math.cos(theta) * 0.5;
            const z = r * Math.sin(theta) * Math.sin(phi);
            return (
              <mesh key={i} material={hairMaterial} position={[x, y, z]} castShadow>
                <sphereGeometry args={[0.18, 12, 12]} />
              </mesh>
            );
          })}
          <mesh material={hairMaterial} position={[0, 0.3, 0]}>
            <sphereGeometry args={[1.08, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          </mesh>
        </group>
      );
    case 'Slick Back':
    case 'Classic':
      return (
        <group>
          <mesh material={hairMaterial} position={[0, 0.3, -0.05]} scale={[1, 0.7, 1.1]} castShadow>
            <sphereGeometry args={[1.05, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          </mesh>
          <mesh material={hairMaterial} position={[0, 0.2, 0]}>
            <sphereGeometry args={[1.02, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
          </mesh>
        </group>
      );
    case 'Textured':
    case 'Messy':
      return (
        <group>
          <mesh material={hairMaterial} position={[0, 0.35, 0]} scale={[1, 0.9, 1.05]} castShadow>
            <sphereGeometry args={[1.06, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <mesh
                key={i}
                material={hairMaterial}
                position={[Math.cos(angle) * 0.7, 0.5 + (i % 2) * 0.1, Math.sin(angle) * 0.7]}
                scale={[0.6, 0.8, 0.6]}
                castShadow
              >
                <sphereGeometry args={[0.25, 16, 16]} />
              </mesh>
            );
          })}
        </group>
      );
    default:
      return (
        <mesh material={hairMaterial} position={[0, 0.3, 0]} castShadow>
          <sphereGeometry args={[1.05, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>
      );
  }
}

function ProceduralHead({ hairstyle }) {
  // Map categories to hair colors for visual variety
  const colorMap = {
    Buzz: '#1a1a1a',
    Fade: '#2a1a0a',
    Crop: '#3a2a15',
    Quiff: '#2a1a0a',
    Pompadour: '#1a0a00',
    Undercut: '#2a2010',
    Curly: '#1a1a1a',
    Classic: '#2a1a0a',
    Textured: '#3a2a15',
    Taper: '#2a1a0a',
  };
  const hairColor = colorMap[hairstyle?.category] || '#2a1a0a';

  return (
    <group>
      <HeadBase />
      <Neck />
      <Ears />
      <Eyes />
      <Brows />
      <Nose />
      <HairMesh category={hairstyle?.category} color={hairColor} />
    </group>
  );
}

// ── Real GLTF/GLB model loader ───────────────────────────────────
function GLTFModel({ url }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} scale={1.2} />;
}

// ── Scene with lighting ──────────────────────────────────────────
function Scene({ hairstyle, modelUrl, controlsRef }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#d4ad4f" />
      <Environment preset="studio" />

      <Suspense fallback={<Html center><LoadingSpinner /></Html>}>
        {modelUrl ? (
          <GLTFModel url={modelUrl} />
        ) : (
          <ProceduralHead hairstyle={hairstyle} />
        )}
      </Suspense>

      <ContactShadows position={[0, -1.7, 0]} opacity={0.5} scale={6} blur={2} far={4} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={2}
        maxDistance={6}
        enableDamping
        dampingFactor={0.08}
        target={[0, 0, 0]}
      />
    </>
  );
}

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid rgba(212, 173, 79, 0.2)',
          borderTopColor: '#d4ad4f',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span style={{ color: '#d4ad4f', fontSize: '13px', fontWeight: 500 }}>Loading 3D model…</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

// ── Main viewer component ─────────────────────────────────────────
export default function HairStyleViewer({ hairstyle, className = '' }) {
  const controlsRef = useRef(null);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);

  const modelUrl = hairstyle?.model || null;

  // Preload GLTF if available
  useEffect(() => {
    if (modelUrl) {
      useGLTF.preload(modelUrl);
    }
  }, [modelUrl]);

  const setView = (view) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const dist = controls.getDistance();
    const positions = {
      front: [0, 0, dist],
      back: [0, 0, -dist],
      left: [-dist, 0, 0],
      right: [dist, 0, 0],
    };
    const pos = positions[view];
    if (pos) {
      controls.object.position.set(pos[0], pos[1], pos[2]);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  };

  const resetCamera = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.object.position.set(0, 0.5, 4);
    controls.target.set(0, 0, 0);
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
      <div className="flex flex-col items-center justify-center bg-ink-800 rounded-3xl p-8">
        <p className="text-gray-400 font-medium mb-1">3D Preview Unavailable</p>
        <p className="text-gray-500 text-sm">Please check back later.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative viewer-container ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onError={() => setError(true)}
        style={{ background: 'transparent' }}
      >
        <Scene hairstyle={hairstyle} modelUrl={modelUrl} controlsRef={controlsRef} />
      </Canvas>

      {/* View controls overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 glass rounded-full px-2 py-1.5 safe-mb">
        <ViewBtn label="Front" onClick={() => setView('front')} />
        <ViewBtn label="Left" onClick={() => setView('left')} />
        <ViewBtn label="Back" onClick={() => setView('back')} />
        <ViewBtn label="Right" onClick={() => setView('right')} />
        <div className="w-px h-5 bg-white/10" />
        <ViewBtn label="Reset" onClick={resetCamera} icon />
        <ViewBtn label="Fullscreen" onClick={toggleFullscreen} icon />
      </div>

      {!modelUrl && (
        <div className="absolute top-3 left-3 glass-light rounded-full px-3 py-1">
          <span className="text-xs text-gold-300 font-medium">Demo Model</span>
        </div>
      )}
    </div>
  );
}

function ViewBtn({ label, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-300 hover:text-gold-300 hover:bg-white/5 transition-colors"
    >
      {label}
    </button>
  );
}
