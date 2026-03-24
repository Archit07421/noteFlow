import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Preview from './components/Preview.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Notes from './pages/Notes.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function Landing() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      
      <main>
        <Hero />
        <Features />
        <Preview />
        <CTA />
      </main>
     
    </div>
  )
}

function App(){
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Landing />} />

          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App