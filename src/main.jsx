import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './layouts/Main'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Main></Main>
    </RouterProvider>
  </React.StrictMode>,
)
