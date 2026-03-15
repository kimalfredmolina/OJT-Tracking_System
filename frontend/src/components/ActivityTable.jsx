import React from 'react'

/**
 * ActivityTable
 * @prop {Array}  logs – [{ id, date, hours, notes }]
 */
const ActivityTable = ({ logs = [] }) => (
  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
    <div className="px-5 sm:px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
      <h2 className="text-[0.75rem] font-semibold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Recent Activity</h2>
      <span className="text-[0.7rem]" style={{ color: 'var(--muted)' }}>{logs.length} entries</span>
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
