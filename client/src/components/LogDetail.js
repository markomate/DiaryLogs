import { Link, useParams } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import { Card, CardContent, Typography } from "@mui/material"
import Moment from "react-moment"

const LogDetail = () => {
    const {store} = useGlobalState()
    const {logList} = store

    const params = useParams()

    const getLog = (id) => {
        return logList.find(l => l.id === id)
    }

    const log = getLog(params.logId)

    return (
        <>
            { log ?
                <Card>
                    <CardContent>
                        <Typography variant='body2'>{log.comment}</Typography>
                        <Typography variant='h5'>{log.username}</Typography>
                        <Typography variant='body1'><Moment>{log.posted}</Moment></Typography>
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