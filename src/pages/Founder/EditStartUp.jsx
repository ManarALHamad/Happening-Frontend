import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as startupService from "../../services/startup"

const EditStartUp = () => {

    const { startupId } = useParams()

    const navigate = useNavigate()

    const [message, setMessage] = useState("")

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


    // Get startup information

    useEffect(() => {

        const fetchStartup = async () => {

            try {

                const data = await startupService.show(startupId)

                setFormData({
                    name: data.name,
                    description: data.description,
                    problem: data.problem,
                    solution: data.solution,
                    industry: data.industry,
                    stage: data.stage,
                    location: data.location,
                    website: data.website,
                    is_recruiting: data.is_recruiting,
                })

            } catch (error) {

                setMessage(error.message)

            }
        }

        fetchStartup()

    }, [startupId])


    // Handle form changes

    const handleChange = (event) => {

        const { name, value, type, checked } = event.target

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        })
    }


    // Update startup

    const handleSubmit = async (event) => {

        event.preventDefault()

        try {

            const updatedStartup = await startupService.update(
                startupId,
                formData
            )

            navigate(`/founder/startups/${updatedStartup._id}`)

        } catch (error) {

            setMessage(error.message)

        }
    }


    return (

        <section className="edit-startup">

            <h1>Edit Startup</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>

                <label htmlFor="name">
                    Startup Name
                </label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />


                <label htmlFor="problem">
                    Problem
                </label>

                <textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                />


                <label htmlFor="solution">
                    Solution
                </label>

                <textarea
                    id="solution"
                    name="solution"
                    value={formData.solution}
                    onChange={handleChange}
                />


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


                <label htmlFor="website">
                    Website
                </label>

                <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                />


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
                    Save Changes
                </button>

            </form>

        </section>
    )
}

export default EditStartUp