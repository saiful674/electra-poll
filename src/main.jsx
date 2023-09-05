import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Notifications } from 'react-push-notification'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import AuthProviders from './Providers/AuthProvider'
import './index.css'
import Main from './layout/Main'
import { store } from './redux/store/Store'
import router from './routes/routes'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <AuthProviders>
      <Toaster></Toaster>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <Main></Main>
          <Notifications/>
        </RouterProvider>
      </QueryClientProvider>
    </AuthProviders>
  </Provider>

)
