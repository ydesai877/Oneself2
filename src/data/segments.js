// The fourteen life segments a user rates each week.
// Each segment has a stable id (used as a storage key), an emoji, and a label.
export const SEGMENTS = [
  { id: 'physical-health', emoji: '🥗', label: 'Physical Health, Nutrition & Body' },
  { id: 'mental-emotional', emoji: '🧘', label: 'Mental & Emotional Wellness' },
  { id: 'style-appearance', emoji: '🤵‍♂️', label: 'Style, Appearance & Self-Image' },
  { id: 'career-education', emoji: '💼', label: 'Career & Education' },
  { id: 'wealth-financial', emoji: '🏦', label: 'Wealth & Financial Stability' },
  { id: 'family-relationships', emoji: '👨‍👩‍👧‍👧', label: 'Family Goals & Relationships' },
  { id: 'friendship-circle', emoji: '🧑‍🤝‍🧑', label: 'Friendship & Inner Circle' },
  { id: 'living-space', emoji: '🏡', label: 'Living Space & Environment' },
  { id: 'passions', emoji: '❤️‍🔥', label: 'Pursuing Passions' },
  { id: 'adventure-play', emoji: '✈️', label: 'Adventure, Play & Leisure' },
  { id: 'community-giving', emoji: '🤝', label: 'Community, Contribution & Giving Back' },
  { id: 'purpose-meaning', emoji: '🌌', label: 'Purpose, Philosophy & Meaning' },
  { id: 'solitude-rest', emoji: '⏲︎', label: 'Solitude, Rest & Self-Care' },
  { id: 'goals', emoji: '🎯', label: 'Setting & Meeting Goals' },
]

export function segmentById(id) {
  return SEGMENTS.find((s) => s.id === id)
}
