// import './App.css';
import React from 'react'
import LogForm from './components/LogForm';
import Logs from './components/Logs';
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import initialLogList from './data/log-list.json'


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [logList, setLogList] = useState(initialLogList)

  const activateUser = (username) => {
    setLoggedInUser(username)
  }

  const addLog = (text) => {
    const log = {
      text: text,
      user: loggedInUser,
      id: logList[logList.length - 1].id + 1
    }
    setLogList(
      (logList) => [...logList, log]
    )
  }

  return (
    <div >
          <h1>DiaryLogs</h1>
          <Navigation loggedInUser={loggedInUser} activateUser={activateUser} />
          { !loggedInUser ?
            <LoginForm activateUser={activateUser} />
            :
            <LogForm loggedInUser={loggedInUser} addLog={addLog} /> 
          }
          <Logs logList={logList} />
    </div>
  )
}

export default App