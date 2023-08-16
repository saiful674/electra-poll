import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import Main from './layout/Main'
import AuthProviders from './Providers/AuthProvider'
import { Provider } from 'react-redux'
import { store } from './redux/store/Store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProviders>
        <RouterProvider router={router}>
          <Main></Main>
        </RouterProvider>
      </AuthProviders>
    </Provider>
  </React.StrictMode>
)
