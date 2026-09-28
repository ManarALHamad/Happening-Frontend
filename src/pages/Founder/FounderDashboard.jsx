import { useEffect, useState } from "react"
import { Link } from "react-router"
import * as startupService from "../../services/startup"
import "./FounderDashboard.css"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const FounderDashboard = ({ user }) => {

    const [startups, setStartups] = useState([])
    const [message, setMessage] = useState("")


    useEffect(() => {

        const fetchStartups = async () => {

            try {

                const data = await startupService.index()

                const founderStartups = data.filter(
                    (startup) =>
                        String(startup.founder?._id) === String(user?._id)
                )
                console.log("FOUNDER STARTUPS:", founderStartups)


                setStartups(founderStartups)

            } catch (error) {

                setMessage(error.message)
            }
        }

        fetchStartups()

    }, [user])


    const totalRoles = startups.reduce(
        (total, startup) => total + (startup.roles?.length || 0),
        0
    )

    const totalMembers = startups.reduce(
        (total, startup) => total + (startup.team_members?.length || 0),
        0
    )


    return (

        <main className="founder-dashboard">

            


            {/* DASHBOARD CONTENT */}

            <section className="dashboard-content">

                <header className="dashboard-header">

                    <div>
                        <h1>
                            Welcome, {user?.username}
                        </h1>

                        <p>
                            Manage your startups, roles, applications and team.
                        </p>
                    </div>

                    <Link
                        to="/founder/Startup"
                        className="create-startup-button"
                    >
                        + Create Startup
                    </Link>

                </header>


                {message && <p>{message}</p>}


                {/* STATS */}

                <div className="dashboard-stats">

                    <div className="stat-card">
                        <h3>Startups</h3>
                        <p>{startups.length}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Roles</h3>
                        <p>{totalRoles}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Team Members</h3>
                        <p>{totalMembers}</p>
                    </div>

                </div>


                {/* STARTUPS */}

                <section className="dashboard-section">

                    <div className="section-header">

                        <h2>Your Startups</h2>

                        <Link to="/founder/Startup">
                            View All
                        </Link>

                    </div>


                    {startups.length === 0 ? (

                        <div className="empty-dashboard">

                            <p>
                                You haven't created a startup yet.
                            </p>

                            <Link to="/founder/Startup">
                                Create your first startup
                            </Link>

                        </div>

                    ) : (

                        <div className="dashboard-startups">

                            {startups.map((startup) => (

                                <Link
                                    key={startup._id}
                                    to={`/founder/startups/${startup._id}`}
                                    className="dashboard-startup-card"
                                >

                                    {startup.logo ? (

                                        <img
                                            src={`${BASE_URL}${startup.logo}`}
                                            alt={startup.name}
                                        />

                                    ) : (

                                        <div className="dashboard-logo-placeholder">
                                            {startup.name.charAt(0)}
                                        </div>

                                    )}


                                    <div>

                                        <h3>{startup.name}</h3>

                                        <p>
                                            {startup.industry} • {startup.stage}
                                        </p>

                                        <span>
                                            {startup.roles?.length || 0} roles
                                            {" • "}
                                            {startup.team_members?.length || 0} members
                                        </span>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </section>


                {/* QUICK ACTIONS */}

                <section className="dashboard-section">

                    <h2>Quick Actions</h2>

                    <div className="quick-actions">

                        <Link to="/founder/Startup">
                            + Create Startup
                        </Link>

                        <Link to="/founder/applications">
                            View Applications
                        </Link>

                        <Link to="/founder/profile">
                            Edit Profile
                        </Link>

                    </div>

                </section>

            </section>

        </main>
    )
}

export default FounderDashboard