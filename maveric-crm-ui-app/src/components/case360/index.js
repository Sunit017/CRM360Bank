import React, { useState } from "react";
import { Button, Grid, Menu, MenuItem } from "@mui/material";
import CaseDashboard from "./dashboard";
import MenuNavigation from "./menuList";
import styled from "styled-components";
import CaseAssignment from "./caseAssignment";
import CaseManagement from "./caseManagement";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HelmetPage from "../common/HelmetPage";
import BreadcrumpContainer from "../breadcrumpContainer";

const CasePane = styled.div`
  // margin: 0px 10px;
  // padding: 5px;
  // width: calc(100vw - 60px);
`;

const Case360 = () => {
  const [currentMenu, setCurrentMenu] = useState("caseDashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const onMenuSelected = (info) => {
    // setCurrentMenu(info?.id);
    navigate("/app/case360", { state: { page: info?.id } });
  };
  useEffect(() => {
    const {
      state: { page },
    } = location;
    setCurrentMenu(page);
  }, [location]);
  const caseDetails = {
    caseDashboard: "Case Dashboard",
    caseManagement: "Case Management",
    caseAssignment: "Case Assignment",
  };

  const navigationInfo = [
    {
      label: caseDetails[currentMenu],
      navUrl: "/app/case360",
    },
  ];
  return (
    <CasePane>
      <HelmetPage title={caseDetails[currentMenu]} />
      <BreadcrumpContainer navDetails={navigationInfo} />
      <MenuNavigation selectedMenu={onMenuSelected} />
      <Grid sx={{ margin: "10px" }}>
        {currentMenu === "caseAssignment" && <CaseAssignment />}
        {currentMenu === "caseManagement" && <CaseManagement />}
        {currentMenu === "caseDashboard" && <CaseDashboard />}
      </Grid>
    </CasePane>
  );
};

export default Case360;
