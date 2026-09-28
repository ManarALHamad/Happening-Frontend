import { useState } from "react"
import { useParams, useNavigate } from "react-router"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL



const CreateRole = () => {

    const { startupId } = useParams()
    const navigate = useNavigate()
    const [message, setMessage] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        role_type: "Developer",
        description: "",
        required_skills: "",
        is_open: true,
    })

      const handleChange = (event) => {

        const { name, value, type, checked } = event.target

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        })
    }

    const handleSubmit = async (event) => {

        event.preventDefault()

        try {

            const response = await fetch(
                `${BASE_URL}/startups/${startupId}/roles`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(formData)
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.err || "Failed to create role")
            }

            navigate(`/founder/startups/${startupId}`)

        } catch (error) {

            setMessage(error.message)
        }
    }

    return(
        <section className="create-role">

            <h1>Add Role</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>

                <label htmlFor="title">
                    Role Title
                </label>

                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Frontend Developer"
                    required
                />


                <label htmlFor="role_type">
                    Role Type
                </label>

                <select
                    id="role_type"
                    name="role_type"
                    value={formData.role_type}
                    onChange={handleChange}
                >
                    <option value="Co-Founder">Co-Founder</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business">Business</option>
                    <option value="Sales">Sales</option>
                    <option value="Data">Data</option>
                    <option value="AI">AI</option>
                    <option value="Other">Other</option>
                </select>


                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what this person will do..."
                    required
                />


                <label htmlFor="required_skills">
                    Required Skills
                </label>

                <input
                    type="text"
                    id="required_skills"
                    name="required_skills"
                    value={formData.required_skills}
                    onChange={handleChange}
                    placeholder="React, JavaScript, CSS"
                />


                <label>

                    <input
                        type="checkbox"
                        name="is_open"
                        checked={formData.is_open}
                        onChange={handleChange}
                    />

                    Role is open

                </label>


                <button type="submit">
                    Create Role
                </button>

            </form>

        </section>
    )
}

export default CreateRole
