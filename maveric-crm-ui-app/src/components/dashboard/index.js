import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Grid, Box, Button, Stack, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import HelmetPage from "../common/HelmetPage";
import dashl from "../../assets/dashl.png";
import dashR from "../../assets/dashR.png";
import {
  addAccount360ClientInfo,
  addAccount360Search,
} from "../../store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAccountDetailsApi } from "../../services/MampuService/mampuAccount360Api";
import { accountDetailsParam } from "../../Util";
import { getCliendIdApi } from "../../services/MampuService/mampuCardDetails";
import ToasterAlert from "../common/ToasterAlert";
import BreadcrumpContainer from "../breadcrumpContainer";
import { BiBadgeCheck } from "react-icons/bi";

const ViewPanel = styled.div`
  margin-top: 0; /* Remove margin above */
  padding: 0; /* Remove padding */
`;

const Label = styled.div`
  font-size: 15px;
  font-family: "Mulish", sans-serif;
  text-align: center;
  font-weight: bold;
`;

const Icons = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px;
  color: #0738a6;

  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e9967a;
    border-radius: 5px;
    color: #000;
  }
`;

const Dashboard = () => {
  const userLoggedInfo = useSelector((state) => state.userLoggedInfo);
  const histNav = useNavigate();
  const dispatch = useDispatch();
  const { userId } = userLoggedInfo;
  const [showAlert, setShowAlert] = useState({});

  const goTo360Page = () => {
    histNav("/app/customer360");
  };

  const goToCase360Page = () => {
    histNav("/app/case360", { state: { page: "caseDashboard" } });
  };

  const goToMakerCheckerPage = () => {
    histNav("/app/ops360", { state: { page: "makeDepositWithdrawalCases" } });
  };

  const validationSchema = Yup.object({
    accountNumber: Yup.string("Search by Account Number")
      .required("Required Account Number")
      .matches(/^[0-9]+$/, "Enter valid account number"),
  });

  const setAccount360ClientId = (resInfo) => {
    dispatch(addAccount360ClientInfo(resInfo));
  };

  const setAccSearchCall = (res) => {
    if (res && res.length) {
      const resInfo = accountDetailsParam(res[0]);
      const { accountHolderKey } = resInfo;
      getCliendIdApi(setAccount360ClientId, accountHolderKey);
      dispatch(addAccount360Search(resInfo));
      histNav("/app/account360", { state: { page: "accountDetails" } });
    } else {
      setShowAlert({
        type: "error",
        message: "Account number is not matched",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { accountNumber } = values;
      getAccountDetailsApi(setAccSearchCall, accountNumber);
    },
  });

  return (
    <ViewPanel>
      <HelmetPage title="Dashboard" />
      <BreadcrumpContainer />
      <ToasterAlert showAlert={showAlert} setShowAlert={setShowAlert} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "10px",
          padding: "0",
          minHeight: "unset",
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: 800,
          }}
        >
          Featured Services
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 400,
          }}
        >
          Explore our innovative digital CRM solutions.
        </Typography>
      </Box>

      <Box
        className="accountSearchGrid"
        sx={{
          backgroundColor: "white",
          maxWidth: "50%",
          margin: "auto",
          borderRadius: "30px",
          padding: "0.5rem",
          marginTop: "10px", // Keep this margin for spacing
          minHeight: "auto",
        }}
      >
        <form onSubmit={formik.handleSubmit} style={{ display: "flex" }}>
          <TextField
            name="accountNumber"
            type="text"
            placeholder="Search by Account Number (Allows only digit)"
            autoComplete="off"
            size="small"
            variant="outlined"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.accountNumber)}
            helperText={formik.errors.accountNumber}
            sx={{
              marginLeft: "5%",
              width: "83%",
              minHeight: "1.5rem",
            }}
          />
          <Button type="submit" style={{ padding: "2px 0px" }}>
            <SearchIcon sx={{ fontSize: 40 }} />
          </Button>
        </form>
      </Box>

      {/* The rest of your existing code... */}

      <Box sx={{ maxWidth: "70%", margin: "auto" }}>
        <div style={{ position: "relative" }}>
          <img
            src={dashl}
            alt="DashFeature"
            style={{
              width: "170px",
              height: "450px",
              position: "absolute",
              top: "611px",
              marginLeft: "-220px",
              marginTop: "-620px",
            }}
          />
          <div style={{ position: "relative" }}>
            <img
              src={dashR}
              alt="DashLogo"
              style={{
                width: "170px",
                height: "450px",
                position: "absolute",
                top: "611px",
                marginLeft: "1000px",
                marginTop: "-620px",
              }}
            />
            <Grid
              container
              spacing={{ xs: 2, md: 3, lg: 1 }}
              columns={{ xs: 4, sm: 8, md: 8 }}
              style={{ textAlign: "center", marginTop: "20px" }}
              sx={{
                textAlign: "center",
                marginTop: "20px",
                rowSpacing: 5,
              }}
            >
              <Grid item xs={2}>
                <Box>
                  <PersonSearchIcon sx={{ fontSize: 60 }} />
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "small",
                      color: "#D01F7C",
                      marginBottom: "20px",
                    }}
                  >
                    Customer 360 Search
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    Find customer information here
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1154B6",
                      borderRadius: "30px",
                      transition: "background-color 0.3s, transform 0.2s",
                      "&:hover": {
                        backgroundColor: "#0d3e8b",
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={goTo360Page}
                    endIcon={
                      <ArrowForwardTwoToneIcon></ArrowForwardTwoToneIcon>
                    }
                  >
                    View Details
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={2}>
                {/* <Icons onClick={goToCase360Page}> */}
                <Box>
                  <HeadsetMicOutlinedIcon
                    sx={{ fontSize: 60 }}
                  ></HeadsetMicOutlinedIcon>{" "}
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "small",
                      color: "#D01F7C",
                      marginBottom: "20px",
                    }}
                  >
                    Case 360
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    Manage cases efficiently
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1154B6",
                      borderRadius: "30px",
                      transition: "background-color 0.3s, transform 0.2s",
                      "&:hover": {
                        backgroundColor: "#0d3e8b",
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={goToCase360Page}
                    endIcon={
                      <ArrowForwardTwoToneIcon></ArrowForwardTwoToneIcon>
                    }
                  >
                    View Details
                  </Button>
                </Box>
                {/* </Icons> */}
              </Grid>
              <Grid item xs={2}>
                <Box>
                  {/* <Icons onClick={goToMakerCheckerPage}> */}
                  <VerifiedIcon sx={{ fontSize: 60 }} />
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "small",
                      color: "#D01F7C",
                      marginBottom: "20px",
                    }}
                  >
                    OPS 360
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    Optimize operation
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1154B6",
                      borderRadius: "30px",
                      transition: "background-color 0.3s, transform 0.2s",
                      "&:hover": {
                        backgroundColor: "#0d3e8b",
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={goToMakerCheckerPage}
                    endIcon={
                      <ArrowForwardTwoToneIcon></ArrowForwardTwoToneIcon>
                    }
                  >
                    View Details
                  </Button>
                  {/* </Icons> */}
                </Box>
              </Grid>
              <Grid item xs={2}>
                {/* <Icons> */}
                <Box>
                  <SignalCellularAltRoundedIcon sx={{ fontSize: 60 }} />
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "small",
                      color: "#D01F7C",
                      marginBottom: "20px",
                    }}
                  >
                    Metrics and Reporting
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    Mobile application
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1154B6",
                      borderRadius: "30px",
                      transition: "background-color 0.3s, transform 0.2s",
                      "&:hover": {
                        backgroundColor: "#0d3e8b",
                        transform: "scale(1.05)",
                      },
                    }}
                    // onClick={}
                    endIcon={
                      <ArrowForwardTwoToneIcon></ArrowForwardTwoToneIcon>
                    }
                  >
                    View Details
                  </Button>
                </Box>

                {/* </Icons> */}
              </Grid>
              <Grid item xs={3} sx={{ marginTop: "60px" }}>
                <Box>
                  {/* <Icons> */}
                  <AccountCircleOutlinedIcon sx={{ fontSize: 60 }} />
                  {/* <Label>Notification</Label> */}
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "small",
                      color: "#D01F7C",
                      marginBottom: "20px",
                    }}
                  >
                    Roles and Access
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    Find customer information here
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1154B6",
                      borderRadius: "30px",
                      transition: "background-color 0.3s, transform 0.2s",
                      "&:hover": {
                        backgroundColor: "#0d3e8b",
                        transform: "scale(1.05)",
                      },
                    }}
                    // onClick={}
                    endIcon={
                      <ArrowForwardTwoToneIcon></ArrowForwardTwoToneIcon>
                    }
                  >
                    View Details
                  </Button>
                  {/* </Icons> */}
                </Box>
              </Grid>
              <Grid item xs={2} sx={{ marginTop: "60px" }}>
                <Box>
                  {/* <Icons> */}
                  <NotificationsNoneOutlinedIcon sx={{ fontSize: 60 }} />
                  {/* <Label>Task Creation</Label> */}
                  {/* </Icons> */}
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "small",
                      color: "#D01F7C",
                      marginBottom: "20px",
                    }}
                  >
                    Notification
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    Manages cases efficiently
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1154B6",
                      borderRadius: "30px",
                      transition: "background-color 0.3s, transform 0.2s",
                      "&:hover": {
                        backgroundColor: "#0d3e8b",
                        transform: "scale(1.05)",
                      },
                    }}
                    // onClick={}
                    endIcon={
                      <ArrowForwardTwoToneIcon></ArrowForwardTwoToneIcon>
                    }
                  >
                    View Details
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={2} sx={{ marginTop: "60px" }}>
                <Box>
                  {/* <Icons> */}
                  <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 60 }} />
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "small",
                      color: "#D01F7C",
                      marginBottom: "20px",
                    }}
                  >
                    Task Creation
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    Optimize operations
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1154B6",
                      borderRadius: "30px",
                      transition: "background-color 0.3s, transform 0.2s",
                      "&:hover": {
                        backgroundColor: "#0d3e8b",
                        transform: "scale(1.05)",
                      },
                    }}
                    endIcon={
                      <ArrowForwardTwoToneIcon></ArrowForwardTwoToneIcon>
                    }
                    // onClick={}
                  >
                    View Details
                  </Button>
                  {/* </Icons> */}
                  <Grid
                    item
                    xs={3}
                    sx={{ marginTop: "60px", marginleft: "-390px" }}
                  ></Grid>
                </Box>
              </Grid>
              <Grid item xs={5} sx={{ marginLeft: "70px" }}>
                {" "}
                {/* Adjust margin as needed */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop="60px"
                  marginRight="-150px"
                >
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontSize: "14px",
                      color: "#555",
                      paddingBottom: "20px",
                    }}
                  >
                    @2024 Enterprise Services. All rights reserved.
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontSize: "14px",
                      color: "#555",
                      marginLeft: "20px",
                    }}
                  >
                    Privacy Policy
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 300,
                      fontSize: "14px",
                      color: "#555",
                      marginLeft: "20px",
                    }}
                  >
                    Terms Of Use
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </ViewPanel>
  );
};

export default Dashboard;
