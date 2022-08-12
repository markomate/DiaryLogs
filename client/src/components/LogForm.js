import { useState } from "react"

const LogForm = ({loggedInUser, addLog}) => {
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
            addLog(formData.text)
            cleanContent()
        }
    }

    const cleanContent = () => {
        setFormData(initialFormData)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea type="text" name="text" id="text" placeholder={`What would you like to log ${loggedInUser}?`} value={formData.text} onChange={handleFormData} />
                </div>
                <input type="submit" value="Post" />
                <button onClick={cleanContent}>Clear</button>
            </form>
        </>
    )
}

export default LogForm