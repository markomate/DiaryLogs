import React, { useEffect, useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LogForm from "./LogForm";
import Logs from "./Logs";
import LogDetail from "./LogDetail";
import About from "./About";
import NotFound from "./NotFound";
import Navigation from "./Navigation";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { reducer } from "../utils/reducer";
import { StateContext } from "../utils/stateContext";
import { getLogs } from "../services/logsServices";

const App = () => {
  const initialState = {
    logList: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null,
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser } = store;

  useEffect(
    ()=>{
      // axios.get("http://localhost:4000/messages")
      // .then(response => {
      //   console.log(response.data)
      //   dispatch({
      //     type: "setMessageList",
      //     data: response.data
      //   })
      // })
      //setMessageList(initialMessageList)
      getLogs()
      .then(logs => {
        dispatch({
          type: "setLogsList",
          data: logs
        })
      })
      .catch(e => {console.log(e)})
    }
    ,
    []
  )

  return (
    <div>
      <StateContext.Provider value={{store, dispatch}}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="logs" />} />
            <Route path="logs">
              <Route index element={<Logs />} />
              <Route
                path="new"
                element={
                  loggedInUser ? (
                    <LogForm />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path=":logId" element={<LogDetail />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route
              path="login"
              element={<LoginForm />}
            />
            <Route path="signup" element={<SignupForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </StateContext.Provider>
    </div>
  );
};

export default App;
