import { Toolbar, Typography, Tabs, Tab, AppBar } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"

const Navigation = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store

    const navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault()
        sessionStorage.clear()
        dispatch({
            type: "setLoggedInUser",
            data: null
          })
        navigate("/")
    }

    return (
        <AppBar position="sticky">
            <Typography variant='h3'>DiaryLogs</Typography>
            <Toolbar>
                <Tabs value={false}>
                    <Tab label="Home" value="/logs" component={Link} to="/logs" />
                    <Tab label="About" component={Link} to="/about" />
                    { loggedInUser && <Tab label="New log" component={Link} to="/logs/new" />}
                    { loggedInUser && <Tab label="Logout" onClick={logout} component={Link} to="/" />}
                    { !loggedInUser && <Tab label="Login" component={Link} to="/login" />}
                    { !loggedInUser && <Tab label="Signup" component={Link} to="/signup" />}
                </Tabs>
                { loggedInUser && <Typography variant='body1'>Hello, {loggedInUser}</Typography>}
            </Toolbar>
        </AppBar>
    )
}

export default Navigation