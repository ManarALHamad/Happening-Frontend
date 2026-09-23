import Nav from './components/Nav'
import './App.css'
import { Routes, Route, Navigate } from "react-router"
import { useState } from "react"
import Home from './pages/Home'
import SignUpForm from './pages/SignUpForm'
import SignInForm from './pages/SignInForm'
import FounderDashboard from './pages/Founder/FounderDashboard'
import FounderProfile from './pages/Founder/FounderProfile'
import EditFounderProfile from './pages/Founder/EditFounderProfile'
import UserDashboard from './pages/User/UserDashboard'
import StartUp from './pages/Founder/StartUp'
import ViewStartUp from './pages/Founder/ViewStartUp'
import EditStartUp from './pages/Founder/EditStartUp'

const getUserFromToken = () => {

  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}


const App = () => {

  
  const [user, setUser] = useState(getUserFromToken())

  return (


<main>

<Nav user={user} setUser={setUser} />
    <Routes>
      <Route path="/" element={<Home />}/>
        <Route path='/auth/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/auth/sign-in' element={<SignInForm setUser={setUser} />} />
        <Route path='/founder/dashboard'  element={ user?.user_type === "Founder" ? <FounderDashboard /> : <Navigate to="/" /> } />
        <Route path="/founder/profile"  element={ user?.user_type === "Founder"  ? <FounderProfile />  : <Navigate to="/" />} />
        <Route path="/founder/profile/edit"  element={user?.user_type === "Founder" ? <EditFounderProfile /> : <Navigate to="/" />}  />
        <Route path="/founder/Startup" element={<StartUp />}/>
        <Route path="/founder/startups/:startupId" element ={user?.user_type === "Founder"  ? <ViewStartUp /> : <Navigate to="/" /> }  />
        <Route path="/founder/startups/:startupId/edit" element ={user?.user_type === "Founder" ? <EditStartUp />  : <Navigate to="/" />} />
        <Route path='/user/dashboard' element={user?.user_type === "User" ? <UserDashboard />: <Navigate to="/" />  }/>
      
     
    </Routes>


    </main>
  
  
  
  )



}

export default App
