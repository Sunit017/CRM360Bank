import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Tabs,
  Tab,
  Grid,
  Menu,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import CaseAssignmentView from "./caseAssignmentView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";

const HeaderTitle = styled.div`
  text-align: center;
  font-weight: 700;
  height: 25px;
`;
const CaseAssignment = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    console.log(value);
  });

  const [tabValue, setTabValue] = useState("My Cases");
  const handleChangetab = (evt, newValue) => {
    console.info(newValue);
    setTabValue(newValue);
  };

  return (
    <>
      <HeaderTitle>Case Assignment</HeaderTitle>

      <Grid container spacing={1}>
        <Grid item xs={4} sx={{ height: 20 }}>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel>Queue Name</InputLabel>
            <Select
              labelId="quename"
              id="queue-name"
              label="Queue Name"
              value={value}
              onChange={handleChange}
            >
              <MenuItem value={"kyc"} sx={{ width: 200, maxWidth: "100%" }}>
                KYC
              </MenuItem>
              <MenuItem value={"FATCA"}>FATCA</MenuItem>
              <MenuItem value={"Dispute"}>Dispute</MenuItem>
              <MenuItem value={"Complaint"}>Complaint</MenuItem>
              <MenuItem value={"SR"}>SR</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={8}
          container
          justifyContent="flex-end"
          // sx={{ height: 100 }}
          style={{ paddingLeft: "0px" }}
        >
          <Tabs value={tabValue} onChange={handleChangetab}>
            <Tab
              label="My Cases"
              value="My Cases"
              sx={{
                textTransform: "none",
                color: "#008000",
                "&:hover": {
                  backgroundColor: "#fff8dc",
                  color: "#000",
                },
              }}
            />
            <Tab
              label="Team Cases"
              value="My Team Cases"
              sx={{
                textTransform: "none",
                color: "#008000",
                "&:hover": {
                  backgroundColor: "#fff8dc",
                  color: "#000",
                },
              }}
            />
            <Tab
              label="All Cases"
              value="All Cases"
              sx={{
                textTransform: "none",
                color: "#008000",
                "&:hover": {
                  backgroundColor: "#fff8dc",
                  color: "#000",
                },
              }}
            />
          </Tabs>
        </Grid>
        <Grid item xs={12} style={{ fontSize: "small" }}>
          <CaseAssignmentView value={tabValue} />
        </Grid>
      </Grid>
    </>
  );
};
export default CaseAssignment;
