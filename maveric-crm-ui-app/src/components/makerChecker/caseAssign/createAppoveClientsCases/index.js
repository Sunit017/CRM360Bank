import React, { useState } from "react";
import { Button } from "@mui/material";
import { caseAssignCol } from "../../common/columnDef";
import { onGetToday } from "../../../../Util";
import { useDispatch } from "react-redux";
import PaginationNav from "../../../common/PaginationNav";
import AgGrid from "../../common/AgGrid";
import { addOps360PageDetails } from "../../../../store/actions";
import CasesFilterComponent from "../common/CasesFilterComponent";

const CreateApproveClientsCases = () => {
  const isMakerRole = sessionStorage.getItem("isMakerRole") === "true";
  const [gridApi, setGridApi] = useState(null);
  const caseAssignData = [
    {
      caseId: "AC123480",
      operationType: "Unlock",
      transactionTypeId: "Unlock",
      caseStatus: "New",
      createdDate: "2022-08-25T13:37:42.654Z",
      agentIdMaker: "ABC123",
      accountNo: "10002366094115",
      customerId: "8975512172",
      customerAccountName: "Peter John David",
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
      notes: "",
    },
    {
      caseId: "AC123660",
      operationType: "Lock",
      transactionTypeId: "Lock",
      caseStatus: "New",
      createdDate: "2022-08-25T13:37:42.654Z",
      agentIdMaker: "ABC124",
      accountNo: "10002366093225",
      customerId: "8975512172",
      customerAccountName: "Peter John David",
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
      dispatch(addOps360PageDetails({ pageId: "createApproveClients", data }));
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

  const [activeLength, setActiveLength] = useState(false);
  const columnsDef = caseAssignCol.map((item) => {
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
      fileName: `createApproveClientsCases_${todayDate}`,
      onlySelectedAllPages: true,
    });
  };

  const setSearchOffset = (offSetItem) => {
    console.info(offSetItem);
  };

  return (
    <>
      <div style={{ fontWeight: 700, textAlign: "center" }}>
        Create Approve Clients Cases
      </div>
      <br />
      <CasesFilterComponent
        onExport={onExportClick}
        activeLength={activeLength}
      />
      <>
        <AgGrid
          data={caseAssignData}
          columns={columnsDef}
          style={{
            height: 320,
            // width: "calc(100vw - 110px)",
            marginTop: "10px",
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
      </>
    </>
  );
};
export default CreateApproveClientsCases;
