import React, { useCallback, useState } from "react";
import { CaseAssingmentColumn } from "../common/assignmentColumnDef";
import { Box } from "@mui/material";
import { onGetToday } from "../../../Util";
import AgGrid from "../common/AgGrid";
import CaseToolbarContainer from "../common/caseToolbarContainer";
import BulkAssignment from "./bulkAssignment";
import PaginationNav from "../../common/PaginationNav";

const CaseAssignmentView = (props) => {
  const [gridApi, setGridApi] = useState(null);
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [gridUpdates, setGridUpdates] = useState([]);
  const [activeLength, setActiveLength] = useState(0);

  const onSelectionChanged = (e) => {
    setActiveLength(e.api.getSelectedRows().length);
  };

  const onExportClick = () => {
    const todayDate = onGetToday();
    gridApi.exportDataAsCsv({
      fileName: `caseAssignment_${todayDate}`,
      onlySelectedAllPages: true,
    });
  };
  const columnsDefs = CaseAssingmentColumn.map((item) => {
    const col = { ...item };
    if (item.field === "assignedTo" || item.field === "queue") {
      col.editable = true;
    }
    // console.log(col.editable);
    return col;
  });

  const setSearchOffset = (offSetItem) => {
    console.info(offSetItem);
  };

  const caseData = [
    {
      caseID: "123455",
      customerName: "Venkat",
      customerID: "1022",
      type: "Inbox",
      category: "Onboarding",
      subCategory: "PoA",
      status: "Pending agent",
      reportedDate: "",
      dueDate: "",
      assignedTo: "Agent1",
      queue: "Banking Ops",
    },
    {
      caseID: "QWER678QD3",
      customerName: "Ramos",
      customerID: "3456",
      type: "Inbox",
      category: "Onboarding",
      subCategory: "Others",
      status: "New",
      reportedDate: "",
      dueDate: "",
      assignedTo: "Agent1",
      queue: "Customer Service",
    },
    {
      caseID: "KYCHR8967QD3",
      customerName: "Messi",
      customerID: "6574",
      type: "Inbox",
      category: "FATCA",
      subCategory: "W8",
      status: "New",
      reportedDate: "",
      dueDate: "",
      assignedTo: "Agent2",
      queue: "Chargeback OPs",
    },
    {
      caseID: "FTC6023WL",
      customerName: "Ronaldo",
      customerID: "9087",
      type: "Inbox",
      category: "FATCA",
      subCategory: "W8",
      status: "Expired",
      reportedDate: "",
      dueDate: "",
      assignedTo: "Agent2",
      queue: "Card Fulfillment",
    },
    {
      caseID: "ABCD6785N1",
      customerName: "Venkatesh",
      customerID: "1021",
      type: "Inbox",
      category: "Onboarding",
      subCategory: "SoW",
      status: "Pending customer",
      reportedDate: "",
      dueDate: "",
      assignedTo: "Agent1",
      queue: "KYC",
    },
  ];
  const onCellValueChanged = (event) => {
    const { data } = event;
    let list = [];
    if (gridUpdates.length) {
      const inList = gridUpdates.filter((item) => item.caseID === data.caseID);
      if (inList.length) {
        gridUpdates.map((item) => {
          const listData = { ...item };
          if (item.caseID === data.caseID) {
            listData.assignedTo = data.assignedTo;
          }
          list.push(listData);
        });
      } else {
        list = [...gridUpdates];
        list.push(data);
      }
    } else {
      list.push(data);
    }
    setGridUpdates(list);
  };

  const onEditHandler = (flag) => {
    setIsEditEnable(flag);
    console.log("ONLICK EDIT");
  };
  const onSaveHandle = () => {
    if (isEditEnable) {
      console.info("gridUpdates ##", gridUpdates);
    }
    setIsEditEnable(false);
    console.info("onSaveData ##");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // width: "calc(100vw - 80px)",
      }}
    >
      <Box>
        <div
          style={{
            textAlign: "left",
            position: "relative",
            left: "5px",
            bottom: "-30px",
          }}
        >
          {props.value}
        </div>
      </Box>
      <CaseToolbarContainer
        onExportClick={onExportClick}
        onEditHandler={onEditHandler}
        onSaveHandle={onSaveHandle}
        isEditEnable={isEditEnable}
        activeLength={activeLength}
      />
      <BulkAssignment 
      activeLength={activeLength}
      />
      <AgGrid
        setGridApi={setGridApi}
        data={caseData}
        columns={isEditEnable ? columnsDefs : CaseAssingmentColumn}
        style={{ height: 300 }}
        onCellValueChanged={onCellValueChanged}
        onSelectionChanged={onSelectionChanged}
      />
      <PaginationNav
        totalCount={0}
        pageLimit={5}
        dataLimit={50}
        setOffset={setSearchOffset}
      />
    </div>
  );
};

export default CaseAssignmentView;
