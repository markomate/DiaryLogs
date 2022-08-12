import { Link, useNavigate } from "react-router-dom"

const Navigation = ({loggedInUser, activateUser}) => {
    const navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault()
        activateUser("")
        navigate("/logs")
    }

    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            { loggedInUser ?
                <>
                    <Link to="/logs/new" >New log</Link>
                    {loggedInUser}
                    <Link to="/" onClick={logout}>Logout</Link>
                </>
                :
                <>
                    Guest
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </>
            }
        </>
    )
}

export default Navigation