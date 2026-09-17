export default function ProgressBar({ current, total }) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100)
  return (
    <div className="progress-track" aria-hidden="true">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
