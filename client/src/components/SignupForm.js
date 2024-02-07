import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import {
  Paper,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { signUp } from "../services/authServices";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/system/Box";

const SignupForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();
  const {
    register,
    watch,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  console.log(errors);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const serverSubmit = (data) => {
    signUp(data)
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
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  return (
    <>
      <Box className="Center-Container">
        <Paper elevation={3} className="Paper" square={false}>
          <Typography variant="h5" className="Title">
            Create an account!
          </Typography>
          <form
            onSubmit={handleSubmit((data) => serverSubmit(data))}
            className="Form-Container"
          >
            <div className="Padding">
              <TextField
                className="Input"
                label="Username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username && errors.username.message}
                {...register("username", {
                  required: "Required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 16,
                    message: "Username must be less than 16 characters long",
                  },
                  onChange: () => clearErrors("username"),
                })}
              />
            </div>
            <div className="Padding">
              <TextField
                className="Input"
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                {...register("email", {
                  required: "Required",
                  pattern: {
                    // eslint-disable-next-line
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a vaild email address",
                  },
                  onChange: () => clearErrors("email"),
                })}
              />
            </div>
            <div className="Padding">
              <FormControl variant="outlined" className="Input">
                <InputLabel
                  error={!!errors.password}
                  htmlFor="adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  error={!!errors.password}
                  {...register("password", {
                    required: "Required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 64,
                      message: "Password must be less than 64 characters long",
                    },
                    onChange: () => clearErrors("password"),
                  })}
                />
                <FormHelperText error id="password-helper-text">
                  {errors.password && errors.password.message}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="Padding">
              <FormControl variant="outlined" className="Input">
                <InputLabel
                  error={!!errors.confirm_password}
                  htmlFor="adornment-confirm-password"
                >
                  Confirm password
                </InputLabel>
                <OutlinedInput
                  id="adornment-confirm-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm password"
                  error={!!errors.confirm_password}
                  {...register("confirm_password", {
                    required: "Required",
                    validate: (val) => {
                      if (watch("password") !== val) {
                        return "Passwords do not match!";
                      }
                    },
                    onChange: () => clearErrors("confirm_password")
                  })}
                />
                <FormHelperText error id="confirm-password-helper-text">
                  {errors.confirm_password && errors.confirm_password.message}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="Padding">
              <Button fullWidth variant="contained" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default SignupForm;
