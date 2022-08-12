import { Link, useParams } from "react-router-dom"

const LogDetail = ({logList}) => {
    const params = useParams()

    const getLog = (id) => {
        return logList.find(m => m.id === parseInt(id))
    }
    const log = getLog(params.logId)
    return (
        <>
            { log ?
                <>
                    <h4>{log.text}</h4>
                    <p>{log.user}</p>
                </>
                :
                <>
                    <p>Log not found</p>
                    <Link to="/logs">Go back to the main page</Link>
                </>
            }

        </>
    )
}

export default LogDetail