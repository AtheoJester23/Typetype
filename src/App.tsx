import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Home from './components/Home'
import NonExistent from './components/NonExistent'
import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import store from './state/store'

function App() {
  return (
    <Provider store={store}>  
      <ThemeProvider>
        <Navbar/>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<NonExistent/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
