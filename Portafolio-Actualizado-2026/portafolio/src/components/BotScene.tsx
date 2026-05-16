import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Eyes that follow the mouse ─── */
function Eye({
  position,
  mouseRef,
}: {
  position: [number, number, number]
  mouseRef: React.MutableRefObject<THREE.Vector2>
}) {
  const pupilRef = useRef<THREE.Mesh>(null!)
  const { camera, size } = useThree()

  useFrame(() => {
    if (!pupilRef.current) return
    // Convert NDC mouse → world ray
    const vec = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5)
    vec.unproject(camera)
    // Direction from eye center to mouse world pos (approx on z=0 plane)
    const eyeWorld = new THREE.Vector3(...position)
    const dir = vec.clone().sub(eyeWorld).normalize()
    // Clamp pupil movement inside eye socket
    const maxOffset = 0.055
    pupilRef.current.position.x = THREE.MathUtils.clamp(dir.x * maxOffset * 2.5, -maxOffset, maxOffset)
    pupilRef.current.position.y = THREE.MathUtils.clamp(dir.y * maxOffset * 2.5, -maxOffset, maxOffset)
    pupilRef.current.position.z = 0.075
  })

  // Suppress TS "size unused" warning – it's consumed via useThree for correctness
  void size

  return (
    <group position={position}>
      {/* Eyeball */}
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#0a0a12" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Iris glow ring */}
      <mesh>
        <ringGeometry args={[0.065, 0.10, 40]} />
        <meshStandardMaterial
          color="#00ffc8"
          emissive="#00ffc8"
          emissiveIntensity={2.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Pupil */}
      <mesh ref={pupilRef}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial
          color="#00ffc8"
          emissive="#00ffc8"
          emissiveIntensity={4}
          roughness={0}
        />
      </mesh>
      {/* Specular highlight */}
      <mesh position={[0.03, 0.035, 0.08]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0} metalness={1} />
      </mesh>
    </group>
  )
}

/* ─── Antenna ─── */
function Antenna({ x }: { x: number }) {
  return (
    <group position={[x, 0.82, 0]}>
      <mesh>
        <cylinderGeometry args={[0.018, 0.018, 0.22, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color="#00ffc8"
          emissive="#00ffc8"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  )
}

/* ─── Mouth / speaker grille ─── */
function Mouth() {
  const bars = [-0.08, -0.027, 0.027, 0.08]
  return (
    <group position={[0, -0.16, 0.41]}>
      {bars.map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={[0.025, 0.065, 0.01]} />
          <meshStandardMaterial
            color="#00ffc8"
            emissive="#00ffc8"
            emissiveIntensity={1.5 + i * 0.3}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Main Bot mesh ─── */
function Bot({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  const groupRef = useRef<THREE.Group>(null!)
  const headRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Floating body
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.06
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08
    }

    // Head follows mouse with smooth lerp
    if (headRef.current) {
      const targetX = -mouseRef.current.y * 0.25
      const targetY = mouseRef.current.x * 0.35
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.06)
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.06)
    }
  })

  return (
    <group ref={groupRef}>
      {/* ── BODY ── */}
      <mesh position={[0, -0.42, 0]} castShadow>
        <boxGeometry args={[0.72, 0.68, 0.52]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.6} roughness={0.25} />
      </mesh>

      {/* Body accent panel */}
      <mesh position={[0, -0.38, 0.262]}>
        <planeGeometry args={[0.42, 0.36]} />
        <meshStandardMaterial
          color="#00ffc8"
          emissive="#00ffc8"
          emissiveIntensity={0.15}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Chest orb */}
      <mesh position={[0, -0.38, 0.272]}>
        <circleGeometry args={[0.08, 40]} />
        <meshStandardMaterial
          color="#00ffc8"
          emissive="#00ffc8"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Shoulder pads */}
      {([-0.44, 0.44] as number[]).map((x, i) => (
        <mesh key={i} position={[x, -0.3, 0]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial color="#111122" metalness={0.7} roughness={0.2} />
        </mesh>
      ))}

      {/* Arms */}
      {([-0.58, 0.58] as number[]).map((x, i) => (
        <group key={i} position={[x, -0.52, 0]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.38, 16]} />
            <meshStandardMaterial color="#0d0d1a" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Elbow joint */}
          <mesh position={[0, -0.25, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial color="#00ffc8" emissive="#00ffc8" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}

      {/* ── NECK ── */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.095, 0.11, 0.14, 16]} />
        <meshStandardMaterial color="#111122" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* ── HEAD ── */}
      <group ref={headRef} position={[0, 0.3, 0]}>
        {/* Main head box */}
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.56, 0.54]} />
          <meshStandardMaterial color="#0d0d1a" metalness={0.65} roughness={0.2} />
        </mesh>

        {/* Visor / face panel */}
        <mesh position={[0, 0.02, 0.272]}>
          <planeGeometry args={[0.50, 0.38]} />
          <MeshDistortMaterial
            color="#001a14"
            emissive="#00ffc8"
            emissiveIntensity={0.04}
            transparent
            opacity={0.82}
            distort={0.04}
            speed={1}
          />
        </mesh>

        {/* Eyes */}
        <Eye position={[-0.13, 0.05, 0.27]} mouseRef={mouseRef} />
        <Eye position={[0.13, 0.05, 0.27]} mouseRef={mouseRef} />

        {/* Mouth */}
        <Mouth />

        {/* Antennas */}
        <Antenna x={-0.16} />
        <Antenna x={0.16} />

        {/* Side panels */}
        {([-0.312, 0.312] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.01, 0.44, 0.36]} />
            <meshStandardMaterial
              color="#00ffc8"
              emissive="#00ffc8"
              emissiveIntensity={0.6}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ─── Floating particles ─── */
