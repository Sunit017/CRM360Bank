import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import styled from "styled-components";
import AccountHeaderPane from "../../common/AccountHeaderPane";

const Customer360 = ({ checkerHeight, isChecker, checkerData = null }) => {
  const [custId, setCustId] = useState("");
  const [accId, setAccId] = useState("");
  const [checkerCaseId, setCheckerCaseId] = useState("");
  const customerSelection = useSelector((state) => state.customerSelection);
  const account360Search = useSelector((state) => state.account360Search);
  const account360ClientDetails = useSelector(
    (state) => state.account360ClientDetails
  );
  useEffect(() => {
    if (checkerData && isChecker) {
      const { accountNo, customerId, caseId } = checkerData;
      setCustId(customerId);
      setAccId(accountNo);
      setCheckerCaseId(caseId);
      // caseIDCheckerData(checkerData);
    }
  }, [checkerData, isChecker]);
  useEffect(() => {
    if (customerSelection) {
      const {
        data: { customerId },
      } = customerSelection;
      setCustId(customerId);
    }
  }, [customerSelection]);

  useEffect(() => {
    if (account360ClientDetails) {
      const { id } = account360ClientDetails;
      setCustId(id);
    }
  }, [account360ClientDetails]);

  useEffect(() => {
    if (account360Search) {
      const { accountID } = account360Search;
      setAccId(accountID);
    }
  }, [account360Search]);

  const customerAccountName = isChecker
    ? checkerData?.customerAccountName
    : `${(customerSelection?.data || account360ClientDetails)?.firstName} ${
        (customerSelection?.data || account360ClientDetails)?.middleName
      } ${(customerSelection?.data || account360ClientDetails)?.lastName}`;

  return (
    <>
      <AccountHeaderPane
        pageTitle="Customer 360"
        pageId="customer360"
        isChecker={isChecker}
        checkerCaseId={checkerCaseId}
        accountNumber={accId}
        accountHolderName={customerAccountName}
      />

      <div
        style={{
          marginTop: "8px",
          padding: "16px 8px",
          border: "1px solid black",
          height: `calc(100vh - ${checkerHeight})`,
          overflow: "auto",
        }}
      >
        Customer 360
      </div>
    </>
  );
};

export default Customer360;
