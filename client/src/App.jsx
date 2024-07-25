
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Webcam from 'react-webcam'
import CaptureImg from './components/CaptureImg'
import axios from 'axios'
import Results from './pages/Results'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
function App() {
 

  return (
    <>
   <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/capture' element={<CaptureImg/>} />
      <Route path='/result' element={<Results/>} />

      
    </Routes>
   
    </>
  )
}

export default App
