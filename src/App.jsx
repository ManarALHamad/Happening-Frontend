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
import CreateRole from './pages/Founder/CreateRole'
import FounderLayout from './pages/Founder/FounderLayout'



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
        <Route path="/founder" element={user?.user_type === "Founder" ? <FounderLayout />  : <Navigate to="/" />} />
        <Route path='dashboard'  element={ <FounderDashboard user={user} />   } />
        <Route path="profile"  element={ <FounderProfile user={user} /> } />
        <Route path="/founder/profile/edit"  element={user?.user_type === "Founder" ? <EditFounderProfile /> : <Navigate to="/" />}  />
        <Route path="Startup" element={ <StartUp user={user} /> } />
        <Route path="startups/:startupId" element ={user?.user_type === "Founder"  ? <ViewStartUp /> : <Navigate to="/" /> }  />
        <Route path="startups/:startupId/edit" element ={user?.user_type === "Founder" ? <EditStartUp />  : <Navigate to="/" />} />
        <Route path="startups/:startupId/roles/new" element={user?.user_type === "Founder" ? <CreateRole />  : <Navigate to="/" /> } />
        <Route path='/user/dashboard' element={user?.user_type === "User" ? <UserDashboard />: <Navigate to="/" />  }/>
      
     
    </Routes>


    </main>
  
  
  
  )



}

export default App
