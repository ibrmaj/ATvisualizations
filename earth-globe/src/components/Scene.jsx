import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Globe from './Globe'
import Marker from './Marker'

export default function Scene({ points, colorMap, visibleGroups, searchId, onHover, hoveredPoint }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 45, near: 0.01, far: 100 }}
      style={{ background: '#000008' }}
    >
      {/* Starfield background */}
      <Stars radius={90} depth={50} count={5000} factor={4} saturation={0.3} fade speed={0.4} />

      {/* Soft blue ambient fill so the dark side isn't pitch black */}
      <ambientLight intensity={2.25} color="#b0c8ff" />

      {/* Main "sun" directional light */}
      {/*<directionalLight position={[5, 3, 5]} intensity={1.4} color="#fff8e8" /> */}

      {/* Subtle counter-light from the opposite side */}
      {/*<directionalLight position={[-3, -2, -3]} intensity={0.15} color="#4466cc" />*/}

      {/* Globe — Suspense handles the async texture load */}
      <Suspense fallback={null}>
        <Globe radius={1} />
      </Suspense>

      {/* One Marker per visible data point */}
      {points.map(point => {
        if (visibleGroups[point.group2] === false) return null

        const highlighted =
          searchId.trim() !== '' &&
          String(point.id).toLowerCase().includes(searchId.trim().toLowerCase())

        return (
          <Marker
            key={point.id}
            point={point}
            color={colorMap[point.group2] || '#ffffff'}
            highlighted={highlighted}
            onHover={onHover}
          />
        )
      })}

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={1.3}
        maxDistance={8}
        zoomSpeed={0.8}
        rotateSpeed={0.5}
        autoRotate={!hoveredPoint}  // ← stops when a point is hovered
        autoRotateSpeed={0.4}
      />
    </Canvas>
  )
}