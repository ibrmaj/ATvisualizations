import React, { useMemo, useState } from 'react'

// Drop your winner_geo.json at this path — Vite handles JSON imports natively.
import rawPoints from './data/winner_geo.json'

import { buildColorMap } from './utils/colors'
import Scene from './components/Scene'
import Sidebar from './components/Sidebar'
import Tooltip from './components/Tooltip'

export default function App() {
  // Filter out any records missing lat/lng
  const points = useMemo(() =>
    rawPoints.filter(p => typeof p.lat === 'number' && typeof p.lng === 'number'),
  [])

  // Derive unique groups and build a stable color map
  const colorMap = useMemo(() => {
    const groups = [...new Set(points.map(p => p.group2))]
    return buildColorMap(groups)
  }, [points])

  // Visibility toggle per group (all on by default)
  const [visibleGroups, setVisibleGroups] = useState(() =>
    Object.fromEntries(Object.keys(colorMap).map(g => [g, true]))
  )

  const [searchId, setSearchId] = useState('')
  const [hoveredPoint, setHoveredPoint] = useState(null)

  const handleToggleGroup = (group) =>
    setVisibleGroups(prev => ({ ...prev, [group]: !prev[group] }))

  const visibleCount = useMemo(() =>
    points.filter(p => visibleGroups[p.group2] !== false).length,
  [points, visibleGroups])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Scene
        points={points}
        colorMap={colorMap}
        visibleGroups={visibleGroups}
        searchId={searchId}
        onHover={setHoveredPoint}
        hoveredPoint={hoveredPoint}
      />
      <Sidebar
        colorMap={colorMap}
        visibleGroups={visibleGroups}
        onToggleGroup={handleToggleGroup}
        searchId={searchId}
        onSearchChange={setSearchId}
        totalPoints={points.length}
        visibleCount={visibleCount}
      />
      <Tooltip point={hoveredPoint} />
    </div>
  )
}