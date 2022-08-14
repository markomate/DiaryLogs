import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LogForm from './LogForm';
import Logs from './Logs';
import LogDetail from './LogDetail';
import About from './About'
import NotFound from './NotFound';
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import initialLogList from '../data/log-list.json'
import { reducer } from '../utils/reducer'


const App = () => {
  const initialState = {
    logList: [],
    loggedInUser: ""
  }

  const [store, dispatch] = useReducer(reducer, initialState)
  const {logList, loggedInUser} = store

  const activateUser = (username) => {
    dispatch({
      type: "setLoggedInUser",
      data: username
    })
  }

  const addLog = (text) => {
    const log = {
      text: text,
      user: loggedInUser,
      id: logList[logList.length - 1].id + 1
    }
    dispatch({
      type: "addLog",
      data: log
    })
  }

  useEffect(
    ()=>{
      dispatch({
        type: "setLogList",
        data: initialLogList
      })
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