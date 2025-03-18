import React from "react";
import CreateAppoveClients from "./createAppoveClients";
import ApproveClsLockAccount from "./approveClsLockAccount";
import ApplyAccountFees from "./applyAccountFees";
import ApplyAccuredInterest from "./applyAccuredInterest";
import Customer360 from "./customer360";
import MakeDepositWithdrawal from "./depositWithdrawal";

const CheckerView = ({ checkerData }) => {
  const { pageId, data } = checkerData;
  return (
    <div style={{ padding: "5px" }}>
      {pageId === "makeDepositWithdrawal" && (
        <MakeDepositWithdrawal
          checkerHeight="200px"
          isChecker={true}
          checkerData={data}
        />
      )}
      {pageId === "createAppoveClients" && (
        <CreateAppoveClients isChecker={true} checkerData={data} />
      )}
      {pageId === "approveCloseLockUnlockAccount" && (
        <ApproveClsLockAccount isChecker={true} checkerData={data} />
      )}
      {pageId === "applyAccountFees" && (
        <ApplyAccountFees isChecker={true} checkerData={data} />
      )}
      {pageId === "applyAccuredInterest" && (
        <ApplyAccuredInterest isChecker={true} checkerData={data} />
      )}
      {pageId === "customer360" && (
        <Customer360 isChecker={true} checkerData={data} />
      )}
    </div>
  );
};

export default CheckerView;
