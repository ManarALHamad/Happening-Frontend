const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/startups`


// GET ALL STARTUPS
const index = async () => {

    try {

        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to get startups")
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}


// GET ONE STARTUP
const show = async (startupId) => {

    try {

        const res = await fetch(`${BASE_URL}/${startupId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to get startup")
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}


// CREATE STARTUP
const create = async (startupFormData) => {

    try {

        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(startupFormData),
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to create startup")
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}


// UPDATE STARTUP
const update = async (startupId, startupFormData) => {

    try {

        const res = await fetch(`${BASE_URL}/${startupId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(startupFormData),
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.err || "Failed to update startup")
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}


// DELETE STARTUP
const deleteStartup = async (startupId) => {

    try {

        const res = await fetch(`${BASE_URL}/${startupId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (!res.ok) {
            throw new Error("Failed to delete startup")
        }

        return true

    } catch (error) {
        console.log(error)
        throw error
    }
}


export {
    index,
    show,
    create,
    update,
    deleteStartup
}