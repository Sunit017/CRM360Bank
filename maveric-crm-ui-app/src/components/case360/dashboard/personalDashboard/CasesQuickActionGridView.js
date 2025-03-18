import React from "react";

import { AgGridReact } from "ag-grid-react";
import { CasesByStatusColumns } from "../../common/dashboardColumnDef";

const CasesQuickActionGridView = () => {
  const resData = [
    {
      caseRefNumber: "ABCD12900k",
      category: "FATCA",
      type: "Inbox",
      status: "Pending Agent",
    },
    {
      caseRefNumber: "ABCD12901k",
      category: "Service Request",
      type: "Inbox",
      status: "Pending Agent",
    },
    {
      caseRefNumber: "ABCD12902k",
      category: "KYC High Risk",
      type: "Inbox",
      status: "Pending Agent",
    },
    {
      caseRefNumber: "ABCD12903k",
      category: "KYC High Risk",
      type: "Inbox",
      status: "Pending Agent",
    },
  ];
  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{
          height: 200,
        }}
      >
        <AgGridReact
          rowData={resData}
          columnDefs={CasesByStatusColumns}
          defaultColDef={{
            flex: 1,
            filter: true,
          }}
          rowHeight={30}
          headerHeight={30}
        />
      </div>
    </>
  );
};

export default CasesQuickActionGridView;
