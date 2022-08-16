import { Card, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Moment from 'react-moment';

const Log = ({log}) => {
    return (
        <Card>
            <Link to={`${log.id}`} className="card">
                <CardContent>
                    <Typography variant='body1'>
                        Start time: <Moment>{log.startTime}</Moment>
                    </Typography>
                    <Typography variant='body1'>
                        Finish time: <Moment>{log.finishTime}</Moment>
                    </Typography>
                    <Typography variant='body1'>Commment: {log.comment}</Typography>
                    <Typography variant='caption'>
                        Log created: <Moment>{log.posted}</Moment>
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    )
}

export default Log