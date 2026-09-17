// Maps a 1-10 rating to a color on a red -> orange -> green scale.
export function ratingColor(value) {
  const stops = [
    [0.0, [177, 84, 60]], // bad
    [0.5, [217, 123, 63]], // mid
    [1.0, [79, 122, 92]], // good
  ]
  const t = Math.min(1, Math.max(0, (value - 1) / 9))
  let lo = stops[0]
  let hi = stops[stops.length - 1]
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i][0] && t <= stops[i + 1][0]) {
      lo = stops[i]
      hi = stops[i + 1]
      break
    }
  }
  const span = hi[0] - lo[0] || 1
  const localT = (t - lo[0]) / span
  const rgb = lo[1].map((c, i) => Math.round(c + (hi[1][i] - c) * localT))
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}
