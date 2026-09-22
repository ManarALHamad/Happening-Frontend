import { useEffect, useState } from "react"
import { getProfile } from "../../services/profile"
import { Link } from "react-router"
import "./FounderProfile.css"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL


const FounderProfile = () => {

    const [profile, setProfile] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {

    const fetchProfile = async () => {

    try {

        const profileData = await getProfile()

        setProfile(profileData)

    } catch (err) {

      setMessage(err.message)
       }
        }

        fetchProfile()

    }, [])

    if (message) {

        return <p>
            {message}
        </p>
    }

    if (!profile) {
        return <p>Loading profile...</p>
    }

    return (
        <section className="founder-profile">

            <header>
                <h1>My Profile</h1>
            </header>
        <div className="profile-card">

          <div className="profile-header">

  {profile.profile_image ? (
    <img
        src={`${BASE_URL}${profile.profile_image}`}
        alt={`${profile.user.username}'s profile`}
        className="profile-image"
    />
) : (
    <div className="profile-image-placeholder">
        No Profile Image
    </div>
)}

    <h2>{profile.user.username}</h2>

    <p>{profile.user_type}</p>

    <p>{profile.location}</p>

</div>
          <div className="profile-info">

                    <div>
                        <h3>Email</h3>
                        <p>{profile.user.email}</p>
                    </div>
         <div>

            {/* <div>

                <h3>Role</h3>

                 <p> {profile.role || "No role added yet."}</p>

            </div> */}
          <h3>Bio</h3>

           <p> {profile.bio || "No bio added yet."}</p>
                           
                        
          </div>

          <div>
          <h3>Experience Level</h3>
            <p> {profile.experience_level || "Not added yet."} </p>
                           
                     
        </div>
        <div>
         <h3>Skills</h3>
            <p>{profile.skills || "No skills added yet."}</p>
                                
        </div>


         <div>
          <h3>Links</h3>

            {profile.linkedin_url && (
             <a href={profile.linkedin_url} target="_blank" rel="noreferrer">
                 LinkedIn   </a>  )}

            {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer">  GitHub </a> 
            )}

              {profile.portfolio_url && (
              <a href={profile.portfolio_url} target="_blank" rel="noreferrer" > Portfolio </a>
          )}

                    </div>

                </div>

            </div>
          <div className="profile-actions">

    <Link to="/founder/profile/edit">
        Edit Profile
    </Link>

</div>
            

        </section>


    )

}

export default FounderProfile