import React, { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import styled from "styled-components";

import PersonalDashboard from "./personalDashboard/index.js";
import TeamDashboard from "./teamDashboard/index.js";

const DashboardPane = styled.div`
  // margin: 5px;
`;
const CaseDashboard = () => {
  const [selDashboard, setSelDashboard] = useState("Personal");
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setSelDashboard(newAlignment);
    }
  };
  return (
    <DashboardPane>
      <ToggleButtonGroup
        value={selDashboard}
        exclusive
        onChange={handleChange}
        sx={{
          height: "20px",
          width: "calc(100vw - 30px)",
        }}
      >
        <ToggleButton
          value="Personal"
          sx={{
            width: "50%",
            textTransform: "none",
            "&.Mui-selected": {
              backgroundColor: "#4b7fbc",
              fontWeight: "bold",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4b53bc",
              },
            },
            "&:hover": {
              backgroundColor: "#4b7fbc",
              color: "#fff",
            },
          }}
        >
          Personal
        </ToggleButton>
        <ToggleButton
          value="Team"
          sx={{
            width: "50%",
            textTransform: "none",
            "&.Mui-selected": {
              backgroundColor: "#4b7fbc",
              fontWeight: "bold",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4b53bc",
              },
            },
            "&:hover": {
              backgroundColor: "#4b7fbc",
              color: "#fff",
            },
          }}
        >
          Team
        </ToggleButton>
      </ToggleButtonGroup>
      <div
        style={{
          marginTop: "10px",
          width: "calc(100vw - 20px)",
        }}
      >
        {selDashboard === "Personal" ? (
          <PersonalDashboard />
        ) : (
          <TeamDashboard />
        )}
      </div>
    </DashboardPane>
  );
};

export default CaseDashboard;
