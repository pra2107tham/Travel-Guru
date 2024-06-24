import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MapsContextProvider } from './context/MapsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MapsContextProvider>
        <App />
    </MapsContextProvider>
  </React.StrictMode>,
)
