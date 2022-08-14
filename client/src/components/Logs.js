import { useGlobalState } from '../utils/stateContext'
import Log from './Log'

const Logs = () => {
    const {store} = useGlobalState()
    const {logList} = store
    return (
        <>
            {logList.map(log => 
                    <Log key={log.id} log={log}/>
            )}
        </>
    )
}
export default Logs