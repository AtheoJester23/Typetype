import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import NonExistent from './components/NonExistent'
import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import store from './state/store'
import LoginPage from './pages/login'
import CustomOptions from './pages/CustomOptions'
import ProtectedRoute from './components/ProtectedRoute'
import CheckJWT from './components/CheckJWT'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import CustomText from './pages/CustomText'
import ViewAll from './pages/ViewAll'
import CustomTyping from './pages/CustomTyping'

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
                <CustomOptions/>
              </ProtectedRoute>
              }/>
            <Route path='/Custom/Create' element={
              <ProtectedRoute>
                <CustomText/>
              </ProtectedRoute>
            }/>
            <Route path='/Custom/ViewAll' element={
              <ProtectedRoute>
                <ViewAll/>
              </ProtectedRoute>
            }/>
            <Route path='/Custom/:id' element={
              <ProtectedRoute>
                <CustomTyping/>
              </ProtectedRoute>
            }/>
            <Route path='/Signup' element={<SignUp/>}/>
            <Route path='/forgotPassword' element={<ForgotPassword/>}/>
            <Route path='*' element={<NonExistent/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
