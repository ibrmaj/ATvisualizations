import React from 'react'

export default function Tooltip({ point }) {
  if (!point) return null
  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(8,12,24,0.92)', border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '10px', padding: '10px 18px', color: '#e8eaf0',
      fontFamily: '"Space Mono","Courier New",monospace', fontSize: '13px',
      lineHeight: '1.7', backdropFilter: 'blur(8px)', pointerEvents: 'none',
      zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', minWidth: '220px', textAlign: 'center',
    }}>
      <div style={{ color: '#7eb8f7', fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>#{point.id}</div>
      <div><span style={{ color: '#aaa' }}>Group:</span> {point.group2}</div>
      <div><span style={{ color: '#aaa' }}>Lat:</span>   {point.lat.toFixed(4)}°</div>
      <div><span style={{ color: '#aaa' }}>Lng:</span>   {point.lng.toFixed(4)}°</div>
    </div>
  )
}