import { Card, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Log = ({log}) => {
    return (
        <Card>
            <Link to={`${log.id}`} style={{textDecoration: 'none'}}>
                <CardContent>
                    <Typography variant='body2'>{log.text}</Typography>
                    <Typography variant='h5'>{log.username}</Typography>
                    <Typography variant='h6'>{log.posted}</Typography>
                </CardContent>
            </Link>
        </Card>
    )
}

export default Log