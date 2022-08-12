import Log from './Log'

const Logs = ({logList}) => {
    return (
        <>
            {logList.map(log => 
                    <Log key={log.id} log={log}/>
            )}
        </>
    )

}

export default Logs