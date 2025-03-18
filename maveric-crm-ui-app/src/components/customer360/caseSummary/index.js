import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { caseSummaryColumn } from "../common/columnDef";
import AgGrid from "../common/AgGrid";

const caseData = [
  {
    number: "1",
    customerId: "ABCD6785N1",
    status: "Pending Agent",
    type: "Inbox",
    category: "Onboarding",
    subCategory: "SoW",
    subSubCategory: "SoW",
    dueDate: "04-08-2022",
  },
  {
    number: "2",
    customerId: "FTC6023Wl",
    status: "Pending Agent",
    type: "Inbox",
    category: "FATCA",
    subCategory: "W8",
    subSubCategory: "W8",
    dueDate: "10-08-2022",
  },
  {
    number: "3",
    customerId: "QWER467QD3",
    status: "Pending Agent",
    type: "Inbox",
    category: "Onboarding",
    subCategory: "SoW",
    subSubCategory: "SoW",
    dueDate: "04-08-2022",
  },
  {
    number: "4",
    customerId: "ABCD6785N1",
    status: "Pending Agent",
    type: "Inbox",
    category: "Onboarding",
    subCategory: "SoW",
    subSubCategory: "SoW",
    dueDate: "04-08-2022",
  },
];
const ViewPanel = styled.div`
  max-height: calc(100vh - 180px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4;
    height: 4;
  }
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding: 16px;
  text-align: center;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const CaseSummary = () => {
  return (
    <ViewPanel>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            // border: "1px solid #181d1f",
            // paddingRight: "16px",
            // paddingBottom: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardTitle style={{ background: "#79DAE8" }}>KYC Cases</CardTitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AgGrid
              columns={caseSummaryColumn}
              data={caseData}
              style={{
                height: "calc(100vh - 280px)",
                width: "calc(100vw - 50%)",
              }}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            // border: "1px solid #181d1f",
            // paddingRight: "16px",
            // paddingBottom: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardTitle style={{ background: "#B1E1FF" }}>
            Service Request
          </CardTitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AgGrid
              columns={caseSummaryColumn}
              data={caseData}
              style={{
                height: "calc(100vh - 280px)",
                width: "calc(100vw - 50%)",
              }}
            />
          </div>
        </Grid>
      </Grid>
    </ViewPanel>
  );
};

export default CaseSummary;
