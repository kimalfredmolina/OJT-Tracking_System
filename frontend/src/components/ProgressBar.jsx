import React from 'react'

/**
 * ProgressBar
 * @prop {number} completed    – hours completed
 * @prop {number} required     – total required hours
 * @prop {number} avgDaily     – average daily hours logged
 */
const ProgressBar = ({ completed, required, avgDaily }) => {
  const pct = Math.round((completed / required) * 100)

  return (
    <div className="rounded-2xl px-5 sm:px-6 py-4 sm:py-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[0.75rem] font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Progress</h2>
        <span className="text-[0.72rem]" style={{ color: 'var(--muted)' }}>Avg daily:{' '}<span className="font-semibold" style={{ color: 'var(--accent)' }}>{avgDaily} hrs</span></span>
      </div>

      <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(128,128,128,0.1)' }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #c8b89a, #a89070)' }} />
      </div>

      <div className="flex justify-between mt-2">
        <p className="text-[0.72rem]" style={{ color: 'var(--muted)' }}><span className="font-medium" style={{ color: 'var(--accent)' }}>{completed} hrs</span>{' '}/ {required} hrs</p>
        <p className="text-[0.72rem]" style={{ color: 'var(--muted)' }}>{pct}%</p>
      </div>
    </div>
  )
}

export default ProgressBar
