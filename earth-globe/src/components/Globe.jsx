import React, { useRef } from 'react'
import { useTexture } from '@react-three/drei'

/**
 * Textured sphere. Loads /public/textures/earth.jpg.
 * Must be wrapped in <Suspense> by the parent.
 */
export default function Globe({ radius = 1 }) {
  const texture = useTexture('/textures/earth.jpg')

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.8} metalness={0.1} />
    </mesh>
  )
}