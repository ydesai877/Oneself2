# Weekly Check

A check-in web app with two rhythms: a nightly daily check-in, and a weekly
check-in. Each week you rate fourteen areas of your life from 1 (terrible) to
10 (terrific), then walk through a short reflection for each one: what went
well, why you rated it that way, and what's next. A closing section wraps up
the week.

## Daily check-in

Each night, three prompts: what did you choose to do today, were you
satisfied with your choices (1-10), and what are you choosing to do
tomorrow. It lives on the home screen as its own card, separate from the
weekly flow, and keeps its own history.

This is a plain static site with no backend, so it can't send you a
notification or a text at night on its own — there's nothing running when
the site is closed. The prompt is there whenever you open the site; if you
want an actual nightly reminder, the simplest options are a phone alarm/
reminder pointing at the site's URL, or (bigger lift) turning this into an
installable PWA with a service worker and push notifications, which would
need its own setup.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

To build for production:

```bash
npm run build
```

The output lands in `dist/`.

## Publishing to GitHub Pages

This uses the same `gh-pages`-branch approach as the other GitHub Pages
projects (no GitHub Actions workflow involved):

```bash
npm run deploy
```

This runs `npm run build` first, then pushes the contents of `dist/` to a
`gh-pages` branch on the repo (creating it if it doesn't exist).

One-time setup on GitHub, after the first `npm run deploy`:

1. Repo → Settings → Pages.
2. Under "Build and deployment," set **Source** to **Deploy from a branch**.
3. Set **Branch** to `gh-pages`, folder `/ (root)`, and save.

The site will be live at `https://ydesai877.github.io/weekly-check/`. Run
`npm run deploy` again any time you want to push a new version — it's the
whole release process.

If you ever rename the repo, update two places to match the exact new name
(case included): `base` in `vite.config.js` and `homepage` in
`package.json`. A mismatch there is what causes a blank white page.

## How it's organized

- `src/data/segments.js` — the fourteen life areas rated each week.
- `src/data/closingQuestions.js` — the closing questions asked after all
  reflections are done, grouped into pages (`CLOSING_PAGES`). Each question
  has a `type` (`text`, `yesno`, `choice`, or `list`) that controls how it's
  rendered and whether it's required before moving to the next page. Add,
  remove, or reorder pages/questions here — `ClosingSection.jsx` and
  `SessionDetail.jsx` both read this array, so nothing else needs to
  change. A further page was mentioned as still to come; append it to the
  array when you have the content.
- `src/lib/storage.js` — reads and writes weekly check-in sessions to the
  browser's `localStorage`. No backend yet; this is where a real API/
  database layer would plug in later.
- `src/lib/dailyStorage.js` — same idea, for daily entries. Separate
  storage key and separate data shape from the weekly sessions.
- `src/components/DailyCheckin.jsx` — the nightly three-question flow.
- `src/components/DailyDetail.jsx` — read-only view of a past daily entry.
- `src/components/Home.jsx` — landing screen: start a new check-in, resume
  one in progress, or browse past ones.
- `src/components/RankingScreen.jsx` — the 1–10 rating screen for all
  fourteen areas.
- `src/components/ReflectionFlow.jsx` — walks through one segment at a time
  (lowest-rated first) with the three reflection prompts.
- `src/components/ClosingSection.jsx` — the end-of-week closing questions,
  paginated per `CLOSING_PAGES`, one page at a time with its own Back/Next.
- `src/components/SessionDetail.jsx` — read-only view of a completed (or
  in-progress) check-in.

## Data model

Each weekly check-in is a "session" object:

```js
{
  id, weekStart, status, // 'rating' | 'reflecting' | 'closing' | 'complete'
  ratings: { [segmentId]: 1-10 },
  reflections: { [segmentId]: { wentWell, whyRating, whatsNext } },
  reflectionOrder: [segmentId, ...], // lowest-rated segment first
  currentReflectionIndex,
  closingAnswers: { [questionId]: string | string[] }, // string[] for 'list' questions
  createdAt, updatedAt, completedAt,
}
```

Each daily entry is its own, simpler object, keyed by calendar date:

```js
{
  id, date, // 'YYYY-MM-DD', local timezone — one entry per day
  chosenToday, satisfaction, // 1-10 or null until answered
  chosenTomorrow,
  createdAt, updatedAt, completedAt,
}
```

`weekStart` is the Sunday that starts the check-in's week (weeks run Sunday
through Saturday); `weekEnd(weekStart)` in `src/lib/storage.js` gives the
matching Saturday.

## Notes for next steps

- Reflection order is lowest-rated segment first, on the idea that the areas
  needing the most attention come up while focus is freshest. Easy to change
  in `buildReflectionOrder` in `src/lib/storage.js` if you'd rather keep the
  original segment order, or randomize it.
- Everything persists to `localStorage` only, scoped to one browser. Swap
  `src/lib/storage.js` for real API calls once there's a backend and an
  account system; the rest of the app only calls the functions this file
  exports, so the swap shouldn't touch the components.
- Every `text` closing question is optional; `yesno`, `choice`, and `list`
  (which enforces its minimum count) are required before continuing to the
  next page. Change `isPageComplete` in `ClosingSection.jsx` if you'd rather
  require text answers too.
