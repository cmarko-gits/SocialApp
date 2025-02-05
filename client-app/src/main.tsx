import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import App from './app/layout/App.tsx'
import React from 'react'
import { store, StoreContext } from './app/store/store.ts'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
)
