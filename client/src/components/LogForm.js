import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import Button from "@mui/material/Button";
import { createLog, updateLog } from "../services/logsServices";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// import Moment from "react-moment";

const LogForm = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  // console.log(location.pathname)
  const initialFormData = {
    comment: "",
    startTime: "",
    finishTime: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormData = (e) => {
    try {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (url === "/logs/new") {
      addLog(formData);
      clearLog();
      navigate("/logs");
    } else {
      let id = location.pathname.slice(11);
      editLog(id, formData);
      clearLog();
      navigate("/logs");
    }
  };

  const addLog = (data) => {
    createLog(data).then((log) => {
      dispatch({
        type: "addLog",
        data: log,
      });
    });
  };

  const editLog = (id, data) => {
    updateLog(id, data).then((log) => {
      dispatch({
        type: "editLog",
        data: log,
      });
    });
  };

  const clearLog = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="Center-Container">
      <Box component="form" onSubmit={handleSubmit}>
        <Stack noValidate spacing={3} marginTop="10rem">
          <TextField
            id="datetime-local-start"
            label="Start time"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleFormData}
            sx={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="datetime-local-finish"
            label="Finish time"
            type="datetime-local"
            name="finishTime"
            value={formData.finishTime}
            onChange={handleFormData}
            sx={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
        <div>
          <TextField
            id="outlined-textarea"
            type="text"
            name="comment"
            placeholder={`What would you like to log ${loggedInUser}?`}
            value={formData.comment}
            onChange={handleFormData}
            multiline
            sx={{ width: 300, paddingTop: 3 }}
          />
        </div>
        <div className="Button">
          <Button variant="contained" type="submit" color="secondary">
            Log
          </Button>
          <Button variant="outlined" onClick={clearLog}>
            Clear
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default LogForm;
