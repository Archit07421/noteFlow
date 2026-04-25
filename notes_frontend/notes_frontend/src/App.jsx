import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
 
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Preview from './components/Preview.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Notes from './pages/Notes.jsx'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OAuthSuccess from './pages/OauthSuccess.jsx'
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

function AppLayout(){
  const location = useLocation();
  return(
    <>
      {location.pathname !== '/notes' && <Navbar/>}
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
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/login" element={<Login />} />

          <Route path="/resetpassword/:token" element={<ResetPassword/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />

          <Route path="/signup" element={<Signup />} />
      </Routes>
      {location.pathname !== '/notes' && <Footer/>}
    </>
  )


}

function App(){
 
  return (
    <BrowserRouter>
      <AppLayout/>
    </BrowserRouter>
  )
}

export default App