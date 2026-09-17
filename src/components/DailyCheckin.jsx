import { useState } from 'react'

const SCALE = Array.from({ length: 10 }, (_, i) => i + 1)

function formatDate(date) {
  const d = new Date(`${date}T00:00:00`)
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
}

export default function DailyCheckin({ entry, onSave, onFinish, onExit }) {
  const [draft, setDraft] = useState(entry)

  const isComplete =
    draft.chosenToday.trim().length > 0 &&
    draft.satisfaction != null &&
    draft.chosenTomorrow.trim().length > 0

  function update(field, value) {
    const next = { ...draft, [field]: value }
    setDraft(next)
    onSave(next)
  }

  function handleFinish() {
    onFinish(draft)
  }

  return (
    <div className="stack">
      <div>
        <h2>Tonight&rsquo;s check-in</h2>
        <p className="muted">{formatDate(draft.date)}</p>
      </div>

      <div className="card stack">
        <div className="stack" style={{ gap: 6 }}>
          <label className="muted" style={{ fontWeight: 600, color: 'var(--navy)' }}>
            What did you choose to do today?
          </label>
          <textarea
            value={draft.chosenToday}
            onChange={(e) => update('chosenToday', e.target.value)}
            placeholder="Type your answer..."
          />
        </div>

        <div className="stack" style={{ gap: 6 }}>
          <label className="muted" style={{ fontWeight: 600, color: 'var(--navy)' }}>
            Were you satisfied with your choices?
          </label>
          <div className="scale-row">
            {SCALE.map((n) => (
              <button
                key={n}
                type="button"
                className={`scale-btn${draft.satisfaction === n ? ' selected' : ''}`}
                onClick={() => update('satisfaction', n)}
                aria-pressed={draft.satisfaction === n}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="scale-hint">
            <span>Not at all</span>
            <span>Completely</span>
          </div>
        </div>

        <div className="stack" style={{ gap: 6 }}>
          <label className="muted" style={{ fontWeight: 600, color: 'var(--navy)' }}>
            What am I choosing to do tomorrow?
          </label>
          <textarea
            value={draft.chosenTomorrow}
            onChange={(e) => update('chosenTomorrow', e.target.value)}
            placeholder="Type your answer..."
          />
        </div>
      </div>

      <div className="row-actions">
        <button className="secondary-btn" onClick={onExit}>
          Save &amp; exit
        </button>
        <button className="primary-btn" disabled={!isComplete} onClick={handleFinish}>
          Finish tonight&rsquo;s check-in
        </button>
      </div>
    </div>
  )
}
