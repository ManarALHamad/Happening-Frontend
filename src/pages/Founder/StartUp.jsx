import { useEffect, useState } from "react"
import *  as startupService from "../../services/startup"


const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL


const StartUp = ({user}) =>{

    const [startups, setStartups] = useState([])
    const [logo, setLogo] = useState(null)
    const [message, setMessage] = useState('')

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        problem: "",
        solution: "",
        industry: "Technology",
        stage: "Idea",
        location: "Bahrain",
        website: "",
        is_recruiting: true,

    })

    //Get the startup

    useEffect(() => {

        const fetchStartups = async () =>{

            try {

             const data = await startupService.index()
             setStartups(data)
                
            } catch (error) {

                setMessage(error.message)
            }
            fetchStartups()
        }

    },  [])

    const handleChange = (event) => {

         const { name, value, type, checked } = event.target

         setFormData({...formData, [name]: type === "checkbox" ? checked : value,})

    }

    //the logo (image)

    const handleLogoChange = (event) => {

        setLogo(event.target.files[0])
    }

    //submit to create the startup

    const handleSubmit = async (event) =>{

        event.preventDefault()

        try {

         
            const newStartup = await startupService.create(formData)

            let createdStartup = newStartup


            // Upload the logo after startup is created
            if (logo) {

                const logoData = new FormData()

                logoData.append("logo", logo)

                const logoRes = await fetch(
                    `${BASE_URL}/startups/${newStartup._id}/logo`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: logoData
                    }
                )

                const logoResponse = await logoRes.json()

                if (!logoRes.ok) {
                    throw new Error(
                        logoResponse.err || "Failed to upload startup logo"
                    )
                }

                createdStartup = logoResponse
            }


            // Add the newly created startup to the page
            setStartups([
                createdStartup,
                ...startups
            ])


            // Reset form
            setFormData({
                name: "",
                description: "",
                problem: "",
                solution: "",
                industry: "Technology",
                stage: "Idea",
                location: "Bahrain",
                website: "",
                is_recruiting: true,
            })

            setLogo(null)

            setMessage("Startup created successfully!")
            
        } catch (error) {

            setMessage(error.message)
        }
    }


    return(

    <section className="startup-page">

       <header>     
        <h1>My Startups</h1>
                {message && (
                    <p>{message}</p>
                )}
            </header>


            {/* CREATE STARTUP */}

        <div className="create-startup">

          <h2>Create Startup</h2>

          <form onSubmit={handleSubmit}>


            {/* Upload STARTUP LOGO */}

           <div>
            <label htmlFor="logo">Startup Logo </label>

            <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} />

            </div>


            {/* NAME */}

            <label htmlFor="name"> Startup Name</label>
    
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
  
            {/* DESCRIPTION */}

            <label htmlFor="description"> Description </label>
                        
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Tell people about your startup" required />

            {/* PROBLEM */}

            <label htmlFor="problem"> Problem </label>
                       
            <textarea id="problem" name="problem" value={formData.problem}  onChange={handleChange} placeholder="What problem are you solving?" />

            {/* SOLUTION */}

            <label htmlFor="solution"> Solution</label>
     
            <textarea id="solution" name="solution" value={formData.solution} onChange={handleChange} placeholder="How does your startup solve this problem?" />


            {/* INDUSTRY */}

                    <label htmlFor="industry">
                        Industry
                    </label>

                    <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                    >

                        <option value="Technology">Technology</option>
                        <option value="AI">AI</option>
                        <option value="FinTech">FinTech</option>
                        <option value="HealthTech">HealthTech</option>
                        <option value="EdTech">EdTech</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="SaaS">SaaS</option>
                        <option value="Food">Food</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Other">Other</option>

                    </select>


                    {/* STAGE */}

                    <label htmlFor="stage">
                        Startup Stage
                    </label>

                    <select
                        id="stage"
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                    >

                        <option value="Idea">Idea</option>
                        <option value="Building">Building</option>
                        <option value="MVP">MVP</option>
                        <option value="Launched">Launched</option>
                        <option value="Growing">Growing</option>

                    </select>


                    {/* LOCATION */}

                    <label htmlFor="location">
                        Location
                    </label>

                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />


                    {/* WEBSITE */}

                    <label htmlFor="website">
                        Website
                    </label>

                    <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://..."
                    />


                    {/* RECRUITING */}

                    <label>

                        <input
                            type="checkbox"
                            name="is_recruiting"
                            checked={formData.is_recruiting}
                            onChange={handleChange}
                        />

                        Currently Recruiting

                    </label>


                    <button type="submit">
                        Create Startup
                    </button>

                </form>

            </div>


            {/* DISPLAY FOUNDER STARTUPS */}

            <div className="startup-list">

                <h2>Your Startups</h2>

                {startups.filter(
                    startup =>
                        String(startup.founder._id) === String(user._id)
                ).length === 0 ? (

                    <p>No startups created yet.</p>

                ) : (

                    startups
                        .filter(
                            startup =>
                                String(startup.founder._id) === String(user._id)
                        )
                        .map((startup) => (

                            <div
                                key={startup._id}
                                className="startup-card"
                            >

                                {/* LOGO */}

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


                                <h3>{startup.name}</h3>

                                <p>{startup.description}</p>

                                <p>
                                    <strong>Industry:</strong>{" "}
                                    {startup.industry}
                                </p>

                                <p>
                                    <strong>Stage:</strong>{" "}
                                    {startup.stage}
                                </p>

                                <p>
                                    <strong>Location:</strong>{" "}
                                    {startup.location}
                                </p>

                                <p>
                                    {startup.is_recruiting
                                        ? "Currently Recruiting"
                                        : "Not Recruiting"}
                                </p>

                            </div>

                        ))
                )}

            </div>

        </section>

     
    )



}

export default StartUp