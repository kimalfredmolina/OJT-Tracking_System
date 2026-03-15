import React from 'react'

/**
 * ActivityTable
 * @prop {Array}     logs      – [{ id, date, hours, notes }]
 * @prop {Function}  onAddLog  – callback when + Add is clicked
 * @prop {Function}  onBulkAdd – callback when Bulk Add is clicked
 */
const ActivityTable = ({ logs = [], onAddLog, onBulkAdd }) => (
  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
    <div className="px-5 sm:px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
      <h2 className="text-[0.75rem] font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Recent Activity</h2>
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-[0.7rem]" style={{ color: 'var(--muted)' }}>{logs.length} entries</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] font-medium transition-all"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderColor = 'rgba(200,184,154,0.7)'
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(200,184,154,0.35)'
              e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h6" />
            </svg>
            Select
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] font-medium transition-all"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderColor = 'rgba(200,184,154,0.7)'
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(200,184,154,0.35)'
              e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            onClick={onBulkAdd}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            Bulk Add
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] font-medium transition-all"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderColor = 'rgba(200,184,154,0.7)'
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(200,184,154,0.35)'
              e.currentTarget.style.backgroundColor = 'var(--accent-bg)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            onClick={onAddLog}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-[0.8rem] min-w-[320px]">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Date', 'Hours', 'Notes'].map(h => (
              <th key={h} className="px-5 sm:px-6 py-3 text-left text-[0.68rem] uppercase tracking-widest font-medium" style={{ color: 'var(--muted)' }}>{h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={log.id} className="transition-colors" style={{ borderBottom: i !== logs.length - 1 ? '1px solid var(--border)' : 'none' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.04)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <td className="px-5 sm:px-6 py-3.5 font-medium" style={{ color: 'var(--accent)' }}>{log.date}</td>
              <td className="px-5 sm:px-6 py-3.5" style={{ color: 'var(--text)' }}>{log.hours} hrs</td>
              <td className="px-5 sm:px-6 py-3.5" style={{ color: 'var(--muted)' }}>{log.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default ActivityTable
