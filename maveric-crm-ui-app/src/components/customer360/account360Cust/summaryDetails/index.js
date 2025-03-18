import React from "react";
import styled from "styled-components";
import AccountSummary from "./AccountSummary";
import CardSummary from "./CardSummary";

const InnerPanel = styled.div``;
const SummaryDetails = () => {
  return (
    <InnerPanel>
      <div style={{ fontWeight: 700, textAlign: "center" }}>
        Mambu account summary
      </div>
      <br />
      <AccountSummary />
      <br />
      <div style={{ fontWeight: 700, textAlign: "center" }}>
        Card summary details
      </div>
      <br />
      <CardSummary />
    </InnerPanel>
  );
};

export default SummaryDetails;
