import React, { useState } from "react";
import { caseManagementColumn } from "../common/managementColumnDef";
import CaseToolbarContainer from "../common/caseToolbarContainer";
import { onGetToday } from "../../../Util";
import AgGrid from "../common/AgGrid";
import PaginationNav from "../../common/PaginationNav";
import styled from "styled-components";

const HeaderTitle = styled.div`
  text-align: center;
  font-weight: 700;
  height: 25px;
`;

const CaseManagement = () => {
  const [gridApi, setGridApi] = useState(null);
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [gridUpdates, setGridUpdates] = useState([]);

  const onExportClick = () => {
    const todayDate = onGetToday();
    gridApi.exportDataAsCsv({
      fileName: `caseManagement_${todayDate}`,
    });
  };
  const editableColumnDef = caseManagementColumn.map((item, index) => {
    let col = { ...item };
    if (
      item.field === "agentComments" ||
      item.field === "status" ||
      item.field === "subCategory" ||
      item.field === "subSubCategory"
    ) {
      col.editable = true;
    }
    return col;
  });

  const setSearchOffset = (offSetItem) => {
    console.info(offSetItem);
  };

  const accountData = [
    {
      serialNumber: "1",
      caseReference: "ABCD6785N1",
      status: "Pending agent",
      type: "Inbox",
      category: "Onboarding",
      subCategory: "Onboarding",
      subSubCategory: "SOW",
      agentComments: "Sample",
    },
    {
      serialNumber: "2",
      caseReference: "FTC6023WL",
      status: "Expired",
      type: "Inbox",
      category: "FATCA",
      subCategory: "FATCA",
      subSubCategory: "W8",
      agentComments: "Samp",
    },
  ];

  const onCellValueChanged = (event) => {
    const { data } = event;
    let list = [];
    if (gridUpdates.length) {
      const inList = gridUpdates.filter(
        (item) => item.caseReference === data.caseReference
      );
      if (inList.length) {
        gridUpdates.map((item) => {
          let listData = { ...item };
          if (item.caseReference === data.caseReference) {
            listData = { ...data };
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
  };
  const onSaveHandle = () => {
    if (isEditEnable) {
      console.info("gridUpdates ##", gridUpdates);
    }
    setIsEditEnable(false);
  };
  return (
    <div
      style={{
        // padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderTitle>Case Management</HeaderTitle>
      <CaseToolbarContainer
        onExportClick={onExportClick}
        onEditHandler={onEditHandler}
        onSaveHandle={onSaveHandle}
        isEditEnable={isEditEnable}
      />
      <AgGrid
        setGridApi={setGridApi}
        data={accountData}
        columns={isEditEnable ? editableColumnDef : caseManagementColumn}
        style={{ height: 300 }}
        onCellValueChanged={onCellValueChanged}
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
export default CaseManagement;
