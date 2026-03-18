import React from 'react'

const CalendarLogModal = ({ isOpen, onClose, dateLabel, logs = [], onEdit, onAdd }) => {
  if (!isOpen) return null

  const hasLogs = logs.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-visible"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-modal)',
        }}
      >
        <div className="flex items-start justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h2 className="text-[1rem] font-semibold" style={{ color: 'var(--text)' }}>
              Calendar Log
            </h2>
            <p className="text-[0.75rem] mt-0.5" style={{ color: 'var(--muted)' }}>
              {dateLabel || ''}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ color: 'var(--muted)' }}>
            x
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {hasLogs ? (
            logs.map((log, idx) => (
              <div
                key={log.id || idx}
                className="rounded-xl px-4 py-3"
                style={{ border: '1px solid var(--border)', backgroundColor: 'rgba(128,128,128,0.04)' }}
              >
                <div className="grid grid-cols-2 gap-3 text-[0.8rem]">
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Time In</div>
                    <div style={{ color: 'var(--text)' }}>{log.timeIn || '--'}</div>
                  </div>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Time Out</div>
                    <div style={{ color: 'var(--text)' }}>{log.timeOut || '--'}</div>
                  </div>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Break</div>
                    <div style={{ color: 'var(--text)' }}>{log.breakHr ?? 0} hr</div>
                  </div>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Hours</div>
                    <div style={{ color: 'var(--text)' }}>{log.hours ?? 0} hrs</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Notes</div>
                  <p className="text-[0.82rem] leading-relaxed" style={{ color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
                    {log.notes || 'No notes provided.'}
                  </p>
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onEdit?.(log)}
                    className="px-3 py-1.5 rounded-lg text-[0.7rem]"
                    style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[0.85rem]" style={{ color: 'var(--muted)' }}>
              No log for this date.
            </p>
          )}
        </div>

        <div className="px-6 py-4 flex items-center gap-3" style={{ borderTop: '1px solid var(--border)' }}>
          {hasLogs ? (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-[0.875rem]"
              style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
            >
              Close
            </button>
          ) : (
            <>
              <button
                onClick={onAdd}
                className="flex-1 py-2.5 rounded-xl text-[0.875rem] font-medium"
                style={{ background: 'linear-gradient(135deg, #c8b89a, #a89070)', color: '#0d0d0f' }}
              >
                Add Log
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-[0.875rem]"
                style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarLogModal
