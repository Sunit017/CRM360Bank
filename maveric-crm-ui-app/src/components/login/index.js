import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  Box,
} from "@mui/material";
import Container from "@mui/material/Container";
import { addLogInfo, removeLogInfo } from "../../store/actions";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import HelmetPage from "../common/HelmetPage";
import logo from "../../assets/logo.png";
import crm from "../../assets/crm.png";
import header from "../../assets/header.png";
import InputAdornment from "@mui/material/InputAdornment";
import { FiMail, FiLock, FiUnlock } from "react-icons/fi";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAccessToken } from "./loginService";
import DottedLoader from "../common/DottedLoader";

const LoginScreen = styled.div`
  /* CSS to hide the eye icon in the password field */
  .MuiInputAdornment-root .MuiSvgIcon-root {
    display: none !important;
  }

  .loginGrid {
    box-shadow: 3px 10px 20px 10px #e9967a;
    border-radius: 15px;
    background: #f7f6f7;
    padding: 20px;
  }

  .container-fluid {
    height: 100vh;
    display: flex;
  }
  .password-letters input {
    -webkit-text-security: disc; /* Mask input text with dots */
    text-security: disc; /* Fallback for some browsers */
    letter-spacing: 2px; /* Adjust letter spacing as needed */
    font-family: inherit; /* Ensure consistent font with the rest of the form */
  }

  .bg-primary {
    background-color: #666d78;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .crm-logo {
    font-size: 50px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .rightSection {
    background-color: white;
  }

  .loginForm {
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .forgot-password {
    color: #0664a7;
    text-decoration: none;
    font-size: small;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .errorfield {
    color: red;
    font-size: small;
  }

  .signup {
    margin-top: 10px;
    color: #666d78;
    text-align: center;
  }

  .signup a {
    color: #0664a7;
    text-decoration: none;
  }

  .signup a:hover {
    text-decoration: underline;
  }
  .login-header {
    padding-bottom: 5%;
  }
  .email {
    font-weight: 500;
    font-size: 14px;
  }
`;

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("Enter your password").required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("flag=", flag);
  }, [flag]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true); // Start loading on form submit
      setTimeout(() => {
        console.log("onSubmit");
        const { email, password } = values;
        dispatch(addLogInfo({ userId: email, password }));
        getAccessToken({ username: email, password: password }, navigate);
        //navigate("/app/dashboard"); // Navigation should work here
        setLoading(false);
      }, 3000);
    },
  });
  const onKeyUpHandler = (evt) => {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      formik.handleSubmit();
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle between true/false
  };
  return (
    <>
      <HelmetPage title="Login" />
      {loading && <DottedLoader />}
      <LoginScreen>
        <Container disableGutters maxWidth={false} sx={{ minHeight: "100vh" }}>
          <Grid container spacing={0} sx={{ width: "100%" }}>
            {/* Left side for branding */}
            <Grid
              item
              xs={12}
              sm={6}
              className="bg-primary"
              sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Wrap image in a Box to center it */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100vh",
                  overflow: "hidden",
                }}
              >
                <img
                  src={crm}
                  alt="CRM"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
            </Grid>

            {/* Right side for login form */}
            <Grid
              item
              xs={12}
              sm={6}
              className="rightSection"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                xs={12}
                md={8}
                xl={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <FormControl
                    className="loginForm"
                    style={{ width: "auto", maxWidth: "none" }}
                  >
                    {/* Logo and Header Images Side by Side without Space */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{
                          maxWidth: "80%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                      <img
                        src={header}
                        alt="Header"
                        style={{
                          maxWidth: "15%",
                          height: "auto",
                          display: "block",
                          marginTop: "90px",
                          marginLeft: "-35px",
                        }}
                      />
                    </div>
                    <Typography variant="h4" className="login-header">
                      Login
                    </Typography>
                    <Typography className="email">Email</Typography>
                    <TextField
                      fullWidth
                      name="email"
                      variant="outlined"
                      size="small"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      InputProps={{
                        endAdornment: <FiMail style={{ marginRight: 8 }} />,
                      }}
                    />
                    <div style={{ paddingBottom: "5%" }}></div>
                    {/* Password Field with Icon */}
                    <Typography className="email">Password</Typography>
                    <TextField
                      fullWidth
                      name="password"
                      type="text"
                      variant="outlined"
                      size="small"
                      className={!showPassword ? "password-letters" : ""}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onKeyUp={onKeyUpHandler}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              style={{
                                color: "black",
                                marginRight: 0,
                                fontSize: 15,
                              }}
                              edge="end"
                            >
                              {showPassword ? <FiUnlock /> : <FiLock />}{" "}
                              {/* Toggle between icons */}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        display: "flex",
                        paddingTop: "16px",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formik.values.rememberMe}
                            onChange={(event) => {
                              formik.setFieldValue(
                                "rememberMe",
                                event.target.checked
                              );
                            }}
                            name="rememberMe"
                            color="primary"
                            sx={{
                              padding: 2,
                              "&.MuiSwitch-root": {
                                padding: "6px 12px 12px 12px", // Remove only top padding, keep others
                                marginTop: "2%",
                              },
                              "& .MuiSwitch-switchBase": {
                                padding: 2,
                                marginTop: "-11%",
                                transition: "transform 0.3s ease",
                                "&.Mui-checked": {
                                  transform: "translateX(24px)",
                                  color: "#fff",
                                  "& + .MuiSwitch-track": {
                                    backgroundColor: "white",
                                    opacity: 1,
                                    border: "2px solid #214E8F",
                                  },
                                },
                              },
                              "& .MuiSwitch-thumb": {
                                backgroundColor: "#214E8F",
                                width: 15,
                                height: 15,
                                borderRadius: 12,
                                transition: "all 0.3s ease",
                              },
                              "& .MuiSwitch-track": {
                                paddingRight: "42px",
                                paddingBottom: "1px",
                                height: 18,
                                width: 64,
                                borderRadius: 12,
                                border: "2px solid grey",
                                backgroundColor: "white",
                                opacity: 1,
                                transition:
                                  "background-color 0.3s ease, border 0.3s ease",
                              },
                            }}
                          />
                        }
                        label="Remember Me"
                        sx={{
                          gap: 0.5,
                          margin: 0,
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "#666D78",
                        }}
                      />
                      <Button
                        className="forgot-password"
                        sx={{ textTransform: "none" }}
                      >
                        Forgot Password?
                      </Button>
                    </Grid>
                    <div style={{ paddingBottom: "5%" }}></div>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        fontSize: "14px",
                        padding: "6px 16px",
                        borderRadius: "20px",
                        minWidth: "150px",
                        width: "fit-content",
                        alignSelf: "center",
                        textTransform: "none",
                        backgroundColor: "#1d4f91",
                        "&:hover": {
                          backgroundColor: "#063271",
                        },
                      }}
                    >
                      Login
                    </Button>
                    <div style={{ paddingBottom: "2%" }}></div>
                    <Typography className="signup">
                      Don’t have an account? <a href="/signup">Sign-up now</a>
                    </Typography>
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </LoginScreen>
    </>
  );
};

export default LoginPage;
