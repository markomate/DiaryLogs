import { Link, useParams } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import { Card, CardContent, Typography } from "@mui/material"


const LogDetail = () => {
    const {store} = useGlobalState()
    const {logList} = store

    const params = useParams()
    // console.log(params)

    const getLog = (id) => {
        return logList.find(l => l.id === parseInt(id))
    }
    const log = getLog(params.logId)
    return (
        <>
            { log ?
                <Card>
                    <CardContent>
                        <Typography variant='body2'>{log.text}</Typography>
                        <Typography variant='h5'>{log.username}</Typography>
                        <Typography variant='h6'>{log.posted}</Typography>
                    </CardContent>
                </Card>
                :
                <>
                    <p>Log not found</p>
                    <Link to="/">Go back to the main page</Link>
                </>
            }
            
        </>
    )
}
export default LogDetail