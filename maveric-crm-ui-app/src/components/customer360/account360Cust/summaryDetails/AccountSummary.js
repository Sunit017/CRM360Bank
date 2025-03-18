import React, { useEffect, useState } from "react";
import AgGrid from "../common/AgGrid";
import { accountSummaryColumn } from "../common/ColumnDef";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addAccout360Page,
  addAccount360Search,
} from "../../../../store/actions";
import { getAccounSummaryApi } from "../../../../services/MampuService/mampuCustomer360Api";
import { accountDetailsParam } from "../../../../Util";
import { getAccountDetailsApi } from "../../../../services/MampuService/mampuAccount360Api";

const AccountSummary = () => {
  const dispatch = useDispatch();
  const setAccSearchCall = (res) => {
    if (res && res.length) {
      const resInfo = accountDetailsParam(res[0]);
      dispatch(addAccount360Search(resInfo));
    }
  };
  const CellAccNoRender = (params) => {
    const gotoAccountView = (value) => {
      dispatch(
        addAccout360Page({ accountNumber: value, pageId: "accountDetails" })
      );
      getAccountDetailsApi(setAccSearchCall, value);
    };
    const { value } = params;
    return (
      <Button
        data-testid={`${value}-button`}
        onClick={() => gotoAccountView(value)}
      >
        {value}
      </Button>
    );
  };
  const columnsDef = accountSummaryColumn.map((item) => {
    const col = { ...item };
    if (item.field === "id") {
      col.cellRenderer = CellAccNoRender;
    }
    return col;
  });

  const [accData, setAccData] = useState([]);
  const customerSelection = useSelector((state) => state.customerSelection);
  useEffect(() => {
    // const {
    //   data: { customerId },
    // } = customerSelection;
    const { customerId } = customerSelection;
    getAccounSummaryApi(setAccData, customerId);
  }, [customerSelection]);

  return (
    <>
      <AgGrid columns={columnsDef} data={accData} style={{ height: 180 }} />
    </>
  );
};
export default AccountSummary;
