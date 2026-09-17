import { ratingColor } from '../lib/ratingColor'

function formatDate(date) {
  const d = new Date(`${date}T00:00:00`)
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DailyDetail({ entry, onClose }) {
  return (
    <div className="stack">
      <div className="top-bar" style={{ marginBottom: 0 }}>
        <h2>{formatDate(entry.date)}</h2>
        <button className="link-btn" onClick={onClose}>
          Close
        </button>
      </div>

      {entry.completedAt == null && (
        <p className="muted">This check-in isn&rsquo;t finished yet.</p>
      )}

      <div className="card stack">
        <div>
          <p className="muted" style={{ fontWeight: 600, color: 'var(--navy)', margin: '0 0 4px' }}>
            What did you choose to do today?
          </p>
          <p style={{ margin: 0 }}>{entry.chosenToday || '—'}</p>
        </div>

        <div>
          <p className="muted" style={{ fontWeight: 600, color: 'var(--navy)', margin: '0 0 4px' }}>
            Were you satisfied with your choices?
          </p>
          {entry.satisfaction != null ? (
            <span className="rating-badge" style={{ background: ratingColor(entry.satisfaction) }}>
              {entry.satisfaction}
            </span>
          ) : (
            <p style={{ margin: 0 }}>&mdash;</p>
          )}
        </div>

        <div>
          <p className="muted" style={{ fontWeight: 600, color: 'var(--navy)', margin: '0 0 4px' }}>
            What am I choosing to do tomorrow?
          </p>
          <p style={{ margin: 0 }}>{entry.chosenTomorrow || '—'}</p>
        </div>
      </div>
    </div>
  )
}
