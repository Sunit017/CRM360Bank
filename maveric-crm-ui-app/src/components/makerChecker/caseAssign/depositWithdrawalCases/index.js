import React, { useState } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { makeDepositWithdrawalCasesCol } from "../../common/columnDef";
import { onGetToday } from "../../../../Util";
import PaginationNav from "../../../common/PaginationNav";
import AgGrid from "../../common/AgGrid";
import { addOps360PageDetails } from "../../../../store/actions";
import { useDispatch } from "react-redux";
import CasesFilterComponent from "../common/CasesFilterComponent";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const DepositWithdrawalCases = () => {
  const [gridApi, setGridApi] = useState(null);
  const isMakerRole = sessionStorage.getItem("isMakerRole") === "true";
  const caseAssignData = [
    {
      caseId: "MD123491",
      transactionType: "Make Deposit",
      transactionTypeId: "makeDeposit",
      channel: "Cash",
      channelId: "Cash",
      caseStatus: "New",
      createdDate: "2022-08-25T13:37:42.654Z",
      agentIdMaker: "ABC123",
      accountNo: "10002366094115",
      customerId: "8975512172",
      customerAccountName: "Peter John David",
      transactionCode:
        "C012 Reversal of Internal Funds Transfer To Another UNO Customer's Ac",
      amount: "100",
      valueDate: "2022-09-13T08:03:41+08:00",
      bookingDate: "2022-09-13T08:03:41+08:00",
      partnerChannelName: "",
      identifier: "",
      bank: "",
      receipt: "",
      check: "",
      account: "",
      accountName: "",
      routing: "",
      payoutTransactionId: "",
      payoutTransactionStatus: "",
      payoutDoneOn: "",
      notes: "",
    },
    {
      caseId: "MW123691",
      transactionType: "Make Withdrawal",
      transactionTypeId: "makeWithdrawal",
      channel: "Cash",
      channelId: "Cash",
      caseStatus: "New",
      createdDate: "2022-08-25T13:37:42.654Z",
      agentIdMaker: "ABC124",
      accountNo: "10002366094115",
      customerId: "8975512172",
      customerAccountName: "Peter John David",
      transactionCode: "D013 Reversal : Funding of FD Acccount (Credit FD)",
      amount: "100",
      valueDate: "2022-09-02T08:03:41+08:00",
      bookingDate: "2022-09-02T08:03:41+08:00",
      partnerChannelName: "",
      identifier: "",
      bank: "",
      receipt: "",
      check: "",
      account: "",
      accountName: "",
      routing: "",
      payoutTransactionId: "",
      payoutTransactionStatus: "",
      payoutDoneOn: "",
      notes: "Test for withdrawal transaction",
    },
  ];
  const dispatch = useDispatch();
  const CellCaseIdRender = (params) => {
    const gotoCaseIdView = (value, data) => {
      dispatch(addOps360PageDetails({ pageId: "makeDepositWithdrawal", data }));
    };
    const { value, data } = params;
    return (
      <Button
        data-testid={`${value}-button`}
        onClick={() => gotoCaseIdView(value, data)}
      >
        {value}
      </Button>
    );
  };

  const [activeLength, setActiveLength] = useState(0);
  const columnsDef = makeDepositWithdrawalCasesCol.map((item) => {
    const col = { ...item };
    if (item.field === "caseId" && !isMakerRole) {
      col.cellRenderer = CellCaseIdRender;
    }
    return col;
  });

  const onSelectionChanged = (e) => {
    setActiveLength(e.api.getSelectedRows().length);
  };

  const onExportClick = () => {
    const todayDate = onGetToday();
    gridApi.exportDataAsCsv({
      fileName: `makeDepositWithdrawalCases_${todayDate}`,
      onlySelectedAllPages: true,
    });
  };

  const setSearchOffset = (offSetItem) => {
    console.info(offSetItem);
  };

  return (
    <>
      <div style={{ fontWeight: 700, textAlign: "center" }}>
        Make Deposit Withdrawal Cases
      </div>
      <br />
      <CasesFilterComponent
        onExport={onExportClick}
        activeLength={activeLength}
      />
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Box style={{ textAlign: "end" }}>
          <IconButton
            size="small"
            onClick={() => onExportClick()}
            title="Export"
            data-testid="btnExport"
            disabled={activeLength === 0 ? true : false}
          >
            <UploadFileIcon sx={{ fontSize: 25 }} />
          </IconButton>
        </Box>
        <AgGrid
          data={caseAssignData}
          columns={columnsDef}
          style={{
            height: 320,
            // width: "calc(100vw - 110px)",
          }}
          setGridApi={setGridApi}
          onSelectionChanged={onSelectionChanged}
        />
        <PaginationNav
          totalCount={0}
          pageLimit={5}
          dataLimit={50}
          setOffset={setSearchOffset}
        />
      </Grid>
    </>
  );
};
export default DepositWithdrawalCases;
