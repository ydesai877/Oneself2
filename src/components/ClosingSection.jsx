import { useState } from 'react'
import { CLOSING_PAGES } from '../data/closingQuestions'
import ProgressBar from './ProgressBar'

function isPageComplete(page, answers) {
  return page.questions.every((q) => {
    const value = answers[q.id]
    if (q.type === 'yesno' || q.type === 'choice') return Boolean(value)
    if (q.type === 'list') {
      const filled = (value ?? []).filter((v) => v.trim().length > 0)
      return filled.length >= (q.minItems ?? 1)
    }
    return true // free text is optional
  })
}

function TextQuestion({ question, value, onChange }) {
  return (
    <div className="stack" style={{ gap: 6 }}>
      <label className="muted" style={{ fontWeight: 600, color: 'var(--navy)' }}>
        {question.prompt}
      </label>
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer..."
        style={question.long ? { minHeight: 140 } : undefined}
      />
    </div>
  )
}

function YesNoQuestion({ question, value, onChange }) {
  return (
    <div className="stack" style={{ gap: 6 }}>
      <label className="muted" style={{ fontWeight: 600, color: 'var(--navy)' }}>
        {question.prompt}
      </label>
      <div className="row-actions" style={{ justifyContent: 'flex-start', gap: 10 }}>
        {['Yes', 'No'].map((option) => (
          <button
            key={option}
            type="button"
            className={value === option ? 'primary-btn' : 'secondary-btn'}
            style={{ flex: 'none', padding: '10px 24px' }}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function ChoiceQuestion({ question, value, onChange }) {
  return (
    <div className="stack" style={{ gap: 6 }}>
      <label className="muted" style={{ fontWeight: 600, color: 'var(--navy)' }}>
        {question.prompt}
      </label>
      <div className="stack" style={{ gap: 8 }}>
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className={value === option ? 'primary-btn' : 'secondary-btn'}
            style={{ textAlign: 'left' }}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function ListQuestion({ question, value, onChange }) {
  const items = value && value.length > 0 ? value : Array(question.minItems ?? 1).fill('')

  function updateAt(index, text) {
    const next = [...items]
    next[index] = text
    onChange(next)
  }

  function addItem() {
    onChange([...items, ''])
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index))
  }

  const filledCount = items.filter((v) => v.trim().length > 0).length

  return (
    <div className="stack" style={{ gap: 6 }}>
      <label className="muted" style={{ fontWeight: 600, color: 'var(--navy)' }}>
        {question.prompt}
        {question.minItems ? ` (${question.minItems} minimum)` : ''}
      </label>
      <div className="stack" style={{ gap: 8 }}>
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              value={item}
              onChange={(e) => updateAt(index, e.target.value)}
              placeholder={`${index + 1}.`}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid var(--line)',
                background: 'var(--cream)',
                color: 'var(--navy)',
                fontSize: '0.95rem',
              }}
            />
            {items.length > (question.minItems ?? 1) && (
              <button
                type="button"
                className="link-btn"
                onClick={() => removeItem(index)}
                aria-label="Remove"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="row-actions" style={{ justifyContent: 'space-between' }}>
        <button type="button" className="link-btn" onClick={addItem} style={{ padding: '6px 0' }}>
          + Add another
        </button>
        <span className="muted">
          {filledCount}/{question.minItems ?? 1} filled
        </span>
      </div>
    </div>
  )
}

export default function ClosingSection({ closingAnswers, onSave, onFinish, onBack }) {
  const [pageIndex, setPageIndex] = useState(0)
  const [answers, setAnswers] = useState(closingAnswers ?? {})

  const page = CLOSING_PAGES[pageIndex]
  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex === CLOSING_PAGES.length - 1
  const canContinue = isPageComplete(page, answers)

  function updateAnswer(questionId, value) {
    const next = { ...answers, [questionId]: value }
    setAnswers(next)
    onSave(next)
  }

  function handleNext() {
    if (isLastPage) {
      onFinish()
    } else {
      setPageIndex((i) => i + 1)
    }
  }

  function handleBack() {
    if (isFirstPage) {
      onBack()
    } else {
      setPageIndex((i) => i - 1)
    }
  }

  return (
    <div className="stack">
      <ProgressBar current={pageIndex} total={CLOSING_PAGES.length} />

      <div>
        <h2>Closing thoughts</h2>
        <p className="muted">
          Page {pageIndex + 1} of {CLOSING_PAGES.length}
        </p>
      </div>

      <div className="card stack">
        {page.heading && <h3 style={{ fontSize: '1.05rem' }}>{page.heading}</h3>}
        {page.questions.map((question) => {
          const value = answers[question.id]
          const onChange = (v) => updateAnswer(question.id, v)
          if (question.type === 'yesno') {
            return <YesNoQuestion key={question.id} question={question} value={value} onChange={onChange} />
          }
          if (question.type === 'choice') {
            return <ChoiceQuestion key={question.id} question={question} value={value} onChange={onChange} />
          }
          if (question.type === 'list') {
            return <ListQuestion key={question.id} question={question} value={value} onChange={onChange} />
          }
          return <TextQuestion key={question.id} question={question} value={value} onChange={onChange} />
        })}
      </div>

      <div className="row-actions">
        <button className="secondary-btn" onClick={handleBack}>
          Back
        </button>
        <button className="primary-btn" disabled={!canContinue} onClick={handleNext}>
          {isLastPage ? 'Finish check-in' : 'Next'}
        </button>
      </div>
    </div>
  )
}
