import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { Button, Typography, InputLabel, TextField } from "@mui/material";
import { signIn } from "../services/authServices";

const LoginForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData)
    .then(({ username, jwt }) => {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("token", jwt);
      dispatch({
        type: "setLoggedInUser",
        data: username,
      });
      dispatch({
        type: "setToken",
        data: jwt,
      });
    })
    .catch(err => console.log(err))
    setFormData(initialFormData);
    navigate("/logs");
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h5" className="Title">Log in</Typography>
      <div className="Form-Container">
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>Email:</InputLabel>
          <TextField
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel>Password:</InputLabel>
          <TextField
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
      </div>
    </>
  );
};

export default LoginForm
