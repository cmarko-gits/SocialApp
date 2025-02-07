import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import React from 'react'
import { store, StoreContext } from './app/store/store.ts'
import { router } from './app/router/Router.tsx'
import { RouterProvider } from 'react-router'



createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
)
