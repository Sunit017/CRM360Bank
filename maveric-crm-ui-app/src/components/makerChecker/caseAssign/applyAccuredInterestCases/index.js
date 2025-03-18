import React, { useState } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { applyAccuredInterestCasesCol } from "../../common/columnDef";
import { onGetToday } from "../../../../Util";
import { useDispatch } from "react-redux";
import PaginationNav from "../../../common/PaginationNav";
import AgGrid from "../../common/AgGrid";
import { addOps360PageDetails } from "../../../../store/actions";
import CasesFilterComponent from "../common/CasesFilterComponent";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const ApplyAccuredInterestCases = () => {
  const isMakerRole = sessionStorage.getItem("isMakerRole") === "true";
  const [gridApi, setGridApi] = useState(null);
  const caseAssignData = [
    {
      caseId: "AC123480",
      interestApplicationDate: "09/23/2022",
      caseStatus: "New",
      createdDate: "2022-08-25T13:37:42.654Z",
      agentIdMaker: "ABC123",
      accountNo: "10002366094115",
      customerId: "8975512172",
      customerAccountName: "Peter John David",
      notes: "Test - account",
    },
    {
      caseId: "AC123660",
      interestApplicationDate: "09/24/2022",
      caseStatus: "New",
      createdDate: "2022-08-25T13:37:42.654Z",
      agentIdMaker: "ABC124",
      accountNo: "10002366093225",
      customerId: "8975512172",
      customerAccountName: "Peter John David",
      notes: "Test - account",
    },
  ];
  const dispatch = useDispatch();
  const CellCaseIdRender = (params) => {
    const gotoCaseIdView = (value, data) => {
      dispatch(addOps360PageDetails({ pageId: "applyAccuredInterest", data }));
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
  const columnsDef = applyAccuredInterestCasesCol.map((item) => {
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
      fileName: `applyAccuredInterestCases_${todayDate}`,
      onlySelectedAllPages: true,
    });
  };

  const setSearchOffset = (offSetItem) => {
    console.info(offSetItem);
  };

  return (
    <>
      <div style={{ fontWeight: 700, textAlign: "center" }}>
        Apply Accured Interest Cases
      </div>
      <br />
      <CasesFilterComponent
      // onSubmitCase ={onSubmitClick}
      // activeLength={activeLength}
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

export default ApplyAccuredInterestCases;
