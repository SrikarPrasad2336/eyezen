import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/nunito'
import '@fontsource-variable/noto-sans-devanagari'
import '@fontsource-variable/noto-sans-telugu'
import './styles/tokens.css'
import './styles/global.css'
import './styles/animations.css'
import App from './App.tsx'
import { initPwa } from './store/pwaStore'

initPwa()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)