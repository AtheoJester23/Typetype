import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import NonExistent from './components/NonExistent'
import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import store from './state/store'
import LoginPage from './pages/login'
import CustomText from './pages/CustomText'
import ProtectedRoute from './components/ProtectedRoute'
import CheckJWT from './components/CheckJWT'

function App() {
  return (
    <Provider store={store}>  
      <ThemeProvider>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={
              <CheckJWT>
                <Home/>
              </CheckJWT>
              }/>
            <Route path='/Login' element={<LoginPage/>}/>
            <Route path='/Custom' element={
              <ProtectedRoute>
                <CustomText/>
              </ProtectedRoute>
              }/>
            <Route path='*' element={<NonExistent/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
