import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import Button from '@mui/material/Button';
import { createLog } from "../services/logsServices";

const LogForm = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    const navigate = useNavigate()
    const initialFormData = {
        text: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.text === ""){
            console.log("empty log")
        }else {
            console.log(formData)
            addLog(formData)
            cleanMessage()
            navigate("/logs")
        }
    }
    
    const addLog = (data) => {
        createLog(data)
        .then(log => {
            dispatch({
            type: "addLog",
            data: log
            })            
        })
      }

    const cleanMessage = () => {
        setFormData(initialFormData)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea type="text" name="text" id="text" placeholder={`What's on your mind ${loggedInUser}?`} value={formData.text} onChange={handleFormData} />
                </div>
                <Button variant="contained" type="submit">Post</Button>
                <Button onClick={cleanMessage}>Clean message</Button>
            </form>
        </>
    )
}

export default LogForm