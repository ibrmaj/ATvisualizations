import React from 'react'

export default function Sidebar({
  colorMap, visibleGroups, onToggleGroup,
  searchId, onSearchChange, totalPoints, visibleCount,
}) {
  const groups = Object.keys(colorMap).sort()

  const panel = {
    position: 'fixed', top: '20px', left: '20px', width: '220px',
    background: 'rgba(6,9,20,0.88)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px', padding: '18px', color: '#cdd5e0',
    fontFamily: '"Space Mono","Courier New",monospace', fontSize: '12px',
    backdropFilter: 'blur(10px)', zIndex: 50, boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
  }

  return (
    <div style={panel}>
      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#7eb8f7', letterSpacing: '0.08em', marginBottom: '2px' }}>
          🌍 GLOBE VIEWER
        </div>
        <div style={{ color: '#556', fontSize: '11px' }}>{visibleCount} / {totalPoints} points</div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '14px' }}>
        <label style={{ display: 'block', color: '#88a', marginBottom: '5px', fontSize: '11px' }}>SEARCH BY ID</label>
        <input
          type="text"
          placeholder="e.g. 10001"
          value={searchId}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px',
            padding: '6px 9px', color: '#e8eaf0',
            fontFamily: 'inherit', fontSize: '12px', outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '12px' }} />

      {/* Group toggles */}
      <div style={{ marginBottom: '6px', color: '#88a', fontSize: '11px', letterSpacing: '0.06em' }}>GROUPS</div>
      {groups.map(group => {
        const color   = colorMap[group]
        const visible = visibleGroups[group] !== false
        return (
          <label key={group} style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px', cursor: 'pointer', opacity: visible ? 1 : 0.45, transition: 'opacity 0.2s', userSelect: 'none' }}>
            <input type="checkbox" checked={visible} onChange={() => onToggleGroup(group)} style={{ display: 'none' }} />
            {/* Checkbox stand-in */}
            <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: `2px solid ${color}`, background: visible ? color : 'transparent', flexShrink: 0, transition: 'background 0.15s' }} />
            {/* Color dot */}
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}88`, flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{group}</span>
          </label>
        )
      })}

      <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', color: '#445', fontSize: '10px', lineHeight: '1.5' }}>
        Drag to rotate · Scroll to zoom · Right-drag to pan
      </div>
    </div>
  )
}