
//this dashboard will contain profile creation CRUD
// My startup
// startup CRUD
//Roles CRUD
//Applicants
// Accept and reject
//team members

import { Link } from "react-router"

const FounderDashboard = () => {
  return (
    <main>
      <h1>Founder Dashboard</h1>
      <p>Manage your startups, roles, applications and team.</p>
      <Link to="/founder/profile">

      My Profile
      
      </Link>
    </main>
  )
}

export default FounderDashboard