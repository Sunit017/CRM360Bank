import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import DetailsViewPage from "./DetailsViewPage";
import CaseSummary from "./caseSummary";
import CustomerInfo from "./CustomerInfo";
import Account360Cust from "./account360Cust";
import MenuNavigation from "./menuList/MenuNavigation";

import CreateAppoveClients from "../makerChecker/checkerView/createAppoveClients";
import ApproveClsLockAccount from "../makerChecker/checkerView/approveClsLockAccount";
import ApplyAccountFees from "../makerChecker/checkerView/applyAccountFees";
import ApplyAccuredInterest from "../makerChecker/checkerView/applyAccuredInterest";
import Customer360 from "../makerChecker/checkerView/customer360";
import MakeDepositWithdrawal from "../makerChecker/checkerView/depositWithdrawal";

import CreateCase from "./createCase/CreateCase";
import CreateTask from "./createTask/CreateTask";
import styled from "styled-components";

const ViewPanel = styled.div`
  // padding-top: 25px;
`;

const CustomerView = () => {
  const [currentMenu, setCurrentMenu] = useState(null);
  const account360PageDetail = useSelector(
    (state) => state.account360PageDetails
  );
  const customer360PageDetails = useSelector(
    (state) => state.customer360PageDetails
  );
  useEffect(() => {
    const { account360, pageId } = account360PageDetail || {};
    !account360 && pageId && setCurrentMenu(pageId);
    console.log("Cust view page Id---", pageId);
  }, [account360PageDetail]);

  useEffect(() => {
    const { pageId } = customer360PageDetails || {};
    pageId && setCurrentMenu(pageId);
    console.log(pageId);
    console.log(currentMenu);
  }, [customer360PageDetails]);

  const selectedMenu = (info) => {
    console.log(info);
    setCurrentMenu(info?.id);
  };

  return (
    <ViewPanel>
      <MenuNavigation selectedMenu={selectedMenu} />
      <CustomerInfo />
      <Grid
        item
        xs={12}
        sm={8}
        md={9}
        sx={{
          border: "1px solid #612897",
          borderRadius: "10px",
          // borderTop: "none",
          padding: "5px",
          margin: "10px",
          // height: "calc(100vh - 145px)",
        }}
        style={{ fontSize: "small" }}
      >
        {currentMenu === "makeDepositWithdrawal" && (
          <MakeDepositWithdrawal checkerHeight="330px" isChecker={false} />
        )}
        {currentMenu === "createAppoveClients" && (
          <CreateAppoveClients checkerHeight="355px" isChecker={false} />
        )}
        {currentMenu === "approveCloseLockUnlockAccount" && (
          <ApproveClsLockAccount checkerHeight="355px" isChecker={false} />
        )}
        {currentMenu === "applyAccountFees" && (
          <ApplyAccountFees checkerHeight="355px" isChecker={false} />
        )}
        {currentMenu === "applyAccuredInterest" && (
          <ApplyAccuredInterest checkerHeight="355px" isChecker={false} />
        )}
        {currentMenu === "customer360" && (
          <Customer360 checkerHeight="355px" isChecker={false} />
        )}
        {currentMenu === "tasks" && <CreateTask />}
        {currentMenu === "createcase" && <CreateCase />}
        {currentMenu === "cases" && <CaseSummary />}
        {currentMenu === "account360" && <Account360Cust />}
        {currentMenu !== "tasks" &&
          currentMenu !== "createcase" &&
          currentMenu !== "cases" &&
          currentMenu !== "account360" &&
          currentMenu !== "makeDepositWithdrawal" && (
            <DetailsViewPage currentMenu={currentMenu} />
          )}
      </Grid>
    </ViewPanel>
  );
};
export default CustomerView;
