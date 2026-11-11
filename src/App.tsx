import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { Bot } from './Bot'
import { contact, projectLinks } from './config'
import { Icon, type IconName } from './Icon'
import { dictionaries, htmlLang, langFromPath, langPath, type Dict, type Lang } from './i18n'
import casaPessoas from './assets/casa-pessoas.webp'
import emporioInicio from './assets/emporio-inicio.webp'
import foto from './assets/pedro.webp'

type Theme = 'light' | 'dark'

function whatsappUrl(message: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
}

function mailUrl(subject: string) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`
}

type ExternalProps = { href: string; className?: string; label?: string; children: ReactNode; t: Dict }

function External({ href, className, label, children, t }: ExternalProps) {
  return (
    <a href={href} className={className} title={label} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only">
        {label} {t.a11y.newTab}
      </span>
    </a>
  )
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Typed({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState(phrases[0])

  useEffect(() => {
    if (reducedMotion()) return
    let index = 0
    let length = phrases[0].length
    let deleting = true
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (deleting) {
        length -= 1
        if (length === 0) {
          deleting = false
          index = (index + 1) % phrases.length
        }
      } else {
        length += 1
        if (length === phrases[index].length) deleting = true
      }
      setText(phrases[index].slice(0, length))
      const full = deleting && length === phrases[index].length
      timer = setTimeout(tick, full ? 1800 : deleting ? 35 : 70)
    }

    timer = setTimeout(tick, 1800)
    return () => clearTimeout(timer)
  }, [phrases])

  return (
    <p className="typed">
      <span className="sr-only">{phrases.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="caret" />
      </span>
    </p>
  )
}

function SectionHead({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="section-head" data-reveal>
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  )
}

function CodeCard({ lines }: { lines: Dict['about']['code'] }) {
  return (
    <div className="card code" data-reveal>
      <p className="code-file" aria-hidden="true">
        <span className="bot-dots">
          <i />
          <i />
          <i />
        </span>
        pedro.ts
      </p>
      <pre>
        <code>
          <span className="tok-key">const</span> pedro = {'{\n'}
          {lines.map((line) => (
            <span key={line.key}>
              {'  '}
              <span className="tok-prop">{line.key}</span>:{' '}
              {line.value.length === 1 ? (
                <span className="tok-str">'{line.value[0]}'</span>
              ) : (
                <>
                  [
                  {line.value.map((item, index) => (
                    <span key={item}>
                      {index > 0 && ', '}
                      <span className="tok-str">'{item}'</span>
                    </span>
                  ))}
                  ]
                </>
              )}
              {',\n'}
            </span>
          ))}
          {'}'}
        </code>
      </pre>
    </div>
  )
}

function ContactForm({ t, resume }: { t: Dict; resume: string }) {
  const [name, setName] = useState('')
  const [sender, setSender] = useState('')
  const [message, setMessage] = useState('')

  // Sem servidor: o envio abre o WhatsApp ou o programa de e-mail do visitante.
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const channel = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value')
    const text = `${t.contact.from} ${name.trim()} (${sender.trim()})\n\n${message.trim()}`
    const url =
      channel === 'email'
        ? `${mailUrl(t.emailSubject)}&body=${encodeURIComponent(text)}`
        : whatsappUrl(text)
    window.open(url, channel === 'email' ? '_self' : '_blank', 'noopener')
  }

  return (
    <form className="contact-form" onSubmit={submit} data-reveal>
      <label>
        <span>{t.contact.name}</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.contact.namePlaceholder}
          name="nome"
          autoComplete="name"
          required
          maxLength={80}
        />
      </label>
      <label>
        <span>{t.contact.emailField}</span>
        <input
          type="email"
          name="email"
          value={sender}
          onChange={(event) => setSender(event.target.value)}
          placeholder={t.contact.emailPlaceholder}
          autoComplete="email"
          required
          maxLength={120}
        />
      </label>
      <label>
        <span>{t.contact.message}</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t.contact.messagePlaceholder}
          name="mensagem"
          rows={6}
          required
          maxLength={1500}
        />
      </label>
      <button type="submit" value="whatsapp" className="button button-big">
        <Icon name="plane" />
        {t.contact.whatsapp}
      </button>
      <div className="form-extra">
        <button type="submit" value="email" className="button button-quiet">
          <Icon name="mail" />
          {t.contact.email}
        </button>
        <a href={resume} download className="button button-quiet">
          <Icon name="download" />
          {t.a11y.resume}
        </a>
      </div>
    </form>
  )
}

type Zoomed = { src: string; alt: string }

function Lightbox({ image, label, onClose }: { image: Zoomed; label: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialog.current?.showModal()
  }, [])

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={image.alt}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close()
      }}
    >
      <img src={image.src} alt={image.alt} />
      <button type="button" className="lightbox-close" onClick={() => dialog.current?.close()} aria-label={label}>
        <Icon name="close" />
      </button>
    </dialog>
  )
}

type ProjectProps = {
  t: Dict
  onZoom: (image: Zoomed) => void
  index: string
  copy: { title: string; kind: string; body: string; note?: string; alt: string }
  image: string
  stack: string[]
  repo: string
  site?: string
}

function Project({ t, onZoom, index, copy, image, stack, repo, site }: ProjectProps) {
  return (
    <article className="card project" data-reveal>
      <button
        type="button"
        className="project-image"
        onClick={() => onZoom({ src: image, alt: copy.alt })}
        aria-label={`${t.a11y.zoom}: ${copy.alt}`}
      >
        <img src={image} alt="" loading="lazy" decoding="async" />
        <span className="zoom-hint" aria-hidden="true">
          {t.a11y.zoom}
        </span>
      </button>
      <div className="project-text">
        <p className="project-index" aria-hidden="true">
          {index}
        </p>
        <h3>{copy.title}</h3>
        <p className="project-kind">{copy.kind}</p>
        <p>{copy.body}</p>
        {copy.note && <p className="note">{copy.note}</p>}
        <ul className="tags">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="project-links">
          <External href={repo} className="button button-quiet" t={t}>
            <Icon name="github" />
            {t.work.code}
          </External>
          {site && (
            <External href={site} className="button" t={t}>
              {t.work.site}
              <Icon name="out" />
            </External>
          )}
        </p>
      </div>
    </article>
  )
}

const sectionIds = ['inicio', 'sobre', 'tecnologias', 'projetos', 'servicos', 'contato']

const currentTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function watchTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export default function App({ initialLang }: { initialLang: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  // O tema vive no data-theme do <html> (aplicado pelo script do index.html).
  // O HTML do build sai com o escuro; o tema real é lido quando o React assume a página.
  const theme = useSyncExternalStore(watchTheme, currentTheme, () => 'dark' as Theme)
  const [active, setActive] = useState('inicio')
  const [nearTop, setNearTop] = useState(false)
  const [zoomed, setZoomed] = useState<Zoomed | null>(null)
  const t = dictionaries[lang]
  const other: Lang = lang === 'pt' ? 'en' : 'pt'

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang]
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    const alternate = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${htmlLang[lang]}"]`)
    if (alternate) document.querySelector('link[rel="canonical"]')?.setAttribute('href', alternate.href)
  }, [lang, t])

  useEffect(() => {
    const onPop = () => setLang(langFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            reveal.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => reveal.observe(el))

    // A seção "ativa" é a que cruza a linha do meio da tela.
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) spy.observe(el)
    })

    return () => {
      reveal.disconnect()
      spy.disconnect()
    }
    // Trocar o idioma recria parte dos elementos, que precisam ser observados de novo.
  }, [lang])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      setNearTop(event.clientY < 110)
      const card = (event.target as Element).closest<HTMLElement>('.card')
      if (!card) return
      const box = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - box.left}px`)
      card.style.setProperty('--my', `${event.clientY - box.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  function switchLang(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    window.history.pushState(null, '', langPath[other] + window.location.hash)
    setLang(other)
  }

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0b1014' : '#f4f8f6')
    try {
      localStorage.setItem('theme', next)
    } catch {
      // armazenamento bloqueado: o tema vale só para esta visita
    }
  }

  const whatsapp = whatsappUrl(t.whatsappMessage)
  const email = mailUrl(t.emailSubject)
  const sections: [string, string, IconName][] = [
    ['inicio', t.a11y.home, 'home'],
    ['sobre', t.nav.about, 'user'],
    ['tecnologias', t.nav.skills, 'code'],
    ['projetos', t.nav.work, 'work'],
    ['servicos', t.nav.services, 'wrench'],
    ['contato', t.nav.contact, 'mail'],
  ]
  const socials = (
    <ul className="pills">
      <li>
        <External href={contact.github} className="round" label="GitHub" t={t}>
          <Icon name="github" />
        </External>
      </li>
      <li>
        <External href={contact.linkedin} className="round" label="LinkedIn" t={t}>
          <Icon name="linkedin" />
        </External>
      </li>
      <li>
        <a href={email} className="round" title={t.hero.email} aria-label={t.hero.email}>
          <Icon name="mail" />
        </a>
      </li>
    </ul>
  )

  return (
    <>
      <a href="#conteudo" className="skip">
        {t.a11y.skip}
      </a>
      <div className="progress" aria-hidden="true" />

      <span className="dock-hint" aria-hidden="true" />
      <header className={`dock${nearTop ? '' : ' dock-away'}`}>
        <nav aria-label={t.a11y.nav}>
          {sections.map(([id, label, icon]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`dock-item${active === id ? ' dock-active' : ''}`}
              aria-label={label}
              aria-current={active === id ? 'true' : undefined}
              title={label}
            >
              <Icon name={icon} />
            </a>
          ))}
        </nav>
        <span className="dock-rule" aria-hidden="true" />
        <a
          href={langPath[other]}
          hrefLang={htmlLang[other]}
          lang={htmlLang[other]}
          className="dock-item dock-text"
          onClick={switchLang}
          aria-label={`${other.toUpperCase()} (${t.a11y.language}: ${other === 'en' ? 'English' : 'Português'})`}
          title={other === 'en' ? 'English' : 'Português'}
        >
          {other.toUpperCase()}
        </a>
        <button
          type="button"
          className="dock-item"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t.a11y.toLight : t.a11y.toDark}
          title={theme === 'dark' ? t.a11y.toLight : t.a11y.toDark}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </button>
        <span className="dock-rule dock-wide" aria-hidden="true" />
        <a
          href={contact.resume[lang]}
          download
          className="dock-item dock-wide"
          aria-label={t.a11y.resume}
          title={t.a11y.resume}
        >
          <Icon name="download" />
        </a>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="stars" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="greeting">{t.hero.greeting}</p>
          <h1>{t.hero.title}</h1>
          <Typed key={lang} phrases={t.hero.roles} />
          <p className="hero-lead">{t.hero.lead}</p>
          {socials}
          <div className="actions">
            <a href="#projetos" className="button">
              {t.hero.primary}
              <Icon name="down" />
            </a>
            <a href="#contato" className="button button-quiet">
              {t.hero.secondary}
            </a>
          </div>
          <a href="#sobre" className="scroll-hint" aria-label={t.nav.about}>
            <Icon name="chevron" />
          </a>
        </section>

        <section id="sobre" className="section" aria-labelledby="sobre-titulo">
          <SectionHead id="sobre-titulo" title={t.about.heading} />
          <div className="about">
            <div className="about-text">
              <img src={foto} alt={t.a11y.photo} className="about-photo" width={480} height={600} loading="lazy" decoding="async" data-reveal />
              <div className="about-prose" data-reveal>
                <p className="about-intro">
                  {t.about.intro[0]}
                  <strong>{t.about.intro[1]}</strong>
                  {t.about.intro[2]}
                </p>
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="quote">{t.about.quote}</p>
              </div>
              <CodeCard lines={t.about.code} />
            </div>
            <ul className="about-cards">
              {t.about.cards.map((card) => (
                <li key={card.title} className="card about-card" data-reveal>
                  <span className="card-icon">
                    <Icon name={card.icon} />
                  </span>
                  <div>
                    <h3>{card.title}</h3>
                    <p className="accent">{card.place}</p>
                    <p className="note">{card.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="formacao" className="section" aria-labelledby="formacao-titulo">
          <SectionHead id="formacao-titulo" title={t.education.heading} lead={t.education.lead} />
          <ol className="timeline">
            {t.education.items.map((item) => (
              <li key={item.title + item.place} className={item.done ? '' : 'timeline-current'} data-reveal>
                <p className="timeline-year">
                  {item.year}
                  <span className={`status${item.done ? '' : ' status-current'}`}>
                    {item.done ? t.education.done : t.education.current}
                  </span>
                </p>
                <h3>{item.title}</h3>
                <p className="note">{item.place}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="tecnologias" className="section" aria-labelledby="tecnologias-titulo">
          <SectionHead id="tecnologias-titulo" title={t.skills.heading} lead={t.skills.lead} />
          <ul className="grid-cards grid-cards-4">
            {t.skills.groups.map((group) => (
              <li key={group.name} className="card" data-reveal>
                <h3 className="braces">{group.name}</h3>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section id="projetos" className="section" aria-labelledby="projetos-titulo">
          <SectionHead id="projetos-titulo" title={t.work.heading} lead={t.work.lead} />
          <div className="projects">
            <Project
              t={t}
              onZoom={setZoomed}
              index="01"
              copy={t.work.emporio}
              image={emporioInicio}
              stack={['React', 'TypeScript', 'Fastify', 'PostgreSQL']}
              repo={projectLinks.emporioRepo}
              site={projectLinks.emporioSite}
            />
            <Project
              t={t}
              onZoom={setZoomed}
              index="02"
              copy={t.work.casa}
              image={casaPessoas}
              stack={['Python', 'FastAPI', 'PostgreSQL', 'React']}
              repo={projectLinks.casaRepo}
            />
          </div>
        </section>

        <section id="servicos" className="section" aria-labelledby="servicos-titulo">
          <SectionHead id="servicos-titulo" title={t.services.heading} lead={t.services.lead} />
          <ul className="grid-cards">
            {t.services.groups.map((group) => (
              <li key={group.name} className="card" data-reveal>
                <h3 className="braces">{group.name}</h3>
                <dl className="service-list">
                  {group.items.map((item) => (
                    <div key={item.name}>
                      <dt>{item.name}</dt>
                      <dd>{item.desc}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section id="contato" className="section" aria-labelledby="contato-titulo">
          <SectionHead id="contato-titulo" title={t.contact.heading} lead={t.contact.lead} />
          <ContactForm t={t} resume={contact.resume[lang]} />
          <ul className="contact-links" data-reveal>
            <li>
              <a href={email}>
                <Icon name="mail" />
                {contact.email}
              </a>
            </li>
            <li>
              <External href={contact.github} t={t}>
                <Icon name="github" />@{contact.github.split('/').pop()}
              </External>
            </li>
            <li>
              <External href={contact.linkedin} t={t}>
                <Icon name="linkedin" />
                /in/{contact.linkedin.split('/in/').pop()}
              </External>
            </li>
          </ul>
          <a href="#inicio" className="to-top">
            <span>{t.a11y.top}</span>
            <Icon name="up" />
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#inicio" className="monogram" aria-label={`PX, ${t.a11y.top}`}>
          P<span>X</span>
        </a>
        {socials}
        <p className="footer-built">
          {t.footer.built} <span aria-hidden="true">💜</span> {t.footer.legal}
        </p>
        <p className="note footer-name">{t.footer.name}</p>
      </footer>

      {zoomed && <Lightbox image={zoomed} label={t.a11y.close} onClose={() => setZoomed(null)} />}

      <Bot key={lang} t={t.bot} whatsapp={whatsapp} email={email} />
    </>
  )
}
