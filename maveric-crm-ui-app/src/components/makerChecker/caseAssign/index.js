import React, { useState } from "react";
import DepositWithdrawalCases from "./depositWithdrawalCases";
import CreateApproveClientsCases from "./createAppoveClientsCases";
import ApproveClsLockAccountCases from "./approveClsLockAccountCases";
import ApplyAccountFeesCases from "./applyAccountFeesCases";
import ApplyAccuredInterestCases from "./applyAccuredInterestCases";
import Customer360Cases from "./customer360Cases";
import MakerCheckerMenu from "../opsMenu";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { casesView } from "../common/constants";

const CaseAssign = ({ pageId }) => {
  const [currentMenu, setCurrentMenu] = useState(pageId);
  const navigate = useNavigate();
  const location = useLocation();
  const onSelectMenu = (info) => {
    const { id } = info;
    const page = `${id}Cases`;
    navigate("/app/ops360", { state: { page } });
  };
  useEffect(() => {
    if (location?.state?.page) {
      const {
        state: { page },
      } = location;
      setCurrentMenu(casesView[page]);
    }
  }, [location]);
  return (
    <>
      <MakerCheckerMenu onSelectMenu={onSelectMenu} />
      <div style={{ padding: "0px 10px" }}>
        {currentMenu === "makeDepositWithdrawal" && <DepositWithdrawalCases />}
        {currentMenu === "createAppoveClients" && <CreateApproveClientsCases />}
        {currentMenu === "approveCloseLockUnlockAccount" && (
          <ApproveClsLockAccountCases />
        )}
        {currentMenu === "applyAccountFees" && <ApplyAccountFeesCases />}
        {currentMenu === "applyAccuredInterest" && (
          <ApplyAccuredInterestCases />
        )}
        {currentMenu === "customer360" && <Customer360Cases />}
      </div>
    </>
  );
};
export default CaseAssign;
