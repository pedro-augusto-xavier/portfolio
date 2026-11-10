import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Icon } from './Icon'
import type { Dict } from './i18n'

type Message = { from: 'bot' | 'user'; text: string; action?: string }

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

// Uma palavra-chave casa quando alguma palavra da pergunta começa com ela
// ("projeto" casa "projetos", mas "site" não casa "website"). Palavras-chave
// com espaço são procuradas na frase inteira.
function matches(keyword: string, text: string, words: string[]) {
  return keyword.includes(' ') ? text.includes(keyword) : words.some((word) => word.startsWith(keyword))
}

function answer(question: string, t: Dict['bot']): Message {
  const text = normalize(question)
  const words = text.split(/[^a-z0-9]+/).filter(Boolean)
  let best: Dict['bot']['topics'][number] | undefined
  let bestScore = 0
  for (const topic of t.topics) {
    const score = topic.keywords.filter((keyword) => matches(keyword, text, words)).length
    if (score > bestScore) {
      best = topic
      bestScore = score
    }
  }
  return best ? { from: 'bot', text: best.a, action: best.action } : { from: 'bot', text: t.fallback }
}

type Props = { t: Dict['bot']; whatsapp: string; email: string }

// Fora do componente: trocar o idioma recria o robô, e o balão não deve voltar.
let hintDismissed = false

export function Bot({ t, whatsapp, email }: Props) {
  const greeting: Message = { from: 'bot', text: t.hello }
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [draft, setDraft] = useState('')
  const [hint, setHintState] = useState(!hintDismissed)
  const input = useRef<HTMLInputElement>(null)
  const log = useRef<HTMLDivElement>(null)

  function hideHint() {
    hintDismissed = true
    setHintState(false)
  }

  // O balão é só um convite no início: some sozinho, ou assim que a pessoa rola a página.
  useEffect(() => {
    if (hintDismissed) return
    const timer = setTimeout(hideHint, 12_000)
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) hideHint()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    input.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight })
  }, [messages, open])

  function ask(question: string) {
    const text = question.trim()
    if (!text) return
    setMessages((current) => [...current, { from: 'user', text }, answer(text, t)])
    setDraft('')
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    ask(draft)
  }

  const avatar = (
    <span className="bot-avatar" aria-hidden="true">
      <Icon name="bot" />
    </span>
  )

  return (
    <div className="bot">
      {open && (
        <section className="bot-panel" aria-label={t.title}>
          <header className="bot-head">
            {avatar}
            <p>
              <strong>{t.title}</strong>
              <span>{t.subtitle}</span>
            </p>
            <button type="button" className="bot-icon" onClick={() => setMessages([greeting])} aria-label={t.reset} title={t.reset}>
              <Icon name="reset" />
            </button>
          </header>
          <div className="bot-log" ref={log} role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`bot-line bot-${message.from}`}>
                {message.from === 'bot' && avatar}
                <div className="bot-bubble">
                  <p>{message.text}</p>
                  {message.action === 'whatsapp' && (
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button">
                      {t.whatsapp}
                    </a>
                  )}
                  {message.action === 'email' && (
                    <a href={email} className="button">
                      {t.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="bot-topics">
            <p>{t.tryAsking}</p>
            <ul>
              {t.topics.slice(0, 4).map((topic) => (
                <li key={topic.q}>
                  <button type="button" onClick={() => ask(topic.q)}>
                    {topic.q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <form className="bot-form" onSubmit={submit}>
            <input
              ref={input}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              name="pergunta"
              autoComplete="off"
              maxLength={200}
            />
            <button type="submit" aria-label={t.send}>
              <Icon name="plane" />
            </button>
          </form>
        </section>
      )}
      {hint && !open && (
        <div className="bot-hint-wrap">
          <button
            type="button"
            className="bot-hint"
            onClick={() => {
              setOpen(true)
              hideHint()
            }}
          >
            <strong>{t.hintTitle}</strong>
            <span>{t.hintText}</span>
          </button>
          <button type="button" className="bot-hint-close" onClick={() => hideHint()} aria-label={t.close}>
            <Icon name="close" />
          </button>
        </div>
      )}
      <button
        type="button"
        className={`bot-toggle${open ? ' bot-toggle-open' : ''}`}
        onClick={() => {
          setOpen(!open)
          hideHint()
        }}
        aria-expanded={open}
        aria-label={open ? t.close : t.open}
      >
        <Icon name={open ? 'close' : 'bot'} />
      </button>
    </div>
  )
}
