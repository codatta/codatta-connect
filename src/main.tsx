import React from'react'
import ReactDOM from 'react-dom/client'
import AppLayout from './layout/app-layout'
import LoginView from './views/login-view'
import '../lib/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppLayout>
    <LoginView></LoginView>
  </AppLayout>
)