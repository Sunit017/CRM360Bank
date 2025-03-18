import React from "react";
import styled from "styled-components";
import CasesQuiewView from "../casesQuiewView";
import CaseBarChart from "../common/CaseBarChart";
import CasePieChart from "../common/CasePieChart";
import CaseBarGroupChart from "../common/CaseBarGroupChart";

const ViewPanel = styled.div`
  padding: 10px;
  height: calc(100vh - 175px);
  // max-height: calc(100vh - 105px);
  // max-width: calc(100% - 30px);
  // border: 1px solid red;
  overflow-x: hidden;
`;

const TeamDashboard = () => {
  const casesLabel = ["jennifer", "Chandler", "Joey", "Monica", "Ross"];
  const casesQueueLabel = ["KYC High Risk", "FATCA", "QA", "SR", "Complaints"];
  const casesTypeLabel = [
    "FATCA",
    "Complaints",
    "Service Request",
    "QA",
    "High Risk",
  ];
  const categoriesDetails = ["jennifer", "Chandler", "Joey", "Monica", "Ross"];
  const casesTrendMonths = ["March", "April", "May", "June", "July"];
  return (
    <ViewPanel>
      <CasesQuiewView />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CaseBarChart
          headerTitle="ASSIGNED CASES PER AGENT"
          type="bar"
          categories={categoriesDetails}
        />
        <CasePieChart
          headerTitle="CLOSED CASES PER AGENT"
          type="pie"
          casesLabel={casesLabel}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CasePieChart
          headerTitle="CASES TYPE ANALYSIS"
          type="pie"
          casesLabel={casesTypeLabel}
        />
        <CaseBarGroupChart
          headerTitle="CASES TREND IN LAST 4 MONTHS"
          type="bar"
          casesMonth={casesTrendMonths}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CasePieChart
          headerTitle="'Pending with Agent' CASES PER AGENT"
          type="pie"
          casesLabel={casesLabel}
        />
        <CasePieChart
          headerTitle="PENDING CASES PER QUEUE"
          type="pie"
          casesLabel={casesQueueLabel}
        />
      </div>
    </ViewPanel>
  );
};

export default TeamDashboard;
