import React, { useState } from 'react'

const PAD = (n) => String(n).padStart(2, '0')
const timeToMin = (h, m) => h * 60 + m

/**
 * AddLogModal
 * @prop {boolean}  isOpen    – controls visibility
 * @prop {function} onClose   – called when modal should close
 * @prop {function} onSave    – called with log data when Save is clicked
 * @prop {boolean}  isDark    – for accent text colour in light vs dark
 */
const AddLogModal = ({ isOpen, onClose, onSave, isDark }) => {
  const today = new Date()

  const [logDate, setLogDate] = useState(today.toISOString().slice(0, 10))
  const [timeIn,  setTimeIn]  = useState({ h: 9,  m: 30 })
  const [timeOut, setTimeOut] = useState({ h: 18, m: 30 })
  const [breakHr, setBreakHr] = useState(1)
  const [notes,   setNotes]   = useState('')

  const rawHours      = (timeToMin(timeOut.h, timeOut.m) - timeToMin(timeIn.h, timeIn.m)) / 60
  const computedHours = Math.max(0, rawHours - breakHr)

  const handleSave = () => {
    onSave?.({ logDate, timeIn, timeOut, breakHr, notes, computedHours })
    setNotes('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-modal)',}}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h2 className="text-[1rem] font-semibold" style={{ color: 'var(--text)' }}>Add New Log</h2>
            <p className="text-[0.75rem] mt-0.5" style={{ color: 'var(--muted)' }}>Record your OJT hours and daily activities.</p>
          </div>
          <button id="modal-close" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg transition-all" style={{ color: 'var(--muted)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.1)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Date */}
          <div>
            <label className="block text-[0.72rem] uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)' }}>Date</label>
            <input type="date" value={logDate} onChange={e => setLogDate(e.target.value)} className="theme-input w-full rounded-xl px-4 py-2.5 text-[0.85rem]" />
          </div>

          {/* Time In / Out */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Time In',  val: timeIn,  set: setTimeIn },
              { label: 'Time Out', val: timeOut, set: setTimeOut },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <label className="block text-[0.72rem] uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
                <div className="flex items-center gap-1 rounded-xl px-3 py-2.5" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--border)' }}>
                  <input type="number" min="0" max="23" value={PAD(val.h)} onChange={e => set(p => ({ ...p, h: +e.target.value % 24 }))} className="w-8 bg-transparent text-[0.85rem] text-center focus:outline-none" style={{ color: 'var(--text)' }} />
                  <span style={{ color: 'var(--muted)' }}>:</span>
                  <input type="number" min="0" max="59" value={PAD(val.m)} onChange={e => set(p => ({ ...p, m: +e.target.value % 60 }))} className="w-8 bg-transparent text-[0.85rem] text-center focus:outline-none" style={{ color: 'var(--text)' }} />
                  <span className="text-[0.7rem] ml-1" style={{ color: 'var(--muted)' }}>{val.h < 12 ? 'AM' : 'PM'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Hours info banner */}
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: 'var(--accent-bg)', border: '1px solid rgba(200,184,154,0.25)' }}>
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" style={{ color: 'var(--accent)' }}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 8v4l3 3" />
            </svg>
            <p className="text-[0.77rem] leading-relaxed" style={{ color: isDark ? '#c8b89a' : '#8a6a40' }}>You worked for <strong>{rawHours.toFixed(1)} hrs</strong>. Only <strong>{computedHours.toFixed(1)} hrs</strong> counted due to <strong>{breakHr} hr</strong> break.</p>
          </div>

          {/* Break */}
          <div>
            <label className="block text-[0.72rem] uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)' }}>Break</label>
            <select value={breakHr} onChange={e => setBreakHr(+e.target.value)} className="theme-input w-full rounded-xl px-4 py-2.5 text-[0.85rem] cursor-pointer">
              {[0, 0.5, 1, 1.5, 2].map(v => (<option key={v} value={v}>{v === 0 ? 'No break' : `${v} hr`}</option>))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[0.72rem] uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)' }}>Notes</label>
            <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Describe the work you did today…" className="theme-input w-full rounded-xl px-4 py-3 text-[0.85rem] resize-none" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
          <button id="modal-save" onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[0.875rem] font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{ background: 'linear-gradient(135deg, #c8b89a, #a89070)', color: '#0d0d0f', boxShadow: '0 2px 8px rgba(200,184,154,0.25)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Save Log
          </button>
          <button id="modal-cancel" onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[0.875rem] transition-all duration-200" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddLogModal
