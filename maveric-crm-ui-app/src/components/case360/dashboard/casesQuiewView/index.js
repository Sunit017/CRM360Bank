import React from "react";

import { AgGridReact } from "ag-grid-react";
import { CasesQueueColumn } from "../../common/dashboardColumnDef";

const CasesQuiewView = () => {
  const resData = [
    {
      caseRefNumber: "ABCD12900k",
      type: "Inbox",
      category: "FATCA",
      subCategory: "W8",
      subSubCategory: "W8",
      status: "Pending Agent",
      created: "05-06-2022",
    },
  ];
  return (
    <>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#4b53bc",
          color: "#fff",
          height: "25px",
          fontSize: "small",
        }}
      >
        UNASSIGNED CASES IN QUEUE
      </div>
      <div className="ag-theme-alpine" style={{ height: 200 }}>
        <AgGridReact
          rowData={resData}
          columnDefs={CasesQueueColumn}
          pagination={true}
          paginationPageSize={50}
          rowHeight={30}
          headerHeight={30}
        />
      </div>
    </>
  );
};

export default CasesQuiewView;
