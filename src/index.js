import { CookiesProvider } from 'react-cookie'
import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root')
)
