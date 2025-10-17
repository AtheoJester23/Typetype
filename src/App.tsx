import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Home from './components/Home'
import NonExistent from './components/NonExistent'
import Navbar from './components/Navbar'

function App() {
  return (
    <ThemeProvider>
      <Navbar/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<NonExistent/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
