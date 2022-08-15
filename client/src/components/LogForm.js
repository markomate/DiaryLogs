import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import Button from '@mui/material/Button';
import { createLog } from "../services/logsServices";
import DateTimePicker from 'react-datetime-picker'

const LogForm = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    const navigate = useNavigate()
    let newDate = new Date()
    const initialFormData = {
        text: "",
        startTime: newDate,
        finishTime: newDate
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleFormData = (e) => {
        try {
            setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })  
        } catch (error){
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (formData.text === ""){
        //     console.log("empty log")
        //     console.log(formData)
        // }else {
            console.log(formData)
            addLog(formData)
            cleanMessage()
            navigate("/logs")
        }
    // }
    
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
                <div><DateTimePicker type="startTime" name="startTime" id="startTime" onChange={handleFormData} value={formData.startTime} /></div>
                <div><DateTimePicker type="finishTime" name="finishTime" id="finishTime" onChange={handleFormData} value={formData.finishTime} /></div>
                <div>
                    <textarea type="text" name="text" id="text" placeholder={`What would you like to log ${loggedInUser}?`} value={formData.text} onChange={handleFormData} />
                </div>
                <Button variant="contained" type="submit">Post</Button>
                <Button onClick={cleanMessage}>Clear</Button>
            </form>
        </>
    )
}

export default LogForm