function Particles() {
  const count = 60
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2
    }
    return arr
  }, [])

  const meshRef = useRef<THREE.Points>(null!)
  useFrame(({ clock }) => {
    if (meshRef.current) meshRef.current.rotation.y = clock.getElapsedTime() * 0.04
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00ffc8" size={0.018} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

/* ─── Ground ring ─── */
function GroundRing() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.2
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]}>
      <ringGeometry args={[0.7, 0.76, 80]} />
      <meshStandardMaterial
        color="#00ffc8"
        emissive="#00ffc8"
        emissiveIntensity={1.2}
        transparent
        opacity={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/* ─── Scan line effect (passes over head) ─── */
function ScanLine() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = (Math.sin(clock.getElapsedTime() * 0.6) + 1) / 2
    if (ref.current) ref.current.position.y = THREE.MathUtils.lerp(-0.76, 0.62, t)
  })
  return (
    <mesh ref={ref} position={[0, 0, 0.28]}>
      <planeGeometry args={[0.62, 0.004]} />
      <meshStandardMaterial
        color="#00ffc8"
        emissive="#00ffc8"
        emissiveIntensity={3}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

/* ─── Scene wrapper ─── */
/* Removes the HDRI background set by Environment and forces transparent clear */
function SceneSetup() {
  const { scene, gl } = useThree()
  gl.setClearColor(0x000000, 0)
  scene.background = null
  return null
}

function Scene({ mouseRef }: { mouseRef: React.MutableRefObject<THREE.Vector2> }) {
  return (
    <>
      <SceneSetup />
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 3, 2]} intensity={2} color="#c8e8ff" />
      <pointLight position={[-2, 1, -1]} intensity={1.2} color="#00ffc8" />
      <pointLight position={[0, -1, 3]} intensity={0.8} color="#00ffc8" />
      <pointLight position={[0, 4, 0]} intensity={0.6} color="#ffffff" />

      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
        <Bot mouseRef={mouseRef} />
        <ScanLine />
      </Float>

      <GroundRing />
      <Particles />
    </>
  )
}

/* ─── Exported canvas wrapper ─── */
export default function BotScene() {
  const mouseRef = useRef(new THREE.Vector2(0, 0))

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', background: 'transparent' }}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ background: 'transparent', display: 'block' }}
        shadows
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0)
          gl.setClearAlpha(0)
          scene.background = null
        }}
      >
        <Scene mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
