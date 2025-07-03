// ----------------------------------
// Imports                          
// ----------------------------------
import { createRoot } from 'react-dom/client'
// ----------------------------------
// Router                           
// ----------------------------------
import { BrowserRouter } from 'react-router-dom'

// ----------------------------------
// Components                       
// ----------------------------------
import App from './App.jsx'

// ----------------------------------
// Styles                           
// ----------------------------------
import './index.css'

// ----------------------------------
// Create Root                     
// ----------------------------------
createRoot(document.getElementById('root')).render(
  <BrowserRouter>

        {/* App */}
        <App />

  </BrowserRouter>,
)