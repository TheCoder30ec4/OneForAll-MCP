import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/landing'
import About from './Pages/About'
import Features from './Pages/Features'
import Pricing from './Pages/Pricing'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Tools from './Pages/Tools'
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
