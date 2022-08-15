import { useGlobalState } from '../utils/stateContext'
import Log from './Log'

const Logs = () => {
    const {store} = useGlobalState()
    const {logList, loggedInUser} = store

    const userList = logList.filter(log => log.username === loggedInUser)

    return (
        <>
            {userList.map(log =>
               <Log key={log.id} log={log}/>
            )}
        </>
    )
}
export default Logs