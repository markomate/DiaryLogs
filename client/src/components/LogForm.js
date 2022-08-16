import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import Button from "@mui/material/Button";
import { createLog } from "../services/logsServices";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// import Moment from "react-moment";

const LogForm = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();
  //   const setTime = Date.now().toString()
  const initialFormData = {
    text: "",
    startTime: "",
    finishTime: ""
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
    // if (formData.text === ""){
    //     console.log("empty log")
    //     console.log(formData)
    // }else {
    console.log(formData);
    addLog(formData);
    clearLog();
    navigate("/logs");
  };
  // }

  const addLog = (data) => {
    createLog(data).then((log) => {
      dispatch({
        type: "addLog",
        data: log,
      });
    });
  };

  const clearLog = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
      >
        <Stack noValidate spacing={3} paddingTop="20px">
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
          />
        </div>
        <Button variant="contained" type="submit">
          Post
        </Button>
        <Button onClick={clearLog}>Clear</Button>
      </Box>
    </>
  );
};

export default LogForm;
