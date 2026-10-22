import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import favicon from './assets/icons/favicon.svg'

// Favicon comes from src/assets/icons (not /public)
let iconLink = document.querySelector("link[rel~='icon']")
if (!iconLink) {
  iconLink = document.createElement('link')
  iconLink.rel = 'icon'
  document.head.appendChild(iconLink)
}
iconLink.type = 'image/svg+xml'
iconLink.href = favicon

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
