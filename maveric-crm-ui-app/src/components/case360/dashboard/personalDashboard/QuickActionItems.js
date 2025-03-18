import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import CasesQuickActionGridView from "./CasesQuickActionGridView";

const QuickActionItems = () => {
  const [tabValue, setTabValue] = useState("DueDate");
  const handleChange = (evt, newValue) => {
    console.info(newValue);
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab
            label="Due date"
            value="DueDate"
            sx={{ textTransform: "none" }}
          />
          <Tab
            label="Completed"
            value="Completed"
            sx={{ textTransform: "none" }}
          />
          <Tab label="Closed" value="Closed" sx={{ textTransform: "none" }} />
        </Tabs>
      </Box>
      <Box sx={{ minWidth: "70%", height: "250px" }}>
        <div style={{ textAlign: "center" }}>{tabValue}</div>
        <CasesQuickActionGridView />
      </Box>
    </Box>
  );
};

export default QuickActionItems;
