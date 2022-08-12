const Log = ({log}) => {
    return (
        <>
            <h4>{log.text}</h4>
            <p>{log.user}</p>
        </>
    )

}

export default Log