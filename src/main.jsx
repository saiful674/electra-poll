import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import Main from './layout/Main'
import AuthProviders from './Providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <AuthProviders>
 <RouterProvider router={router}>
      <Main></Main>
    </RouterProvider>
 </AuthProviders>
  </React.StrictMode>
)
