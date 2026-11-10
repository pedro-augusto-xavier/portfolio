import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

console.log(
  '%cOi, dev! 👋%c\nCurioso com o código? Ele está em https://github.com/pedro-augusto-xavier',
  'font-size:1.4em;font-weight:bold;color:#a259ff',
  'color:inherit',
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
