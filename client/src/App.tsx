import React from 'react'
    import './App.css'
    import ClientPage from './components/ClientPage'
    import ClientOnActivePage from './components/ClientOnActivePage'
    import { BrowserRouter, Route, Routes } from 'react-router-dom'

    function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ClientPage />} />
            <Route path="/ClientOnActivePage" element={<ClientOnActivePage />} />
          </Routes>
        </BrowserRouter>
      )
    }

    export default App
