const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

//Get the profile 

const getProfile = async () => {

       const token = localStorage.getItem('token')

    const response = await fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.err || 'Failed to get profile')
    }

    return data

}

//update the profile 


const updateProfile = async (profileData) => {

    const token = localStorage.getItem('token')

    const response = await fetch(`${BASE_URL}/profile`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.err || 'Failed to update profile')
    }

    return data
}


export {
    getProfile,
    updateProfile
}