import { Link } from "react-router"
import { useState, useEffect } from 'react'

const Nav = (props) =>{

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

return (

    <>
    <Link to='/auth/sign-up'>Sign Up</Link>
    <Link to='/auth/sign-in'>Sign In</Link>
    <Link to="/" onClick={handleSignOut} > Sign Out</Link>
    </>
)

}

export default Nav