import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HERO_IMAGES } from './heroImages'

// Two routes: / is the clone, /ai is the same page with our AI-generated hero artwork
const isAi = window.location.pathname.replace(/\/+$/, '') === '/ai'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App heroImages={isAi ? HERO_IMAGES.ai : HERO_IMAGES.original} ai={isAi} />
  </StrictMode>,
)
