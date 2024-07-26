
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import CaptureImg from './components/CaptureImg'
import axios from 'axios'
import Results from './pages/Results'
import {Toaster} from 'react-hot-toast'
axios.defaults.baseURL = 'https://solar-estimation-server.vercel.app'
axios.defaults.withCredentials = true
function App() {
 

  return (
    <>
   <Navbar/>
   <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/capture' element={<CaptureImg/>} />
      <Route path='/result' element={<Results/>} />

      
    </Routes>
   
    </>
  )
}

export default App
