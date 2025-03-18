import React from "react";
import { Box, Grid } from "@mui/material";
import styled from "styled-components";
import PieChart from "./PersonalDashboardPieChart";

const PieChartAnalysis = ({ category }) => {
  const statusLabels = ["New", "Open", "Closed", "Resolved", "Reopened"];
  const agedCasesAndResolvedLabels = [
    "3 Days and Below",
    "4 to 7 Days",
    "8 to 13 Days",
    "14 Days and Above",
  ];

  const complaintsStatusSeries = [30, 40, 45, 50, 49];
  const complaintsAgedCasesSeries = [30, 40, 45, 50];
  const complaintsResolvedSeries = [30, 40, 45, 50];

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 1 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4}>
          <Box sx={{ border: "1px solid black", minHeight: "250px" }}>
            <PieChart
              headerTitle={`${category} - Status`}
              type="pie"
              casesLabel={statusLabels}
              data={complaintsStatusSeries}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ border: "1px solid black", minHeight: "250px" }}>
            <PieChart
              headerTitle={`${category} - Aged Cases`}
              type="pie"
              casesLabel={agedCasesAndResolvedLabels}
              data={complaintsAgedCasesSeries}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ border: "1px solid black", minHeight: "250px" }}>
            <PieChart
              headerTitle={`${category} - Resolved`}
              type="pie"
              casesLabel={agedCasesAndResolvedLabels}
              data={complaintsResolvedSeries}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PieChartAnalysis;
