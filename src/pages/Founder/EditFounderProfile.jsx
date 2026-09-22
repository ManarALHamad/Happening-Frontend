import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getProfile, updateProfile } from "../../services/profile"


const EditFounderProfile = () => {

    const navigate = useNavigate()
    const [images, setImages] = useState([])


    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        skills: '',
        experience_level: '',
        linkedin_url: '',
        github_url: '',
        portfolio_url: '',
    })

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)


    // Get the current profile information
    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const profileData = await getProfile()

                setFormData({
                    bio: profileData.bio || '',
                    location: profileData.location || '',
                    skills: profileData.skills || '',
                    experience_level: profileData.experience_level || '',
                    linkedin_url: profileData.linkedin_url || '',
                    github_url: profileData.github_url || '',
                    portfolio_url: profileData.portfolio_url || '',
                })

            } catch (err) {

                setMessage(err.message)

            } finally {

                setLoading(false)
            }
        }

        fetchProfile()

    }, [])


    // Update form fields
    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleImageChange = (event) => {
    setImages([...event.target.files])
  }


    // Send updated profile to Django
    const handleSubmit = async (event) => {

    event.preventDefault()

    try {

        // Update profile information
        await updateProfile(formData)


        // Upload profile image
        if (images.length > 0) {

            const imageData = new FormData()

            imageData.append(
                "profile_image",
                images[0]
            )

            const token = localStorage.getItem("token")

            const imageRes = await fetch(
                `${import.meta.env.VITE_BACK_END_SERVER_URL}/profile/image`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: imageData
                }
            )

            const imageResponse = await imageRes.json()

            console.log("Image response:", imageResponse)

            if (!imageRes.ok) {
                throw new Error("Failed to upload profile image")
            }
        }


        navigate('/founder/profile')

    } catch (err) {

        setMessage(err.message)
    }
}


    if (loading) {
        return <p>Loading profile...</p>
    }


    return (

        <section className="edit-founder-profile">

            <header>
                <h1>Edit Profile</h1>
                <p>{message}</p>
            </header>


            <form onSubmit={handleSubmit}>

                <div>
    <label>Profile Image</label>

    <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
    />
</div>


                <label htmlFor="bio">
                    Bio:
                </label>

                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell people about yourself"
                />


                <label htmlFor="location">
                    Location:
                </label>

                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />


                <label htmlFor="experience_level">
                    Experience Level:
                </label>

                <select
                    id="experience_level"
                    name="experience_level"
                    value={formData.experience_level}
                    onChange={handleChange}
                >
                    <option value="">
                        Select experience level
                    </option>

                    <option value="Student">
                        Student
                    </option>

                    <option value="Junior">
                        Junior
                    </option>

                    <option value="Mid-Level">
                        Mid-Level
                    </option>

                    <option value="Senior">
                        Senior
                    </option>

                    <option value="Founder">
                        Founder
                    </option>

                </select>


                <label htmlFor="skills">
                    Skills:
                </label>

                <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Django, Python"
                />


                <label htmlFor="linkedin_url">
                    LinkedIn:
                </label>

                <input
                    type="url"
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                />


                <label htmlFor="github_url">
                    GitHub:
                </label>

                <input
                    type="url"
                    id="github_url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                />


                <label htmlFor="portfolio_url">
                    Portfolio:
                </label>

                <input
                    type="url"
                    id="portfolio_url"
                    name="portfolio_url"
                    value={formData.portfolio_url}
                    onChange={handleChange}
                    placeholder="https://..."
                />


                <div className="actions">

                    <button type="submit">
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/founder/profile')}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </section>
    )
}


export default EditFounderProfile