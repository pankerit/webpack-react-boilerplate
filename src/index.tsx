import './index.css'
import React from 'react'
import { render } from 'react-dom'
import App from './app'

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)
// @ts-ignore
if (module.hot) module.hot.accept()
