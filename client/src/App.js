import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LogForm from './components/LogForm';
import Logs from './components/Logs';
import LogDetail from './components/LogDetail';
import About from './components/About'
import NotFound from './components/NotFound';
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

  useEffect(
    ()=>{
      setLogList(initialLogList)
    }
    ,
    []
  )

  return (
    
    <div >
          <h1>DiaryLogs</h1>
          <Router>
            <Navigation loggedInUser={loggedInUser} activateUser={activateUser} />
            <Routes>
              <Route path="/" element={<Navigate to="logs" />} />
              <Route path="logs">
                <Route index element={<Logs logList={logList}/>}/>                
                <Route path="new" element={
                  loggedInUser ?
                  <LogForm loggedInUser={loggedInUser} addLog={addLog} />
                  :
                  <Navigate to="/login" />
                } />
                <Route path=":logId" element={<LogDetail logList={logList} />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="login" element={<LoginForm activateUser={activateUser} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
    </div>
  )
}

export default App