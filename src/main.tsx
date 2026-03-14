import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@app/App.tsx'
import { initGlobalErrorHandlers } from '@shared/libs/errorReporting'
import '@app/styles/index.css'

initGlobalErrorHandlers()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
