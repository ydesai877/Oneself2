// The closing section, walked through one page at a time after every
// segment has been reflected on. Each page groups a few related questions;
// `heading` is an optional section label shown above the questions on that
// page (not itself a field to answer).
//
// Question `type` determines how it's rendered and validated in
// ClosingSection.jsx:
//   - 'text'   : free-form answer (textarea). Optional — not required to
//                continue.
//   - 'yesno'  : a Yes / No choice. Required to continue.
//   - 'choice' : a pick-one from `options`. Required to continue.
//   - 'list'   : a repeatable list of short answers. `minItems` sets how
//                many non-empty entries are required to continue.
export const CLOSING_PAGES = [
  {
    id: 'worked-vs-not',
    heading: null,
    questions: [
      { id: 'what-worked', type: 'text', prompt: 'What worked?' },
      { id: 'what-didnt-work', type: 'text', prompt: "What didn't?" },
    ],
  },
  {
    id: 'showing-up',
    heading: null,
    questions: [
      {
        id: 'showed-up-for-others',
        type: 'text',
        long: true,
        prompt: 'How did I show up for others? Be detailed.',
      },
      {
        id: 'more-reliable',
        type: 'yesno',
        prompt: 'Am I becoming more reliable than I was last week?',
      },
    ],
  },
  {
    id: 'new-experience',
    heading: 'Weekly new experience check-in',
    questions: [
      { id: 'creative-thing', type: 'text', prompt: 'What creative thing did I do this week?' },
    ],
  },
  {
    id: 'focus-check',
    heading: null,
    questions: [
      {
        id: 'fears-vs-vision',
        type: 'choice',
        prompt:
          'Am I more focused on my fears and limitations, or on the person and life I want to create?',
        options: ['My fears and limitations', 'The person and life I want to create'],
      },
    ],
  },
  {
    id: 'improve-and-avoid',
    heading: null,
    questions: [
      { id: 'improve-next-week', type: 'text', prompt: 'One thing to improve next week?' },
      { id: 'what-avoided', type: 'text', prompt: "What did I avoid that I shouldn't have?" },
      { id: 'why-avoiding', type: 'text', prompt: 'Why am I avoiding?' },
    ],
  },
  {
    id: 'presence',
    heading: null,
    questions: [
      { id: 'felt-most-present', type: 'text', prompt: 'This week I felt most present when:' },
      { id: 'lost-myself', type: 'text', prompt: 'This week I lost myself when:' },
    ],
  },
  {
    id: 'gratitude',
    heading: null,
    questions: [
      {
        id: 'grateful-for',
        type: 'list',
        prompt: 'What am I grateful for this week?',
        minItems: 3,
      },
      { id: 'what-challenged-me', type: 'text', prompt: 'What challenged me?' },
      { id: 'respected-myself', type: 'text', prompt: 'How did I respect myself, this week?' },
      { id: 'one-story', type: 'text', long: true, prompt: 'One story of the week:' },
    ],
  },
  {
    id: 'wins',
    heading: 'Wins of the week!!',
    questions: [
      { id: 'week-summary', type: 'text', long: true, prompt: 'Summarize the week?' },
    ],
  },
  // A further page was mentioned as "coming up soon" with no content yet.
  // Add it here as a new { id, heading, questions } entry once you have it —
  // ClosingSection.jsx paginates over this array automatically, nothing
  // else needs to change.
]

export const CLOSING_QUESTIONS_ARE_PLACEHOLDER = false
