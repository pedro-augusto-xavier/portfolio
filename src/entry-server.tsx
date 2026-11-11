import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import type { Lang } from './i18n'

// Usado só no build: gera o HTML da página de cada idioma, para o texto
// aparecer antes de o JavaScript carregar.
export function render(lang: Lang) {
  return renderToString(
    <StrictMode>
      <App initialLang={lang} />
    </StrictMode>,
  )
}
