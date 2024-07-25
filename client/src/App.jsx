
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Webcam from 'react-webcam'
import CaptureImg from './components/CaptureImg'

function App() {
 

  return (
    <>
   <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/capture' element={<CaptureImg/>} />

      
    </Routes>
   
    </>
  )
}

export default App
