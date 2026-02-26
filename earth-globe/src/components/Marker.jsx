import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { latLngToXYZ } from '../utils/geo'

const GLOBE_RADIUS  = 1
const MARKER_OFFSET = 0.012  // above surface to prevent z-fighting
const MARKER_RADIUS = 0.008
const HALO_RADIUS   = 0.0

/**
 * Single data-point marker: colored sphere + translucent glow halo.
 * Pulses when highlighted (search match) or hovered.
 */
export default function Marker({ point, color, highlighted, onHover }) {
  const markerRef = useRef()
  const haloRef   = useRef()
  const [hovered, setHovered] = useState(false)

  const { x, y, z } = latLngToXYZ(point.lat, point.lng, GLOBE_RADIUS + MARKER_OFFSET)

  useFrame(({ clock }) => {
    if (!markerRef.current) return
    const t     = clock.getElapsedTime()
    const pulse = highlighted ? 1 + 0.35 * Math.sin(t * 4) : hovered ? 1.4 : 1.0
    markerRef.current.scale.setScalar(pulse)
    if (haloRef.current) haloRef.current.scale.setScalar(hovered || highlighted ? pulse * 1.6 : 1.3)
  })

  const handleOver = (e) => { e.stopPropagation(); setHovered(true);  onHover(point); document.body.style.cursor = 'pointer' }
  const handleOut  = (e) => { e.stopPropagation(); setHovered(false); onHover(null);  document.body.style.cursor = 'auto'    }

  return (
    <group position={[x, y, z]}>
      {/* Glow halo — additive blend for a bloom-like effect */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[HALO_RADIUS, 12, 12]} />
        <meshBasicMaterial
          color={color} transparent opacity={0.25}
          depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main sphere */}
      <mesh ref={markerRef} onPointerOver={handleOver} onPointerOut={handleOut}>
        <sphereGeometry args={[MARKER_RADIUS, 10, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || highlighted ? 0.8 : 0.3}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}