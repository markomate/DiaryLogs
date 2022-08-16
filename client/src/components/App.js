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
import Info from "./Info";
import NotFound from "./NotFound";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { reducer } from "../utils/reducer";
import { StateContext } from "../utils/stateContext";
import { getLogs } from "../services/logsServices";
import Moment from "react-moment";
import ResponsiveAppBar from "./Appbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f1329",
    },
    secondary: {
      main: "#9FC5F8",
    },
  },
});

Moment.globalFormat = "HH:mma - DD/MM/YY";

const App = () => {
  const initialState = {
    logList: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null,
  };

  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser } = store;

  useEffect(() => {
    getLogs()
      .then((logs) => {
        dispatch({
          type: "setLogList",
          data: logs,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <StateContext.Provider value={{ store, dispatch }}>
        <ThemeProvider theme={theme}>
          <Router>
            <ResponsiveAppBar />
            <Routes>
              <Route
                path="/"
                element={
                  loggedInUser ? (
                    <Navigate to="/logs" />
                  ) : (
                    <Navigate to="/info" />
                  )
                }
              />
              <Route path="logs">
                <Route index element={<Logs />} />
                <Route
                  path="new"
                  element={
                    loggedInUser ? <LogForm /> : <Navigate to="/login" />
                  }
                />
                <Route path=":logId" element={<LogDetail />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="info" element={<Info />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="signup" element={<SignupForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </StateContext.Provider>
    </div>
  );
};

export default App;
