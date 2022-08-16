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
                <Card className="Card">
                    <CardContent>
                        <Typography variant='body1'>Start time: <Moment>{log.startTime}</Moment></Typography>
                        <Typography variant='body1'>Finish time: <Moment>{log.finishTime}</Moment></Typography>
                        <Typography variant='body2'>Comment: {log.comment}</Typography>
                        <Typography variant='caption'>Created at: <Moment>{log.posted}</Moment></Typography>
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