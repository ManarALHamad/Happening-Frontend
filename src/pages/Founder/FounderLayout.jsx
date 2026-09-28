import {Link, Outlet} from "react-router"
import "./FounderLayout.css"


const FounderLayout = () => {

    return (
        <div className="founder-layout">

            <aside className="founder-sidebar">

                <h2>Happening.</h2>

                <nav>

                    <Link to="/founder/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/founder/Startup">
                        My Startups
                    </Link>

                    <Link to="/founder/applications">
                        Applications
                    </Link>

                    <Link to="/founder/team">
                        Team
                    </Link>

                    <Link to="/founder/profile">
                        My Profile
                    </Link>

                </nav>

            </aside>


            <div className="founder-page">

                <Outlet />

            </div>

        </div>

     





    )





}

export default FounderLayout