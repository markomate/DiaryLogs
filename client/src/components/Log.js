import { Link } from "react-router-dom"

const Log = ({log}) => {
    return (
        <>
            <h4>{log.text}</h4>
            <p>{log.user}</p>
            <Link to={`${log.id}`}>View detail</Link>
        </>
    )

}

export default Log