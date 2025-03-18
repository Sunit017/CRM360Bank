import React from "react";
import SummaryDetails from "./summaryDetails";
import { useSelector } from "react-redux";
import CardDetails from "../../account360/cardDetails";
import AccoundDetails from "../../account360/accountDetails";

const Account360Cust = () => {
  const accountSelection = useSelector((state) => state.accountSelection);
  const { pageId } = accountSelection || {};
  return (
    <>
      {pageId === "cardDetails" && <CardDetails CusStyle={{ height: 350 }} />}
      {pageId === "accountDetails" && (
        <AccoundDetails CusStyle={{ height: 150 }} accHeight="230px" />
      )}
      {!pageId && <SummaryDetails />}
    </>
  );
};

export default Account360Cust;
