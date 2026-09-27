import { Link } from "react-router"

const Nav = ({ user, setUser }) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    if (!user) {
        return (
            <nav>
                <Link to="/">Home</Link>
                <Link to="/auth/sign-up">Sign Up</Link>
                <Link to="/auth/sign-in">Sign In</Link>
            </nav>
        )
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            {user.user_type === "Founder" && (
                <>
                    <Link to="/founder/dashboard">Dashboard</Link>
                    <Link to="/founder/profile">Profile</Link>
                    <Link to="/founder/Startup">My Startups</Link>
                </>
            )}
            {user.user_type === "User" && (
                <Link to="/user/dashboard">Dashboard</Link>
            )}
            <Link to="/" onClick={handleSignOut}>Sign Out</Link>
        </nav>
    )

}

export default Nav
