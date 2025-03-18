import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import styled from "styled-components";
import CasesByStatus from "./CasesByStatus";
import QuickActionItems from "./QuickActionItems";
import PieChartAnalysis from "./PieChartAnalysis";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import BarGroupChart from "./PersonalDashboardBarGroupChart";

const ViewPanel = styled.div`
  padding: 10px;
  height: calc(100vh - 175px);
  // max-height: calc(100vh - 160px);
  // max-width: calc(100% - 30px);
  // border: 1px solid red;
  overflow: auto;
`;

const PersonalDashboard = () => {
  const [casesStatusCount, setCasesStatusCount] = useState({
    "Pending Agent": 4,
    "Pending Customer": 3,
    Expired: 2,
    "Completed-Approve": 8,
  });

  const [casesCategory, setCasesCategory] = useState("Complaints");
  const casesCategoryLabels = ["FATCA", "High Risk", "QA", "Service Request"];

  const handleCasesCategoryChange = (event) => {
    setCasesCategory(event.target.value);
  };
  return (
    <ViewPanel>
      <Stack spacing={{ xs: 5, sm: 3, md: 2, lg: 2 }}>
        <CasesByStatus count={casesStatusCount} />
        <QuickActionItems />
        <Box>
          <BarGroupChart
            headerTitle="Cases by Type"
            type="bar"
            casesCategories={casesCategoryLabels}
          />
        </Box>
        <Box>
          <FormControl
            sx={{
              backgroundColor: "#4b53bc",
              minWidth: "100%",
              paddingLeft: "5px",
              color: "#fff",
            }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={casesCategory}
              onChange={handleCasesCategoryChange}
            >
              <FormControlLabel
                value="Complaints"
                control={<Radio style={{ color: "#fff" }} />}
                label="Complaints"
                sx={{ paddingRight: "50px" }}
              />
              <FormControlLabel
                value="Service Request"
                control={<Radio style={{ color: "#fff" }} />}
                label="Service Request"
                sx={{ paddingRight: "50px" }}
              />
              <FormControlLabel
                value="KYC Hight Risk"
                control={<Radio style={{ color: "#fff" }} />}
                label="KYC Hight Risk"
                sx={{ paddingRight: "50px" }}
              />
              <FormControlLabel
                value="FATCA"
                control={<Radio style={{ color: "#fff" }} />}
                label="FATCA"
                sx={{ paddingRight: "50px" }}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <PieChartAnalysis category={casesCategory} />
      </Stack>
    </ViewPanel>
  );
};

export default PersonalDashboard;
