import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import AuthProviders from './Providers/AuthProvider'
import './index.css'
import Main from './layout/Main'
import { store } from './redux/store/Store'
import router from './routes/routes'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <Main></Main>
        </RouterProvider>
        </QueryClientProvider>
      </AuthProviders>
    </Provider>
  </React.StrictMode>
)
