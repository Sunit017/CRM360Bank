import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Grid } from "@mui/material";
import AccountDetails from "./accountDetails";
import MenuNavigation from "./menuList/MenuNavigation";
import AccountCardDetails from "./accountCardSummary/AccountCardDetails";
import CreateAppoveClients from "../makerChecker/checkerView/createAppoveClients";
import ApproveClsLockAccount from "../makerChecker/checkerView/approveClsLockAccount";
import ApplyAccountFees from "../makerChecker/checkerView/applyAccountFees";
import ApplyAccuredInterest from "../makerChecker/checkerView/applyAccuredInterest";
import Customer360 from "../makerChecker/checkerView/customer360";
import MakeDepositWithdrawal from "../makerChecker/checkerView/depositWithdrawal";
import { useLocation, useNavigate } from "react-router-dom";

const ViewPanel = styled.div`
  // padding: 10px;
  // max-height: calc(100vh - 130px);
  // overflow: auto;
`;

const AccountView = () => {
  const [currentMenu, setCurrentMenu] = useState("accountDetails");
  const account360PageDetail = useSelector(
    (state) => state.account360PageDetails
  );
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (account360PageDetail?.pageId) {
      const { account360, pageId } = account360PageDetail || {};
      account360 &&
        pageId &&
        navigate("/app/account360", { state: { page: pageId } });
      // setCurrentMenu(pageId);
    }
  }, [account360PageDetail]);

  const selectedMenu = (info) => {
    console.log(info);
    // setCurrentMenu(info?.id);
    navigate("/app/account360", { state: { page: info?.id } });
  };

  useEffect(() => {
    const {
      state: { page },
    } = location;
    setCurrentMenu(page);
  }, [location]);

  return (
    <ViewPanel>
      <MenuNavigation selectedMenu={selectedMenu} />
      <Grid
        item
        xs={12}
        sm={8}
        md={9}
        sx={{
          border: "1px solid #181d1f",
          margin: "10px",
          // height: "calc(100vh - 110px)",
          borderRadius: "10px",
        }}
        style={{ padding: "5px 15px", fontSize: "small" }}
      >
        {currentMenu === "accountDetails" && <AccountDetails />}
        {currentMenu === "accountCardDetails" && <AccountCardDetails />}
        {currentMenu === "applyAccountFees" && (
          <ApplyAccountFees
            isAccount360={true}
            checkerHeight="250px"
            isChecker={false}
          />
        )}
        {currentMenu === "applyAccuredInterest" && (
          <ApplyAccuredInterest
            isAccount360={true}
            checkerHeight="250px"
            isChecker={false}
          />
        )}
        {currentMenu === "approveCloseLockUnlockAccount" && (
          <ApproveClsLockAccount
            isAccount360={true}
            checkerHeight="250px"
            isChecker={false}
          />
        )}
        {currentMenu === "createAppoveClients" && (
          <CreateAppoveClients
            isAccount360={true}
            checkerHeight="250px"
            isChecker={false}
          />
        )}
        {currentMenu === "customer360" && (
          <Customer360
            isAccount360={true}
            checkerHeight="250px"
            isChecker={false}
          />
        )}
        {currentMenu === "makeDepositWithdrawal" && (
          <MakeDepositWithdrawal
            isAccount360={true}
            checkerHeight="250px"
            isChecker={false}
          />
        )}
      </Grid>
    </ViewPanel>
  );
};
export default AccountView;
