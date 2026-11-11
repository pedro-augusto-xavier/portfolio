import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { langFromPath } from './i18n'
import './styles.css'

console.log(
  '%cOi, dev! 👋%c\nCurioso com o código? Ele está em https://github.com/pedro-augusto-xavier',
  'font-size:1.4em;font-weight:bold;color:#34d399',
  'color:inherit',
)

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App initialLang={langFromPath(window.location.pathname)} />
  </StrictMode>
)

// No site publicado o HTML já vem pronto do build; em desenvolvimento a página nasce vazia.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
