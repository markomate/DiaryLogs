import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = ({activateUser}) => {
    const navigate = useNavigate()
    const initialFormData = {
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handleSubmit triggered")
        console.log(formData)
        activateUser(formData.email)
        setFormData(initialFormData)
        navigate("/logs")
    }

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" id="email" value={formData.email} onChange={handleFormData} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleFormData} />
                </div>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default LoginForm