import React from "react";
import { Box, Button, Paper, Stack } from "@mui/material";
import styled from "styled-components";

const StatusContainer = styled.div`
  min-width: 20vw;
  min-height: 80px;
  border-radius: 30px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: "Mulish", sans-serif;
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
  color: #ffffff;
`;

const CasesByStatus = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: "20%",
          height: "50px",
          textAlign: "center",
          backgroundColor: "#4b7fbc",
          color: "#fff",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <div>Pending agent </div>
        <div>{props.count["Pending Agent"]}</div>
      </Paper>
      <Paper
        elevation={3}
        style={{
          width: "20%",
          height: "50px",
          textAlign: "center",
          backgroundColor: "#4b7fbc",
          color: "#fff",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <div>Pending customer </div>
        <div>{props.count["Pending Customer"]}</div>
      </Paper>
      <Paper
        elevation={3}
        style={{
          width: "20%",
          height: "50px",
          textAlign: "center",
          backgroundColor: "#4b7fbc",
          color: "#fff",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <div>Expired</div>
        <div>{props.count["Expired"]}</div>
      </Paper>
      <Paper
        elevation={3}
        style={{
          width: "20%",
          height: "50px",
          textAlign: "center",
          backgroundColor: "#4b7fbc",
          color: "#fff",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <div>Completed - Approve</div>
        <div>{props.count["Completed-Approve"]}</div>
      </Paper>
    </Box>
  );
};

export default CasesByStatus;
