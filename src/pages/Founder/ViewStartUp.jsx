import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import *  as startupService from "../../services/startup"
import "./ViewStartUp.css"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL


const ViewStartUp = () =>{

    const { startupId } = useParams()

    const navigate = useNavigate()
    const [startup, setStartup] = useState(null)
    const [message, setMessage] = useState("")
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    


    useEffect(() => {

        const fetchStartup = async () => {

            try {

                const data = await startupService.show(startupId)

                setStartup(data)

            } catch (error) {

                setMessage(error.message)
            }
        }

        fetchStartup()

    }, [startupId])

     if (message) {
        return <p>{message}</p>
    }


    if (!startup) {
        return <p>Loading startup...</p>
    }

    const handleDelete = async () => {

    try {

        await startupService.deleteStartup(startupId)

        navigate("/founder/dashboard")

    } catch (error) {

        setMessage(error.message)

    }
}

return (

    <section className="view-startup">

            <div className="startup-header">

                {startup.logo ? (

                    <img
                        src={`${BASE_URL}${startup.logo}`}
                        alt={`${startup.name} logo`}
                        className="startup-logo"
                    />

                ) : (

                    <div className="startup-logo-placeholder">
                        No Logo
                    </div>

                )}


                <h1>{startup.name}</h1>

                <p>{startup.industry}</p>

                <p>{startup.stage}</p>

                <p>{startup.location}</p>

            </div>


            <div className="startup-info">

                <div>
                    <h2>Description</h2>

                    <p>
                        {startup.description || "No description added yet."}
                    </p>
                </div>


                <div>
                    <h2>Problem</h2>

                    <p>
                        {startup.problem || "No problem added yet."}
                    </p>
                </div>


                <div>
                    <h2>Solution</h2>

                    <p>
                        {startup.solution || "No solution added yet."}
                    </p>
                </div>


                <div>
                    <h2>Recruitment</h2>

                    <p>
                        {startup.is_recruiting
                            ? "Currently Recruiting"
                            : "Not Currently Recruiting"}
                    </p>
                </div>


                {startup.website && (

                    <div>

                        <h2>Website</h2>

                        <a
                            href={startup.website}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Visit Website
                        </a>

                    </div>

                )}

            </div>


            <div className="startup-actions">

                <Link to={`/founder/startups/${startup._id}/edit`}>
                    Edit Startup
                </Link>
<button onClick={() => setShowDeleteConfirm(true)}>
    Delete Startup
</button>
               {showDeleteConfirm && (

    <div className="delete-popup-overlay">

        <div className="delete-popup">

            <h2>Delete Startup?</h2>

            <p>
                Are you sure you want to delete this startup?
            </p>

            <div className="delete-popup-buttons">

                <button
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    Cancel
                </button>

                <button
                    onClick={handleDelete}
                    className="confirm-delete"
                >
                    Yes, Delete
                </button>

            </div>

        </div>

    </div>

)}

            </div>

        </section>

   
)


}

export default ViewStartUp